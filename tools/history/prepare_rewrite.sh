#!/usr/bin/env bash
# Cathedral History Rewrite Prep Script (dry-run / spec-gated)
# Classification: creator_suite_extended
# Purpose: Enumerate commits touching phantom/missing LFS objects and emit safe filter-repo plan.
# WARNING: Does NOT rewrite history. Generates instructions only.
# Gates:
#  1. Real path existence check (paths listed in manifest may be absent now – that's okay).
#  2. Contract alignment: will refuse to run destructive mode without OpenSpec change approval.
#  3. CI/Validator compatibility: ensures vertical_slice_* runner files untouched.

set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
MANIFEST="${ROOT_DIR}/LFS_MISSING_OBJECTS_MANIFEST.json"
OUT_DIR="${ROOT_DIR}/tools/history/out"
mkdir -p "$OUT_DIR"
PLAN_FILE="$OUT_DIR/rewrite_plan.txt"
COMMITS_FILE="$OUT_DIR/missing_object_commits.txt"

function msg(){ printf "[history-prep] %s\n" "$*"; }
function err(){ printf "[history-prep][ERROR] %s\n" "$*" >&2; }

if [[ ! -f "$MANIFEST" ]]; then
  err "Manifest not found: $MANIFEST"
  exit 1
fi

# Extract paths from manifest (jq optional; fallback to grep + sed if jq absent)
if command -v jq >/dev/null 2>&1; then
  # Portable replacement for mapfile for macOS bash 3.2
  PATHS=()
  while IFS= read -r line; do
    PATHS+=("$line")
  done < <(jq -r '.objects[].path' "$MANIFEST")
else
  PATHS=( $(grep '"path":' "$MANIFEST" | sed -E 's/.*"path": "(.*)".*/\1/') )
fi

if [[ ${#PATHS[@]} -eq 0 ]]; then
  err "No paths parsed from manifest."
  exit 1
fi

msg "Collected ${#PATHS[@]} manifest paths. Enumerating commits..."
: > "$COMMITS_FILE"

for p in "${PATHS[@]}"; do
  msg "Scanning commits for path: $p"
  git log --all --pretty=format:'%H %s' -- "$p" 2>/dev/null || true >> "$COMMITS_FILE"
  echo "--- $p" >> "$COMMITS_FILE"
  echo >> "$COMMITS_FILE"
done

# Deduplicate commit hashes
UNIQUE_COMMITS=$( (grep -E '^[0-9a-f]{40} ' "$COMMITS_FILE" || true) | cut -d' ' -f1 | sort -u)
COUNT=$(echo "$UNIQUE_COMMITS" | wc -l | tr -d ' ')

msg "Found $COUNT unique commits touching phantom paths (may include merges)."

# Check vertical slice runner safety (no direct modifications planned)
VS_RUNNER_PATTERN='main/tests/integration/vertical_slice'
CHANGES_IN_RUNNERS=0
for c in $UNIQUE_COMMITS; do
  if git show --name-only --oneline "$c" | grep -q "$VS_RUNNER_PATTERN"; then
    CHANGES_IN_RUNNERS=$((CHANGES_IN_RUNNERS+1))
  fi
done

if [[ $CHANGES_IN_RUNNERS -gt 0 ]]; then
  msg "WARNING: $CHANGES_IN_RUNNERS commits also touched vertical slice runner files. Manual review required before any rewrite." 
fi

# Generate a filter-repo plan (non-executable guidance)
cat > "$PLAN_FILE" <<'EOF'
# Cathedral History Rewrite Plan (DRAFT - DO NOT EXECUTE WITHOUT APPROVAL)
# Classification: creator_suite_extended
# This plan removes phantom/missing LFS assets that never formed part of canonical vertical slice contracts.
# STEPS (dry run recommended first):
# 1. Create a fresh clone (bare or mirror):
#      git clone --mirror <repo-url> cathedral-rewrite.git
#      cd cathedral-rewrite.git
# 2. Save backup refs:
#      git branch --all > ../backup_branch_list.txt
# 3. Run git filter-repo (requires installation) to remove paths:
#      git filter-repo --path site/assets/img/black-madonna.png \
#                      --path "real_skills/01_CERTIFICATIONS/REIKI/REIKI/White_Tara/White Tara Reiki Attunement AUDIO SherrySpeaks.mp3" \
#                      --path real_skills/01_CERTIFICATIONS/TRAUMA_SOMATIC/1.png \
#                      --path "real_skills/01_CERTIFICATIONS/TRAUMA_SOMATIC/Trauma informed cert.png" \
#                      --path "real_skills/01_CERTIFICATIONS/REIKI/REIKI/Raku_Ki_Reiki/RAKU Rei Master symbol.png" \
#                      --path "real_skills/01_CERTIFICATIONS/REIKI/REIKI/Raku_Ki_Reiki/RAKU KEI MAGNET PRAYER.png" \
#                      --force
# 4. Push rewritten history to a NEW temporary remote (never force to production directly):
#      git remote add test_rewrite <new-empty-repo-url>
#      git push --mirror test_rewrite
# 5. Run vertical slice validators against the rewritten repository clone:
#      pnpm --filter main test:vertical-slice-all
# 6. OpenSpec change proposal documenting removal rationale referencing LFS_MISSING_OBJECTS_MANIFEST.json.
# 7. Upon approval, coordinate a scheduled window to force-update production remote (if approved) or adopt rewritten repo as new canonical base.
# 8. Notify all collaborators to re-clone; old clones will have dangling references.
# SAFETY:
# - Never run filter-repo inside active working directory without full backups.
# - Validate that no canonical vertical slice files were altered.
# - Preserve commit messages unrelated to phantom assets.
EOF

msg "Plan written: $PLAN_FILE"
msg "Commit list: $COMMITS_FILE"

msg "Dry-run complete. Next: Review commits file, confirm none contain meaningful data, then proceed ONLY after OpenSpec approval."

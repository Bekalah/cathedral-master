#!/usr/bin/env bash
# moderate-branches.sh — Kilo anti-spam pre-merge scan
# Scans remote branches for suspicious changes before merging.
# Usage:
#   REMOTE=v1_master_origin BASE=v1_main bash tools/git/moderate-branches.sh
#
set -euo pipefail
REMOTE="${REMOTE:-v1_master_origin}"
BASE="${BASE:-v1_main}"

msg(){ echo "[moderate] $*"; }

# Ensure refs are up to date
msg "Fetching $REMOTE..."; git fetch "$REMOTE" >/dev/null

branches=()
# macOS default bash (3.2) lacks 'mapfile'. Use portable while-read fallback.
while IFS= read -r ref; do
  # Strip remote prefix
  ref_short="${ref#refs/remotes/$REMOTE/}"
  branches+=("$ref_short")
done < <(git for-each-ref --format='%(refname:short)' "refs/remotes/$REMOTE/*")

patterns=("tarot-arena" "azure-static-web-apps.yml" "export {}" "module.exports = {}" "echo \".*\"")
flag=0

for br in "${branches[@]}"; do
  [[ "$br" == "$BASE" ]] && continue
  msg "Scanning $REMOTE/$br vs $REMOTE/$BASE..."
  files=()
  while IFS= read -r f; do
    files+=("$f")
  done < <(git diff --name-only "refs/remotes/$REMOTE/$BASE..refs/remotes/$REMOTE/$br")
  [[ ${#files[@]} -eq 0 ]] && continue
  for f in "${files[@]}"; do
    # Path heuristics
    for p in "${patterns[@]}"; do
      if [[ "$f" =~ tarot-arena ]] || [[ "$f" =~ azure-static-web-apps.yml ]]; then
        msg "  FLAG (path): $REMOTE/$br -> $f"
        flag=1
      fi
    done
    # Content heuristics (best-effort)
    if git cat-file -e "refs/remotes/$REMOTE/$br:$f" 2>/dev/null; then
      content=$(git show "refs/remotes/$REMOTE/$br:$f" | head -n 200)
      if echo "$content" | grep -Eq "^(export \{\}|module\.exports = \{\}\s*;?)$"; then
        msg "  FLAG (empty export): $REMOTE/$br -> $f"
        flag=1
      fi
      if echo "$content" | grep -Eq "^\s*echo\s+\".*\"\s*$|^\s*echo\s+'.*'\s*$"; then
        msg "  FLAG (echo-only): $REMOTE/$br -> $f"
        flag=1
      fi
    fi
  done
done

if [[ $flag -eq 0 ]]; then
  msg "No spam indicators detected across remote branches."
else
  msg "Spam indicators detected. Review flagged items before merging."
fi

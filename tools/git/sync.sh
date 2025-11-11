#!/usr/bin/env bash
# cathedral sync.sh -- Trauma-safe, spec-driven Git synchronization helper
# DRY_RUN=1 to preview operations.
# Features:
#  - Detect current branch & remotes
#  - Optional auto-stash of dirty state with label & timestamp
#  - Fetch all remotes (without pruning by default)
#  - Rebase or merge strategy selectable via SYNC_STRATEGY (rebase|merge)
#  - LFS integrity check before push
#  - Spam pattern scan (echo-only scripts, empty exports) before merge
#  - Safe unstash with conflict hints
#  - Comprehensive logging to tools/git/sync.log
#
# Environment vars:
#  DRY_RUN=1            Preview only
#  SYNC_STRATEGY=rebase  (default) or merge
#  AUTO_STASH=1          Stash dirty changes automatically
#  SKIP_SPAM_SCAN=1      Skip spam scan
#  TARGET_REMOTE=v1_master_origin  Remote to sync (default v1_master_origin)
#  TARGET_BRANCH=v1_main           Branch to sync (fallback to current if missing)
#
set -euo pipefail
LOG_DIR="$(dirname "$0")"
LOG_FILE="$LOG_DIR/sync.log"
mkdir -p "$LOG_DIR"

msg() { echo "[sync] $*" | tee -a "$LOG_FILE"; }
run() {
  if [[ "${DRY_RUN:-}" == 1 ]]; then
    msg "DRY_RUN: $*"; return 0; fi
  msg "RUN: $*"; eval "$@"; }

current_branch() { git rev-parse --abbrev-ref HEAD; }

spam_scan() {
  msg "Spam scan starting...";
  local patterns=("echo\s\"" "echo '" "module.exports = {}" "export {}" )
  local issues=0
  for p in "${patterns[@]}"; do
    if git grep -I -n -E "$p" >/dev/null 2>&1; then
      msg "Potential spam pattern found: $p"
      issues=$((issues+1))
    fi
  done
  if [[ $issues -gt 0 ]]; then
    msg "Spam scan flagged $issues issue(s). Review before merging."; return 1
  fi
  msg "Spam scan clean."; return 0
}

lfs_check() {
  if command -v git >/dev/null && command -v git-lfs >/dev/null; then
    msg "Checking LFS status..."; git lfs status || true; fi
}

AUTO_STASH_LABEL="auto-sync-$(date +%Y%m%d-%H%M%S)"
TARGET_REMOTE="${TARGET_REMOTE:-v1_master_origin}"
STRATEGY="${SYNC_STRATEGY:-rebase}"
TARGET_BRANCH="${TARGET_BRANCH:-v1_main}"
CURR_BRANCH="$(current_branch)"

msg "Starting sync: branch=$CURR_BRANCH target=$TARGET_BRANCH remote=$TARGET_REMOTE strategy=$STRATEGY dry_run=${DRY_RUN:-0}"

# Auto stash
if [[ -n "${AUTO_STASH:-}" ]]; then
  if [[ -n "$(git status --porcelain)" ]]; then
    run git stash push -u -m "$AUTO_STASH_LABEL" || true
  else
    msg "Working tree clean; no auto stash."; fi
fi

# Fetch all remotes
for r in $(git remote); do run git fetch "$r"; done

# Spam scan
if [[ -z "${SKIP_SPAM_SCAN:-}" ]]; then
  spam_scan || msg "Proceed with caution: spam flagged."; fi

# Ensure target branch exists locally (create tracking if remote has it)
if ! git show-ref --verify --quiet "refs/heads/$TARGET_BRANCH"; then
  if git ls-remote --exit-code "$TARGET_REMOTE" "$TARGET_BRANCH" >/dev/null 2>&1; then
    run git checkout -b "$TARGET_BRANCH" "$TARGET_REMOTE/$TARGET_BRANCH"
  else
    msg "Target branch $TARGET_BRANCH not found locally or remotely; using current $CURR_BRANCH."; TARGET_BRANCH="$CURR_BRANCH"; fi
fi

# Sync strategy
if [[ "$STRATEGY" == rebase ]]; then
  run git checkout "$TARGET_BRANCH"
  run git pull --rebase "$TARGET_REMOTE" "$TARGET_BRANCH" || msg "Rebase encountered conflicts; resolve manually." 
else
  run git checkout "$TARGET_BRANCH"
  run git pull "$TARGET_REMOTE" "$TARGET_BRANCH" || msg "Merge encountered conflicts; resolve manually." 
fi

lfs_check

# Optional unstash (manual because conflicts possible)
if [[ -n "${UNSTASH:-}" ]]; then
  if git stash list | grep -q "$AUTO_STASH_LABEL"; then
    run git stash pop "stash^{/$(echo "$AUTO_STASH_LABEL" | sed 's/[][^.$*]/\\&/g')}" || msg "Conflicts during unstash; fix and commit."; fi
fi

msg "Sync complete. Review status:";
run git status -sb
msg "Recent log:"; run git log --oneline -n 8
msg "Stashes:"; git stash list | tee -a "$LOG_FILE"

msg "If satisfied: push with 'git push $TARGET_REMOTE $TARGET_BRANCH' (omit in DRY_RUN)."

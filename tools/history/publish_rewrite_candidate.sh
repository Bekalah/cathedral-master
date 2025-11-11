#!/usr/bin/env bash
set -euo pipefail

# Cathedral Real — Publish Orphan Rewrite Candidate
# Safely snapshots the current working tree onto an orphan branch and pushes
# it to the remote as v1_main_rewrite_candidate for review. No production branches
# are modified. Use this when LFS history or legacy references block normal pushes.

BRANCH_NAME="v1_main_rewrite_candidate"
REMOTE_NAME="v1_master_origin"
REMOTE_URL_DEFAULT="https://github.com/Bekalah/cathedral-master.git"

root_dir() {
  git rev-parse --show-toplevel 2>/dev/null || echo ""
}

ensure_git_repo() {
  if ! git rev-parse --git-dir >/dev/null 2>&1; then
    echo "[publish] Error: Not inside a git repository." >&2
    exit 1
  fi
}

ensure_remote() {
  if ! git remote get-url "$REMOTE_NAME" >/dev/null 2>&1; then
    echo "[publish] Remote $REMOTE_NAME not found; adding $REMOTE_URL_DEFAULT"
    git remote add "$REMOTE_NAME" "$REMOTE_URL_DEFAULT"
  fi
}

create_or_switch_orphan() {
  if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
    echo "[publish] Switching to existing orphan/candidate branch: $BRANCH_NAME"
    git checkout "$BRANCH_NAME"
  else
    echo "[publish] Creating orphan branch: $BRANCH_NAME"
    git checkout --orphan "$BRANCH_NAME"
  fi
}

snapshot_and_push() {
  echo "[publish] Staging all files..."
  git add -A

  local COUNT
  COUNT=$(git status --porcelain | wc -l | tr -d ' ')
  echo "[publish] Files to commit: $COUNT"

  if [ "$COUNT" -gt 0 ]; then
    git commit -m "chore(rewrite-candidate): orphan snapshot of current working tree (no LFS history)"
  else
    echo "[publish] Nothing to commit (working tree clean)."
  fi

  echo "[publish] HEAD: $(git --no-pager show -s --oneline HEAD)"

  ensure_remote
  echo "[publish] Pushing $BRANCH_NAME to $REMOTE_NAME/$BRANCH_NAME"
  git push -u "$REMOTE_NAME" "$BRANCH_NAME:refs/heads/$BRANCH_NAME"

  local URL
  URL=$(git remote get-url "$REMOTE_NAME")
  echo "[publish] Pushed successfully. Review branch here: $URL"
  echo "[publish] Next: open a PR from $BRANCH_NAME -> v1_main for review."
}

main() {
  ensure_git_repo
  local ROOT
  ROOT=$(root_dir)
  echo "[publish] Repo root: ${ROOT:-unknown}"

  create_or_switch_orphan
  snapshot_and_push
}

main "$@"

#!/usr/bin/env bash
# Archive exploration branches as tags, then delete the branches.
# Nothing changes without --apply. Tags keep every commit, so any world can come back:
#   git switch -c revive-slate archive/portfolio-v2-world-06-slate
#
# Usage:
#   bash scripts/branch-cleanup.sh --keep "portfolio/v2-world-07-the-clearing"            # dry run
#   bash scripts/branch-cleanup.sh --keep "portfolio/v2-world-07-the-clearing" --apply    # do it
#   --keep takes a space-separated list. main is always kept.
set -euo pipefail

KEEP="main"
APPLY=0
REMOTE="origin"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --keep)   KEEP="main $2"; shift 2 ;;
    --apply)  APPLY=1; shift ;;
    --remote) REMOTE="$2"; shift 2 ;;
    *) echo "Unknown option: $1" >&2; exit 1 ;;
  esac
done

run() {
  if [[ $APPLY -eq 1 ]]; then echo "+ $*"; "$@"; else echo "[dry-run] $*"; fi
}

git fetch "$REMOTE" --prune --tags --quiet

mapfile -t BRANCHES < <(git for-each-ref --format='%(refname:strip=3)' "refs/remotes/$REMOTE" | grep -vx 'HEAD')

# Every kept branch must exist, or a typo would archive the branch you meant to keep.
for k in $KEEP; do
  if ! printf '%s\n' "${BRANCHES[@]}" | grep -qx -- "$k"; then
    echo "Kept branch not found on $REMOTE: $k" >&2; exit 1
  fi
done

TO_ARCHIVE=()
for b in "${BRANCHES[@]}"; do
  if [[ " $KEEP " == *" $b "* ]]; then echo "keep      $b"; else TO_ARCHIVE+=("$b"); fi
done

[[ ${#TO_ARCHIVE[@]} -eq 0 ]] && { echo "Nothing to archive."; exit 0; }

# 1) Tag every branch being archived.
for b in "${TO_ARCHIVE[@]}"; do
  tag="archive/${b//\//-}"
  if git rev-parse -q --verify "refs/tags/$tag" >/dev/null; then
    echo "tag ok    $tag"
  else
    run git tag -a "$tag" "$REMOTE/$b" -m "Archived branch $b on $(date +%F)"
  fi
done

# 2) Push the tags first, so nothing is deleted before its tag exists on the remote.
run git push "$REMOTE" --tags

# 3) Delete each branch only if its tag points at the same commit.
for b in "${TO_ARCHIVE[@]}"; do
  tag="archive/${b//\//-}"
  if [[ $APPLY -eq 1 ]]; then
    if [[ "$(git rev-parse "$tag^{commit}")" != "$(git rev-parse "$REMOTE/$b")" ]]; then
      echo "SKIP $b: tag does not match branch tip" >&2; continue
    fi
    git show-ref -q --verify "refs/heads/$b" && git branch -D "$b" >/dev/null && echo "+ deleted local $b"
  fi
  run git push "$REMOTE" --delete "$b"
done

echo
echo "Done. Branches kept: $KEEP"
[[ $APPLY -eq 0 ]] && echo "This was a dry run. Add --apply to make the changes."
exit 0

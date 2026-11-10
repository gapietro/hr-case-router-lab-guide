#!/usr/bin/env bash
# check-progress.sh <module>: before a module starts, checks that every
# earlier module left what its ✅ lines promise. Each ❌ names the step that
# makes it. It only reads: it changes no file, branch or repo.
#
#   bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 5
#
# Runs in macOS's bash 3.2 and in Git Bash on Windows.

N="$1"
case "$N" in
  [1-9]) ;;
  *) echo "Usage: bash check-progress.sh <module number, 1 to 9>"; exit 2 ;;
esac

W="${HCR_WORKSPACE:-$HOME/projects/hr-case-router}"
G="${HCR_GUIDE:-$HOME/projects/hr-case-router-lab-guide}"
A="$W/app"
fails=0

ok()  { printf '✅ %s\n' "$1"; }
bad() { printf '❌ %s\n   Fix: %s\n' "$1" "$2"; fails=$((fails + 1)); }
# check "<what>" "<fix>" <command…>: ✅ if the command succeeds, ❌ if not.
check() { local what="$1" fix="$2"; shift 2
  if "$@" >/dev/null 2>&1; then ok "$what"; else bad "$what" "$fix"; fi; }
on_main() { git -C "$A" cat-file -e "main:$1"; }
not_exists() { [ ! -e "$1" ]; }

echo "Checking that you're ready for Module $N…"

# --- Module 0 ----------------------------------------------------------------
check "The guide is in ~/projects/hr-case-router-lab-guide" "Module 0 step 4" test -d "$G/.git"
check "Your workspace has brief/ and catches.md" "Module 0 step 9" \
  test -d "$W/brief" -a -f "$W/catches.md"
check "app/ is a git repo with now.config.json" "Module 0 steps 12 and 13" \
  test -d "$A/.git" -a -f "$A/now.config.json"
check "app/ has the kit's allow list (.gitignore)" "Module 0 step 13" \
  grep -q '^# Allowlist' "$A/.gitignore"
check "app/ has the guard (the pre-commit hook)" "Module 0 step 14" test -f "$A/.git/hooks/pre-commit"
check "app/'s main holds CLAUDE.md" "Module 0 steps 16 and 18" on_main CLAUDE.md

remote=$(git -C "$A" remote get-url origin 2>/dev/null)
if [ -n "$remote" ]; then
  ok "app/ has a GitHub remote, origin"
  theirs=$(git -C "$A" ls-remote origin refs/heads/main 2>/dev/null | cut -f1)
  if [ -n "$theirs" ]; then
    ok "GitHub has your main"
    mine=$(git -C "$A" rev-parse -q --verify main 2>/dev/null)
    if [ "$mine" = "$theirs" ]; then ok "Your main matches GitHub's"
    else bad "Your main doesn't match GitHub's" "in app/, run: git switch main && git pull"; fi
  else
    bad "GitHub has no main for your repo" "in app/, run: git push -u origin main"
  fi
  default=$(cd "$A" && gh repo view --json defaultBranchRef -q .defaultBranchRef.name 2>/dev/null)
  if [ "$default" = "main" ]; then ok "Your repo's main branch on GitHub is main"
  elif [ -z "$default" ]; then bad "gh can't read your repo" "run: gh auth status, then Module 0 step 4 if it says you're not logged in"
  else bad "Your repo's main branch on GitHub is $default, not main" "in app/, run: git push -u origin main && gh repo edit --default-branch main"; fi
else
  bad "app/ has no GitHub remote" "Module 0 step 18"
fi

branch=$(git -C "$A" branch --show-current 2>/dev/null)
if [ "$branch" = "main" ]; then ok "app/ is on main"
else bad "app/ is on ${branch:-no branch}, not main" "in app/, commit or stash your work, then run: git switch main"; fi
if [ -z "$(git -C "$A" status --porcelain 2>/dev/null)" ]; then ok "app/ has no uncommitted changes"
else bad "app/ has uncommitted changes (git status --short lists them)" "ask your instructor before you discard anything"; fi

# --- Module 1 ----------------------------------------------------------------
if [ "$N" -ge 2 ]; then
  prd="$W/brief/PRD-HRCaseRouter.md"
  check "brief/ holds the accepted PRD" "Module 1 step 5" test -f "$prd"
  if [ -f "$prd" ]; then
    left=$(grep -c -e 'is an open decision' -e 'Draft 2' "$prd")
    if [ "$left" = "0" ]; then ok "The PRD has no open decisions left"
    else bad "The PRD still has $left open decisions or Draft 2 lines" "Module 1 step 5"; fi
  fi
fi

# --- Module 2 ----------------------------------------------------------------
if [ "$N" -ge 3 ]; then
  check "Your workspace holds CONSULT.md" "Module 2 step 4" test -f "$W/CONSULT.md"
fi

# --- Modules 3 and 4: the docs, in the workspace until Module 5 moves them -----
if [ "$N" -ge 4 ]; then
  check "Your workspace holds research-facts.md" "Module 3 step 3" test -f "$W/research-facts.md"
fi
if [ "$N" -eq 4 ] || [ "$N" -eq 5 ]; then
  check "Your workspace's docs/ holds DECISIONS.md" "Module 3 step 1" test -f "$W/docs/DECISIONS.md"
  check "Your workspace's docs/ holds the LLD" "Module 3 step 4" test -f "$W/docs/LLD-HRCaseRouter.md"
fi
if [ "$N" -eq 5 ]; then
  check "Your workspace's docs/ holds the signed design record" "Module 4 step 4" \
    test -f "$W/docs/DESIGN-HRCaseRouter.md"
fi

# --- Module 5 ----------------------------------------------------------------
if [ "$N" -ge 6 ]; then
  for f in docs/DESIGN-HRCaseRouter.md docs/LLD-HRCaseRouter.md docs/DECISIONS.md src/platform-rules.test.ts BACKLOG.md; do
    check "app/'s main holds $f" "Module 5 steps 1 to 4" on_main "$f"
  done
  check "The workspace's old design record is gone (app/docs/ has it now)" "Module 5 step 1" \
    not_exists "$W/docs/DESIGN-HRCaseRouter.md"
  issues=$(cd "$A" && gh issue list --state all --limit 1000 --json number -q length 2>/dev/null)
  if [ -n "$issues" ] && [ "$issues" -gt 0 ] 2>/dev/null; then ok "Your plan is filed: $issues issues on GitHub"
  else bad "Your plan isn't filed: no issues on GitHub" "Module 5 step 3"; fi
fi

# --- Module 6 ----------------------------------------------------------------
if [ "$N" -ge 7 ]; then
  check "app/'s package.json has a test script" "Module 6 step 2" grep -q '"test"' "$A/package.json"
  tests=$(cd "$A" && git ls-tree -r --name-only main -- src 2>/dev/null | grep '\.test\.ts$' | grep -vc 'platform-rules\.test\.ts$')
  if [ "${tests:-0}" -gt 0 ]; then ok "app/'s main has your tests: $tests test files"
  else bad "app/'s main has no tests of yours" "Module 6 step 5"; fi
  merged=$(cd "$A" && gh pr list --state merged --limit 1000 --json number -q length 2>/dev/null)
  if [ -n "$merged" ] && [ "$merged" -ge 2 ] 2>/dev/null; then ok "$merged pull requests merged"
  else bad "Fewer than 2 pull requests merged (the plan's and your first story's)" "Module 6 step 5"; fi
fi

# --- Module 7 ----------------------------------------------------------------
if [ "$N" -ge 8 ]; then
  check "The reviewer's tests are on test/break-access" "Module 7 step 2" \
    git -C "$A" rev-parse -q --verify refs/heads/test/break-access
fi

# --- Module 8 ----------------------------------------------------------------
if [ "$N" -ge 9 ]; then
  check "app/'s main holds GRADE.md" "Module 8 step 7" on_main GRADE.md
fi

echo
if [ "$fails" -eq 0 ]; then
  echo "Ready for Module $N."
else
  echo "$fails to fix before Module $N. Fix each ❌ above, then run this again."
  exit 1
fi

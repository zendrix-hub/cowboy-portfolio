---
name: repo-tour
description: Map the portfolio repo and all its branches before any change. Use at the start of a session or when Cowboy asks "where are we?". Read-only.
disable-model-invocation: true
---

Goal: a one-screen map. Not an essay. Change nothing.

1. `git fetch origin --prune`. For every remote branch, collect:
   commits behind/ahead of `origin/main` (`git rev-list --left-right --count origin/main...origin/<b>`),
   last commit date, and files changed vs main.
2. Find redundant branches:
   - tip is an ancestor of another branch (`git merge-base --is-ancestor A B`)
   - identical to main (ahead 0, behind 0)
3. Read `CLAUDE.md`, `docs/DECISION.md` (if present), `package.json`, `app/page.tsx`, `data/*.ts`.
4. On the current branch, list components that nothing imports. Confirm each with `git grep`
   before calling it dead. Barrel files (`index.ts`) count as imports.
5. List files over 500 KB in `public/` and any duplicate images (same size, different name).

Output:
- Branch table: name · behind/ahead · last date · status (keep / archive / redundant)
- Stack in one line
- Which data file feeds which section
- Likely dead code and heavy assets
- Top 3 risks **for the reader** (not for the code)

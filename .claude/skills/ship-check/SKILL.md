---
name: ship-check
description: Quality gate before merging a branch into main. Use when Cowboy says "ship check" or before a PR into main.
disable-model-invocation: true
---

Run each check. Report pass or fail per line, with the evidence.

1. `npm run lint` — 0 errors.
2. `npm run build` — passes. Note route count and warnings.
3. `git status` is clean, and the branch is up to date with `origin/main`.
4. Truth — no UNVERIFIABLE numbers left in `data/*.ts`. If content changed, run `/truth-pass` first.
5. Images — nothing over 500 KB above the fold; portraits served through `next/image` with `sizes`;
   no unused duplicates left in `public/`.
6. Structure — skip link, one `h1`, heading order, alt text, `lang="ja"` on Japanese blocks.
7. Motion — every animation respects `prefers-reduced-motion` (CSS media query or `useReducedMotion`).
8. Links — every `githubUrl` and `liveUrl` answers: `curl -sI -o /dev/null -w '%{http_code}' <url>`.
   If the network blocks a domain, mark it "unchecked", not "pass".
9. Review — delegate to the `ux-lead` subagent and include its verdict.

Output:
- The checklist.
- "Ready for PR" or the list of blocking items.
- A PR description: what changed, why it helps the reader, which screenshots to attach.

Cowboy pushes and opens the PR. You don't push.

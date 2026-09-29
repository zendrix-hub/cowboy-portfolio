---
name: pick-world
description: Help Cowboy choose ONE design direction from the portfolio/* branches using a reader-first scorecard. Only when Cowboy runs /pick-world.
disable-model-invocation: true
argument-hint: [branch-a] [branch-b] [branch-c]
---

Finalists: $ARGUMENTS (max 3). If none are given, ask Cowboy for his top 3 gut picks.
Don't pick for him. The decision is his; your job is to make it fast and honest.

## Set up side-by-side previews
For each finalist, N = 1, 2, 3:
```bash
git worktree add ../pf-N origin/<branch>
cd ../pf-N && npm ci --prefer-offline      # same lockfile on every portfolio/* branch, so the npm cache hits
npm run dev -- -p 300N                     # 3001, 3002, 3003
```
Tell Cowboy the three URLs. They open in the Windows browser.
Ask him to view each on his phone-sized window (360px) first.

## Scorecard (1–5 each)
| Criterion | Weight | Who scores |
| --- | --- | --- |
| 10-second clarity: name, role, one proof point above the fold | ×3 | both |
| Project proof: visuals, role, evidence easy to find | ×3 | both |
| Mobile at 360px | ×2 | both |
| Easy for a second-language English reader | ×2 | both |
| Feels like Cowboy: who he is and wants to become | ×2 | Cowboy only |
| Maintenance: custom code he must own (fewer unique lines = higher) | ×1 | you, measured |

Max score 65. Measure maintenance with the line count of components unique to that world.

Rules:
- Distinctiveness from the other worlds is **not** a criterion. The reader never sees them.
- Score from what renders, not from the world's report document.

## Output
1. Scorecard table and totals.
2. Winner, runner-up, and at most 3 small ideas worth stealing from the others.
3. Fill `docs/DECISION.md` with Cowboy's answers. Keep it to one page.
4. Clean up: `git worktree remove ../pf-N` for each.

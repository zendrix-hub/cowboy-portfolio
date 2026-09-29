# Claude Code kit for this repo

| File | What it does |
| --- | --- |
| `CLAUDE.md` | Rules Claude Code reads every session: the reader, truth rule, branch policy, session loop |
| `.claude/agents/ux-lead.md` | Subagent that reviews from the hiring manager's side. Max 7 fixes |
| `.claude/skills/repo-tour/` | `/repo-tour` — map branches, dead code, heavy assets |
| `.claude/skills/pick-world/` | `/pick-world a b c` — side-by-side previews and a reader-first scorecard |
| `.claude/skills/truth-pass/` | `/truth-pass` — check every claim in `data/*.ts` against the real repos |
| `.claude/skills/ship-check/` | `/ship-check` — quality gate before a PR into `main` |
| `scripts/branch-cleanup.sh` | Tag every old branch as `archive/*`, then delete it. Dry run by default |
| `docs/DECISION.md` | One-page design decision, filled in by Cowboy |

Revive an archived world: `git switch -c revive-<name> archive/<tag-name>`

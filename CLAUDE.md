@AGENTS.md

# Cowboy's portfolio — rules for every session

## The one job
A hiring manager at a tech company in Japan decides "let's interview Zendrix" within 60 seconds.
Every change must make that decision faster or more certain. If it doesn't, skip it.

## The reader
- Primary: engineering manager or recruiter in Japan. English is often their second language.
  First visit is a phone skim; second visit is a laptop check of GitHub and one project.
- They need, in this order: who he is and what role he wants, proof he can build, how he thinks, how to reach him.
- Secondary: CIT-U professors and panels.

## Truth rule (non-negotiable)
- Every number, metric, library, and outcome in `data/*.ts` must trace to one of:
  a file in that project's repo, a measurement Cowboy ran, or something Cowboy stated.
- If it can't be traced: remove it or rewrite it as a plain qualitative fact, then ask Cowboy.
  Never invent, round up, or "estimate" a metric.
- Test for every claim: could Cowboy defend it in an interview, under follow-up questions?

## Design direction
- The direction is chosen once and recorded in `docs/DECISION.md`. Read it before any visual work.
- No new "worlds", themes, or design explorations. Improve the chosen one.
- Distinctiveness is not a goal. Clarity for the reader is.

## Branch policy
- `main` = what is live. Never commit to it directly.
- At most 2 open work branches. One branch = one improvement = one PR.
- Names: `feat/<slug>`, `fix/<slug>`, `content/<slug>`, `refactor/<slug>`, `chore/<slug>`.
- Old exploration branches are archived as tags `archive/<name>` before deletion
  (`scripts/branch-cleanup.sh`). Never delete a branch without its tag.

## Session loop
1. Read `docs/DECISION.md` and Cowboy's task.
2. Plan in 5 bullets or fewer. Wait for "go".
3. Make the smallest change that completes the task. Don't touch unrelated files.
4. Run `npm run lint` and `npm run build`. Both must pass.
5. Commit with a conventional message. Never push. Cowboy pushes.
6. Report in 3 lines: what changed, why it helps the reader, how to check it (URL + what to look at).

## Design guardrails
- Content before decoration. One signature moment; everything around it stays quiet.
- Every project shows: a screenshot or short clip, Cowboy's role, the problem, what he built,
  the evidence (live link, repo, measured result), and what he learned.
- Headings say what the section proves ("Offline speech checks for Grade 1 readers"),
  not clever labels ("Take 03").
- Mobile first at 360px. Tap targets 44px or more. Body text 16px or more. Line length under 80ch.
- WCAG 2.2 AA contrast, visible focus, skip link, one h1, logical heading order.
- Motion only where it shows what changed. Respect `prefers-reduced-motion`.
- Images through `next/image` with `sizes`. No image over 500 KB above the fold.

## Language
- Page is `lang="en"`. Any Japanese block gets `lang="ja"`.
- Japanese copy stays at a level Cowboy can read aloud and explain. Don't write fluent business
  Japanese on his behalf; state his level honestly.

## Environment
- WSL Ubuntu on a company-managed Windows laptop. Network is restricted: `apt` may be blocked.
  Prefer npm/npx and python3 standard library. Ask before installing anything.
- Repo lives at `~/projects/portfolio` (Linux filesystem, not `/mnt/c`).
- `npm run dev` → http://localhost:3000, opened in the Windows browser.

## Stack
Next.js 16.3.4 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v3 · motion · next-themes · zod.
Content lives in `data/*.ts`. Components in `components/{layout,sections,ui,shared}`.
Read `node_modules/next/dist/docs/` before using any Next.js API (see AGENTS.md).

## Don't
- Don't add dependencies without asking.
- Don't write spec documents longer than one page.
- Don't praise the work in reports. State what changed and what's still weak.

## Tools in this repo
- Subagent `ux-lead` — reviews from the reader's side, returns max 7 prioritized fixes.
- `/repo-tour` — map branches and code before changing anything.
- `/pick-world` — choose one design direction with a reader-first scorecard.
- `/truth-pass` — check every claim in `data/*.ts` against the real repos.
- `/ship-check` — quality gate before a PR into `main`.

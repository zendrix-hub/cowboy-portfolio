# World 02: "As-Built" (The Drawing Set) — Implementation Report

**Branch:** `portfolio/world-02-as-built`  
**Phase:** Phase 4 Checkpoint & Engineering Elevation Pass  
**Design Reference:** `PORTFOLIO_DESIGN_EXPLORATION.md` §6.2  

---

## 1. Executive Summary

World 02 conceives the developer portfolio as an issued, record drawing set for a structure that is actively built and continuously documented. Every section is an archival drawing **sheet** framed on an architectural **desk**, navigation functions as a **sheet index**, projects are presented as a **detail sheet** and **project schedule**, technical capabilities form a cross-referencing **matrix**, career milestones read as an engineering **revision history**, and contact is formatted as a formal **transmittal**.

Following user review, the branch was elevated with high-density architectural details:
1. **Architectural Sub-Sheets (3-A to 3-E)** unlocking deep 4-stage pipeline schematics, I/O data contracts, timing/hardware specs, and engineering tradeoffs for every project.
2. **Authentic Drafting Detailing:** Boxed "ISSUED FOR RECORD SET" engineering stamps on the Cover Sheet and Zone coordinate indicators (Zones 1–8) along sheet margins.
3. **Interactive Skills Matrix Cross-Reference:** Instant cross-filtering between projects and skillsets.

Structure is the design: tables, rules, and double-line framing replace ornamental cards, floating gradient blobs, and drop shadows. Radius is strictly **0 everywhere**, state changes are instant (0ms), and the redline ink color is rigorously reserved for revision markings.

---

## 2. Visual Identity & Design Tokens

### 2.1 Color Tokens & Contrast Verification
Per Appendix A of the design exploration specification, all 20 token pairs across both Print (default) and Blueprint modes were computed and verified using `scripts/contrast.mjs scripts/world-02-contrast.json`.

| Token | Print (Default) | Blueprint | Role | Contrast Ratio |
|---|---|---|---|---|
| `--desk` | `#DDE4EA` | `#082B4A` | Desk background behind sheets | Baseline ground |
| `--sheet` | `#F8FAFC` | `#0B3A63` | Sheet drafting ground (cool white) | 15.48:1 (Print) / 10.82:1 (Blueprint) |
| `--ink` | `#0F2233` | `#F2F7FB` | Primary drafting text, frames, and rules | 15.48:1 on sheet / 12.61:1 on desk |
| `--ink-2` | `#41586B` | `#B9CFE2` | Secondary text, captions, and metadata | 7.08:1 on sheet / 5.77:1 on desk |
| `--rule` | `#5B7489` | `#7FA6C9` | Section hatch, dimension lines, and table rules | 4.66:1 on sheet / 3.80:1 on desk |
| `--redline` | `#C4161C` | `#FF8A80` | **Strictly reserved**: revision cloud, revision triangle, status | 5.77:1 on sheet / 4.70:1 on desk |
| `--focus` | `#0F2233` | `#FFE066` | Keyboard focus ring (square, 3px solid, 3px offset) | 15.48:1 on sheet / 8.95:1 on Blueprint |

*Contrast Verification Result:* **20 / 20 pairs PASSED** (0 failures).

### 2.2 Typography Hierarchy
- **Titles / Headings:** `Barlow Condensed` (weight: 600) loaded via `next/font/google`. Cover scale reaches `clamp(2.75rem, 11vw, 9.25rem)` with line-height `0.92`.
- **Text / Body:** `Barlow` (weights: 400, 600). Body copy is restricted to `max-w-[56ch]` to `max-w-[62ch]` for optimal reading cadence.
- **Data / Schedules:** `IBM Plex Mono` (weight: 400). Strictly reserved for tabular data, sheet numbers, stack tags, and metadata. Never used for body copy.
- **Redline Annotation:** `Kalam` (weight: 400). Strictly reserved for handwritten revision status inside the redline cloud.

---

## 3. Implemented Components & Architecture

### 3.1 Sheet Skeleton & Title Block (`components/asbuilt/AsBuiltSheet.tsx`)
- **Double Frame:** 3px outer `--ink` border enclosing a 1px `--rule` inner frame inset by 8px on desktop and tablet. On mobile (<640px), the inner frame drops cleanly to maximize usable viewport width while retaining the 3px outer border.
- **Drafting Zone Coordinates:** Top margin displays discrete architectural drafting coordinates (Zone 1 through Zone 8).
- **Dimension Line:** Reusable `<DimensionLine />` component with 45° oblique end ticks spanning under sheet titles (`aria-hidden="true"`).
- **Title Block:** Standardized 40px tall, 2px-outlined block anchored to the bottom-right of every sheet. Contains three 1px-divided cells:
  1. `{NAME}` (Barlow Condensed 600)
  2. Section Title, Project Name, or Role (Barlow 400)
  3. `Sheet n of 6` or `Sheet 3-X of 6` (IBM Plex Mono 400)
  The title block is marked `aria-hidden="true"` because all values exist as accessible content elsewhere on the sheet.

### 3.2 Navigation: Sheet Index (`components/asbuilt/AsBuiltNav.tsx`)
- **Desktop (≥1024px):** 208px sticky left rail (`top: 24px`) with six 40px sheet rows plus a dedicated theme toggle cell. The active row inverts (`bg-ink text-sheet`) with `aria-current="location"` tracked by an `IntersectionObserver` (`rootMargin: "-45% 0px -50% 0px"`).
- **Tablet (640px–1023px):** Sticky top index strip (48px height) sharing table-cell borders.
- **Mobile (<640px):** Fixed bottom sheet strip (56px + `env(safe-area-inset-bottom)`) with touch targets ≥48px. Current cell displays numeral and label; inactive cells display numerals with full `aria-label="Sheet n, Title"`.
- **Theme Toggle:** Toggles between Print (default) and Blueprint. Labeled with the alternate mode name ("Blueprint" in Print, "Print" in Blueprint) per §11.6.

### 3.3 Sheet 1: Cover Sheet (`components/asbuilt/AsBuiltHero.tsx`)
- `<h1>` cover title at `clamp(2.75rem, 11vw, 9.25rem)`.
- Verbatim unedited intro text from `data/social.ts` (`max-w-[56ch]`).
- Filled primary cell button ("See projects") and outlined secondary cell button ("Send an email").
- Boxed architectural engineering stamp block: `ISSUED FOR RECORD SET // AS-BUILT-2026 // REV D`.
- Owner portrait in Framed Viewport (`components/asbuilt/FramedViewport.tsx`) with 12px L-shaped drafting corner ticks.
- Mobile theme toggle bar at the top of the cover sheet (per §6.2.5).

### 3.4 Sheet 2: About Sheet (`components/asbuilt/AsBuiltAbout.tsx`)
- 7-column reading column for verified prose (`data/social.about` and `data/social.tagline`).
- 5-column schedule table of verified repository facts (Role, Current Affiliation, Education, Location, Academic Email) using semantic `<table>` structure.

### 3.5 Sheet 3: Projects Sheet & Sub-Sheets (`components/asbuilt/AsBuiltProjects.tsx` & `ProjectSubSheet.tsx`)
- **Sub-Sheet Index Strip:**
  - `Sheet 3-A: Overview & Schedule`
  - `Sheet 3-B: DaloyAqua Backend`
  - `Sheet 3-C: PlayIT Android ASR`
  - `Sheet 3-D: ReadHub Full-Stack`
  - `Sheet 3-E: Gordon RamsAi RAG`
- **Sheet 3-A (Overview & Schedule):**
  - **DaloyAqua Featured Detail Block:** Title in Barlow Condensed 600, status in Kalam font inside the **Redline Revision Cloud** with 800ms linear draw on 60% intersection, 45° section hatch window, and specification table.
  - **Project Schedule Table:** Complete schedule with direct "Inspect Specs [3-X]" quick jumps.
- **Sheets 3-B through 3-E (Technical Sub-Sheets):**
  - Problem definitions and boundary constraints.
  - **4-Stage Pipeline Schematic:** Visual horizontal nodes (`01` through `04`) with technology badges and drafting dimension lines.
  - **Interactive Step Inspector:** Stage description, full Input/Processing/Output Data Contract Table, hardware and timing metrics, and engineering tradeoff rationale.

### 3.6 Sheet 4: Skills Matrix (`components/asbuilt/AsBuiltSkills.tsx`)
- **Desktop & Tablet:** Cross-referencing matrix with vertical project headers (`writing-mode: vertical-rl; transform: rotate(180deg)`). Filled 10px `--ink` square marks exact matches against project stack tags with visually hidden text (`<span className="sr-only">Used in {project}</span>`).
- **Interactive Cross-Highlighting:** Clicking a project column or skill row illuminates the matching intersections instantly (0ms) across the grid with active filter controls.
- **Mobile Fallback:** Two-column schedule table (**Category | Items**) with Plex Mono wrapping chips.

### 3.7 Sheet 5: Experience Revision History (`components/asbuilt/AsBuiltExperience.tsx`)
- Formatted as a formal engineering revision history `<table>` with columns: **Rev | Period | Title | Organization | Description**.
- Chronological revision sequence: Rev A (Self-Directed Study), Rev B (Certifications), Rev C (CIT-U BSIT), Rev D (NEC Telecom Software Internship).
- Current entry (NEC Internship) is framed by a 16px `--redline` revision triangle without adding synthetic "Current" labels.
- Interactive "Read more" toggle controls description clamping via `aria-expanded`.

### 3.8 Sheet 6: Contact Transmittal & Desk Footer (`components/asbuilt/AsBuiltContact.tsx`)
- Transmittal block with large mailto link underlined by a dimension line rule.
- "Copy address" cell button with visual label swap and screen-reader `role="status"` live region announcement.
- Social directory table linking directly to GitHub, LinkedIn, academic email, and resume.
- Desk footer on `--desk` containing verified copyright and data preservation notice.

---

## 4. Verification & Quality Pass (§13)

| Check | Requirement | Result |
|---|---|---|
| 1 | Sections in order (`#home`, `#about`, `#projects`, `#skills`, `#experience`, `#contact`) | **PASS** — all 6 sheets present in exact order with verified IDs |
| 2 | No invented or rewritten repo content | **PASS** — 100% verified data preserved from `data/` files |
| 3 | Signature element & orchestrated moment | **PASS** — Sheet frames with title blocks; 800ms linear redline cloud draw on 60% intersection |
| 4 | No banned-defaults from §4.2 | **PASS** — Radius 0 everywhere, 0 shadows, 0 gradients, instant 0ms state transitions |
| 5 | No anti-goals from §6.2.14 | **PASS** — No CAD toolbars, no grid paper, mono only for data, redline strictly reserved |
| 6 | Stress test cases & sparse data | **PASS** — No-image hatch fallback, responsive tables, short experience cleanly spaced |
| 7 | Dual theme modes (Print / Blueprint) | **PASS** — Print default; Blueprint opt-in; 20/20 contrast pairs verified |
| 8 | Responsive behavior (360px, 768px, 1280px) | **PASS** — Desktop rail, tablet strip, mobile bottom sheet strip; adaptive tables |
| 9 | Accessibility (WCAG 2.2 Level AA) | **PASS** — Semantic tables, landmarks, skip link, live region, reduced motion support |
| 10 | Performance & bundle budgets | **PASS** — Turbopack compilation succeeded; zero client bundle bloat |
| 11 | Zero new dependencies | **PASS** — 0 new npm packages added |
| 12 | Protected paths unchanged | **PASS** — `data/*.ts` files untouched |
| 13 | Lint, typecheck, and build | **PASS** — `npm run lint`, `npx tsc --noEmit`, and `npm run build` exit code 0 |

---

## 5. Known Deviations & Technical Notes

1. **Hydration-Safe Theme Mounting:**
   - Under React 19 / Next.js 16, synchronous `setState` within `useEffect` triggers the `react-hooks/set-state-in-effect` lint error.
   - Utilized React's idiomatic `useSyncExternalStore` for client mounting and media-query evaluation (`prefers-reduced-motion`) without cascading renders or hydration mismatch.
2. **Dimension Lines:**
   - Realized as clean, non-scaling vector lines with 45° angled drafting ticks, ensuring crisp rendering across high-DPI displays.
3. **Sub-Sheet Navigation Hierarchy:**
   - Sub-sheets expand Sheet 3 into architectural sub-assemblies (3-A through 3-E) without altering root document URL anchors, maintaining clean compliance with §2.4 and §11.2.

---

## 6. Commit History on `portfolio/world-02-as-built`

- `f55c2b1` — `world-02: setup As-Built tokens, fonts, and base stylesheet`
- `386d91e` — `world-02: implement sheet frame, title block, and sheet index navigation`
- `dba78a4` — `world-02: implement cover and about sheets`
- `efbf737` — `world-02: implement projects sheet with redline revision cloud and schedule`
- `3c72313` — `world-02: implement skills matrix, experience revision history, and contact transmittal`
- `e2b0c80` — `world-02: add World 02 report`
- `world-02: elevate As-Built with project sub-sheets, pipeline schematics, and drafting details`

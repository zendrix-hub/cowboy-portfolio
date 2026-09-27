# World 05: Runtime — Build Report

**Branch:** `portfolio/v2-world-05-runtime`  
**Base:** `portfolio/baseline` (`f3cff4a`)  
**Specification:** `PORTFOLIO_DESIGN_EXPLORATION_V2.md` §9.5  
**Category:** Whiteboard Systems Diagram / Architectural Flowchart  

---

## 1. Executive Summary

Runtime constructs the portfolio as a clear, systemic whiteboard flowchart sketched by an engineer who understands systems deeply enough to explain them simply:
- **Metaphor**: A physical whiteboard diagram with a **start node** (Hero), a sequence of **module** and **process** nodes wired together, and an **end node** (Contact). Skills are the **components** the modules are built from, and thin hand-drawn connector lines wire each project module to the components it actually uses.
- **Philosophy**: Clear, systemic, legible. This is explicitly **not** a dark developer dashboard or terminal — Whiteboard (`#F7F5F0`) is the default ground, and Chalkboard (`#1E2B24`) is an alternate mode, completely avoiding the cliché neon-on-dark developer aesthetic.
- **Spatial Model**: A wired diagram (nodes and inter-node connections are equal parts of the content, centered at max 720px width). Start and end nodes are stadium-shaped (`rounded-full`), while intermediate nodes are rectangular with subtle `8px` rounded corners (`rounded-lg`).
- **Signature Element & Orchestrated Moment**: The Whiteboard Wiring Connects (§9.5.7, §9.5.11). Unlike traditional landing pages, the Hero has **zero orchestrated motion**. Instead, when DaloyAqua reaches 60% viewport visibility, orthogonal circuit-style `--marker` wires draw outward to each matched component tag in sequence (`stroke-dashoffset`, ~700ms `ease-out` per wire, staggered ~60ms), then each destination tag's border transitions to `--marker` over 150ms. A `sessionStorage` gate (`runtime-wiring-drawn`) guarantees play-once per session, while `prefers-reduced-motion` displays all wires and borders immediately at 0ms.
- **Strict Anti-Goals Compliance (§9.5.14)**:
  - Whiteboard mode is default; no dark-mode-default terminal look.
  - Zero neon, zero glow, zero scanlines or CRT flicker effects.
  - Zero fake code syntax (no decorative semicolons, curly braces, or shell prompts).
  - Zero invented state vocabulary — project status is rendered verbatim from repository data ("In Progress", "Flagship Engineering Thesis").
  - Zero literal decision-diamond shapes (no artificial yes/no branches).
  - Exactly one marker color used across the world (`#227A4C` / `#8FD9A8`), with zero secondary marker colors.
  - Zero circuit-board texture or hexagon-grid background patterns.

---

## 2. Visual Identity & Design Tokens

### 2.1 Color Palette & Contrast Verification

Every color pair was tested using `scripts/contrast.mjs scripts/world-05-runtime-pairs.json` based on the WCAG 2.2 AA relative luminance formula:

| Mode | Token | Hex | Role | Contrast Ratio | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Whiteboard** (Default) | `--board` | `#F7F5F0` | Board Ground | — | Base |
| **Whiteboard** (Default) | `--ink` | `#232323` | Text, node borders | **14.43:1** (need 4.5:1) | **PASS** |
| **Whiteboard** (Default) | `--ink-2` | `#5B5B57` | Secondary text, port labels | **6.26:1** (need 4.5:1) | **PASS** |
| **Whiteboard** (Default) | `--marker` | `#227A4C` | White text on marker accent | **5.31:1** (need 4.5:1) | **PASS** |
| **Whiteboard** (Default) | `--marker` | `#227A4C` | Marker wiring UI vs. board ground | **4.87:1** UI (need 3.0:1) | **PASS** |
| **Chalkboard** (Alternate) | `--board` | `#1E2B24` | Board Ground | — | Base |
| **Chalkboard** (Alternate) | `--ink` | `#F2F1E8` | Text, node borders | **12.99:1** (need 4.5:1) | **PASS** |
| **Chalkboard** (Alternate) | `--ink-2` | `#B9C2B9` | Secondary text, port labels | **8.05:1** (need 4.5:1) | **PASS** |
| **Chalkboard** (Alternate) | `--marker` | `#8FD9A8` | Dark text on marker accent | **8.88:1** (need 4.5:1) | **PASS** |
| **Chalkboard** (Alternate) | `--marker` | `#8FD9A8` | Marker wiring UI vs. board ground | **8.88:1** UI (need 3.0:1) | **PASS** |

**Verification Result:** 8/8 test pairs PASSED with generous safety margins. Exactly one marker accent (`--marker`) is used across the world, reserved strictly for:
1. Orthogonal wiring lines connecting projects to matched skills
2. Active / current role process fill in Experience
3. Pipeline stepper's active node indicator
4. Matched component tag borders in Skills

### 2.2 Typography Hierarchy

- **Display & Technical Labels**: `Space Mono` (400, 700) — Nameplate, node headings, port labels, configuration parameters, periods.
- **Body & Explanatory Copy**: `Manrope` (400, 500) — Candidate bio, problem/constraint descriptions, project narratives, role duties.

---

## 3. Structural Implementation

### 3.1 Pipeline Stepper Navigation (`components/runtime/PipelineStepper.tsx`)
- Sticky top bar with 6 node-icon links in a horizontal row (stadium shape for Hero/Contact, rectangular shape for internal nodes), joined by a thin `--ink-2` line.
- The active node is dynamically highlighted with `--marker` fill via `IntersectionObserver` (`rootMargin: "-45% 0px -50% 0px"`).
- Stage bracket labels (`[Init]`, `[Input]`, `[Modules]`, `[Process]`, `[Output]`) provide semantic grouping without altering the accessible names.
- Tablet view collapses to icon-only links with hover/focus tooltips.
- Mobile view (<640px) collapses to a fixed bottom "Flow" button opening a native `<dialog>` with a vertical flowchart list (each item ≥48px tall).

### 3.2 Hero Start Node (`components/runtime/RuntimeHero.tsx`)
- Section `#hero`.
- Full stadium shape (`rounded-full`, 2px `--ink` border, max 720px width).
- Candidate name in Space Mono 700 (`clamp(2.25rem, 7vw, 4.75rem)`), role, subrole, and verbatim intro in Manrope.
- Outlined action buttons ("See projects", "Send email").
- Zero orchestrated motion in hero per §9.5.4.

### 3.3 About Input Node (`components/runtime/RuntimeAbout.tsx`)
- Section `#about`.
- Rectangular input node (`rounded-lg`, 1px `--ink` border).
- Header bar: "About // INPUT_NODE".
- Full unedited candidate bio and tagline.
- Nested configuration parameter block rendering metadata facts (location, education, internship, focus).

### 3.4 Projects Modules (`components/runtime/RuntimeProjects.tsx`)
- Section `#projects`.
- **Featured Module (DaloyAqua)**: 2px `--ink` border. Header with Space Mono title and verbatim status pill ("In Progress"). Description in Manrope. Bottom edge carries in-ports for matched skills (`Python`, `FastAPI`, `APScheduler`). Right edge carries out-port link to source repository.
- **Supporting Modules**: PlayIT, ReadHub, and Gordon RamsAi rendered with 1px border and port conventions.
- 60% viewport visibility observer triggers the signature orthogonal wiring animation.

### 3.5 Orthogonal Wiring Channel (`components/runtime/WiringChannel.tsx`)
- Positioned between Projects and Skills.
- Renders 3 orthogonal circuit wiring paths with 90° right angles (no diagonal lines) and subtle SVG marker wobble (`feTurbulence` + `feDisplacementMap`).
- Staggered stroke-dashoffset animation draws lines down into Skills when triggered.

### 3.6 Skills Component Registry (`components/runtime/RuntimeSkills.tsx`)
- Section `#skills`.
- Single module node containing candidate skills grouped by category.
- Component tags rendered with `0px` radius and 1px border.
- Wired skills matched from projects receive a `--marker` border upon wiring completion.

### 3.7 Experience Process Sequence (`components/runtime/RuntimeExperience.tsx`)
- Section `#experience`.
- Vertical sequence of process step rectangles (`rounded-lg`, 1px border) joined by downward flow connectors with small direction triangles.
- The active current posting (NEC Telecom Software) is rendered with `--marker` fill, high-contrast text, and 1px border.

### 3.8 Contact End Node (`components/runtime/RuntimeContact.tsx`)
- Section `#contact`.
- Full stadium shape (`rounded-full`, 2px border).
- Large Space Mono mailto address, "Copy address" outlined button with screen-reader feedback (`aria-live="polite"`), and output port links to GitHub and LinkedIn.

---

## 4. Accessibility & Quality Verification

- **Keyboard Navigation**: Skip link (`#content`), logical tab order across stepper and all nodes, focus outlines (`outline: 2px solid var(--marker); outline-offset: 3px`).
- **Reduced Motion**: Under `prefers-reduced-motion: reduce`, all wire stroke animations, border transitions, and SVG filters are disabled (`animation: none !important; stroke-dashoffset: 0 !important; filter: none !important`).
- **Forced Colors Mode**: Under `@media (forced-colors: active)`, all custom colors and fills map to system tokens (`CanvasText`, `Highlight`, `HighlightText`), maintaining visible borders throughout.
- **Quality Gates**:
  - `npm run lint`: **0 errors, 0 warnings**
  - `npx tsc --noEmit`: **0 errors**
  - `npm run build`: **0 errors** (prerendered all 8 routes in Turbopack)

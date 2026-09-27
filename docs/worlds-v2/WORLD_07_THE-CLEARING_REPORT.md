# World 07: The Clearing — Build Report

**Branch:** `portfolio/v2-world-07-the-clearing`  
**Base:** `portfolio/baseline` (`5f4eb93`)  
**Specification:** `PORTFOLIO_DESIGN_EXPLORATION_V2_ADDENDUM.md` §9.7  
**Category:** Spatial Restraint / Deliberate Emptiness  

---

## 1. Executive Summary

The Clearing makes restraint a genuine spatial model rather than a decorative mood:
- **Metaphor**: A clearing in dense material — the one open, quiet space that everything else is cut away to make room for.
- **Philosophy**: Restraint as the entire design language. Built from real compositional principles — asymmetric balance, deliberate emptiness, generous line-height — strictly rejecting applied cultural costume (zero kanji, zero torii gates, zero cherry blossoms, zero red-and-black lacquer palettes, zero simulated paper fiber textures).
- **Spatial Model**: Subtraction. Every section reserves at least **60% of its viewport height as genuinely empty ground**. Content sits off-axis in a single narrow measure (max 32rem) alternating deliberately from section to section (~30% left, then ~70% right).
- **Signature Element & Orchestrated Moment**: The Single Quiet Line (§9.7.11). On first visit per session, immediately after hero text is mounted, a single thin 1px `--mark` line extends once beside the hero content over **2000ms, `cubic-bezier(.4, 0, .2, 1)`** — the slowest, quietest motion in the family. Repeat visits and `prefers-reduced-motion` render the line immediately at 0ms. Nothing else on the page moves.
- **Strict Anti-Goals Compliance (§9.7.14)**:
  - Zero containers of any kind (no cards, no boxes, no borders, no shadows).
  - Zero border-radius (`rounded-none` everywhere).
  - Zero decorative chrome labels (the one world with no decorative tags).
  - Density is the lowest in the family, lower even than Star Chart or The Current.

---

## 2. Visual Identity & Design Tokens

### 2.1 Color Palette & Contrast Verification

Every color pair was tested using `scripts/contrast.mjs scripts/world-07-the-clearing-pairs.json` based on the WCAG 2.2 AA relative luminance formula:

| Mode | Token | Hex | Role | Contrast Ratio | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Paper** (Default) | `--ground` | `#EFEEEA` | Neutral warm stone ground | — | Base |
| **Paper** (Default) | `--ink` | `#1C1B18` | Primary typography & the single line | **14.83:1** (need 4.5:1) | **PASS** |
| **Paper** (Default) | `--ink-2` | `#6B675E` | Meta and secondary descriptions | **4.85:1** (need 4.5:1) | **PASS** |
| **Paper** (Default) | `--mark` | `#7C8567` | Reserved accent (the line, active underline) | **3.34:1** UI (need 3.0:1) | **PASS** |
| **Ink** (Dark) | `--ground` | `#1A1917` | Deep slate stone ground | — | Base |
| **Ink** (Dark) | `--ink` | `#EDEAE3` | Primary typography | **14.62:1** (need 4.5:1) | **PASS** |
| **Ink** (Dark) | `--ink-2` | `#9C978C` | Meta and secondary descriptions | **6.04:1** (need 4.5:1) | **PASS** |
| **Ink** (Dark) | `--mark` | `#9BA588` | Reserved accent | **6.80:1** UI (need 3.0:1) | **PASS** |

**Verification Result:** 6/6 test pairs PASSED with safety margins. Exactly one reserved accent (`--mark`) is used across the world, reserved strictly for:
1. The single 2000ms extended line in the hero
2. The active section indicator underline in the navigation list
3. Interactive link underline transitions on hover/focus

### 2.2 Typography Hierarchy

- **Display**: `Shippori Mincho` (400, 500) — Candidate name (`clamp(2.25rem, 6vw, 4.5rem)` / 1.2, letter-spacing 0.02em) and section titles (`clamp(1.5rem, 3vw, 2.25rem)` / 1.3). A refined, understated serif chosen for pure typographic quality.
- **Body**: `Zen Kaku Gothic New` (400, 500) — Body copy set with generous line-height (`1.9`) and wide letter-spacing (`0.01em`), creating the quietest reading rhythm in the family.

---

## 3. Structural Implementation

### 3.1 Quiet Mark Navigation (`components/clearing/QuietMarkNav.tsx`)
- Desktop (≥1024px): A single small 8px dot at `bottom: 32px; right: 32px` with zero chrome. On hover or keyboard focus, it expands into a right-aligned plain vertical text list of the six sections with 200ms fade.
- The active section is marked with a 1px `--mark` underline and `aria-current="location"`.
- Mode switcher ("Paper" / "Ink") sits quietly as the 7th word in the list.
- Tablet/Mobile (<1024px): 44px tap target opens the same unornamented text list inside a native `<dialog>`.

### 3.2 Hero Section (`components/clearing/ClearingHero.tsx`)
- Section `#hero`, positioned off-axis left (~30% position, `clearing-pos-left`).
- Features the single 2000ms `--mark` line extending once on session init.
- Shippori Mincho nameplate, unedited intro in Zen Kaku Gothic New, and plain text action links.

### 3.3 About Section (`components/clearing/ClearingAbout.tsx`)
- Section `#about`, positioned off-axis right (~70% position, `clearing-pos-right`).
- Unedited candidate bio, tagline, and quiet parameter lines at the end of the measure.

### 3.4 Projects Section (`components/clearing/ClearingProjects.tsx`)
- Section `#projects`, positioned off-axis left (~30% position, `clearing-pos-left`).
- Featured project (DaloyAqua) with Shippori Mincho title and plain text status ("In Progress" — zero badges/pills).
- Supporting projects (PlayIT, ReadHub, Gordon RamsAi) appended with generous vertical breathing room, separated purely by whitespace.

### 3.5 Skills Section (`components/clearing/ClearingSkills.tsx`)
- Section `#skills`, positioned off-axis right (~70% position, `clearing-pos-right`).
- Categories presented as plain running text separated only by wide whitespace (zero chips, zero progress bars).

### 3.6 Experience Section (`components/clearing/ClearingExperience.tsx`)
- Section `#experience`, positioned off-axis left (~30% position, `clearing-pos-left`).
- Chronological timeline formatted as plain stacked lines with generous spacing. Current role distinguished typographically in `--ink`.

### 3.7 Contact Section (`components/clearing/ClearingContact.tsx`)
- Section `#contact`, positioned off-axis right (~70% position, `clearing-pos-right`).
- Large mailto address in Shippori Mincho, plain "Copy address" text link with live region, and unadorned social links.

---

## 4. Accessibility & Quality Verification

- **Keyboard Navigation**: Quiet mark dot is fully discoverable via `Tab` focus; focus rings use the widest offset in the family (`outline-offset: 6px`).
- **Reduced Motion**: Under `prefers-reduced-motion: reduce`, the 2000ms line is immediately visible at 0ms.
- **Forced Colors Mode**: Custom colors map cleanly to system tokens (`CanvasText`, `Highlight`).
- **Quality Gates**:
  - `npm run lint`: **0 errors, 0 warnings**
  - `npx tsc --noEmit`: **0 errors**
  - `npm run build`: **0 errors** (prerendered all 8 routes in Turbopack)

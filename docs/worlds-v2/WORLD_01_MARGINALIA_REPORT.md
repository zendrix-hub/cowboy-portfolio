# World 01: Marginalia (The Living Notebook) — Build Report

**Branch:** `portfolio/v2-world-01-marginalia`  
**Base:** `portfolio/baseline` (`f3cff4a`)  
**Specification:** `PORTFOLIO_DESIGN_EXPLORATION_V2.md` §9.1  
**Category:** Required Paper/Print World  

---

## 1. Executive Summary

Marginalia is a living, working desk notebook built up by its owner over time. Unlike archival or issued drawing sets (such as *As-Built*), Marginalia captures the intimacy, warmth, and tactile discipline of handled physical paper:
- **Pages stack with physical overlap and depth**: 6 distinct pages, each with a deterministic seeded rotation between −1.5° and 1.5° and unique irregular torn-edge SVG clip-paths.
- **Strict device restraint**: Exactly two physical devices are used across the entire world — semi-translucent tape strips (at page top corners, candidate portrait, and the contact postcard only) and one hand-stamped mark on DaloyAqua.
- **Orchestrated motion moment**: The Hero page settles once per session over 650ms `cubic-bezier(0.16, 1, 0.3, 1)` into its resting position, while the tape strips stay stationary on the desk ground. Repeat visits and `prefers-reduced-motion` settle immediately at 0ms.
- **Zero generic drift**: No fake paper texture images, no yellowed sepia filters, no washi-tape patterns, no doodles, and no handwriting on titles or body copy.

---

## 2. Visual Identity & Design Tokens

### 2.1 Color Palette & Contrast Verification

Every color pair was tested using `scripts/contrast.mjs scripts/world-01-marginalia-pairs.json` based on the WCAG 2.2 AA relative luminance formula:

| Mode | Token | Hex | Role | Contrast Ratio | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Desk** | `--paper` | `#F0F1ED` | Ground (Cool grey recycled paper, not cream) | — | Base |
| **Desk** | `--ink` | `#262220` | Headings & primary reading text | **13.90:1** (need 4.5:1) | **PASS** |
| **Desk** | `--ink-2` | `#54504A` | Secondary text, meta, page numbers | **7.06:1** (need 4.5:1) | **PASS** |
| **Desk** | `--stamp` | `#A63D2F` | Reserved status stamp (Oxide red) | **5.56:1** (need 4.5:1) | **PASS** |
| **Desk** | `--tape` | `#38726B` | Tape strips & bookmark tabs (Teal) | **4.89:1** UI (need 3.0:1) | **PASS** |
| **Desk** | Text on Tape | `#FFFFFF` | Bookmark tab labels | **5.54:1** (need 4.5:1) | **PASS** |
| **Desk** | Ground Lift | `#F0F1ED` on `#E2E4DE` | Paper sheet against desk ground | **1.13:1** (need 1.1:1) | **PASS** |
| **Lamp** | `--paper` | `#2B241E` | Ground (Warm charcoal sheet ground) | — | Base |
| **Lamp** | `--ink` | `#F1E9DA` | Headings & primary reading text | **12.67:1** (need 4.5:1) | **PASS** |
| **Lamp** | `--ink-2` | `#C9BEAE` | Secondary text, meta, page numbers | **8.34:1** (need 4.5:1) | **PASS** |
| **Lamp** | `--stamp` | `#E2725C` | Reserved status stamp | **4.95:1** (need 4.5:1) | **PASS** |
| **Lamp** | `--tape` | `#8FD4C7` | Tape strips & bookmark tabs | **9.03:1** UI (need 3.0:1) | **PASS** |
| **Lamp** | Text on Tape | `#2B241E` | Bookmark tab labels | **9.03:1** (need 4.5:1) | **PASS** |
| **Lamp** | Ground Lift | `#2B241E` on `#1C1713` | Paper sheet against dark desk ground | **1.16:1** (need 1.1:1) | **PASS** |

**Verification Result:** 13/13 test pairs PASSED with 0 failures.

### 2.2 Typography Hierarchy

- **Titles**: `Lora` (600 weight) — Candidate name, page headers, project and milestone titles.
- **Reading**: `Source Serif 4` (400 and 600 weight) — Intro narrative, bio paragraphs, project descriptions.
- **Typed Meta**: `Courier Prime` (400 and 700 weight) — Byline (`> Software / Full-Stack Developer`), dates, page numbers (`p. 1`–`6`), stack tags, verified facts schedule.
- **Margin Annotations**: `Caveat` (500 and 600 weight) — Strictly reserved for short margin annotations, never used for headings or body copy.

All fonts loaded via `next/font/google` with Latin subsetting and `display: "swap"`.

---

## 3. Physical Devices & Signature Elements

1. **The Stamp (`components/marginalia/Stamp.tsx`)**:
   - Circular-oval SVG mark with dashed dual boundary, angled at −11°, rendered in `--stamp`.
   - Stamped over the top-right corner of the featured DaloyAqua index card.
   - Text states `FIELD RECORD // IN PROGRESS // STAMP // ARCHIVE`.
   - Includes `role="note"` and `aria-label="Project status stamp: In Progress"`. Real status text also appears in DOM reading order.
2. **The Tape Strips (`components/marginalia/TapeStrip.tsx`)**:
   - Translucent rectangular tags (`--tape` / `--tape-light`) with 2px radius and slight drop shadow.
   - Strictly placed: two at the top edge of each page, one securing the hero candidate photograph, and one holding the contact postcard.
   - Zero tape graphics decorating skills chips or scattered decoratively.
3. **The Torn Edges & Page Stacking (`components/marginalia/MarginaliaPage.tsx`)**:
   - Six deterministic polygon clip-paths, creating unique torn paper edges along the top of each page.
   - Seeded page rotations: Page 1 (−0.75°), Page 2 (+1.1°), Page 3 (−0.9°), Page 4 (+0.8°), Page 5 (−1.2°), Page 6 (+0.6°).
   - Stacking order `z-10` to `z-60` ensures that as the user scrolls, the next page's torn top edge visibly overlaps the bottom of the prior page.
4. **Left Margin Column**:
   - Reserves an ~18% left-hand margin on desktop screens for authentic handwritten annotations and verified facts.
   - Unoccupied margins remain clean, authentic white space.

---

## 4. Section Structure & Verification

### Page 1: Hero (`#home`)
- Lora 600 name, Courier Prime typed byline (`> Software / Full-Stack Developer`).
- Verbatim intro text and tagline in Source Serif.
- Candidate photo (`/images/Riva_ID.png`) taped into the margin column in a rotated card with Caveat caption. On mobile, rendered centered above name.
- Text-link actions: "See projects →" and "Send an email ↗" with 1px → 2px thickening underline.
- 650ms `animate-page-settle` executes on first visit, disabled when reduced motion is preferred or after first view.

### Page 2: About (`#about`)
- Unedited, full-length bio in Source Serif without truncation.
- Margin annotations in Caveat referencing CIT-U BSIT candidate status and offline-first mobile focus.
- Verified Facts Schedule Log in Courier Prime (`STATUS`, `AFFILIATION`, `FORMATION`, `LOCATION`, `ACADEMIC`).

### Page 3: Projects (`#projects`)
- Featured Project (DaloyAqua): Large index card with `--lift` elevation, tech tags, and the hand-stamped status mark.
- Supporting Projects: 2-column grid of smaller index cards with seeded rotations (−1.2°, 1.4°, −0.8°, 1.1°), stack tags, and repository/live links.
- Restricted capstone projects display explicit `[RESTRICTED / DEPED OFFLINE]` indicator.

### Page 4: Skills (`#skills`)
- Category groupings in Courier Prime (`Languages`, `Frameworks`, `Architecture`, `Tools & Databases`).
- Paper scrap tag chips with 2px border radius, thin `--ink-2` borders, and seeded rotations (−3° to +3°).
- Zero percentage bars, zero progress meters, zero synthetic ratings.

### Page 5: Journey / Experience (`#experience`)
- Chronological logbook with period in Courier Prime and title in Lora.
- Active role marker (`Active` badge) and margin annotation for NEC Telecom Software Philippines internship.

### Page 6: Contact (`#contact`)
- Torn-edge postcard container with top corner tape strip.
- Courier Prime email address with copy button featuring polite `role="status"` live region confirmation ("Copied to clipboard!").
- Social links list (GitHub, LinkedIn, Resume PDF) with 1px → 2px hover underlines.
- Final page footer with copyright and world identity credit.

---

## 5. Navigation & Responsiveness

### 5.1 Bookmark Tabs (`components/marginalia/MarginaliaNav.tsx`)
- **Desktop (≥1024px)**: Fixed right-edge vertical tabs with `writing-mode: vertical-rl` in `--tape` and `--tape-light`. Current tab extends 14px outward with `aria-current="location"`.
- **Tablet (640–1023px)**: Tabs collapse to numeral tags (`1`–`6`), expanding on hover/focus.
- **Mobile (<640px)**: Fixed bottom pill containing flag tags (`p.1`–`p.6`) with safe-area insets (`calc(8px + env(safe-area-inset-bottom))`) and 44px tap targets.
- **Theme Toggle**: Integrated as bottom tab / flag, dynamically switching between Desk and Lamp modes.
- **Scrollspy**: Single `IntersectionObserver` with `rootMargin: "-45% 0px -50% 0px"`.
- **Mobile Spacing**: `scroll-padding-bottom: 5rem` in `app/globals.css` prevents bottom flags from obscuring section anchors.

---

## 6. Accessibility & Quality Gates

- **Contrast**: 13/13 pairs passed WCAG 2.2 AA.
- **Focus Rings**: `:focus-visible` styled with `outline: 2px solid var(--ink)` and `outline-offset: 3px`.
- **Forced Colors (`@media (forced-colors: active)`)**: Explicit 1px solid `ButtonText` borders and `Highlight` outlines for paper pages, cards, chips, and bookmark tabs.
- **Reduced Motion**: Disables hero page settle animation, removes card hover translations, and sets `scroll-behavior: auto`.
- **Screen Reader Parity**: Decorative SVG torn paths and tape strips are `aria-hidden="true"`; stamp status is announced via `aria-label` and native DOM text.
- **Code Quality Checks**:
  - `npm run lint`: **0 errors, 0 warnings**
  - `npx tsc --noEmit`: **0 errors**
  - `npm run build`: **8/8 routes prerendered successfully with Turbopack**

---

## 7. Anti-Generic Check (§14.4)

> *Could this design be found in a generic AI-generated developer portfolio template?*

**No.** Marginalia is immediately identifiable as a living, handled notebook:
1. The physical interaction relies on a singular 650ms page settle into place beneath stationary desk tape strips.
2. The DaloyAqua status uses a bespoke hand-stamped oxide mark rather than generic SaaS pill badges.
3. The candidate portrait is taped into the notebook margin with a handwritten Caveat caption rather than floating inside a circular gradient ring.
4. The typography deliberately pairs Lora and Source Serif 4 with Courier Prime typewritten notes and cool recycled paper tones, avoiding the ubiquitous cream-serif-terracotta cliché.

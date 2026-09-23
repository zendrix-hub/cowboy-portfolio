# V2 Design DNA: Empirical Cross-World Matrix

**Document:** `docs/worlds-v2/DESIGN_DNA.md`  
**Execution Phase:** Phase 0 (Audit)  
**Specification Reference:** `PORTFOLIO_DESIGN_EXPLORATION_V2.md` §2  
**Audit Date:** September 23, 2026  
**Auditor:** AGY CLI (Empirical Repository Inspection)  

---

## 1. Measured Design DNA Matrix

This table replaces the speculative `[SPEC-DERIVED]` table from V2 §2 with empirical measurements and verified code realities drawn from the three production-ready V1 branches:
- **Biyahe:** `portfolio/world-01-biyahe` (commit `cd32bf7`)
- **As-Built:** `portfolio/world-02-as-built` (commit `1962309`)
- **The Current:** `portfolio/world-03-the-current` (commit `1568d51`)

| Dimension | World 01: Biyahe | World 02: As-Built | World 03: The Current |
| :--- | :--- | :--- | :--- |
| **Mood** | Loud, warm, confident, tactile, high-energy | Cool, precise, quiet, archival, verifiable | Calm, deep, spacious, unhurried, poetic |
| **Density** | Medium-high (dense destination boards, decal callouts, fact plates) | Very high (tabular schedules, 2D cross-reference matrix, engineering title blocks) | Very low (radical whitespace, 36rem reading columns against open water channels) |
| **Primary Layout Logic** | Full-width horizontal vehicle body panels separated by 10px triple pinstripes | Framed drawing sheets (`AsBuiltSheet`) with 3px/1px double border and bottom-right title blocks | Borderless, containerless full-bleed zones with alternating reading columns and line channels |
| **Typography Character** | **Bungee** (all-caps display plate signage) + **Lexend** (tactile sans body) | **Barlow Condensed** (titles) + **Barlow** (body) + **IBM Plex Mono** (telemetry) + **Kalam** (redline notes) | **Fraunces 300** (large delicate editorial serif) + **Hanken Grotesk** (understated body sans) |
| **Shape Language** | Stamped enamel plates, 3D depth shadows (`3px`–`6px`), 4-corner rivet dots | Pure Cartesian right angles: `border-radius: 0 !important; box-shadow: none !important` | Pure continuous curvature (Catmull-Rom spline), zero borders, zero containers |
| **Color Behavior** | 6 saturated flat fields (Sun, Signal, Cobalt, Leaf, Chalk, Enamel); color defines the band | 2 inks on drafting stock (Print: `#DDE4EA`/`#F8FAFC`/`#1A2229`/`#D9381E`; Blueprint mode) | 1 disciplined hue ramp across 6 full-bleed flat zones (`#EDF7F6` down to `#072830`; Deep mode) |
| **Navigation Model** | Sticky colored route plates; mobile bottom-right trigger opens native `<dialog>.showModal()` | Sticky left rail (desktop), top strip (tablet), bottom sheet strip with numeral cells (mobile) | Fixed dual-tone depth gauge rail with traveling ring marker; mobile bottom pill + native `popover` |
| **Project Presentation** | 4 full-width stacked destination boards (`STOP 02-A`–`D`) with expandable 4-stage architecture disclosures | Featured DaloyAqua detail sheet with redline revision cloud; supporting projects in a 4-column Schedule table | Featured DaloyAqua in a 56px radius **eddy chamber** loop; supporting projects threaded as stations on the spline |
| **Interaction Model** | Physical and tactile: press, release, overshoot (`pressable-plate` depth shift) | Referential and archival: instant state (`transition: none !important`), clickable cross-references | Ambient and fluid: page reveals as you scroll; single continuous spline line tracking scroll |
| **Motion** | **One core moment:** 850ms mechanical roll-sign name reveal (`steps(4, end)`, `sessionStorage`) | **One core moment:** 800ms linear plotter redline cloud draw + 160ms triangle fade at 60% intersection | **Signature continuous motion:** Catmull-Rom spline drawn by scroll; 1.4s entrance stroke; portrait float |
| **Spatial Rhythm** | Uneven band splits, alternating high-saturation fields, vehicle body rhythm | Regularized sheet rhythm (`1120px` max-width), consistent double frame and title block | Dramatic vertical expansion, deep quiet transitions, alternating reading sides |
| **Signature Element** | Destination-board hero with roll-sign and pressed enamel plates | 12-scallop SVG redline revision cloud in Kalam font | Continuous Catmull-Rom spline line threading every section into email underline |
| **Strongest Aspect (Empirical)** | **Tactile Physicality & Capstone Pride:** 3D press states, rivet accents, and gold capstone thesis emblem create unmatched personal flavor. | **Structural Integrity & Honest Verification:** Strict `skill === tag` matching and tabular layout convey immense engineering credibility. | **Atmospheric Craft & Fluid Beauty:** Catmull-Rom math, binary search length caching, and floating uncropped portrait create a gallery-grade experience. |
| **Weakest Aspect (Empirical)** | **Safe-Area Hardcoding:** Mobile Routes button uses hardcoded `bottom-5 right-4` instead of `env(safe-area-inset-bottom)`. | **Aesthetic Austerity:** Pure tabular presentation and zero easing may feel overly stark to non-technical recruiters. | **Motion Discipline Drift:** Later addition of portrait buoyancy float and pulse violates V1 §6.3.11's strict single-motion rule. |

---

## 2. Deep Dive by Dimension

### 2.1 Mood & Atmosphere
- **World 01 (Biyahe):** Radiates optimism, pride in Filipino transit heritage, and tangible craftsmanship. It feels like stepping into a master mechanic's workshop or riding a bespoke transit express.
- **World 02 (As-Built):** Radiates absolute sobriety, precision, and architectural discipline. It feels like inspecting an issued structural blueprint set at a drafting table.
- **World 03 (The Current):** Radiates tranquility, editorial prestige, and intellectual focus. It feels like diving into an ocean trench where each meter reveals deeper technical substance.

### 2.2 Layout & Spatial Mechanics
- **World 01:** Layout is defined by full-width color fields (`bg-[#1B3FD1]`, `bg-[#FFC72C]`, `bg-white`, `bg-[#0F9D58]`, `bg-[#E4262A]`). Pinstripes enforce clean horizontal boundaries.
- **World 02:** Layout is defined by discrete drawing sheets framed inside an outer drafting desk (`#DDE4EA` in Print, `#082B4A` in Blueprint). Every sheet follows an identical structural contract: Title + Dimension Line &rarr; Content Canvas &rarr; 3-Cell Title Block.
- **World 03:** Space *is* the structure. Absolutely zero containers, boxes, cards, or borders exist. The content breathes in a 36rem column that strictly alternates between left and right across all 6 zones on desktop (Home left, About right, Projects left, Skills right, Experience left, Contact right).

### 2.3 Typography Systems
- **World 01:** Bungee handles all navigational chrome, section headers, stop codes, and callout badges in bold, unapologetic uppercase. Lexend handles body reading, offering exceptional legibility and tactile warmth.
- **World 02:** Four distinct typographic voices: Barlow Condensed for architectural headers, Barlow for general text, IBM Plex Mono for technical telemetry and data cells, and Kalam exclusively for informal redline notations.
- **World 03:** Two voices: Fraunces 300 for monumental, delicate serif display, and Hanken Grotesk for neutral, invisible body reading.

### 2.4 Interaction & Motion
- **World 01:** Tactile. Every interactive button, chip, and plate is physical, featuring a 3px–4px depth band that physically depresses on `:active` and `:focus`. Motion is mechanical and discrete.
- **World 02:** Referential. Zero easing everywhere (`transition: none !important; animation-duration: 0.01ms !important`). Clicking is instant, echoing archival documents where paper doesn't animate.
- **World 03:** Ambient. Scrolling physically draws the Catmull-Rom spline line via a passive `requestAnimationFrame` loop and binary search length mapping.

---

## 3. Spatial Model Analysis & V2 Opportunities

V2 §2.1 correctly hypothesized that at the macro-architectural level:
> *"All three V1 worlds are section-based, vertically stacked, single-column-per-viewport experiences that differ in surface treatment (color, type, border logic) more than in fundamental spatial model."*

While each V1 world pushed its visual metaphor to extraordinary heights (painted route boards, drawing sheets, oceanic depth descent), all three require the user to scroll vertically down a single long document.

This confirms the core thesis of `PORTFOLIO_DESIGN_EXPLORATION_V2.md` §7:
The five new V2 worlds must claim **fundamentally different spatial models**:
1. **Marginalia:** Paged, layered sheets you work through (a living personal notebook).
2. **The Masthead:** Spreads read like an open publication (editorial spreads).
3. **The Wing:** Rooms or bounded spaces you move between (architectural gallery).
4. **Star Chart:** A non-linear field explored with an interactive map/overview.
5. **Runtime:** A live, running program whose components are wired together.

# Worlds V2: Technical Diversity Matrix

**Execution Phase:** Phase 3 (Session J)  
**Base:** `portfolio/baseline` (`f3cff4a`)  
**Specification:** `PORTFOLIO_DESIGN_EXPLORATION_V2.md` §11, §14.1  

---

## 1. The Realized Five New Worlds Against Each Other

This matrix reflects the **actual built implementations** on branches `portfolio/v2-world-01-marginalia` through `portfolio/v2-world-05-runtime`, verified against real code, stylesheets, and browser renders.

| Dimension | World 01: Marginalia | World 02: The Masthead | World 03: The Wing | World 04: Star Chart | World 05: Runtime |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Branch** | `portfolio/v2-world-01-marginalia` | `portfolio/v2-world-02-masthead` | `portfolio/v2-world-03-the-wing` | `portfolio/v2-world-04-star-chart` | `portfolio/v2-world-05-runtime` |
| **Primary Metaphor** | A kept, working notebook / physical commonplace book | A published periodical issue / broadside publication | A building's walkable architectural gallery wing | A precision celestial observation sky / star chart | A whiteboard systems flowchart sketched by an engineer |
| **Spatial Model** | Paged, layered physical sheets with tab markers | Editorial multi-column spreads with horizontal rules | Walkable rooms (`min-height: 90svh`) with threshold lines | Non-linear 2D coordinate field with fixed hexagonal loop | Wired flowchart diagram (nodes, ports, and connectors) |
| **Navigation** | Sticky right-edge bookmark tabs (`#hero`–`#contact`) | Fixed contents bar with full-page dialog spread | Fixed floor-plan minimap with directory dialog | Fixed hexagonal waypoint loop with chart dialog | Sticky top pipeline stepper with flowchart dialog |
| **Typography** | `Lora` (display) + `Source Serif 4` / `Courier Prime` + `Caveat` (notes) | `Playfair Display` (700/900) + `Work Sans` (400/500/600) | `Archivo` (600/700) + `Inter` (400/500) | `Space Grotesk` (600/700) + `Public Sans` + `JetBrains Mono` | `Space Mono` (400/700) + `Manrope` (400/500) |
| **Density** | Medium (tactile cards, margins, sticky notes) | Medium-High (dense editorial layout, rules, datelines) | Low (generous institutional calm, wide margins) | Low (open space, coordinate dots, thin line-work) | Medium (clean engineering diagram, boxed modules) |
| **Shape Language** | Torn edges, taped corners, seeded rotation (±1.5°) | Zero radius everywhere, thin border rules, drop cap | Right angles only, framed plaque boxes, 0px radius | Pure circles (stars) and thin 1px lines, 0px/pill radius | Stadium nodes (`rounded-full`) and rounded boxes (`rounded-lg`) |
| **Color System** | Desk (`#F3EFEA`) / Lamp (`#1C1917`) + Oxide Red stamp + Teal tape | Day (`#FAFAF8`) / Night (`#121110`) + Spot Rose (`#D9386E`) | Daylight (`#E7E4DE`) / Gallery (`#171512`) + Architectural Brass (`#8A5F1F`) | Observation (`#12102A`) / Draft (`#E9EEF5`) + Solar Gold (`#F3D48B`) | Whiteboard (`#F7F5F0`) / Chalkboard (`#1E2B24`) + Marker Green (`#227A4C`) |
| **Interaction** | Tactile lift (`-2px`, shadow) on card hover; instant otherwise | Restrained underline-thickening (`1px → 2px`); instant otherwise | Unfilled outlined signage buttons; instant otherwise | Clean text-link underlines with 2px offset; instant otherwise | Outlined rectangular buttons (border 1px → 2px); instant otherwise |
| **Motion Trigger** | Load-triggered (page-settle tilt on hero entrance) | Load-triggered (masthead rule-draw ~700ms) | Load-triggered (floor-plan 6-room sequential outline reveal) | Viewport visibility (Projects DaloyAqua at 60% draws constellation) | Viewport visibility (Projects DaloyAqua at 60% draws orthogonal wiring) |
| **Signature Element** | Physical tape strips + authentic candidate ink stamp | High-contrast publication masthead + verbatim pull quote | Framed brass threshold line + floor-plan active fill | Skill-to-project celestial constellation geometry | Orthogonal whiteboard circuit wiring with marker wobble |
| **Emotional Tone** | Intimate, tactile, handmade, contemplative | Confident, edited, authoritative, journalistic | Institutional calm, serene, spacious, curated | Quiet, exploratory, vast, scientifically focused | Clear, systemic, legible, structurally disciplined |

---

## 2. Diversity Cross-Check Against the Three Refined V1 Worlds

| World | Primary Metaphor | Spatial Model | Core Palette | Shape & Radius Policy | Motion Mechanism |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Refine 01: Biyahe** | Manila transit line & jeepney signboards | Vertically stacked route stops | 6 saturated route fields (Skyway, Pasig, EDSA) | Zero radius, 8px, and pill; depth-bands | Destination roll-sign cycling on load |
| **Refine 02: As-Built** | Architectural construction drawing set | Issued numbered sheets with title block | Two-ink blueprint / print (Cadet Blue / Blueprint Dark) | Zero radius everywhere; no shadows | 12-scallop RevisionCloud redline draw on DaloyAqua |
| **Refine 03: The Current** | Hydrodynamic river channel | Catmull-Rom single-curve fluid scroll | Continuous depth hue-ramp (`#0D9488` → `#6366F1`) | Zero radius and fluid pill indicators | Passive requestAnimationFrame spline path-draw |
| **World 01: Marginalia** | Notebook / commonplace book | Layered physical pages | Warm paper + Oxide Red stamp + Teal tape | Mixed 0px, 2px, seeded rotation | Single page-settle drop on hero |
| **World 02: The Masthead** | Editorial newspaper / periodical | Print spreads with section datelines | Near-monochrome newsprint + Rose spot | Pure 0px radius everywhere | Masthead rule line-draw on load |
| **World 03: The Wing** | Institutional museum gallery | Walkable sequence of discrete rooms | Architectural concrete + Warm brass | Pure 0px radius everywhere | Floor-plan room outline reveal on load |
| **World 04: Star Chart** | Celestial navigation field | Non-linear observational chart | Deep night indigo sky + Solar gold | Circles (stars) + 1px geometric lines | Constellation fanning out at 60% visibility |
| **World 05: Runtime** | Whiteboard systems diagram | Connected flowchart nodes | Whiteboard + Marker green | Stadium nodes + 8px rounded module boxes | Orthogonal circuit wiring at 60% visibility |

---

## 3. Realized Diversity Matrix Analysis

1. **No Shared Metaphor**: Every one of the 8 worlds draws from a distinct physical or operational domain: Transit (Biyahe), Architectural Drafting (As-Built), Hydrodynamics (The Current), Commonplace Book (Marginalia), Periodical Publishing (The Masthead), Architectural Gallery (The Wing), Celestial Cartography (Star Chart), and Systems Architecture (Runtime).
2. **Distinct Spatial Mechanics**:
   - Biyahe: Continuous transit route with numbered boarding stops.
   - As-Built: Multi-sheet bound engineering drawing set with fixed title blocks.
   - The Current: Continuous single-stroke fluid river with alternating channel stations.
   - Marginalia: Layered paper sheets with right-edge tactile bookmark tabs.
   - The Masthead: Multi-column newspaper spreads governed by horizontal rules.
   - The Wing: Walkable sequence of discrete gallery rooms separated by brass thresholds.
   - Star Chart: Non-linear celestial coordinate field with a fixed hexagonal overview loop.
   - Runtime: Flowchart systems diagram with stadium start/end nodes and orthogonal circuit wiring.
3. **Motion Trigger Balance**: Motion triggers across the family are deliberately split between load-triggered (Biyahe roll-sign, Masthead rule-draw, The Wing floor plan, Marginalia page settle) and visibility-triggered (As-Built revision cloud, The Current scroll tracking, Star Chart constellation, Runtime circuit wiring). Zero worlds repeat the same motion mechanism.
4. **Strict Color Discipline**: Every world strictly adheres to its own unique color family and single reserved accent rule. Not a single token is shared or leaked across branches.

# Worlds V2: Technical Diversity Matrix

**Execution Phase:** Phase 3 + Addendum (Sessions J & K)  
**Base:** `portfolio/baseline` (`5f4eb93`)  
**Specification:** `PORTFOLIO_DESIGN_EXPLORATION_V2.md` §11, §14.1 & `PORTFOLIO_DESIGN_EXPLORATION_V2_ADDENDUM.md` §A.6  

---

## 1. The Realized Eight New Worlds Against Each Other

This matrix reflects the **actual built implementations** on branches `portfolio/v2-world-01-marginalia` through `portfolio/v2-world-08-datum`, verified against real code, stylesheets, and browser renders.

### Part A: Worlds 01–04

| Dimension | World 01: Marginalia | World 02: The Masthead | World 03: The Wing | World 04: Star Chart |
| :--- | :--- | :--- | :--- | :--- |
| **Branch** | `portfolio/v2-world-01-marginalia` | `portfolio/v2-world-02-masthead` | `portfolio/v2-world-03-the-wing` | `portfolio/v2-world-04-star-chart` |
| **Primary Metaphor** | A kept, working notebook / physical commonplace book | A published periodical issue / broadside publication | A building's walkable architectural gallery wing | A precision celestial observation sky / star chart |
| **Spatial Model** | Paged, layered physical sheets with tab markers | Editorial multi-column spreads with horizontal rules | Walkable rooms (`min-height: 90svh`) with threshold lines | Non-linear 2D coordinate field with fixed hexagonal loop |
| **Navigation** | Sticky right-edge bookmark tabs (`#hero`–`#contact`) | Fixed contents bar with full-page dialog spread | Fixed floor-plan minimap with directory dialog | Fixed hexagonal waypoint loop with chart dialog |
| **Typography** | `Lora` (display) + `Source Serif 4` / `Courier Prime` + `Caveat` (notes) | `Playfair Display` (700/900) + `Work Sans` (400/500/600) | `Archivo` (600/700) + `Inter` (400/500) | `Space Grotesk` (600/700) + `Public Sans` + `JetBrains Mono` |
| **Density** | Medium (tactile cards, margins, sticky notes) | Medium-High (dense editorial layout, rules, datelines) | Low (generous institutional calm, wide margins) | Low (open space, coordinate dots, thin line-work) |
| **Shape Language** | Torn edges, taped corners, seeded rotation (±1.5°) | Zero radius everywhere, thin border rules, drop cap | Right angles only, framed plaque boxes, 0px radius | Pure circles (stars) and thin 1px lines, 0px/pill radius |
| **Color System** | Desk (`#F3EFEA`) / Lamp (`#1C1917`) + Oxide Red stamp + Teal tape | Day (`#FAFAF8`) / Night (`#121110`) + Spot Rose (`#D9386E`) | Daylight (`#E7E4DE`) / Gallery (`#171512`) + Architectural Brass (`#8A5F1F`) | Observation (`#12102A`) / Draft (`#E9EEF5`) + Solar Gold (`#F3D48B`) |
| **Interaction** | Tactile lift (`-2px`, shadow) on card hover; instant otherwise | Restrained underline-thickening (`1px → 2px`); instant otherwise | Unfilled outlined signage buttons; instant otherwise | Clean text-link underlines with 2px offset; instant otherwise |
| **Motion Trigger** | Load-triggered (page-settle tilt on hero entrance) | Load-triggered (masthead rule-draw ~700ms) | Load-triggered (floor-plan 6-room sequential outline reveal) | Viewport visibility (Projects DaloyAqua at 60% draws constellation) |
| **Signature Element** | Physical tape strips + authentic candidate ink stamp | High-contrast publication masthead + verbatim pull quote | Framed brass threshold line + floor-plan active fill | Skill-to-project celestial constellation geometry |
| **Emotional Tone** | Intimate, tactile, handmade, contemplative | Confident, edited, authoritative, journalistic | Institutional calm, serene, spacious, curated | Quiet, exploratory, vast, scientifically focused |

### Part B: Worlds 05–08

| Dimension | World 05: Runtime | World 06: Slate | World 07: The Clearing | World 08: Datum |
| :--- | :--- | :--- | :--- | :--- |
| **Branch** | `portfolio/v2-world-05-runtime` | `portfolio/v2-world-06-slate` | `portfolio/v2-world-07-the-clearing` | `portfolio/v2-world-08-datum` |
| **Primary Metaphor** | A whiteboard systems flowchart sketched by an engineer | A reel of film / widescreen composed takes | A quiet opening in dense forest / spatial restraint | A cartographic elevation ascent / survey transect |
| **Spatial Model** | Wired flowchart diagram (nodes, ports, and connectors) | Discrete 100svh shots with native CSS scroll-snap (`mandatory`) | Expansive breathing ground (>60% empty space), alternating off-axis | Four flat elevation bands (`--low` to `--peak`) with wave contour edges |
| **Navigation** | Sticky top pipeline stepper with flowchart dialog | Fixed letterbox bottom bar with reel ticks + scene index dialog | Fixed quiet mark / quadrant indicator with TOC dialog | Fixed compass rose with rotating needle + 6 elevation ticks + dialog |
| **Typography** | `Space Mono` (400/700) + `Manrope` (400/500) | `Bebas Neue` (400) + `Archivo Narrow` (400/500/600/700) | `Shippori Mincho` (400/500/700) + `Zen Kaku Gothic New` (400/500/700) | `Overpass` (600/700/800) + `Karla` (400/500/700) |
| **Density** | Medium (clean engineering diagram, boxed modules) | Low-Medium (composed widescreen frames, held takes) | Very Low (extreme spatial restraint, generous silence) | Medium (survey field notes, coordinate transects, waypoint tags) |
| **Shape Language** | Stadium nodes (`rounded-full`) and rounded boxes (`rounded-lg`) | Strict widescreen rectangles, 0px radius, thin 1px letterbox lines | Zero containers, zero card borders, zero shadows, zero radii | Flat horizontal elevation bands, organic vector contour lines, 0px tags |
| **Color System** | Whiteboard (`#F7F5F0`) / Chalkboard (`#1E2B24`) + Marker Green (`#227A4C`) | Theatrical (`#16130F`) / Storyboard (`#F2EFE9`) + Tally Red (`#C23A32`) | Paper (`#EFEEEA`) / Ink (`#1A1916`) + Quiet Mark (`#7C8567` / `#9EA887`) | Day (`#D9E4C7`..`#F5F3EE`) / Night (`#1A2218`..`#18181C`) + Contour (`#A85C36`) |
| **Interaction** | Outlined rectangular buttons (border 1px → 2px); instant otherwise | Restrained text links with high-contrast active states; instant | Whispered opacity shifts, clean underlines; instant | Surveyor waypoint tags with elevation indicators; instant |
| **Motion Trigger** | Viewport visibility (Projects DaloyAqua at 60% draws orthogonal wiring) | Load-triggered session-once (900ms fade-up from black overlay) | Load-triggered session-once (2000ms hairline horizontal line extension) | Load-triggered session-once (900ms contour line vector draw below hero) |
| **Signature Element** | Orthogonal whiteboard circuit wiring with marker wobble | Fixed top/bottom letterbox bars + Scene-Slate marks | Asymmetric off-axis composition + Quiet mark quadrant indicator | Topographic wave contour transitions + Rotating compass needle & legend |
| **Emotional Tone** | Clear, systemic, legible, structurally disciplined | Cinematic, composed, anticipatory, held, deliberate | Serene, unhurried, confident, spacious, meditative | Surveyed, grounded, calibrated, architectural, exploratory |

---

## 2. Diversity Cross-Check Across the Complete 11-World Family

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
| **World 06: Slate** | Film reel / widescreen shots | Discrete 100svh scroll-snapped takes | Theatrical dark ground + Tally red | Widescreen rectangles, 0px radius | Full-viewport fade-up from black on load |
| **World 07: The Clearing** | Quiet forest clearing / spatial pause | Expansive breathing ground (>60% empty) | Organic paper + Muted sage mark | Zero containers, zero borders, zero shadows | 2000ms hairline horizontal line extension |
| **World 08: Datum** | Cartographic survey ascent | Four flat elevation contour bands | Valley sage to peak snow + Terracotta contour | Organic wave contours, flat elevation bands | 900ms contour line vector draw below hero |

---

## 3. Realized Diversity Matrix Analysis

1. **No Shared Metaphor**: Every one of the 11 worlds draws from a completely distinct domain:
   - Transit infrastructure (Biyahe)
   - Architectural drafting (As-Built)
   - Hydrodynamics (The Current)
   - Commonplace notebook (Marginalia)
   - Editorial journalism (The Masthead)
   - Museum gallery curation (The Wing)
   - Celestial navigation (Star Chart)
   - Systems architecture (Runtime)
   - Cinematic cinematography (Slate)
   - Spatial minimalism & quiet landscape (The Clearing)
   - Topographic land survey (Datum)

2. **Distinct Spatial Mechanics**:
   - Biyahe: Continuous transit route with numbered boarding stops.
   - As-Built: Multi-sheet bound engineering drawing set with fixed title blocks.
   - The Current: Continuous single-stroke fluid river with alternating channel stations.
   - Marginalia: Layered paper sheets with right-edge tactile bookmark tabs.
   - The Masthead: Multi-column newspaper spreads governed by horizontal rules.
   - The Wing: Walkable sequence of discrete gallery rooms separated by brass thresholds.
   - Star Chart: Non-linear celestial coordinate field with a fixed hexagonal overview loop.
   - Runtime: Flowchart systems diagram with stadium start/end nodes and orthogonal circuit wiring.
   - Slate: Discrete 100svh frames locked via native CSS scroll-snap with letterbox framing.
   - The Clearing: Radical spatial pause with >60% breathing ground and alternating off-axis text columns.
   - Datum: Four flat elevation bands connected by organic vector contour wave edges.

3. **Motion Trigger Balance**: Motion triggers across the family are deliberately diversified:
   - Load-triggered session-once: Biyahe (roll-sign cycle), The Masthead (rule-draw), The Wing (floor-plan perimeter reveal), Marginalia (page settle), Slate (fade-up from black), The Clearing (hairline line extension), Datum (contour line draw).
   - Visibility-triggered: As-Built (revision cloud on DaloyAqua), Star Chart (constellation fanning), Runtime (orthogonal circuit wiring).
   - Passive continuous: The Current (requestAnimationFrame scroll-linked river spline).
   - Zero worlds repeat the same motion mechanism or curve.

4. **Strict Color Discipline**: Every world strictly adheres to its own unique color family and single reserved accent rule. Not a single token is shared or leaked across branches:
   - Biyahe: Manila transit saturated primaries
   - As-Built: Blueprint cadet blue & technical redline
   - The Current: River cyan to deep ocean indigo gradient
   - Marginalia: Warm notebook paper, oxide red stamp, teal tape
   - The Masthead: Newsprint black/white with spot rose
   - The Wing: Architectural concrete with warm brass
   - Star Chart: Deep cosmic indigo with solar gold
   - Runtime: Clean dry-erase whiteboard with marker green
   - Slate: Theatrical deep charcoal with recording tally red
   - The Clearing: Muted organic paper with quiet sage mark
   - Datum: Quad-band elevation terrain (sage, sand, slate, peak snow) with terracotta contour line

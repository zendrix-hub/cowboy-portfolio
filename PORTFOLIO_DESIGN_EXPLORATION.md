# PORTFOLIO_DESIGN_EXPLORATION.md

**For:** AGY CLI (Antigravity CLI, `agy`) running on Ubuntu inside this repository
**Goal:** Explore **three radically different visual identities ("worlds")** for the same developer portfolio, each on its own Git branch, using only the content that already exists in the repo.
**Version:** 1.0. Authored without repository access, so §2 is a discovery protocol you complete in Phase 0 before touching any code.

---

## 0. How to use this document

### 0.1 Tags

| Tag | Meaning |
| --- | --- |
| **[OWNER]** | Stated by the repo owner. Binding unless the repo proves it wrong; if it does, record the conflict and follow the repo. |
| **[VERIFY]** | An assumption you must confirm in the repo during Phase 0. |
| **[DECISION]** | A design decision by this spec's author. Binding for concept, structure and interaction model. Exact values may be adjusted under §4.3. |

### 0.2 The eight rules that override everything else

1. **Repo content is the source of truth.** Never invent, rewrite or "improve" personal information, projects, experience, education, skills or metrics.
2. **Three worlds, three branches, zero cross-contamination.** Nothing from one world may appear in another.
3. **Never modify the original branch.** Never run `git push --force`, `git reset --hard`, `git clean`, `git branch -D` or `git checkout -- .`. Undo with `git revert`.
4. **Improve presentation; do not rebuild functionality.** No framework changes, no new features, no backend, no forms.
5. **No new dependencies** unless §4.6 is satisfied and the world report justifies it.
6. **Accessibility (WCAG 2.2 AA) and the performance budgets in §12 are release gates**, not polish.
7. **Missing data is omitted gracefully and logged** in `docs/worlds/CONTENT_GAPS.md`. Never fill it with placeholder or plausible-sounding text.
8. **Ask the owner only for the conditions in §9.9.** Otherwise proceed and record decisions in the report.

### 0.3 Run protocol (copy-paste prompts)

Run these as separate sessions so each world is designed with a clean head. The isolation matters: an agent that has read all three worlds tends to converge them.

```text
Session A
Read PORTFOLIO_DESIGN_EXPLORATION.md completely. Execute Phases 0, 1 and 2 only.
Do not implement any world. Stop after printing the Phase 2 checkpoint.

Session B (World 01)
Read PORTFOLIO_DESIGN_EXPLORATION.md sections 0-5, 6.1 and 7-14. Do NOT read 6.2 or 6.3,
and do not open the other world branches. Execute Phase 3 on branch
portfolio/world-01-biyahe. Stop after the World 01 report is committed.

Session C (World 02)
Same as Session B, but read 6.2 instead of 6.1. Execute Phase 4 on portfolio/world-02-as-built.

Session D (World 03)
Same as Session B, but read 6.3 instead of 6.1. Execute Phase 5 on portfolio/world-03-the-current.

Session E
Read sections 7-14 and the three world reports. Execute Phases 6 and 7.
```

If AGY supports parallel sub-agents, Sessions B, C and D may run in parallel in separate Git worktrees (§8.5), provided each sub-agent reads only its own world section.

---

## 1. Project context

### 1.1 Owner and repository

The repository contains the owner's existing developer portfolio: current implementation, personal information, projects, skills, technologies, experience and assets. The owner is **Zendrix Riva**, a full-stack developer. **[OWNER]**

### 1.2 Owner context that affects design **[OWNER]**

- Early-career developer: 4th-year BSIT student, currently completing an OJT internship. If the repo says something different, the repo wins.
- Consequences for design:
  - Experience and education data is **short by nature**. The Journey section must look intentional with 2 to 4 entries, and must present student and intern status honestly and without embarrassment.
  - The featured project, **DaloyAqua**, is **under construction**. "In progress" must be a designed, first-class visual state in every world, never hidden and never dressed up as shipped.
  - Other projects may have thin details (title, one line, stack, link). Layouts must not depend on screenshots, metrics or long case-study prose.

### 1.3 What this task is

A **visual and interaction redesign exploration**. The same content is presented through three deliberately different design languages so the owner can compare them side by side, then select one or combine ideas from several.

### 1.4 What this task is not

- Not a rebuild of core functionality.
- Not a content rewrite, rebrand or re-architecture.
- Not a feature project (no CMS, blog, i18n, analytics, contact form, search, auth).
- Not three colorways of one layout. If two worlds could be confused in a 320px-wide thumbnail, the task has failed (§7.2).

### 1.5 Deliverables

| Deliverable | Location | Branch |
| --- | --- | --- |
| This specification | `PORTFOLIO_DESIGN_EXPLORATION.md` (repo root) | `portfolio/baseline` and inherited by all worlds |
| Repo analysis, content map, content gaps, concept lock | `docs/worlds/00_REPO_ANALYSIS.md`, `CONTENT_MAP.md`, `CONTENT_GAPS.md`, `01_CONCEPT_LOCK.md` | `portfolio/baseline` |
| World plan and report (one each) | `docs/worlds/world-0N-plan.md`, `WORLD_0N_REPORT.md` | own world branch |
| Comparison pack | `docs/worlds/COMPARISON.md` plus screenshots | `portfolio/baseline` (docs only, after all worlds exist) |
| Three complete, independently runnable designs | whole repo | `portfolio/world-01-biyahe`, `portfolio/world-02-as-built`, `portfolio/world-03-the-current` |

---

## 2. Existing repository analysis

### 2.1 Status

The author of this document could not inspect the repo. Section 2.2 records what the owner has stated. Sections 2.3 to 2.6 are a protocol: **complete them in Phase 0 and write the results to `docs/worlds/00_REPO_ANALYSIS.md`.** Once written, that file is binding for all later phases. Phase 0 is **read-only**: no edits outside `docs/worlds/`.

### 2.2 Known facts and earlier decisions

| Fact or decision | Tag | Treatment in this exploration |
| --- | --- | --- |
| Next.js (App Router), TypeScript, Tailwind CSS | [OWNER] [VERIFY] | **Binding.** Confirm versions, and whether Tailwind is v3 (`tailwind.config.*`) or v4 (`@theme` in CSS). |
| Originally built with Gemini CLI on Ubuntu | [OWNER] | All commands in this document are bash on Ubuntu. |
| Dark theme default, with a light-mode toggle | [OWNER] | **The toggle is binding** (existing functionality). **The default mode is a per-world decision**, because the default is part of each world's identity: W1 Day, W2 Print, W3 Surface. Each report states where the default is set so the owner can flip it in one line. |
| Blue/cyan accent | [OWNER] | Baseline only. **Not carried into any world.** |
| Contact is a plain `mailto:` link, no form | [OWNER] | **Binding for all worlds.** Presentation may change; mechanism may not. No form, no backend, no third-party service. A "Copy address" button may sit beside the link, never replace it. |
| DaloyAqua is the featured project | [OWNER] | **Binding.** Featured in every world, status shown exactly as the repo's data states. |
| PlayIT, ReadHub, Gordon Rasmai are candidates to feature | [OWNER] | Render only those already in the repo's data. Never add missing ones; list them in `CONTENT_GAPS.md` as owner decisions. |
| agy may later fill in full project details | [OWNER] | **Out of scope now.** Do not write project details in this task. Log gaps only. |

### 2.3 Discovery protocol

Record every finding in `docs/worlds/00_REPO_ANALYSIS.md`, one heading per row.

| # | Inspect | How | 
| --- | --- | --- |
| 1 | Git state | `git status --short`, `git branch --show-current`, `git log --oneline -15`, `git remote -v` |
| 2 | Package manager and scripts | Lockfile (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lockb`), `package.json` scripts, `.nvmrc`, `engines`. Use the manager the lockfile indicates as `<pm>` everywhere below. |
| 3 | Framework and router | `next` version, `app/` vs `pages/`, `src/` layout, `next.config.*` |
| 4 | Tailwind | Version, config or `@theme` location, plugins, `globals.css`, existing tokens |
| 5 | Theming | `next-themes` or custom script, attribute (`class` or `data-theme`), default, storage key, flash-of-wrong-theme handling |
| 6 | Fonts and icons | `next/font` usage, font files, icon library or inline SVG |
| 7 | Animation and UI libraries | framer-motion, GSAP, Radix, Headless UI, shadcn: installed vs actually used |
| 8 | Routes | Every route, including dynamic routes, 404, error, OG image, sitemap, robots |
| 9 | Components and sections | Component tree, which files render each section, which are client components |
| 10 | Content sources | Where name, role, intro, about, projects, skills, experience, education, links and email live (TS, JSON, MDX, inline JSX) |
| 11 | Assets | `public/` contents, image formats and sizes, favicon, OG image, resume file |
| 12 | Quality tooling | ESLint, Prettier, TS strictness, tests, CI workflows, deploy config |
| 13 | Agent instruction files | `AGENTS.md`, `GEMINI.md`, `.agents/`, `README.md`. Follow their **code conventions**; this document wins on **visual decisions**. |
| 14 | Baseline health | Run lint, typecheck and `<pm> run build`. Record pass or fail and the First Load JS table. |
| 15 | Baseline screenshots | If a headless browser is already available (`chromium`, `google-chrome`, or an existing Playwright install), capture every route at 360, 768 and 1280 wide into `docs/worlds/baseline/`. Otherwise list them as a manual TODO. Do not install a browser without owner approval. |

Then answer in the analysis file: **what already works and must be preserved; what is weak visually; which components will need replacing; whether content is hard-coded inside JSX** (this decides whether §9 Phase 1 needs the content-extraction step).

### 2.4 Protected paths

Fill the real paths in Phase 0. Protected means **do not change values, structure or URLs**; presentational reuse is fine.

- Content data files (values), route URL structure, section IDs and anchors
- Page titles, meta tags, OG and sitemap output
- `next.config.*`, deploy config, CI, lockfile, `.env*`
- Identity assets in `public/` (photo, resume, favicon), which may be re-styled around but not altered or deleted

**Allowed to change:** presentational markup, CSS and Tailwind, fonts, layout components, decorative SVG, presentational assets, and the *look* of the theme toggle (not its persistence logic).

### 2.5 Content contract

Write `docs/worlds/CONTENT_MAP.md` mapping each entity to its file and field names. All three worlds consume exactly this data.

| Entity | Fields (use those that exist) | Rule when a field is missing |
| --- | --- | --- |
| Person | name, role, intro, about text, photo, location, email, social links | Omit the element. Never placeholder. |
| Featured project | title, description, status, stack, links, images, dates | Render what exists. |
| Other projects | same as featured | Render what exists. |
| Skill groups | category, items, any level or years field | Show categories and items. Show levels only if they already exist, and never as invented numbers. |
| Experience and education | organization, title, period, description, current flag | Render what exists. |
| Contact | existing `mailto:` address, social links | Keep the mailto mechanism. |
| Site chrome | section names, IDs, meta | Preserve IDs and existing section names. |

Rules:

- Never display a number the repo does not contain: no years of experience, project counts, stats or percentages.
- Show statuses literally as stored ("In progress" stays "In progress").
- Relationships such as "skill X is used in project Y" may be **derived only** from exact matches between existing skill names and existing project stack lists. If names do not match exactly, do not link them.
- A pull quote or lead sentence may be lifted **verbatim** from existing text. Never paraphrase and attribute it as if it were original.

### 2.6 Sparse-data and stress tests

Every world must look intentional under each case below. Test them by temporarily editing the content data in an uncommitted working tree, capture screenshots for the report, then revert with `git restore -- <the specific files>`.

1. Exactly 1 project. 2. 8 projects. 3. A 90-character project title. 4. A project with no image and no links. 5. 40 skills in one category. 6. 2 experience entries. 7. 8 experience entries. 8. About text of 40 words and of 400 words. 9. Missing role or intro line. 10. Very long email address or URL (must wrap, never overflow).

---

## 3. Design goals

1. **Contrast + quality + identity.** Three worlds that are recognizably different at a glance, each polished, each still recognizably *this owner's* portfolio.
2. **Ten-second clarity.** In each world a first-time visitor learns the owner's name, role, the featured project and how to make contact within ten seconds, on a phone.
3. **Honest presentation.** Student, intern and in-progress statuses are shown plainly and treated as strengths.
4. **Content-independent craft.** The design must not need screenshots, metrics or long prose to look finished.
5. **Boldness in one place per world.** Each world has one signature element (§5.1). Everything around it stays disciplined. Remove any element that does not earn its place.
6. **Comparability.** Same content, same section order, same anchors, same functionality, so the owner can compare like with like.
7. **Quality floor without announcing it.** Responsive, keyboard accessible, reduced-motion aware, fast.

---

## 4. Constraints

### 4.1 Hard constraints

- Keep the existing stack. No framework, router or styling-system migration.
- Server-render all content. Add `"use client"` only to small interactive islands (navigation state, dialogs, theme toggle, clipboard).
- Keep section order and IDs: Home, About, Projects, Skills, Experience or Journey (use the existing label), Contact. If a section has no data, omit it from the page **and** the navigation and log it.
- Every existing route must be restyled in every world, or listed in the world report as out of scope with a reason. No route may be left in baseline styling.
- TypeScript strictness, lint and existing tests must keep passing. No `any` added for convenience.
- Keep the existing theme persistence mechanism. Re-skin the toggle to belong to the world.

### 4.2 Banned defaults

The following are the commonest tells of a generic generated portfolio. They are banned unless a world section below explicitly, and specifically, calls for them.

| Banned default | Do this instead |
| --- | --- |
| Warm cream ground (near `#F4F1EA`) + high-contrast serif + terracotta accent | Use the palettes in §6. Do not drift toward this during polish. |
| Near-black ground + a single acid-green, amber or vermilion accent | Same. |
| Newspaper-style dense columns with hairline rules as a default | Use each world's own structure. |
| Identical rounded cards, one radius everywhere, the same soft grey shadow, gradient washes | Follow each world's container rules. No decorative gradients anywhere. |
| ALL-CAPS tracked eyebrow above every heading; "WORD — fragment" labels; middle-dot meta strings; "→" appended to links and buttons | Plain sentence-case headings. Structure only where it carries information. |
| Numbered markers (01 / 02 / 03) on content that is not a sequence | Number only real sequences (sheet numbers, revisions, chronological years). |
| Accenting one word in a headline with italic, bold or color | Treat the whole headline as one typographic object. |
| Fade-and-slide-up on every section; hover transitions on every card | One orchestrated moment per world (§6.x.11). Motion elsewhere only answers a user action. |
| Glassmorphism, gradient text, floating blobs, particle or 3D backgrounds, spinning logos, tech-logo marquees, skill percentage bars, "scroll down" mouse icons | Not used. |
| Emoji in UI, "Hi, I'm X" greeting hero, "passionate developer" filler, fabricated testimonials or stat counters | Use the owner's existing words only. |
| Neon glows and excessive rounded cards | Not used. |

### 4.3 Change control

You **may**: adjust hex values to meet contrast; substitute a font (same classification, similar personality) if unavailable or too heavy; adapt layouts to real content; drop a sub-feature that fails an accessibility or performance gate. Record each change under "Deviations" in the world report.

You **must not**: change a world's metaphor, navigation model, layout logic or signature element; drift one world toward another; add features. If a needed change touches the concept, keep the most faithful implementation, mark the world **needs owner review** in its report, and continue.

### 4.4 Microcopy rules

- Section headings keep the repo's existing names. World flavor comes from visuals, not renamed sections.
- New UI text (button labels, captions, aria-labels) is plain, factual, sentence case, and says exactly what happens: "See projects", "Send an email", "Copy address". Same action, same name, everywhere.
- World chrome labels (for example "Sheet 2 of 6") are allowed only where a world section lists them, must not assert facts about the owner, and are `aria-hidden` when purely decorative. Maximum six per page.
- Empty and failure states explain what happened in plain words. No jokes, no apologies.

### 4.5 Accessibility and performance are constraints too

Full requirements are in §11 and §12. They apply from the first commit of each world, not at the end.

### 4.6 Dependency policy

Default: **zero new dependencies.** Reuse what is installed (icon library, animation library) only if the repo already uses it. A new dependency is acceptable only if all of these hold: under 5 KB gzipped, tree-shakeable, actively maintained, no runtime CSS-in-JS, and justified in the world report with its measured size cost. Never add animation frameworks, smooth-scroll libraries, 3D or WebGL, particle libraries or UI kits.

---

## 5. The three design worlds

### 5.1 At a glance **[DECISION]**

| | World 01 | World 02 | World 03 |
| --- | --- | --- | --- |
| **Name** | **Biyahe** | **As-Built** | **The Current** |
| **Branch** | `portfolio/world-01-biyahe` | `portfolio/world-02-as-built` | `portfolio/world-03-the-current` |
| **Metaphor** | A painted route board. *Biyahe* is Filipino for trip or journey. | An issued drawing set that records what was actually built, including what is still under construction. | A descent through water zones, carried by one continuous line. *Daloy* (the first half of the featured project's name) means flow. |
| **Feels like** | Loud, warm, tactile, friendly | Cool, precise, dense, trustworthy | Calm, deep, spacious, unhurried |
| **Signature element** | Destination-board hero and press-in plates | Title block and redline revision cloud | The scroll-drawn line |
| **Communicates** | A builder of things people can pick up and use | An engineer who documents, verifies and is honest about status | A thoughtful systems thinker who values focus |

### 5.2 Why these three

- **They are grounded in the owner's real subject matter, not in generic "developer" tropes.** Biyahe draws on Philippine street-sign and jeepney panel graphics and on the press-in tactility of the owner's PlayIT app UI. As-Built draws on architecture and engineering documentation practice. The Current draws on the flow metaphor in the featured project's name; it does **not** depict or describe that project.
- **They avoid the defaults in §4.2.** None is a cream-and-serif editorial page, a black-and-neon terminal, or a card grid.
- **They work with sparse content.** None needs screenshots. Each has a defined behavior for projects with no image (§6.x.7).
- **They differ on every axis that matters:** ground color and hue family, container vocabulary, type families, navigation structure, project layout, motion vocabulary and density (matrix in §7.1, pass or fail gate in §7.2).

### 5.3 Craft rules that apply to every world

1. **Spend boldness in one place.** The signature element is allowed to be loud. Everything around it is quiet and disciplined.
2. **Motion policy.** Exactly **one** non-user-triggered orchestrated moment per world, defined in §6.x.11. Everything else animates only in response to a user action or scroll position, and only `transform`, `opacity`, `clip-path`, `stroke-dashoffset`.
3. **Typography carries personality.** Use the type roles specified. Line length under 80 characters for body text. Serif body text gets slightly more line-height than sans.
4. **Structure is information.** Borders, dividers, numbers and labels appear only where they encode something real about the content.
5. **Words are design content.** Follow §4.4.
6. **Critique pass.** Before finishing each world, screenshot every section at 390 and 1440 wide and remove one element per section that is not earning its place.

### 5.4 Functional parity across all worlds

Same section order and IDs; same content; existing theme toggle re-skinned; `mailto:` contact; skip link; single `<h1>`; landmarks (`header`, `nav`, `main`, `footer`); working `prefers-reduced-motion`, `forced-colors` and keyboard behavior.

---

## 6. Detailed world specifications

> In this section `{NAME}`, `{ROLE}`, `{INTRO}` and similar tokens mean "the value from the repo". Never type the values into a component; read them from the content source.

---

### 6.1 World 01: "Biyahe" (the route board)

**Branch:** `portfolio/world-01-biyahe`

#### 6.1.1 Concept

- **Metaphor.** The portfolio is a painted route board. Navigation is a row of route plates, every section is a stop, and the Experience section is a literal road.
- **Subject grounding.** The graphic language of Philippine street signage and jeepney body panels (flat painted fields, heavy black outlines, pinstripes, plate lettering) combined with the depth-band press feel of the owner's PlayIT UI. Evoke the *graphic language*. No clip-art, no flags, no palm trees, no horse ornaments, no caricature.
- **Philosophy.** Friendly, confident, hands-on. It says "I build things people can pick up and use." The emotion is delight with immediate clarity. It differs from the other worlds because **color is the structure** and **every interactive element feels physical**.
- **Signature element.** The destination-board hero and the press-in plates.

#### 6.1.2 Design plan

**Color** (day mode; starting values, contrast verified with the Appendix A script while writing this spec; re-run it after any hex change)

| Token | Hex | Role | Text on it | Depth band (×0.8) |
| --- | --- | --- | --- | --- |
| `--sun` | `#FFC72C` | Hero board, About ground, primary fields | black | `#CC9F23` |
| `--signal` | `#E4262A` | Primary action, Contact ground | white (4.56:1, verified) | `#B61E22` |
| `--cobalt` | `#1B3FD1` | Hero ground, role plate, featured board | white | `#1632A7` |
| `--leaf` | `#0F9D58` | Skills ground, supporting fields | **black** (5.98:1; white fails at 3.51:1) | `#0C7E46` |
| `--chalk` | `#FFFFFF` | Reading plates, Projects and Journey grounds, chips | black | `#CCCCCC` |
| `--enamel` | `#000000` | Outlines, text, road | n/a | n/a |

**Night mode ("lights on").** Chalk grounds become `#0B1440`; chalk reading plates become `#131E57` with white text. Sun, Signal, Cobalt and Leaf fields are unchanged, like lit signage, and gain a 2px white keyline outside their black outline so edges stay visible on dark grounds.

**Type**

| Role | Family | Use |
| --- | --- | --- |
| Display | **Bungee** 400 | Inside plates only: name, section titles, route plates, chip labels of size 1rem and up |
| Text | **Lexend** variable (use 400, 600, 700) | Everything else. Body 1.125rem / 1.6. Minimum 0.875rem. |

Scale: name `clamp(2.25rem, 8.5vw, 7rem)`, sized so `{NAME}` fits one line at 1280px and wraps only at word breaks below that; section title `clamp(1.75rem, 5vw, 3.5rem)`. All-caps appears **only** inside Bungee plates. Never elsewhere.

**Layout concept.** Full-width horizontal color bands, like body panels on a vehicle. Inside each band, a 12-column grid (max 1280px) where plates span **uneven** counts (5/7, 8/4, 12) so no two adjacent bands share a split. Plates are the only containers. Bands are separated by a triple pinstripe (black 2px, sun 6px, black 2px). Left-aligned throughout.

Band grounds in order: Hero cobalt, About sun, Projects chalk, Skills leaf, Experience sun, Contact signal.

**Wireframe: hero (≥1024)**

```text
┌────────────────────────────────────────────────────────────────────┐
│ [Home][About][Projects][Skills][Experience][Contact]      [ Night ]│  route plates, sticky
├════════════════════════════════════════════════════════════════════┤  triple pinstripe
│ COBALT ground                                                      │
│ ┌────────────────────────────────────────────────────────────────┐ │
│ │ {NAME}                              SUN board, 3px black       │ │
│ │ ┌──────────────────────────┐        + inner chalk keyline      │ │
│ │ │ {ROLE}                   │ COBALT plate, white text          │ │
│ │ └──────────────────────────┘                                   │ │
│ └────────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────┐   ┌───────────┐ ┌────────────┐ │
│ │ {INTRO}          CHALK plate    │   │ See       │ │ Send an    │ │
│ │                                 │   │ projects  │ │ email      │ │
│ └─────────────────────────────────┘   └───────────┘ └────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

**Wireframe: projects (≥1024)**

```text
┌────────────────────────────────────────────────────────────────────┐
│ CHALK ground                                                       │
│ ┌────────────────────────────────────────────────────────────────┐ │
│ │ COBALT featured board                                          │ │
│ │ {FEATURED TITLE}                        ┌────────────────────┐ │ │
│ │ [{status}]                              │ image window, or   │ │ │
│ │ ┌───────────────────────────┐           │ stripe pattern     │ │ │
│ │ │ {description}  chalk plate│           │ seeded by slug     │ │ │
│ │ └───────────────────────────┘           └────────────────────┘ │ │
│ │ (stack chips)                        [Open project][Source]    │ │
│ └────────────────────────────────────────────────────────────────┘ │
│ ROUTE LIST: rows, not cards                                        │
│ [P] {Title}   {one-line description}          [{status}] [Open]    │
│ [R] {Title}   {one-line description}          [{status}] [Open]    │
│ [G] {Title}   {one-line description}          [{status}] [Open]    │
└────────────────────────────────────────────────────────────────────┘
```

**Principles.** (1) Color equals structure: each field color has one job. (2) Every plate is either *reading* (no depth band, not pressable) or *action* (depth band, pressable), never both. The depth band, not the color, is what says a plate can be pressed; chalk action plates exist (for example "Send an email"). (3) Black outlines everywhere; the only shadow is the depth band. (4) Loose text never sits on a saturated ground; it always sits inside a plate. (5) One loud thing per band.

#### 6.1.3 Visual direction

| Attribute | Specification |
| --- | --- |
| Background | Flat solid band grounds only. No gradients, no textures. Repeating-stripe patterns are allowed only for pinstripes and image-less project windows. |
| Borders | 3px `--enamel` on every plate. Boards add a 2px chalk inner keyline (double-line look). |
| Shadows | None, except the **depth band** on pressable plates: `box-shadow: 0 6px 0 <depth token>`. |
| Radius | Scale of exactly three: `0`, `8px` (plates), `999px` (status pills and lamp dots). |
| Spacing | 8px base. Band padding `clamp(48px, 8vw, 112px)` vertical. Plate padding 20 to 32px. Gaps 16 to 24px. |
| Grid | 12 columns, max 1280px, gutter 24px (16px below 640px). |
| Density | Medium to low. Large type, few elements per band. |
| Image treatment | Framed in a plate (3px outline, 8px radius), `object-fit: cover`, no filters. No image: a stripe-pattern window (2 to 3 palette colors, pattern chosen deterministically from the project slug), `aria-hidden`. |
| Icons | Inline SVG or the existing icon library, 2.5px stroke, round caps, 24px, only where they aid (external link, copy, theme). |
| Containers | Exactly three types: **board** (large, keylined), **plate** (standard), **chip** (pill or small plate). |
| Buttons | A pressable plate with depth band, min height 48px, Lexend 700 sentence case. |
| Navigation | Route plates (§6.1.5). |
| Separators | Triple pinstripe between bands. |

#### 6.1.4 Hero

- **Composition.** Cobalt band. A large sun **destination board** carries `{NAME}` in Bungee. Under it, a cobalt role plate carries `{ROLE}` in Lexend 700 (white). Below, a chalk plate holds `{INTRO}` (existing text, unedited) beside two action plates.
- **Hierarchy.** Name, role, intro, actions. Nothing else competes.
- **CTAs.** "See projects" (signal plate) and "Send an email" (chalk plate), both pressable. The email plate is the existing `mailto:` link.
- **Visual elements.** A row of small lamp dots (circles, `999px`) along the board's top edge. Static, decorative. No illustration, no mascot. If the repo has a photo of the owner, it may sit in a framed plate beside the intro.
- **Orchestrated moment: the roll sign.** On first visit per session, the name window shows the existing section names rolling past and settles on `{NAME}`. Total at most 900ms, `steps()` easing, `transform` only. The real `<h1>` with the final text is in the DOM from the first paint; the rolling clones are `aria-hidden`. The play-once flag is set by a tiny inline script in `<head>` (same technique as the theme script) so first paint has the right state and nothing flickers. No JS, repeat visits and reduced motion: static final state.
- **Name and role.** Name is the loudest object on the page. Role is one plate, one line.

#### 6.1.5 Navigation

- **Structure.** A sticky `<nav aria-label="Primary">` row of route plates, one per section, each a different field color (Home sun, About signal, Projects cobalt, Skills leaf, Experience chalk, Contact signal), followed by the mode toggle plate. Labels are the existing section names in Bungee.
- **Current section.** The plate for the section in view is *pressed in* (band collapsed to 2px, plate lowered 4px) and has `aria-current="location"`. State is carried by shape and outline, not color alone. Updated by one `IntersectionObserver` with `rootMargin: "-45% 0px -50% 0px"`.
- **Mobile.** A single large "Routes" plate fixed bottom-right (thumb zone, respects `env(safe-area-inset-bottom)`) opens a native `<dialog>` full screen with six stacked plates in their colors, each at least 64px tall.
- **Scroll offset.** `scroll-padding-top` equals the sticky bar height so focused and anchored content is never obscured.

#### 6.1.6 About

- **Treatment.** One large chalk **reading plate** (7 columns) with the existing about text at 1.125rem / 1.6, max 65 characters per line. Beside it, up to three **fact plates** (5 columns), stacked, each a different field color, each holding one label and value that already exist in the repo (for example role, education, focus). Only facts present in the repo appear.
- **Long text.** Beyond about 120 words, show the first paragraphs and a "Read more" button (`aria-expanded`). Never rewrite or trim the text itself.
- **Personality without verbosity.** Provided entirely by color, plate rhythm and the press feel. No added copy.

#### 6.1.7 Projects

- **Featured (DaloyAqua).** A full-width **cobalt board**. Title in Bungee (white). If the data says the project is in progress, show that exact status in a sun **status pill**. Description in a chalk plate. Stack as chips. Links as pressable plates ("Open project", "Source code" only if those links exist). Right side: image window if an image exists, else the stripe-pattern window.
- **Supporting projects: the route list.** Rows, not cards. Each row is a full-width plate: a square **route chip** at the left (project's initial in Bungee, color cycling sun, signal, leaf, chalk; use two letters if initials collide), then title and a one-line description, then the status pill (if present) and an "Open" pressable plate. Rows expand with `<details>` to show the full description, stack and links. Chevron rotates on open.
- **Sparse and stress cases.** One project: featured board only, no empty list. Many projects: the list simply grows. Long titles wrap to two lines. No image: stripe window.

#### 6.1.8 Skills

- **Treatment.** Category **strips** on a leaf band. Each strip: a colored end-cap plate at the left carries the category name (Bungee, small); to its right, the items as chalk **chips** (Lexend 600, 1rem, 3px outline, 8px radius) that wrap. End-cap colors cycle sun, signal, cobalt, chalk with the text colors from the token table.
- **No bars, no percentages, no logos.** If the repo has proficiency labels, show them as chip text exactly as stored.
- Chips are not interactive and get no hover or focus styling.

#### 6.1.9 Experience and Journey

- **Storytelling.** A **road** on a sun band: a 6px black line with a 2px white dashed center. Each entry is a **stop** (24px chalk circle, 3px outline) with a chalk plate joined by a 3px stem. Period in Bungee (small), title in Lexend 700, organization in Lexend 400, description clamped to 3 lines with a "Read more" toggle if longer. Entries in the repo's order.
- **Present.** If the repo marks an entry as current, its stop circle is filled signal. Use only the period text the data already contains; add no "Current" label.
- **Few entries.** With 2 to 4 stops, the road spans the full width with generous spacing; it must look like a short, deliberate trip, not an empty timeline.
- **Desktop:** horizontal road, plates alternate above and below. **Mobile:** vertical road at the left, plates to the right.

#### 6.1.10 Contact

- **Treatment.** The final stop: a signal-red band. One large **sun plate** is the `mailto:` link, containing the label "Send an email" and the existing address in Lexend 700 at `clamp(1.5rem, 4vw, 3rem)` with `overflow-wrap: anywhere`. Beside or below it, a "Copy address" pressable plate (label swaps to "Copied" for 2 seconds; result announced through `role="status"`). Social links from the repo as chalk plates with icon and text.
- **No form, no fields, no backend.**
- **Footer.** Triple pinstripe. Existing footer content only.

#### 6.1.11 Micro-interactions and motion

| Interaction | Behavior |
| --- | --- |
| Press (pressable plates only) | Hover with a fine pointer: raise 2px, band 8px. Active: lower 4px, band 2px, 90ms ease-out. Release: 140ms with slight overshoot `cubic-bezier(.34,1.56,.64,1)`. |
| Focus | Double ring: `outline: 3px solid #000; outline-offset: 2px; box-shadow: 0 0 0 5px #fff`. Visible on every ground. |
| Current route plate | Pressed-in state follows scroll position (see 6.1.5). |
| Route-list row | `<details>` open and close, chevron rotates 180° in 100ms. |
| Copy address | Label swap plus live region. |
| Orchestrated moment | Roll sign (6.1.4), once per session. |
| Reduced motion | All transitions 0ms and no roll sign. States still change instantly (pressed-in, expanded, copied). |

There are no scroll-reveal animations, no parallax, no cursor effects.

#### 6.1.12 Responsive behavior

| Section | Desktop and laptop (≥1024) | Tablet (640 to 1023) | Mobile (<640) |
| --- | --- | --- | --- |
| Hero | Full-width board; role plate under name; intro and two actions on one row | Name wraps to two lines; intro above actions; actions side by side | Name wraps up to three lines; role plate full width; actions stacked, each at least 56px tall |
| Navigation | Sticky row of six plates plus mode plate | Same row, 14px labels, horizontal scroll strip as a fallback | Single "Routes" plate bottom-right opening a full-screen dialog of stacked plates |
| About | Reading plate 7 cols, fact plates 5 cols | Fact plates move below in a row of three | Single column, fact plates stacked |
| Projects | Featured board in two columns; route list rows on one line | Featured single column with window above text; rows may wrap to two lines | Rows become two-line plates (title and status, then description and Open) |
| Skills | End-cap at left, chips at right | End-cap on top | End-cap on top, chips wrap |
| Experience | Horizontal road, plates alternate above and below | Horizontal, wraps to a second road segment if more than 4 stops | Vertical road at left |
| Contact | Address plate and copy plate in one row; socials in a row | Address wraps | Address at 1.5rem, everything stacked full width |

#### 6.1.13 Accessibility and performance notes

- Plate state (pressed, current, expanded) is conveyed by shape, outline and text, never color alone.
- Route dialog is a native `<dialog>` with `showModal()`, focus returned to the trigger on close, Esc closes.
- Verify every text and ground pair from the token table, in both modes, with Appendix A. Saturated grounds are where contrast fails first.
- `forced-colors: active`: plates keep their borders (use `border`, not only `background`), so shapes remain visible.
- Fonts: two files (Bungee, Lexend variable). No images required. Client JS: scroll-spy, dialog, roll-sign flag, clipboard. Target under 4 KB gzipped for these islands.

#### 6.1.14 What this world must not become

No jeepney caricature or kitsch ornament. No more than the three container types. No loose text on saturated grounds. No all-caps outside Bungee plates. No hover motion on non-interactive elements. No scroll-reveals. No gradients.

---

### 6.2 World 02: "As-Built" (the drawing set)

**Branch:** `portfolio/world-02-as-built`

#### 6.2.1 Concept

- **Metaphor.** The portfolio is an issued drawing set for a building that already stands. *As-built* (record) drawings document what was actually constructed, including changes made on site. Every section is a **sheet**. Navigation is the **sheet index**. Projects are a **detail sheet** and a **project schedule**. Skills are a **matrix**. Experience is a **revision history**. Contact is a **transmittal**.
- **Subject grounding.** The conventions of a real drawing set: framed sheets, title blocks, schedules, section hatching, revision clouds and revision triangles. The metaphor is chosen for this owner: a student and intern whose featured project is still under construction gains from a world whose whole purpose is to record honestly what exists and what is still changing. Evoke the *conventions*. No CAD-software interface, no grid-paper texture, no invented measurements.
- **Philosophy.** "Show the work as it actually is." The emotion is quiet confidence and verifiability: the visitor feels they could check anything. It differs from the other worlds because **structure is the design** (tables, frames and rules do the work that color and illustration do elsewhere), all corners are square, and state changes are instant.
- **Signature element.** The **title block** on every sheet and the **redline revision cloud** on the featured project.

#### 6.2.2 Design plan

**Color** (two modes; ratios verified with the Appendix A script while writing this spec; re-run after any hex change)

| Token | Print (default) | Blueprint | Role |
| --- | --- | --- | --- |
| `--desk` | `#DDE4EA` | `#082B4A` | Ground behind the sheets |
| `--sheet` | `#F8FAFC` | `#0B3A63` | Sheet ground. Cool white, never cream. |
| `--ink` | `#0F2233` (15.48:1 on sheet) | `#F2F7FB` (10.82:1) | Text, frames, primary rules |
| `--ink-2` | `#41586B` (7.08:1) | `#B9CFE2` (7.27:1) | Secondary text, captions |
| `--rule` | `#5B7489` (4.66:1 sheet, 3.80:1 desk) | `#7FA6C9` (4.56:1 sheet) | Table rules, hatch, dimension lines |
| `--redline` | `#C4161C` (5.77:1 sheet, 4.70:1 desk) | `#FF8A80` (5.11:1 sheet) | **Reserved** (see below) |
| `--focus` | `= --ink` | `#FFE066` (8.95:1 sheet) | Focus ring |

Two inks only, ink and redline. **Redline is reserved** for exactly three things: the revision cloud, the revision triangle, and the handwritten status inside the cloud. It is never used for links, hover, errors or decoration. Blueprint is a cyanotype ground with off-white line work; it has **no cyan accent and no glow**. Inverted cells (current sheet, hovered row) swap to `--ink` ground with `--sheet` text.

**Type**

| Role | Family | Use |
| --- | --- | --- |
| Titles | **Barlow Condensed** 600 | Cover name, sheet titles, title-block name, large contact address |
| Text | **Barlow** 400 and 600 | Body, descriptions, button labels |
| Data | **IBM Plex Mono** 400 | Sheet numbers, table data, stack lists, periods, URLs |
| Redline | **Kalam** 400 | **Only** the featured project's status text inside the cloud |

Scale: cover name `clamp(3rem, 12vw, 9.5rem)` / 0.92; sheet title `clamp(2rem, 4.5vw, 3.5rem)` / 1; body 1.0625rem / 1.6; data 0.875rem / 1.4 (minimum size 0.875rem everywhere); status 1.25rem minimum. Sentence case everywhere, no tracking, no all-caps. Mono is for data only, never for body copy, so the page does not read as a terminal.

**Layout concept.** **Sheets on a desk.** Each section is a rectangular sheet: 3px `--ink` outer frame and a 1px inner frame inset 8px (the double frame of a real sheet), on the `--desk` ground, with 48 to 64px between sheets. Max sheet width 1120px. On desktop a 208px sticky **sheet index** rail sits at the left of the desk. Every sheet has the same skeleton so the set reads as a set: **sheet title with dimension line at top left, content, title block at bottom right.** Modules use a 4px base; row heights are multiples of 8 (32, 40, 48). 12-column grid, 16px gutter.

**Wireframe: cover sheet (≥1024)**

```text
┌─────────┐ ┌══════════════════════════════════════════════════════════┐
│ sheet   │ ║┌────────────────────────────────────────────────────────┐║
│ index   │ ║│                                                        │║
│┌───────┐│ ║│ {NAME}  Barlow Condensed 600, cover scale              │║
││1 Home ││ ║│ ├───────────── dimension line ────────────┤            │║
││2 About││ ║│                                                        │║
││3 Proj.││ ║│ {INTRO}  (verbatim, max 56ch)                          │║
││4 Skil.││ ║│                                                        │║
││5 Exp. ││ ║│ [ See projects ]  [ Send an email ]                    │║
││6 Cont.││ ║│                                                        │║
│├───────┤│ ║│           ┌──────────────────────┬─────────┬───────────┐│║
││Bluepr.││ ║│           │ {NAME}               │ {ROLE}  │ Sheet 1/6 ││║ title block
│└───────┘│ ║│           └──────────────────────┴─────────┴───────────┘│║
└─────────┘ ║└────────────────────────────────────────────────────────┘║
            └══════════════════════════════════════════════════════════┘
```

**Wireframe: featured detail sheet (≥1024)**

```text
┌══════════════════════════════════════════════════════════════════┐
║┌────────────────────────────────────────────────────────────────┐║
║│ Projects                                                       │║
║│ ├──────────────────────────┤                                   │║
║│ {FEATURED TITLE}                       ╭╮╭╮╭╮╭╮╭╮╭╮╭╮          │║
║│                                       (  {status, handwritten}  )│║ redline cloud
║│                                        ╰╯╰╯╰╯╰╯╰╯╰╯╰╯          │║
║│ {description}                        ┌────────────────────┐    │║
║│                                      │ image viewport, or │    │║
║│ ┌───────────┬─────────────────────┐  │ hatch window       │    │║
║│ │ Stack     │ {items}             │  └────────────────────┘    │║
║│ │ Links     │ {links}             │                            │║
║│ └───────────┴─────────────────────┘                            │║
║│ Project schedule (table)                                       │║
║│ Project │ Status │ Stack │ Links                               │║
║│ ─────────────────────────────────────────                      │║
║│ ...rows...                       ┌──────────┬────────┬────────┐│║
║│                                  │ {NAME}   │Projects│Sheet 3/6││║
║│                                  └──────────┴────────┴────────┘│║
║└────────────────────────────────────────────────────────────────┘║
└══════════════════════════════════════════════════════════════════┘
```

**Principles.** (1) Three line weights only: 3px frame, 2px block outline, 1px rule. (2) Every sheet has the same skeleton (title, content, title block). (3) Tables are the primary layout tool for facts; prose appears only for the about text and project descriptions. (4) State changes instantly; the only animation is the redline draw. (5) Redline is reserved. (6) Right angles only.

#### 6.2.3 Visual direction

| Attribute | Specification |
| --- | --- |
| Background | Flat `--desk` and flat `--sheet`. No grid-paper texture, no gradients, no noise. |
| Borders | Sheet: 3px outer, 1px inner at 8px inset. Blocks and tables: 2px outline, 1px row and column rules. No other weights. |
| Shadows | None anywhere. Sheets separate from the desk by ground color and frame only. |
| Radius | **0 everywhere**, including buttons, images and focus outlines. |
| Spacing | 4px base. Sheet padding 32px (24px tablet, 16px mobile). Table cell padding 8px 12px. |
| Grid | 12 columns, max sheet width 1120px, gutter 16px. |
| Density | **High.** Small type in tables is correct here; body text stays 1.0625rem. |
| Image treatment | Framed **viewport**: 1px `--rule` frame with four 12px L-shaped corner ticks, `object-fit: cover`, no filters. No image: a **hatch window**, an inline SVG `<pattern>` of 1px `--rule` section-hatch lines at 8px pitch, angle chosen from {30°, 45°, 60°, 135°} by a hash of the project slug, `aria-hidden`. |
| Icons | Only three, drawn with 1.5px square-cap strokes: external link, copy, theme. Nothing decorative. |
| Containers | Exactly three: **sheet**, **block** (an outlined table or rectangle) and **cell**. |
| Buttons | **Cell buttons**: rectangular, 2px `--ink` border, min height 48px, Barlow 600 1rem. Primary is filled `--ink` with `--sheet` text; secondary is outlined. |
| Navigation | Sheet index (§6.2.5). |
| Separators | 1px rules between rows; 2px between blocks. |
| Chrome labels | The six "Sheet n of 6" title-block cells are the world's only chrome labels (`aria-hidden`). Table headers, field labels and the index are functional and do not count. |

**Title block (every sheet).** A 2px-outlined row, 40px tall, aligned bottom-right (about 400px wide on desktop, full width on mobile), three cells with 1px dividers: **{NAME}** (Barlow Condensed 600, 1.125rem) | **section name**, or **{ROLE}** on the cover (Barlow 400, 0.9375rem) | **"Sheet n of N"** (Plex Mono 0.875rem; N is the real number of rendered sheets). It contains **only** values from the repo plus the sheet number. No "Drawn by", "Checked by", dates, scale or approval fields: those would assert facts the repo does not contain. Empty cells are omitted. The whole title block is `aria-hidden` because every value in it also exists as real content elsewhere.

**Dimension line (every sheet title).** Under each sheet title, a 1px `--rule` line with 45° end ticks spanning the title's width. Decorative, `aria-hidden`, no numbers on it.

#### 6.2.4 Hero: the cover sheet

- **Composition.** Sheet 1. `{NAME}` as the `<h1>` at cover scale, up to 8 columns, with a dimension line under it. Then `{INTRO}` (existing text, unedited) at 1.25rem / 1.55, max 56 characters per line. Then two cell buttons. Title block at the bottom right: **{NAME} | {ROLE} | Sheet 1 of N**.
- **Hierarchy.** Name, intro, actions. The title block is quiet.
- **CTAs.** "See projects" (filled cell button, jumps to Projects) and "Send an email" (outlined; the existing `mailto:` link).
- **Photo.** If the repo has an owner photo it sits at the right in a framed viewport (cols 9 to 12). If not, the name spans the full width and no substitute is drawn.
- **Motion.** None. The cover sheet is static. This world's orchestrated moment is on the Projects sheet (§6.2.11).

#### 6.2.5 Navigation: the sheet index

- **Desktop (≥1024).** A sticky left rail (208px, `top: 24px`), a 2px-outlined block, `<nav aria-label="Sheet index">`. Six 40px rows separated by 1px rules: the sheet number in Plex Mono, then the existing section name in Barlow 600. The **current** row is inverted (`--ink` ground, `--sheet` text) and has `aria-current="location"`. The last row is the theme toggle cell, labelled with the alternate mode's name (**"Blueprint"** in Print, **"Print"** in Blueprint), following §11.
- **Tablet (640 to 1023).** The rail becomes a sticky top **index strip**: one 48px row of six cells (numeral, and name from 768px up) plus the toggle cell.
- **Mobile (<640).** A fixed bottom **sheet strip**, 56px tall plus `env(safe-area-inset-bottom)`: six cells that share borders like table cells. The current cell shows numeral and name; the other five show the numeral only (min width 40px). Each cell has an `aria-label` such as "Sheet 3, Projects". The theme toggle moves to a plain 40px bar at the top of the cover sheet (not sticky).
- **Scroll offset.** `scroll-padding-top` and `scroll-padding-bottom` equal the sticky bars' heights so focused content is never obscured (WCAG 2.4.11).
- **Current sheet** is tracked by one `IntersectionObserver` with `rootMargin: "-45% 0px -50% 0px"`.

#### 6.2.6 About

- **Treatment.** Sheet 2. Left, 7 columns: the existing about text in Barlow 1.0625rem / 1.65, max 62 characters per line. Right, 5 columns: a **schedule** (a two-column table, label and value, 40px rows) listing only facts that already exist in the repo under their own labels.
- **No labels, no table.** If the repo stores facts without labels, do not invent labels; omit the table and let the text take 8 columns.
- **Long text.** Beyond about 120 words, show the first paragraphs and a "Read more" cell button (`aria-expanded`). Never rewrite or trim the text itself.

#### 6.2.7 Projects

- **Featured (DaloyAqua): the detail sheet.** Sheet 3 opens with the project title (Barlow Condensed 600, `clamp(2.25rem, 5vw, 4rem)`). To its right sits the **status**, typeset in **Kalam** in `--redline` at 1.25rem or larger, exactly as stored, **inside the redline revision cloud** (§6.2.11). Below: description at left (7 columns); at right (5 columns) the image viewport, or the hatch window. Under the description, a two-column **specification table** whose rows are the fields that exist (for example Stack, Links, Period). The status is **not** repeated in this table. Links are text links ("Open project", "Source code") only if they exist; each has an accessible name that includes the project title.
- **No status in the repo.** The cloud circles the project title instead, with no handwriting. Log this in `CONTENT_GAPS.md`.
- **Other projects: the project schedule.** Below the detail block, a real `<table>`: **Project | Status | Stack | Links**. The title links to the project's own page if the repo has one; otherwise it is plain text. A one-line description sits under the title in `--ink-2`. Columns that no project has data for are omitted entirely.
- **Sparse and stress cases.** One project: the detail block only, no schedule. Many projects: the schedule grows; the sheet gets taller. A 90-character title wraps inside its cell (the Project column takes at least 40% of the width). No image: hatch window.

#### 6.2.8 Skills: the matrix

- **Matrix form.** Sheet 4. Rows are skills grouped by category; a full-width category row (Barlow Condensed 600, 1.125rem, 2px top rule) starts each group. Columns are projects. A cell holds a filled 10px `--ink` square **only** when the skill name exactly matches an item in that project's stack list (§2.5), with visually hidden text "Used in {project title}". Use this form only when at least two projects have stack lists **and** at least one exact match exists, and include only projects with at least one match (maximum 12 columns; beyond that the table scrolls inside its own container with a sticky first column). Project headers are set vertically (`writing-mode: vertical-rl; transform: rotate(180deg)`).
- **Schedule form (fallback).** Otherwise a two-column table, **Category | Items**, with items in Plex Mono 0.9375rem separated by 16px gaps and wrapping.
- **Levels.** If the repo stores proficiency labels, add a column showing them as text exactly as stored. No numbers, no bars.
- **Mobile.** Always the schedule form.

#### 6.2.9 Experience: the revision history

- **Treatment.** Sheet 5, one real `<table>` in the repo's order: **Rev | Period | Title | Organization | Description**.
- **Rev column.** Letters A, B, C... assigned in chronological order, oldest is A (a real sequence). Determine the direction from the repo's dates. If chronology cannot be determined, omit the column.
- **Current entry.** If the repo marks an entry as current, a 16px **revision triangle** (`--redline`, 2px outline) surrounds its Rev letter. Add no "Current" label.
- **Description.** Clamped to 2 lines with a "Read more" cell button if longer. Never trimmed.
- **Few entries.** With 2 to 4 rows the sheet is simply short, with the title block 32px below the table. Do not pad, and do not add filler rows.
- **Education.** If the data includes education, its rows appear in the same table in repo order.

#### 6.2.10 Contact: the transmittal

- **Treatment.** Sheet 6. One large block. Inside it, one `<a href="mailto:...">` holding the small label "Send an email" (Plex Mono 0.875rem) above the existing address in Barlow Condensed 600 at `clamp(1.75rem, 5.5vw, 4.5rem)` with `overflow-wrap: anywhere`, underlined by a 3px `--ink` rule with end ticks. Next to it, a "Copy address" cell button (label swaps to "Copied" for 2 seconds; announced through `role="status"`).
- **Social links.** A table, **Platform | Address**, with the repo's names and URLs; each whole row is a link; URL text uses `overflow-wrap: anywhere`.
- **No form, no fields, no backend.**
- **Footer.** Existing footer content only, in Plex Mono 0.875rem on the desk below the last sheet.

#### 6.2.11 Micro-interactions and motion

| Interaction | Behavior |
| --- | --- |
| Hover, focus, press on cell buttons, index rows, linked rows | **Instant** invert (`--ink` ground, `--sheet` text). **No transition**, 0ms. Hover only on fine pointers. |
| Focus | `outline: 3px solid var(--focus); outline-offset: 3px`, square. Visible on the desk and on the sheet. |
| Row highlight | Hover on a schedule, matrix or revision row sets the row ground to `--desk`, instantly. |
| Current sheet | Inverted index row follows scroll (§6.2.5). |
| Read more, copy address | Instant expand; label swap plus live region. |
| **Orchestrated moment: the redline** | The first time the featured detail block is 60% visible (`IntersectionObserver`, `threshold: 0.6`, then unobserve), the cloud draws around the status over **800ms, `linear`** (like a plotter pen) using `stroke-dashoffset` on a path with `pathLength="1"`. Then the revision triangle fades in over 160ms. The status text is real text and is **visible the whole time**; only the cloud and triangle animate. If the block is already 60% visible at hydration, skip the animation and show the drawn state. No JS and reduced motion: drawn state, always. |
| Reduced motion | No draw. Everything else is already instant. |

There are no scroll-reveal animations, no parallax, no transitions. This is the vocabulary that separates this world from the other two.

**Cloud construction (no measuring, no JS geometry).** Use one static inline SVG absolutely positioned around the status (`inset: -14px -18px`), `viewBox="0 0 240 90"`, `preserveAspectRatio="none"`, `aria-hidden="true"`, `focusable="false"`, and `vector-effect="non-scaling-stroke"` on the path so the 2px stroke never distorts. Path (12 scallops on the long sides, 4 on the short sides, clockwise, all arcs sweep 1):

```text
M12 12 A9 9 0 0 1 30 12 A9 9 0 0 1 48 12 A9 9 0 0 1 66 12 A9 9 0 0 1 84 12 A9 9 0 0 1 102 12 A9 9 0 0 1 120 12 A9 9 0 0 1 138 12 A9 9 0 0 1 156 12 A9 9 0 0 1 174 12 A9 9 0 0 1 192 12 A9 9 0 0 1 210 12 A9 9 0 0 1 228 12 A8.25 8.25 0 0 1 228 28.5 A8.25 8.25 0 0 1 228 45 A8.25 8.25 0 0 1 228 61.5 A8.25 8.25 0 0 1 228 78 A9 9 0 0 1 210 78 A9 9 0 0 1 192 78 A9 9 0 0 1 174 78 A9 9 0 0 1 156 78 A9 9 0 0 1 138 78 A9 9 0 0 1 120 78 A9 9 0 0 1 102 78 A9 9 0 0 1 84 78 A9 9 0 0 1 66 78 A9 9 0 0 1 48 78 A9 9 0 0 1 30 78 A9 9 0 0 1 12 78 A8.25 8.25 0 0 1 12 61.5 A8.25 8.25 0 0 1 12 45 A8.25 8.25 0 0 1 12 28.5 A8.25 8.25 0 0 1 12 12 Z
```

The revision triangle is a separate 16px SVG, `M1 15 L8 1 L15 15 Z`, no fill (use `--sheet` behind it so the cloud line does not cross it), placed on the cloud's top-left corner. Stretching makes the scallops slightly uneven, which is intended and reads as hand-drawn.

#### 6.2.12 Responsive behavior

| Section | Desktop (≥1024) | Tablet (640 to 1023) | Mobile (<640) |
| --- | --- | --- | --- |
| Frame and title block | Sheets 1120px max beside the 208px rail; title block about 400px at bottom right | Sheets full width; 24px padding; title block right-aligned | Sheets edge to edge, 3px frame only (drop the inner frame); title block full width |
| Cover | Name up to 8 columns; photo in cols 9 to 12 if present | Name wraps to 2 lines; intro and buttons stack | Name wraps up to 3 lines; buttons stacked full width, min 56px |
| Navigation | Left rail | Sticky top index strip | Fixed bottom sheet strip; toggle at top of cover |
| About | Text 7 cols, schedule 5 cols | Schedule below text, full width | Single column; schedule rows stack label above value |
| Projects | Detail block in two columns; schedule as a table | Detail single column, viewport above description; table keeps all columns | Detail single column; schedule rows stack (explicit ARIA table roles) with stack and links under the title |
| Skills | Matrix (or schedule form) | Matrix scrolls inside its container | Schedule form only |
| Experience | Five-column table | Description column drops under the title | Each row stacks: Rev and Period, Title, Organization, Description |
| Contact | Address, copy button and socials in one block | Address wraps | Address at 1.75rem; copy button and socials stacked full width |

#### 6.2.13 Accessibility and performance notes

- Use **real tables** with `<caption class="sr-only">`, `<th scope="col">` and `<th scope="row">`. When CSS changes a table's `display` on mobile, restate the roles (`role="table"`, `row`, `columnheader`, `cell`) so semantics survive.
- Matrix marks are filled squares with hidden text; the shape is not color-only. The current index row is inverted **and** carries `aria-current`, so state is not color-only.
- The redline SVGs are `aria-hidden`; the status is real text in the DOM.
- `forced-colors: active`: rely on borders and `Highlight` / `HighlightText` for inverted cells (`forced-color-adjust: auto`).
- Verify every pair in both modes with Appendix A. The pairs that matter most: `--redline` on `--sheet` in both modes (text), `--rule` on `--sheet` and `--desk` (3:1), `--focus` on `--sheet` and `--desk` (3:1).
- Fonts: Barlow Condensed 600, Barlow 400 and 600, Plex Mono 400, Kalam 400; latin subset; total at most 140 KB (§12). If the budget fails, drop Kalam and set the status in Barlow 600 italic in `--redline`; record it under Deviations.
- Client JS: scroll-spy, redline observer, clipboard, read-more. Target under 3 KB gzipped.

#### 6.2.14 What this world must not become

No invented measurements, scale bars, north arrows, dates, revision numbers, "Drawn by", "Checked by" or approval stamps. No grid-paper texture, cyan glow or CAD toolbar pastiche. No rounded corners and no shadows. Mono type only for data, never body copy. Redline only for the cloud, the triangle and the status. No all-caps chrome. No transitions except the redline draw. No more than six chrome labels.

---

### 6.3 World 03: "The Current" (the descent)

**Branch:** `portfolio/world-03-the-current`

> Numbering note: this world has one extra subsection, 6.3.12 (how the line is built), so its responsive, accessibility and anti-goal subsections are 6.3.13 to 6.3.15. Sections 6.3.7 (projects) and 6.3.11 (motion) match the cross-references elsewhere in this document.

#### 6.3.1 Concept

- **Metaphor.** Reading the portfolio is a **descent through water**. Each section is a **zone**, from sunlit surface to deep water. One continuous **line**, the current, is drawn by scrolling and flows through every zone, joining each project and each experience entry to the next, and ending under the contact address.
- **Subject grounding.** *Daloy* is Filipino for "flow" and is the first half of the featured project's name. This world borrows the **flow** idea only. It does **not** depict, describe or make claims about that project. Zone names (surface, sunlit, twilight, midnight) are internal design vocabulary and are **never shown as text**; there are no depth numbers anywhere.
- **Philosophy.** Calm, deep, unhurried. It says "a thoughtful systems thinker who values focus." The emotion is quiet absorption: one idea per screen. It differs from the other worlds because **space is the structure** (no boxes, no cards, no borders), type is large and light, the palette is a single hue ramp, and the only motion is slow and tied to scroll.
- **Signature element.** The scroll-drawn line.

#### 6.3.2 Design plan

**Color: one hue ramp, six zones.** Hard-edged flat bands, no gradients between zones. Ratios verified with the Appendix A script while writing this spec.

| Zone | Section | Surface (default) ground | Deep ground |
| --- | --- | --- | --- |
| 1 | Home | `#EDF7F6` | `#1A4A55` |
| 2 | About | `#C9E6E4` | `#123B4A` |
| 3 | Projects | `#1E6B75` | `#0E2F44` |
| 4 | Skills | `#134E5A` (strata alternate with `#1A5B68`) | `#0B2438` (alternate `#0F3347`) |
| 5 | Experience | `#0C3742` | `#081B2E` |
| 6 | Contact | `#072830` | `#051222` |

Each zone element sets its own tokens; children inherit them. **Text color changes only at zone boundaries, never inside a zone.**

| Token | Surface zones 1 and 2 | Surface zones 3 to 6 | Deep zones 1 to 6 |
| --- | --- | --- | --- |
| `--fg` | `#0B2A30` (13.86:1 and 11.47:1) | `#F2FBFA` (5.84, 8.81, 12.16, 14.72) | `#F2FBFA` (9.26 to 17.88) |
| `--fg-2` | `#2F5158` (7.89 and 6.53) | `#CDE7E4` (4.73, 7.13, 9.84, 11.91) | `#CDE7E4` (7.49 to 14.47) |
| `--line` | `#0F5560` (7.73 and 6.40) | `#BFF0EA` (4.94 to 12.45) | `#BFF0EA` (7.83 to 15.11) |
| `--focus` | `= --fg` | `= --fg` | `= --fg` |

The line has **no accent color**. It is the darkest ink on the light zones and the palest foam on the dark zones, so the world stays one hue with no near-black-plus-accent pairing. Modes: **Surface** (default) and **Deep**, where the ramp starts dark and stays dark. The theme toggle is a small ring labelled with the alternate mode's name (§11).

**Type**

| Role | Family | Use |
| --- | --- | --- |
| Display | **Fraunces**, weight 300, `SOFT` axis at 100, `WONK` off | Name, zone titles, project and station titles, skill items, contact address |
| Text | **Hanken Grotesk** variable (400, 500) | Everything else |

Request only the axes you need through `next/font/google`. If the Fraunces file exceeds 60 KB gzipped, use the static 300 weight without axes and record it under Deviations. Scale: name `clamp(3.5rem, 12.5vw, 11rem)` / 0.95; zone title `clamp(2.75rem, 7vw, 6rem)` / 1; featured title `clamp(2.5rem, 6vw, 5.5rem)` / 1; station title `clamp(1.75rem, 3.5vw, 2.75rem)` / 1.1; body 1.125rem / 1.7; small 0.9375rem; minimum 0.875rem. Sentence case, no tracking, no all-caps.

**Layout concept.** Six full-bleed zones, each at least one viewport tall (the hero 90svh) with vertical padding `clamp(160px, 18vh, 240px)`. Inside each zone a **reading column** (max 36rem) sits on one side and an empty **channel** (at least 16vw) on the other, where the line runs. **The sides alternate by zone:** Home text left, About right, Projects left, Skills right, Experience left, Contact right. The line switches channels only in the empty padding between zones, so it **never crosses text**.

**Wireframe: hero (≥1024)**

```text
┌──────────────────────────────────────────────────────────────┬─┐
│ SURFACE ground #EDF7F6                                       │ │ depth
│                                                              │·│ gauge
│  {NAME}  Fraunces 300, enormous                              │ │ (right
│  ───────────────────────────────○  origin node               │·│  edge)
│                                 │                            │ │
│  {ROLE}                         │  the line begins           │─│
│                                 │  at the end of the name    │ │
│  {INTRO}  (36rem column)        │  and flows down            │·│
│                                 │                            │ │
│  ( See projects )   Send an email                            │·│
│                                                              │ │
└──────────────────────────────────────────────────────────────┴─┘
```

**Wireframe: projects (≥1024), line in the right channel**

```text
│ TWILIGHT ground #1E6B75                                        │
│                                                                │
│  Projects                                              ┊       │
│                                                        ┊       │
│  {FEATURED TITLE}                                    ╭─┴─╮     │
│  ○ {status, exactly as stored}                       │ ○ │ eddy│
│  {description}                                       ╰─┬─╯     │
│  Stack   {items, comma separated}                      ┊       │
│  Open project   Source code                            ┊       │
│                                                        ┊       │
│  {Station title}  ─────────────────────────────────────○       │
│  {one-line description}                                ┊       │
│  {stack}                                               ┊       │
│                                                        ┊       │
│  {Station title}  ─────────────────────────────────────○       │
```

**Principles.** (1) One line; everything else is quiet. (2) Space is the structure: no boxes, borders or cards. (3) Type carries the personality: large light serif for titles, grotesk for reading. (4) Motion is slow and tied to scroll; nothing snaps. (5) Content never sits in the channel. (6) One idea per screen.

#### 6.3.3 Visual direction

| Attribute | Specification |
| --- | --- |
| Background | Six flat zone grounds with hard edges. Skills alternates two tones per stratum. No gradients between zones, no texture, no caustics. |
| Borders | None. |
| Shadows | None. |
| Radius | Two values only: `0` and `999px` (pills, rings, gauge). |
| Spacing | 8px base. Zone padding `clamp(160px, 18vh, 240px)`. At least 96px between stations. |
| Grid | 12 columns, max 1440px. Reading column 6 to 7 columns; channel at least 2 columns. |
| Density | **Very low.** |
| Image treatment | Unframed rectangle, `object-fit: cover`, no filters, no radius, max 44rem wide. **No image: no placeholder and no pattern.** The text simply takes the space. |
| Icons | Three, 1.5px round-cap strokes: external link, copy, theme ring. Nothing else. |
| Containers | **None.** Two devices only: the **node** (a 14px ring on the line) and the **tick** (a 24px stroke joining a node to its text). |
| Buttons | Primary: pill, min height 52px, `--fg` ground with the zone's ground as text, Hanken 500 1.0625rem. Secondary: text link with a drawn underline. |
| Navigation | Depth gauge (§6.3.5). |
| Separators | None. Zone change and empty space do the separating. |

#### 6.3.4 Hero: the surface

- **Composition.** Zone 1. `{NAME}` in Fraunces 300 at the largest scale, left-aligned, starting about one third down the first screen. Under it `{ROLE}` in Hanken 500 1.25rem, then `{INTRO}` (existing text, unedited) in the 36rem column, then the actions. The line starts from a node ring at the **end of the name** (placed by measuring a zero-size marker after the last character).
- **Hierarchy.** Name, role, intro, actions.
- **CTAs.** "See projects" (primary pill) and "Send an email" (underlined link; the existing `mailto:`).
- **Photo.** If the repo has an owner photo it sits unframed in the channel side, max 22rem wide. Otherwise nothing.
- **Orchestrated moment: the first stroke.** On load the line draws from the origin node down to about one viewport below it over **1.4s, `cubic-bezier(.4, 0, .2, 1)`**, then hands over to scroll (§6.3.12). Reduced motion: the whole line is drawn and static.

#### 6.3.5 Navigation: the depth gauge

- **Desktop (≥1024).** A fixed gauge at the right edge (`right: 24px`), vertically centered: a rail 240px tall with six ticks (equal spacing, each an `<a>` with a 44px hit area) and a 14px ring **marker** that travels along the rail with scroll. The label of the current section (existing name, Hanken 500 0.875rem) sits left of the marker on a small dark chip. Hover or focus on the gauge reveals all six labels (opacity, 300ms). The current tick has `aria-current="location"`. The theme toggle sits under the rail as a 44px ring.
- **Marker position.** Piecewise linear: between the tick of the current zone and the next tick, by the fraction of the current zone scrolled. Transform only.
- **Contrast on every zone.** Gauge marks use **static dual-tone**: a `#F2FBFA` core with a 1px `#0B2A30` casing (rail: 3px `#0B2A30` with a 1px `#F2FBFA` center). Label chips are `#0B2A30` with `#F2FBFA` text (14.38:1) and a 1px `#F2FBFA` outer ring. Verified against zones 1, 2, 3 and 6 (≥5.84:1 or better for the visible edge).
- **Tablet (640 to 1023).** Same gauge, 200px tall, `right: 12px`. Labels only on hover and focus.
- **Mobile (<640).** A fixed bottom-center **pill** (48px tall, min width 160px, `bottom: calc(16px + env(safe-area-inset-bottom))`, same static dual-tone) showing the current section's name. Activating it opens a native `popover="auto"` list of six links above it (each at least 48px, current has a ring marker and `aria-current`), with the theme toggle as the last item. Native popover gives Esc, light dismiss and focus return. If `showPopover` is not supported, the pill becomes an anchor to a plain list of the six sections in the footer.
- **Scroll offset.** `scroll-padding-bottom: 88px` on mobile so focused content clears the pill.
- **Current section** tracked by one `IntersectionObserver` (`rootMargin: "-45% 0px -50% 0px"`).

#### 6.3.6 About: the sunlit zone

- **Treatment.** Zone 2. Zone title in Fraunces 300, then the existing about text in the 36rem column (Hanken 1.125rem / 1.7), text on the right, line in the left channel.
- **Lead sentence.** If the text's **first sentence** is 160 characters or fewer, it may be set larger (Fraunces 300, 1.75rem / 1.4), lifted verbatim. It is not repeated; the rest of the text follows unchanged.
- **Facts.** If the repo has labelled facts (for example role, education, location), show them as a plain stack in the opposite margin: label (`--fg-2`, 0.9375rem) above value (`--fg`, 1.125rem), 24px apart, no borders. Only facts present in the repo.
- **Long text.** Show all of it. **There is no "Read more" anywhere in this world**; longer text makes the zone taller.

#### 6.3.7 Projects: the twilight zone

- **Featured (DaloyAqua): the eddy chamber.** At least one viewport tall. The line arrives in the channel and makes **one full loop** (radius 56px) around a **status node**. Beside the node, the status exactly as stored (Hanken 500 1.0625rem, `--fg`). Then the title (Fraunces 300, featured scale), the description (36rem), a **Stack** label (`--fg-2`, 0.9375rem) above the items as a comma-separated line, and the links as underlined text links ("Open project", "Source code", only if they exist, each with an accessible name that includes the title). If an image exists it sits unframed beside or below the text. If there is no status, the node has no text and no gap is left.
- **Supporting projects: stations.** Each project is a **node** on the line, a 24px **tick**, and a text block on the reading side: title (Fraunces 300, station scale; a link if the repo has an internal page, and the underline draws on hover), one-line description (`--fg-2`), status if present (0.9375rem, `--fg-2`, exactly as stored), stack line, links. No borders, no cards, at least 96px between stations.
- **Sparse and stress cases.** One project: the eddy chamber only, and its minimum height relaxes to content plus padding. Eight projects: seven stations. A 90-character title wraps at station scale. No image: no placeholder. No links: no link line.

#### 6.3.8 Skills: the strata

- **Treatment.** Zone 4, text on the right. Each category is a **stratum**: a full-bleed horizontal band alternating the zone's two tones, padding `clamp(48px, 8vh, 96px)`. Inside, the category name (Hanken 500, 0.9375rem, `--fg-2`) sits at the start of the reading column, and the items flow as a line of words in Fraunces 300 at `clamp(1.5rem, 3vw, 2.25rem)` with 1.25rem column gap and 0.5rem row gap, wrapping. Stratum height follows item count naturally.
- **No chips, no bars, no logos, no percentages.** If the repo has levels, append them after the item in Hanken 0.875rem `--fg-2`, exactly as stored.
- Items are not interactive.

#### 6.3.9 Experience: the waypoints

- **Treatment.** Zone 5, text left, line right. Entries in the repo's order, each a node, a tick and a text block: period (Hanken 500 0.9375rem, tabular numerals, `--fg-2`), title (Fraunces 300, 1.75rem), organization (Hanken 400, 1.0625rem), description (Hanken 1.0625rem / 1.65) shown in full.
- **Present.** If the repo marks an entry as current, its node ring is **filled** (solid `--line`); other nodes are hollow. Add no "Current" label.
- **Few entries.** With 2 to 4 entries the long travel of the line through open space *is* the design. Do not add filler.
- Education entries, if present, follow the same treatment in repo order.

#### 6.3.10 Contact: the abyss

- **Treatment.** Zone 6, text right. The label "Send an email" (Hanken 500, 0.9375rem, `--fg-2`) above the existing address as one `mailto:` link in Fraunces 300 at `clamp(1.75rem, 5.5vw, 5rem)` with `overflow-wrap: anywhere`. **The line's last segment becomes the address's underline**: it runs to the left edge of the address's *last line box* (measure with `Range.getClientRects()`), 10px below the baseline, and along its width, ending with a round cap.
- Below: a "Copy address" text button (label swaps to "Copied" for 2 seconds; `role="status"`), then social links as plain text links, one per line, Hanken 1.125rem, with drawn underlines.
- **No form, no fields, no backend.**
- **Footer.** Existing footer content only, Hanken 0.9375rem, `--fg-2`, after generous space.

#### 6.3.11 Micro-interactions and motion

| Interaction | Behavior |
| --- | --- |
| The line | Drawn length follows scroll (§6.3.12). This is the world's one continuous motion. |
| **Orchestrated moment: the first stroke** | 1.4s draw on load (6.3.4). Once. |
| Link underline | `transform: scaleX(0 → 1)` from the left, 400ms `cubic-bezier(.22, .61, .36, 1)`, on hover (fine pointers) and on focus. |
| Primary pill | Hover: `translateY(-2px)` over 300ms. Press: back to 0 over 100ms. |
| Gauge labels | Opacity 300ms. |
| Theme switch | Instant ground change. No crossfade. |
| Copy address | Label swap plus live region. |
| Focus | `outline: 2px solid var(--focus); outline-offset: 6px`, with `border-radius: 999px` on pills and rings and `0` elsewhere. |
| Reduced motion | The line is **fully drawn and static** (no first stroke, no scroll linking). Underlines and pills change state instantly. The gauge marker jumps. |

There are no scroll-reveal animations, no parallax, no cursor effects. **Text never moves on scroll.**

#### 6.3.12 How the line is built

1. **Markup.** One `<svg class="current" aria-hidden="true" focusable="false">`, `position: absolute; inset: 0; width: 100%; height: 100%` inside a `position: relative` wrapper around all zones, `pointer-events: none`, `z-index: 0`; text sits above it (`position: relative; z-index: 1`). It holds a `<linearGradient id="current-ink" gradientUnits="userSpaceOnUse">` with **hard stops only** (two stops at the same offset at each zone boundary, so the stroke switches between `--line` colors exactly at boundaries; this is a color switch, not a visual gradient), one `<path>` (stroke `url(#current-ink)`, 2.5px, `fill: none`, round caps and joins, `vector-effect: non-scaling-stroke`), and node `<circle>`s (r = 7) and tick `<line>`s generated at the same coordinates as the waypoints.
2. **Waypoints (built at load, on `ResizeObserver` of the wrapper, and after `document.fonts.ready`, debounced 100ms).**
   - Origin: the end-of-name marker (§6.3.4).
   - Each zone contributes an entry point (channel x, zone top + 12% of zone height), one point per `[data-node]` element inside it (channel x nudged 2% of width toward the text, at the node's y), and an exit point (channel x, zone bottom minus 12%).
   - Between zones: three points, (previous channel x, boundary − 96px), (page center x, boundary), (next channel x, boundary + 96px). Zone padding of at least 160px guarantees this stays in empty space.
   - Featured node: insert a loop of 8 points on a circle of radius 56px (40px on tablet) around the node, at 45° steps from the top, clockwise. The node sits at the channel's center.
   - Contact: end with (address last-line left, baseline + 10px), then (address last-line right, baseline + 10px), duplicating the end points so the final run is straight.
   - Channel x: left channel 8% of layout width, right channel 92%.
3. **Curve.** Catmull-Rom through the waypoints (tension 0.5) converted to cubic Béziers. About 60 to 100 waypoints; one path.
4. **Scroll linking.** After building the path, sample it every 24px along its length (`getPointAtLength`) into an array of `(y, length)` pairs. On scroll (passive listener, `requestAnimationFrame`-throttled) read only `window.scrollY`, take `targetY = scrollY + 0.85 × innerHeight`, binary-search the array for the length, and set `stroke-dashoffset = totalLength − drawnLength`. Nodes fade in (opacity 0 to 1, 300ms, once) when the drawn length passes their precomputed length. The first stroke is `max(introProgress, scrollProgress)`.
5. **Below 1024px.** A single left channel for all zones (x = 12px), no alternation and no cross-overs, ticks 12px, text with 40px start padding, a gentle ±3px meander, **no eddy loop** (the status node is a plain ring), and the contact underline kept.
6. **No JavaScript.** The page is fully readable as zones and typography with no line. This is accepted.
7. **Reduced motion.** Skip steps 4 and the first stroke; draw the full path once.
8. **Rebuild safety.** Never read layout inside the scroll handler. Rebuild only on resize or font load.

#### 6.3.13 Responsive behavior

| Section | Desktop (≥1024) | Tablet (640 to 1023) | Mobile (<640) |
| --- | --- | --- | --- |
| Zones and line | Alternating channels; eddy loop radius 56px | Alternating channels of 12vw; loop radius 40px | Single left channel; no loop |
| Hero | Name at full scale; column and channel as wireframe | Name wraps to 2 lines; column full width minus channel | Name wraps up to 3 lines; pill and link stacked |
| Navigation | Right-edge gauge | Shorter gauge, labels on hover and focus | Bottom-center pill plus popover list |
| About | Text in the 36rem column; facts in the opposite margin | Facts below the text | Single column; facts below |
| Projects | Eddy chamber; stations on the reading side | Same, tighter spacing (at least 72px) | Same, at least 64px spacing; images full width |
| Skills | Strata with the category name at the start of the column | Same | Category name above items; strata padding 40px |
| Experience | Stations, text left, line right | Same | Stations with 40px start padding |
| Contact | Address at up to 5rem; underline is the final line segment | Address wraps | Address at 1.75rem; wrapped last line takes the underline |

#### 6.3.14 Accessibility and performance notes

- The line, nodes and ticks are `aria-hidden` and `pointer-events: none`. They live in channels and gaps and must never overlap text or obscure a focused element (§11).
- Zone tokens are verified in both modes. The tightest text pair is `--fg-2` on zone 3 (4.73:1); do not lighten zone 3.
- The gauge is `<nav aria-label="Sections">` with real links; marks are dual-tone so they read on every zone; hit areas are at least 44px.
- Mobile popover uses the native `popover` attribute for Esc, light dismiss and focus return.
- Fonts: Fraunces (≤ 60 KB) and Hanken Grotesk variable (≤ 30 KB), subset latin, `next/font` with `size-adjust`. Client JS: line builder, scroll-spy, gauge marker, clipboard, popover fallback; target under 6 KB gzipped (§12).
- One path animates at a time. No `will-change` on more than the path.

#### 6.3.15 What this world must not become

No waves, blobs, bubbles, fish, coral, boats, anchors or other sea imagery. No caustics, glow, particles or gradient backgrounds. No parallax and no scroll-reveals on content. No fake depth numbers, meters or "you are here" labels. No borders, cards or chips. **Exactly one line**, and it never crosses text. No all-caps chrome. No invented copy about water or flow, and nothing that describes or depicts DaloyAqua.

---

## 7. World comparison matrix

### 7.1 The matrix

This matrix must be produced (and, if needed, revised) **before** any world is implemented, as the Phase 2 checkpoint (§9.4). It is reproduced here filled in, and Session A recreates it in `docs/worlds/01_CONCEPT_LOCK.md` as the record of the decision.

| Category | World 01 — Biyahe | World 02 — As-Built | World 03 — The Current |
| --- | --- | --- | --- |
| Design philosophy | The portfolio is a painted route board; color is structure; every element feels physical and pressable | The portfolio is an issued as-built drawing set; structure is the design; the record is honest, including what is unfinished | The portfolio is a descent through water; one drawn line joins everything; space is the structure |
| Visual mood | Loud, warm, tactile, confident, friendly | Cool, precise, dense, quiet, verifiable | Calm, deep, spacious, unhurried, absorbed |
| Layout | Full-width horizontal color bands, uneven column splits, plate-based | Framed sheets with a fixed skeleton (title, content, title block), tables as the primary layout tool | Six full-bleed zones, a 36rem reading column against an empty channel, alternating sides |
| Typography | Bungee (display, plates only) + Lexend (everything else); type sits inside colored plates | Barlow Condensed (titles) + Barlow (text) + IBM Plex Mono (data) + Kalam (handwritten status only) | Fraunces 300 (display, large and light) + Hanken Grotesk (text) |
| Color | Six saturated flat fields (sun, signal, cobalt, leaf, chalk, enamel), each with exactly one job | Two inks (ink, redline) on print paper or cyanotype blueprint; redline reserved for one purpose | One hue ramp across six zones, surface to deep; no accent color at all |
| Navigation | Sticky row of colored route plates; mobile "Routes" plate opens a full-screen native dialog | Sticky sheet index rail with sheet numbers; mobile becomes a fixed bottom sheet strip | Fixed depth gauge with a traveling marker; mobile becomes a bottom pill with a native popover list |
| Hero | Destination board carries the name; role plate below it; the roll-sign motion settles on the name once per session | Cover sheet: name at cover scale with a dimension line; static, no motion | Enormous name; the line originates at its end and makes the first stroke down the page |
| Projects | Featured project as a full-width board; others as a pressable "route list" of row-plates that expand | Featured project as a detail sheet with a redline cloud around its status; others as rows in a real project-schedule table | Featured project as an "eddy" where the line loops once around the status; others as stations threaded on the line |
| Animation | One moment: the roll-sign name reveal. Otherwise only press states on interactive plates | One moment: the redline cloud draws itself once, on first view. Otherwise everything is instant | One continuous motion: the line's draw length follows scroll, plus one 1.4s first stroke on load |
| Interaction model | Physical: press, release, overshoot. Things look like buttons because they behave like buttons | Referential: instant state, tables you scan and cross-reference, nothing pretends to be tactile | Ambient: the page reveals itself as you move through it; almost nothing is a discrete "control" |
| Overall personality | The builder who makes things people can pick up and use | The engineer who documents and verifies, and says plainly what is still in progress | The systems thinker who values focus and lets one idea occupy the screen at a time |

### 7.2 The similarity gate

Run this check as part of the Phase 2 checkpoint, **before** implementation begins, using the matrix above, and again in Phase 6 using real screenshots.

- **The thumbnail test.** Shrink a full-page screenshot of each world's home route to 320px wide. If a viewer who has not been told which is which cannot correctly match at least two of three worlds to their concept names, the worlds are too similar. Fix the weaker world's signature element or layout logic, not its color.
- **Row-by-row check.** For every row in §7.1, at least two of the three cells must describe a genuinely different mechanism, not a different word for the same thing. "Sticky navbar" versus "sticky navbar with plates" versus "sticky navbar with pills" is **one** mechanism in three costumes and fails this check; §5.1 to §6.3 were written to avoid exactly that (route plates vs. sheet index vs. depth gauge are three different navigation *models*, not three skins on a navbar).
- **If the gate fails.** Do not adjust hex values to create a false sense of difference. Revisit the failing world's layout logic, navigation model or signature element under §4.3, record the change in that world's report, and re-run the gate.

---

## 8. Git branch strategy

### 8.1 Principles

This elaborates the rules already stated in §0.2. Everything below is **local branch hygiene on a personal project**; there is no requirement to open pull requests or touch branch protection, though doing so is fine if the owner already works that way.

- Never modify the branch you started from.
- Every world branch starts from the **same commit** on `portfolio/baseline`, so the three are true siblings.
- A world branch only ever receives commits that build that world. If a genuine bug fix is needed on the shared baseline (for example, a build error unrelated to any world), fix it once on `portfolio/baseline` before branching, or `git cherry-pick` the single fix commit into each world branch by hash — never merge one world branch into another.
- No branch is ever deleted, force-pushed, or reset by this process. Undo with `git revert`.

### 8.2 Sequence

```bash
# 1. Establish where we actually are
git status --short
git branch --show-current
git log --oneline -5

# 2. Create the baseline branch from the current state (do this once)
git checkout -b portfolio/baseline

# 3. Commit the outputs of Phase 0 and Phase 2 (discovery docs, content map,
#    content gaps, concept lock, and this spec itself if it is not already
#    committed) to portfolio/baseline before branching further.
git add PORTFOLIO_DESIGN_EXPLORATION.md docs/worlds/
git commit -m "docs(worlds): add design exploration spec and discovery findings"

# 4. Cut the three world branches from that same baseline commit
git checkout -b portfolio/world-01-biyahe portfolio/baseline
git checkout portfolio/baseline
git checkout -b portfolio/world-02-as-built portfolio/baseline
git checkout portfolio/baseline
git checkout -b portfolio/world-03-the-current portfolio/baseline
git checkout portfolio/baseline
```

If the repository has a remote, push each branch after it is created (`git push -u origin <branch>`) so the branches are backed up as soon as they exist, independent of when each world is finished.

### 8.3 Commit discipline inside a world branch

- Commit at the end of each subsection of work (tokens and Tailwind config, then hero, then navigation, and so on), not as one giant commit.
- Commit message prefix identifies the world: `world-01:`, `world-02:`, `world-03:`, for example `world-02: add sheet frame and title block components`.
- The final commit on each world branch is always the world report: `world-01: add World 01 report`.
- Never commit `node_modules`, build output, or the `docs/worlds/baseline/` screenshots taken during Phase 0 stress-testing (those are captured to a location covered by `.gitignore`, or removed before commit if they were not).

### 8.4 What must never happen

- `git checkout portfolio/world-02-as-built -- <path>` run against `portfolio/world-01-biyahe` (pulling one world's files into another).
- Merging any world branch into `portfolio/baseline` or into another world branch during this exploration. They stay independent until the owner decides what happens next (§14.4).
- Any command from §0.2 rule 3 on any branch.
- Renaming or deleting `portfolio/baseline` or the branch the repository started on.

### 8.5 Parallel sessions with worktrees

If Sessions B, C and D (§0.3) run concurrently, use `git worktree` so each session has its own working directory and cannot accidentally touch another world's files:

```bash
git worktree add ../portfolio-world-01 portfolio/world-01-biyahe
git worktree add ../portfolio-world-02 portfolio/world-02-as-built
git worktree add ../portfolio-world-03 portfolio/world-03-the-current
```

Each session `cd`s into its own worktree directory, runs its own `<pm> install`, and works only there. Remove worktrees when finished (`git worktree remove ../portfolio-world-01`); this does not touch the branch itself.

---

## 9. Implementation sequence

### 9.1 Overview

| Phase | Name | Branch | Session | Reads |
| --- | --- | --- | --- | --- |
| 0 | Discovery | `portfolio/baseline` | A | §2 |
| 1 | Baseline and content extraction (only if needed) | `portfolio/baseline` | A | §2.3 finding |
| 2 | Concept lock | `portfolio/baseline` | A | §5, §7 |
| 3 | Build World 01 | `portfolio/world-01-biyahe` | B | §6.1 |
| 4 | Build World 02 | `portfolio/world-02-as-built` | C | §6.2 |
| 5 | Build World 03 | `portfolio/world-03-the-current` | D | §6.3 |
| 6 | Comparison | `portfolio/baseline` (docs only) | E | §7, all three reports |
| 7 | Handoff | — | E | §14 |

Phases 3, 4 and 5 are independent and order-agnostic; they may run sequentially or in parallel worktrees (§8.5).

### 9.2 Phase 0 — Discovery (read-only)

Execute the discovery protocol at §2.3 completely. Write `docs/worlds/00_REPO_ANALYSIS.md`, `docs/worlds/CONTENT_MAP.md`, and `docs/worlds/CONTENT_GAPS.md` (initialized with anything already known to be missing, such as candidate projects absent from the data per §2.2). Capture baseline screenshots per item 15. **Make no changes outside `docs/worlds/`.** Do not create branches yet.

**Checkpoint.** All three files exist and are internally consistent; the baseline build passes lint, typecheck and build, or the failures are recorded verbatim.

### 9.3 Phase 1 — Baseline and content extraction (conditional)

Run this phase **only if** Phase 0 found content hard-coded inside JSX rather than in dedicated data files. In that case, extract it into typed data modules (for example `content/projects.ts`) with **no change to the values themselves**, so all three worlds can import the same data without duplicating literals across three trees. Commit this once on `portfolio/baseline`, before cutting the world branches, so every world starts from identical data plumbing. If content is already in dedicated data files, skip this phase and note in the concept lock that it was skipped.

**Checkpoint.** Build still passes; a diff of rendered output against the pre-extraction baseline shows no content change, only structural relocation.

### 9.4 Phase 2 — Concept lock

Write `docs/worlds/01_CONCEPT_LOCK.md` containing: the §7.1 matrix, the result of the §7.2 similarity gate, and confirmation that all three worlds are grounded in real subject matter from §1 and §2 rather than generic tropes (§5.2). If the gate fails, revise per §7.2 before proceeding. This file, once it passes the gate, is what Sessions B, C and D build against; do not reopen the concept during Phases 3 to 5 except under §4.3.

**Checkpoint.** `01_CONCEPT_LOCK.md` committed to `portfolio/baseline`; gate passed. Cut the three world branches (§8.2).

### 9.5 Phases 3 to 5 — Build each world

For the relevant world section (§6.1, §6.2 or §6.3), in this order:

1. **Tokens.** Implement the color, type and spacing tokens for both modes. Verify every text and UI-component contrast pair with the Appendix A script before moving on; do not build components against unverified colors.
2. **Skeleton and navigation.** Build the section skeleton and the world's navigation model at all three breakpoints (§6.x responsive table).
3. **Sections in content order.** Hero, About, Projects (including the featured-project treatment and the sparse and many-project cases from §2.6), Skills, Experience, Contact — each checked against real repo content as it is built, not against placeholder text.
4. **Signature element and orchestrated moment.** Implement last, once the static structure is solid, so the one moment of boldness is layered onto something already correct.
5. **Stress tests.** Run every case in §2.6 against this world specifically; screenshot each; revert the temporary content edits.
6. **Accessibility and performance pass.** Run the §11 and §12 checks for this world.
7. **World report.** Write `docs/worlds/WORLD_0N_REPORT.md`: what was built, every Deviation (§4.3) with reasoning, every `needs owner review` flag, the stress-test screenshots, the accessibility and performance results, and anything logged to `CONTENT_GAPS.md` in the course of this world.

**Checkpoint per world.** The world builds and runs independently on a clean checkout of its branch; every checklist item in §13 passes or is explicitly flagged; the report is committed as the final commit on the branch.

### 9.6 Phase 6 — Comparison

On `portfolio/baseline`, after all three world branches exist: capture matching screenshots of every world at the same routes and the same three viewport widths (360, 768, 1280, matching Phase 0's baseline set), run the §7.2 thumbnail test on the real screenshots, and write `docs/worlds/COMPARISON.md` combining the three world reports, the matrix, the gate result, and the screenshots (referenced by relative path, not duplicated).

**Checkpoint.** `COMPARISON.md` and its screenshots committed to `portfolio/baseline`. This is a documentation-only commit; no application code changes on this branch.

### 9.7 Phase 7 — Handoff

Present the owner with the three branches and `COMPARISON.md` per §14. No further changes are made in this exploration; any follow-up (picking one world, combining elements, iterating further) is new work scoped separately.

### 9.8 If a phase cannot complete

Record exactly what failed and why in the relevant `docs/worlds/` file, then continue with the next phase where possible rather than stopping the whole run. A blocked Phase 3, for example, should not prevent Phases 4 and 5 from proceeding.

### 9.9 Ask the owner only when

Everywhere else, proceed and record the decision. Interrupt and ask only when one of these is true:

1. **A protected path (§2.4) must change** to satisfy an accessibility or build requirement, and there is no way to satisfy it otherwise.
2. **Discovery contradicts an [OWNER] fact in a way that changes feasibility** — for example, the stack is not what §2.2 states, or the theming mechanism cannot be re-skinned without a rewrite.
3. **The §7.2 similarity gate fails twice** for the same pair of worlds after one revision attempt.
4. **A world's report has three or more `needs owner review` flags** (§4.3), signaling the concept itself may need to change, not just an implementation detail.
5. **Content is genuinely ambiguous** in a way that could misrepresent the owner if guessed wrong (for example, a status field that could mean either "shipped" or "in progress" depending on interpretation) — log it in `CONTENT_GAPS.md` and ask, rather than choosing a reading.

In every other situation, including ordinary sparse data, missing optional fields, font substitutions and hex adjustments, proceed under §4.3 and record the decision.

---

## 10. Responsive design requirements

Section-by-section transformation for each world is specified in §6.1.12, §6.2.12 and §6.3.13. This section states the rules that apply **identically across all three worlds**, so responsiveness itself does not become a fourth, accidental point of difference.

### 10.1 Shared breakpoints

| Name | Range | Primary target |
| --- | --- | --- |
| Desktop | ≥1024px | Laptop and desktop screens |
| Tablet | 640 to 1023px | Tablets and small laptops |
| Mobile | <640px | Phones |

Use these three as the only layout breakpoints. A world may add a narrow-internal adjustment (for example a `min-width: 400px` tweak to button stacking) but must not introduce a fourth major layout tier; that would make the world harder to compare against the other two.

### 10.2 Rules that apply to every world

- **Design, do not shrink.** Each world's mobile treatment is specified deliberately in its own responsive table (§6.1.12, §6.2.12, §6.3.13); mobile is not "the desktop layout at 375px." This is checked explicitly in §13.
- **No horizontal scroll** on the page itself at any width from 320px up, except inside an explicitly scrollable container that is declared as such (World 02's skills matrix, §6.2.8) and is keyboard-operable.
- **Touch targets** are at least 44×44 CSS px (48px where a world's own spec says 48px) for every interactive element on touch-capable layouts, including nav items, buttons, and expand or copy controls.
- **Safe areas.** Any element fixed to the viewport edge (World 01's mobile "Routes" plate, World 02's mobile sheet strip, World 03's mobile depth pill) adds `env(safe-area-inset-*)` on the relevant side, and the `viewport` meta tag includes `viewport-fit=cover`.
- **Orientation.** No layout assumes portrait. Test each world's mobile layout in landscape at a short viewport (for example 740×360) and confirm fixed navigation elements do not cover more than 20% of the viewport height.
- **Text reflow.** At 320px CSS width and at 200% browser zoom, no text is clipped or overlapping, and no two-dimensional scrolling is required to read a sentence (WCAG 1.4.10).
- **Images.** Use `next/image` (or the repo's existing image approach if different, per Phase 0 findings) with responsive `sizes`, so a large viewport image is not shipped to a mobile client. Each world's "no image" behavior (§6.1.13's stripe window, §6.2.3's hatch window, §6.3.3's plain space) is itself responsive and needs no separate breakpoint handling.
- **Minimum font size** is 0.875rem (14px) at any breakpoint, per each world's type scale.
- **Testing matrix.** For each world, verify the full section list at 360, 768 and 1280px (matching the Phase 0 baseline screenshot widths) before that world's checkpoint in §9.5.

---

## 11. Accessibility requirements

These are release gates (§0.2 rule 6), not aspirational. They apply to all three worlds equally; each world's own accessibility subsection (§6.1.13, §6.2.13, §6.3.14) adds world-specific detail on top of this shared baseline.

### 11.1 Standard

Target **WCAG 2.2 Level AA**. Where a world's motion or interaction choice is more restrictive than AA requires (for example, the reduced-motion behavior below), keep the stricter behavior.

### 11.2 Structure

- Exactly one `<h1>` per page, on the hero's name.
- Headings descend logically with no skipped levels; section titles are `<h2>`, sub-elements (a project title within Projects, an experience title within Experience) are `<h3>`.
- Landmarks: `<header>`, `<nav aria-label="…">` (each world's navigation gets a descriptive label, not just "Navigation" if there is more than one nav on the page), `<main>`, section `<section aria-labelledby="…">` tied to each heading's `id`, `<footer>`.
- A visually hidden "Skip to main content" link is the first focusable element on the page in every world, styled to become visible on focus, following each world's own visual language (a plate, a cell, a pill) rather than a generic browser-default box.
- Section IDs and anchors match the existing repo's IDs (§2.4); do not rename them for a world's own vocabulary (World 02's "sheets" and World 03's "zones" are visual concepts, not new anchor names).

### 11.3 Keyboard

- Every interactive element — nav links, the theme toggle, project links, "Read more" or expand controls, the copy-address button, the mobile navigation trigger — is reachable by `Tab` alone, in visual reading order, and operable with `Enter` or `Space` as appropriate.
- No keyboard trap. World 01's native `<dialog>` and World 03's native `popover` both return focus to their trigger on close and close on `Escape`, which the native elements provide for free; do not build a custom equivalent that loses this.
- Custom expand and disclosure controls (the "route list" rows in §6.1.7, the "Read more" toggles in §6.1.6/§6.2.6/§6.2.9) use a real `<button>` with `aria-expanded` reflecting state, not a `<div onClick>`.
- Focus is visible everywhere, including on saturated or dark grounds (§11.5).

### 11.4 Motion

- Every world implements `@media (prefers-reduced-motion: reduce)` exactly as specified in its own micro-interactions table (§6.1.11, §6.2.11, §6.3.11). In every case this means: no orchestrated moment (roll-sign, redline draw, first stroke), state changes happen instantly rather than eased, and any scroll-linked effect (World 03's line) is replaced with a static, fully drawn end state.
- No auto-playing motion loops anywhere in any world. The one orchestrated moment per world runs once and stops.
- Nothing flashes more than three times per second.

### 11.5 Color and contrast

- Text contrast: at least 4.5:1 for body and small text, 3:1 for large text (24px+/19px+ bold), verified with Appendix A for every token pair actually used, in **both** modes of every world.
- Non-text contrast: at least 3:1 for the boundary of an interactive control (World 01's plate borders, World 02's cell outlines, World 03's gauge marks) against its adjacent color, and for any graphic that conveys information (World 02's revision triangle, World 03's node rings).
- State is never conveyed by color alone: World 01 pairs color with a pressed-in shape change and `aria-current`; World 02 pairs color with an inverted ground and `aria-current`; World 03 pairs the current-node fill with `aria-current` and the gauge label.
- `prefers-contrast: more` and `forced-colors: active` are both tested; every world's borders remain visible under `forced-colors` (§6.1.13, §6.2.13, §6.3.14 note this per world).

### 11.6 Names and labels

- Every link whose visible text is generic in isolation ("Open", "Source code", "Read more") has an accessible name that includes the item it refers to, via `aria-label` or visually hidden text — for example `aria-label="Open DaloyAqua"`.
- The theme toggle's accessible name states the action, not the current state alone: "Switch to Blueprint" rather than just "Theme".
- Decorative-only SVGs (route plates' background pattern, the dimension line, the current, the stripe or hatch fallback windows) are `aria-hidden="true"` and `focusable="false"`.
- The copy-address control announces its result through a `role="status"` live region, not through a visual-only label swap.
- Images that exist in the repo's data use `alt` text drawn from the repo's own data if it has any (a project's title, for instance); if the repo has no descriptive text for an image, use the project or person's name rather than inventing a description of the image's visual content.

### 11.7 Testing checklist (run per world before its checkpoint in §9.5)

1. Automated audit (axe or Lighthouse accessibility) with zero critical or serious issues.
2. Keyboard-only pass through the entire page, every section, every interactive element.
3. `prefers-reduced-motion: reduce` pass: confirm every item in §11.4.
4. `forced-colors: active` pass: confirm borders and current-state indicators remain visible.
5. 320px width and 200% zoom pass: confirm §10.2's reflow rule.
6. Screen-reader spot check (VoiceOver or NVDA, whichever is available) of the hero, one navigation interaction, one expand or copy interaction, and the contact section.

---

## 12. Performance requirements

Release gates (§0.2 rule 6), measured per world against the Phase 0 baseline.

### 12.1 Core Web Vitals and Lighthouse

| Metric | Budget |
| --- | --- |
| Lighthouse Performance (mobile, throttled) | ≥ 90 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | Equal to or better than the Phase 0 baseline score |
| Largest Contentful Paint | < 2.5s |
| Interaction to Next Paint | < 200ms |
| Cumulative Layout Shift | < 0.1 |

### 12.2 Bundle and asset budgets

- **First Load JS** for the home route: no more than **+15 KB gzipped** above the Phase 0 baseline, per world. Each world's own spec states a tighter target for its own added client script (World 01 under 4 KB, World 02 under 3 KB, World 03 under 6 KB); the 15 KB figure is the hard ceiling that includes those plus any framework overhead.
- **Fonts:** each world's font budget is stated in its own accessibility and performance subsection (World 01 two files, no stated ceiling beyond "no required images"; World 02 at most 140 KB across four families; World 03 at most 60 KB for Fraunces and 30 KB for Hanken Grotesk). Subset to latin, self-host or use `next/font`, and set `font-display: swap` with matched fallback metrics (`size-adjust`, `ascent-override`) so a font swap does not itself cause CLS.
- **Images:** served through the repository's existing image pipeline at responsive `sizes`, modern formats where the pipeline already supports them, no image larger than its rendered size at 2x.
- **Zero new dependencies** by default (§4.6); any exception is measured and justified in the world report with its actual gzipped size.

### 12.3 Animation performance

- Only `transform`, `opacity`, `clip-path` and `stroke-dashoffset`/`stroke-dasharray` are animated, in every world, per each world's own motion table. None of these trigger layout or paint of surrounding content.
- At most one animation runs at a time per world's orchestrated moment; scroll-linked effects (World 03) read scroll position in a passive, rAF-throttled handler and never force layout (no `getBoundingClientRect` calls inside the scroll handler itself — geometry is precomputed, per §6.3.12 step 8).
- `will-change` is applied only to the element actually animating, and only for the duration it animates.

### 12.4 How to measure

Run Lighthouse (CLI or the browser's DevTools, whichever is available in the environment) against each world's home route on both baseline and world builds, and record the comparison table in that world's report. If Lighthouse is unavailable in the environment, run `<pm> run build` and report the First Load JS table from the build output as a substitute for the bundle-size portion of this section, and note that Core Web Vitals could not be measured directly.

---

## 13. Quality checklist

Run this checklist for each world before it is considered done (end of §9.5, before the report is written). A world is not complete until every row is checked or explicitly flagged as a recorded Deviation or `needs owner review` item (§4.3).

| # | Check |
| --- | --- |
| 1 | Every section in §4.1's list is present, in order, with the repo's existing IDs, or is omitted from page **and** nav **and** logged (§4.1). |
| 2 | No repo content was invented, rewritten, or paraphrased-and-presented-as-original (§0.2 rule 1, §2.5). |
| 3 | The world's signature element (§5.1) and its one orchestrated moment (§6.x.11) are implemented exactly as specified, or the deviation is recorded. |
| 4 | No item from the §4.2 banned-defaults table appears anywhere in this world. |
| 5 | No item from this world's own anti-goals list (§6.1.14, §6.2.14, §6.3.15) appears. |
| 6 | All ten sparse-data and stress-test cases (§2.6) were run against this world and look intentional; screenshots are in the report. |
| 7 | Both theme modes work, the toggle re-skins correctly, and the existing persistence mechanism is untouched. |
| 8 | Responsive behavior at 360, 768 and 1280px matches this world's own responsive table (§6.1.12, §6.2.12, §6.3.13) and §10's shared rules. |
| 9 | Every §11.7 accessibility test passes. |
| 10 | Every §12 performance budget is met, or the shortfall and its cause are recorded. |
| 11 | Zero new dependencies, or an exception justified per §4.6 and recorded. |
| 12 | Protected paths (§2.4) are unchanged; a diff against `portfolio/baseline` touches only presentational files. |
| 13 | Lint, typecheck and build pass with no new suppressions. |
| 14 | The world report is written and is this branch's final commit. |
| 15 | The §7.2 thumbnail test, run informally against the other two worlds' latest screenshots, suggests this world is still clearly distinct (formal confirmation happens in Phase 6). |

---

## 14. Final comparison criteria

### 14.1 What "done" looks like

Three branches, each independently runnable, each passing its own §13 checklist, plus `docs/worlds/COMPARISON.md` on `portfolio/baseline` containing the filled matrix (§7.1), the gate result (§7.2) run against real screenshots, and matched screenshots of all three worlds at 360, 768 and 1280px for every route.

### 14.2 How the owner should evaluate them

This is guidance for the comparison itself, not a rule AGY CLI enforces:

1. **The thumbnail test first** (§7.2), on the real screenshots — the fastest check of whether the exploration succeeded at its primary goal.
2. **Read each world's report** for its signature element, its Deviations, and any `needs owner review` flags.
3. **Run each branch locally** (`<pm> install && <pm> run dev` on each world's worktree or checkout) and read it at phone width first, per Design goal 2 (§3): does the name, role, featured project and a way to make contact land within ten seconds?
4. **Check the honesty test** (§3.3): does the in-progress status of DaloyAqua, and the short experience section, feel like a deliberate part of the design in each world, rather than an apology?

### 14.3 What this exploration is not deciding

It does not pick a winner. AGY CLI's role ends at Phase 7 (§9.7): three complete, comparable worlds and a comparison document. Which world to keep, discard, or draw from is the owner's decision.

### 14.4 Possible outcomes, for context

Any of these is a legitimate result of this exploration, and none of them requires further instruction to this document to execute — they would be scoped as separate follow-up work once decided: adopt one world's branch as the new default by fast-forwarding or merging it into the repository's original branch; keep exploring by iterating further on one world; or take specific ideas from more than one world (for example, one world's navigation model with another's project layout) into a new, fourth branch built by hand rather than by this spec.

---

## Appendix A: Contrast verification methodology

Every color pair stated as a ratio in §6.1 through §6.3 was verified with the script below (standard WCAG relative-luminance contrast, the same algorithm used by browser DevTools and axe). Re-run it after **any** hex adjustment made under §4.3, in both modes of the affected world, before continuing implementation — do not eyeball contrast.

**`scripts/contrast.mjs`** (Node, no dependencies):

```javascript
import { readFileSync } from 'node:fs';

const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const parse = (hex) => {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map((x) => x + x).join('') : h;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
};
const lum = (hex) => { const [r, g, b] = parse(hex).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
export const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

const pairs = JSON.parse(readFileSync(process.argv[2], 'utf8'));
let fail = 0;
for (const p of pairs) {
  const r = ratio(p.fg, p.bg);
  const need = p.min ?? 4.5;
  const ok = r >= need;
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1  need ${need}  ${p.fg} on ${p.bg}  ${p.label ?? ''}`);
}
process.exit(fail ? 1 : 0);
```

**Usage.** Save a JSON array of `{ "label": "...", "fg": "#hex", "bg": "#hex", "min": 4.5 }` objects (`min` defaults to 4.5; pass `3` for large text or non-text UI components) and run `node scripts/contrast.mjs pairs.json`. A non-zero exit code means at least one pair failed. Build one `pairs.json` per world covering every token combination that world's spec actually uses (both modes), not just the ones listed as examples above — those are the pairs used to select the palettes, not necessarily an exhaustive list of every place a token is used in the built page.

**When a pair fails after an adjustment.** Darken or lighten the foreground first (keeps the palette's hue identity); only change the background if the foreground adjustment would break the token's role elsewhere. Re-run the full pairs file, not just the one pair, since adjusting one token can affect others that reference it (for example World 03's zone text tokens, which are shared across all six zones' light or dark grounds).

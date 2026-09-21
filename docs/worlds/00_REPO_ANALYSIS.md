# 00_REPO_ANALYSIS.md: Existing Repository Analysis

**Repository:** `zendrix-hub/cowboy-portfolio`  
**Inspected Date:** September 22, 2026  
**Analyst:** Antigravity CLI (Pair Programming Session A)  
**Status:** Complete — Binding for all visual world explorations

---

## 1. Git State

- **Starting Branch:** `theme/cowboy-story-scroll` (tracking `origin/theme/cowboy-story-scroll`)
- **Active Exploration Branch:** `portfolio/baseline` (cut directly from `theme/cowboy-story-scroll` at commit `ca48fd3`)
- **Current Commit:** `ca48fd3` — *feat(story): implement Option B full 5-chapter story scroll and dual experience mode switcher*
- **Remote:** `origin git@github.com:zendrix-hub/cowboy-portfolio.git` (fetch & push)
- **Status:** Clean working tree (except untracked exploration specification `PORTFOLIO_DESIGN_EXPLORATION.md`)
- **Recent Commit History:**
  - `ca48fd3` feat(story): implement Option B full 5-chapter story scroll and dual experience mode switcher
  - `e18cf9d` feat(story): implement Option A Little Cowboy CRT prologue with interactive audio and scanlines
  - `5a1085f` feat(layout): adopt cinematic scroll flow with floating CosmicNav and CosmicHero
  - `0950c9e` fix(constellation): resolve maximum update depth exceeded error with synchronous bailout and stable ref handling
  - `87b71a6` feat(milestone-1): implement dynamic constellation node registry, context, and components
  - `af99e46` docs(spec): record finalized technical specifications from grill-me interview
  - `049103a` docs: add theme experiments and branching protocol SOP
  - `e59c1d4` feat: initial commit of base portfolio with spotlight theme

---

## 2. Package Manager and Scripts

- **Lockfile:** `package-lock.json` present (`npm` ecosystem)
- **Selected Package Manager (`<pm>`):** `npm`
- **Node & npm Runtime:** Node.js `v20.20.2`, npm `10.8.2`
- **Scripts in `package.json`:**
  - `dev`: `next dev`
  - `build`: `next build`
  - `start`: `next start`
  - `lint`: `eslint`
- **Config Files:** No `.nvmrc`, no `engines` block in `package.json`.

---

## 3. Framework and Router

- **Next.js Version:** `16.3.4` (React `19.2.8`, React DOM `19.2.8`)
- **Router Architecture:** Next.js App Router (`app/` directory layout, no `pages/`, no `src/` wrapper)
- **Configuration (`next.config.ts`):**
  - Turbopack enabled by default in Next.js 16
  - Image formats: `["image/avif", "image/webp"]`
  - Remote image patterns: `https://avatars.githubusercontent.com`
  - Experimental options: `optimizePackageImports: ["lucide-react"]`
  - Security Headers:
    - Content-Security-Policy (CSP) enforcing strict script, style, image, font, and frame restrictions
    - Strict-Transport-Security (HSTS, max-age 63072000)
    - X-Content-Type-Options: `nosniff`
    - X-Frame-Options: `DENY`
    - Referrer-Policy: `strict-origin-when-cross-origin`
    - Permissions-Policy: camera, microphone, geolocation disabled

---

## 4. Tailwind

- **Version:** `tailwindcss` `^3.4.17` (Tailwind CSS v3, not v4)
- **Configuration File:** `tailwind.config.ts`
- **Dark Mode Strategy:** `darkMode: "class"` (toggled via `.dark` class on `<html>`)
- **Content Paths:** `./pages/**/*.{js,ts,jsx,tsx,mdx}`, `./components/**/*.{js,ts,jsx,tsx,mdx}`, `./app/**/*.{js,ts,jsx,tsx,mdx}`
- **Plugins:** `[]` (none)
- **CSS Entry (`app/globals.css`):**
  - Standard `@tailwind base; @tailwind components; @tailwind utilities;`
  - `:root` variables: `--background: #ffffff`, `--foreground: #09090b`, `--bg-page-radial`, `--blob-opacity: 0.09`, `--glass-shadow`, `--spotlight-color: rgba(6, 182, 212, 0.08)`
  - `.dark` variables: `--background: #09090b`, `--foreground: #f4f4f5`, `--bg-page-radial`, `--blob-opacity: 0.13`, `--glass-shadow`, `--spotlight-color: rgba(6, 182, 212, 0.14)`
  - Focus styles: `:focus-visible { outline: 2px solid #06b6d4; outline-offset: 2px; }`
  - Legacy theme classes: `.bg-blobs`, `.blob`, `.blob-1/2/3`, `.toast-slide-down`, `.crt-scanlines`, `.crt-flicker`

---

## 5. Theming

- **Library:** `next-themes` (`^0.4.6`)
- **Integration (`app/providers.tsx`):**
  ```tsx
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
    <NuqsAdapter>
      {children}
    </NuqsAdapter>
  </ThemeProvider>
  ```
- **Attribute:** `class` (applies `.dark` to `html`)
- **Default Theme:** `"dark"` (per-world default will vary per spec: W1 Day, W2 Print, W3 Surface)
- **Storage Key:** Standard `next-themes` key (`"theme"`) in `localStorage`
- **Flash-of-Wrong-Theme Handling:** Handled via inline script injected by `ThemeProvider`; `suppressHydrationWarning` applied to `<html>` and `<body>` in `app/layout.tsx`.
- **Toggle Component:** `components/layout/ThemeToggle.tsx` (button cycling light/dark).

---

## 6. Fonts and Icons

- **Font Strategy:** `next/font/google` in `app/layout.tsx`
  - `Geist`: variable `--font-geist-sans`, latin subset
  - `Geist_Mono`: variable `--font-geist-mono`, latin subset
- **Local Font Files:** None in `public/`.
- **Icons:**
  - Primary icon library: `lucide-react` (`^1.16.0`)
  - Inline custom SVGs: `components/ui/Icons.tsx` (`GithubIcon`, `LinkedinIcon`)

---

## 7. Animation and UI Libraries

- **Animation Framework:** `motion` (`^13.2.0`, modern Framer Motion)
  - Installed and actively used with `LazyMotion` and `domAnimation` in `ArchitectureFlow.tsx`, `Projects.tsx`, `FadeIn.tsx`, and `StaggerChildren.tsx`.
- **Command Palette:** `cmdk` (`^1.1.1`) used in `components/layout/CommandMenu.tsx`.
- **URL Query State:** `nuqs` (`^2.10.1`) wrapped in `NuqsAdapter`.
- **Class Utilities:** `clsx` (`^2.1.1`), `tailwind-merge` (`^3.6.0`).
- **Unused / Absent:** No Radix UI, Headless UI, shadcn CLI, GSAP, or Three.js/R3F installed.

---

## 8. Routes

The application is a single-page portfolio with auxiliary metadata and utility endpoints:

| Path | File | Type | Purpose |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | Static Page | Main single-page portfolio |
| `/_not-found` | `app/not-found.tsx` | Static Page | Custom 404 page |
| `/icon.svg` | `app/icon.svg` | Static Asset | Dynamic SVG favicon |
| `/apple-icon.svg` | `app/apple-icon.svg` | Static Asset | Apple touch icon |
| `/opengraph-image`| `app/opengraph-image.tsx` | Dynamic Route | Edge-generated OG preview image |
| `/robots.txt` | `app/robots.ts` | Static Route | Search engine crawl directives |
| `/sitemap.xml` | `app/sitemap.ts` | Static Route | XML sitemap |
| Server Action | `app/actions/contact.ts` | Server Action | Contact form validation (`zod`) & dispatch (`resend`) |

Error boundaries exist at `app/error.tsx` and `app/global-error.tsx`.

---

## 9. Components and Sections

### 9.1 Root Page Structure (`app/page.tsx`)

Inside providers (`SectionFocusProvider`, `ConstellationProvider`, `StoryModeProvider`):
1. `CosmicNav` (`components/layout/CosmicNav.tsx`) — Floating navigation pill HUD
2. `SpotlightGlow` (`components/ui/SpotlightGlow.tsx`) — Pointer tracking ambient glow
3. `CosmicHero` (`components/sections/CosmicHero.tsx`) — Hero header with portrait avatar, status badge, popover, tags, CTAs
4. `<main id="content">`:
   - `#prologue`: `EpochZeroPrologue` (`components/story/EpochZeroPrologue.tsx`) — Interactive retro CRT monitor widget
   - `#about`: `About` (`components/sections/About.tsx`) — Bio card and 3 architectural pillars
   - `#projects`: `Projects` (`components/sections/Projects.tsx`) — Project list with filter tabs and architecture modal
   - `#skills`: `Skills` (`components/sections/Skills.tsx`) — 5 skill category strips
   - `#experience`: `Experience` (`components/sections/Experience.tsx`) — 4 timeline cards
   - `#contact`: `Contact` (`components/sections/Contact.tsx`) — Form and direct communication channels
   - `Footer` (`components/layout/Footer.tsx`) — Copyright and stack notice

### 9.2 Layout Components (`app/layout.tsx`)
- `Navbar` (`components/layout/Navbar.tsx`) — Legacy mobile sticky top bar (`lg:hidden`)
- `CommandMenu` (`components/layout/CommandMenu.tsx`) — Global `⌘K` search modal

---

## 10. Content Sources

The repository currently organizes content as follows:

- **`data/social.ts` (TS module):**
  - `name`: `"Zendrix Bello Riva"`
  - `displayName`: `"Zendrix Riva"`
  - `role`: `"Software / Full-Stack Developer"`
  - `subrole`: `"Software Engineering Intern @ NEC Telecom Software (GDC)"`
  - `email`: `"rivazendrix@gmail.com"`
  - `academicEmail`: `"zendrix.riva@cit.edu"`
  - `phone`: `"0909 188 9602"`
  - `location`: `"Mandaue City, Cebu, Philippines"`
  - `tagline`: `"I build practical software systems, think carefully about architecture, and choose technology based on the problem rather than chasing trends."`
  - `github`: `"https://github.com/zendrix-hub"`
  - `linkedin`: `"https://www.linkedin.com/in/zendrix-riva/"`
  - `resumeUrl`: `"/resume.pdf"`

- **`data/projects.ts` (TS module):**
  Contains 4 detailed projects:
  1. `PlayIT` (Mobile, Featured: true, Status: "Flagship Engineering Thesis")
  2. `ReadHub` (Web, Featured: false, Status: "Completed")
  3. `DaloyAqua` (Backend, Featured: true, Status: "In Progress")
  4. `Gordon RamsAi` (AI / Full-Stack, Featured: false, Status: "Completed")

- **`data/skills.ts` (TS module):**
  Contains 5 categories:
  1. "Mobile Systems (Core Focus)"
  2. "Backend Engineering & APIs"
  3. "Web & Full-Stack"
  4. "Applied AI & Data"
  5. "DevOps, Tools & Verification"

- **`data/experience.ts` (TS module):**
  Contains 4 items:
  1. NEC Telecom Software Philippines, Inc. (Global Delivery Center) — Software Engineering Intern (Sept 2026 – Present)
  2. Cebu Institute of Technology – University (CIT-U) — BSIT (2023 – Jan 2027 Expected)
  3. AWS Academy & IBM SkillsBuild — Industry Cloud & AI Certifications (Verified)
  4. Independent Technical Growth — Disciplined Self-Directed Study (Multi-Year Habit)

- **Hard-Coded Content Inside JSX:**
  - **About Bio Text:** Hard-coded inside `components/sections/About.tsx` (lines 113–115):
    > *"I build software across mobile, backend, and full-stack environments, with a focus on clean architecture, reliability, and practical engineering. Currently interning at NEC Telecom Software Philippines while completing my final year in BSIT, I enjoy solving problems where thoughtful system design matters—from offline-first Android systems to robust backend services. I value disciplined iteration, clear structure, and software that works dependably in production."*
  - **Intro Summary:** Hard-coded inside `components/sections/CosmicHero.tsx` (lines 239–241):
    > *"Engineering offline-first Android systems, modular Spring Boot APIs, and grounded AI applications with clean architecture and production discipline."*
  - **Core Architectural Pillars:** Hard-coded inside `components/sections/About.tsx` (lines 10–62): Offline-First & Edge Systems, Stateless Backend Architecture, Grounded Applied AI.

---

## 11. Assets

Inspected contents in `public/` and root:
- **Identity Assets:**
  - `public/images/avatar.webp` (10 KB, 112×112 WebP portrait avatar)
  - `public/resume.pdf` (54 KB, current resume)
  - `public/RIVA_ZendrixB_BSIT_Resume.pdf` (54 KB, identical resume file)
  - `public/images/little-cowboy-v2.jpg` (219 KB, archival CRT photo)
  - `public/images/little-cowboy-v1.jpg` (338 KB)
  - `public/Riva_ID.png` (2.6 MB, raw student ID scan)
  - `public/og-preview.png` (122 KB, OpenGraph social card)
  - `public/icon.svg`, `app/icon.svg`, `app/apple-icon.svg`, `app/favicon.ico`
- **Project Assets:**
  - None of the 4 projects have dedicated screenshots stored in `public/`.

---

## 12. Quality Tooling

- **Linter:** ESLint v9 flat config (`eslint.config.mjs`) using `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- **TypeScript:** Strict configuration in `tsconfig.json` (`"strict": true`, `"target": "ES2017"`, `"moduleResolution": "bundler"`).
- **Test Suites:** No automated test runner (no Jest, Vitest, Playwright, or Cypress in `package.json`).
- **Code Formatter:** No Prettier configuration or `.prettierrc` file.
- **CI Workflows:** No `.github/workflows/` directory in repository.
- **Hosting / Deploy:** Vercel configuration inferred via `@vercel/analytics` and `@vercel/speed-insights`.

---

## 13. Agent Instruction Files

- **`AGENTS.md`:** Warns that Next.js 16 has breaking changes compared to earlier versions.
- **`CLAUDE.md`:** References `@AGENTS.md`.
- **`README.md`:** Default Next.js boilerplate documentation.
- **`THEME_EXPERIMENTS.md`:** Historical documentation of earlier exploratory branches (`theme/universe-constellation`, `theme/cowboy-story-scroll`).
- **`IMPROVEMENTS.md`:** Historical engineering log of earlier portfolio optimizations.

---

## 14. Baseline Health

Executed on Ubuntu Linux (Node v20.20.2):

1. **`npm run lint`:**
   - **Result:** **PASS** (Exit code 0, 0 errors, 0 warnings).
2. **`npx tsc --noEmit`:**
   - **Result:** **PASS** (Exit code 0, 0 type errors).
3. **`npm run build` (`next build`):**
   - **Result:** **PASS** (Exit code 0, built successfully with Turbopack in 12.5s).
   - **Route Manifest:**
     ```text
     Route (app)
     ┌ ○ /
     ├ ○ /_not-found
     ├ ○ /icon.svg
     ├ ○ /opengraph-image
     ├ ○ /robots.txt
     └ ○ /sitemap.xml
     ```

---

## 15. Baseline Screenshots

- **Status:** Headless browsers (`chromium`, `google-chrome`, `playwright`) are **not** pre-installed in the Linux CLI environment PATH.
- **Action:** Per §2.3 item 15, captured as a **manual TODO**. No browser was installed without owner approval.

---

## 16. Synthesis and Architectural Decisions

### 16.1 What Already Works and Must Be Preserved
- **Data-Driven Architecture:** Project, skill, experience, and social data modules in `data/`.
- **Dark Mode Persistence:** `next-themes` provider with `class` attribute and `suppressHydrationWarning`.
- **SEO & Structured Metadata:** Complete OpenGraph tags, JSON-LD ProfilePage schema, dynamic OG image, sitemap, and robots.
- **Security Posture:** Comprehensive CSP and security response headers in `next.config.ts`.
- **Core User Actions:** Direct `mailto:` contact link, copy-to-clipboard button with visual feedback, and downloadable resume.
- **Accessibility Baselines:** Native `<a href="#content">Skip to content</a>` link and semantic landmarks.

### 16.2 What is Weak Visually
- **Banned Defaults Present:** Heavy use of neon cyan/sky glows, floating blurred background blobs (`.bg-blobs`), and generic rounded glassmorphism cards that mask the developer's authentic voice.
- **Competing Navigation Controls:** `Navbar.tsx` (mobile hamburger header) and `CosmicNav.tsx` (floating HUD pill) are rendered simultaneously, causing visual and interaction redundancy.
- **Distracting Thematic Widgets:** The CRT monitor prologue simulation (`EpochZeroPrologue`) and constellation graph concepts overshadow the primary goal: presenting Zendrix Riva's engineering capabilities and projects clearly within 10 seconds.
- **Lack of Distinct Identity:** The current presentation relies on standard dark-mode "tech portfolio" tropes rather than a confident, cohesive design concept.

### 16.3 Which Components Will Need Replacing in Each World
- **Navigation:** Both `Navbar` and `CosmicNav` will be replaced in each world by its dedicated navigation system (W1: Route Plates + Dialog; W2: Sheet Index Rail / Strip; W3: Depth Gauge).
- **Hero:** `CosmicHero` and `Hero` will be replaced by world-specific heroes (W1: Destination Board; W2: Cover Sheet with Title Block; W3: Surface Zone with Drawn Line).
- **Section Layouts:** `About`, `Projects`, `Skills`, `Experience`, and `Contact` will be replaced with world-specific components adhering strictly to the respective world's layout, container, and typographic rules.
- **Thematic Clutter:** `EpochZeroPrologue`, `SpotlightGlow`, `StoryModeToggle`, `StoryModeContext`, and `ConstellationNode` will be cleanly eliminated from the visual worlds.

### 16.4 Content Extraction Decision (Phase 1 Requirement)
- **Finding:** Phase 0 discovered that the **About bio text** (`"I build software across mobile, backend, and full-stack environments..."`) and the **Hero intro sentence** (`"Engineering offline-first Android systems, modular Spring Boot APIs..."`) are currently **hard-coded inside JSX** (`components/sections/About.tsx` and `components/sections/CosmicHero.tsx`) rather than exported from `data/social.ts`.
- **Decision:** **Phase 1 IS REQUIRED.** The hard-coded About and Intro text must be extracted into `data/social.ts` (adding `about` and `intro` fields) without altering values, so all three sibling worlds can consume identical data sources.

---

## 17. Protected Paths Verification

The following paths are confirmed protected per §2.4:
- `data/social.ts`
- `data/projects.ts`
- `data/skills.ts`
- `data/experience.ts`
- `next.config.ts`
- `package.json`, `package-lock.json`
- `tsconfig.json`
- `app/layout.tsx` (metadata, viewport, JSON-LD)
- `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx`
- `public/images/avatar.webp`, `public/resume.pdf`, `public/icon.svg`
- Section IDs: `#about`, `#projects`, `#skills`, `#experience`, `#contact`

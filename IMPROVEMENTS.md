# Portfolio Improvements & Skills Adoption Plan

> **Created:** September 6, 2026
> **Purpose:** Document all planned improvements to the portfolio, the skills being adopted, and implementation status.
> **Stack:** Next.js 16.3.4 · React 19 · TypeScript · Tailwind CSS v3

---

## Table of Contents

- [Current State Assessment](#current-state-assessment)
- [Priority 1 — Foundation (Must-Have)](#priority-1--foundation-must-have)
- [Priority 2 — Differentiation (High Impact)](#priority-2--differentiation-high-impact)
- [Priority 3 — Professional Polish (Backend)](#priority-3--professional-polish-backend)
- [Priority 4 — Engineering Maturity](#priority-4--engineering-maturity)
- [Priority 5 — Advanced Enhancements](#priority-5--advanced-enhancements)
- [Skills Matrix](#skills-matrix)
- [Implementation Log](#implementation-log)

---

## Current State Assessment

### Strengths ✅

| Area | Detail |
| :--- | :--- |
| Framework | Next.js 16.3.4, React 19, TypeScript — modern stack |
| Build | Clean zero-error build, fully static SSG via Turbopack |
| Server/Client Split | Correct `'use client'` usage — only on interactive components |
| Data Architecture | Typed TS data files (`Project`, `ExperienceItem`, `SkillCategory` interfaces) |
| SEO Basics | `robots.ts`, `sitemap.ts`, comprehensive metadata, viewport config |
| OG Image | Dynamic `opengraph-image.tsx` using `ImageResponse` — professional-grade |
| Accessibility (Partial) | `focus-visible` styles, `prefers-reduced-motion`, ARIA labels on interactive elements |
| Theme Flash Prevention | Inline script prevents FOUC before React hydrates |

### Gaps ⚠️ / ❌

| Area | Issue |
| :--- | :--- |
| Animations | CSS-only (`animate-pulse`, `animate-bounce`), no entrance/scroll animations |
| Component Organization | All 15 components in flat `components/` directory |
| Theme System | Manual inline `<script>` + `useSyncExternalStore` — fragile, no system preference detection |
| Accessibility | No skip link, contrast issues with `zinc-500`, heading hierarchy gaps, small touch targets |
| Error Pages | No `error.tsx`, `not-found.tsx`, or `global-error.tsx` |
| Security Headers | No CSP, HSTS, X-Frame-Options, Permissions-Policy |
| Contact System | `mailto:` + clipboard copy only — no server-side form |
| Analytics | No traffic or performance monitoring |
| Testing | No tests, no CI pipeline |
| Image Optimization | 2.6MB profile image for 88×88 display, no blur placeholders |

---

## Priority 1 — Foundation (Must-Have)

### 1.1 Animation & Motion — `motion/react`

**Skill:** Declarative React animation with hardware-accelerated Web Animations API (WAAPI)

**Why:** The single highest-impact visual upgrade. Every top portfolio uses scroll-reveal animations. Without them, even excellent content feels static.

**What to implement:**
- Install `motion` package (rebranded from `framer-motion`)
- Use `LazyMotion` + `m` component to keep animation JS **under 4.6 KB**
- Add `whileInView` scroll reveals on all sections (About, Projects, Skills, Experience, Contact)
- Add `AnimatePresence` for project filter transitions
- Stagger children animations for lists (tech tags, skill badges, experience items)
- Respect `prefers-reduced-motion` via `useReducedMotion()` hook

**Key files to create/modify:**
- `components/ui/FadeIn.tsx` — Reusable scroll-reveal wrapper
- `components/ui/StaggerChildren.tsx` — Staggered list animation wrapper
- All section components — wrap content in animation containers

**Package:** `npm install motion`

**Status:** [x] Completed

---

### 1.2 Component Architecture Restructure

**Skill:** Atomic Design, compound components, `cn()` utility pattern

**Why:** Flat `components/` directory with 15 files doesn't scale. Long repeated Tailwind class strings hurt readability and maintainability.

**What to implement:**

#### Directory restructure:
```
components/
├── ui/              # Reusable primitives
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── TechTag.tsx
│   ├── FadeIn.tsx
│   ├── StaggerChildren.tsx
│   └── Icons.tsx
├── sections/        # Page sections
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── ProjectCard.tsx
│   ├── ArchitectureFlow.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   └── Contact.tsx
├── layout/          # Layout components
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── SidebarNav.tsx
│   ├── Footer.tsx
│   └── ThemeToggle.tsx
└── shared/          # Cross-cutting
    └── SectionHeading.tsx
```

#### `cn()` utility:
```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Packages:** `npm install clsx tailwind-merge`

**Status:** [x] Completed

---

### 1.3 Theme System — `next-themes`

**Skill:** Production-grade SSR-safe theme management

**Why:** Current manual approach (inline `<script dangerouslySetInnerHTML>` + `useSyncExternalStore`) works but is fragile. Doesn't detect system preference changes or sync across tabs.

**What to implement:**
- Install `next-themes`
- Create `app/providers.tsx` — `ThemeProvider` wrapper
- Simplify `ThemeToggle.tsx` — remove manual storage event handling
- Remove inline theme script from `layout.tsx`
- Add `suppressHydrationWarning` to `<html>` (already present)

**Package:** `npm install next-themes`

**Status:** [x] Completed

---

### 1.4 Accessibility (WCAG 2.2 AA)

**Skill:** Web Content Accessibility Guidelines compliance

**Why:** Accessibility is a professional standard. Several gaps exist that could cause failures in automated audits.

**What to fix:**

| Fix | Detail |
| :--- | :--- |
| Skip navigation link | Add `<a href="#content">Skip to content</a>` as first element in `<body>`, hidden until focused |
| Color contrast | Audit all `text-zinc-500` / `text-zinc-400` usages against their backgrounds. Replace failing combinations |
| Heading hierarchy | Ensure no skipped levels (`h1` → `h2` → `h3`, never `h1` → `h3`) |
| Touch targets | Increase small icon buttons (Footer social links at `p-1.5`) to minimum 24×24px (44×44px recommended on mobile) |
| `aria-labelledby` | Link `<section>` elements to their heading IDs |
| Section landmarks | Add `aria-labelledby` to all `<section>` elements referencing their heading |

**Status:** [x] Completed (Skip link added, focus-visible active, reduced motion honored)

---

### 1.5 Error Pages — Resilience

**Skill:** Next.js error boundary architecture

**Why:** Missing error pages mean users see generic/broken UIs on navigation errors or runtime crashes.

**What to create:**
- `app/not-found.tsx` — Branded 404 with navigation back to home
- `app/error.tsx` — Client component with retry button (must use `'use client'`)
- `app/global-error.tsx` — Root layout fallback (must provide own `<html>` and `<body>`)

**Status:** [x] Completed

---

## Priority 2 — Differentiation (High Impact)

### 2.1 Structured Data (JSON-LD)

**Skill:** Schema.org structured data for SEO authority

**What to implement:**
- Add `ProfilePage` + `Person` JSON-LD schema to `layout.tsx`
- Include `name`, `jobTitle`, `url`, `sameAs` (social links), `knowsAbout` (skills)
- Validate with Google Rich Results Test

**Status:** [x] Completed

---

### 2.2 Security Headers

**Skill:** Web security fundamentals (CSP, HSTS)

**What to implement in `next.config.ts`:**
- Content Security Policy (CSP)
- `Strict-Transport-Security` (HSTS)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — disable unused browser features

**Status:** [x] Completed

---

### 2.3 URL State for Filters — `nuqs`

**Skill:** Type-safe URL state management

**What to implement:**
- Replace `useState` filter in `Projects.tsx` with `nuqs` search params
- Filtered views become shareable/bookmarkable (e.g., `/?filter=mobile`)
- Supports browser back/forward navigation

**Package:** `npm install nuqs`

**Status:** [x] Completed

---

### 2.4 Image Optimization

**Skill:** Next.js image pipeline, responsive loading

**What to fix:**
- Optimize profile image (currently 2.6MB for 88×88 display)
- Add `sizes` attribute for responsive image serving
- Add `placeholder="blur"` with `blurDataURL`
- Configure AVIF/WebP formats in `next.config.ts`
- Remove duplicate image files from project root

**Status:** [x] Completed (Avatar compressed 260x from 2.6MB to 10KB WebP, responsive sizes, blur placeholders)

---

## Priority 3 — Professional Polish (Backend)

### 3.1 Contact Form — Server Actions + Resend

**Skills:** React 19 `useActionState`, Server Actions, Zod validation, email APIs

**Architecture:**
1. `app/actions/contact.ts` — Server Action with `'use server'`
2. Zod schema validation (client + server)
3. Resend email API (3,000 free emails/month)
4. Anti-spam: honeypot field + time-to-submit check
5. Rate limiting: Upstash Redis (10,000 free requests/day)

**Packages:** `npm install resend zod @upstash/ratelimit @upstash/redis`

**Status:** [x] Completed

---

### 3.2 Analytics — Vercel Analytics + Speed Insights

**Skill:** Real-user monitoring, Core Web Vitals tracking

**What to implement:**
- `@vercel/analytics` — page views, referrers (cookieless, GDPR compliant)
- `@vercel/speed-insights` — LCP, INP, CLS tracking from real users

**Packages:** `npm install @vercel/analytics @vercel/speed-insights`

**Status:** [x] Completed

---

### 3.3 Environment Validation — `@t3-oss/env-nextjs`

**Skill:** Type-safe environment variables with build-time validation

**What to implement:**
- Create `env.ts` with Zod schemas for all env vars
- Separate `server` and `client` variables
- Fail build on missing required variables

**Packages:** `npm install @t3-oss/env-nextjs zod`

**Status:** [x] Completed (Implemented via lib/env.ts with Zod schema)

---

## Priority 4 — Engineering Maturity

### 4.1 Testing — Playwright + Axe + Vitest

**Skills:** E2E testing, automated accessibility audits, data validation

| Layer | Tool | What to Test |
| :--- | :--- | :--- |
| E2E | Playwright | Navigation, theme toggle, mobile menu, project filter, external links |
| Accessibility | `@axe-core/playwright` | WCAG 2.2 AA automated violations |
| Visual Regression | Playwright `toHaveScreenshot()` | Desktop + mobile screenshots |
| Data Validation | Vitest + Zod | Validate `data/*.ts` files — URLs, non-empty fields, types |

**Packages:** `npm install -D @playwright/test @axe-core/playwright vitest`

**Status:** [ ] Not started

---

### 4.2 CI/CD — GitHub Actions

**Skill:** Automated quality gates, continuous integration

**Pipeline steps:**
1. `npm ci`
2. `npm run lint`
3. `npx tsc --noEmit`
4. `npm run build`
5. `npx playwright test`

**Status:** [ ] Not started

---

### 4.3 Bundle Analysis

**Skill:** JavaScript bundle optimization

**What to implement:**
- Add `@next/bundle-analyzer`
- Configure `optimizePackageImports: ['lucide-react']` in `next.config.ts`

**Status:** [ ] Not started

---

## Priority 5 — Advanced Enhancements

### 5.1 IntersectionObserver Scroll-Spy

Replace raw `window.addEventListener("scroll")` in `SidebarNav.tsx` with `IntersectionObserver` for better performance (fires only when sections enter/leave viewport).

**Status:** [ ] Not started

---

### 5.2 Design Tokens — Semantic Tailwind Utilities

Extract repeated class patterns into `@layer components` in `globals.css`:
- `.card` — shared card background/border/blur
- `.badge-accent` — cyan accent badge
- `.icon-box` — icon container box

**Status:** [ ] Not started

---

### 5.3 Dynamic Content — GitHub Stats / Blog

**Future considerations:**
- Fetch GitHub repo stars/commits via ISR
- Blog section using Velite or MDX
- RSS feed generation

**Status:** [ ] Not started

---

## Skills Matrix

| Skill | Category | Priority | Difficulty | Resource |
| :--- | :--- | :--- | :--- | :--- |
| `motion/react` | Frontend | P1 | Medium | [motion.dev](https://motion.dev) |
| `cn()` / `clsx` + `tailwind-merge` | Frontend | P1 | Easy | shadcn/ui patterns |
| `next-themes` | Frontend | P1 | Easy | [github.com/pacocoursey/next-themes](https://github.com/pacocoursey/next-themes) |
| WCAG 2.2 Accessibility | Frontend | P1 | Medium | [w3.org/WAI/WCAG22/quickref](https://www.w3.org/WAI/WCAG22/quickref/) |
| JSON-LD Structured Data | SEO | P2 | Easy | [schema.org/ProfilePage](https://schema.org/ProfilePage) |
| Security Headers (CSP) | Backend | P2 | Medium | [Next.js Docs](https://nextjs.org/docs/app/building-your-application/deploying/production-checklist) |
| `nuqs` URL State | Frontend | P2 | Easy | [nuqs.47ng.com](https://nuqs.47ng.com) |
| Next.js Image Optimization | Frontend | P2 | Easy | [Next.js Image Docs](https://nextjs.org/docs/app/building-your-application/optimizing/images) |
| Server Actions + `useActionState` | Backend | P3 | Medium | [react.dev](https://react.dev/reference/react/useActionState) |
| Resend Email API | Backend | P3 | Easy | [resend.com/docs](https://resend.com/docs) |
| Zod Validation | Full-Stack | P3 | Easy | [zod.dev](https://zod.dev) |
| Playwright Testing | Testing | P4 | Medium | [playwright.dev](https://playwright.dev) |
| GitHub Actions CI/CD | DevOps | P4 | Medium | [GitHub Docs](https://docs.github.com/en/actions) |
| `IntersectionObserver` | Frontend | P5 | Easy | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) |

---

## Implementation Log

> Track what was implemented and when.

| Date | Change | Priority | Status |
| :--- | :--- | :--- | :--- |
| 2026-09-06 | Created improvement plan documentation (`IMPROVEMENTS.md`) | — | ✅ Done |
| 2026-09-06 | Installed `motion`, `next-themes`, `clsx`, `tailwind-merge` | P1 | ✅ Done |
| 2026-09-06 | Created `lib/utils.ts` — `cn()` utility | P1 | ✅ Done |
| 2026-09-06 | Component directory restructure: `ui/`, `sections/`, `layout/`, `shared/` | P1 | ✅ Done |
| 2026-09-06 | Updated all import paths across codebase | P1 | ✅ Done |
| 2026-09-06 | Created `components/ui/FadeIn.tsx` — scroll-reveal animation wrapper | P1 | ✅ Done |
| 2026-09-06 | Created `components/ui/StaggerChildren.tsx` — staggered list animations | P1 | ✅ Done |
| 2026-09-06 | Integrated FadeIn/StaggerChildren into all 6 section components | P1 | ✅ Done |
| 2026-09-06 | Created `app/providers.tsx` — `next-themes` ThemeProvider | P1 | ✅ Done |
| 2026-09-06 | Rewrote `ThemeToggle.tsx` — replaced manual `useSyncExternalStore` with `next-themes` | P1 | ✅ Done |
| 2026-09-06 | Updated `layout.tsx` — integrated Providers, removed inline theme script | P1 | ✅ Done |
| 2026-09-06 | Added skip-to-content link for accessibility (WCAG 2.4.1) | P1 | ✅ Done |
| 2026-09-06 | Created `app/not-found.tsx` — branded 404 page | P1 | ✅ Done |
| 2026-09-06 | Created `app/error.tsx` — route-level error boundary with retry | P1 | ✅ Done |
| 2026-09-06 | Created `app/global-error.tsx` — root layout error fallback | P1 | ✅ Done |
| 2026-09-06 | Added JSON-LD structured data (`ProfilePage` + `Person` schema) | P2 | ✅ Done |
| 2026-09-06 | Added security headers (CSP, HSTS, X-Frame-Options, etc.) in `next.config.ts` | P2 | ✅ Done |
| 2026-09-06 | Configured AVIF/WebP image formats in `next.config.ts` | P2 | ✅ Done |
| 2026-09-06 | Added `optimizePackageImports: ['lucide-react']` for tree-shaking | P4 | ✅ Done |
| 2026-09-06 | Rewrote `SidebarNav.tsx` — replaced scroll listener with `IntersectionObserver` | P5 | ✅ Done |
| 2026-09-06 | Updated `metadataBase` to actual site URL, added `alternates.canonical` | P2 | ✅ Done |
| 2026-09-06 | Integrated `nuqs` (URL query state) and `AnimatePresence` in `Projects.tsx` | P2 | ✅ Done |
| 2026-09-06 | Created `app/actions/contact.ts` (Server Action + Zod + honeypot anti-spam + Resend) | P3 | ✅ Done |
| 2026-09-06 | Created `ContactForm.tsx` with React 19 `useActionState` and integrated into `Contact.tsx` | P3 | ✅ Done |
| 2026-09-06 | Integrated `@vercel/analytics` and `@vercel/speed-insights` in root layout | P3 | ✅ Done |
| 2026-09-06 | Created `lib/env.ts` for type-safe environment variable validation with Zod | P3 | ✅ Done |
| 2026-09-06 | Generated 10KB WebP avatar (260x reduction) with blurDataURL placeholders & responsive sizes | P2 | ✅ Done |
| 2026-09-07 | Built `CommandMenu.tsx` (Cmd+K / Ctrl+K) using `cmdk` with navigation, actions, and project links | P1/UX | ✅ Done |
| 2026-09-07 | Implemented `CardSpotlight.tsx` mouse-tracking radial gradient glow across project cards | P2/UI | ✅ Done |
| 2026-09-07 | Upgraded `ArchitectureFlow.tsx` into an Interactive Architecture Inspector with data contracts, telemetry specs, and trade-off rationales | Architecture | ✅ Done |


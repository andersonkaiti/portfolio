# SEO Overhaul — Design Spec

**Date:** 2026-04-16
**Goal:** Move portfolio from #2 to #1 on Google for "Anderson Kaiti" by fixing structural SEO gaps and enriching authority signals.

---

## Context

The portfolio at `https://www.andersonkaiti.com` already has a reasonable SEO foundation:

- `robots.ts`, `sitemap.ts`, `opengraph-image.tsx` exist
- JSON-LD with `Person` + `WebSite` schema in `layout.tsx`
- Google Search Console verification tag
- Name present in `<h1>`, About section, Footer, and social aria-labels

The main competitor for position #1 is likely the LinkedIn or GitHub profile. To outrank them, the site needs stronger entity signals and a clean heading structure.

---

## Changes

### 1. Metadata — `src/app/layout.tsx`

**Title:** `'Portfolio - Anderson Kaiti'` → `'Anderson Kaiti | Full-Stack Developer'`

- Name first so branded searches match immediately
- Under 60 characters to avoid truncation

**Description:** `'Computer Scientist and Full-Stack Developer'` → `'Anderson Kaiti é um Full-Stack Developer formado em Ciência da Computação, especializado em React, Next.js, Node.js e TypeScript. Disponível para novas oportunidades.'`

- Starts with the name for keyword prominence
- ~160 characters

**Twitter:** same title/description updates; no `creator` tag (no Twitter account).

---

### 2. JSON-LD Enrichment — `src/app/layout.tsx`

Add to the `Person` schema:

- `givenName: 'Anderson'`
- `familyName: 'Kaiti'`
- `email: 'mailto:anderkaiti@gmail.com'`
- `description` — one-sentence summary
- `alumniOf` — UNISAGRADO, Computer Science, 2022–2025
- `worksFor` — Solid Tech (current employer)

These fields help Google confirm the entity is a real person and associate the site with the name unambiguously.

---

### 3. Heading Hierarchy — `src/components/ui/section.tsx`

**Problem:** `SectionLabel` and `SectionTitle` both render `<h1>`, producing 10+ `<h1>` elements on the home page. Google expects exactly one `<h1>` per page.

**Fix:**

| Component | Current | Target | Rationale |
| --- | --- | --- | --- |
| `SectionLabel` | `<h1>` | `<p>` | Decorative category tag, not a real heading |
| `SectionTitle` | `<h1>` | `<h2>` | Actual section heading |
| `SectionSubtitle` | `<h4>` | `<p>` | Descriptive text, not a heading |

Result: one `<h1>` ("Hi, I'm Anderson Kaiti") + one `<h2>` per section.

---

### 4. Projects Page Metadata — `src/app/projects/page.tsx`

Add `export const metadata: Metadata`:

- `title: 'Anderson Kaiti | Projects'`
- `description: "Explore Anderson Kaiti's open-source projects built with React, Next.js, Node.js, TypeScript, and more."`
- `alternates.canonical: 'https://andersonkaiti.com/projects'`

---

### 5. Sitemap — `src/app/sitemap.ts`

Change `lastModified: new Date('2025-01-01')` → `new Date()` for both entries.
Tells Google the content is current.

---

### 6. Footer Aria-Labels — `src/components/footer.tsx`

| Before | After |
| --- | --- |
| `"GitHub"` | `"Anderson Kaiti's GitHub profile"` |
| `"LinkedIn"` | `"Connect with Anderson Kaiti on LinkedIn"` |
| `"Email"` | `"Send email to Anderson Kaiti"` |

Reinforces name association in accessible markup (also read by crawlers).

---

### 7. Font Deduplication — shared module

`JetBrains_Mono` is instantiated in three files:

- `src/components/ui/section.tsx`
- `src/app/_components/sections/education/index.tsx`
- `src/components/footer.tsx`

Extract to `src/lib/fonts.ts` and import from there. Prevents the browser from issuing duplicate font requests and reduces bundle size.

---

## Out of Scope

- Performance profiling (SpeedInsights + Vercel Analytics already in place)
- Image alt text changes (tech icons use `alt={tech.name}`, topic logos use `alt={topic}` — correct)
- BreadcrumbList schema for `/projects` (low priority, can be added later)
- Backlink strategy (off-site, not code)

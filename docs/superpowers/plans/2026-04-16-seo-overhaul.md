# SEO Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all structural SEO gaps in the portfolio to maximize ranking signal for "Anderson Kaiti" on Google.

**Architecture:** Seven independent changes across six files — heading hierarchy fix, metadata enrichment, JSON-LD enrichment, projects page metadata, sitemap update, footer aria-labels, and font deduplication. No new dependencies required.

**Tech Stack:** Next.js 15 App Router, TypeScript, `next/font/google`, `schema.org` JSON-LD, Biome (formatter)

**Spec:** `docs/superpowers/specs/2026-04-16-seo-overhaul-design.md`

---

## File Map

| File | Action | What changes |
| --- | --- | --- |
| `src/lib/fonts.ts` | **Create** | Shared `JetBrains_Mono` font instance |
| `src/components/ui/section.tsx` | **Modify** | `SectionLabel` h1→p, `SectionTitle` h1→h2, `SectionSubtitle` h4→p; import font from shared module |
| `src/app/_components/sections/education/index.tsx` | **Modify** | Import `jetBrainsMono` from shared module instead of local instantiation |
| `src/components/footer.tsx` | **Modify** | Import font from shared module; update aria-labels |
| `src/app/layout.tsx` | **Modify** | title, description, twitter, JSON-LD enrichment |
| `src/app/projects/page.tsx` | **Modify** | Add `export const metadata` |
| `src/app/sitemap.ts` | **Modify** | `lastModified` → `new Date()` |

---

## Task 1: Create shared fonts module

**Files:**

- Create: `src/lib/fonts.ts`

- [ ] **Step 1: Create the file**

```ts
import { JetBrains_Mono } from 'next/font/google'

export const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
})
```

> The `variable` name consolidates the three different names used across the three existing instantiations (`--font-jet-brains-mono`, `--font-jetbrains-mono`). Pick the cleaner one: `--font-jetbrains-mono`.

- [ ] **Step 2: Commit**

```bash
git add src/lib/fonts.ts
git commit -m "♻️ refactor(fonts): extract JetBrains_Mono to shared lib/fonts module"
```

---

## Task 2: Fix heading hierarchy in `section.tsx`

**Files:**

- Modify: `src/components/ui/section.tsx`

**Current state:** `SectionLabel` → `<h1>`, `SectionTitle` → `<h1>`, `SectionSubtitle` → `<h4>`.
**Target:** `SectionLabel` → `<p>`, `SectionTitle` → `<h2>`, `SectionSubtitle` → `<p>`.

- [ ] **Step 1: Replace the file contents**

```tsx
import { cn } from '@lib/utils'
import type { HTMLAttributes } from 'react'
import { jetBrainsMono } from '@lib/fonts'

export function SectionContainer({
  children,
  ...props
}: { children: React.ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <section className="w-full space-y-4 px-6 md:space-y-8" {...props}>
      {children}
    </section>
  )
}

export function SectionHeader({
  children,
  ...rest
}: { children: React.ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <header className="space-y-4 mb-8 text-center" {...rest}>
      {children}
    </header>
  )
}

export function SectionLabel({
  children,
  ...rest
}: { children: React.ReactNode } & HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'scroll-m-20 text-balance font-semibold tracking-wide uppercase text-primary text-sm md:text-base',
        jetBrainsMono.className,
      )}
      {...rest}
    >
      {children}
    </p>
  )
}

export function SectionTitle({
  children,
  ...rest
}: { children: React.ReactNode } & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className="scroll-m-20 text-balance text-3xl font-semibold md:text-5xl"
      {...rest}
    >
      {children}
    </h2>
  )
}

export function SectionSubtitle({
  children,
  ...rest
}: { children: React.ReactNode } & HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className="text-balance leading-7 text-muted-foreground" {...rest}>
      {children}
    </p>
  )
}
```

- [ ] **Step 2: Run formatter**

```bash
pnpm format
```

Expected: no errors (Biome formats the file).

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/section.tsx src/lib/fonts.ts
git commit -m "♻️ refactor(section): fix heading hierarchy — SectionLabel→p, SectionTitle→h2, SectionSubtitle→p"
```

---

## Task 3: Remove local `JetBrains_Mono` instantiation from `education/index.tsx`

**Files:**

- Modify: `src/app/_components/sections/education/index.tsx`

The file currently instantiates its own `JetBrains_Mono`. Replace with the shared import.

- [ ] **Step 1: Replace the font instantiation and rename usages**

Remove lines:

```ts
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})
```

Add import:

```ts
import { jetBrainsMono } from '@lib/fonts'
```

Then rename every usage of `jetbrainsMono.className` → `jetBrainsMono.className` in the file (the shared export uses camelCase capital B). There are two usages in the `CardTitle` elements — both need updating.

- [ ] **Step 2: Run formatter**

```bash
pnpm format
```

- [ ] **Step 3: Commit**

```bash
git add src/app/_components/sections/education/index.tsx
git commit -m "♻️ refactor(education): use shared jetBrainsMono font from lib/fonts"
```

---

## Task 4: Update footer — shared font + aria-labels

**Files:**

- Modify: `src/components/footer.tsx`

Two changes in this file: replace the local font instantiation and update the social link aria-labels.

- [ ] **Step 1: Replace local font instantiation**

Remove:

```ts
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})
```

Add:

```ts
import { jetBrainsMono } from '@lib/fonts'
```

- [ ] **Step 2: Update `socialLinks` array**

Replace the existing `socialLinks` array with:

```ts
const socialLinks = [
  {
    label: "Anderson Kaiti's GitHub profile",
    href: 'https://github.com/andersonkaiti',
    icon: Github,
  },
  {
    label: 'Connect with Anderson Kaiti on LinkedIn',
    href: 'https://www.linkedin.com/in/anderson-kaiti-67906126a/',
    icon: Linkedin,
  },
  {
    label: 'Send email to Anderson Kaiti',
    href: 'mailto:anderkaiti@gmail.com',
    icon: Mail,
  },
]
```

- [ ] **Step 3: Run formatter**

```bash
pnpm format
```

- [ ] **Step 4: Commit**

```bash
git add src/components/footer.tsx
git commit -m "♻️ refactor(footer): use shared font and add descriptive aria-labels with full name"
```

---

## Task 5: Update metadata and JSON-LD in `layout.tsx`

**Files:**

- Modify: `src/app/layout.tsx`

Two related changes: metadata fields and JSON-LD enrichment.

- [ ] **Step 1: Update the `metadata` export**

Replace the existing `metadata` object with:

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://andersonkaiti.com'),
  title: 'Anderson Kaiti | Full-Stack Developer',
  description:
    'Anderson Kaiti é um Full-Stack Developer formado em Ciência da Computação, especializado em React, Next.js, Node.js e TypeScript. Disponível para novas oportunidades.',
  applicationName: 'Anderson Kaiti - Portfolio',
  authors: [{ name: 'Anderson Kaiti', url: 'https://andersonkaiti.com' }],
  keywords: [
    'Anderson Kaiti',
    'Full-Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'TailwindCSS',
    'Docker',
    'Portfolio',
  ],
  alternates: {
    canonical: 'https://andersonkaiti.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://andersonkaiti.com',
    locale: 'pt_BR',
    title: 'Anderson Kaiti | Full-Stack Developer',
    description:
      'Anderson Kaiti é um Full-Stack Developer formado em Ciência da Computação, especializado em React, Next.js, Node.js e TypeScript. Disponível para novas oportunidades.',
    siteName: 'Anderson Kaiti',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anderson Kaiti | Full-Stack Developer',
    description:
      'Anderson Kaiti é um Full-Stack Developer formado em Ciência da Computação, especializado em React, Next.js, Node.js e TypeScript. Disponível para novas oportunidades.',
  },
  verification: {
    google: 'googlec07cb626ec36686a',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'AK - Portfolio',
  },
  formatDetection: {
    telephone: false,
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
}
```

- [ ] **Step 2: Replace the `jsonLd` object**

```ts
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Anderson Kaiti',
      givenName: 'Anderson',
      familyName: 'Kaiti',
      url: 'https://andersonkaiti.com',
      email: 'mailto:anderkaiti@gmail.com',
      jobTitle: 'Full-Stack Web Developer',
      description:
        'Full-Stack Developer formado em Ciência da Computação pela UNISAGRADO, especializado em React, Next.js, Node.js e TypeScript.',
      knowsAbout: [
        'React',
        'Next.js',
        'TypeScript',
        'Node.js',
        'PostgreSQL',
        'TailwindCSS',
        'Docker',
        'React Native',
        'Laravel',
      ],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'UNISAGRADO',
        url: 'https://www.unisagrado.edu.br',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Solid Tech',
      },
      sameAs: [
        'https://github.com/andersonkaiti',
        'https://www.linkedin.com/in/anderson-kaiti-67906126a',
      ],
    },
    {
      '@type': 'WebSite',
      name: 'Anderson Kaiti - Portfolio',
      url: 'https://andersonkaiti.com',
      author: {
        '@type': 'Person',
        name: 'Anderson Kaiti',
      },
    },
  ],
}
```

- [ ] **Step 3: Run formatter**

```bash
pnpm format
```

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "✨ feat(seo): set name-first title, enrich description and JSON-LD Person schema"
```

---

## Task 6: Add metadata to `/projects` page

**Files:**

- Modify: `src/app/projects/page.tsx`

- [ ] **Step 1: Add metadata export**

Replace the current file with:

```tsx
import { getProjects } from '@http/get-projects'
import type { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ProjectList } from './_components/project-list'

export const metadata: Metadata = {
  title: 'Anderson Kaiti | Projects',
  description:
    "Explore Anderson Kaiti's open-source projects built with React, Next.js, Node.js, TypeScript, and more.",
  alternates: {
    canonical: 'https://andersonkaiti.com/projects',
  },
  openGraph: {
    title: 'Anderson Kaiti | Projects',
    description:
      "Explore Anderson Kaiti's open-source projects built with React, Next.js, Node.js, TypeScript, and more.",
    url: 'https://andersonkaiti.com/projects',
  },
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <NuqsAdapter>
      <main className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-16 px-2 py-10 md:gap-40 md:px-20 md:py-30">
        <ProjectList projects={projects} />
      </main>
    </NuqsAdapter>
  )
}
```

- [ ] **Step 2: Run formatter**

```bash
pnpm format
```

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/page.tsx
git commit -m "✨ feat(seo): add metadata export to /projects page with canonical and OG tags"
```

---

## Task 7: Update sitemap `lastModified`

**Files:**

- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Update the file**

```ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://andersonkaiti.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://andersonkaiti.com/projects',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}
```

- [ ] **Step 2: Run formatter**

```bash
pnpm format
```

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "🔧 chore(sitemap): set lastModified to new Date() so sitemap reflects current deployment"
```

---

## Task 8: Build verification

- [ ] **Step 1: Run production build**

```bash
pnpm build
```

Expected: build completes with no TypeScript errors. Check that Next.js reports the `/projects` route with its own metadata in the build output.

- [ ] **Step 2: Verify sitemap and robots in local server**

```bash
pnpm start
```

Open in browser:

- `http://localhost:3000/sitemap.xml` — should list both URLs with today's date
- `http://localhost:3000/robots.txt` — should allow `/` and list the sitemap URL

- [ ] **Step 3: Validate JSON-LD**

Copy the page source of `http://localhost:3000` and paste the `<script type="application/ld+json">` content into [schema.org validator](https://validator.schema.org). Confirm:

- `Person` entity has `givenName`, `familyName`, `alumniOf`, `worksFor`
- No validation errors

- [ ] **Step 4: Verify heading structure**

In browser DevTools (Elements panel), search for `<h1>` in the page source. Confirm there is **exactly one** `<h1>` on the home page (the one in `HeaderSection`).

Also check that section headings are now `<h2>` elements.

- [ ] **Step 5: Submit sitemap to Google Search Console**

Go to [Google Search Console](https://search.google.com/search-console) → Sitemaps → submit `https://andersonkaiti.com/sitemap.xml` to trigger a recrawl.

# SEO & Indexing — Design Spec

**Date:** 2026-04-13  
**Goal:** Make `andersonkaiti.com` appear as the first result when searching "Anderson Kaiti" on Google.

---

## Context

Portfolio built with Next.js 16 App Router, deployed at `https://andersonkaiti.com`.  
Currently has a basic `manifest.ts` and minimal `metadata` (title, description, icons) — missing canonical URL, OpenGraph, Twitter card, structured data, robots, and sitemap.

---

## 1. Metadata (`src/app/layout.tsx`)

Expand the existing `metadata` export with:

| Field | Value |
| --- | --- |
| `metadataBase` | `new URL('https://andersonkaiti.com')` |
| `alternates.canonical` | `https://andersonkaiti.com` |
| `authors` | `[{ name: 'Anderson Kaiti', url: 'https://andersonkaiti.com' }]` |
| `keywords` | `['Anderson Kaiti', 'Full-Stack Developer', 'React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'Docker', 'Portfolio']` |
| `openGraph.type` | `website` |
| `openGraph.url` | `https://andersonkaiti.com` |
| `openGraph.locale` | `pt_BR` |
| `openGraph.title` | `Portfolio - Anderson Kaiti` |
| `openGraph.description` | `Computer Scientist and Full-Stack Developer` |
| `openGraph.siteName` | `Anderson Kaiti` |
| `twitter.card` | `summary_large_image` |
| `twitter.title` | `Portfolio - Anderson Kaiti` |
| `twitter.description` | `Computer Scientist and Full-Stack Developer` |
| `verification.google` | `googlec07cb626ec36686a` |

The `openGraph.images` and `twitter.images` fields are **omitted** — Next.js automatically uses the co-located `opengraph-image.tsx` file when `metadataBase` is set.

---

## 2. robots.ts (`src/app/robots.ts`)

New file using `MetadataRoute.Robots`:

```ts
{
  rules: { userAgent: '*', allow: '/', disallow: '/api/' },
  sitemap: 'https://andersonkaiti.com/sitemap.xml',
  host: 'https://andersonkaiti.com',
}
```

---

## 3. sitemap.ts (`src/app/sitemap.ts`)

New file using `MetadataRoute.Sitemap` with two static entries:

| URL | Priority | changeFrequency |
| --- | --- | --- |
| `https://andersonkaiti.com` | `1` | `monthly` |
| `https://andersonkaiti.com/projects` | `0.8` | `weekly` |

---

## 4. JSON-LD Structured Data (`src/app/layout.tsx`)

A `<script type="application/ld+json">` injected in `<head>` via `<Script>` (next/script, strategy `beforeInteractive`) or a plain `<script>` tag in the layout JSX.

Two schemas combined in a `@graph` array:

**Person:**

```json
{
  "@type": "Person",
  "name": "Anderson Kaiti",
  "url": "https://andersonkaiti.com",
  "jobTitle": "Full-Stack Web Developer",
  "knowsAbout": ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "TailwindCSS", "Docker"],
  "sameAs": [
    "https://github.com/andersonkaiti",
    "https://www.linkedin.com/in/anderson-kaiti-67906126a"
  ]
}
```

**WebSite:**

```json
{
  "@type": "WebSite",
  "name": "Anderson Kaiti - Portfolio",
  "url": "https://andersonkaiti.com"
}
```

Implementation: inline `<script dangerouslySetInnerHTML>` inside the `<head>` section of the root layout — no extra dependency needed since this is static data.

---

## 5. OG Image (`src/app/opengraph-image.tsx`)

Replace the current "AK" single-letter layout with a richer card:

- Dark background (`#09090b`)
- Top: name "Anderson Kaiti" in large bold white text
- Below: "Full-Stack Web Developer" in smaller muted text
- Bottom: `andersonkaiti.com` in monospace, subtle color
- Size remains `1200×630`

This image is also reused automatically for Twitter card since `metadataBase` is set.

---

## Files Changed / Created

| File | Action |
| --- | --- |
| `src/app/layout.tsx` | Update metadata, add JSON-LD script |
| `src/app/robots.ts` | Create |
| `src/app/sitemap.ts` | Create |
| `src/app/opengraph-image.tsx` | Update |

---

## Out of Scope

- Bing Webmaster Tools verification (no code provided)
- hreflang / multilingual SEO
- Dynamic sitemap entries from GitHub API
- www → non-www redirect (handled at DNS/Vercel level, not in Next.js)

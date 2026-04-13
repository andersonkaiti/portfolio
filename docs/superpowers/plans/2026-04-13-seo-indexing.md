# SEO & Indexing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar SEO completo no portfólio `andersonkaiti.com` para ranquear "Anderson Kaiti" no Google como primeiro resultado.

**Architecture:** Metadata expandido no `layout.tsx` (metadataBase, OpenGraph, Twitter, verificação Google), JSON-LD Schema.org inline, `robots.ts` e `sitemap.ts` nativos do Next.js App Router, e OG image melhorada.

**Tech Stack:** Next.js 16 App Router, TypeScript, `next/og` (ImageResponse), `MetadataRoute` do Next.js

---

## File Map

| Arquivo | Ação | Responsabilidade |
| --- | --- | --- |
| `src/app/layout.tsx` | Modificar | Metadata completo + JSON-LD |
| `src/app/robots.ts` | Criar | Regras de crawling + link para sitemap |
| `src/app/sitemap.ts` | Criar | Mapa de URLs para indexação |
| `src/app/opengraph-image.tsx` | Modificar | OG image rica com nome e cargo |

---

## Task 1: Expandir metadata em `layout.tsx`

**Files:**

- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Substituir o objeto `metadata` existente**

Abra `src/app/layout.tsx` e substitua o objeto `metadata` pelo seguinte (mantendo todos os imports já existentes):

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://andersonkaiti.com'),
  title: 'Portfolio - Anderson Kaiti',
  description: 'Computer Scientist and Full-Stack Developer',
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
    title: 'Portfolio - Anderson Kaiti',
    description: 'Computer Scientist and Full-Stack Developer',
    siteName: 'Anderson Kaiti',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Anderson Kaiti',
    description: 'Computer Scientist and Full-Stack Developer',
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

- [ ] **Step 2: Verificar build sem erros**

```bash
pnpm build
```

Esperado: build sem erros de TypeScript. O Next.js vai reclamar se algum campo do `Metadata` estiver com tipo errado.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "✨ feat(seo): add metadataBase, openGraph, twitter card, Google verification and canonical URL"
```

---

## Task 2: Adicionar JSON-LD ao `layout.tsx`

**Files:**

- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Adicionar constante `jsonLd` antes do `RootLayout`**

Logo após o objeto `metadata`, adicione:

```ts
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Anderson Kaiti',
      url: 'https://andersonkaiti.com',
      jobTitle: 'Full-Stack Web Developer',
      knowsAbout: [
        'React',
        'Next.js',
        'TypeScript',
        'Node.js',
        'PostgreSQL',
        'TailwindCSS',
        'Docker',
      ],
      sameAs: [
        'https://github.com/andersonkaiti',
        'https://www.linkedin.com/in/anderson-kaiti-67906126a',
      ],
    },
    {
      '@type': 'WebSite',
      name: 'Anderson Kaiti - Portfolio',
      url: 'https://andersonkaiti.com',
    },
  ],
}
```

- [ ] **Step 2: Injetar `<script>` no `<head>` do layout**

No JSX do `RootLayout`, adicione um `<head>` explícito com o script antes de `<body>`:

```tsx
return (
  <html lang="pt-BR" suppressHydrationWarning>
    <head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </head>
    <body
      className={`${MontserratSans.variable} relative antialiased transition-colors`}
    >
      {/* ... resto do conteúdo inalterado ... */}
    </body>
  </html>
)
```

- [ ] **Step 3: Verificar no browser**

Inicie o servidor de dev:

```bash
pnpm dev
```

Abra `http://localhost:3000`, clique com o botão direito → "Inspecionar" → aba "Elements". Procure por `<script type="application/ld+json">` dentro de `<head>`. O JSON com `@context` e `@graph` deve aparecer.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "✨ feat(seo): add JSON-LD structured data with Person and WebSite schemas"
```

---

## Task 3: Criar `robots.ts` e `sitemap.ts`

**Files:**

- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Criar `src/app/robots.ts`**

```ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://andersonkaiti.com/sitemap.xml',
    host: 'https://andersonkaiti.com',
  }
}
```

- [ ] **Step 2: Criar `src/app/sitemap.ts`**

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

- [ ] **Step 3: Verificar as rotas no browser**

Com `pnpm dev` rodando:

- Acesse `http://localhost:3000/robots.txt` → deve exibir texto com `User-agent: *`, `Allow: /`, `Disallow: /api/` e `Sitemap: https://andersonkaiti.com/sitemap.xml`
- Acesse `http://localhost:3000/sitemap.xml` → deve exibir XML com as duas URLs

- [ ] **Step 4: Commit**

```bash
git add src/app/robots.ts src/app/sitemap.ts
git commit -m "✨ feat(seo): add robots.ts and sitemap.ts with Next.js App Router native routes"
```

---

## Task 4: Melhorar a OG image

**Files:**

- Modify: `src/app/opengraph-image.tsx`

- [ ] **Step 1: Substituir o conteúdo de `opengraph-image.tsx`**

```tsx
import { JetBrains_Mono } from 'next/font/google'
import { ImageResponse } from 'next/og'

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const alt = 'Anderson Kaiti — Full-Stack Web Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#09090b',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: jetBrainsMono.style.fontFamily,
        padding: '0 80px',
      }}
    >
      <p
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: '#ffffff',
          margin: 0,
          letterSpacing: '-2px',
        }}
      >
        Anderson Kaiti
      </p>
      <p
        style={{
          fontSize: 32,
          color: '#a1a1aa',
          margin: '16px 0 0',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        Full-Stack Web Developer
      </p>
      <p
        style={{
          fontSize: 20,
          color: '#52525b',
          margin: '32px 0 0',
          letterSpacing: '0.05em',
        }}
      >
        andersonkaiti.com
      </p>
    </div>,
  )
}
```

- [ ] **Step 2: Verificar a imagem gerada**

Com `pnpm dev` rodando, acesse:

```txt
http://localhost:3000/opengraph-image
```

Deve renderizar uma imagem `1200×630` com fundo escuro, nome "Anderson Kaiti" em branco grande, subtítulo em cinza médio e URL em cinza escuro na base.

- [ ] **Step 3: Executar formatter e verificar build final**

```bash
pnpm format
pnpm build
```

Esperado: sem erros, build completo.

- [ ] **Step 4: Commit final**

```bash
git add src/app/opengraph-image.tsx
git commit -m "✨ feat(seo): improve OG image with full name, job title and domain"
```

---

## Verificação Final (pós-deploy)

Após fazer deploy na Vercel:

1. **Google Search Console** → "URL Inspection" → cole `https://andersonkaiti.com` → clique "Request Indexing"
2. **Rich Results Test** → `https://search.google.com/test/rich-results` → insira a URL → deve detectar o schema `Person`
3. **OG Debugger do Facebook** → `https://developers.facebook.com/tools/debug/` → insira a URL → deve mostrar a OG image nova
4. **Twitter Card Validator** → `https://cards-dev.twitter.com/validator` → insira a URL → deve mostrar `summary_large_image`

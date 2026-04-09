# Performance Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate all client-side GitHub API fetches, remove TanStack Query, replace Lenis and AOS with zero-dependency native equivalents, and fix a Spotlight hydration mismatch.

**Architecture:** GitHub data (projects + contributions) moves to async Server Components with ISR (`revalidate: 3600`), so the HTML is fully pre-rendered. Lenis is replaced by a thin context that wraps `window.scrollTo`. AOS is replaced by a lightweight IntersectionObserver that adds the existing `aos-animate` CSS class.

**Tech Stack:** Next.js 16 App Router, React 19 RSC, Tailwind v4, native IntersectionObserver, native `window.scrollTo`.

---

## File Map

| Action | File |
| -------- | ------ |
| Modify | `src/http/github-graph.ts` |
| Modify | `src/app/_components/sections/about/github-graph.tsx` |
| **Delete** | `src/app/_components/sections/about/use-github-graph.ts` |
| Modify | `src/app/_components/sections/projects/index.tsx` |
| Modify | `src/app/_components/sections/projects/project-list.tsx` |
| Modify | `src/app/projects/page.tsx` |
| Modify | `src/app/projects/_components/project-list.tsx` |
| **Delete** | `src/providers/query-provider.tsx` |
| Modify | `src/app/layout.tsx` |
| Modify | `src/components/ui/link-preview.tsx` |
| Modify | `src/providers/lenis.tsx` |
| Modify | `src/providers/aos.tsx` |
| Modify | `src/app/globals.css` |
| Modify | `src/components/ui/spotlight.tsx` |

---

### Task 1: Add ISR to GitHub contribution fetch

**Files:**

- Modify: `src/http/github-graph.ts`

- [ ] **Step 1: Add `next: { revalidate: 3600 }` to the GraphQL fetch**

Open `src/http/github-graph.ts`. The current fetch has no cache config. Replace:

```ts
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        username: 'andersonkaiti',
        from,
        to,
      },
    }),
  })
```

With:

```ts
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        username: 'andersonkaiti',
        from,
        to,
      },
    }),
    next: {
      revalidate: 3600,
    },
  })
```

- [ ] **Step 2: Commit**

```bash
cd /c/Users/ander/Desktop/portfolio
git add src/http/github-graph.ts
git commit -m "perf: add ISR revalidation to GitHub contribution fetch"
```

---

### Task 2: Convert GithubGraph to async RSC

The component currently fetches client-side via TanStack Query. We convert it to an async Server Component that calls the fetch function directly. `ContributionGraph` (client) and `LinkPreview` (client) remain as-is — RSC can render client components by passing serializable props.

**Files:**

- Modify: `src/app/_components/sections/about/github-graph.tsx`
- Delete: `src/app/_components/sections/about/use-github-graph.ts`

- [ ] **Step 1: Rewrite `github-graph.tsx` as async RSC**

Replace the entire file content:

```tsx
import { ContributionGraph } from '@components/ui/contribution-graph'
import { LinkPreview } from '@components/ui/link-preview'
import { generateGitHubContributionData } from '@http/github-graph'

export async function GithubGraph() {
  const today = new Date()
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(today.getFullYear() - 1)

  const data = await generateGitHubContributionData(oneYearAgo, today)

  return (
    <>
      <div className="ml-auto">
        <LinkPreview
          url="https://github.com/andersonkaiti"
          className="font-semibold text-primary"
        >
          <span className="font-mono text-primary">@andersonkaiti</span>
        </LinkPreview>
      </div>

      <ContributionGraph
        data={data}
        startDate={oneYearAgo}
        endDate={today}
        showLegend
        showTooltips
      />
    </>
  )
}
```

- [ ] **Step 2: Delete `use-github-graph.ts`**

```bash
rm src/app/_components/sections/about/use-github-graph.ts
```

- [ ] **Step 3: Commit**

```bash
git add src/app/_components/sections/about/github-graph.tsx
git rm src/app/_components/sections/about/use-github-graph.ts
git commit -m "perf: convert GithubGraph to async RSC with ISR, remove client fetch"
```

---

### Task 3: Convert home Projects section to RSC

Currently `ProjectListSection` wraps `ProjectList` in `<Suspense>` because `ProjectList` is a client component using `useSuspenseQuery`. After this task, both components are RSC: `ProjectListSection` fetches and passes the data as props.

**Files:**

- Modify: `src/app/_components/sections/projects/index.tsx`
- Modify: `src/app/_components/sections/projects/project-list.tsx`

- [ ] **Step 1: Make `ProjectListSection` async and fetch data directly**

Replace `src/app/_components/sections/projects/index.tsx`:

```tsx
import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { getProjects } from '@http/get-projects'
import { ProjectList } from './project-list'

export async function ProjectListSection() {
  const projects = await getProjects()

  return (
    <SectionContainer id="projects">
      <SectionHeader>
        <SectionLabel data-aos="fade-down">Work</SectionLabel>

        <SectionTitle data-aos="fade-down">Projects</SectionTitle>

        <SectionSubtitle data-aos="fade-down">
          Some of the projects I have developed along my journey
        </SectionSubtitle>
      </SectionHeader>

      <ProjectList projects={projects} />
    </SectionContainer>
  )
}
```

- [ ] **Step 2: Convert `ProjectList` (home) to RSC with props**

Replace `src/app/_components/sections/projects/project-list.tsx`:

```tsx
import { Button } from '@components/ui/button'
import type { IGithubRepository } from '@http/get-projects'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Project } from './project'

interface ProjectListProps {
  projects: IGithubRepository[]
}

export function ProjectList({ projects }: ProjectListProps) {
  const latestsProjects = projects.slice(0, 2)

  return (
    <div
      className="flex flex-col justify-center items-center gap-4 md:gap-16"
      data-aos="fade-down"
    >
      <p className="self-end">{projects.length} projects</p>

      <div
        className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
        data-aos="fade-down"
      >
        {latestsProjects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>

      <Button asChild data-aos="fade-down">
        <Link href="/projects">
          <ChevronRight className="size-4" /> See more
        </Link>
      </Button>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/_components/sections/projects/index.tsx \
        src/app/_components/sections/projects/project-list.tsx
git commit -m "perf: convert home ProjectListSection to async RSC, remove TanStack Query"
```

---

### Task 4: Convert /projects page to RSC

**Files:**

- Modify: `src/app/projects/page.tsx`
- Modify: `src/app/projects/_components/project-list.tsx`

- [ ] **Step 1: Make projects page async and fetch at page level**

Replace `src/app/projects/page.tsx`:

```tsx
import { getProjects } from '@http/get-projects'
import { ProjectList } from './_components/project-list'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <main className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-16 px-2 py-10 md:gap-40 md:px-20 md:py-30">
      <ProjectList projects={projects} />
    </main>
  )
}
```

- [ ] **Step 2: Convert `/projects` ProjectList to RSC with props**

Replace `src/app/projects/_components/project-list.tsx`:

```tsx
import { Button } from '@components/ui/button'
import type { IGithubRepository } from '@http/get-projects'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Project } from './project'

interface ProjectListProps {
  projects: IGithubRepository[]
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="flex flex-col items-center gap-16">
      <Button asChild variant="ghost" className="self-start">
        <Link href="/">
          <ChevronLeft className="size-4" /> Back to home
        </Link>
      </Button>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/page.tsx \
        src/app/projects/_components/project-list.tsx
git commit -m "perf: convert /projects page to async RSC, remove TanStack Query"
```

---

### Task 5: Remove TanStack Query entirely

**Files:**

- Delete: `src/providers/query-provider.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Remove QueryProvider from layout**

In `src/app/layout.tsx`, remove the `QueryProvider` import and its JSX wrapper. The result should be:

```tsx
import { Footer } from '@components/footer'
import { TooltipProvider } from '@components/ui/tooltip'
import { AosProvider } from '@providers/aos'
import { LenisProvider } from '@providers/lenis'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { NavigationBar } from './_components/navigation-bar'
import './globals.css'

const MontserratSans = Montserrat({
  variable: '--font-montserrat-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Portfolio - Anderson Kaiti',
  description: 'Computer Scientist and Full-Stack Developer',
  applicationName: 'Anderson Kaiti - Portfolio',
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
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <LenisProvider>
        <body
          className={`${MontserratSans.variable} relative antialiased transition-colors`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            <AosProvider>
              <TooltipProvider>
                <NavigationBar />

                {children}

                <Footer />
              </TooltipProvider>
            </AosProvider>
          </ThemeProvider>

          <Analytics />
          <SpeedInsights />
        </body>
      </LenisProvider>
    </html>
  )
}
```

- [ ] **Step 2: Delete the QueryProvider file**

```bash
rm src/providers/query-provider.tsx
```

- [ ] **Step 3: Uninstall TanStack Query**

```bash
pnpm remove @tanstack/react-query
```

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git rm src/providers/query-provider.tsx
git commit -m "perf: remove TanStack Query and QueryProvider — data now fetched server-side"
```

---

### Task 6: Fix LinkPreview eager preloading

`LinkPreview` renders a hidden `<Image priority>` immediately on mount, triggering a network request to `api.microlink.io` for every project card with a homepage — even before the user hovers. Remove it. The actual preview image inside the hover card already uses `loading="lazy"`.

**Files:**

- Modify: `src/components/ui/link-preview.tsx`

- [ ] **Step 1: Remove the eager preload block**

In `src/components/ui/link-preview.tsx`, delete these lines (approximately lines 78–91):

```tsx
      {isMounted ? (
        <div className="hidden">
          <Image
            alt=""
            draggable={false}
            height={height}
            priority
            quality={quality}
            src={src || '/placeholder.svg'}
            style={{ pointerEvents: 'none' }}
            width={width}
          />
        </div>
      ) : null}
```

Also remove the `isMounted` state and its `useEffect` since they're only used for the preload:

```tsx
  // Remove these:
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])
```

The final component should start at the `<Root>` element after the spring config:

```tsx
export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  isStatic = false,
  imageSrc = '',
  asChild = false,
}: LinkPreviewProps) => {
  const src: string = isStatic
    ? imageSrc
    : (() => {
        const params = encode({
          url,
          screenshot: true,
          meta: false,
          embed: 'screenshot.url',
          colorScheme: 'dark',
          'viewport.isMobile': true,
          'viewport.deviceScaleFactor': 1,
          'viewport.width': width * 3,
          'viewport.height': height * 3,
        })
        return `https://api.microlink.io/?${params}`
      })()

  const [isOpen, setOpen] = React.useState(false)

  const springConfig = { stiffness: 100, damping: 15 }
  const x = useMotionValue(0)

  const translateX = useSpring(x, springConfig)

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    const targetRect = target.getBoundingClientRect()
    const eventOffsetX = event.clientX - targetRect.left
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2
    x.set(offsetFromCenter)
  }

  return (
    <Root closeDelay={100} onOpenChange={setOpen} openDelay={50}>
      <Trigger asChild={asChild}>
        {asChild ? (
          children
        ) : (
          <Link
            className={cn('text-black dark:text-white', className)}
            href={url}
            onMouseMove={handleMouseMove}
            tabIndex={0}
          >
            {children}
          </Link>
        )}
      </Trigger>

      <Content
        align="center"
        className="origin-(--radix-hover-card-content-transform-origin)"
        side="top"
        sideOffset={10}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                },
              }}
              className="rounded-xl shadow-xl"
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                x: translateX,
              }}
            >
              <Link
                aria-label="Preview link"
                className="block rounded-xl border-2 border-primary bg-white p-1 shadow hover:border-neutral-200 dark:hover:border-neutral-800"
                href={url}
                style={{ fontSize: 0 }}
                tabIndex={-1}
              >
                <Image
                  alt="Website preview"
                  className="rounded-lg"
                  draggable={false}
                  height={height}
                  loading="lazy"
                  quality={quality}
                  src={src || '/placeholder.svg'}
                  width={width}
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </Content>
    </Root>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/link-preview.tsx
git commit -m "perf: remove eager preload in LinkPreview — image now loads only on hover"
```

---

### Task 7: Replace Lenis with native smooth scroll

Lenis runs a continuous `requestAnimationFrame` loop and overrides native scroll. The only feature used from Lenis in this codebase is programmatic scroll-to-element with a `-120px` offset (navbar). This can be done with `window.scrollTo`. The context API (`useLenis`, `handleNavClick`) is preserved so `NavigationBar` and `NavItems` need no changes.

**Files:**

- Modify: `src/providers/lenis.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add `scroll-behavior: smooth` to globals.css**

In `src/app/globals.css`, add inside the `@layer base` block:

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    scroll-behavior: smooth;
  }
}
```

- [ ] **Step 2: Replace LenisProvider implementation**

Replace the entire `src/providers/lenis.tsx` with:

```tsx
'use client'

import type React from 'react'
import { createContext, useContext } from 'react'

interface ILenisContext {
  handleNavClick(link: string): void
}

const LenisContext = createContext<ILenisContext>({} as ILenisContext)

export function LenisProvider({ children }: { children: React.ReactNode }) {
  function handleNavClick(link: string) {
    const element = document.querySelector(link)
    if (element instanceof HTMLElement) {
      const top =
        element.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return <LenisContext value={{ handleNavClick }}>{children}</LenisContext>
}

export function useLenis() {
  return useContext(LenisContext)
}
```

- [ ] **Step 3: Move LenisProvider inside `<body>` in layout.tsx**

`LenisProvider` used to wrap `<html>` because Lenis needed the scroll root. Now it's just a context provider and can live anywhere. Move it inside `<body>`, wrapping `ThemeProvider`:

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${MontserratSans.variable} relative antialiased transition-colors`}
      >
        <LenisProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            <AosProvider>
              <TooltipProvider>
                <NavigationBar />

                {children}

                <Footer />
              </TooltipProvider>
            </AosProvider>
          </ThemeProvider>
        </LenisProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Uninstall lenis**

```bash
pnpm remove lenis
```

- [ ] **Step 5: Commit**

```bash
git add src/providers/lenis.tsx src/app/globals.css src/app/layout.tsx
git commit -m "perf: replace Lenis with native window.scrollTo + CSS scroll-behavior smooth"
```

---

### Task 8: Replace AOS with lightweight IntersectionObserver

AOS ships ~12KB JS + ~12KB CSS. We already have the CSS for the animations in `globals.css` (`[data-aos="fade-down"]` + `[data-aos="fade-down"].aos-animate`). We replace the JS library with a small `useEffect` that sets up an `IntersectionObserver` — preserving all `data-aos` and `data-aos-delay` attributes in place across the codebase.

**Files:**

- Modify: `src/providers/aos.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update globals.css — add opacity transition to all `[data-aos]` elements**

In `src/app/globals.css`, replace the existing AOS override block:

```css
[data-aos="fade-down"] {
  transform: translateY(-20px); /* reduz de ~100px para 20px */
}
[data-aos="fade-down"].aos-animate {
  transform: translateY(0);
}
```

With:

```css
[data-aos] {
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1),
    transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
}

[data-aos].aos-animate {
  opacity: 1;
}

[data-aos="fade-down"] {
  transform: translateY(-20px);
}

[data-aos="fade-down"].aos-animate {
  transform: translateY(0);
}
```

- [ ] **Step 2: Replace AosProvider with IntersectionObserver implementation**

Replace the entire `src/providers/aos.tsx`:

```tsx
'use client'

import type React from 'react'
import { useEffect } from 'react'

export function AosProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-aos]')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )

    for (const el of elements) {
      const delay = el.getAttribute('data-aos-delay')
      if (delay) {
        ;(el as HTMLElement).style.transitionDelay = `${delay}ms`
      }
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return <>{children}</>
}
```

- [ ] **Step 3: Uninstall AOS and its types**

```bash
pnpm remove aos @types/aos
```

- [ ] **Step 4: Remove AOS CSS import from layout.tsx**

The old `AosProvider` imported `'aos/dist/aos.css'`. That import is gone from the new implementation. Verify `src/app/layout.tsx` has no remaining AOS imports. (If the old import was only inside `providers/aos.tsx`, this step is already done.)

- [ ] **Step 5: Commit**

```bash
git add src/providers/aos.tsx src/app/globals.css
git commit -m "perf: replace AOS library with native IntersectionObserver (~24KB saved)"
```

---

### Task 9: Fix Spotlight hydration mismatch

`Spotlight` uses `useIsMobile()` which returns `false` on the server (state starts as `undefined → !!undefined === false`) and then flips after hydration, causing a layout shift on mobile. Since the Spotlight is purely decorative, removing the JS-driven responsiveness in favor of CSS-driven or just desktop defaults eliminates the mismatch entirely.

**Files:**

- Modify: `src/components/ui/spotlight.tsx`

- [ ] **Step 1: Remove `useIsMobile` and all responsive variables**

Replace the entire `src/components/ui/spotlight.tsx`:

```tsx
'use client'

import { motion } from 'motion/react'

type SpotlightProps = {
  gradientFirst?: string
  gradientSecond?: string
  gradientThird?: string
  translateY?: number
  width?: number
  height?: number
  smallWidth?: number
  duration?: number
  xOffset?: number
}

export function Spotlight({
  gradientFirst = 'radial-gradient(68.54% 68.72% at 55.02% 31.46%, oklch(69.6% 0.17 162.48 / 0.08) 0, oklch(69.6% 0.17 162.48 / 0.02) 50%, oklch(69.6% 0.17 162.48 / 0) 80%)',
  gradientSecond = 'radial-gradient(50% 50% at 50% 50%, oklch(69.6% 0.17 162.48 / 0.06) 0, oklch(69.6% 0.17 162.48 / 0.02) 80%, transparent 100%)',
  gradientThird = 'radial-gradient(50% 50% at 50% 50%, oklch(69.6% 0.17 162.48 / 0.04) 0, oklch(69.6% 0.17 162.48 / 0.02) 80%, transparent 100%)',
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
}: SpotlightProps = {}) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        animate={{ x: [0, xOffset, 0] }}
        className="pointer-events-none absolute top-0 left-0 z-40 h-screen w-screen"
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <div
          className="absolute top-0 left-0"
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
        />
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            transform: 'rotate(-45deg) translate(5%, -50%)',
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
        />
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            transform: 'rotate(-45deg) translate(-180%, -70%)',
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
        />
      </motion.div>

      <motion.div
        animate={{ x: [0, -xOffset, 0] }}
        className="pointer-events-none absolute top-0 right-0 z-40 h-screen w-screen"
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <div
          className="absolute top-0 right-0"
          style={{
            transform: `translateY(${translateY}px) rotate(45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
        />
        <div
          className="absolute top-0 right-0 origin-top-right"
          style={{
            transform: 'rotate(45deg) translate(-5%, -50%)',
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
        />
        <div
          className="absolute top-0 right-0 origin-top-right"
          style={{
            transform: 'rotate(45deg) translate(180%, -70%)',
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
        />
      </motion.div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Check if `use-mobile.ts` is used elsewhere**

```bash
grep -r "use-mobile\|useIsMobile\|useMobile" src/ --include="*.ts" --include="*.tsx"
```

If the only reference was in `spotlight.tsx` (now removed), delete the hook:

```bash
rm src/hooks/use-mobile.ts
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/spotlight.tsx
git rm src/hooks/use-mobile.ts   # only if no other usages found
git commit -m "perf: remove useIsMobile from Spotlight to fix hydration mismatch"
```

---

### Task 10: Verify the build passes

- [ ] **Step 1: Run the production build**

```bash
pnpm build
```

Expected: build completes with no errors. Check for any TypeScript errors or missing imports related to deleted files.

- [ ] **Step 2: Start the production server and verify**

```bash
pnpm start
```

Open `http://localhost:3000`. Verify:

- Home page loads with no loading spinners for projects or GitHub graph (data pre-rendered)
- Scroll animations (fade-down) still work as elements enter viewport
- Navbar smooth-scroll to sections works
- Dark mode toggle works
- `/projects` page loads with all projects visible immediately
- No console errors about hydration mismatches

- [ ] **Step 3: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: resolve build issues after performance overhaul"
```

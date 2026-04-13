# Projects Page Filtering — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add URL-persisted text search and technology chip filters to the `/projects` page.

**Architecture:** `page.tsx` stays a Server Component and wraps `ProjectList` with `NuqsAdapter`. `ProjectList` becomes a Client Component that reads `q` (string) and `tech` (string array) from URL params via `nuqs`, derives the filtered list with `useMemo`, and renders two new sub-components: `SearchInput` and `TechFilter`.

**Tech Stack:** Next.js 16 App Router, React 19, nuqs (URL state), Tailwind v4, TypeScript strict, Biome

---

## File Map

| File | Action | Responsibility |
| ------ | -------- | ---------------- |
| `src/app/projects/page.tsx` | Modify | Wrap with `NuqsAdapter` |
| `src/app/projects/_components/project-list.tsx` | Modify | Add `"use client"`, nuqs state, filter logic, render new components |
| `src/app/projects/_components/search-input.tsx` | Create | Controlled text input bound to `q` URL param |
| `src/app/projects/_components/tech-filter.tsx` | Create | Clickable tech chips bound to `tech` URL param |

---

## Task 1: Install nuqs and add NuqsAdapter to page.tsx

**Files:**

- Modify: `package.json` (via pnpm)
- Modify: `src/app/projects/page.tsx`

- [ ] **Step 1: Install nuqs**

```bash
pnpm add nuqs
```

Expected: nuqs added to `dependencies` in `package.json`.

- [ ] **Step 2: Update page.tsx to wrap with NuqsAdapter**

Replace the contents of `src/app/projects/page.tsx` with:

```tsx
import { getProjects } from '@http/get-projects'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ProjectList } from './_components/project-list'

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

- [ ] **Step 3: Verify the app still compiles**

```bash
pnpm build
```

Expected: build succeeds with no type errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/projects/page.tsx package.json pnpm-lock.yaml
git commit -m "📦 build(projects): install nuqs and add NuqsAdapter to projects page"
```

---

## Task 2: Create SearchInput component

**Files:**

- Create: `src/app/projects/_components/search-input.tsx`

- [ ] **Step 1: Create the file**

```tsx
'use client'

import { cn } from '@lib/utils'
import { Search, X } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'

export function SearchInput() {
  const [q, setQ] = useQueryState('q', parseAsString.withDefault(''))

  return (
    <div className="relative w-full">
      <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder="Buscar projetos..."
        value={q}
        onChange={(e) => setQ(e.target.value || null)}
        className={cn(
          'h-9 w-full rounded-md border bg-background pl-9 pr-8 text-sm',
          'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring',
        )}
      />
      {q && (
        <button
          onClick={() => setQ(null)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Limpar busca"
          type="button"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Run format**

```bash
pnpm format
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/_components/search-input.tsx
git commit -m "✨ feat(projects): add SearchInput component with nuqs q param"
```

---

## Task 3: Create TechFilter component

**Files:**

- Create: `src/app/projects/_components/tech-filter.tsx`

- [ ] **Step 1: Create the file**

The component derives available techs from the full project list (always from the unfiltered set, so chips never disappear while filtering). It only shows topics that have a logo in `topicToLogo`.

```tsx
'use client'

import type { IGithubRepository } from '@http/get-projects'
import { cn } from '@lib/utils'
import { formatTopic } from '@utils/format-topic'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
import { useMemo } from 'react'
import { type TechLogo, getTopicLogo } from './topic-to-logo'

interface TechFilterProps {
  projects: IGithubRepository[]
}

function TechLogoImage({ logo, topic }: { logo: TechLogo; topic: string }) {
  if (typeof logo === 'object') {
    return (
      <>
        <img alt={topic} className="hidden size-4 dark:flex" src={logo.dark} />
        <img alt={topic} className="flex size-4 dark:hidden" src={logo.light} />
      </>
    )
  }
  return <img alt={topic} className="size-4" src={logo} />
}

export function TechFilter({ projects }: TechFilterProps) {
  const [tech, setTech] = useQueryState(
    'tech',
    parseAsArrayOf(parseAsString).withDefault([]),
  )

  const availableTechs = useMemo(() => {
    const seen = new Set<string>()
    for (const project of projects) {
      for (const topic of project.topics) {
        if (getTopicLogo(topic)) {
          seen.add(topic)
        }
      }
    }
    return [...seen].sort()
  }, [projects])

  function toggleTech(topic: string) {
    setTech((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {availableTechs.map((topic) => {
        const logo = getTopicLogo(topic)!
        const isSelected = tech.includes(topic)

        return (
          <button
            key={topic}
            type="button"
            onClick={() => toggleTech(topic)}
            className={cn(
              'inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium transition-colors',
              isSelected
                ? 'border-transparent bg-primary text-primary-foreground'
                : 'border-border bg-background text-foreground hover:bg-accent',
            )}
          >
            <TechLogoImage logo={logo} topic={topic} />
            {formatTopic(topic)}
          </button>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Run format**

```bash
pnpm format
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/_components/tech-filter.tsx
git commit -m "✨ feat(projects): add TechFilter component with nuqs tech param"
```

---

## Task 4: Update ProjectList to be a Client Component with filter logic

**Files:**

- Modify: `src/app/projects/_components/project-list.tsx`

- [ ] **Step 1: Replace project-list.tsx with the client version**

```tsx
'use client'

import { Button } from '@components/ui/button'
import type { IGithubRepository } from '@http/get-projects'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
import { useMemo } from 'react'
import { Project } from './project'
import { SearchInput } from './search-input'
import { TechFilter } from './tech-filter'

interface ProjectListProps {
  projects: IGithubRepository[]
}

export function ProjectList({ projects }: ProjectListProps) {
  const [q, setQ] = useQueryState('q', parseAsString.withDefault(''))
  const [tech, setTech] = useQueryState(
    'tech',
    parseAsArrayOf(parseAsString).withDefault([]),
  )

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesQuery =
        !q ||
        project.name.toLowerCase().includes(q.toLowerCase()) ||
        (project.description ?? '').toLowerCase().includes(q.toLowerCase())

      const matchesTech =
        tech.length === 0 || tech.some((t) => project.topics.includes(t))

      return matchesQuery && matchesTech
    })
  }, [projects, q, tech])

  function clearFilters() {
    setQ(null)
    setTech(null)
  }

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <Button asChild variant="ghost" className="self-start">
        <Link href="/">
          <ChevronLeft className="size-4" /> Back to home
        </Link>
      </Button>

      <div className="flex w-full flex-col gap-3">
        <SearchInput />
        <TechFilter projects={projects} />
      </div>

      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16">
          <p className="text-muted-foreground text-sm">
            Nenhum projeto encontrado para os filtros aplicados.
          </p>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Limpar filtros
          </Button>
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredProjects.map((project) => (
            <Project key={project.id} {...project} />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Run format**

```bash
pnpm format
```

Expected: no errors.

- [ ] **Step 3: Build to verify types**

```bash
pnpm build
```

Expected: build succeeds, no TypeScript errors.

- [ ] **Step 4: Start dev server and manually verify**

```bash
pnpm dev
```

Open `http://localhost:3000/projects` and verify:

- Search field appears, typing filters projects by name/description
- Tech chips appear, clicking one highlights it and filters the grid
- Multiple chips selected shows projects matching any of them (OR)
- Selecting a chip AND typing text combines both (AND)
- Empty state shows "Nenhum projeto encontrado..." with "Limpar filtros" button
- "Limpar filtros" resets both filters
- URL updates as you interact (e.g., `?q=api&tech=react`)
- Refreshing the page with filters in the URL restores the filtered state

- [ ] **Step 5: Commit**

```bash
git add src/app/projects/_components/project-list.tsx
git commit -m "✨ feat(projects): add client-side filtering with search and tech chips via nuqs"
```

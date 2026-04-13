# Projects Filter Refactor — Clean Code / SOLID / Custom Hooks

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the projects filtering feature to apply SRP, DIP, and custom hooks — extracting state/logic into `useProjectFilters` and `useAvailableTechs`, making `SearchInput` and `TechFilter` controlled components, adding `getTopicDisplayName`, and translating all UI strings to EN-US.

**Architecture:** `ProjectList` becomes a pure orchestrator that calls two hooks and passes controlled props down. `SearchInput` and `TechFilter` become stateless presentation components. All URL state and filter logic lives in `useProjectFilters`; available-tech derivation lives in `useAvailableTechs`.

**Tech Stack:** Next.js 16 App Router, React 19, nuqs, TypeScript strict, Tailwind v4, Biome

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/utils/get-topic-display-name.ts` | Create | Maps topic slugs to canonical display names |
| `src/app/projects/_hooks/use-project-filters.ts` | Create | URL params, filter logic, clearFilters, toggleTech |
| `src/app/projects/_hooks/use-available-techs.ts` | Create | Derives sorted unique techs with logos from projects |
| `src/app/projects/_components/search-input.tsx` | Modify | Controlled component — no state, no nuqs |
| `src/app/projects/_components/tech-filter.tsx` | Modify | Controlled component — no state, uses getTopicDisplayName |
| `src/app/projects/_components/project-list.tsx` | Modify | Orchestrator — calls hooks, passes controlled props |

---

## Task 1: Create `getTopicDisplayName` utility

**Files:**
- Create: `src/utils/get-topic-display-name.ts`

- [ ] **Step 1: Create the file**

```ts
const topicDisplayName: Record<string, string> = {
  // Front-end
  html: 'HTML',
  html5: 'HTML5',
  css: 'CSS',
  css3: 'CSS3',
  javascript: 'JavaScript',
  js: 'JavaScript',
  typescript: 'TypeScript',
  ts: 'TypeScript',
  tsx: 'TSX',
  react: 'React',
  reactjs: 'React',
  'react-js': 'React',
  'react-native': 'React Native',
  'react-router': 'React Router',
  'react-router-dom': 'React Router',
  reactrouter: 'React Router',
  nextjs: 'Next.js',
  nextjs15: 'Next.js 15',
  'next-js': 'Next.js',
  next: 'Next.js',
  tailwind: 'Tailwind CSS',
  tailwindcss: 'Tailwind CSS',
  'tailwind-css': 'Tailwind CSS',
  nativewind: 'NativeWind',
  'react-query': 'React Query',
  reactquery: 'React Query',
  'reactquery-v3': 'React Query',
  tanstack: 'TanStack',
  '@tanstack/react-query': 'TanStack Query',
  '@tanstack/react-router': 'TanStack Router',
  'tanstack-router': 'TanStack Router',
  'tanstack-query': 'TanStack Query',
  redux: 'Redux',
  'react-redux': 'Redux',
  shadcn: 'shadcn/ui',
  'shadcn-ui': 'shadcn/ui',
  shadcnui: 'shadcn/ui',
  vite: 'Vite',
  vitejs: 'Vite',
  webpack: 'Webpack',
  zod: 'Zod',
  'react-hook-form': 'React Hook Form',
  'react-hooks-form': 'React Hook Form',
  rhf: 'React Hook Form',
  radix: 'Radix UI',
  'radix-ui': 'Radix UI',
  '@radix-ui': 'Radix UI',
  'styled-components': 'Styled Components',
  styledcomponents: 'Styled Components',
  babel: 'Babel',
  shiki: 'Shiki',
  nuqs: 'nuqs',
  lucide: 'Lucide',
  'lucide-react': 'Lucide',
  'lucide-react-native': 'Lucide',
  ionicons: 'Ionicons',
  'ion-icons': 'Ionicons',
  // Back-end & Databases
  node: 'Node.js',
  nodejs: 'Node.js',
  'node-js': 'Node.js',
  nestjs: 'NestJS',
  nest: 'NestJS',
  express: 'Express',
  expressjs: 'Express',
  'express-js': 'Express',
  fastify: 'Fastify',
  mysql: 'MySQL',
  sql: 'SQL',
  mongodb: 'MongoDB',
  mongo: 'MongoDB',
  prisma: 'Prisma',
  drizzle: 'Drizzle',
  'drizzle-orm': 'Drizzle ORM',
  postgresql: 'PostgreSQL',
  postgres: 'PostgreSQL',
  pg: 'PostgreSQL',
  java: 'Java',
  poo: 'OOP',
  laravel: 'Laravel',
  php: 'PHP',
  csharp: 'C#',
  'c#': 'C#',
  rabbitmq: 'RabbitMQ',
  'rabbit-mq': 'RabbitMQ',
  // Tools & Libraries
  clerk: 'Clerk',
  eslint: 'ESLint',
  biomejs: 'Biome',
  biome: 'Biome',
  prettier: 'Prettier',
  turborepo: 'Turborepo',
  t3: 'T3',
  't3-env': 'T3 Env',
  't3-stack': 'T3 Stack',
  fakerjs: 'Faker.js',
  faker: 'Faker.js',
  ultracite: 'Ultracite',
  cypress: 'Cypress',
  typeorm: 'TypeORM',
  jwt: 'JWT',
  jsonwebtoken: 'JWT',
  'date-fns': 'date-fns',
  datefns: 'date-fns',
  dayjs: 'Day.js',
  'day-js': 'Day.js',
  vitest: 'Vitest',
  swagger: 'Swagger',
  'swagger-ui': 'Swagger UI',
  // Mobile & Native
  expo: 'Expo',
  android: 'Android',
  'android-studio': 'Android Studio',
  // Cloud & DevOps
  vercel: 'Vercel',
  aws: 'AWS',
  'aws-lambda': 'AWS Lambda',
  serverless: 'Serverless',
  'serverless-framework': 'Serverless',
  'serverless-offline': 'Serverless Offline',
  azure: 'Azure',
  firebase: 'Firebase',
  git: 'Git',
  docker: 'Docker',
  'docker-compose': 'Docker Compose',
  dockerfile: 'Dockerfile',
  // IDEs & Editors
  'visual-studio': 'Visual Studio',
  visualstudio: 'Visual Studio',
  vs: 'Visual Studio',
  microsoft: 'Visual Studio',
  vscode: 'VS Code',
  'vs-code': 'VS Code',
  'visual-studio-code': 'VS Code',
  'microsoft-visual-studio-code': 'VS Code',
}

function toTitleCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function getTopicDisplayName(topic: string): string {
  const normalized = topic.toLowerCase().trim()
  return topicDisplayName[normalized] ?? toTitleCase(normalized)
}
```

- [ ] **Step 2: Run format**

```bash
pnpm format
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/utils/get-topic-display-name.ts
git commit -m "✨ feat(utils): add getTopicDisplayName with canonical tech display names"
```

---

## Task 2: Create `useAvailableTechs` hook

**Files:**
- Create: `src/app/projects/_hooks/use-available-techs.ts`

- [ ] **Step 1: Create the `_hooks` directory and file**

```ts
import type { IGithubRepository } from '@http/get-projects'
import { useMemo } from 'react'
import { getTopicLogo } from '../_components/topic-to-logo'

export function useAvailableTechs(projects: IGithubRepository[]): string[] {
  return useMemo(() => {
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
}
```

- [ ] **Step 2: Run format**

```bash
pnpm format
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/_hooks/use-available-techs.ts
git commit -m "✨ feat(projects): add useAvailableTechs hook"
```

---

## Task 3: Create `useProjectFilters` hook

**Files:**
- Create: `src/app/projects/_hooks/use-project-filters.ts`

- [ ] **Step 1: Create the file**

```ts
import type { IGithubRepository } from '@http/get-projects'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
import { useMemo } from 'react'

interface UseProjectFiltersReturn {
  q: string
  setQ: (v: string | null) => void
  tech: string[]
  toggleTech: (topic: string) => void
  filteredProjects: IGithubRepository[]
  clearFilters: () => void
  hasActiveFilters: boolean
}

export function useProjectFilters(
  projects: IGithubRepository[],
): UseProjectFiltersReturn {
  const [q, setQ] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({ history: 'replace' }),
  )
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

  function toggleTech(topic: string) {
    setTech((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    )
  }

  function clearFilters() {
    setQ(null)
    setTech(null)
  }

  const hasActiveFilters = q.length > 0 || tech.length > 0

  return {
    q,
    setQ,
    tech,
    toggleTech,
    filteredProjects,
    clearFilters,
    hasActiveFilters,
  }
}
```

- [ ] **Step 2: Run format**

```bash
pnpm format
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/_hooks/use-project-filters.ts
git commit -m "✨ feat(projects): add useProjectFilters hook with URL state and filter logic"
```

---

## Task 4: Refactor `SearchInput` to controlled component

**Files:**
- Modify: `src/app/projects/_components/search-input.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
'use client'

import { cn } from '@lib/utils'
import { Search, X } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string | null) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search projects..."
        value={value}
        onChange={(e) => onChange(e.target.value || null)}
        className={cn(
          'h-9 w-full rounded-md border bg-background pl-9 pr-8 text-sm',
          'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring',
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
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
git commit -m "♻️ refactor(projects): make SearchInput a controlled component with EN-US strings"
```

---

## Task 5: Refactor `TechFilter` to controlled component

**Files:**
- Modify: `src/app/projects/_components/tech-filter.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
'use client'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover'
import { cn } from '@lib/utils'
import { getTopicDisplayName } from '@utils/get-topic-display-name'
import { Check, ChevronDown } from 'lucide-react'
import { getTopicLogo, type TechLogo } from './topic-to-logo'

interface TechFilterProps {
  availableTechs: string[]
  selected: string[]
  onToggle: (topic: string) => void
}

function TechLogoImage({ logo, topic }: { logo: TechLogo; topic: string }) {
  if (typeof logo === 'object') {
    return (
      <>
        <img alt={topic} className="hidden size-4 dark:block" src={logo.dark} />
        <img
          alt={topic}
          className="block size-4 dark:hidden"
          src={logo.light}
        />
      </>
    )
  }
  return <img alt={topic} className="size-4" src={logo} />
}

export function TechFilter({
  availableTechs,
  selected,
  onToggle,
}: TechFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'inline-flex h-9 shrink-0 items-center gap-2 rounded-md border bg-background px-3 text-sm transition-colors hover:bg-accent',
            selected.length > 0 && 'border-primary',
          )}
        >
          <span>Technologies</span>
          {selected.length > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {selected.length}
            </span>
          )}
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-60 p-0">
        <Command>
          <CommandInput placeholder="Search technology..." />
          <CommandList>
            <CommandEmpty>No technologies found.</CommandEmpty>
            <CommandGroup>
              {availableTechs.map((topic) => {
                const logo = getTopicLogo(topic)
                if (!logo) return null
                const isSelected = selected.includes(topic)

                return (
                  <CommandItem
                    key={topic}
                    value={getTopicDisplayName(topic)}
                    onSelect={() => onToggle(topic)}
                  >
                    <TechLogoImage logo={logo} topic={topic} />
                    {getTopicDisplayName(topic)}
                    {isSelected && (
                      <Check className="ml-auto size-4 text-primary" />
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
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
git commit -m "♻️ refactor(projects): make TechFilter a controlled component, use getTopicDisplayName"
```

---

## Task 6: Refactor `ProjectList` to orchestrator

**Files:**
- Modify: `src/app/projects/_components/project-list.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
'use client'

import { Button } from '@components/ui/button'
import type { IGithubRepository } from '@http/get-projects'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useAvailableTechs } from '../_hooks/use-available-techs'
import { useProjectFilters } from '../_hooks/use-project-filters'
import { Project } from './project'
import { SearchInput } from './search-input'
import { TechFilter } from './tech-filter'

interface ProjectListProps {
  projects: IGithubRepository[]
}

export function ProjectList({ projects }: ProjectListProps) {
  const { q, setQ, tech, toggleTech, filteredProjects, clearFilters, hasActiveFilters } =
    useProjectFilters(projects)
  const availableTechs = useAvailableTechs(projects)

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <Button asChild variant="ghost" className="self-start">
        <Link href="/">
          <ChevronLeft className="size-4" /> Back to home
        </Link>
      </Button>

      <div className="flex w-full items-center gap-2">
        <SearchInput value={q} onChange={setQ} />
        <TechFilter
          availableTechs={availableTechs}
          selected={tech}
          onToggle={toggleTech}
        />
      </div>

      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16">
          <p className="text-muted-foreground text-sm">
            {hasActiveFilters
              ? 'No projects found for the applied filters.'
              : 'No projects available.'}
          </p>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
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

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/projects/_components/project-list.tsx
git commit -m "♻️ refactor(projects): make ProjectList an orchestrator using custom hooks"
```

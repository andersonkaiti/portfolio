# Projects Filter — Clean Code / SOLID / Custom Hooks Refactor

**Date:** 2026-04-12
**Status:** Approved

## Summary

Refactor the projects page filtering feature to apply Clean Code, SOLID principles, and custom hooks. Scope: `project-list.tsx`, `search-input.tsx`, `tech-filter.tsx`. Also adds `getTopicDisplayName` utility and translates all UI strings to EN-US.

---

## Architecture

`ProjectList` becomes a pure orchestrator: it calls two custom hooks and passes controlled props to `SearchInput` and `TechFilter`. Neither child component manages its own URL state or derives data — they are presentation-only.

```txt
ProjectList
  useProjectFilters(projects)  →  q, setQ, tech, setTech, filteredProjects, clearFilters, hasActiveFilters
  useAvailableTechs(projects)  →  availableTechs: string[]
    ↓ controlled props
  SearchInput  { value, onChange }
  TechFilter   { availableTechs, selected, onToggle }
```

---

## New Files

### `src/app/projects/_hooks/use-project-filters.ts`

**Responsibility:** Owns the URL filter state and derives the filtered project list.

```ts
interface UseProjectFiltersReturn {
  q: string
  setQ: (v: string | null) => void
  tech: string[]
  setTech: (v: string[] | null) => void
  filteredProjects: IGithubRepository[]
  clearFilters: () => void
  hasActiveFilters: boolean
}

export function useProjectFilters(
  projects: IGithubRepository[],
): UseProjectFiltersReturn
```

- `q` bound to URL param `'q'` via `parseAsString.withDefault('')` with `history: 'replace'`
- `tech` bound to URL param `'tech'` via `parseAsArrayOf(parseAsString).withDefault([])`
- `filteredProjects` derived in `useMemo([projects, q, tech])`:
  - text filter: case-insensitive match on `name` or `description` (AND with tech)
  - tech filter: OR across selected topics
- `clearFilters`: calls `setQ(null)` + `setTech(null)`
- `hasActiveFilters`: `q.length > 0 || tech.length > 0`

### `src/app/projects/_hooks/use-available-techs.ts`

**Responsibility:** Derives the sorted list of unique topics that have a logo.

```ts
export function useAvailableTechs(projects: IGithubRepository[]): string[]
```

- Iterates all project topics, keeps only those where `getTopicLogo(topic)` is truthy
- Deduplicates via `Set`, sorts alphabetically
- Memoized on `projects`

### `src/utils/get-topic-display-name.ts`

**Responsibility:** Maps a topic slug to its canonical display name.

```ts
export function getTopicDisplayName(topic: string): string
```

- Checks a `topicDisplayName: Record<string, string>` for well-known names
- Falls back to title-case (split on `-`, capitalize each word) for unknown topics
- Covers all topics currently mapped in `topicToLogo`, including aliases:

| Topic(s) | Display |
| --- | --- |
| `html`, `html5` | `HTML` / `HTML5` |
| `css`, `css3` | `CSS` / `CSS3` |
| `javascript`, `js` | `JavaScript` |
| `typescript`, `ts` | `TypeScript` |
| `react`, `reactjs`, `react-js` | `React` |
| `react-native` | `React Native` |
| `react-router`, `react-router-dom`, `reactrouter` | `React Router` |
| `nextjs`, `next-js`, `next`, `nextjs15` | `Next.js` / `Next.js 15` |
| `tailwind`, `tailwindcss`, `tailwind-css` | `Tailwind CSS` |
| `nativewind` | `NativeWind` |
| `react-query`, `reactquery`, `tanstack-query` | `React Query` |
| `tanstack`, `@tanstack/react-query`, `@tanstack/react-router`, `tanstack-router` | `TanStack` / `TanStack Query` / `TanStack Router` |
| `redux`, `react-redux` | `Redux` |
| `shadcn`, `shadcn-ui`, `shadcnui` | `shadcn/ui` |
| `vite`, `vitejs` | `Vite` |
| `webpack` | `Webpack` |
| `zod` | `Zod` |
| `react-hook-form`, `react-hooks-form`, `rhf` | `React Hook Form` |
| `radix`, `radix-ui`, `@radix-ui` | `Radix UI` |
| `styled-components`, `styledcomponents` | `Styled Components` |
| `babel` | `Babel` |
| `shiki` | `Shiki` |
| `nuqs` | `nuqs` |
| `lucide`, `lucide-react`, `lucide-react-native` | `Lucide` |
| `ionicons`, `ion-icons` | `Ionicons` |
| `node`, `nodejs`, `node-js` | `Node.js` |
| `nestjs`, `nest` | `NestJS` |
| `express`, `expressjs`, `express-js` | `Express` |
| `fastify` | `Fastify` |
| `mysql`, `sql` | `MySQL` / `SQL` |
| `mongodb`, `mongo` | `MongoDB` |
| `prisma` | `Prisma` |
| `drizzle`, `drizzle-orm` | `Drizzle` / `Drizzle ORM` |
| `postgresql`, `postgres`, `pg` | `PostgreSQL` |
| `java` | `Java` |
| `poo` | `OOP` |
| `laravel` | `Laravel` |
| `php` | `PHP` |
| `csharp`, `c#` | `C#` |
| `rabbitmq`, `rabbit-mq` | `RabbitMQ` |
| `clerk` | `Clerk` |
| `eslint`, `biomejs`, `biome` | `ESLint` / `Biome` |
| `prettier` | `Prettier` |
| `turborepo` | `Turborepo` |
| `t3`, `t3-env`, `t3-stack` | `T3` / `T3 Env` / `T3 Stack` |
| `fakerjs`, `faker` | `Faker.js` |
| `ultracite` | `Ultracite` |
| `cypress` | `Cypress` |
| `typeorm` | `TypeORM` |
| `jwt`, `jsonwebtoken` | `JWT` |
| `date-fns`, `datefns` | `date-fns` |
| `dayjs`, `day-js` | `Day.js` |
| `vitest` | `Vitest` |
| `swagger`, `swagger-ui` | `Swagger` / `Swagger UI` |
| `expo` | `Expo` |
| `android` | `Android` |
| `android-studio` | `Android Studio` |
| `vercel` | `Vercel` |
| `aws` | `AWS` |
| `aws-lambda` | `AWS Lambda` |
| `serverless`, `serverless-framework`, `serverless-offline` | `Serverless` / `Serverless Offline` |
| `azure` | `Azure` |
| `firebase` | `Firebase` |
| `git` | `Git` |
| `docker`, `docker-compose`, `dockerfile` | `Docker` / `Docker Compose` / `Dockerfile` |
| `visual-studio`, `visualstudio`, `vs`, `microsoft` | `Visual Studio` |
| `vscode`, `vs-code`, `visual-studio-code`, `microsoft-visual-studio-code` | `VS Code` |

---

## Modified Files

### `src/app/projects/_components/search-input.tsx`

**Becomes a controlled component.** Removes `useQueryState`.

```ts
interface SearchInputProps {
  value: string
  onChange: (value: string | null) => void
}
```

EN-US strings: `placeholder="Search projects..."`, `aria-label="Clear search"`.

### `src/app/projects/_components/tech-filter.tsx`

**Becomes a controlled component.** Removes `useQueryState` and `useMemo`. Replaces `formatTopic` with `getTopicDisplayName`.

```ts
interface TechFilterProps {
  availableTechs: string[]
  selected: string[]
  onToggle: (topic: string) => void
}
```

EN-US strings: trigger `"Technologies"`, input `placeholder="Search technology..."`, empty `"No technologies found."`.

### `src/app/projects/_components/project-list.tsx`

**Becomes orchestrator.** Uses `useProjectFilters` and `useAvailableTechs`, passes controlled props down.

EN-US strings: `"No projects found for the applied filters."`, `"No projects available."`, `"Clear filters"`.

---

## Out of Scope

- `formatTopic` is **not modified** — used in `project.tsx` tooltips, outside this refactor's scope
- `project.tsx`, `page.tsx`, `topic-to-logo.ts` — untouched

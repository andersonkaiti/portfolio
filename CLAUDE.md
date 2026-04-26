# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server with Turbopack
pnpm build      # Production build
pnpm start      # Start production server
pnpm format     # Lint and format with Biome (biome check --write)
```

## Environment

Requires a `.env.local` with:

```txt
NEXT_PUBLIC_GITHUB_TOKEN=<github_pat>
```

Validated via `@t3-oss/env-nextjs` in `src/config/env.ts`. The app will throw at startup if the variable is missing.

## Architecture

**Next.js 16 App Router** with React 19, TypeScript strict mode, and Tailwind v4.

### Path Aliases (tsconfig.json)

| Alias | Maps to |
| ------- | --------- |
| `@components/*` | `src/components/*` |
| `@config/*` | `src/config/*` |
| `@http/*` | `src/http/*` |
| `@hooks/*` | `src/hooks/*` |
| `@lib/*` | `src/lib/*` |
| `@providers/*` | `src/providers/*` |
| `@utils/*` | `src/utils/*` |

### Key Directories

- `src/app/_components/sections/` — page sections (Header, About, Technologies, Projects, Experiences, Education), each in its own subfolder with an `index.tsx`
- `src/app/projects/` — dedicated `/projects` route with its own `_components/`
- `src/components/ui/` — shared UI primitives (Radix UI-based)
- `src/http/` — GitHub API fetch functions with Zod validation and ISR (`revalidate: 3600`)
- `src/providers/` — client-side providers: `AosProvider` (IntersectionObserver), `LenisProvider` (native scroll)
- `src/config/env.ts` — type-safe env via `@t3-oss/env-nextjs`
- `public/assets/` — SVG icons served as static files (many have dark/light variants, e.g. `aws/aws-dark.svg` and `aws/aws-light.svg`)

### Provider Stack (layout.tsx)

`LenisProvider` (native scroll context, inside `<body>`) → `ThemeProvider` (next-themes) → `AosProvider` (IntersectionObserver animations) → `TooltipProvider` (Radix)

### Data Fetching Pattern

All GitHub data is fetched in async Server Components with Next.js ISR (`revalidate: 3600`) — no client-side fetching. Projects are filtered (must have topics, no `course` topic, must have a description) and sorted by `pushed_at`. The GitHub contributions graph is fetched server-side in `GithubGraph` (async RSC).

### Formatting

Biome (not ESLint/Prettier): 2-space indent, single quotes, semicolons only as needed, 80-char line width. Always run `pnpm format` before committing.

## Git Hooks

Husky (`prepare: husky install`) installs two hooks:

- **pre-commit** — lint-staged runs `biome check --write` on every staged `*.{ts,tsx}` file (configured in `.lintstagedrc.json`)
- **commit-msg** — commitlint validates the message against `@commitlint/config-conventional` + `gitmoji` (`commitlint.config.ts`)

Commits that don't follow the convention below are rejected automatically.

## Commit Convention

Follows [iuricode/padroes-de-commits](https://github.com/iuricode/padroes-de-commits) combined with Conventional Commits. Format:

```txt
<emoji> <type>(<scope>): <description>
```

| Type | Emoji | When to use |
| ------ | ------- | ------------- |
| `feat` | ✨ | New feature |
| `fix` | 🐛 | Bug fix |
| `perf` | ⚡ | Performance improvement |
| `refactor` | ♻️ | Refactor without behavior change |
| `style` | 👌 | Formatting only (no logic change) |
| `docs` | 📚 | Documentation changes |
| `test` | ✅ | Adding or updating tests |
| `build` | 📦 | Build system or dependency changes |
| `chore` | 🔧 | Tooling, config, maintenance tasks |
| `ci` | 🧱 | CI/CD changes |
| `raw` | 🗃️ | Config files, data, parameters |
| `cleanup` | 🧹 | Remove commented code, improve readability |
| `remove` | 🗑️ | Delete obsolete files or features |

**Rules:**

- Single line only — no body, no footer, no `Co-Authored-By`
- Description must be specific and descriptive (say what changed and why, not just "update X")

**Examples:**

```txt
✨ feat(auth): add Google OAuth login with session persistence
🐛 fix(navbar): prevent scroll jump on mobile by offsetting 120px
⚡ perf(projects): move GitHub fetch server-side with 1h ISR revalidation
♻️ refactor(header): extract SocialLinks into its own component
🔧 chore(biome): enable format on save and set default formatter
```

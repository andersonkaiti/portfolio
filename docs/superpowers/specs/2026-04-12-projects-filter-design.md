# Projects Page Filtering — Design Spec

**Date:** 2026-04-12  
**Status:** Approved

## Summary

Add client-side filtering to the `/projects` page: a text search field and technology chip filters, both reflected in the URL via `nuqs`.

---

## Architecture

`page.tsx` remains a Server Component. It fetches all projects via `getProjects()` (ISR, 1h revalidate) and passes them down to `ProjectList` as props. No additional fetching is introduced.

`ProjectList` becomes a Client Component (`"use client"`). It holds filter state via `nuqs` URL params and derives the filtered list in a `useMemo`.

### URL Params (via `nuqs`)

| Param  | Type       | Example                       |
| ------ | ---------- | ----------------------------- |
| `q`    | `string`   | `?q=api`                      |
| `tech` | `string[]` | `?tech=react&tech=typescript` |

---

## Components

### `search-input.tsx`

- Controlled by the `q` URL param via `useQueryState`
- Input with a lucide `Search` icon on the left
- Clear button (`X`) shown when the field has a value
- Filters project `name` and `description` (case-insensitive)

### `tech-filter.tsx`

- Receives the full project list to derive available techs dynamically
- Available techs: all unique topics across projects that have a logo in `topicToLogo`
- Renders each tech as a clickable chip with its logo icon + formatted label (`formatTopic`)
- Selected chips have a visually distinct style (filled background or colored border)
- Clicking a selected chip deselects it
- Controlled by the `tech` array URL param via `useQueryState`

---

## Filter Logic (in `ProjectList`)

Derived via `useMemo` from `projects`, `q`, and `tech`:

1. **Text filter** (`q`): keeps projects where `name` or `description` contains `q` (case-insensitive)
2. **Tech filter** (`tech`): keeps projects whose `topics` array contains *at least one* of the selected techs (OR logic)
3. Both filters apply together with AND logic — a project must pass both

---

## Empty State

When no projects match the active filters:

- Show message: "Nenhum projeto encontrado para os filtros aplicados."
- Show a "Limpar filtros" button that resets both `q` and `tech` to their defaults

---

## Layout

```txt
[🔍 Buscar projetos...     ] [x]
[React] [TypeScript] [Node.js] [Next.js] ...

[ card ] [ card ]
[ card ] [ card ]
```

Filters sit above the project grid, inside `ProjectList`, below the "Back to home" button.

---

## Dependencies

- Install `nuqs` (not currently in `package.json`)
- No other new dependencies

---

## Files Affected

| File                                            | Change                                                                    |
| ----------------------------------------------- | ------------------------------------------------------------------------- |
| `src/app/projects/_components/project-list.tsx` | Add `"use client"`, integrate `nuqs`, filter logic, render new components |
| `src/app/projects/_components/search-input.tsx` | New component                                                             |
| `src/app/projects/_components/tech-filter.tsx`  | New component                                                             |
| `package.json` / `pnpm-lock.yaml`               | Add `nuqs`                                                                |

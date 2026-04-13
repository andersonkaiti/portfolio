import type { IGithubRepository } from '@http/get-projects'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
import { useMemo } from 'react'

interface UseProjectFiltersReturn {
  q: string
  setQ: (v: string | null) => void
  tech: string[]
  setTech: (v: string[] | null) => void
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

  function clearFilters() {
    setQ(null)
    setTech(null)
  }

  function toggleTech(topic: string) {
    setTech(
      tech.includes(topic) ? tech.filter((t) => t !== topic) : [...tech, topic],
    )
  }

  const hasActiveFilters = q.length > 0 || tech.length > 0

  return {
    q,
    setQ,
    tech,
    setTech,
    toggleTech,
    filteredProjects,
    clearFilters,
    hasActiveFilters,
  }
}

'use client'

import { Button } from '@components/ui/button'
import type { IGithubRepository } from '@http/get-projects'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useAvailableTechs } from '../_hooks/use-available-techs'
import { useProjectFilters } from '../_hooks/use-project-filters'
import { Project } from './project'
import { SearchInput } from './search-input'
import { TechFilter } from './tech-filter'

interface ProjectListProps {
  projects: IGithubRepository[]
}

export function ProjectList({ projects }: ProjectListProps) {
  const t = useTranslations('projects')
  const {
    q,
    setQ,
    tech,
    toggleTech,
    filteredProjects,
    clearFilters,
    hasActiveFilters,
  } = useProjectFilters(projects)
  const availableTechs = useAvailableTechs(projects)

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <Button asChild variant="ghost" className="self-start">
        <Link href="/">
          <ChevronLeft className="size-4" /> {t('backToHome')}
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
            {hasActiveFilters ? t('noProjectsFiltered') : t('noProjects')}
          </p>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              {t('clearFilters')}
            </Button>
          )}
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredProjects.map((project) => (
            <Project
              key={project.id}
              {...project}
              codeLabel={t('code')}
              demoLabel={t('demo')}
            />
          ))}
        </div>
      )}
    </div>
  )
}

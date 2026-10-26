'use client'

import { Button } from '@components/ui/button'
import { Reveal } from '@components/ui/reveal'
import type { IGithubRepository } from '@http/get-projects'
import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import { ArrowLeft, SearchX } from 'lucide-react'
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
    <div className="flex w-full flex-col gap-8">
      <Reveal>
        <Link
          href="/"
          className={cn(
            'inline-flex min-h-11 items-center gap-2.5 text-sm text-muted-foreground no-underline transition-colors hover:text-foreground',
            jetBrainsMono.className,
          )}
        >
          <ArrowLeft className="size-[18px]" /> {t('backToHome')}
        </Link>
      </Reveal>

      <Reveal delay={80}>
        <h1 className="font-display text-[clamp(40px,6vw,72px)] leading-[0.98] font-bold tracking-[-0.035em]">
          {t('title')}
        </h1>
      </Reveal>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span
          className={cn(
            'shrink-0 text-xs uppercase tracking-[0.14em] text-muted-foreground tabular-nums',
            jetBrainsMono.className,
          )}
        >
          {t('count', { count: filteredProjects.length })}
        </span>

        <div className="flex items-center gap-2 sm:max-w-md sm:flex-1">
          <SearchInput value={q} onChange={setQ} />

          <TechFilter
            availableTechs={availableTechs}
            selected={tech}
            onToggle={toggleTech}
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <SearchX className="size-10 text-muted-foreground/40" />
          <p className="font-medium text-foreground text-sm">
            {hasActiveFilters ? t('noProjectsFiltered') : t('noProjects')}
          </p>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              {t('clearFilters')}
            </Button>
          )}
        </div>
      ) : (
        <div className="mt-10 grid w-full grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] gap-x-12 gap-y-[72px]">
          {filteredProjects.map((project) => (
            <Project key={project.id} {...project} demoLabel={t('demo')} />
          ))}
        </div>
      )}
    </div>
  )
}

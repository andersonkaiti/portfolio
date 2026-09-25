import { Button } from '@components/ui/button'
import type { IGithubRepository } from '@http/get-projects'
import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Project } from './project'

interface ProjectListProps {
  projects: IGithubRepository[]
}

export async function ProjectList({ projects }: ProjectListProps) {
  const t = await getTranslations('projects')
  const latestsProjects = projects.slice(0, 2)

  return (
    <div
      className="flex flex-col gap-4"
      data-aos="fade-up"
      suppressHydrationWarning
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'text-xs uppercase tracking-[0.14em] text-muted-foreground tabular-nums',
            jetBrainsMono.className,
          )}
        >
          {t('count', { count: projects.length })}
        </span>

        <Button asChild variant="ghost" size="sm">
          <Link href="/projects">
            {t('viewAll')} <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {latestsProjects.map((project, index) => (
          <Project
            key={project.id}
            {...project}
            index={index}
            codeLabel={t('code')}
            demoLabel={t('demo')}
          />
        ))}
      </div>
    </div>
  )
}

import { Reveal } from '@components/ui/reveal'
import type { IGithubRepository } from '@http/get-projects'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Project } from './project'

interface ProjectListProps {
  projects: IGithubRepository[]
}

export async function ProjectList({ projects }: ProjectListProps) {
  const t = await getTranslations('projects')
  const latestsProjects = projects.slice(0, 3)

  return (
    <div>
      <div>
        {latestsProjects.map((project) => (
          <Project key={project.id} {...project} demoLabel={t('demo')} />
        ))}
      </div>

      <Reveal className="mt-14 flex justify-center">
        <Link
          href="/projects"
          className="ak-btn inline-flex min-h-16 items-center gap-3.5 rounded-full border-[1.5px] border-foreground px-8 text-[17px] font-semibold text-foreground no-underline hover:bg-foreground hover:text-background"
        >
          {t('viewAll')}
          <ArrowRight aria-hidden="true" className="size-5" />
        </Link>
      </Reveal>
    </div>
  )
}

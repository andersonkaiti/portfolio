import {
  SectionContainer,
  SectionLabel,
  SectionTitle,
} from '@components/ui/section'
import { getProjects } from '@http/get-projects'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { ProjectList } from './project-list'
import { ProjectSkeleton } from './project-skeleton'

export async function ProjectListSection() {
  const t = await getTranslations('projects')

  return (
    <SectionContainer id="projects" className="pt-12">
      <div className="space-y-3">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle className="sr-only">{t('title')}</SectionTitle>
      </div>

      <Suspense
        fallback={
          <div className="flex flex-col gap-16">
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
          </div>
        }
      >
        <ProjectListWrapper />
      </Suspense>
    </SectionContainer>
  )
}

async function ProjectListWrapper() {
  const projects = await getProjects()

  return <ProjectList projects={projects} />
}

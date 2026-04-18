import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionSubtitle,
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
    <SectionContainer id="projects">
      <SectionHeader>
        <SectionLabel>{t('label')}</SectionLabel>

        <SectionTitle>{t('title')}</SectionTitle>

        <SectionSubtitle>{t('subtitle')}</SectionSubtitle>
      </SectionHeader>

      <Suspense
        fallback={
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
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

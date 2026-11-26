import {
  SectionContainer,
  SectionLabel,
  SectionTitle,
} from '@components/ui/section'
import { getProjects } from '@http/get-projects'
import { getTranslations } from 'next-intl/server'
import { ProjectList } from './project-list'

export async function ProjectListSection() {
  const [t, projects] = await Promise.all([
    getTranslations('projects'),
    getProjects().catch(() => []),
  ])

  return (
    <SectionContainer id="projects" className="pt-12">
      <div className="space-y-3">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle className="sr-only">{t('title')}</SectionTitle>
      </div>

      <ProjectList projects={projects} />
    </SectionContainer>
  )
}

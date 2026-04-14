import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { getProjects } from '@http/get-projects'
import { Suspense } from 'react'
import { ProjectList } from './project-list'
import { ProjectSkeleton } from './project-skeleton'

export function ProjectListSection() {
  return (
    <SectionContainer id="projects">
      <SectionHeader>
        <SectionLabel>Work</SectionLabel>

        <SectionTitle>Projects</SectionTitle>

        <SectionSubtitle>
          Some of the projects I have developed along my journey
        </SectionSubtitle>
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

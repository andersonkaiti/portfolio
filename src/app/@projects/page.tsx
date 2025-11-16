export const dynamic = 'force-dynamic'

import {
  SectionContainer,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
  SectionUnderline,
} from '@components/ui/section'
import { getProjects } from '@http/get-projects'
import dynamicImport from 'next/dynamic'
import { Suspense } from 'react'
import { LoadingSkeleton } from './_components/loading-skeleton'

const DynamicProjectList = dynamicImport(() =>
  import('./_components/project-list').then((m) => m.ProjectList)
)

export default async function ProjectList() {
  const projects = await getProjects()

  return (
    <SectionContainer id="projects">
      <SectionHeader data-aos="fade-down">
        <SectionTitle>Projects</SectionTitle>
        <SectionSubtitle>
          Some of the projects I have developed along my journey
        </SectionSubtitle>
        <SectionUnderline />
      </SectionHeader>
      <Suspense fallback={<LoadingSkeleton />}>
        <DynamicProjectList projects={projects} />
      </Suspense>
    </SectionContainer>
  )
}

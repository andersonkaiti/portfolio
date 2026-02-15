import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { Suspense } from 'react'
import { LoadingSkeleton } from './_components/loading-skeleton'
import { ProjectList } from './_components/project-list'

export default function ProjectListSlot() {
  return (
    <SectionContainer id="projects">
      <SectionHeader data-aos="fade-down">
        <SectionLabel>Work</SectionLabel>

        <SectionTitle>Projects</SectionTitle>

        <SectionSubtitle>
          Some of the projects I have developed along my journey
        </SectionSubtitle>
      </SectionHeader>

      <Suspense fallback={<LoadingSkeleton />}>
        <ProjectList />
      </Suspense>
    </SectionContainer>
  )
}

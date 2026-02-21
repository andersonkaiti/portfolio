import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { Suspense } from 'react'
import { LoadingSkeleton } from './loading-skeleton'
import { ProjectList } from './project-list'

export function ProjectListSection() {
  return (
    <SectionContainer id="projects">
      <SectionHeader>
        <SectionLabel data-aos="fade-down">Work</SectionLabel>

        <SectionTitle data-aos="fade-down">Projects</SectionTitle>

        <SectionSubtitle data-aos="fade-down">
          Some of the projects I have developed along my journey
        </SectionSubtitle>
      </SectionHeader>

      <Suspense fallback={<LoadingSkeleton />}>
        <ProjectList />
      </Suspense>
    </SectionContainer>
  )
}

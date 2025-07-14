export const dynamic = 'force-dynamic'

import {
  SectionContainer,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import dynamicImport from 'next/dynamic'
import { Suspense } from 'react'
import { LoadingSkeleton } from './_components/loading-skeleton'

const DynamicProjectList = dynamicImport(() =>
  import('./_components/project-list').then((m) => m.ProjectList)
)

export default function ProjectList() {
  return (
    <SectionContainer id="projects">
      <SectionHeader>
        <SectionTitle>Projetos</SectionTitle>
        <SectionSubtitle>
          Alguns dos projetos que desenvolvi ao longo da minha jornada
        </SectionSubtitle>
      </SectionHeader>
      <Suspense fallback={<LoadingSkeleton />}>
        <DynamicProjectList />
      </Suspense>
    </SectionContainer>
  )
}

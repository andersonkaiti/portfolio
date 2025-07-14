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

const DynamicCertificationList = dynamicImport(() =>
  import('./_components/certification-list').then((m) => m.CertificationList)
)

export default function CertificationList() {
  return (
    <SectionContainer id="courses">
      <SectionHeader>
        <SectionTitle>Cursos e Certificações</SectionTitle>
        <SectionSubtitle>
          Meu compromisso com o aprendizado contínuo
        </SectionSubtitle>
      </SectionHeader>
      <Suspense fallback={<LoadingSkeleton />}>
        <DynamicCertificationList />
      </Suspense>
    </SectionContainer>
  )
}

import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { GithubGraph } from './github-graph'
import { LoadingSkeleton } from './loading-skeleton'

export async function AboutSection() {
  const t = await getTranslations('about')

  return (
    <SectionContainer id="about">
      <SectionHeader>
        <SectionLabel>{t('label')}</SectionLabel>

        <SectionTitle>{t('title')}</SectionTitle>

        <SectionSubtitle>{t('subtitle')}</SectionSubtitle>
      </SectionHeader>

      <div className="space-y-4">
        <p className="text-justify text-base leading-6 sm:leading-7 md:leading-8">
          {t.rich('p1', {
            b: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </p>

        <p className="text-justify text-base leading-6 sm:leading-7 md:leading-8">
          {t.rich('p2', {
            b: (chunks) => <span className="text-primary">{chunks}</span>,
            i: (chunks) => (
              <span className="italic text-primary">{chunks}</span>
            ),
          })}
        </p>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <GithubGraph />
      </Suspense>
    </SectionContainer>
  )
}

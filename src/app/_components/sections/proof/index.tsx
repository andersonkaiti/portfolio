import { Reveal } from '@components/ui/reveal'
import { SectionContainer, SectionTitle } from '@components/ui/section'
import { jetBrainsMono } from '@lib/fonts'
import { Cabinet, Hub, Riffle, Stack } from '@lucasmarkes/hairline/react'
import { cn } from 'cn'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { GithubGraph } from './github-graph'
import { LoadingSkeleton } from './loading-skeleton'
import { ProofStat } from './proof-stat'

const FIGURES = {
  stat1: Hub,
  stat2: Stack,
  stat3: Riffle,
  stat4: Cabinet,
} as const

const STATS = ['stat1', 'stat2', 'stat3', 'stat4'] as const

export async function ProofSection() {
  const t = await getTranslations('proof')

  return (
    <SectionContainer id="proof" className="space-y-12 pb-6">
      <Reveal>
        <SectionTitle>{t('title')}</SectionTitle>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-2">
        {STATS.map((stat, index) => {
          return (
            <ProofStat
              key={stat}
              index={index}
              value={t(`${stat}Value`)}
              label={t(`${stat}Label`)}
              note={t(`${stat}Note`)}
              Figure={FIGURES[stat]}
            />
          )
        })}
      </div>

      <div className="pt-8">
        <Reveal>
          <h3
            className={cn(
              'text-sm font-medium uppercase tracking-[0.04em] text-muted-foreground',
              jetBrainsMono.className,
            )}
          >
            {t('consistency')}
          </h3>
        </Reveal>

        <Reveal className="mt-6 space-y-8">
          <Suspense fallback={<LoadingSkeleton />}>
            <GithubGraph />
          </Suspense>
        </Reveal>
      </div>
    </SectionContainer>
  )
}

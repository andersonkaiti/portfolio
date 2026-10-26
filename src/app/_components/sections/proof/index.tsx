import { CountUp } from '@components/ui/count-up'
import { Reveal } from '@components/ui/reveal'
import { SectionContainer, SectionTitle } from '@components/ui/section'
import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { GithubGraph } from './github-graph'
import { LoadingSkeleton } from './loading-skeleton'

const STATS = ['stat1', 'stat2', 'stat3', 'stat4'] as const

export async function ProofSection() {
  const t = await getTranslations('proof')

  return (
    <SectionContainer id="proof" className="space-y-12 pb-6">
      <Reveal>
        <SectionTitle>{t('title')}</SectionTitle>
      </Reveal>

      <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(230px,100%),1fr))] gap-x-8 gap-y-10">
        {STATS.map((stat, index) => (
          <Reveal
            key={stat}
            delay={index * 80}
            className="relative flex flex-col gap-4 border-t border-dash/35 pt-7"
          >
            <span
              aria-hidden="true"
              className="absolute -top-[3px] left-0 h-1 w-14 rounded-sm bg-primary"
            />
            <strong className="font-display text-[clamp(64px,7vw,96px)] leading-[0.9] font-bold tracking-[-0.05em] text-primary tabular-nums">
              <CountUp value={t(`${stat}Value`)} />
            </strong>
            <div>
              <div className="text-[19px] font-semibold leading-tight">
                {t(`${stat}Label`)}
              </div>
              <div
                className={cn(
                  'mt-1.5 text-[13px] leading-normal text-muted-foreground',
                  jetBrainsMono.className,
                )}
              >
                {t(`${stat}Note`)}
              </div>
            </div>
          </Reveal>
        ))}
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

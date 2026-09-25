import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionTitle,
} from '@components/ui/section'
import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { GithubGraph } from './github-graph'
import { LoadingSkeleton } from './loading-skeleton'

function Stat({
  value,
  label,
  className,
  aosDelay,
  aosAnchor,
}: {
  value: string
  label: string
  className?: string
  aosDelay?: number
  aosAnchor?: string
}) {
  return (
    <div
      className={cn(
        'group/stat relative overflow-hidden border-border bg-background p-5 transition-colors duration-400 ease-[cubic-bezier(.25,0,.35,1)] hover:bg-accent/40 md:p-8',
        className,
      )}
      data-aos="fade-up"
      data-aos-delay={aosDelay}
      data-aos-anchor={aosAnchor}
      style={aosDelay ? { transitionDelay: `${aosDelay}ms` } : undefined}
      suppressHydrationWarning
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-8 w-px origin-top scale-y-0 bg-primary transition-transform duration-400 ease-[cubic-bezier(.25,0,.35,1)] group-hover/stat:scale-y-100"
      />
      <strong
        className={cn(
          'block text-4xl font-medium leading-none tracking-tight text-primary tabular-nums md:text-5xl',
          jetBrainsMono.className,
        )}
      >
        {value}
      </strong>
      <span
        className={cn(
          'mt-3 block text-[10px] uppercase leading-relaxed tracking-[.15em] text-muted-foreground md:mt-4 md:text-[11.5px] md:tracking-[.22em]',
          jetBrainsMono.className,
        )}
      >
        {label}
      </span>
    </div>
  )
}

export async function AboutSection() {
  const t = await getTranslations('about')

  return (
    <SectionContainer id="about">
      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-20">
        <div
          className="space-y-5"
          data-aos="fade-up"
          data-aos-delay={100}
          style={{ transitionDelay: '100ms' }}
          suppressHydrationWarning
        >
          <SectionHeader side="left" className="mb-6">
            <SectionLabel>{t('label')}</SectionLabel>
            <SectionTitle>
              {t.rich('title', {
                accent: (chunks) => (
                  <span className="text-primary">{chunks}</span>
                ),
              })}
            </SectionTitle>
          </SectionHeader>

          <p className="text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
            {t.rich('p1', {
              b: (chunks) => (
                <span className="font-medium text-foreground">{chunks}</span>
              ),
            })}
          </p>

          <p className="text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
            {t.rich('p2', {
              b: (chunks) => (
                <span className="font-medium text-foreground">{chunks}</span>
              ),
              i: (chunks) => (
                <em className="text-foreground not-italic">{chunks}</em>
              ),
            })}
          </p>
        </div>

        <div
          id="stats-grid"
          className="grid grid-cols-2 border border-border bg-card"
        >
          <Stat
            aosDelay={100}
            aosAnchor="#stats-grid"
            value={t('stat1Value')}
            label={t('stat1Label')}
            className="border-b border-r border-border"
          />
          <Stat
            aosDelay={200}
            aosAnchor="#stats-grid"
            value={t('stat2Value')}
            label={t('stat2Label')}
            className="border-b border-border"
          />
          <Stat
            aosDelay={300}
            aosAnchor="#stats-grid"
            value={t('stat3Value')}
            label={t('stat3Label')}
            className="border-r border-border"
          />
          <Stat
            aosDelay={400}
            aosAnchor="#stats-grid"
            value={t('stat4Value')}
            label={t('stat4Label')}
          />
        </div>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <GithubGraph />
      </Suspense>
    </SectionContainer>
  )
}

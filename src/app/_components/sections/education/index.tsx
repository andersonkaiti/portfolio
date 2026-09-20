import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionTitle,
} from '@components/ui/section'
import { jetBrainsMono } from '@lib/fonts'
import { cn } from '@lib/utils'
import { getTranslations } from 'next-intl/server'

function EducationRow({
  period,
  institution,
  title,
  description,
  badge,
  index,
}: {
  period: string
  institution: string
  title: string
  description: string
  badge: string
  index: number
}) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 80}
      style={{ transitionDelay: `${index * 80}ms` }}
      suppressHydrationWarning
    >
      <div className="group/row border-b border-border transition-colors duration-[400ms] ease-[cubic-bezier(.25,0,.35,1)] hover:bg-accent/30">
        <div className="grid grid-cols-1 gap-4 px-2 py-9 transition-[translate] duration-[400ms] ease-[cubic-bezier(.25,0,.35,1)] sm:px-0 md:grid-cols-[minmax(0,190px)_1fr] md:gap-10 md:group-hover/row:translate-x-4">
          <div className="flex flex-row items-center gap-3 md:flex-col md:items-start md:gap-2.5">
            <span
              className={cn(
                'text-[12.5px] uppercase leading-relaxed tracking-[.14em] text-muted-foreground',
                jetBrainsMono.className,
              )}
            >
              {period}
            </span>
            <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-500">
              {badge}
            </span>
          </div>

          <div className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
              <p
                className={cn(
                  'font-semibold text-primary',
                  jetBrainsMono.className,
                )}
              >
                {institution}
              </p>
            </div>
            <p className="max-w-[46rem] text-base leading-[1.75] text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function EducationSection() {
  const t = await getTranslations('education')

  return (
    <SectionContainer id="education">
      <SectionHeader side="left">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle>{t('title')}</SectionTitle>
      </SectionHeader>

      <div className="border-t border-border">
        <EducationRow
          period={t('degree.period')}
          institution={t('degree.institution')}
          title={t('degree.title')}
          description={t('degree.description')}
          badge={t('degree.badge')}
          index={0}
        />
        <EducationRow
          period={t('languages.period')}
          institution={t('languages.institution')}
          title={t('languages.title')}
          description={t('languages.description')}
          badge={t('languages.badge')}
          index={1}
        />
      </div>
    </SectionContainer>
  )
}

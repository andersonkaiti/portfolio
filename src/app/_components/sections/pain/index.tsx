import { Reveal } from '@components/ui/reveal'
import { SectionContainer, SectionTitle } from '@components/ui/section'
import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import { getTranslations } from 'next-intl/server'

export async function PainSection() {
  const t = await getTranslations('pain')
  const questions = [t('q1'), t('q2'), t('q3'), t('q4'), t('q5')]

  return (
    <SectionContainer className="space-y-0 pt-16 pb-4 md:pt-20">
      <Reveal>
        <SectionTitle>{t('title')}</SectionTitle>
      </Reveal>
      <p className="mt-1 max-w-[40em] text-lg text-body">{t('subtitle')}</p>
      <p className="mt-4 max-w-[40em] text-lg font-medium">{t('closing')}</p>

      <p
        className={cn(
          'mt-16 text-sm font-medium uppercase tracking-[0.04em] text-muted-foreground',
          jetBrainsMono.className,
        )}
      >
        {t('worry')}
      </p>

      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] gap-x-16 gap-y-12">
        {questions.map((question, index) => (
          <Reveal
            key={question}
            delay={index * 80}
            className="border-t border-dash/35 pt-7"
          >
            <p
              className={cn(
                'text-[13px] tracking-[0.06em] text-primary',
                jetBrainsMono.className,
              )}
            >
              {String(index + 1).padStart(2, '0')}
            </p>
            <p className="mt-4 max-w-[18em] font-display text-[clamp(22px,2.2vw,28px)] leading-[1.12] font-bold tracking-[-0.02em]">
              {question}
            </p>
          </Reveal>
        ))}
      </div>
    </SectionContainer>
  )
}

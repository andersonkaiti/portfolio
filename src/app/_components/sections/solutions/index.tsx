import { Reveal } from '@components/ui/reveal'
import { SectionBand, SectionTitle } from '@components/ui/section'
import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import { getTranslations } from 'next-intl/server'

const KEYS = ['s1', 's2', 's3', 's4', 's5', 's6'] as const

export async function SolutionsSection() {
  const t = await getTranslations('solutions')

  return (
    <SectionBand id="solutions" innerClassName="max-w-7xl py-14 md:py-20">
      <Reveal>
        <SectionTitle>{t('title')}</SectionTitle>
      </Reveal>

      <div className="mt-12">
        {KEYS.map((key, index) => (
          <Reveal
            key={key}
            delay={Math.min(index, 5) * 80}
            className="ak-row grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-baseline gap-x-8 gap-y-2 border-b border-dash/35 py-7 last:border-b-0"
          >
            <div className="flex items-center gap-5">
              <span
                className={cn(
                  'text-base text-primary',
                  jetBrainsMono.className,
                )}
              >
                {t(`${key}.num`)}
              </span>
              <h3 className="ak-row-title text-2xl font-bold tracking-[-0.02em]">
                {t(`${key}.title`)}
              </h3>
            </div>
            <p className="text-body">{t(`${key}.desc`)}</p>
          </Reveal>
        ))}
      </div>
    </SectionBand>
  )
}

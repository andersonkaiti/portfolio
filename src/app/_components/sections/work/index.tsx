import { Reveal } from '@components/ui/reveal'
import { SectionContainer, SectionTitle } from '@components/ui/section'
import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import { getTranslations } from 'next-intl/server'
import type { CSSProperties } from 'react'

const INCLUDES = ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'] as const

const ROWS = [
  ['bonus', 'bonusValue'],
  ['cost', 'costValue'],
  ['openTo', 'formatValue'],
  ['languages', 'languagesValue'],
] as const

const OBJECTIONS = ['1', '2', '3', '4'] as const

export async function WorkSection() {
  const t = await getTranslations('work')
  const tObjections = await getTranslations('objections')

  return (
    <SectionContainer className="pb-10">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] items-start gap-16">
        <div>
          <Reveal>
            <SectionTitle>{t('title')}</SectionTitle>
          </Reveal>

          <div className="mt-9">
            <Reveal className="flex flex-wrap gap-x-6 gap-y-1 border-b border-dash/35 py-5 last:border-b-0">
              <span
                className={cn(
                  'w-[110px] pt-1 text-sm text-muted-foreground',
                  jetBrainsMono.className,
                )}
              >
                {t('includes')}
              </span>
              <ul className="flex min-w-[200px] flex-1 flex-col gap-1.5 font-medium">
                {INCLUDES.map((item, index) => (
                  <li key={item} className="flex gap-2.5">
                    <svg
                      aria-hidden="true"
                      className="ak-tick mt-[5px] size-[18px] shrink-0 text-primary"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.6"
                      style={{ '--i': index } as CSSProperties}
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 12.5l5 5L20 6.5" pathLength="1" />
                    </svg>
                    {t(item)}
                  </li>
                ))}
              </ul>
            </Reveal>
            {ROWS.map(([label, value], index) => (
              <Reveal
                key={label}
                delay={index * 80}
                className="flex flex-wrap gap-x-6 gap-y-1 border-b border-dash/35 py-5 last:border-b-0"
              >
                <span
                  className={cn(
                    'w-[110px] pt-1 text-sm text-muted-foreground',
                    jetBrainsMono.className,
                  )}
                >
                  {t(label)}
                </span>
                <span className="min-w-[200px] flex-1 font-medium">
                  {t(value)}
                </span>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <Reveal>
            <SectionTitle>{tObjections('title')}</SectionTitle>
          </Reveal>

          <div className="mt-9 flex flex-col gap-7">
            {OBJECTIONS.map((n, index) => (
              <Reveal key={n} delay={index * 80}>
                <p className="font-display text-[22px] font-bold">
                  {tObjections(`q${n}`)}
                </p>
                <p className="mt-2 text-body">{tObjections(`a${n}`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

import { AnimatedText } from '@components/ui/animated-text'
import { Reveal } from '@components/ui/reveal'
import { getTranslations } from 'next-intl/server'

export async function RiskSection() {
  const t = await getTranslations('risk')

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pt-10 pb-14 md:pb-20">
      <Reveal className="flex flex-wrap items-center justify-between gap-x-12 gap-y-6 rounded-3xl bg-signal p-8 text-on-signal md:p-12">
        <AnimatedText className="max-w-[40em] font-display text-[clamp(24px,2.6vw,32px)] leading-[1.12] font-bold tracking-[-0.02em]">
          {t('text')}
        </AnimatedText>
        <a
          href="#contact"
          className="ak-btn inline-flex min-h-14 items-center rounded-full bg-on-signal px-8 text-lg font-semibold text-[#f2f4f1] no-underline"
        >
          {t('cta')}
        </a>
      </Reveal>
    </section>
  )
}

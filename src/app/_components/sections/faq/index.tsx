import { Reveal } from '@components/ui/reveal'
import { SectionTitle } from '@components/ui/section'
import { getTranslations } from 'next-intl/server'
import { FaqItem } from './faq-item'

const ITEMS = ['1', '2', '3', '4', '5', '6'] as const

export async function FaqSection() {
  const t = await getTranslations('faq')

  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-7xl scroll-mt-[120px] px-6 pb-14 md:pb-20"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] items-start gap-12">
        <Reveal>
          <SectionTitle>{t('title')}</SectionTitle>
        </Reveal>

        <div>
          {ITEMS.map((n, index) => (
            <Reveal
              key={n}
              delay={index * 60}
              className="[&:last-child>*]:border-b-0"
            >
              <FaqItem question={t(`q${n}`)} answer={t(`a${n}`)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

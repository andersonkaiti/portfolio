import { IsoDeco } from '@components/iso/iso-deco'
import { AnimatedText } from '@components/ui/animated-text'
import { Reveal } from '@components/ui/reveal'
import { getTranslations } from 'next-intl/server'

export async function ContactSection() {
  const t = await getTranslations('footer')

  const email = t('values.email')
  const linkedinUrl = `https://www.linkedin.com/in/${t('values.linkedin')}/`
  const githubUrl = `https://github.com/${t('values.github')}`
  const whatsappUrl = `https://wa.me/${t('values.whatsapp').replace(/\D/g, '')}`

  const outlined =
    'ak-btn inline-flex min-h-14 items-center rounded-full border-[1.5px] border-on-signal px-8 text-lg font-semibold text-on-signal no-underline hover:bg-on-signal hover:text-[#f2f4f1]'

  return (
    <section
      id="contact"
      className="ak-on-signal relative scroll-mt-[120px] overflow-hidden bg-signal text-on-signal selection:bg-on-signal selection:text-signal"
    >
      <IsoDeco
        className="absolute top-1/2 right-10 -mt-[208px] hidden w-[480px] lg:block"
        style={{ ['--iso-bg' as string]: 'var(--signal)' }}
      />

      <div className="mx-auto w-full max-w-7xl px-6 pt-20 pb-12">
        <Reveal>
          <AnimatedText
            as="h2"
            className="max-w-[11em] text-balance font-display text-[clamp(34px,4.6vw,60px)] leading-none font-bold tracking-[-0.035em]"
          >
            {t('title')}
          </AnimatedText>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-7 max-w-[30em] text-[22px] leading-[1.45] text-[#2a3a12]">
            {t('subtitle')}
          </p>
        </Reveal>

        <Reveal delay={160} className="mt-10 flex flex-wrap gap-4">
          <a
            href={`mailto:${email}`}
            className="ak-btn inline-flex min-h-14 items-center rounded-full bg-on-signal px-8 text-lg font-semibold text-[#f2f4f1] no-underline"
          >
            {t('emailCta')}
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={outlined}
          >
            {t('rows.linkedin')}
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={outlined}
          >
            {t('whatsappCta')}
          </a>
        </Reveal>

        <Reveal delay={200} className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-[17px] underline underline-offset-4"
          >
            {t('rows.github')}
          </a>
        </Reveal>

        <Reveal
          delay={240}
          className="mt-16 max-w-[42em] border-t border-on-signal/30 pt-8 text-lg text-[#2a3a12]"
        >
          <strong className="font-semibold text-on-signal">
            {t('psLabel')}
          </strong>{' '}
          {t('ps')}
        </Reveal>

        <p className="mt-14 font-mono text-[15px] text-[#2a3a12]">
          {t('tagline')}
        </p>
      </div>
    </section>
  )
}

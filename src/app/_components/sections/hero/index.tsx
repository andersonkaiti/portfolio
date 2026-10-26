import { IsoHeroArt } from '@components/iso/iso-hero-art'
import { Reveal } from '@components/ui/reveal'
import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export async function HeroSection() {
  const t = await getTranslations('hero')
  const tFooter = await getTranslations('footer')

  const linkedinUrl = `https://linkedin.com/in/${tFooter('values.linkedin')}`

  return (
    <header
      className="mx-auto grid w-full max-w-7xl scroll-mt-[150px] items-center gap-x-6 gap-y-8 px-6 pt-28 pb-24 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] lg:min-h-[calc(100svh-6rem)] lg:pt-40 lg:pb-32"
      id="hero"
    >
      <div className="min-w-0">
        <Reveal delay={100}>
          <div
            className={cn(
              'inline-flex items-center gap-2.5 py-2 text-base text-body',
              jetBrainsMono.className,
            )}
          >
            <span className="ak-pulse-dot block size-2 rounded-full bg-primary text-primary" />
            {t('available')}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <h1 className="mt-10 text-balance font-bold leading-[0.96] tracking-[-0.04em] text-[clamp(36px,min(4.2vw,6vh),60px)]">
            {t('headlinePre')}{' '}
            <span
              className="ak-underline-draw"
              style={{
                backgroundImage:
                  'linear-gradient(var(--signal), var(--signal))',
              }}
            >
              {t('headlineAccent')}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-12 max-w-[34em] text-[clamp(18px,1.9vw,23px)] leading-[1.45] text-body">
            {t('subtitle')}
          </p>
        </Reveal>

        <Reveal delay={400} className="mt-14 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="ak-btn inline-flex min-h-16 items-center gap-5 rounded-full bg-signal py-0 pr-2.5 pl-8 text-[17px] font-semibold text-on-signal no-underline"
          >
            {t('cta')}
            <span
              aria-hidden="true"
              className="inline-flex size-11 items-center justify-center rounded-full bg-on-signal text-signal"
            >
              <ArrowRight className="size-5" />
            </span>
          </a>

          <Link
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ak-btn inline-flex min-h-16 items-center gap-3 rounded-full border-[1.5px] border-foreground px-8 text-[17px] font-semibold text-foreground no-underline hover:bg-foreground hover:text-background"
          >
            {t('linkedin')}
            <ArrowUpRight aria-hidden="true" className="size-5" />
          </Link>
        </Reveal>

        <Reveal delay={500}>
          <p
            className={cn(
              'mt-6 text-[13px] text-muted-foreground',
              jetBrainsMono.className,
            )}
          >
            {t('note')}
          </p>
        </Reveal>
      </div>

      <Reveal delay={300} className="hidden min-w-0 lg:block">
        <IsoHeroArt
          label={t('artLabel')}
          layers={[t('layerUi'), t('layerApi'), t('layerDb')]}
        />
      </Reveal>
    </header>
  )
}

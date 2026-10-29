import { IsoDeco } from '@components/iso/iso-deco'
import { Reveal } from '@components/ui/reveal'
import { getInfoPage, type InfoPageKey } from '@lib/agents/content'
import { CONTACT } from '@lib/agents/site'
import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

const OTHER_PAGES: Record<InfoPageKey, InfoPageKey[]> = {
  about: ['contact', 'privacy'],
  contact: ['about', 'privacy'],
  privacy: ['about', 'contact'],
}

export async function getInfoPageMetadata(key: InfoPageKey): Promise<Metadata> {
  const t = await getTranslations(`pages.${key}`)
  const url = `https://andersonkaiti.com/${key}`

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: url },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url,
    },
  }
}

export async function InfoPage({ pageKey }: { pageKey: InfoPageKey }) {
  const [page, t] = await Promise.all([
    getInfoPage(pageKey),
    getTranslations('pages'),
  ])

  const contactLinks = [
    { label: t('contactLinks.email'), href: `mailto:${CONTACT.email}` },
    { label: t('contactLinks.whatsapp'), href: CONTACT.whatsappUrl },
    { label: t('contactLinks.linkedin'), href: CONTACT.linkedinUrl },
    { label: t('contactLinks.github'), href: CONTACT.githubUrl },
  ]

  return (
    <main className="relative mx-auto w-full max-w-7xl px-6 pt-[72px] pb-28">
      <IsoDeco
        className="absolute top-6 right-6 hidden w-[280px] lg:block"
        style={{ ['--iso-bg' as string]: 'var(--background)' }}
      />

      <div className="flex max-w-3xl flex-col gap-8">
        <Reveal>
          <Link
            href="/"
            className={cn(
              'inline-flex min-h-11 items-center gap-2.5 text-sm text-muted-foreground no-underline transition-colors hover:text-foreground',
              jetBrainsMono.className,
            )}
          >
            <ArrowLeft className="size-[18px]" /> {t('home')}
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="font-display text-[clamp(40px,6vw,72px)] leading-[0.98] font-bold tracking-[-0.035em]">
            {page.title}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="max-w-[34em] text-[clamp(18px,1.9vw,23px)] leading-[1.45] text-body">
            {page.lead}
          </p>
        </Reveal>

        {pageKey === 'contact' && (
          <Reveal delay={200} className="flex flex-wrap gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="ak-btn inline-flex min-h-12 items-center rounded-full border-[1.5px] border-foreground px-6 text-base font-semibold text-foreground no-underline hover:bg-foreground hover:text-background"
              >
                {link.label}
              </a>
            ))}
          </Reveal>
        )}

        {page.sections.map((section) => (
          <section
            key={section.heading}
            className="flex flex-col gap-4 border-t border-dash/35 pt-8"
          >
            <h2 className="font-display text-2xl leading-tight font-bold tracking-[-0.02em]">
              {section.heading}
            </h2>
            {section.body.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[40em] text-lg leading-[1.6] text-body"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <nav
          aria-label="Site"
          className={cn(
            'flex flex-wrap gap-x-6 gap-y-2 border-t border-dash/35 pt-8 text-sm',
            jetBrainsMono.className,
          )}
        >
          {OTHER_PAGES[pageKey].map((other) => (
            <Link
              key={other}
              href={`/${other}`}
              className="inline-flex min-h-11 items-center text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              {t(`nav.${other}`)}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  )
}

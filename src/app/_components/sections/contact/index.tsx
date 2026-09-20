import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export async function ContactSection() {
  const t = await getTranslations('footer')

  const contactRows = [
    {
      label: t('rows.email'),
      value: t('values.email'),
      href: 'mailto:anderkaiti@gmail.com',
      external: false,
    },
    {
      label: t('rows.whatsapp'),
      value: t('values.whatsapp'),
      href: 'https://wa.me/14998053657',
      external: true,
    },
    {
      label: t('rows.linkedin'),
      value: t('values.linkedin'),
      href: 'https://www.linkedin.com/in/andersonkaiti/',
      external: true,
    },
    {
      label: t('rows.github'),
      value: t('values.github'),
      href: 'https://github.com/andersonkaiti',
      external: true,
    },
  ]

  return (
    <SectionContainer id="contact">
      <SectionHeader side="left">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle>
          {t.rich('title', {
            accent: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </SectionTitle>
        <SectionSubtitle>{t('subtitle')}</SectionSubtitle>
      </SectionHeader>

      <div className="border-t border-border">
        {contactRows.map((row, index) => (
          <div
            key={row.label}
            data-aos="fade-up"
            data-aos-delay={index * 50}
            style={{ transitionDelay: `${index * 50}ms` }}
            suppressHydrationWarning
          >
            <div className="group/row border-b border-border transition-colors duration-[250ms] ease-[cubic-bezier(.25,0,.35,1)] hover:bg-accent/30">
              <Link
                href={row.href}
                target={row.external ? '_blank' : undefined}
                rel={row.external ? 'noopener noreferrer' : undefined}
                className="grid grid-cols-[minmax(0,140px)_1fr_auto] items-center gap-4 px-3 py-6 text-inherit no-underline transition-[translate] duration-[250ms] ease-[cubic-bezier(.25,0,.35,1)] group-hover/row:translate-x-4 sm:px-2 sm:grid-cols-[minmax(0,180px)_1fr_auto] sm:gap-7"
              >
                <span
                  className={cn(
                    'text-[11.5px] font-medium uppercase tracking-[.16em] text-muted-foreground',
                    jetBrainsMono.className,
                  )}
                >
                  {row.label}
                </span>
                <span className="truncate text-base text-foreground sm:text-[17.5px]">
                  {row.value}
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-primary" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  )
}

import { ArrowRight, Github, Linkedin, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export async function HeaderSection() {
  const t = await getTranslations('header')
  const tFooter = await getTranslations('footer')

  const githubUrl = `https://github.com/${tFooter('values.github')}`
  const linkedinUrl = `https://linkedin.com/in/${tFooter('values.linkedin')}`
  const whatsappNumber = tFooter('values.whatsapp').replace(/\D/g, '')
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  return (
    <header
      className="flex scroll-mt-[150px] flex-col items-center gap-8 text-center"
      id="presentation"
    >
      <div
        className="flex items-center gap-2.5 sm:gap-3"
        data-aos="fade-up"
        data-aos-delay={100}
        style={{ transitionDelay: '100ms' }}
        suppressHydrationWarning
      >
        <div className="size-2 animate-pulse rounded-full bg-green-500 sm:size-2.5" />
        <span className="font-medium text-green-700 text-xs sm:text-sm dark:text-green-400 tracking-wide">
          {t('available')}
        </span>
      </div>

      <div
        className="flex flex-col gap-5"
        data-aos="fade-up"
        data-aos-delay={200}
        style={{ transitionDelay: '200ms' }}
        suppressHydrationWarning
      >
        <h1 className="text-balance font-bold tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05]">
          {t('title')}
        </h1>

        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-10 bg-primary/40 sm:w-14" />
          <p className="font-mono text-[11px] sm:text-xs font-medium tracking-[0.3em] text-primary uppercase">
            {t('role')}
          </p>
          <div className="h-px w-10 bg-primary/40 sm:w-14" />
        </div>
      </div>

      <p
        className="max-w-xl text-balance text-center text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
        data-aos="fade-up"
        data-aos-delay={300}
        style={{ transitionDelay: '300ms' }}
        suppressHydrationWarning
      >
        {t.rich('description', {
          b: (chunks) => (
            <span className="font-semibold text-foreground">{chunks}</span>
          ),
        })}
      </p>

      <div
        className="flex flex-col items-center gap-4"
        data-aos="fade-up"
        data-aos-delay={400}
        style={{ transitionDelay: '400ms' }}
        suppressHydrationWarning
      >
        <a
          href="#contact"
          className="group inline-flex h-11 items-center justify-center gap-2.5 rounded-full border border-foreground/25 px-7 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-foreground hover:text-background active:scale-95"
        >
          {t('cta')}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>

        <div className="flex items-center gap-0.5">
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('social.github')}
            className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="size-5" />
          </Link>
          <Link
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('social.linkedin')}
            className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
          >
            <Linkedin className="size-5" />
          </Link>
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('social.whatsapp')}
            className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
          >
            <MessageCircle className="size-5" />
          </Link>
        </div>
      </div>
    </header>
  )
}

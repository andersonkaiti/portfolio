import { getTranslations } from 'next-intl/server'

export async function HeaderSection() {
  const t = await getTranslations('header')

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
        className="max-w-xl text-balance text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
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
    </header>
  )
}

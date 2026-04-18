import { Button } from '@components/ui/button'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { links } from './socials'

export async function HeaderSection() {
  const t = await getTranslations('header')

  return (
    <header
      className="mx-2 my-10 flex flex-col gap-6 text-center sm:mx-8 sm:my-16 md:mx-20 md:my-24 lg:mx-24 lg:my-24"
      id="presentation"
    >
      <div className="relative mx-auto w-fit">
        <div className="-top-8 -translate-x-1/2 absolute left-1/2 flex items-center gap-2 sm:gap-3">
          <div className="size-2 animate-pulse rounded-full bg-green-500 sm:size-3" />
          <span className="font-medium text-green-700 text-xs sm:text-sm dark:text-green-400">
            {t('available')}
          </span>
        </div>

        <h1 className="scroll-m-20 text-balance text-center font-bold text-3xl xs:text-4xl tracking-tight sm:text-5xl">
          {t('title')}
        </h1>
      </div>

      <div className="mt-3 flex items-center justify-center gap-4">
        <div className="h-px w-12 bg-primary/40" />
        <p className="font-mono text-xs font-medium tracking-[0.3em] text-primary uppercase">
          {t('role')}
        </p>
        <div className="h-px w-12 bg-primary/40" />
      </div>

      <p className="mx-auto mt-3 max-w-2xl text-balance font-base text-base leading-6 sm:mt-4 sm:text-lg sm:leading-7 md:text-xl md:leading-8">
        {t.rich('description', {
          b: (chunks) => (
            <span className="font-semibold text-primary">{chunks}</span>
          ),
        })}
      </p>

      <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-5 text-muted-foreground sm:mt-10 sm:gap-8">
        {links.map(({ id, ariaLabelKey, href, icon: Icon }) => (
          <Button
            asChild
            key={id}
            variant="ghost"
            size="icon"
            className="border border-border hover:border-primary"
          >
            <Link
              aria-label={t(ariaLabelKey)}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <Icon className="size-5" />
            </Link>
          </Button>
        ))}
      </div>
    </header>
  )
}

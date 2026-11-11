import { FIGURE_THEME } from '@components/iso/figure-theme'
import { Button } from '@components/ui/button'
import { jetBrainsMono } from '@lib/fonts'
import { Drawer } from '@lucasmarkes/hairline/react'
import { cn } from 'cn'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function NotFound() {
  const t = await getTranslations('notFound')

  return (
    <main className="mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl flex-col items-center justify-center gap-6 px-8 py-16 text-center md:px-20">
      <Drawer
        aria-hidden="true"
        tabIndex={-1}
        className="w-[260px] sm:w-[340px]"
        style={FIGURE_THEME}
      />

      <span
        className={cn(
          'text-sm font-medium tracking-[0.2em] uppercase text-primary',
          jetBrainsMono.className,
        )}
      >
        {t('label')}
      </span>

      <div className="flex flex-col gap-3">
        <h1 className="text-balance font-bold tracking-tight text-4xl sm:text-5xl">
          {t('title')}
        </h1>
        <p className="max-w-md text-balance text-base text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button asChild>
          <Link href="/">
            <ChevronLeft className="size-4" /> {t('home')}
          </Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/projects">{t('projects')}</Link>
        </Button>
      </div>
    </main>
  )
}

import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import { getTranslations } from 'next-intl/server'

export async function Footer() {
  const t = await getTranslations('footer')

  return (
    <footer className="mx-auto max-w-7xl px-8 pb-10 pt-16 md:px-20 md:pb-12">
      <div className="border-t border-border pt-8">
        <div className="flex flex-col gap-1">
          <span
            className={cn(
              'text-base font-medium tracking-wider text-primary',
              jetBrainsMono.className,
            )}
          >
            AK
          </span>
          <p className="text-xs text-muted-foreground">{t('tagline')}</p>
        </div>
      </div>
    </footer>
  )
}

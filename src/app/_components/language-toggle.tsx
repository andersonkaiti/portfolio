'use client'

import { Button } from '@components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { cn } from '@lib/utils'
import { setCookie } from 'cookies-next'
import { Check, Languages, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useTransition } from 'react'

export function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleLocaleChange(newLocale: 'en' | 'pt-BR') {
    if (newLocale === locale) {
      return
    }

    startTransition(() => {
      setCookie('NEXT_LOCALE', newLocale, {
        maxAge: 31536000,
        path: '/',
        sameSite: 'lax',
      })

      router.refresh()
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={locale === 'en' ? 'Select language' : 'Selecionar idioma'}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Languages className="size-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-40 p-2">
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleLocaleChange('en')}
            disabled={isPending}
            className={cn(
              'flex w-full items-center justify-between px-2 py-1.5 text-sm font-normal',
              locale === 'en' && 'bg-accent/50 text-primary font-semibold',
            )}
          >
            <span>English</span>
            {locale === 'en' && <Check className="size-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleLocaleChange('pt-BR')}
            disabled={isPending}
            className={cn(
              'flex w-full items-center justify-between px-2 py-1.5 text-sm font-normal',
              locale === 'pt-BR' && 'bg-accent/50 text-primary font-semibold',
            )}
          >
            <span>Português</span>
            {locale === 'pt-BR' && <Check className="size-4" />}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

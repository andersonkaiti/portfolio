'use client'

import { Button } from '@components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import { setCookie } from 'cookies-next'
import { Check, Loader2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
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
          <AnimatePresence mode="popLayout" initial={false}>
            {isPending ? (
              <motion.span
                key="pending"
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="flex"
              >
                <Loader2 className="size-4 animate-spin" />
              </motion.span>
            ) : (
              <motion.span
                key={locale}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={cn(
                  'text-[11px] font-medium uppercase tracking-widest',
                  jetBrainsMono.className,
                )}
              >
                {locale === 'pt-BR' ? 'PT' : 'EN'}
              </motion.span>
            )}
          </AnimatePresence>
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
            {locale === 'en' && <CheckMark />}
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
            {locale === 'pt-BR' && <CheckMark />}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function CheckMark() {
  return (
    <motion.span
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 24 }}
      className="flex"
    >
      <Check className="size-4" />
    </motion.span>
  )
}

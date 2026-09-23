import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import { Github, Linkedin, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export async function Footer() {
  let tagline = 'Crafted by Anderson Kaiti · 2026'
  let githubUrl = 'https://github.com/andersonkaiti'
  let linkedinUrl = 'https://linkedin.com/in/andersonkaiti'
  let whatsappUrl = 'https://wa.me/14998053657'

  try {
    const t = await getTranslations('footer')
    tagline = t('tagline')
    githubUrl = `https://github.com/${t('values.github')}`
    linkedinUrl = `https://linkedin.com/in/${t('values.linkedin')}`
    whatsappUrl = `https://wa.me/${t('values.whatsapp').replace(/\D/g, '')}`
  } catch {}

  return (
    <footer className="mx-auto max-w-7xl px-8 pb-10 pt-16 md:px-20 md:pb-12">
      <div className="border-t border-border pt-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span
              className={cn(
                'text-sm font-medium tracking-wider text-primary',
                jetBrainsMono.className,
              )}
            >
              AK
            </span>
            <p className="text-xs text-muted-foreground">{tagline}</p>
          </div>

          <div className="flex items-center gap-0.5">
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="size-4" />
            </Link>
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="size-4" />
            </Link>
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            >
              <MessageCircle className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

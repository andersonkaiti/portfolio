'use client'

import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  Navbar,
  NavItems,
} from '@components/ui/resizable-navbar'
import { useLenis } from '@providers/lenis'
import { cn } from 'cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { DarkModeButton } from './dark-mode-button'
import { LanguageToggle } from './language-toggle'

export interface NavItem {
  name: string
  link: string
}

const FOLD =
  'inline-grid grid-cols-[1fr] transition-[grid-template-columns,opacity,filter] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-data-[visible=true]/nav:grid-cols-[0fr] group-data-[visible=true]/nav:opacity-0 group-data-[visible=true]/nav:blur-sm motion-reduce:transition-none'

function Logo() {
  return (
    <Link
      href="/"
      aria-label="Anderson Kaiti"
      className="inline-flex items-baseline font-display text-2xl leading-none font-normal tracking-[-0.035em] whitespace-nowrap text-foreground no-underline"
    >
      <span aria-hidden="true" className="inline-flex items-baseline">
        <span>A</span>
        <span className={cn(FOLD, 'delay-75')}>
          <span className="overflow-hidden whitespace-pre">nderson </span>
        </span>
        <span>K</span>
        <span className={FOLD}>
          <span className="overflow-hidden whitespace-pre">aiti</span>
        </span>
      </span>
    </Link>
  )
}

interface CtaButtonProps {
  label: string
  link: string
  onNavigate: (link: string) => void
}

function CtaButton({ label, link, onNavigate }: CtaButtonProps) {
  return (
    <a
      href={link}
      onClick={(event) => {
        if (link.startsWith('/')) {
          return
        }

        event.preventDefault()
        onNavigate(link)
      }}
      className="ml-1 inline-flex min-h-10 items-center rounded-full bg-foreground px-5 text-base font-semibold whitespace-nowrap text-background no-underline transition-opacity hover:opacity-85"
    >
      {label}
    </a>
  )
}

export function NavigationBar() {
  const { handleNavClick } = useLenis()
  const t = useTranslations('nav')
  const pathname = usePathname()
  const isSubPage = pathname !== '/'

  const navItems: NavItem[] = [
    {
      name: t('solutions'),
      link: isSubPage ? '/#solutions' : '#solutions',
    },
    {
      name: t('experiences'),
      link: isSubPage ? '/#experiences' : '#experiences',
    },
    { name: t('projects'), link: isSubPage ? '/#projects' : '#projects' },
    { name: t('faq'), link: isSubPage ? '/#faq' : '#faq' },
    { name: t('contact'), link: isSubPage ? '/#contact' : '#contact' },
  ]

  const contactLink = isSubPage ? '/#contact' : '#contact'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <Logo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-1">
          <LanguageToggle />
          <DarkModeButton />
          <CtaButton
            label={t('cta')}
            link={contactLink}
            onNavigate={handleNavClick}
          />
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <DarkModeButton />
          </div>
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item: NavItem, index: number) => (
            <a
              className="relative text-muted-foreground transition-colors hover:text-foreground"
              data-aos="fade-down"
              data-aos-delay={60 * index}
              style={{ transitionDelay: `${60 * index}ms` }}
              suppressHydrationWarning
              href={item.link}
              key={`mobile-link-${item.name}`}
              onClick={(event) => {
                if (item.link.startsWith('/')) {
                  setIsMobileMenuOpen(false)
                  return
                }

                event.preventDefault()
                setIsMobileMenuOpen(false)
                handleNavClick(item.link)
              }}
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}

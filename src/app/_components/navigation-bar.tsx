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

function Logo() {
  return (
    <Link
      href="/"
      aria-label="Anderson Kaiti"
      className="inline-grid font-display text-2xl leading-none font-normal tracking-[-0.035em] whitespace-nowrap text-foreground no-underline"
    >
      <span className="col-start-1 row-start-1 transition-[opacity,transform,filter] duration-500 ease-out group-data-[visible=true]/nav:pointer-events-none group-data-[visible=true]/nav:-translate-y-3 group-data-[visible=true]/nav:opacity-0 group-data-[visible=true]/nav:blur-sm motion-reduce:transition-none">
        Anderson Kaiti
      </span>
      <span
        aria-hidden="true"
        className="col-start-1 row-start-1 translate-y-3 opacity-0 blur-sm transition-[opacity,transform,filter] duration-500 ease-out group-data-[visible=true]/nav:translate-x-4 group-data-[visible=true]/nav:translate-y-0 group-data-[visible=true]/nav:opacity-100 group-data-[visible=true]/nav:blur-none motion-reduce:transition-none"
      >
        AK
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
  const isProjectPage = pathname.includes('/projects')

  const navItems: NavItem[] = [
    {
      name: t('solutions'),
      link: isProjectPage ? '/#solutions' : '#solutions',
    },
    {
      name: t('experiences'),
      link: isProjectPage ? '/#experiences' : '#experiences',
    },
    { name: t('projects'), link: isProjectPage ? '/#projects' : '#projects' },
    { name: t('faq'), link: isProjectPage ? '/#faq' : '#faq' },
    { name: t('contact'), link: isProjectPage ? '/#contact' : '#contact' },
  ]

  const contactLink = isProjectPage ? '/#contact' : '#contact'
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

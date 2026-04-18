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
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { DarkModeButton } from './dark-mode-button'
import { LanguageToggle } from './language-toggle'

export interface NavItem {
  name: string
  link: string
}

export function NavigationBar() {
  const { handleNavClick } = useLenis()
  const t = useTranslations('nav')

  const navItems: NavItem[] = [
    { name: t('introduction'), link: '#presentation' },
    { name: t('about'), link: '#about' },
    { name: t('experiences'), link: '#experiences' },
    { name: t('projects'), link: '#projects' },
    { name: t('technologies'), link: '#technologies' },
    { name: t('education'), link: '#education' },
    { name: t('contact'), link: '#contact' },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavItems items={navItems} />
        <LanguageToggle />
        <DarkModeButton />
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
              className="relative text-neutral-600 dark:text-neutral-300"
              data-aos="fade-down"
              data-aos-delay={60 * index}
              href={item.link}
              key={`mobile-link-${item.name}`}
              onClick={(event) => {
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

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
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()
  const isProjectPage = pathname.includes('/projects')

  const navItems: NavItem[] = [
    {
      name: t('introduction'),
      link: isProjectPage ? '/#presentation' : '#presentation',
    },
    { name: t('about'), link: isProjectPage ? '/#about' : '#about' },
    {
      name: t('experiences'),
      link: isProjectPage ? '/#experiences' : '#experiences',
    },
    { name: t('projects'), link: isProjectPage ? '/#projects' : '#projects' },
    {
      name: t('technologies'),
      link: isProjectPage ? '/#technologies' : '#technologies',
    },
    {
      name: t('education'),
      link: isProjectPage ? '/#education' : '#education',
    },
    { name: t('contact'), link: isProjectPage ? '/#contact' : '#contact' },
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

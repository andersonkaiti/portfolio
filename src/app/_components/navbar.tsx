'use client'

import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavBody,
  NavItems,
} from '@components/ui/resizable-navbar'
import { useLenis } from '@providers/lenis'
import { useState } from 'react'
import { DarkModeButton } from './dark-mode-button'

export interface NavItem {
  name: string
  link: string
}

export function NavigationBar() {
  const { handleNavClick } = useLenis()

  const navItems: NavItem[] = [
    {
      name: 'Apresentação',
      link: '#presentation',
    },
    {
      name: 'Tecnologias',
      link: '#technologies',
    },
    {
      name: 'Projetos',
      link: '#projects',
    },
    {
      name: 'Formações',
      link: '#education',
    },
    {
      name: 'Cursos',
      link: '#courses',
    },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavItems items={navItems} />
        <DarkModeButton />
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item: NavItem, index: number) => (
            <a
              className="relative text-neutral-600 dark:text-neutral-300"
              data-aos="fade-down"
              data-aos-delay={200 * index}
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
        <DarkModeButton />
      </MobileNav>
    </Navbar>
  )
}

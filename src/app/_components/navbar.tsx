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
import { useState } from 'react'

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
      name: 'Technologias',
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
          {navItems.map((item: NavItem) => (
            <a
              className="relative text-neutral-600 dark:text-neutral-300"
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

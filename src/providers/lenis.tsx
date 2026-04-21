'use client'

import { usePathname } from 'next/navigation'
import type React from 'react'
import { createContext, useCallback, useContext, useEffect } from 'react'

interface ILenisContext {
  handleNavClick(link: string): void
}

const LenisContext = createContext<ILenisContext>({} as ILenisContext)

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const handleNavClick = useCallback((link: string) => {
    const hashIndex = link.indexOf('#')

    if (hashIndex === -1) {
      return
    }

    const id = link.substring(hashIndex)

    const element = document.querySelector(id)

    if (element instanceof HTMLElement) {
      element.scrollIntoView({ behavior: 'auto' })
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash && pathname) {
      window.scrollTo(0, 0)

      const hash = window.location.hash

      const timeoutId = setTimeout(() => {
        handleNavClick(hash)
      }, 500)
      return () => clearTimeout(timeoutId)
    }
  }, [pathname, handleNavClick])

  return <LenisContext value={{ handleNavClick }}>{children}</LenisContext>
}

export function useLenis() {
  return useContext(LenisContext)
}

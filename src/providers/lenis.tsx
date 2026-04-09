'use client'

import type React from 'react'
import { createContext, useContext } from 'react'

interface ILenisContext {
  handleNavClick(link: string): void
}

const LenisContext = createContext<ILenisContext>({} as ILenisContext)

export function LenisProvider({ children }: { children: React.ReactNode }) {
  function handleNavClick(link: string) {
    const element = document.querySelector(link)
    if (element instanceof HTMLElement) {
      const top = element.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return <LenisContext value={{ handleNavClick }}>{children}</LenisContext>
}

export function useLenis() {
  return useContext(LenisContext)
}

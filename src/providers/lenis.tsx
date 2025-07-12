'use client'

import Lenis from 'lenis'
import type React from 'react'
import { createContext, useContext, useEffect, useRef } from 'react'

interface ILenisContext {
  handleNavClick(link: string): void
}

const LenisContext = createContext<ILenisContext>({} as ILenisContext)

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    lenisRef.current = new Lenis({ duration: 1.2 })

    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenisRef.current?.destroy()
    }
  }, [])

  function handleNavClick(link: string) {
    const element = document.querySelector(link)

    if (element instanceof HTMLElement) {
      lenisRef.current?.scrollTo(element, {
        offset: -120,
        duration: 1.2,
      })
    }
  }

  return <LenisContext value={{ handleNavClick }}>{children}</LenisContext>
}

export function useLenis() {
  return useContext(LenisContext)
}

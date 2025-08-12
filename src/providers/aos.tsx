'use client'

import AOS from 'aos'
import 'aos/dist/aos.css'
import type React from 'react'
import { useEffect } from 'react'

export function AosProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      delay: 50,
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
    })
  }, [])

  return <>{children}</>
}

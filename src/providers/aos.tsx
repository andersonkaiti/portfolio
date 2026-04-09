'use client'

import type React from 'react'
import { useEffect } from 'react'

export function AosProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-aos]')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )

    for (const el of elements) {
      const delay = el.getAttribute('data-aos-delay')
      if (delay) {
        ;(el as HTMLElement).style.transitionDelay = `${delay}ms`
      }
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return <>{children}</>
}

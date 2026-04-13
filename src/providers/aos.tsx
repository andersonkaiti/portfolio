'use client'

import type React from 'react'
import { useEffect } from 'react'

export function AosProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
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

    const observedSet = new WeakSet()

    const observeElements = () => {
      const elements = document.querySelectorAll('[data-aos]')
      for (const el of elements) {
        if (!observedSet.has(el)) {
          const delay = el.getAttribute('data-aos-delay')
          if (delay) {
            ;(el as HTMLElement).style.transitionDelay = `${delay}ms`
          }
          observer.observe(el)
          observedSet.add(el)
        }
      }
    }

    // Initial observation
    observeElements()

    // Watch for new elements added dynamically (e.g., via Suspense)
    const mutationObserver = new MutationObserver(() => {
      observeElements()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return <>{children}</>
}

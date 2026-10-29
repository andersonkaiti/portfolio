'use client'

import { useReducedMotion } from 'motion/react'
import { useEffect } from 'react'

const ZONE = 0.3
const MAX_BLUR = 6
const MAX_LIFT = 48

export function ScrollFade() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) {
      return
    }

    const targets = [
      ...document.querySelectorAll<HTMLElement>('main [data-aos]'),
    ]
    const touched = new Set<HTMLElement>()
    let frame = 0

    const reset = (element: HTMLElement) => {
      element.style.removeProperty('opacity')
      element.style.removeProperty('filter')
      element.style.removeProperty('translate')
      element.style.removeProperty('transition')
      touched.delete(element)
    }

    const update = () => {
      frame = 0
      const baseZone = window.innerHeight * ZONE

      for (const element of targets) {
        const { bottom } = element.getBoundingClientRect()
        const zone = Math.min(baseZone, Math.max(1, bottom + window.scrollY))

        if (bottom >= zone) {
          if (touched.has(element)) {
            reset(element)
          }
          continue
        }

        const progress = Math.min(1, Math.max(0, 1 - bottom / zone))

        element.style.transition = 'none'
        element.style.opacity = String(1 - progress)
        element.style.filter = `blur(${progress * MAX_BLUR}px)`
        element.style.translate = `0 ${-progress * MAX_LIFT}px`
        touched.add(element)
      }
    }

    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)

      for (const element of touched) {
        reset(element)
      }
    }
  }, [reduce])

  return null
}

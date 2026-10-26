'use client'

import { animate, useInView, useReducedMotion } from 'motion/react'
import { type ReactNode, useEffect, useRef } from 'react'

const STEP_DURATION = 1.2

export function StepsStepper({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4, once: true })
  const reduce = useReducedMotion()

  useEffect(() => {
    const root = ref.current
    if (!inView || reduce || !root) {
      return
    }

    const controls: { stop: () => void }[] = []
    const timers: number[] = []
    let time = 0.2

    root.setAttribute('data-armed', '')

    for (const step of root.querySelectorAll<HTMLElement>('[data-step]')) {
      const duration = STEP_DURATION
      const fill = step.querySelector<HTMLElement>('[data-step-fill]')

      if (fill) {
        controls.push(
          animate(
            fill,
            { scaleX: [0, 1] },
            { delay: time + duration - 0.1, duration: 0.9, ease: 'easeInOut' },
          ),
        )
      }

      timers.push(
        window.setTimeout(
          () => step.setAttribute('data-played', ''),
          (time + duration) * 1000,
        ),
      )

      time += duration + (fill ? 0.7 : 0)
    }

    return () => {
      for (const timer of timers) {
        window.clearTimeout(timer)
      }

      for (const control of controls) {
        control.stop()
      }
    }
  }, [inView, reduce])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

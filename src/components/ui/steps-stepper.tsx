'use client'

import { animate, useInView, useReducedMotion } from 'motion/react'
import { type ReactNode, useEffect, useRef } from 'react'

const NUMBER_DURATION = 0.7
const LIGHT_DELAY = 0.4
const FILL_DURATION = 0.7
const STEP_PAUSE = 0.15

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
      const fill = step.querySelector<HTMLElement>('[data-step-fill]')

      timers.push(
        window.setTimeout(
          () => step.setAttribute('data-shown', ''),
          time * 1000,
        ),
        window.setTimeout(
          () => step.setAttribute('data-played', ''),
          (time + LIGHT_DELAY) * 1000,
        ),
      )

      if (fill) {
        controls.push(
          animate(
            fill,
            { scaleX: [0, 1] },
            {
              delay: time + NUMBER_DURATION,
              duration: FILL_DURATION,
              ease: 'easeInOut',
            },
          ),
        )
      }

      time += NUMBER_DURATION + (fill ? FILL_DURATION : 0) + STEP_PAUSE
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

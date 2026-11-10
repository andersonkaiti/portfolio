'use client'

import { FIGURE_THEME } from '@components/iso/figure-theme'
import { CountUp } from '@components/ui/count-up'
import { jetBrainsMono } from '@lib/fonts'
import type { HairlineProps } from '@lucasmarkes/hairline/react'
import { cn } from 'cn'
import { MotionConfig, motion, useInView } from 'motion/react'
import { type ComponentType, useRef, useState } from 'react'

interface ProofStatProps {
  value: string
  label: string
  note: string
  Figure: ComponentType<HairlineProps>
  index: number
}

const EASE = [0.22, 1, 0.36, 1] as const

export function ProofStat({
  value,
  label,
  note,
  Figure,
  index,
}: ProofStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const base = index * 0.08
  const state = inView ? 'show' : 'hide'
  const [hover, setHover] = useState(false)
  const [settled, setSettled] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={ref}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        className="relative flex items-center justify-between gap-4 pt-7"
      >
        <motion.span
          aria-hidden="true"
          className="absolute top-0 left-0 h-px w-full origin-left bg-dash/25"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: base, ease: EASE }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute -top-px left-0 h-0.5 w-full origin-left bg-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: !inView ? 0 : hover ? 1 : 1 / 3 }}
          onAnimationComplete={() => inView && setSettled(true)}
          transition={
            settled
              ? { duration: 0.6, ease: EASE }
              : { duration: 0.9, delay: base + 0.1, ease: EASE }
          }
        />

        <div className="flex min-w-0 flex-col gap-4">
          <strong className="font-display text-[clamp(64px,7vw,96px)] leading-[0.9] font-bold tracking-[-0.05em] text-primary tabular-nums">
            <CountUp value={value} />
          </strong>
          <div>
            <motion.div
              className="text-[19px] font-semibold leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={
                state === 'show' ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.5, delay: base + 0.25, ease: EASE }}
            >
              {label}
            </motion.div>
            <motion.div
              className={cn(
                'mt-1.5 text-[13px] leading-normal text-muted-foreground',
                jetBrainsMono.className,
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={
                state === 'show' ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.5, delay: base + 0.35, ease: EASE }}
            >
              {note}
            </motion.div>
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          className="w-[132px] shrink-0 sm:w-[170px]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={
            state === 'show'
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.92 }
          }
          transition={{ duration: 0.7, delay: base + 0.3, ease: EASE }}
        >
          <Figure tabIndex={-1} play={hover} style={FIGURE_THEME} />
        </motion.div>
      </div>
    </MotionConfig>
  )
}

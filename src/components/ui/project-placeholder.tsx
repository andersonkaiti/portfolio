'use client'

import { MotionConfig, motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

const DOTS = {
  backgroundImage:
    'radial-gradient(color-mix(in srgb, currentColor 22%, transparent) 1px, transparent 1.2px)',
  backgroundSize: '20px 20px',
}

const SWEEP_DOTS = {
  backgroundImage: 'radial-gradient(var(--primary) 1.4px, transparent 1.7px)',
  backgroundSize: '20px 20px',
  maskImage: 'linear-gradient(90deg, transparent, black 50%, transparent)',
  WebkitMaskImage:
    'linear-gradient(90deg, transparent, black 50%, transparent)',
  maskSize: '45% 100%',
  WebkitMaskSize: '45% 100%',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
}

const LEFT = 'M20 40l40 22v44L20 84z'
const RIGHT = 'M100 40L60 62v44l40-22z'
const TOP = 'M60 18l40 22-40 22-40-22z'

const STROKE = 'color-mix(in srgb, currentColor 55%, transparent)'

export function ProjectPlaceholder() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [sweep, setSweep] = useState(0)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    if (inView) setSweep((count) => count + 1)
  }, [inView])

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={ref}
        aria-hidden="true"
        onPointerEnter={() => {
          setHover(true)
          setSweep((count) => count + 1)
        }}
        onPointerLeave={() => setHover(false)}
        className="relative size-full overflow-hidden rounded-[inherit] border border-line bg-panel text-muted-foreground"
        style={DOTS}
      >
        {sweep > 0 && (
          <motion.div
            key={sweep}
            className="pointer-events-none absolute inset-0"
            style={SWEEP_DOTS}
            initial={{ maskPosition: '-60% 0%', opacity: 0.55 }}
            animate={{ maskPosition: '160% 0%', opacity: [0.55, 0.55, 0] }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        )}

        <div className="absolute inset-x-0 top-0 flex h-9 items-center gap-[7px] border-b border-line bg-panel px-4">
          {[0, 1, 2].map((index) => (
            <motion.i
              key={index}
              className="size-[9px] rounded-full border border-current"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                inView ? { scale: 1, opacity: 0.5 } : { scale: 0, opacity: 0 }
              }
              transition={{
                type: 'spring',
                stiffness: 520,
                damping: 20,
                delay: 0.05 + index * 0.05,
              }}
            />
          ))}
          <motion.i
            className="ml-3 h-2 w-1/3 origin-left rounded bg-current"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              inView ? { scaleX: 1, opacity: 0.15 } : { scaleX: 0, opacity: 0 }
            }
            transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
          />
          <motion.span
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-primary"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={
              inView
                ? { scaleX: [0, 1], opacity: [1, 1, 0] }
                : { scaleX: 0, opacity: 1 }
            }
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          />
        </div>

        <div className="absolute inset-x-0 top-9 bottom-0 flex items-center justify-center">
          <svg
            viewBox="0 0 120 124"
            className="w-[clamp(84px,24%,132px)] overflow-visible"
            fill="none"
            strokeWidth="1.2"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <title>Placeholder</title>
            <motion.path
              d={LEFT}
              fill="var(--panel)"
              stroke={STROKE}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: inView ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
            />
            <motion.path
              d={RIGHT}
              fill="var(--panel)"
              stroke={STROKE}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: inView ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.31, ease: EASE }}
            />
            <motion.path
              d={TOP}
              stroke={STROKE}
              initial={{ pathLength: 0, fill: 'rgba(0,0,0,0)', y: 0 }}
              animate={{
                pathLength: inView ? 1 : 0,
                fill: inView ? 'var(--signal)' : 'rgba(0,0,0,0)',
                y: hover ? -7 : 0,
              }}
              transition={{
                pathLength: { duration: 0.5, delay: 0.37, ease: EASE },
                fill: { duration: 0.4, delay: 0.7 },
                y: { type: 'spring', stiffness: 380, damping: 18 },
              }}
            />
          </svg>
        </div>
      </div>
    </MotionConfig>
  )
}

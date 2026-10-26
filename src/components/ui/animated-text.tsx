'use client'

import { motion, useInView, useReducedMotion } from 'motion/react'
import { Fragment, useRef } from 'react'

interface AnimatedTextProps {
  as?: 'h1' | 'h2' | 'h3' | 'p'
  children: string
  className?: string
  delay?: number
}

const STAGGER = 0.06

export function AnimatedText({
  as: Tag = 'p',
  children,
  className,
  delay = 0,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()
  const words = children.split(' ')

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      aria-label={children}
      className={className}
    >
      {words.map((word, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: words may repeat
        <Fragment key={`${word}-${index}`}>
          <span
            aria-hidden="true"
            className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom"
          >
            <motion.span
              className="inline-block"
              initial={{ y: '115%', rotate: 4 }}
              animate={inView ? { y: 0, rotate: 0 } : undefined}
              transition={{
                duration: 0.8,
                ease: [0.2, 0.7, 0.2, 1],
                delay: delay + index * STAGGER,
              }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}

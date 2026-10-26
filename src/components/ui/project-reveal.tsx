'use client'

import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'

interface ProjectRevealProps {
  image: React.ReactNode
  children: React.ReactNode
  className?: string
  imageRadius?: number
}

export function ProjectReveal({
  image,
  children,
  className,
  imageRadius = 12,
}: ProjectRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div className={className}>
        {image}
        {children}
      </div>
    )
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ clipPath: `inset(0 100% 0 0 round ${imageRadius}px)` }}
        animate={
          inView
            ? { clipPath: `inset(0 0% 0 0 round ${imageRadius}px)` }
            : undefined
        }
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      >
        {image}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{
          duration: 0.9,
          delay: 0.45,
          ease: [0.215, 0.61, 0.355, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

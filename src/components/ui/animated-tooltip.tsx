'use client'

import { cn } from '@lib/utils'
import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'
import React, { type MouseEvent, type ReactNode, useRef, useState } from 'react'

interface AnimatedTooltipContextType {
  hoveredIndex: number | null
  setHoveredIndex: (index: number | null) => void
  x: MotionValue<number>
  handleMouseMove: (event: MouseEvent<HTMLDivElement>) => void
}

const AnimatedTooltipContext =
  React.createContext<AnimatedTooltipContextType | null>(null)

function useAnimatedTooltipContext() {
  const context = React.useContext(AnimatedTooltipContext)
  if (!context) {
    throw new Error(
      'AnimatedTooltip components must be used within AnimatedTooltip'
    )
  }
  return context
}

interface AnimatedTooltipProps {
  children: ReactNode
  className?: string
}

function AnimatedTooltip({ children, className }: AnimatedTooltipProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const x = useMotionValue(0)
  const animationFrameRef = useRef<number | null>(null)

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      const target = event.currentTarget as HTMLDivElement | null

      if (!target) {
        return
      }

      const halfWidth = target.offsetWidth / 2
      x.set(event.nativeEvent.offsetX - halfWidth)
    })
  }

  return (
    <AnimatedTooltipContext.Provider
      value={{ hoveredIndex, setHoveredIndex, x, handleMouseMove }}
    >
      <div className={cn('relative inline-block', className)}>{children}</div>
    </AnimatedTooltipContext.Provider>
  )
}

interface AnimatedTooltipTriggerProps {
  children: ReactNode
  className?: string
  id: number
}

function AnimatedTooltipTrigger({
  children,
  className,
  id,
}: AnimatedTooltipTriggerProps) {
  const { setHoveredIndex, handleMouseMove } = useAnimatedTooltipContext()

  return (
    <span
      className={cn('relative', className)}
      onMouseEnter={() => setHoveredIndex(id)}
      onMouseLeave={() => setHoveredIndex(null)}
      onMouseMove={handleMouseMove}
      role="button"
      style={{ display: 'inline-block' }}
      tabIndex={0}
    >
      {children}
    </span>
  )
}

interface AnimatedTooltipContentProps {
  children: ReactNode
  className?: string
  id: number
}

function AnimatedTooltipContent({
  children,
  className,
  id,
}: AnimatedTooltipContentProps) {
  const { hoveredIndex, x } = useAnimatedTooltipContext()
  const springConfig = { stiffness: 100, damping: 15 }

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  )
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  )

  return (
    <AnimatePresence>
      {hoveredIndex === id && (
        <motion.div
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 260,
              damping: 10,
            },
          }}
          className={cn(
            '-top-10 -translate-x-1/2 absolute left-1/2 z-50 flex flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl',
            className
          )}
          exit={{ opacity: 0, y: 20, scale: 0.6 }}
          initial={{ opacity: 0, y: 20, scale: 0.6 }}
          style={{
            translateX,
            rotate,
            whiteSpace: 'nowrap',
          }}
        >
          <div className="-bottom-px absolute inset-x-10 z-30 h-px w-[20%]" />
          <div className="-bottom-px absolute left-10 z-30 h-px w-[40%]" />
          <div className="relative z-30 text-white">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { AnimatedTooltip, AnimatedTooltipContent, AnimatedTooltipTrigger }

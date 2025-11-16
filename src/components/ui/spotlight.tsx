'use client'

import { useIsMobile } from '@hooks/use-mobile'
import { motion } from 'motion/react'

type SpotlightProps = {
  gradientFirst?: string
  gradientSecond?: string
  gradientThird?: string
  translateY?: number
  width?: number
  height?: number
  smallWidth?: number
  duration?: number
  xOffset?: number
}

export function Spotlight({
  gradientFirst = 'radial-gradient(68.54% 68.72% at 55.02% 31.46%, oklch(69.6% 0.17 162.48 / 0.08) 0, oklch(69.6% 0.17 162.48 / 0.02) 50%, oklch(69.6% 0.17 162.48 / 0) 80%)',
  gradientSecond = 'radial-gradient(50% 50% at 50% 50%, oklch(69.6% 0.17 162.48 / 0.06) 0, oklch(69.6% 0.17 162.48 / 0.02) 80%, transparent 100%)',
  gradientThird = 'radial-gradient(50% 50% at 50% 50%, oklch(69.6% 0.17 162.48 / 0.04) 0, oklch(69.6% 0.17 162.48 / 0.02) 80%, transparent 100%)',
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
}: SpotlightProps = {}) {
  const isMobile = useIsMobile()

  const responsiveTranslateY = isMobile ? -120 : translateY
  const responsiveWidth = isMobile ? 180 : width
  const responsiveHeight = isMobile ? 480 : height
  const responsiveSmallWidth = isMobile ? 80 : smallWidth
  const responsiveXOffset = isMobile ? 20 : xOffset
  const responsiveDuration = isMobile ? 5 : duration

  return (
    <motion.div
      animate={{
        opacity: 1,
      }}
      className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
      initial={{
        opacity: 0,
      }}
      transition={{
        duration: 1.5,
      }}
    >
      <motion.div
        animate={{
          x: [0, responsiveXOffset, 0],
        }}
        className="pointer-events-none absolute top-0 left-0 z-40 h-screen w-screen"
        transition={{
          duration: responsiveDuration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <div
          className={'absolute top-0 left-0'}
          style={{
            transform: `translateY(${responsiveTranslateY}px) rotate(-45deg)`,
            background: gradientFirst,
            width: `${responsiveWidth}px`,
            height: `${responsiveHeight}px`,
          }}
        />

        <div
          className={'absolute top-0 left-0 origin-top-left'}
          style={{
            transform: 'rotate(-45deg) translate(5%, -50%)',
            background: gradientSecond,
            width: `${responsiveSmallWidth}px`,
            height: `${responsiveHeight}px`,
          }}
        />

        <div
          className={'absolute top-0 left-0 origin-top-left'}
          style={{
            transform: 'rotate(-45deg) translate(-180%, -70%)',
            background: gradientThird,
            width: `${responsiveSmallWidth}px`,
            height: `${responsiveHeight}px`,
          }}
        />
      </motion.div>

      <motion.div
        animate={{
          x: [0, -responsiveXOffset, 0],
        }}
        className="pointer-events-none absolute top-0 right-0 z-40 h-screen w-screen"
        transition={{
          duration: responsiveDuration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <div
          className={'absolute top-0 right-0'}
          style={{
            transform: `translateY(${responsiveTranslateY}px) rotate(45deg)`,
            background: gradientFirst,
            width: `${responsiveWidth}px`,
            height: `${responsiveHeight}px`,
          }}
        />

        <div
          className={'absolute top-0 right-0 origin-top-right'}
          style={{
            transform: 'rotate(45deg) translate(-5%, -50%)',
            background: gradientSecond,
            width: `${responsiveSmallWidth}px`,
            height: `${responsiveHeight}px`,
          }}
        />

        <div
          className={'absolute top-0 right-0 origin-top-right'}
          style={{
            transform: 'rotate(45deg) translate(180%, -70%)',
            background: gradientThird,
            width: `${responsiveSmallWidth}px`,
            height: `${responsiveHeight}px`,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

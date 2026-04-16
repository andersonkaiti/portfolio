'use client'

import { cn } from '@lib/utils'
import { motion, useMotionValue, useTransform } from 'motion/react'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

interface IAnimatedThemeTogglerProps {
  className?: string
}

export function AnimatedThemeToggler({
  className,
}: IAnimatedThemeTogglerProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const changeTheme = async () => {
    if (!buttonRef.current) {
      return
    }

    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'

    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme)
      })
    }).ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const y = top + height / 2
    const x = left + width / 2

    const right = window.innerWidth - left
    const bottom = window.innerHeight - top
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom))

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 600,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  }

  const isDark = mounted ? resolvedTheme === 'dark' : false

  return (
    <button
      className={cn(className)}
      onClick={changeTheme}
      ref={buttonRef}
      type="button"
    >
      {mounted ? <SolarSwitch isDark={isDark} /> : <div className="size-5" />}
    </button>
  )
}

function SolarSwitch({ isDark }: { isDark: boolean }) {
  const duration = 0.7

  const moonVariants = {
    checked: { scale: 1 },
    unchecked: { scale: 0 },
  }

  const sunVariants = {
    checked: { scale: 0 },
    unchecked: { scale: 1 },
  }

  const scaleMoon = useMotionValue(isDark ? 1 : 0)
  const scaleSun = useMotionValue(isDark ? 0 : 1)
  const pathLengthMoon = useTransform(scaleMoon, [0.6, 1], [0, 1])
  const pathLengthSun = useTransform(scaleSun, [0.6, 1], [0, 1])

  return (
    <motion.div animate={isDark ? 'checked' : 'unchecked'}>
      <motion.svg
        aria-hidden="true"
        fill="none"
        height="20"
        viewBox="0 0 25 25"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sun circle */}
        <motion.path
          custom={isDark}
          d="M12.4058 17.7625C15.1672 17.7625 17.4058 15.5239 17.4058 12.7625C17.4058 10.0011 15.1672 7.76251 12.4058 7.76251C9.64434 7.76251 7.40576 10.0011 7.40576 12.7625C7.40576 15.5239 9.64434 17.7625 12.4058 17.7625Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          style={{ pathLength: pathLengthSun, scale: scaleSun }}
          transition={{ duration }}
          variants={sunVariants}
        />
        {/* Sun top ray */}
        <motion.path
          custom={isDark}
          d="M12.4058 1.76251V3.76251"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          style={{ pathLength: pathLengthSun, scale: scaleSun }}
          transition={{ duration }}
          variants={sunVariants}
        />
        {/* Sun bottom ray */}
        <motion.path
          custom={isDark}
          d="M12.4058 21.7625V23.7625"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          style={{ pathLength: pathLengthSun, scale: scaleSun }}
          transition={{ duration }}
          variants={sunVariants}
        />
        {/* Sun top-left ray */}
        <motion.path
          custom={isDark}
          d="M4.62598 4.98248L6.04598 6.40248"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          style={{ pathLength: pathLengthSun, scale: scaleSun }}
          transition={{ duration }}
          variants={sunVariants}
        />
        {/* Sun bottom-right ray */}
        <motion.path
          custom={isDark}
          d="M18.7656 19.1225L20.1856 20.5425"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          style={{ pathLength: pathLengthSun, scale: scaleSun }}
          transition={{ duration }}
          variants={sunVariants}
        />
        {/* Sun left ray */}
        <motion.path
          custom={isDark}
          d="M1.40576 12.7625H3.40576"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          style={{ pathLength: pathLengthSun, scale: scaleSun }}
          transition={{ duration }}
          variants={sunVariants}
        />
        {/* Sun right ray */}
        <motion.path
          custom={isDark}
          d="M21.4058 12.7625H23.4058"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          style={{ pathLength: pathLengthSun, scale: scaleSun }}
          transition={{ duration }}
          variants={sunVariants}
        />
        {/* Sun bottom-left ray */}
        <motion.path
          custom={isDark}
          d="M4.62598 20.5425L6.04598 19.1225"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          style={{ pathLength: pathLengthSun, scale: scaleSun }}
          transition={{ duration }}
          variants={sunVariants}
        />
        {/* Sun top-right ray */}
        <motion.path
          custom={isDark}
          d="M18.7656 6.40248L20.1856 4.98248"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          style={{ pathLength: pathLengthSun, scale: scaleSun }}
          transition={{ duration }}
          variants={sunVariants}
        />
        {/* Moon */}
        <motion.path
          custom={isDark}
          d="M21.1918 13.2013C21.0345 14.9035 20.3957 16.5257 19.35 17.8781C18.3044 19.2305 16.8953 20.2571 15.2875 20.8379C13.6797 21.4186 11.9398 21.5294 10.2713 21.1574C8.60281 20.7854 7.07479 19.9459 5.86602 18.7371C4.65725 17.5283 3.81774 16.0003 3.4457 14.3318C3.07367 12.6633 3.18451 10.9234 3.76526 9.31561C4.346 7.70783 5.37263 6.29868 6.72501 5.25307C8.07739 4.20746 9.69959 3.56862 11.4018 3.41132C10.4052 4.75958 9.92564 6.42077 10.0503 8.09273C10.175 9.76469 10.8957 11.3364 12.0812 12.5219C13.2667 13.7075 14.8384 14.4281 16.5104 14.5528C18.1823 14.6775 19.8435 14.1979 21.1918 13.2013Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          style={{ pathLength: pathLengthMoon, scale: scaleMoon }}
          transition={{ duration }}
          variants={moonVariants}
        />
      </motion.svg>
    </motion.div>
  )
}

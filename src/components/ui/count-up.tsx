'use client'

import { animate, useInView, useReducedMotion } from 'motion/react'
import { useLocale } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  value: string | number
  suffix?: string
}

function parseValue(value: string | number, extraSuffix: string) {
  if (typeof value === 'number') {
    return { target: value, suffix: extraSuffix }
  }

  const match = /^(\d+)(.*)$/.exec(value)

  if (!match) {
    return null
  }

  return {
    target: Number.parseInt(match[1] ?? '0', 10),
    suffix: `${match[2] ?? ''}${extraSuffix}`,
  }
}

export function CountUp({ value, suffix: extraSuffix = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const locale = useLocale()
  const parsed = parseValue(value, extraSuffix)
  const [current, setCurrent] = useState(0)

  const target = parsed?.target ?? 0

  useEffect(() => {
    if (!inView || reduce) {
      return
    }

    const control = animate(0, target, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (latest) => setCurrent(Math.round(latest)),
    })

    return () => control.stop()
  }, [inView, reduce, target])

  if (!parsed) {
    return <span ref={ref}>{value}</span>
  }

  const format = new Intl.NumberFormat(locale)
  const final = `${format.format(target)}${parsed.suffix}`
  const shown = reduce ? target : current

  return (
    <span ref={ref} className="inline-grid tabular-nums">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {final}
      </span>
      <span className="sr-only">{final}</span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {format.format(shown)}
        {parsed.suffix}
      </span>
    </span>
  )
}

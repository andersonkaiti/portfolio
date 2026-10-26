'use client'

import { useInView, useReducedMotion } from 'motion/react'
import { useLocale } from 'next-intl'
import { useRef } from 'react'

interface CountUpProps {
  value: string | number
  suffix?: string
}

const CELL = '1.1em'
const DURATION = 1.5
const STAGGER = 0.07
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const DIGIT_COUNT = 10

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

interface RollingDigitProps {
  digit: number
  active: boolean
  delay: number
  instant: boolean
}

function RollingDigit({ digit, active, delay, instant }: RollingDigitProps) {
  const strip = Array.from(
    { length: DIGIT_COUNT + digit + 1 },
    (_, index) => index % DIGIT_COUNT,
  )
  const end = DIGIT_COUNT + digit

  return (
    <span
      className="relative inline-block overflow-hidden"
      style={{ height: CELL, lineHeight: CELL }}
    >
      <span className="invisible">0</span>
      <span
        className="absolute inset-x-0 top-0 flex flex-col will-change-transform"
        style={{
          transform: `translateY(calc(${active ? -end : 0} * ${CELL}))`,
          transition: instant
            ? 'none'
            : `transform ${DURATION}s ${EASE} ${delay}s`,
        }}
      >
        {strip.map((value, index) => (
          <span
            className="block text-center"
            key={`${index}-${value}`}
            style={{ height: CELL, lineHeight: CELL }}
          >
            {value}
          </span>
        ))}
      </span>
    </span>
  )
}

export function CountUp({ value, suffix: extraSuffix = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const locale = useLocale()
  const parsed = parseValue(value, extraSuffix)

  if (!parsed) {
    return <span ref={ref}>{value}</span>
  }

  const formatted = new Intl.NumberFormat(locale).format(parsed.target)
  const final = `${formatted}${parsed.suffix}`
  const active = inView || Boolean(reduce)
  const chars = Array.from(final)
  const digitTotal = chars.filter((char) => /\d/.test(char)).length
  let digitIndex = 0

  return (
    <span
      className="inline-flex items-center tabular-nums"
      ref={ref}
      style={{ lineHeight: CELL }}
    >
      <span className="sr-only">{final}</span>
      <span aria-hidden="true" className="inline-flex items-center">
        {chars.map((char, index) => {
          if (!/\d/.test(char)) {
            return (
              <span
                className="whitespace-pre"
                key={`${index}-${char}`}
                style={{ height: CELL, lineHeight: CELL }}
              >
                {char}
              </span>
            )
          }

          const delay = reduce ? 0 : (digitTotal - 1 - digitIndex++) * STAGGER

          return (
            <RollingDigit
              active={active}
              delay={delay}
              digit={Number(char)}
              instant={Boolean(reduce)}
              key={`${index}-${char}`}
            />
          )
        })}
      </span>
    </span>
  )
}

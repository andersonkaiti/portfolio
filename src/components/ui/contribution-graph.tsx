'use client'

import { cn } from 'cn'
import { motion, useReducedMotion } from 'motion/react'
import type React from 'react'
import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

export interface ContributionData {
  date: string
  count: number
  level: number
}

export interface ContributionGraphProps
  extends React.HTMLAttributes<HTMLDivElement> {
  data?: ContributionData[]
  showLegend?: boolean
  caption?: React.ReactNode
  showTooltips?: boolean
}

const DAYS_IN_WEEK = 7
const DAY_MS = 86_400_000
const MOBILE_WEEKS = 26
const MIN_WEEKS_BEFORE_FIRST_MONTH = 2
const TOOLTIP_OFFSET_X = 10
const TOOLTIP_OFFSET_Y = 40
const TOOLTIP_MAX_WIDTH = 224
const TOOLTIP_SCREEN_MARGIN = 8

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const CONTRIBUTION_COLORS = [
  'bg-primary/10',
  'bg-primary/20',
  'bg-primary/40',
  'bg-primary/60',
  'bg-primary',
]

const LEVEL_0 = 0
const LEVEL_1 = 1
const LEVEL_2 = 2
const LEVEL_3 = 3
const LEVEL_4 = 4
const CONTRIBUTION_LEVELS = [LEVEL_0, LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4]
const toUtc = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number)
  return Date.UTC(year ?? 0, (month ?? 1) - 1, day ?? 1)
}

const toKey = (time: number) => new Date(time).toISOString().slice(0, 10)

interface Layout {
  days: ContributionData[]
  weeks: number
  months: { month: string; startWeek: number }[]
}

const buildLayout = (data: ContributionData[]): Layout => {
  if (data.length === 0) {
    return { days: [], weeks: 0, months: [] }
  }

  const byDate = new Map(data.map((day) => [day.date, day]))
  const times = data.map((day) => toUtc(day.date))
  const first = Math.min(...times)
  const last = Math.max(...times)
  const firstSunday = first - new Date(first).getUTCDay() * DAY_MS
  const weeks = Math.floor((last - firstSunday) / DAY_MS / DAYS_IN_WEEK) + 1

  const days: ContributionData[] = []

  for (let index = 0; index < weeks * DAYS_IN_WEEK; index++) {
    const time = firstSunday + index * DAY_MS
    const found =
      time < first || time > last ? undefined : byDate.get(toKey(time))

    days.push(found ?? { date: '', count: LEVEL_0, level: LEVEL_0 })
  }

  const months: Layout['months'] = []
  let previous = -1

  for (let week = 0; week < weeks; week++) {
    const sunday = new Date(firstSunday + week * DAYS_IN_WEEK * DAY_MS)
    const month = sunday.getUTCMonth()

    if (month !== previous) {
      months.push({ month: MONTHS[month] ?? '', startWeek: week })
      previous = month
    }
  }

  const trimmed = months.filter((entry, index) => {
    const next = months[index + 1]
    return (
      !next || next.startWeek - entry.startWeek >= MIN_WEEKS_BEFORE_FIRST_MONTH
    )
  })

  return { days, weeks, months: trimmed }
}

export function ContributionGraph({
  data = [],
  className,
  showLegend = true,
  caption,
  showTooltips = true,
  ...divProps
}: ContributionGraphProps) {
  const [hoveredDay, setHoveredDay] = useState<ContributionData | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const shouldReduceMotion = useReducedMotion()

  const {
    days: yearData,
    weeks,
    months: monthHeaders,
  } = useMemo(() => buildLayout(data), [data])
  const hiddenWeeks = Math.max(0, weeks - MOBILE_WEEKS)
  const lastDay = [...yearData].reverse().find((day) => day.date)
  const displayYear = lastDay ? lastDay.date.slice(0, 4) : ''

  const handleDayHover = (day: ContributionData, event: React.MouseEvent) => {
    if (showTooltips && day.date) {
      setHoveredDay(day)
      setTooltipPosition({ x: event.clientX, y: event.clientY })
    }
  }

  const handleDayLeave = () => {
    setHoveredDay(null)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) {
      return ''
    }
    const [yearStr, monthStr, dayStr] = dateString.split('-')
    const date = new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr))
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getContributionText = (count: number) => {
    if (count === LEVEL_0) {
      return 'No contributions'
    }
    if (count === LEVEL_1) {
      return '1 contribution'
    }
    return `${count} contributions`
  }

  return (
    <div className={cn('contribution-graph', className)} {...divProps}>
      <div className="overflow-x-auto pb-2">
        <div className="grid grid-cols-1 sm:min-w-[884px] sm:grid-cols-[36px_1fr] sm:gap-x-2">
          <div className="max-sm:hidden" />
          <div
            aria-hidden="true"
            className="relative h-5 font-mono text-xs text-muted-foreground [--off:0] [--tot:var(--w)] max-sm:[--off:var(--h)] max-sm:[--tot:26]"
            style={
              {
                '--w': weeks,
                '--h': hiddenWeeks,
              } as React.CSSProperties
            }
          >
            {monthHeaders.map((header) => (
              <span
                className={cn(
                  'absolute top-0',
                  header.startWeek < hiddenWeeks && 'max-sm:hidden',
                )}
                key={`${header.month}-${header.startWeek}`}
                style={{
                  left: `calc((${header.startWeek} - var(--off)) / var(--tot) * 100%)`,
                }}
              >
                {header.month}
              </span>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="grid grid-rows-7 gap-1 font-mono text-[11px] text-muted-foreground max-sm:hidden"
          >
            {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, index) => (
              <span
                className="flex items-center"
                key={`${day}-${DAYS_IN_WEEK + index}`}
              >
                {day}
              </span>
            ))}
          </div>

          <ul
            aria-label={`Contribution Graph for ${displayYear}`}
            className="m-0 grid grid-flow-col grid-rows-7 list-none gap-px p-0 sm:gap-1"
            style={{
              gridAutoColumns: '1fr',
            }}
          >
            {yearData.map((dayData, index) => {
              if (!dayData.date) {
                return (
                  <li
                    aria-hidden="true"
                    className={cn(
                      'aspect-square',
                      Math.floor(index / DAYS_IN_WEEK) < hiddenWeeks &&
                        'max-sm:hidden',
                    )}
                    key={`empty-${Math.floor(index / DAYS_IN_WEEK)}-${index % DAYS_IN_WEEK}`}
                  />
                )
              }

              return (
                <li
                  className={cn(
                    'aspect-square cursor-pointer rounded-[2px] hover:ring-2 hover:ring-foreground/40 sm:rounded-[3px]',
                    Math.floor(index / DAYS_IN_WEEK) < hiddenWeeks &&
                      'max-sm:hidden',
                    CONTRIBUTION_COLORS[dayData.level],
                  )}
                  key={dayData.date}
                  aria-label={`${formatDate(dayData.date)}: ${getContributionText(dayData.count)}`}
                  onMouseEnter={(e) => handleDayHover(dayData, e)}
                  onMouseLeave={handleDayLeave}
                  title={
                    showTooltips
                      ? `${formatDate(dayData.date)}: ${getContributionText(dayData.count)}`
                      : undefined
                  }
                />
              )
            })}
          </ul>
        </div>
      </div>

      {showTooltips &&
        hoveredDay &&
        typeof document !== 'undefined' &&
        createPortal(
          <motion.div
            animate={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
            }
            className="pointer-events-none fixed z-9999 rounded-lg border bg-background px-3 py-2 text-foreground text-sm shadow-lg"
            exit={
              shouldReduceMotion
                ? { opacity: 0, transition: { duration: 0 } }
                : { opacity: 0, scale: 0.8 }
            }
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }
            }
            style={{
              left: `clamp(${TOOLTIP_SCREEN_MARGIN}px, ${tooltipPosition.x + TOOLTIP_OFFSET_X}px, calc(100vw - ${TOOLTIP_MAX_WIDTH + TOOLTIP_SCREEN_MARGIN}px))`,
              top: `${Math.max(TOOLTIP_SCREEN_MARGIN, tooltipPosition.y - TOOLTIP_OFFSET_Y)}px`,
            }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }
            }
          >
            <div className="font-semibold">
              {getContributionText(hoveredDay.count)}
            </div>
            <div className="text-foreground/70">
              {formatDate(hoveredDay.date)}
            </div>
          </motion.div>,
          document.body,
        )}

      {showLegend && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 font-mono text-sm text-muted-foreground">
          <span>{caption}</span>
          <span className="inline-flex items-center gap-2">
            <span>Less</span>
            <div className="flex items-center gap-1">
              {CONTRIBUTION_LEVELS.map((level) => (
                <div
                  className={cn(
                    'size-3.5 rounded-[3px]',
                    CONTRIBUTION_COLORS[level],
                  )}
                  key={level}
                />
              ))}
            </div>
            <span>More</span>
          </span>
        </div>
      )}
    </div>
  )
}

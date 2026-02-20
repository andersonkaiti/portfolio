'use client'

import { cn } from '@lib/utils'
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
  year?: number
  startDate?: Date
  endDate?: Date
  showLegend?: boolean
  showTooltips?: boolean
}

const WEEKS_IN_YEAR = 53
const DAYS_IN_WEEK = 7
const JANUARY_MONTH = 0
const DECEMBER_MONTH = 11
const SUNDAY_DAY = 0
const MIN_WEEKS_FOR_DECEMBER_HEADER = 2
const TOOLTIP_OFFSET_X = 10
const TOOLTIP_OFFSET_Y = 40

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

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const CONTRIBUTION_COLORS = [
  'bg-primary/5',
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
const DAY_1 = 1
const DAY_31 = 31

const isDateInValidRange = (
  currentDate: Date,
  startDate: Date,
  endDate: Date,
  targetYear?: number,
) => {
  const isInRange = currentDate >= startDate && currentDate <= endDate
  if (!targetYear) return isInRange
  const isPreviousYearDecember =
    currentDate.getFullYear() === targetYear - 1 &&
    currentDate.getMonth() === DECEMBER_MONTH
  const isNextYearJanuary =
    currentDate.getFullYear() === targetYear + 1 &&
    currentDate.getMonth() === JANUARY_MONTH
  return isInRange || isPreviousYearDecember || isNextYearJanuary
}

const createDayData = (
  currentDate: Date,
  contributionData: ContributionData[],
): ContributionData => {
  const dateString = currentDate.toISOString().split('T')[0]
  const existingData = contributionData.find((d) => d.date === dateString)
  return {
    date: dateString,
    count: existingData?.count ?? LEVEL_0,
    level: existingData?.level ?? LEVEL_0,
  }
}

interface MonthHeaderCheck {
  currentYear: number
  targetYear: number
  currentMonth: number
  startDateDay: number
  weekCount: number
}
const shouldShowMonthHeader = ({
  currentYear,
  targetYear,
  currentMonth,
  startDateDay,
  weekCount,
}: MonthHeaderCheck) =>
  currentYear === targetYear ||
  (currentYear === targetYear - 1 &&
    currentMonth === DECEMBER_MONTH &&
    startDateDay !== SUNDAY_DAY &&
    weekCount >= MIN_WEEKS_FOR_DECEMBER_HEADER)

const calculateMonthHeaders = (startDate: Date, targetYear?: number) => {
  const headers: { month: string; colspan: number; startWeek: number }[] = []
  const firstSunday = new Date(startDate)
  firstSunday.setDate(startDate.getDate() - startDate.getDay())

  let currentMonth = -1
  let currentYear = -1
  let monthStartWeek = 0
  let weekCount = 0

  for (let weekNumber = 0; weekNumber < WEEKS_IN_YEAR; weekNumber++) {
    const weekDate = new Date(firstSunday)
    weekDate.setDate(firstSunday.getDate() + weekNumber * DAYS_IN_WEEK)

    const monthKey = weekDate.getMonth()
    const yearKey = weekDate.getFullYear()

    if (monthKey !== currentMonth || yearKey !== currentYear) {
      if (
        currentMonth !== -1 &&
        (targetYear === undefined ||
          shouldShowMonthHeader({
            currentYear,
            targetYear,
            currentMonth,
            startDateDay: startDate.getDay(),
            weekCount,
          }))
      ) {
        headers.push({
          month: MONTHS[currentMonth],
          colspan: weekCount,
          startWeek: monthStartWeek,
        })
      }
      currentMonth = monthKey
      currentYear = yearKey
      monthStartWeek = weekNumber
      weekCount = 1
    } else {
      weekCount++
    }
  }

  if (
    currentMonth !== -1 &&
    (targetYear === undefined ||
      shouldShowMonthHeader({
        currentYear,
        targetYear,
        currentMonth,
        startDateDay: startDate.getDay(),
        weekCount,
      }))
  ) {
    headers.push({
      month: MONTHS[currentMonth],
      colspan: weekCount,
      startWeek: monthStartWeek,
    })
  }

  return headers
}

export function ContributionGraph({
  data = [],
  year,
  startDate: customStartDate,
  endDate: customEndDate,
  className,
  showLegend = true,
  showTooltips = true,
  ...divProps
}: ContributionGraphProps) {
  const [hoveredDay, setHoveredDay] = useState<ContributionData | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const shouldReduceMotion = useReducedMotion()

  const yearData = useMemo(() => {
    const effectiveYear = year ?? new Date().getFullYear()
    const startDate =
      customStartDate ?? new Date(effectiveYear, JANUARY_MONTH, DAY_1)
    const endDate =
      customEndDate ?? new Date(effectiveYear, DECEMBER_MONTH, DAY_31)
    const days: ContributionData[] = []

    const firstSunday = new Date(startDate)
    firstSunday.setDate(startDate.getDate() - startDate.getDay())

    for (let weekNum = 0; weekNum < WEEKS_IN_YEAR; weekNum++) {
      for (let day = 0; day < DAYS_IN_WEEK; day++) {
        const currentDate = new Date(firstSunday)
        currentDate.setDate(
          firstSunday.getDate() + weekNum * DAYS_IN_WEEK + day,
        )

        if (
          isDateInValidRange(
            currentDate,
            startDate,
            endDate,
            customStartDate ? undefined : effectiveYear,
          )
        ) {
          days.push(createDayData(currentDate, data))
        } else {
          days.push({
            date: '',
            count: LEVEL_0,
            level: LEVEL_0,
          })
        }
      }
    }

    return days
  }, [data, year, customStartDate, customEndDate])

  const displayYear =
    year ??
    (customStartDate ? customStartDate.getFullYear() : new Date().getFullYear())
  const effectiveStartDate =
    customStartDate ?? new Date(displayYear, JANUARY_MONTH, DAY_1)
  const monthHeaders = useMemo(
    () =>
      calculateMonthHeaders(
        effectiveStartDate,
        customStartDate ? undefined : displayYear,
      ),
    [effectiveStartDate, customStartDate, displayYear],
  )

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
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-1 text-xs">
          <caption className="sr-only">
            Contribution Graph for {displayYear}
          </caption>

          <thead>
            <tr className="h-3">
              <td className="w-7 min-w-7" />
              {monthHeaders.map((header) => (
                <td
                  className="relative text-left text-foreground"
                  colSpan={header.colspan}
                  key={`${header.month}-${header.startWeek}`}
                >
                  <span className="absolute top-0 left-1">{header.month}</span>
                </td>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: DAYS_IN_WEEK }, (_, dayIndex) => (
              <tr className="h-3.5" key={DAYS[dayIndex]}>
                <td className="relative w-7 min-w-7 text-foreground">
                  {dayIndex % 2 === 0 && (
                    <span className="absolute -bottom-0.5 left-0 text-xs">
                      {DAYS[dayIndex]}
                    </span>
                  )}
                </td>

                {Array.from({ length: WEEKS_IN_YEAR }, (_, w) => {
                  const dayData = yearData[w * DAYS_IN_WEEK + dayIndex]
                  const cellKey = `${dayData?.date ?? 'empty'}-${w}-${dayIndex}`
                  if (!dayData?.date) {
                    return (
                      <td className="size-3.5 p-0" key={cellKey}>
                        <div className="size-3.5" />
                      </td>
                    )
                  }

                  return (
                    <td
                      className="size-3.5 cursor-pointer p-0"
                      key={cellKey}
                      onMouseEnter={(e) => handleDayHover(dayData, e)}
                      onMouseLeave={handleDayLeave}
                      title={
                        showTooltips
                          ? `${formatDate(dayData.date)}: ${getContributionText(dayData.count)}`
                          : undefined
                      }
                    >
                      <div
                        className={`size-3.5 rounded-xs ${
                          CONTRIBUTION_COLORS[dayData.level]
                        } hover:ring-2 hover:ring-background`}
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
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
              left: `${tooltipPosition.x + TOOLTIP_OFFSET_X}px`,
              top: `${tooltipPosition.y - TOOLTIP_OFFSET_Y}px`,
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
        <div className="mt-4 flex items-center justify-center text-foreground/70 text-xs">
          <div className="flex items-center gap-1">
            {CONTRIBUTION_LEVELS.map((level) => (
              <div
                className={`size-3 rounded-sm ${CONTRIBUTION_COLORS[level]}`}
                key={level}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

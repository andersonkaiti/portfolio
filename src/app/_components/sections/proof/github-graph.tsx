import { ContributionGraph } from '@components/ui/contribution-graph'
import { CountUp } from '@components/ui/count-up'
import { FlameIcon } from '@components/ui/flame-icon'
import { LinkPreview } from '@components/ui/link-preview'
import {
  generateGitHubContributionData,
  type IContributionData,
} from '@http/github-graph'
import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import { connection } from 'next/server'
import { getFormatter, getTranslations } from 'next-intl/server'

const DAY_MS = 86_400_000

function getStats(data: IContributionData[]) {
  const days = [...data].sort((a, b) => a.date.localeCompare(b.date))
  const weeks = new Map<string, boolean>()
  let total = 0
  let best = 0
  let streak = 0
  let longest = 0

  for (const day of days) {
    const time = new Date(`${day.date}T00:00:00Z`)
    const weekKey = new Date(time.getTime() - time.getUTCDay() * DAY_MS)
      .toISOString()
      .slice(0, 10)

    weeks.set(weekKey, (weeks.get(weekKey) ?? false) || day.count > 0)
    total += day.count
    best = Math.max(best, day.count)
    streak = day.count > 0 ? streak + 1 : 0
    longest = Math.max(longest, streak)
  }

  const lastIndex = days.length - 1
  const startIndex = days[lastIndex]?.count === 0 ? lastIndex - 1 : lastIndex
  let current = 0

  for (let index = startIndex; index >= 0 && days[index]?.count; index--) {
    current++
  }

  return {
    total,
    best,
    longest,
    current,
    totalWeeks: weeks.size,
    activeWeeks: [...weeks.values()].filter(Boolean).length,
  }
}

export async function GithubGraph() {
  await connection()

  const today = new Date()
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(today.getFullYear() - 1)

  let data: IContributionData[]

  try {
    data = await generateGitHubContributionData(oneYearAgo, today)
  } catch {
    return null
  }

  const t = await getTranslations('proof')
  const format = await getFormatter()
  const stats = getStats(data)

  const summary = [
    {
      value: t('weeksValue', {
        active: stats.activeWeeks,
        total: stats.totalWeeks,
      }),
      label: t('weeksLabel'),
    },
    {
      value: t('streakValue', { days: stats.current }),
      label: t('currentStreakLabel'),
      flame: stats.current > 0,
    },
    {
      value: t('streakValue', { days: stats.longest }),
      label: t('streakLabel'),
    },
    { value: String(stats.best), label: t('bestLabel') },
  ]

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div>
          <div className="font-display text-[clamp(56px,6.4vw,84px)] leading-[0.9] font-bold tracking-[-0.05em] text-primary tabular-nums">
            <CountUp value={stats.total} />
          </div>
          <div
            className={cn(
              'mt-3 text-[13px] text-muted-foreground',
              jetBrainsMono.className,
            )}
          >
            {t('contributionsLabel')}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-6">
          {summary.map((item) => (
            <div key={item.label}>
              <div className="flex items-center gap-2 font-display text-[32px] leading-none font-bold tracking-[-0.03em]">
                {item.flame && <FlameIcon className="size-8 shrink-0" />}
                <CountUp value={item.value} />
              </div>
              <div
                className={cn(
                  'mt-2 text-[13px] text-muted-foreground',
                  jetBrainsMono.className,
                )}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ContributionGraph
        className="mt-10"
        data={data}
        showLegend
        showTooltips
        caption={t.rich('source', {
          date: format.dateTime(today, { dateStyle: 'medium' }),
          github: (chunks) => (
            <LinkPreview
              url="https://github.com/andersonkaiti"
              className="text-primary"
            >
              {chunks}
            </LinkPreview>
          ),
        })}
      />
    </>
  )
}

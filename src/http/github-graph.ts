import { env } from '@config/env'

export interface IContributionData {
  date: string
  count: number
  level: number
}

export async function generateGitHubContributionData(
  fromDate: Date,
  toDate: Date,
): Promise<IContributionData[]> {
  const from = fromDate.toISOString()
  const to = toDate.toISOString()

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {  
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        username: 'andersonkaiti',
        from,
        to,
      },
    }),
  })

  const json = await response.json()

  const weeks =
    json.data.user.contributionsCollection.contributionCalendar.weeks

  const data: IContributionData[] = []

  for (const week of weeks) {
    for (const day of week.contributionDays) {
      data.push({
        date: day.date,
        count: day.contributionCount,
        level: mapLevel(day.contributionLevel),
      })
    }
  }

  return data
}

function mapLevel(level: string): number {
  const map: Record<string, number> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  }

  return map[level] ?? 0
}

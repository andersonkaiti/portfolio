import { env } from '@config/env'
import dayjs from 'dayjs'
import type { IProject } from 'types/project'

const HOURS_REGEX = /(\d+)\s*horas/i

export async function getCourses() {
  const response = await fetch(
    'https://api.github.com/users/andersonkaiti/repos?per_page=100&page=1',
    {
      headers: {
        Authorization: env.GITHUB_TOKEN,
      },
    }
  )

  const allProjects: IProject[] = await response.json()

  const courses = allProjects
    .filter(({ topics }) => topics.includes('course'))
    .sort(({ pushed_at: one }, { pushed_at: two }) => dayjs(two).diff(one))

  const totalHours = courses.reduce((acc, { description }) => {
    const match = description?.match(HOURS_REGEX)
    const hours = match ? Number.parseInt(match[1], 10) : 0

    return acc + hours
  }, 0)

  return {
    courses,
    totalHours,
  }
}

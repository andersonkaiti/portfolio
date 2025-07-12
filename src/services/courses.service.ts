import dayjs from 'dayjs'
import type { IProject } from 'types/project'

export async function getCourses() {
  const response = await fetch(
    'https://api.github.com/users/andersonkaiti/repos?per_page=100&page=1'
  )

  const allProjects: IProject[] = await response.json()

  const courses = allProjects
    .filter(({ topics }) => topics.includes('course'))
    .sort(({ pushed_at: one }, { pushed_at: two }) => dayjs(two).diff(one))

  const totalHours = courses.reduce((acc, { description }) => {
    return acc + Number(description?.replace('horas', '')?.split(' - ')[1] || 0)
  }, 0)

  return {
    courses,
    totalHours,
  }
}

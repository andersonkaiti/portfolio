import dayjs from 'dayjs'
import type { IProject } from 'types/project'

export async function getProjects() {
  const response = await fetch(
    'https://api.github.com/users/andersonkaiti/repos?per_page=100&page=1'
  )

  const allProjects: IProject[] = await response.json()

  return allProjects
    .filter((project) => !!project.topics.length)
    .filter((project) => !!project.description)
    .sort(({ pushed_at: one }, { pushed_at: two }) => dayjs(two).diff(one))
}

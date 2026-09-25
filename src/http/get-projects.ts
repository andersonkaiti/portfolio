import { env } from '@config/env'
import dayjs from 'dayjs'
import z from 'zod'

const githubOwnerSchema = z.object({
  login: z.string(),
  id: z.number(),
  avatar_url: z.url(),
  html_url: z.url(),
})

const githubRepoSchema = z.object({
  id: z.number(),
  node_id: z.string(),
  name: z.string(),
  full_name: z.string(),
  private: z.boolean(),
  owner: githubOwnerSchema,
  html_url: z.url(),
  description: z.string().nullable(),
  fork: z.boolean(),
  url: z.url(),
  created_at: z.date(),
  updated_at: z.date(),
  pushed_at: z.date(),
  homepage: z.url().nullable(),
  size: z.number(),
  stargazers_count: z.number(),
  watchers_count: z.number(),
  language: z.string().nullable(),
  forks_count: z.number(),
  archived: z.boolean(),
  disabled: z.boolean(),
  open_issues_count: z.number(),
  topics: z.array(z.string()),
  visibility: z.enum(['public', 'private', 'internal']),
  default_branch: z.string(),
})

export const githubReposResponseSchema = z.array(githubRepoSchema)

export interface IGithubRepository extends z.infer<typeof githubRepoSchema> {}

function normalizeHomepage(url: string | null): string | null {
  if (!url) {
    return null
  }

  return url.startsWith('http') ? url : `https://${url}`
}

function isVisibleProject(project: IGithubRepository): boolean {
  return project.topics.length > 0 && !!project.description
}

function firstThenRecent(a: IGithubRepository, b: IGithubRepository): number {
  return dayjs(b.pushed_at).diff(a.pushed_at)
}

export async function getProjects() {
  const response = await fetch(
    'https://api.github.com/users/andersonkaiti/repos?per_page=100&page=1',
    {
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      },
      next: {
        revalidate: 3600,
      },
    },
  )

  const allProjects: IGithubRepository[] = await response.json()

  return allProjects
    .filter(isVisibleProject)
    .map((project) => ({
      ...project,
      homepage: normalizeHomepage(project.homepage),
    }))
    .sort(firstThenRecent)
}

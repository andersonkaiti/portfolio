import { generateGitHubContributionData } from '@http/github-graph'
import { useQuery } from '@tanstack/react-query'

export function useGithubGraph() {
  const today = new Date()
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(today.getFullYear() - 1)

  const result = useQuery({
    queryKey: ['github-contribution-data', oneYearAgo, today],
    queryFn: async () =>
      await generateGitHubContributionData(oneYearAgo, today),
  })

  return {
    ...result,
    today,
    oneYearAgo,
  }
}

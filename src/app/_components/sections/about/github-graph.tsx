import { ContributionGraph } from '@components/ui/contribution-graph'
import { LinkPreview } from '@components/ui/link-preview'
import { generateGitHubContributionData } from '@http/github-graph'

export async function GithubGraph() {
  const today = new Date()
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(today.getFullYear() - 1)

  const data = await generateGitHubContributionData(oneYearAgo, today)

  return (
    <>
      <div className="ml-auto">
        <LinkPreview
          url="https://github.com/andersonkaiti"
          className="font-semibold text-primary"
        >
          <span className="font-mono text-primary">@andersonkaiti</span>
        </LinkPreview>
      </div>

      <ContributionGraph
        data={data}
        startDate={oneYearAgo}
        endDate={today}
        showLegend
        showTooltips
      />
    </>
  )
}

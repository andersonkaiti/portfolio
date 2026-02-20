'use client'

import { ContributionGraph } from '@components/ui/contribution-graph'
import { LinkPreview } from '@components/ui/link-preview'
import { LoadingSkeleton } from './loading-skeleton'
import { useGithubGraph } from './use-github-graph'

export function GithubGraph() {
  const { data, isLoading, today, oneYearAgo } = useGithubGraph()

  if (isLoading) {
    return <LoadingSkeleton />
  }

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

'use client'

import { LinkPreview } from '@components/ui/link-preview'
import {
  SectionContainer,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
  SectionUnderline,
} from '@components/ui/section'
import { Suspense } from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import { LoadingSkeleton } from './_components/loading-skeleton'

export default function GitHubContributions() {
  return (
    <SectionContainer id="contributions">
      <SectionHeader data-aos="fade-down">
        <SectionTitle>GitHub Contributions</SectionTitle>
        <SectionSubtitle>
          Some of my contributions to open-source projects on
          <LinkPreview url="https://github.com/andersonkaiti" className="ml-1">
            <span className="font-semibold text-primary">@andersonkaiti</span>
          </LinkPreview>
          .
        </SectionSubtitle>
        <SectionUnderline />
      </SectionHeader>

      <div className="flex items-center justify-center">
        <Suspense fallback={<LoadingSkeleton />}>
          <GitHubCalendar username="andersonkaiti" />
        </Suspense>
      </div>
    </SectionContainer>
  )
}

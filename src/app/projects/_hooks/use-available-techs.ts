import type { IGithubRepository } from '@http/get-projects'
import { getTopicDisplayName } from '@utils/get-topic-display-name'
import { useMemo } from 'react'
import { getTopicLogo } from '../_components/topic-to-logo'

export function useAvailableTechs(projects: IGithubRepository[]): string[] {
  return useMemo(() => {
    const seenDisplayNames = new Set<string>()
    const result: string[] = []

    for (const project of projects) {
      for (const topic of project.topics) {
        if (getTopicLogo(topic)) {
          const displayName = getTopicDisplayName(topic)
          if (!seenDisplayNames.has(displayName)) {
            seenDisplayNames.add(displayName)
            result.push(topic)
          }
        }
      }
    }

    return result.sort((a, b) =>
      getTopicDisplayName(a).localeCompare(getTopicDisplayName(b)),
    )
  }, [projects])
}

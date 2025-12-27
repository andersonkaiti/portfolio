import { AnimatedCard } from '@components/ui/animated-card'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import { LinkPreview } from '@components/ui/link-preview'
import { formatTitle } from '@utils/format-title'
import { formatTopic } from '@utils/format-topic'
import { Github } from 'lucide-react'
import Link from 'next/link'

interface IProjectProps {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: {
    login: string
    id: number
    avatar_url: string
    html_url: string
  }
  html_url: string
  description: string | null
  fork: boolean
  url: string
  created_at: Date
  updated_at: Date
  pushed_at: Date
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  language: string | null
  forks_count: number
  archived: boolean
  disabled: boolean
  open_issues_count: number
  topics: string[]
  visibility: 'private' | 'public' | 'internal'
  default_branch: string
}

export function Project({
  name,
  description,
  html_url,
  homepage,
  topics,
}: IProjectProps) {
  return (
    <AnimatedCard
      className="flex size-full flex-col gap-6 rounded-xl bg-background p-6"
      variant="revealed-pointer"
    >
      <div className="space-y-2 py-2">
        <h3 className="font-medium text-base">{formatTitle(name)}</h3>
        <p className="line-clamp-2 text-muted-foreground text-sm">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <Badge
            className="rounded-full border-emerald-500/40 bg-emerald-500/10 text-emerald-500"
            key={topic}
            variant="outline"
          >
            {formatTopic(topic)}
          </Badge>
        ))}
      </div>

      <div className="mt-auto flex gap-3 border-t border-dashed pt-2">
        <Button asChild size="sm" variant="ghost">
          <Link href={html_url} target="_blank">
            Code <Github className="ml-0 size-3.5 opacity-50" />
          </Link>
        </Button>

        {homepage && (
          <LinkPreview asChild url={homepage}>
            <Button size="sm" variant="ghost">
              Demo
            </Button>
          </LinkPreview>
        )}
      </div>
    </AnimatedCard>
  )
}

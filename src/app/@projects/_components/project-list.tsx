'use client'

import { Button } from '@components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible'
import { ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { Project } from './project'

interface IProductListProps {
  projects: {
    id: number
    name: string
    description: string | null
    topics: string[]
    html_url: string

    node_id?: string
    full_name?: string
    private?: boolean
    owner?: {
      login?: string
      id?: number
      node_id?: string
      avatar_url?: string
      gravatar_id?: string
      url?: string
      html_url?: string
      followers_url?: string
      following_url?: string
      gists_url?: string
      starred_url?: string
      subscriptions_url?: string
      organizations_url?: string
      repos_url?: string
      events_url?: string
      received_events_url?: string
      type?: string
      user_view_type?: string
      site_admin?: boolean
    }
    fork?: boolean
    url?: string
    forks_url?: string
    keys_url?: string
    collaborators_url?: string
    teams_url?: string
    hooks_url?: string
    issue_events_url?: string
    events_url?: string
    assignees_url?: string
    branches_url?: string
    tags_url?: string
    blobs_url?: string
    git_tags_url?: string
    git_refs_url?: string
    trees_url?: string
    statuses_url?: string
    languages_url?: string
    stargazers_url?: string
    contributors_url?: string
    subscribers_url?: string
    subscription_url?: string
    commits_url?: string
    git_commits_url?: string
    comments_url?: string
    issue_comment_url?: string
    contents_url?: string
    compare_url?: string
    merges_url?: string
    archive_url?: string
    downloads_url?: string
    issues_url?: string
    pulls_url?: string
    milestones_url?: string
    notifications_url?: string
    labels_url?: string
    releases_url?: string
    deployments_url?: string
    created_at?: string
    updated_at?: string
    pushed_at?: string
    git_url?: string
    ssh_url?: string
    clone_url?: string
    svn_url?: string
    homepage?: string | null
    size?: number
    stargazers_count?: number
    watchers_count?: number
    language?: string | null
    has_issues?: boolean
    has_projects?: boolean
    has_downloads?: boolean
    has_wiki?: boolean
    has_pages?: boolean
    has_discussions?: boolean
    forks_count?: number
    mirror_url?: string | null
    archived?: boolean
    disabled?: boolean
    open_issues_count?: number
    license?: {
      key?: string
      name?: string
      spdx_id?: string
      url?: string
      node_id?: string
    } | null
    allow_forking?: boolean
    is_template?: boolean
    web_commit_signoff_required?: boolean
    visibility?: string
    forks?: number
    open_issues?: number
    watchers?: number
    default_branch?: string
  }[]
}

export function ProjectList({ projects }: IProductListProps) {
  const visibleCount = 2
  const [open, setOpen] = useState(false)

  const mainProjects = projects.slice(0, visibleCount)
  const extraProjects = projects.slice(visibleCount)

  return (
    <Collapsible onOpenChange={setOpen} open={open}>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {mainProjects.map((project) => (
          <Project key={project.id} {...project} />
        ))}

        <CollapsibleContent asChild>
          <div className="contents">
            {extraProjects.map((project) => (
              <Project key={project.id} {...project} />
            ))}
          </div>
        </CollapsibleContent>
      </div>

      {extraProjects.length > 0 && (
        <CollapsibleTrigger
          asChild
          className="group mx-auto mt-4 flex text-sm transition"
        >
          <Button variant="ghost">
            <span>
              {open
                ? 'Show less'
                : `Show ${extraProjects.length} more project${extraProjects.length > 1 ? 's' : ''}`}
            </span>
            <ChevronUp className="transition-transform group-data-[state=open]:rotate-180" />
          </Button>
        </CollapsibleTrigger>
      )}
    </Collapsible>
  )
}

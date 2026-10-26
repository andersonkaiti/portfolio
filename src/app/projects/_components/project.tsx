import { ProjectReveal } from '@components/ui/project-reveal'
import type { IGithubRepository } from '@http/get-projects'
import { formatTitle } from '@utils/format-title'
import { formatTopic } from '@utils/format-topic'
import { getPreviewSrc } from '@utils/get-preview-src'
import { ArrowUpRight, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { ProjectPreview } from './project-preview'
import { TopicLogoImage } from './topic-logo-image'
import { getTopicLogo } from './topic-to-logo'

interface ProjectProps extends IGithubRepository {
  demoLabel: string
}

const LINK_CLASS =
  'inline-flex items-center gap-1.5 border-b-[1.5px] border-foreground pb-0.5 text-sm font-semibold text-foreground no-underline transition-colors hover:border-primary hover:text-primary'

export function Project({
  name,
  description,
  html_url,
  homepage,
  topics,
  demoLabel,
}: ProjectProps) {
  const previewSrc = getPreviewSrc(homepage ?? html_url)

  return (
    <ProjectReveal
      imageRadius={16}
      className="flex flex-col gap-5"
      image={
        <div className="group/card relative aspect-[16/10] overflow-hidden rounded-2xl bg-ph">
          {previewSrc ? (
            <ProjectPreview
              src={previewSrc}
              alt={`${formatTitle(name)} preview`}
              href={homepage ?? html_url}
              bleed={false}
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <ImageIcon className="size-8 text-muted-foreground/40" />
            </div>
          )}
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl leading-tight font-bold tracking-[-0.02em]">
          {formatTitle(name)}
        </h2>

        <p className="text-[17px] text-body">{description}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {topics.map((topic) => {
            const logo = getTopicLogo(topic)

            if (!logo) {
              return null
            }

            return (
              <span key={topic} className="inline-flex items-center gap-2">
                <TopicLogoImage logo={logo} topic={topic} size={16} />
                <span className="text-sm leading-none text-foreground">
                  {formatTopic(topic)}
                </span>
              </span>
            )
          })}
        </div>

        {homepage && (
          <div className="pt-1">
            <Link
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${demoLabel} — ${formatTitle(name)}`}
              className={LINK_CLASS}
            >
              {demoLabel} <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        )}
      </div>
    </ProjectReveal>
  )
}

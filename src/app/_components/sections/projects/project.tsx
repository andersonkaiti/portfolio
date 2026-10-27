import { ProjectPlaceholder } from '@components/ui/project-placeholder'
import { ProjectReveal } from '@components/ui/project-reveal'
import type { IGithubRepository } from '@http/get-projects'
import { jetBrainsMono } from '@lib/fonts'
import { formatTitle } from '@utils/format-title'
import { formatTopic } from '@utils/format-topic'
import { getPreviewSrc } from '@utils/get-preview-src'
import { cn } from 'cn'
import dayjs from 'dayjs'
import Link from 'next/link'
import { ProjectPreview } from '../../../projects/_components/project-preview'
import { TopicLogoImage } from './topic-logo-image'
import { getTopicLogo } from './topic-to-logo'

interface ProjectProps extends IGithubRepository {
  demoLabel: string
}

const LINK_CLASS =
  'inline-flex min-h-8 items-center gap-1 font-mono text-[13px] text-foreground underline underline-offset-4 transition-colors hover:text-primary'

export function Project({
  name,
  description,
  homepage,
  topics,
  updated_at,
  demoLabel,
}: ProjectProps) {
  const previewSrc = getPreviewSrc(homepage)
  return (
    <ProjectReveal
      imageRadius={12}
      className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-center gap-x-12 gap-y-8 py-10"
      image={
        <div className="group/card relative aspect-16/10 overflow-hidden rounded-xl bg-ph">
          {previewSrc && homepage ? (
            <ProjectPreview
              src={previewSrc}
              alt={`${formatTitle(name)} preview`}
              href={homepage}
              bleed={false}
            />
          ) : (
            <ProjectPlaceholder />
          )}
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-[28px] leading-[1.1] font-bold tracking-[-0.02em]">
            {formatTitle(name)}
          </h3>
          <time
            className={cn(
              'mt-2 block text-[13px] text-muted-foreground',
              jetBrainsMono.className,
            )}
          >
            {dayjs(updated_at).format('MMM YYYY')}
          </time>
        </div>

        <p className="text-[17px] text-body">{description}</p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
          {topics.map((topic) => {
            const logo = getTopicLogo(topic)

            if (!logo) {
              return null
            }

            return (
              <span key={topic} className="inline-flex items-center gap-2">
                <TopicLogoImage logo={logo} topic={topic} size={16} />
                <span
                  className={cn(
                    'text-[13px] leading-none text-body',
                    jetBrainsMono.className,
                  )}
                >
                  {formatTopic(topic)}
                </span>
              </span>
            )
          })}
        </div>

        <div>
          {homepage && (
            <Link
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${demoLabel} — ${formatTitle(name)}`}
              className={LINK_CLASS}
            >
              {demoLabel} ↗
            </Link>
          )}
        </div>
      </div>
    </ProjectReveal>
  )
}

import { Button } from '@components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import type { IGithubRepository } from '@http/get-projects'
import { formatTitle } from '@utils/format-title'
import { formatTopic } from '@utils/format-topic'
import { getPreviewSrc } from '@utils/get-preview-src'
import dayjs from 'dayjs'
import { Github, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { ProjectPreview } from '../../../projects/_components/project-preview'
import { TopicLogoImage } from './topic-logo-image'
import { getTopicLogo } from './topic-to-logo'

interface ProjectProps extends IGithubRepository {
  codeLabel: string
  index: number
}

export function Project({
  name,
  description,
  html_url,
  homepage,
  topics,
  updated_at,
  codeLabel,
  index,
}: ProjectProps) {
  const previewSrc = getPreviewSrc(homepage)

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 80}
      style={{ transitionDelay: `${index * 80}ms` }}
      suppressHydrationWarning
    >
      <div className="group/card relative flex size-full flex-col gap-6 border border-border p-6 transition-[border-color,background-color] duration-500 ease-in-out hover:border-primary/30 hover:bg-accent/20 overflow-hidden">
        {previewSrc ? (
          <ProjectPreview
            src={previewSrc}
            alt={`${formatTitle(name)} preview`}
            href={homepage ?? ''}
          />
        ) : (
          <div className="-mx-6 -mt-6 flex aspect-video w-[calc(100%+3rem)] items-center justify-center bg-accent/30">
            <ImageIcon className="size-8 text-muted-foreground/30" />
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-base leading-snug">
              {formatTitle(name)}
            </h3>
            <time className="shrink-0 text-xs text-muted-foreground">
              {dayjs(updated_at).format('MMM YYYY')}
            </time>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {topics.map((topic) => {
            const logo = getTopicLogo(topic)

            if (!logo) {
              return null
            }

            return (
              <Tooltip key={topic}>
                <TooltipTrigger aria-label={formatTopic(topic)}>
                  <TopicLogoImage logo={logo} topic={topic} size={22} />
                </TooltipTrigger>
                <TooltipContent>{formatTopic(topic)}</TooltipContent>
              </Tooltip>
            )
          })}
        </div>

        <div className="mt-auto flex gap-3 border-t border-border pt-4">
          <Button asChild size="sm" variant="ghost">
            <Link href={html_url} target="_blank">
              {codeLabel} <Github className="ml-0 size-3.5 opacity-50" />
            </Link>
          </Button>
          {homepage && (
            <Button asChild size="sm" variant="ghost">
              <Link href={homepage} target="_blank" rel="noopener noreferrer">
                Demo
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

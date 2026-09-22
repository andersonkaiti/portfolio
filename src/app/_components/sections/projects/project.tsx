import { Button } from '@components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import type { IGithubRepository } from '@http/get-projects'
import { formatTitle } from '@utils/format-title'
import { formatTopic } from '@utils/format-topic'
import { getPreviewSrc } from '@utils/get-preview-src'
import dayjs from 'dayjs'
import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
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
      <div className="group/card relative flex size-full flex-col gap-6 border border-border p-6 transition-[border-color,background-color] duration-300 ease-out hover:border-primary/30 hover:bg-accent/20 overflow-hidden">
        <span className="pointer-events-none absolute bottom-0 left-0 w-0.5 bg-primary h-0 transition-[height] duration-500 ease-out group-hover/card:h-full" />

        {previewSrc && (
          <Link
            href={homepage ?? ''}
            target="_blank"
            className="-mx-6 -mt-6 block overflow-hidden"
            tabIndex={-1}
            aria-hidden
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={previewSrc}
                alt={`${formatTitle(name)} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover transition-transform duration-500 group-hover/card:scale-105"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-background/70 to-transparent" />
            </div>
          </Link>
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
                <TooltipTrigger>
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
        </div>
      </div>
    </div>
  )
}

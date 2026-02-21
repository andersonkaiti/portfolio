import { AnimatedCard } from '@components/ui/animated-card'
import { Button } from '@components/ui/button'
import { LinkPreview } from '@components/ui/link-preview'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import type { IGithubRepository } from '@http/get-projects'
import { formatTitle } from '@utils/format-title'
import { formatTopic } from '@utils/format-topic'
import dayjs from 'dayjs'
import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getTopicLogo } from './topic-to-logo'

export function Project({
  name,
  description,
  html_url,
  homepage,
  topics,
  updated_at,
}: IGithubRepository) {
  return (
    <AnimatedCard
      className="flex size-full flex-col gap-6 rounded-xl bg-background p-6"
      variant="revealed-pointer"
    >
      <div className="space-y-2 py-2">
        <h3 className="font-medium text-base">{formatTitle(name)}</h3>

        <time className="text-sm text-muted-foreground">
          {dayjs(updated_at).format('DD MMM YYYY')}
        </time>

        <p className="mt-4 text-muted-foreground text-sm text-justify">
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
                <div className="cursor-pointer transition-all hover:scale-110">
                  {'dark' in logo && 'light' in logo ? (
                    <>
                      <Image
                        alt={topic}
                        className="hidden size-6 dark:flex"
                        sizes="24px"
                        src={logo.dark}
                      />
                      <Image
                        alt={topic}
                        className="flex size-6 dark:hidden"
                        sizes="24px"
                        src={logo.light}
                      />
                    </>
                  ) : (
                    <Image
                      alt={topic}
                      className="size-6"
                      sizes="24px"
                      src={logo}
                    />
                  )}
                </div>
              </TooltipTrigger>

              <TooltipContent>{formatTopic(topic)}</TooltipContent>
            </Tooltip>
          )
        })}
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

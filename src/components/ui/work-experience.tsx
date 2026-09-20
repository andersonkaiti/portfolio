import { Separator } from '@components/ui/separator'
import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import Image from 'next/image'
import type React from 'react'
import ReactMarkdown from 'react-markdown'

export type ExperiencePositionItemType = {
  id: string
  title: string
  employmentPeriod: string
  employmentType?: string
  description?: string
  skills?: string[]
}

export type ExperienceItemType = {
  id: string
  companyName: string
  companyLogo?: string
  positions: ExperiencePositionItemType[]
  isCurrentEmployer?: boolean
}

export type WorkExperienceProps = React.HTMLAttributes<HTMLDivElement> & {
  experiences: ExperienceItemType[]
}

export function WorkExperience({
  experiences,
  className,
  ...props
}: WorkExperienceProps) {
  const rows = experiences.flatMap((exp) =>
    exp.positions.map((pos) => ({ exp, pos })),
  )

  return (
    <div {...props} className={cn('border-t border-border', className)}>
      {rows.map(({ exp, pos }, index) => (
        <ExperienceRow
          key={pos.id}
          experience={exp}
          position={pos}
          index={index}
        />
      ))}
    </div>
  )
}

function ExperienceRow({
  experience,
  position,
  index,
}: {
  experience: ExperienceItemType
  position: ExperiencePositionItemType
  index: number
}) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 80}
      style={{ transitionDelay: `${index * 80}ms` }}
      suppressHydrationWarning
    >
      <div className="group/row border-b border-border transition-colors duration-400 ease-[cubic-bezier(.25,0,.35,1)] hover:bg-accent/30">
        <div className="grid grid-cols-1 gap-4 px-2 py-9 transition-[translate] duration-400 ease-[cubic-bezier(.25,0,.35,1)] sm:px-0 md:grid-cols-[minmax(0,190px)_1fr] md:gap-10 md:group-hover/row:translate-x-4">
          <div className="flex flex-row items-center gap-3 md:flex-col md:items-start md:gap-2.5">
            <span
              className={cn(
                'text-[12.5px] uppercase leading-relaxed tracking-[.14em] text-muted-foreground',
                jetBrainsMono.className,
              )}
            >
              {position.employmentPeriod}
            </span>

            <div className="flex items-center gap-2">
              {experience.companyLogo && (
                <Image
                  alt={experience.companyName}
                  className="size-4 rounded-full"
                  height={16}
                  quality={100}
                  src={experience.companyLogo}
                  unoptimized
                  width={16}
                />
              )}

              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-500">
                {position.employmentType}
                {experience.isCurrentEmployer && (
                  <span className="relative flex size-2 items-center justify-center">
                    <span className="absolute inline-flex size-3 animate-ping rounded-full bg-emerald-500/50" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                  </span>
                )}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-semibold tracking-tight">
                {position.title}
              </h3>
              <div
                className={cn(
                  'font-semibold text-primary',
                  jetBrainsMono.className,
                )}
              >
                {experience.companyName}
                {position.employmentType && (
                  <>
                    <Separator
                      className="mx-2 inline-block bg-primary/40 data-[orientation=vertical]:h-3.5"
                      orientation="vertical"
                    />
                    {position.employmentType}
                  </>
                )}
              </div>
            </div>

            {position.description && (
              <Prose>
                <ReactMarkdown>{position.description}</ReactMarkdown>
              </Prose>
            )}

            {Array.isArray(position.skills) && position.skills.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {position.skills.map((skill, i) => (
                  <li className="flex" key={`${position.id}-${i}`}>
                    <Skill>{skill}</Skill>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Prose({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'prose prose-sm dark:prose-invert max-w-none text-muted-foreground',
        'prose-ul:my-1 prose-li:my-1 prose-li:leading-relaxed',
        'prose-strong:font-medium prose-strong:text-foreground',
        'prose-a:font-medium prose-a:text-foreground prose-a:underline prose-a:underline-offset-4',
        className,
      )}
      {...props}
    />
  )
}

function Skill({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-emerald-500 text-xs',
        className,
      )}
      {...props}
    />
  )
}

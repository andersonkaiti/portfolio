import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
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
    <div {...props} className={className}>
      {rows.map(({ exp, pos }, index) => (
        <div
          key={pos.id}
          className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-x-12 gap-y-4 border-b border-dash/35 py-9 last:border-b-0"
          data-aos="fade-up"
          data-aos-delay={index * 80}
          style={{ transitionDelay: `${index * 80}ms` }}
          suppressHydrationWarning
        >
          <div>
            <h3 className="text-[22px] font-bold tracking-[-0.01em]">
              {pos.title}
            </h3>
            <p className="mt-1.5 text-muted-foreground">{exp.companyName}</p>
            <p
              className={cn(
                'mt-1 text-[15px] text-muted-foreground',
                jetBrainsMono.className,
              )}
            >
              {pos.employmentPeriod}
            </p>
          </div>

          {pos.description && (
            <div className="text-body [&_li]:leading-relaxed [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:m-0 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2.5 [&_ul]:pl-5">
              <ReactMarkdown>{pos.description}</ReactMarkdown>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

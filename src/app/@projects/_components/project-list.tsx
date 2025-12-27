'use client'

import { Button } from '@components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible'
import { getProjects } from '@http/get-projects'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { Project } from './project'

export function ProjectList() {
  const { data: projects } = useSuspenseQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })

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

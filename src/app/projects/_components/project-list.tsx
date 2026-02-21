'use client'

import { Button } from '@components/ui/button'
import { getProjects } from '@http/get-projects'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Project } from './project'

export function ProjectList() {
  const { data: projects } = useSuspenseQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })

  return (
    <div className="flex flex-col items-center gap-16">
      <Button asChild variant="ghost" className="self-start">
        <Link href="/">
          <ChevronLeft className="size-4" /> Back to home
        </Link>
      </Button>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </div>
  )
}

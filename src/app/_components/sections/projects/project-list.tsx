'use client'

import { Button } from '@components/ui/button'
import { getProjects } from '@http/get-projects'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Project } from './project'

export function ProjectList() {
  const { data: projects } = useSuspenseQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })

  const lastTwo = 2

  const latestsProjects = projects.slice(0, lastTwo)

  return (
    <div
      className="flex flex-col justify-center items-center gap-4 md:gap-16"
      data-aos="fade-down"
    >
      <p className="self-end">{projects.length} projects</p>

      <div
        className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
        data-aos="fade-down"
      >
        {latestsProjects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>

      <Button asChild data-aos="fade-down">
        <Link href="/projects">
          <ChevronRight className="size-4" /> See more
        </Link>
      </Button>
    </div>
  )
}

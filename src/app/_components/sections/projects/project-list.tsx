import { Button } from '@components/ui/button'
import type { IGithubRepository } from '@http/get-projects'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Project } from './project'

interface ProjectListProps {
  projects: IGithubRepository[]
}

export function ProjectList({ projects }: ProjectListProps) {
  const latestsProjects = projects.slice(0, 2)

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

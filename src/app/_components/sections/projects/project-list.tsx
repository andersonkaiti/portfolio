import { Button } from '@components/ui/button'
import type { IGithubRepository } from '@http/get-projects'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Project } from './project'

interface ProjectListProps {
  projects: IGithubRepository[]
}

export function ProjectList({ projects }: ProjectListProps) {
  const latestsProjects = projects.slice(0, 2)

  return (
    <div className="flex flex-col gap-4" data-aos="fade-up">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {projects.length} projects
        </span>

        <Button asChild variant="ghost" size="sm">
          <Link href="/projects">
            View all <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {latestsProjects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </div>
  )
}

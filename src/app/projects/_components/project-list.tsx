import { Button } from '@components/ui/button'
import type { IGithubRepository } from '@http/get-projects'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Project } from './project'

interface ProjectListProps {
  projects: IGithubRepository[]
}

export function ProjectList({ projects }: ProjectListProps) {
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

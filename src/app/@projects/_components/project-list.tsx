import { getProjects } from '@http/get-projects'
import { Project } from './project'

export async function ProjectList() {
  const projects = await getProjects()

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Project key={project.id} {...project} />
      ))}
    </div>
  )
}

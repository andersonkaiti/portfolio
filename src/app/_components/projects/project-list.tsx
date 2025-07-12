import { getProjects } from '@services/projects.service'
import { Project } from './project'

export async function ProjectList() {
  const projects = await getProjects()

  return (
    <section className="w-full space-y-8 px-6 md:space-y-16">
      <header>
        <h1 className="scroll-m-20 text-balance text-center font-bold text-4xl tracking-wide">
          Projetos
        </h1>
      </header>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </section>
  )
}

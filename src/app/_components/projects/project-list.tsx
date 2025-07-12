import {
  SectionContainer,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { getProjects } from '@services/projects.service'
import { Project } from './project'

export async function ProjectList() {
  const projects = await getProjects()

  return (
    <SectionContainer id="projects">
      <SectionHeader>
        <SectionTitle>Projetos</SectionTitle>
        <SectionSubtitle>
          Alguns dos projetos que desenvolvi ao longo da minha jornada
        </SectionSubtitle>
      </SectionHeader>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </SectionContainer>
  )
}

import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { getProjects } from '@http/get-projects'
import { ProjectList } from './project-list'

export async function ProjectListSection() {
  const projects = await getProjects()

  return (
    <SectionContainer id="projects">
      <SectionHeader>
        <SectionLabel data-aos="fade-down">Work</SectionLabel>

        <SectionTitle data-aos="fade-down">Projects</SectionTitle>

        <SectionSubtitle data-aos="fade-down">
          Some of the projects I have developed along my journey
        </SectionSubtitle>
      </SectionHeader>

      <ProjectList projects={projects} />
    </SectionContainer>
  )
}

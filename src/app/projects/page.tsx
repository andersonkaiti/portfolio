import { getProjects } from '@http/get-projects'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ProjectList } from './_components/project-list'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <NuqsAdapter>
      <main className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-16 px-2 py-10 md:gap-40 md:px-20 md:py-30">
        <ProjectList projects={projects} />
      </main>
    </NuqsAdapter>
  )
}

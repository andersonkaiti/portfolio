import { ProjectList } from './_components/project-list'

export default function ProjectsPage() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-16 px-2 py-10 md:gap-40 md:px-20 md:py-30">
      <ProjectList />
    </main>
  )
}

import { getProjects } from '@http/get-projects'
import type { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ProjectList } from './_components/project-list'

export const metadata: Metadata = {
  title: 'Anderson Kaiti | Projects',
  description:
    "Explore Anderson Kaiti's open-source projects built with React, Next.js, Node.js, TypeScript, and more.",
  alternates: {
    canonical: 'https://andersonkaiti.com/projects',
  },
  openGraph: {
    title: 'Anderson Kaiti | Projects',
    description:
      "Explore Anderson Kaiti's open-source projects built with React, Next.js, Node.js, TypeScript, and more.",
    url: 'https://andersonkaiti.com/projects',
  },
}

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

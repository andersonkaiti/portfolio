export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'
import { Suspense } from 'react'
import { Education } from './_components/education/education'
import { Header } from './_components/header/header'
import { Technologies } from './_components/technologies/technologies'

const DynamicProjectList = dynamicImport(() =>
  import('./_components/projects/project-list').then((m) => m.ProjectList)
)

const DynamicCourseList = dynamicImport(() =>
  import('./_components/courses/course-list').then((m) => m.CourseList)
)

export default function Home() {
  return (
    <main className="mx-auto flex min-h-100vh max-w-7xl flex-col items-center justify-center gap-8 px-2 py-10 md:gap-20 md:px-20 md:py-30">
      <Header />

      <Technologies />

      <Suspense fallback={<p>Loading...</p>}>
        <DynamicProjectList />
      </Suspense>

      <Education />

      <Suspense fallback={<p>Loading...</p>}>
        <DynamicCourseList />
      </Suspense>
    </main>
  )
}

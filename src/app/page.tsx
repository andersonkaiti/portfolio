import { Spotlight } from '@components/ui/spotlight'
import { AboutSection } from './_components/sections/about'
import { EducationSection } from './_components/sections/education'
import { ExperiencesSection } from './_components/sections/experiences'
import { HeaderSection } from './_components/sections/header'
import { ProjectListSection } from './_components/sections/projects'
import { TechnologiesSection } from './_components/sections/technologies'

export default function Home() {
  return (
    <>
      <Spotlight />

      <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-16 px-2 py-10 md:gap-40 md:px-20 md:py-30">
        <HeaderSection />
        <AboutSection />
        <TechnologiesSection />
        <ProjectListSection />
        <ExperiencesSection />
        <EducationSection />
      </main>
    </>
  )
}

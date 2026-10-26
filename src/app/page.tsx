import { ContactSection } from './_components/sections/contact'
import { ExperiencesSection } from './_components/sections/experiences'
import { FaqSection } from './_components/sections/faq'
import { HeroSection } from './_components/sections/hero'
import { PainSection } from './_components/sections/pain'
import { ProjectListSection } from './_components/sections/projects'
import { ProofSection } from './_components/sections/proof'
import { RiskSection } from './_components/sections/risk'
import { SolutionsSection } from './_components/sections/solutions'
import { StepsSection } from './_components/sections/steps'
import { WorkSection } from './_components/sections/work'

export const instant = false

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <PainSection />
      <StepsSection />
      <SolutionsSection />
      <ProofSection />
      <ExperiencesSection />
      <ProjectListSection />
      <WorkSection />
      <RiskSection />
      <FaqSection />
      <ContactSection />
    </main>
  )
}

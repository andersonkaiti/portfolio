import { buildSiteJsonLd, serializeJsonLd } from '@lib/agents/structured-data'
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
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is serialised from static data with "<" escaped
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildSiteJsonLd()) }}
      />
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

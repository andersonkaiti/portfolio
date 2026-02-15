import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { GithubGraph } from './github-graph'

export function AboutSection() {
  return (
    <SectionContainer id="about">
      <SectionHeader>
        <SectionLabel>Contributions</SectionLabel>

        <SectionTitle>About Me</SectionTitle>

        <SectionSubtitle>Get to know me better</SectionSubtitle>
      </SectionHeader>

      <main data-aos="fade-down">
        <p className="text-justify font-base text-base leading-6 sm:mt-4 sm:leading-7 md:leading-8">
          I’m Anderson Kaiti, a Computer Science graduate focused on building
          well-structured, <span className="text-primary">scalable</span>{' '}
          software solutions. I work mainly with modern web and mobile
          technologies such as <span className="text-primary">React</span>,{' '}
          <span className="text-primary">React Native</span>,
          <span className="text-primary">Next.js</span>,{' '}
          <span className="text-primary">Laravel</span>,{' '}
          <span className="text-primary">TypeScript</span>, and{' '}
          <span className="text-primary">TailwindCSS</span>, always prioritizing
          <span className="text-primary">code quality</span>, clarity, and
          long-term maintainability.
        </p>

        <p className="text-justify font-base text-base leading-6 sm:mt-4 sm:leading-7 md:leading-8">
          I have a strong analytical mindset and I care deeply about
          understanding the reasoning behind technical decisions. For me,
          development is not just about making things work, but about knowing{' '}
          <span className="italic text-primary">why</span> they work and how
          they can evolve safely over time. This approach shapes how I design
          components, organize application architecture, and handle state, data
          flow, and integrations.
        </p>

        <p className="text-justify font-base text-base leading-6 sm:mt-4 sm:leading-7 md:leading-8">
          Throughout my projects, I have developed responsive web applications,
          mobile apps with Expo and custom navigation flows, and systems that
          integrate with external services and APIs. I consistently apply{' '}
          <span className="text-primary">best practices</span> to deliver
          solutions that are performant, readable, and easy to extend.
        </p>

        <p className="text-justify font-base text-base leading-6 sm:mt-4 sm:leading-7 md:leading-8">
          My goal is to create software that is technically solid, thoughtfully
          designed, and ready to grow as product requirements evolve.
        </p>
      </main>

      <GithubGraph />
    </SectionContainer>
  )
}

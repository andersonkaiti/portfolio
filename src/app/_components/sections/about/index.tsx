import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { Suspense } from 'react'
import { GithubGraph } from './github-graph'
import { LoadingSkeleton } from './loading-skeleton'

export function AboutSection() {
  return (
    <SectionContainer id="about">
      <SectionHeader>
        <SectionLabel data-aos="fade-down">Contributions</SectionLabel>

        <SectionTitle data-aos="fade-down">About Me</SectionTitle>

        <SectionSubtitle data-aos="fade-down">
          Get to know me better
        </SectionSubtitle>
      </SectionHeader>

      <main data-aos="fade-down">
        <p className="text-justify font-base text-base leading-6 sm:mt-4 sm:leading-7 md:leading-8">
          I&apos;m Anderson Kaiti, a Computer Science graduate building
          well-structured, <span className="text-primary">scalable</span> web
          and mobile applications with{' '}
          <span className="text-primary">React</span>,{' '}
          <span className="text-primary">React Native</span>,{' '}
          <span className="text-primary">Next.js</span>,{' '}
          <span className="text-primary">Laravel</span>,{' '}
          <span className="text-primary">TypeScript</span>, and{' '}
          <span className="text-primary">TailwindCSS</span>. I care deeply about{' '}
          <span className="text-primary">code quality</span>, clarity, and
          long-term maintainability.
        </p>

        <p className="text-justify font-base text-base leading-6 sm:mt-4 sm:leading-7 md:leading-8">
          My approach goes beyond making things work &mdash; I focus on
          understanding <span className="italic text-primary">why</span> they
          work and how they can evolve safely. From component design to data
          flow and external integrations, I consistently apply{' '}
          <span className="text-primary">best practices</span> to deliver
          solutions that are performant, readable, and easy to extend.
        </p>
      </main>

      <Suspense fallback={<LoadingSkeleton />}>
        <GithubGraph />
      </Suspense>
    </SectionContainer>
  )
}

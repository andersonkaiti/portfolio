import { IsoDeco } from '@components/iso/iso-deco'
import { Reveal } from '@components/ui/reveal'
import { getProjects } from '@http/get-projects'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ProjectList } from './_components/project-list'

export const instant = false

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.projects')

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: 'https://andersonkaiti.com/projects',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://andersonkaiti.com/projects',
    },
  }
}

export default async function ProjectsPage() {
  const [projects, t] = await Promise.all([
    getProjects(),
    getTranslations('projects'),
  ])

  return (
    <NuqsAdapter>
      <main className="relative mx-auto w-full max-w-7xl px-6 pt-[72px] pb-28">
        <IsoDeco
          className="absolute top-6 right-6 hidden w-[280px] lg:block"
          style={{ ['--iso-bg' as string]: 'var(--background)' }}
        />

        <ProjectList projects={projects} />
      </main>

      <section className="relative overflow-hidden bg-signal text-on-signal selection:bg-on-signal selection:text-signal">
        <IsoDeco
          className="absolute right-6 -bottom-5 hidden w-[240px] lg:block"
          style={{ ['--iso-bg' as string]: 'var(--signal)' }}
        />

        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-12 gap-y-8 px-6 py-22">
          <Reveal>
            <h2 className="max-w-[12em] text-balance font-display text-[clamp(28px,3.6vw,44px)] leading-none font-bold tracking-[-0.035em]">
              {t('ctaTitle')}
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <Link
              href="/#contact"
              className="ak-btn inline-flex min-h-14 items-center rounded-full bg-on-signal px-8 text-lg font-semibold text-[#f2f4f1] no-underline"
            >
              {t('ctaButton')}
            </Link>
          </Reveal>
        </div>
      </section>
    </NuqsAdapter>
  )
}

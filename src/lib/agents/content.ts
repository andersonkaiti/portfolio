import { getProjects } from '@http/get-projects'
import { getTranslations } from 'next-intl/server'
import { CONTACT, normalizePathname, SITE_URL } from './site'

export type InfoPageKey = 'about' | 'contact' | 'privacy'

export interface InfoPageSection {
  heading: string
  body: string[]
}

export interface InfoPageContent {
  title: string
  lead: string
  sections: InfoPageSection[]
}

export async function getInfoPage(key: InfoPageKey): Promise<InfoPageContent> {
  const t = await getTranslations(`pages.${key}`)

  return {
    title: t('title'),
    lead: t('lead'),
    sections: t.raw('sections') as InfoPageSection[],
  }
}

async function infoMarkdown(key: InfoPageKey): Promise<string> {
  const [page, t] = await Promise.all([
    getInfoPage(key),
    getTranslations('pages'),
  ])

  const sections = page.sections
    .map(({ heading, body }) => `## ${heading}\n\n${body.join('\n\n')}`)
    .join('\n\n')

  const links =
    key === 'contact'
      ? `\n\n## ${t('nav.contact')}\n\n- ${t('contactLinks.email')}: ${CONTACT.email}\n- ${t('contactLinks.whatsapp')}: [${CONTACT.phone}](${CONTACT.whatsappUrl})\n- ${t('contactLinks.linkedin')}: ${CONTACT.linkedinUrl}\n- ${t('contactLinks.github')}: ${CONTACT.githubUrl}`
      : ''

  return `# ${page.title}\n\n${page.lead}\n\n${sections}${links}\n`
}

async function homeMarkdown(): Promise<string> {
  const t = await getTranslations()
  const list = (prefix: string, keys: readonly string[]) =>
    keys.map((key) => `- ${t(`${prefix}.${key}`)}`).join('\n')

  const solutions = ['s1', 's2', 's3', 's4', 's5', 's6']
    .map(
      (key) =>
        `- **${t(`solutions.${key}.title`)}**: ${t(`solutions.${key}.desc`)}`,
    )
    .join('\n')

  const experiences = [
    ['borebi', t('experiences.borebi.companyName')],
    ['solidTech', 'Solid Tech'],
    ['funprev', 'Funprev Bauru'],
  ]
    .map(
      ([key, company]) =>
        `### ${company}: ${t(`experiences.${key}.title`)}\n\n${t(`experiences.${key}.employmentType`)} · ${t(`experiences.${key}.employmentPeriod`)}\n\n${t(`experiences.${key}.description`)}`,
    )
    .join('\n\n')

  const proof = ['1', '2', '3', '4']
    .map(
      (n) =>
        `- **${t(`proof.stat${n}Value`)} ${t(`proof.stat${n}Label`)}**: ${t(`proof.stat${n}Note`)}`,
    )
    .join('\n')

  const objections = ['1', '2', '3', '4']
    .map((n) => `**${t(`objections.q${n}`)}** ${t(`objections.a${n}`)}`)
    .join('\n\n')

  const faq = ['1', '2', '3', '4', '5', '6']
    .map((n) => `**${t(`faq.q${n}`)}** ${t(`faq.a${n}`)}`)
    .join('\n\n')

  return `# ${t('hero.title')}: ${t('hero.headlinePre')} ${t('hero.headlineAccent')}

> ${t('hero.subtitle')}

${t('hero.available')}. ${t('work.openToValue')} · ${t('work.formatValue')} · ${t('work.languagesValue')}.

## ${t('pain.title')}

${t('pain.subtitle')}

${t('pain.worry')}:

${list('pain', ['q1', 'q2', 'q3', 'q4', 'q5'])}

${t('pain.closing')}

## ${t('steps.title')}

${t('steps.note')}

## ${t('solutions.title')}

${solutions}

## ${t('experiences.title').replace(/<\/?accent>/g, '')}

${experiences}

## ${t('proof.title')}

${proof}

## ${t('work.title')}

${list('work', ['i1', 'i2', 'i3', 'i4', 'i5', 'i6'])}

- ${t('work.bonus')}: ${t('work.bonusValue')}

## ${t('objections.title')}

${objections}

## ${t('faq.title')}

${faq}

## ${t('footer.label')}

${t('footer.title')}

- ${t('footer.rows.email')}: ${CONTACT.email}
- ${t('footer.rows.whatsapp')}: [${CONTACT.phone}](${CONTACT.whatsappUrl})
- ${t('footer.rows.linkedin')}: ${CONTACT.linkedinUrl}
- ${t('footer.rows.github')}: ${CONTACT.githubUrl}

## ${t('pages.home')}

- [${t('projects.title')}](${SITE_URL}/projects)
- [${t('pages.nav.about')}](${SITE_URL}/about)
- [${t('pages.nav.contact')}](${SITE_URL}/contact)
- [${t('pages.nav.privacy')}](${SITE_URL}/privacy)
`
}

async function projectsMarkdown(): Promise<string> {
  const t = await getTranslations('projects')
  const projects = await getProjects().catch(() => [])

  const items = projects.length
    ? projects
        .map((project) => {
          const topics = project.topics.map((topic) => `\`${topic}\``).join(' ')
          const demo = project.homepage
            ? ` · [${t('demo')}](${project.homepage})`
            : ''

          return `- [${project.name}](${project.html_url}): ${project.description} ${topics}${demo}`
        })
        .join('\n')
    : t('noProjects')

  return `# ${t('title')}\n\n${t('subtitle')}\n\n${items}\n`
}

export async function getMarkdownForPath(
  pathname: string,
): Promise<string | null> {
  switch (normalizePathname(pathname)) {
    case '/':
      return homeMarkdown()
    case '/projects':
      return projectsMarkdown()
    case '/about':
      return infoMarkdown('about')
    case '/contact':
      return infoMarkdown('contact')
    case '/privacy':
      return infoMarkdown('privacy')
    default:
      return null
  }
}

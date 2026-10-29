import { CONTACT, SITE_NAME, SITE_URL } from './site'

const address = {
  '@type': 'PostalAddress',
  addressLocality: 'Bauru',
  addressRegion: 'SP',
  addressCountry: 'BR',
}

const sameAs = [CONTACT.githubUrl, CONTACT.linkedinUrl]

export function buildSiteJsonLd() {
  const personId = `${SITE_URL}/#person`
  const organizationId = `${SITE_URL}/#organization`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: SITE_NAME,
        url: SITE_URL,
        jobTitle: 'Full-Stack Developer',
        description:
          'Junior full-stack developer with a Computer Science degree, working with React, Next.js, Node.js and TypeScript, with authentication, AWS serverless and automated tests.',
        email: CONTACT.email,
        telephone: CONTACT.phone,
        address,
        sameAs,
        knowsLanguage: ['pt-BR', 'en'],
        knowsAbout: [
          'TypeScript',
          'React',
          'Next.js',
          'Node.js',
          'Fastify',
          'PostgreSQL',
          'AWS serverless',
          'Authentication and access control',
        ],
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'UNISAGRADO',
        },
      },
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/android-chrome-512x512.png`,
        description:
          'Independent full-stack web development by Anderson Kaiti: React and Next.js interfaces over typed Node.js APIs.',
        founder: { '@id': personId },
        email: CONTACT.email,
        telephone: CONTACT.phone,
        address,
        sameAs,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'business inquiries',
          email: CONTACT.email,
          telephone: CONTACT.phone,
          availableLanguage: ['Portuguese', 'English'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: ['en', 'pt-BR'],
        author: { '@id': personId },
        publisher: { '@id': organizationId },
      },
    ],
  }
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

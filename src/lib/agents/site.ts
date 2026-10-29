import en from '../../../messages/en.json'

export const SITE_URL = 'https://andersonkaiti.com'
export const SITE_NAME = 'Anderson Kaiti'

const { values } = en.footer

export const CONTACT = {
  email: values.email,
  phone: values.whatsapp,
  whatsappUrl: `https://wa.me/${values.whatsapp.replace(/\D/g, '')}`,
  linkedinUrl: `https://www.linkedin.com/in/${values.linkedin}/`,
  githubUrl: `https://github.com/${values.github}`,
}

export const PAGE_PATHS = [
  '/',
  '/projects',
  '/about',
  '/contact',
  '/privacy',
] as const

export type PagePath = (typeof PAGE_PATHS)[number]

export function isPagePath(pathname: string): pathname is PagePath {
  return (PAGE_PATHS as readonly string[]).includes(pathname)
}

export function normalizePathname(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

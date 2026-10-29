import { SITE_URL } from './site'

export const MARKDOWN_HEADERS = {
  'Content-Type': 'text/markdown; charset=utf-8',
  Vary: 'Accept',
  'Cache-Control': 'private, no-store',
  'X-Content-Type-Options': 'nosniff',
}

export function markdownResponse(body: string, status = 200): Response {
  return new Response(body, { status, headers: MARKDOWN_HEADERS })
}

export function notFoundMarkdown(pathname: string): string {
  const shown = pathname.replace(/[`\r\n]/g, '').slice(0, 200)

  return `# 404: Page not found

The path \`${shown}\` does not exist on andersonkaiti.com, so there is no content to return for it.

Start from one of these instead:

- [llms.txt](${SITE_URL}/llms.txt): what this site is for and how to call it
- [Sitemap](${SITE_URL}/sitemap.xml): every public page
- [Home](${SITE_URL}/): overview of Anderson Kaiti, a junior full-stack developer
`
}

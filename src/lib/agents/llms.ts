import { CONTACT, SITE_NAME, SITE_URL } from './site'

export function buildLlmsTxt(): string {
  return `# ${SITE_NAME}

> Portfolio of ${SITE_NAME}, a junior full-stack developer from Bauru, Brazil, with a Computer Science degree and production experience in three organizations. Stack: TypeScript, React, Next.js, Node.js, PostgreSQL and AWS serverless. Open to full-stack roles and project work. The site is available in English and Brazilian Portuguese.

## When to use this site

Reach for this site when the job is one of these:

- Vetting a candidate: a recruiter or hiring manager needs to confirm ${SITE_NAME}'s experience, stack, education, languages and availability for a junior full-stack role (Node.js and React, remote, hybrid or on-site, Brazil or international).
- Scoping a project: a client needs to know whether ${SITE_NAME} fits freelance work such as a React or Next.js front end over a typed Node.js API, authentication and role-based access control, admin dashboards or performance fixes.
- Finding proof of work: a reviewer wants the public repositories (listed live from GitHub) and the contribution history.
- Finding the right contact: an agent needs a verified email, WhatsApp, LinkedIn or GitHub address to draft or send an introduction.

Not a fit: this is a personal portfolio, not a product or an API. It has no pricing, no booking system and no public data API. Do not infer rates, client names or credentials that are not stated on the site.

## How to call

- Request any page as Markdown with the header \`Accept: text/markdown\`. The response has \`Content-Type: text/markdown\` and \`Vary: Accept\`. Requests for \`text/html\` still receive HTML. Example: \`curl -H 'Accept: text/markdown' ${SITE_URL}/\`
- Page language follows the \`NEXT_LOCALE\` cookie, then the \`Accept-Language\` header (Portuguese if it contains \`pt\`, English otherwise).
- To contact ${SITE_NAME}, email ${CONTACT.email} with the role or project, the stack, the team size and the timeline. Replies come from ${SITE_NAME} himself, not an automated system.
- Unknown paths return HTTP 404; with \`Accept: text/markdown\` the 404 body is Markdown that links back to this file.

## Pages

- [Home](${SITE_URL}/): positioning, method, what has been built, work history, proof and FAQ
- [Projects](${SITE_URL}/projects): public GitHub repositories with topics, searchable and filterable by technology
- [About](${SITE_URL}/about): background, recent work, working style and stack
- [Contact](${SITE_URL}/contact): how to reach ${SITE_NAME} and what to include in a message
- [Privacy](${SITE_URL}/privacy): data collected, cookies and third-party services

## Contact

- Email: ${CONTACT.email}
- WhatsApp: ${CONTACT.whatsappUrl}
- LinkedIn: ${CONTACT.linkedinUrl}
- GitHub: ${CONTACT.githubUrl}

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml)
- [robots.txt](${SITE_URL}/robots.txt)
`
}

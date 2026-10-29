import { expect, test } from '@playwright/test'

const MARKDOWN = { Accept: 'text/markdown' }
const HTML = { Accept: 'text/html' }
const TRUST_PAGES = ['/about', '/contact', '/privacy']

function visibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function varies(vary: string | undefined): string[] {
  return (vary ?? '').split(',').map((token) => token.trim().toLowerCase())
}

function stripScripts(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
}

test.describe('Markdown content negotiation', () => {
  test('serves Markdown with Vary: Accept when asked', async ({ request }) => {
    const response = await request.get('/', { headers: MARKDOWN })
    const body = await response.text()

    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('text/markdown')
    expect(varies(response.headers().vary)).toContain('accept')
    expect(body.startsWith('# Anderson Kaiti')).toBe(true)
    expect(body).not.toContain('<html')
  })

  test('keeps serving HTML for text/html', async ({ request }) => {
    const response = await request.get('/', { headers: HTML })

    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('text/html')
    expect(response.headers()['cache-control']).toContain('no-store')
    expect(await response.text()).toContain('<html')
  })

  test('treats */* as HTML', async ({ request }) => {
    const response = await request.get('/', { headers: { Accept: '*/*' } })

    expect(response.headers()['content-type']).toContain('text/html')
  })

  for (const path of ['/projects', ...TRUST_PAGES]) {
    test(`serves ${path} as Markdown`, async ({ request }) => {
      const response = await request.get(path, { headers: MARKDOWN })

      expect(response.status()).toBe(200)
      expect(response.headers()['content-type']).toContain('text/markdown')
      expect((await response.text()).startsWith('# ')).toBe(true)
    })
  }

  test('follows the language preference', async ({ request }) => {
    const response = await request.get('/about', {
      headers: { ...MARKDOWN, 'Accept-Language': 'pt-BR,pt;q=0.9' },
    })

    expect(await response.text()).toContain('# Sobre Anderson Kaiti')
  })
})

test.describe('Agent-friendly 404', () => {
  const path = '/__agent-readiness-probe'

  test('returns a Markdown error body to Markdown clients', async ({
    request,
  }) => {
    const response = await request.get(path, { headers: MARKDOWN })
    const body = await response.text()

    expect(response.status()).toBe(404)
    expect(response.headers()['content-type']).toContain('text/markdown')
    expect(varies(response.headers().vary)).toContain('accept')
    expect(body.length).toBeGreaterThan(20)
    expect(body).toContain('/llms.txt')
    expect(body).toContain('/sitemap.xml')
  })

  test('keeps the HTML 404 for browsers', async ({ request }) => {
    const response = await request.get(path, { headers: HTML })

    expect(response.status()).toBe(404)
    expect(response.headers()['content-type']).toContain('text/html')
  })

  test('does not echo markup from the path', async ({ request }) => {
    const response = await request.get('/x%60%0A%23%20injected', {
      headers: MARKDOWN,
    })
    const body = await response.text()

    expect(response.status()).toBe(404)
    expect(body).not.toMatch(/^# injected/m)
  })
})

test.describe('Homepage without JavaScript', () => {
  test('has one H1 and enough meaningful text', async ({ request }) => {
    const html = await (await request.get('/', { headers: HTML })).text()

    expect(html.match(/<h1[\s>]/g)).toHaveLength(1)
    expect(visibleText(html).length).toBeGreaterThan(500)
  })

  test('has a text-to-markup ratio of at least 5%', async ({ request }) => {
    const html = await (await request.get('/', { headers: HTML })).text()
    const ratio = visibleText(html).length / stripScripts(html).length

    expect(ratio).toBeGreaterThanOrEqual(0.05)
  })
})

test.describe('JSON-LD on the homepage', () => {
  test('embeds Person, Organization and WebSite', async ({ request }) => {
    const html = await (await request.get('/', { headers: HTML })).text()
    const match = html.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    )

    expect(match).not.toBeNull()

    const graph = JSON.parse(match?.[1] ?? '{}')['@graph'] as {
      '@type': string
      contactPoint?: { contactType: string }
      address?: { '@type': string }
    }[]
    const types = graph.map((node) => node['@type'])
    const organization = graph.find((node) => node['@type'] === 'Organization')

    expect(types).toEqual(['Person', 'Organization', 'WebSite'])
    expect(organization?.contactPoint?.contactType).toBeTruthy()
    expect(organization?.address?.['@type']).toBe('PostalAddress')
  })
})

test.describe('llms.txt', () => {
  test('is served as plain text with when-to-use guidance', async ({
    request,
  }) => {
    const response = await request.get('/llms.txt')
    const body = await response.text()

    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('text/plain')
    expect(body).toMatch(/^# Anderson Kaiti$/m)
    expect(body).toMatch(/^## When to use this site$/m)
  })

  test('is not intercepted when Markdown is requested', async ({ request }) => {
    const response = await request.get('/llms.txt', { headers: MARKDOWN })

    expect(response.status()).toBe(200)
    expect(await response.text()).toMatch(/^# Anderson Kaiti$/m)
  })
})

test.describe('Trust pages', () => {
  for (const path of TRUST_PAGES) {
    for (const locale of ['en', 'pt-BR']) {
      test(`${path} has substantial content in ${locale}`, async ({
        request,
      }) => {
        const response = await request.get(path, {
          headers: { ...HTML, Cookie: `NEXT_LOCALE=${locale}` },
        })
        const html = await response.text()
        const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? ''

        expect(response.status()).toBe(200)
        expect(html.match(/<h1[\s>]/g)).toHaveLength(1)
        expect(visibleText(main).length).toBeGreaterThan(500)
        expect(html).toContain(
          `<link rel="canonical" href="https://andersonkaiti.com${path}"`,
        )
      })
    }
  }

  test('are listed in the sitemap', async ({ request }) => {
    const body = await (await request.get('/sitemap.xml')).text()

    for (const path of TRUST_PAGES) {
      expect(body).toContain(`https://andersonkaiti.com${path}</loc>`)
    }
  })

  test('are linked from the homepage footer', async ({ request }) => {
    const html = await (await request.get('/', { headers: HTML })).text()

    for (const path of TRUST_PAGES) {
      expect(html).toContain(`href="${path}"`)
    }
  })
})

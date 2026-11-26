import { expect, test } from '@playwright/test'

const COMPONENT_CLASSES = ['ak-skeleton', 'ak-word', 'ak-digits']

test.describe('Stylesheets', () => {
  test('define every component class the homepage markup uses', async ({
    request,
  }) => {
    const html = await (
      await request.get('/', { headers: { Accept: 'text/html' } })
    ).text()
    const links = [
      ...new Set(
        [...html.matchAll(/\/_next\/static\/[^"'\\\s]+\.css/g)].map(
          (match) => match[0],
        ),
      ),
    ]

    expect(links.length).toBeGreaterThan(0)

    const css = (
      await Promise.all(
        links.map(async (link) => (await request.get(link)).text()),
      )
    ).join('\n')

    for (const name of COMPONENT_CLASSES) {
      expect(html).toContain(`class="${name}`)
      expect(css.includes(`.${name}{`), `.${name} rule`).toBe(true)
    }
    expect(css.includes('.ak-digit{'), 'stale .ak-digit rule').toBe(false)
  })
})

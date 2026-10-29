import { buildLlmsTxt } from '@lib/agents/llms'
import { buildSiteJsonLd, serializeJsonLd } from '@lib/agents/structured-data'
import { expect, test } from '@playwright/test'

type Node = Record<string, unknown>

function nodeOfType(type: string): Node {
  const graph = buildSiteJsonLd()['@graph'] as Node[]
  const found = graph.find((node) => node['@type'] === type)

  if (!found) {
    throw new Error(`missing ${type}`)
  }

  return found
}

test.describe('JSON-LD', () => {
  test('describes a Person with identity fields', () => {
    const person = nodeOfType('Person')

    expect(person.name).toBe('Anderson Kaiti')
    expect(person.url).toBe('https://andersonkaiti.com')
    expect(String(person.description).length).toBeGreaterThan(40)
    expect(person.sameAs).toEqual(
      expect.arrayContaining([
        'https://github.com/andersonkaiti',
        'https://www.linkedin.com/in/andersonkaiti/',
      ]),
    )
  })

  test('Organization has contactPoint and a PostalAddress', () => {
    const organization = nodeOfType('Organization')
    const contactPoint = organization.contactPoint as Node
    const address = organization.address as Node

    expect(contactPoint['@type']).toBe('ContactPoint')
    expect(contactPoint.contactType).toBeTruthy()
    expect(contactPoint.email).toBe('anderkaiti@gmail.com')
    expect(address['@type']).toBe('PostalAddress')
    expect(address.addressLocality).toBe('Bauru')
    expect(address.addressCountry).toBe('BR')
  })

  test('serialises without a raw "<" so it cannot close the script tag', () => {
    const json = serializeJsonLd({ name: '</script><b>' })

    expect(json).not.toContain('<')
    expect(JSON.parse(json).name).toBe('</script><b>')
  })
})

test.describe('llms.txt', () => {
  const body = buildLlmsTxt()

  test('follows the llms.txt layout', () => {
    const lines = body.split('\n')

    expect(lines[0]).toBe('# Anderson Kaiti')
    expect(lines.find((line) => line.startsWith('>'))).toBeTruthy()
    expect(body).toMatch(/^## Pages$/m)
    expect(body).toMatch(/^- \[[^\]]+\]\(https:\/\/[^)]+\): .+$/m)
  })

  test('has a when-to-use section with concrete jobs', () => {
    expect(body).toMatch(/^## When to use this site$/m)
    expect(body).toContain('Vetting a candidate')
    expect(body).toContain('Scoping a project')
  })

  test('explains how an agent should call the site', () => {
    expect(body).toMatch(/^## How to call$/m)
    expect(body).toContain('Accept: text/markdown')
  })
})

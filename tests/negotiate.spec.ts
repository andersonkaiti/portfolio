import { prefersMarkdown } from '@lib/agents/negotiate'
import { expect, test } from '@playwright/test'

test.describe('prefersMarkdown', () => {
  test('is false without an Accept header', () => {
    expect(prefersMarkdown(null)).toBe(false)
    expect(prefersMarkdown('')).toBe(false)
  })

  test('is true for an explicit text/markdown request', () => {
    expect(prefersMarkdown('text/markdown')).toBe(true)
    expect(prefersMarkdown('text/markdown, text/plain;q=0.5')).toBe(true)
  })

  test('is false for browsers and wildcard-only clients', () => {
    expect(prefersMarkdown('text/html')).toBe(false)
    expect(prefersMarkdown('*/*')).toBe(false)
    expect(
      prefersMarkdown(
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      ),
    ).toBe(false)
  })

  test('honours quality values', () => {
    expect(prefersMarkdown('text/html;q=0.5, text/markdown')).toBe(true)
    expect(prefersMarkdown('text/markdown;q=0.5, text/html')).toBe(false)
    expect(prefersMarkdown('text/markdown;q=0')).toBe(false)
  })

  test('breaks ties by order of appearance', () => {
    expect(prefersMarkdown('text/markdown, text/html')).toBe(true)
    expect(prefersMarkdown('text/html, text/markdown')).toBe(false)
  })

  test('is case-insensitive and tolerates whitespace', () => {
    expect(prefersMarkdown(' Text/Markdown ; charset=utf-8 ')).toBe(true)
  })
})

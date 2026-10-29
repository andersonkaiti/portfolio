interface MediaRange {
  type: string
  quality: number
  index: number
}

function parseAccept(header: string): MediaRange[] {
  return header
    .split(',')
    .map((part, index) => {
      const [rawType = '', ...params] = part.split(';')
      const qParam = params
        .map((param) => param.trim().toLowerCase())
        .find((param) => param.startsWith('q='))
      const quality = qParam ? Number.parseFloat(qParam.slice(2)) : 1

      return {
        type: rawType.trim().toLowerCase(),
        quality: Number.isNaN(quality) ? 0 : quality,
        index,
      }
    })
    .filter((range) => range.type !== '')
}

export function prefersMarkdown(accept: string | null | undefined): boolean {
  if (!accept) {
    return false
  }

  const ranges = parseAccept(accept)
  const markdown = ranges.find((range) => range.type === 'text/markdown')

  if (!markdown || markdown.quality <= 0) {
    return false
  }

  const html = ranges.find((range) => range.type === 'text/html')

  if (!html) {
    return true
  }

  if (markdown.quality !== html.quality) {
    return markdown.quality > html.quality
  }

  return markdown.index < html.index
}

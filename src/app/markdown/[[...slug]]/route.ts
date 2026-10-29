import { getMarkdownForPath } from '@lib/agents/content'
import { markdownResponse, notFoundMarkdown } from '@lib/agents/markdown'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug = [] } = await params
  const pathname = `/${slug.join('/')}`
  const body = await getMarkdownForPath(pathname)

  if (body === null) {
    return markdownResponse(notFoundMarkdown(pathname), 404)
  }

  return markdownResponse(body)
}

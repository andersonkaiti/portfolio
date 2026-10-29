import { prefersMarkdown } from '@lib/agents/negotiate'
import { normalizePathname } from '@lib/agents/site'
import { type NextRequest, NextResponse } from 'next/server'

const FILE_EXTENSION = /\.[a-z0-9]+$/i

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    !prefersMarkdown(request.headers.get('accept')) ||
    FILE_EXTENSION.test(pathname)
  ) {
    const response = NextResponse.next()
    response.headers.append('Vary', 'Accept')
    return response
  }

  const normalized = normalizePathname(pathname)
  const target = new URL(request.url)
  target.pathname = normalized === '/' ? '/markdown' : `/markdown${normalized}`

  return NextResponse.rewrite(target)
}

export const config = {
  matcher: ['/((?!_next/|markdown).*)'],
}

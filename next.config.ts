import type { NextConfig } from 'next'
import { HTML_LIMITED_BOT_UA_RE } from 'next/dist/shared/lib/router/utils/html-bots'
import createNextIntlPlugin from 'next-intl/plugin'

const AGENT_USER_AGENTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'CCBot',
  'Amazonbot',
  'meta-externalagent',
  'meta-externalfetcher',
  'Bytespider',
  'cohere-ai',
  'MistralAI-User',
  'DuckAssistBot',
  'YouBot',
  'curl',
  'Wget',
  'python-requests',
  'python-httpx',
  'aiohttp',
  'axios',
  'node-fetch',
  'Go-http-client',
]

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  htmlLimitedBots: new RegExp(
    [HTML_LIMITED_BOT_UA_RE.source, ...AGENT_USER_AGENTS].join('|'),
    'i',
  ),
  experimental: {
    turbopackFileSystemCacheForDev: true,
    turbopackFileSystemCacheForBuild: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.microlink.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ghchart.rshah.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactCompiler: true,
  cacheComponents: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

export default withNextIntl(nextConfig)

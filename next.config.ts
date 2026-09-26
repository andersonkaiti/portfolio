import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    turbopackFileSystemCacheForDev: true,
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

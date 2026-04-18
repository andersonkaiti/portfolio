import { Footer } from '@components/footer'
import { TooltipProvider } from '@components/ui/tooltip'
import { AosProvider } from '@providers/aos'
import { LenisProvider } from '@providers/lenis'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { Suspense } from 'react'
import { NavigationBar } from './_components/navigation-bar'
import './globals.css'

const MontserratSans = Montserrat({
  variable: '--font-montserrat-sans',
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale().catch(() => 'en')
  const t = await getTranslations('metadata.home').catch(
    () => (key: string) => key,
  )
  const ogLocale = locale === 'pt-BR' ? 'pt_BR' : 'en_US'

  return {
    metadataBase: new URL('https://andersonkaiti.com'),
    title: typeof t === 'function' ? t('title') : 'Anderson Kaiti',
    description: typeof t === 'function' ? t('description') : 'Portfolio',
    applicationName: 'Anderson Kaiti - Portfolio',
    authors: [{ name: 'Anderson Kaiti', url: 'https://andersonkaiti.com' }],
    keywords: [
      'Anderson Kaiti',
      'Full-Stack Developer',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'TailwindCSS',
      'Docker',
      'Portfolio',
    ],
    alternates: {
      canonical: 'https://andersonkaiti.com',
    },
    openGraph: {
      type: 'website',
      url: 'https://andersonkaiti.com',
      locale: ogLocale,
      title: typeof t === 'function' ? t('title') : 'Anderson Kaiti',
      description: typeof t === 'function' ? t('description') : 'Portfolio',
      siteName: 'Anderson Kaiti',
    },
    twitter: {
      card: 'summary_large_image',
      title: typeof t === 'function' ? t('title') : 'Anderson Kaiti',
      description: typeof t === 'function' ? t('description') : 'Portfolio',
    },
    verification: {
      google: 'googlec07cb626ec36686a',
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: 'AK - Portfolio',
    },
    formatDetection: {
      telephone: false,
    },
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        {
          url: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          url: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      apple: [
        {
          url: '/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
    },
  }
}

async function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${MontserratSans.variable} relative antialiased transition-colors`}
      >
        <Suspense fallback={null}>
          <I18nProvider>
            <LenisProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                disableTransitionOnChange
                enableSystem
              >
                <AosProvider>
                  <TooltipProvider>
                    <NavigationBar />

                    {children}

                    <Footer />
                  </TooltipProvider>
                </AosProvider>
              </ThemeProvider>
            </LenisProvider>
          </I18nProvider>
        </Suspense>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

import { Spotlight } from '@components/ui/spotlight'
import { AosProvider } from '@providers/aos'
import { LenisProvider } from '@providers/lenis'
import { QueryProvider } from '@providers/query-provider'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { NavigationBar } from './_components/navigation-bar'
import './globals.css'

const MontserratSans = Montserrat({
  variable: '--font-montserrat-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Portfolio - Anderson Kaiti',
  description: 'Computer Scientist and Full-Stack Developer',
  applicationName: 'Anderson Kaiti - Portfolio',
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
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
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

export default function RootLayout({
  header,
  experiences,
  projects,
  contributions,
  technologies,
  education,
}: Readonly<{
  header: React.ReactNode
  experiences: React.ReactNode
  projects: React.ReactNode
  contributions: React.ReactNode
  technologies: React.ReactNode
  education: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <LenisProvider>
        <body
          className={`${MontserratSans.variable} relative antialiased transition-colors`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            <AosProvider>
              <QueryProvider>
                <Spotlight />

                <NavigationBar />
                <main className="mx-auto flex min-h-100vh max-w-7xl flex-col items-center justify-center gap-8 px-2 py-10 md:gap-20 md:px-20 md:py-30">
                  {header}
                  {experiences}
                  {projects}
                  {contributions}
                  {technologies}
                  {education}
                </main>
              </QueryProvider>
            </AosProvider>
          </ThemeProvider>

          <Analytics />
          <SpeedInsights />
        </body>
      </LenisProvider>
    </html>
  )
}

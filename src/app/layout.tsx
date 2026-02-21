import { Footer } from '@components/footer'
import { TooltipProvider } from '@components/ui/tooltip'
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
  children,
}: Readonly<{
  children: React.ReactNode
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
              <TooltipProvider>
                <QueryProvider>
                  <NavigationBar />

                  {children}

                  <Footer />
                </QueryProvider>
              </TooltipProvider>
            </AosProvider>
          </ThemeProvider>

          <Analytics />
          <SpeedInsights />
        </body>
      </LenisProvider>
    </html>
  )
}

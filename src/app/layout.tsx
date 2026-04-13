import { Footer } from '@components/footer'
import { TooltipProvider } from '@components/ui/tooltip'
import { AosProvider } from '@providers/aos'
import { LenisProvider } from '@providers/lenis'
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
  metadataBase: new URL('https://andersonkaiti.com'),
  title: 'Portfolio - Anderson Kaiti',
  description: 'Computer Scientist and Full-Stack Developer',
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
    locale: 'pt_BR',
    title: 'Portfolio - Anderson Kaiti',
    description: 'Computer Scientist and Full-Stack Developer',
    siteName: 'Anderson Kaiti',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Anderson Kaiti',
    description: 'Computer Scientist and Full-Stack Developer',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${MontserratSans.variable} relative antialiased transition-colors`}
      >
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

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

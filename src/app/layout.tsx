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
  title: 'Anderson Kaiti | Full-Stack Developer',
  description:
    'Anderson Kaiti é um Full-Stack Developer formado em Ciência da Computação, especializado em React, Next.js, Node.js e TypeScript. Disponível para novas oportunidades.',
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
    title: 'Anderson Kaiti | Full-Stack Developer',
    description:
      'Anderson Kaiti é um Full-Stack Developer formado em Ciência da Computação, especializado em React, Next.js, Node.js e TypeScript. Disponível para novas oportunidades.',
    siteName: 'Anderson Kaiti',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anderson Kaiti | Full-Stack Developer',
    description:
      'Anderson Kaiti é um Full-Stack Developer formado em Ciência da Computação, especializado em React, Next.js, Node.js e TypeScript. Disponível para novas oportunidades.',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Anderson Kaiti',
      givenName: 'Anderson',
      familyName: 'Kaiti',
      url: 'https://andersonkaiti.com',
      email: 'mailto:anderkaiti@gmail.com',
      jobTitle: 'Full-Stack Web Developer',
      description:
        'Full-Stack Developer formado em Ciência da Computação pela UNISAGRADO, especializado em React, Next.js, Node.js e TypeScript.',
      knowsAbout: [
        'React',
        'Next.js',
        'TypeScript',
        'Node.js',
        'PostgreSQL',
        'TailwindCSS',
        'Docker',
        'React Native',
        'Laravel',
      ],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'UNISAGRADO',
        url: 'https://www.unisagrado.edu.br',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Solid Tech',
      },
      sameAs: [
        'https://github.com/andersonkaiti',
        'https://www.linkedin.com/in/anderson-kaiti-67906126a',
      ],
    },
    {
      '@type': 'WebSite',
      name: 'Anderson Kaiti - Portfolio',
      url: 'https://andersonkaiti.com',
      author: {
        '@type': 'Person',
        name: 'Anderson Kaiti',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is static, server-rendered, and safe
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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

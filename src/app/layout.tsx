import { Spotlight } from '@components/ui/spotlight'
import { AosProvider } from '@providers/aos'
import { LenisProvider } from '@providers/lenis'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Montserrat } from 'next/font/google'
import { NavigationBar } from './_components/navbar'
import './globals.css'

const MontserratSans = Montserrat({
  variable: '--font-montserrat-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Portfolio - Anderson Kaiti',
  description: 'Computer Scientist and Full-Stack Developer',
}

export default function RootLayout({
  education,
  header,
  projects,
  experiences,
  technologies,
}: Readonly<{
  education: React.ReactNode
  header: React.ReactNode
  projects: React.ReactNode
  experiences: React.ReactNode
  technologies: React.ReactNode
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
              <Spotlight />

              <NavigationBar />
              <main className="mx-auto flex min-h-100vh max-w-7xl flex-col items-center justify-center gap-8 px-2 py-10 md:gap-20 md:px-20 md:py-30">
                {header}
                {technologies}
                {projects}
                {experiences}
                {education}
              </main>
            </AosProvider>
          </ThemeProvider>
        </body>
      </LenisProvider>
    </html>
  )
}

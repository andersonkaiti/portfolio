import { LenisProvider } from '@providers/lenis'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { NavigationBar } from './_components/navbar'
import './globals.css'

const MontserratSans = Montserrat({
  variable: '--font-montserrat-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Portfólio - Anderson Kaiti',
  description: 'Cientista da Computação e Desenvolvedor Full-Stack',
}

export default function RootLayout({
  certifications,
  education,
  header,
  projects,
  technologies,
}: Readonly<{
  certifications: React.ReactNode
  education: React.ReactNode
  header: React.ReactNode
  projects: React.ReactNode
  technologies: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <LenisProvider>
        <body className={`${MontserratSans.variable} relative antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            <NavigationBar />
            <main className="mx-auto flex min-h-100vh max-w-7xl flex-col items-center justify-center gap-8 px-2 py-10 md:gap-20 md:px-20 md:py-30">
              {header}
              {technologies}
              {projects}
              {education}
              {certifications}
            </main>
          </ThemeProvider>
        </body>
      </LenisProvider>
    </html>
  )
}

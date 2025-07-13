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
  children,
}: Readonly<{
  children: React.ReactNode
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
            {children}
          </ThemeProvider>
        </body>
      </LenisProvider>
    </html>
  )
}

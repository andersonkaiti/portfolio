import { LenisProvider } from '@providers/lenis'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
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
    <html lang="en">
      <LenisProvider>
        <body
          className={`${MontserratSans.variable} dark relative antialiased`}
        >
          <NavigationBar />
          {children}
        </body>
      </LenisProvider>
    </html>
  )
}

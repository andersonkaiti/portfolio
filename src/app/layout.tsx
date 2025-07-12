import SmoothScrolling from '@lib/lenis'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
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
      <SmoothScrolling>
        <body className={`${MontserratSans.variable} dark antialiased`}>
          {children}
        </body>
      </SmoothScrolling>
    </html>
  )
}

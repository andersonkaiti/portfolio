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
    <html className="dark" lang="en">
      <body className={`${MontserratSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}

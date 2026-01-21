import { cn } from '@lib/utils'
import { Playfair_Display } from 'next/font/google'
import type { HTMLAttributes } from 'react'

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
})

export function SectionContainer({
  children,
  ...props
}: { children: React.ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <section className="w-full space-y-4 px-6 md:space-y-8" {...props}>
      {children}
    </section>
  )
}

export function SectionHeader({
  children,
  ...rest
}: { children: React.ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <header className="space-y-4" {...rest}>
      {children}
    </header>
  )
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-balance text-center font-semibold text-5xl tracking-wide',
        playfairDisplay.className,
      )}
    >
      {children}
    </h1>
  )
}

export function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-balance text-center text-lg leading-7">{children}</h4>
  )
}

export function SectionUnderline() {
  return (
    <div className="mx-auto h-px w-1/2 bg-linear-to-r from-transparent via-black/20 to-transparent dark:via-white/20" />
  )
}

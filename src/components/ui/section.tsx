import { cn } from '@lib/utils'
import { JetBrains_Mono } from 'next/font/google'
import type { HTMLAttributes } from 'react'

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jet-brains-mono',
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
    <header className="space-y-4 mb-8" {...rest}>
      {children}
    </header>
  )
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-balance font-semibold tracking-wide uppercase text-primary text-sm md:text-base',
        jetBrainsMono.className,
      )}
    >
      {children}
    </h1>
  )
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-balance text-3xl font-semibold md:text-5xl">
      {children}
    </h1>
  )
}

export function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-balance leading-7 text-muted-foreground">{children}</h4>
  )
}

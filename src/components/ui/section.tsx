import { jetBrainsMono } from '@lib/fonts'
import { cn } from '@lib/utils'
import type { HTMLAttributes } from 'react'

export function SectionContainer({
  children,
  ...props
}: { children: React.ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className="w-full scroll-mt-[150px] space-y-4 px-6 md:space-y-8"
      {...props}
    >
      {children}
    </section>
  )
}

export function SectionHeader({
  children,
  ...rest
}: { children: React.ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <header className="space-y-4 mb-8 text-center" {...rest}>
      {children}
    </header>
  )
}

export function SectionLabel({
  children,
  ...rest
}: { children: React.ReactNode } & HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-balance font-semibold tracking-wide uppercase text-primary text-sm md:text-base',
        jetBrainsMono.className,
      )}
      {...rest}
    >
      {children}
    </p>
  )
}

export function SectionTitle({
  children,
  ...rest
}: { children: React.ReactNode } & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className="text-balance text-3xl font-semibold md:text-5xl" {...rest}>
      {children}
    </h2>
  )
}

export function SectionSubtitle({
  children,
  ...rest
}: { children: React.ReactNode } & HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className="text-balance leading-7 text-muted-foreground" {...rest}>
      {children}
    </p>
  )
}

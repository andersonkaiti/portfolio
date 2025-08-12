import type { HTMLAttributes } from 'react'

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
    <h1 className="scroll-m-20 text-balance text-center font-semibold text-4xl tracking-wide">
      {children}
    </h1>
  )
}

export function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="scroll-m-20 text-balance text-center font-light text-lg text-muted-foreground tracking-tight">
      {children}
    </h4>
  )
}

export function SectionUnderline() {
  return (
    <div className="mx-auto h-[1px] w-1/2 bg-gradient-to-r from-transparent via-black/20 to-transparent dark:via-white/20" />
  )
}

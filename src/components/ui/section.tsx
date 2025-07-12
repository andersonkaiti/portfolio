export function SectionContainer({ children }: { children: React.ReactNode }) {
  return <section className="space-y-8 px-6 md:space-y-16">{children}</section>
}

export function SectionHeader({ children }: { children: React.ReactNode }) {
  return <header className="space-y-4">{children}</header>
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-balance text-center font-bold text-4xl tracking-wide">
      {children}
    </h1>
  )
}

export function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="scroll-m-20 text-center font-semibold text-muted-foreground text-xl tracking-tight">
      {children}
    </h4>
  )
}

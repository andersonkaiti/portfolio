interface IBadgeStackProps {
  tech: {
    name: string
    logo:
      | {
          dark: string
          light: string
        }
      | string
  }
  index: number
}

export function BadgeStack({ tech, index }: IBadgeStackProps) {
  return (
    <div
      className="relative flex cursor-pointer items-center justify-center gap-2 rounded-full border-border border-t-2 px-3 py-2 text-xs shadow-2xl sm:text-sm dark:border-accent bg-background"
      data-aos="fade-down"
      data-aos-delay={40 * index}
      key={tech.name}
    >
      {typeof tech.logo === 'object' ? (
        <>
          <img
            alt={tech.name}
            className="hidden size-5 dark:flex"
            src={tech.logo.dark}
          />
          <img
            alt={tech.name}
            className="flex size-5 dark:hidden"
            src={tech.logo.light}
          />
        </>
      ) : (
        <img alt={tech.name} className="size-5" src={tech.logo} />
      )}

      <span className="whitespace-nowrap">{tech.name}</span>
    </div>
  )
}

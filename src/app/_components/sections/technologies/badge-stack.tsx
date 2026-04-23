import Image from 'next/image'

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
      data-aos="fade-up"
      data-aos-delay={40 * index}
      key={tech.name}
      style={{ transitionDelay: `${40 * index}ms` }}
    >
      {typeof tech.logo === 'object' ? (
        <>
          <Image
            alt={tech.name}
            className="hidden size-5 dark:flex"
            src={tech.logo.dark}
            width={20}
            height={20}
          />
          <Image
            alt={tech.name}
            className="flex size-5 dark:hidden"
            src={tech.logo.light}
            width={20}
            height={20}
          />
        </>
      ) : (
        <Image
          alt={tech.name}
          className="size-5"
          src={tech.logo}
          width={20}
          height={20}
        />
      )}

      <span className="whitespace-nowrap">{tech.name}</span>
    </div>
  )
}

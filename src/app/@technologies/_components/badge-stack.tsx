import Image, { type StaticImageData } from 'next/image'

interface IBadgeStackProps {
  tech: {
    name: string
    logo:
      | {
          dark: StaticImageData
          light: StaticImageData
        }
      | StaticImageData
  }
  index: number
}

export function BadgeStack({ tech, index }: IBadgeStackProps) {
  return (
    <div
      className="relative flex cursor-pointer items-center justify-center gap-2 rounded-full border-border border-t-2 px-3 py-2 text-xs shadow-2xl sm:text-sm dark:border-accent bg-background"
      data-aos="fade-down"
      data-aos-delay={100 * index}
      key={tech.name}
    >
      {'dark' in tech.logo && 'light' in tech.logo ? (
        <>
          <Image
            alt={tech.name}
            className="hidden size-5 dark:flex"
            sizes="28px 32px 40px"
            src={tech.logo?.dark}
          />
          <Image
            alt={tech.name}
            className="flex size-5 dark:hidden"
            sizes="28px 32px 40px"
            src={tech.logo?.light}
          />
        </>
      ) : (
        <Image alt={tech.name} className="size-5" src={tech.logo} />
      )}

      <span className="whitespace-nowrap">{tech.name}</span>
    </div>
  )
}

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
      className="relative rounded-full border-border border-t-2 p-3 text-xs shadow-2xl sm:p-4 sm:text-sm dark:border-accent bg-background"
      data-aos="fade-down"
      data-aos-delay={100 * index}
      key={tech.name}
    >
      {'dark' in tech.logo && 'light' in tech.logo ? (
        <>
          <Image
            alt={tech.name}
            className="hidden size-7 xs:size-8 md:size-10 dark:flex"
            sizes="28px 32px 40px"
            src={tech.logo?.dark}
          />
          <Image
            alt={tech.name}
            className="flex size-7 xs:size-8 md:size-10 dark:hidden"
            sizes="28px 32px 40px"
            src={tech.logo?.light}
          />
        </>
      ) : (
        <Image
          alt={tech.name}
          className="size-7 xs:size-8 md:size-10"
          sizes="28px 32px 40px"
          src={tech.logo}
        />
      )}
    </div>
  )
}

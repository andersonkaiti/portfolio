import { Badge } from '@components/ui/badge'
import Image from 'next/image'
import type { ITechnology } from 'types/stack'

interface IBadgeStackProps {
  tech: ITechnology
  index: number
}

export function BadgeStack({ tech, index }: IBadgeStackProps) {
  return (
    <Badge
      className="relative rounded-full border-border border-t-2 px-5 py-2 text-sm shadow-2xl dark:border-accent"
      data-aos="fade-down"
      data-aos-delay={100 * index}
      key={tech.name}
      variant="outline"
    >
      {'dark' in tech.logo && 'light' in tech.logo ? (
        <>
          <Image
            alt={tech.name}
            className="mr-2 hidden size-4 dark:flex"
            src={tech.logo?.dark}
          />
          <Image
            alt={tech.name}
            className="mr-2 flex size-4 dark:hidden"
            src={tech.logo?.light}
          />
        </>
      ) : (
        <Image alt={tech.name} className="mr-2 size-4" src={tech.logo} />
      )}
      {tech.name}
    </Badge>
  )
}

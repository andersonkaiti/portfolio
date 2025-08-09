'use client'

import { Badge } from '@components/ui/badge'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import type { ITechnology } from 'types/stack'

interface IBadgeStackProps {
  tech: ITechnology
}

export function BadgeStack({ tech }: IBadgeStackProps) {
  const { resolvedTheme } = useTheme()

  const getLogo = () => {
    if (typeof tech.logo === 'string') {
      return tech.logo
    }

    if ('dark' in tech.logo && 'light' in tech.logo) {
      return resolvedTheme === 'dark' ? tech.logo.dark : tech.logo.light
    }

    return tech.logo
  }

  const logo = getLogo()

  return (
    <Badge
      className="relative rounded-lg border-border border-t-2 px-3 py-2 text-sm shadow-2xl dark:border-accent"
      key={tech.name}
      variant="outline"
    >
      <Image alt={tech.name} className="mr-2 size-5" src={logo} />
      {tech.name}
    </Badge>
  )
}

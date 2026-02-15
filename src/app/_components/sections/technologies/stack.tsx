import { Card, CardContent } from '@components/ui/card'
import type { LucideIcon } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import { BadgeStack } from './badge-stack'

interface IStackProps {
  stack: {
    id: number
    category: string
    icon: LucideIcon
    technologies: {
      name: string
      logo:
        | {
            dark: StaticImageData
            light: StaticImageData
          }
        | StaticImageData
      link?: string
    }[]
  }
}

export function Stack({ stack: { technologies } }: IStackProps) {
  return (
    <Card className="h-full border-none bg-transparent shadow-none">
      <CardContent className="flex flex-wrap justify-center gap-2">
        {technologies.map((tech, index: number) => (
          <BadgeStack key={tech.name} index={index} tech={tech} />
        ))}
      </CardContent>
    </Card>
  )
}

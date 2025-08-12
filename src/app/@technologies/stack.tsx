import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import type { IStack } from 'types/stack'
import { BadgeStack } from './_components/badge-stack'

export function Stack({ category, icon: Icon, technologies, id }: IStack) {
  return (
    <Card className="h-full border-none bg-transparent shadow-none">
      <CardHeader
        className="flex items-center justify-center gap-4"
        data-aos="fade-down"
        data-aos-delay={100 * id}
      >
        <Icon className="!size-5" />
        <CardTitle>{category}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap justify-center gap-2">
        {technologies.map((tech, index: number) => (
          <BadgeStack index={index} key={tech.name} tech={tech} />
        ))}
      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import type { IStack } from 'types/stack'
import { BadgeStack } from './_components/badge-stack'

export function Stack({ category, icon: Icon, technologies }: IStack) {
  return (
    <Card className="h-full border-none bg-transparent shadow-none">
      <CardHeader className="flex items-center justify-center gap-4">
        <Icon className="!size-5" />
        <CardTitle>{category}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap justify-center gap-2">
        {technologies.map((tech) => (
          <BadgeStack key={tech.name} tech={tech} />
        ))}
      </CardContent>
    </Card>
  )
}

import { Badge } from '@components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import type { IStack } from 'types/stack'

export function Stack({ category, icon: Icon, technologies }: IStack) {
  return (
    <Card className="group h-full cursor-pointer bg-background hover:bg-card/20">
      <CardHeader className="flex flex-col items-center justify-center gap-6">
        <Badge
          className="rounded-full p-4 shadow-emerald-500/50 shadow-lg transition-colors duration-300 group-hover:border-emerald-500"
          variant="outline"
        >
          <Icon className="!size-10" />
        </Badge>
        <CardTitle>{category}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Badge
            className="border-emerald-500/40 bg-emerald-500/10 text-emerald-500"
            key={tech}
            variant="outline"
          >
            {tech}
          </Badge>
        ))}
      </CardContent>
    </Card>
  )
}

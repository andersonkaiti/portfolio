import { Badge } from '@components/ui/badge'
import { Card, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { formatTitle } from '@utils/format-title'
import dayjs from 'dayjs'
import { Award, Calendar } from 'lucide-react'
import type { IProject } from 'types/project'

export function Certification({
  description,
  name: title,
  created_at,
}: IProject) {
  const [platform, time] = description?.split(' - ') || []

  return (
    <Card className="border-0 border-b-1 border-b-emerald-500 bg-transparent shadow-lg transition-all duration-300 hover:shadow-emerald-500/20">
      <CardHeader className="flex gap-4">
        <Badge className="border-emerald-500/20 bg-emerald-500/10 p-2">
          <Award className="!size-5.5 text-emerald-500" />
        </Badge>
        <div>
          <CardTitle className="scroll-m-20 font-semibold text-base tracking-tight">
            {formatTitle(title)}
          </CardTitle>
          <h4 className="scroll-m-20 text-muted-foreground text-xs tracking-tight">
            {formatTitle(platform || '')}
          </h4>
        </div>
      </CardHeader>
      <CardFooter>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Calendar className="!size-3" />
          {dayjs(created_at).format('YYYY')}
        </div>
        {time && (
          <Badge className="ml-auto rounded-full border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
            {time}
          </Badge>
        )}
      </CardFooter>
    </Card>
  )
}

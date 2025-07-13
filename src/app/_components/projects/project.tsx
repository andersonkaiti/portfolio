import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { formatTitle } from '@utils/format-title'
import { formatTopic } from '@utils/format-topic'
import { Github, Link2 } from 'lucide-react'
import Link from 'next/link'
import type { IProject } from 'types/project'

export function Project({
  name,
  description,
  html_url,
  homepage,
  topics,
}: IProject) {
  return (
    <Card className="border-0 border-b-1 border-b-emerald-500 bg-transparent shadow-lg transition-all duration-300 hover:shadow-emerald-500/20">
      <CardHeader className="space-y-4">
        <CardTitle className="tracking-wider">{formatTitle(name)}</CardTitle>
        <CardDescription className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Badge
              className="rounded-full border-emerald-500/40 bg-emerald-500/10 text-emerald-500"
              key={topic}
              variant="outline"
            >
              {formatTopic(topic)}
            </Badge>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-light">{description}</p>
      </CardContent>
      <CardFooter className="mt-auto flex justify-between gap-2">
        <Link href={html_url} target="_blank">
          <Button variant="outline">
            {' '}
            <Github /> Código
          </Button>
        </Link>

        {homepage && (
          <Link href={homepage} target="_blank">
            <Button className="border border-emerald-300" variant="default">
              {' '}
              <Link2 /> Demo
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}

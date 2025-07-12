import { Avatar, AvatarImage } from '@components/ui/avatar'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { Cpu, FileUser, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { Code } from './code'

export function Header() {
  return (
    <header className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2">
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="flex items-center gap-4">
          <Avatar className="size-30 ring-3 ring-emerald-500/20">
            <AvatarImage src="/foto.jpeg" />
          </Avatar>
          <CardTitle>
            <div className="flex items-center gap-2">
              <Cpu className="size-5 text-emerald-500" />
              <Badge
                className="rounded-full border-emerald-500/50 bg-emerald-500/20 shadow-emerald-500/20 shadow-lg"
                variant="outline"
              >
                Cientista da Computação
              </Badge>
            </div>
            <h1 className="scroll-m-20 text-balance break-words text-start font-extrabold text-4xl tracking-wide">
              Anderson Kaiti
            </h1>
            <span className="font-light text-emerald-500">
              Disponível para projetos
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="text-justify font-light text-lg">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Estagiário de TI com atuação em desenvolvimento web, me destaco por
            entregar soluções robustas e escaláveis em ambientes modernos. Tenho
            domínio em{' '}
            <strong className="text-emerald-500">
              HTML5, CSS3, JavaScript, TypeScript, Node.js, MySQL, React.js,
              Next.js, Prisma, Firebase e Docker
            </strong>
            .
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Busco sempre entender profundamente o{' '}
            <strong className="text-emerald-500">“porquê”</strong> por trás de
            cada escolha técnica e arquitetural, e sou movido por desafios que
            exigem pensamento fora da caixa e inovação constante.
          </p>
        </CardContent>

        <CardFooter className="space-x-4">
          <Link href="https://github.com/andersonkaiti" target="_blank">
            <Button variant="outline">
              <Github /> GitHub
            </Button>
          </Link>
          <Link
            href="https://www.linkedin.com/in/anderson-kaiti-67906126a"
            target="_blank"
          >
            <Button variant="outline">
              <Linkedin /> LinkedIn
            </Button>
          </Link>
          <Link href="/anderson-kaiti-curriculo.pdf" target="_blank">
            <Button className="border border-emerald-300 bg-emerald-500 shadow-emerald-500/40 shadow-lg transition-all duration-300">
              <FileUser />
              Currículo
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Code />
    </header>
  )
}

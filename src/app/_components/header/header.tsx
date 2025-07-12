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
import {
  Cpu,
  FileUser,
  Github,
  Linkedin,
  MapPin,
  MessageCircle,
} from 'lucide-react'
import Link from 'next/link'
import { Code } from './code'

export function Header() {
  return (
    <header
      className="grid grid-cols-1 items-center gap-4 xl:grid-cols-2"
      id="presentation"
    >
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="flex flex-col items-center gap-4 md:flex-row">
          <Avatar className="size-30 ring-3 ring-emerald-500/20">
            <AvatarImage src="/foto.jpeg" />
          </Avatar>
          <CardTitle className="flex flex-col items-center md:items-start">
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

            <span className="mt-2 flex gap-1 font-light text-emerald-500">
              <MapPin className="size-4" /> Bauru, SP - Brasil
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="text-justify font-light text-lg">
          <h3 className="scroll-m-20 font-semibold text-2xl text-emerald-500 tracking-tight">
            Desenvolvedor Web Full-Stack
          </h3>
          <span className="mb-4 font-light text-sm">
            Disponível para trabalhos
          </span>
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

        <CardFooter className="flex flex-wrap gap-2 sm:gap-4">
          <Link
            className="w-full sm:w-fit"
            href="https://github.com/andersonkaiti"
            target="_blank"
          >
            <Button className="w-full" variant="outline">
              <Github /> GitHub
            </Button>
          </Link>
          <Link
            className="w-full sm:w-fit"
            href="https://www.linkedin.com/in/anderson-kaiti-67906126a"
            target="_blank"
          >
            <Button className="w-full" variant="outline">
              <Linkedin /> LinkedIn
            </Button>
          </Link>
          <Link
            className="w-full sm:w-fit"
            href="https://www.linkedin.com/in/anderson-kaiti-67906126a"
            target="_blank"
          >
            <Button className="w-full" variant="outline">
              <MessageCircle /> WhatsApp
            </Button>
          </Link>
          <Link
            className="w-full sm:w-fit"
            href="/anderson-kaiti-curriculo.pdf"
            target="_blank"
          >
            <Button className="w-full border border-emerald-300 bg-emerald-500 shadow-emerald-500/40 shadow-lg transition-all duration-300">
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

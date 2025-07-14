import { Badge } from '@components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import {
  SectionContainer,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { Globe, GraduationCap } from 'lucide-react'

export default function Education() {
  return (
    <SectionContainer id="education">
      <SectionHeader>
        <SectionTitle>Formações</SectionTitle>
        <SectionSubtitle>
          Minha educação formal e desenvolvimento de idiomas
        </SectionSubtitle>
      </SectionHeader>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="bg-transparent">
          <CardHeader className="flex gap-2">
            <Badge className="border-emerald-500/20 bg-emerald-500/10 p-2">
              <GraduationCap className="!size-10 text-emerald-500" />
            </Badge>
            <div>
              <CardTitle className="scroll-m-20 font-semibold text-xl tracking-tight">
                Graduação
              </CardTitle>
              <h4 className="scroll-m-20 font-semibold text-base text-muted-foreground tracking-tight">
                UNISAGRADO • 2022-2025
              </h4>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardTitle>Ciência da Computação</CardTitle>
            <p>
              Cursando Ciência da Computação no UNISAGRADO, com término previsto
              para 2025. Focado em desenvolvimento de software, algoritmos e
              estruturas de dados.
            </p>
          </CardContent>
          <CardFooter>
            <Badge className="rounded-full border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
              Formatura: 2025
            </Badge>
          </CardFooter>
        </Card>

        <Card className="bg-transparent">
          <CardHeader className="flex gap-2">
            <Badge className="border-emerald-500/20 bg-emerald-500/10 p-2">
              <Globe className="!size-10 text-emerald-500" />
            </Badge>
            <div>
              <CardTitle className="scroll-m-20 font-semibold text-xl tracking-tight">
                Idiomas
              </CardTitle>
              <h4 className="scroll-m-20 font-semibold text-base text-muted-foreground tracking-tight">
                CNA • Em andamento
              </h4>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardTitle>Inglês</CardTitle>
            <p>
              Cursando o 3º ano do curso de inglês da CNA, desenvolvendo
              habilidades de comunicação para o ambiente profissional
              internacional.
            </p>
          </CardContent>
          <CardFooter>
            <Badge className="rounded-full border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
              Nível: Pré-avançado
            </Badge>
          </CardFooter>
        </Card>
      </div>
    </SectionContainer>
  )
}

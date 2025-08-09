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
  SectionUnderline,
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
        <SectionUnderline />
      </SectionHeader>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="bg-background">
          <CardHeader className="relative flex gap-2">
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

            <div className="absolute inset-0 top-2 size-full rounded-xl bg-gradient-to-b from-background/0 to-background" />
          </CardHeader>

          <CardContent className="relative z-1 space-y-1">
            <CardTitle className="text-base">CIÊNCIA DA COMPUTAÇÃO</CardTitle>
            <p className="font-light text-muted-foreground text-sm">
              Cursando Ciência da Computação no UNISAGRADO, com término previsto
              para 2025. Focado em desenvolvimento de software, algoritmos e
              estruturas de dados.
            </p>
          </CardContent>

          <CardFooter className="z-1">
            <Badge className="rounded-full border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
              Formatura: 2025
            </Badge>
          </CardFooter>
        </Card>

        <Card className="bg-background">
          <CardHeader className="relative flex gap-2">
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

            <div className="absolute inset-0 top-2 size-full rounded-xl bg-gradient-to-b from-background/0 to-background" />
          </CardHeader>

          <CardContent className="z-1 space-y-1">
            <CardTitle className="text-base">INGLÊS</CardTitle>
            <p className="font-light text-muted-foreground text-sm">
              Cursando o 3º ano do curso de inglês da CNA, desenvolvendo
              habilidades de comunicação para o ambiente profissional
              internacional.
            </p>
          </CardContent>

          <CardFooter className="z-1 h-full">
            <Badge className="mt-auto rounded-full border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
              Nível: Pré-Avançado
            </Badge>
          </CardFooter>
        </Card>
      </div>
    </SectionContainer>
  )
}

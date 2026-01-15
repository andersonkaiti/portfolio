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
      <SectionHeader data-aos="fade-down">
        <SectionTitle>Education</SectionTitle>
        <SectionSubtitle>
          My formal education and language development
        </SectionSubtitle>
        <SectionUnderline />
      </SectionHeader>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card
          className="border-none bg-background shadow-none"
          data-aos="fade-down"
          data-aos-delay={200}
        >
          <CardHeader className="relative flex justify-center gap-2">
            <Badge className="border-emerald-500/20 bg-emerald-500/10 p-2">
              <GraduationCap className="size-10 text-emerald-500" />
            </Badge>
            <div>
              <CardTitle className="scroll-m-20 font-semibold text-xl tracking-tight">
                Undergraduate
              </CardTitle>
              <h4 className="scroll-m-20 font-semibold text-base text-muted-foreground tracking-tight">
                UNISAGRADO • 2022-2025
              </h4>
            </div>

            <div className="absolute inset-0 top-2 size-full rounded-xl bg-linear-to-b from-background/0 to-background" />
          </CardHeader>

          <CardContent className="relative z-1 space-y-1">
            <CardTitle className="text-center text-base">
              COMPUTER SCIENCE
            </CardTitle>
            <p className="text-center text-muted-foreground text-sm">
              Completed Bachelor's Degree in Computer Science at UNISAGRADO.
              Specialized in software development, algorithms, and data
              structures.
            </p>
          </CardContent>

          <CardFooter className="z-1">
            <Badge className="mx-auto rounded-full border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
              Graduated
            </Badge>
          </CardFooter>
        </Card>

        <Card
          className="border-none bg-background shadow-none"
          data-aos="fade-down"
          data-aos-delay={400}
        >
          <CardHeader className="relative flex justify-center gap-2">
            <Badge className="border-emerald-500/20 bg-emerald-500/10 p-2">
              <Globe className="size-10 text-emerald-500" />
            </Badge>
            <div>
              <CardTitle className="scroll-m-20 font-semibold text-xl tracking-tight">
                Languages
              </CardTitle>
              <h4 className="scroll-m-20 font-semibold text-base text-muted-foreground tracking-tight">
                CNA • Ongoing
              </h4>
            </div>

            <div className="absolute inset-0 top-2 size-full rounded-xl bg-linear-to-b from-background/0 to-background" />
          </CardHeader>

          <CardContent className="z-1 space-y-1">
            <CardTitle className="text-center text-base">ENGLISH</CardTitle>
            <p className="text-center text-muted-foreground text-sm">
              Currently enrolled in the 3rd year of the English course at CNA,
              developing communication skills for the international professional
              environment.
            </p>
          </CardContent>

          <CardFooter className="z-1 h-full">
            <Badge className="mx-auto mt-auto rounded-full border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
              Level: Pre-Advanced
            </Badge>
          </CardFooter>
        </Card>
      </div>
    </SectionContainer>
  )
}

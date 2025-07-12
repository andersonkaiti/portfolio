import { Badge } from '@components/ui/badge'
import { Card, CardContent } from '@components/ui/card'
import {
  SectionContainer,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { getCourses } from '@services/courses.service'
import { Award } from 'lucide-react'
import { Certification } from './certification'

export async function CourseList() {
  const { courses, totalHours } = await getCourses()

  return (
    <SectionContainer id="courses">
      <SectionHeader>
        <SectionTitle>Cursos e Certificações</SectionTitle>
        <SectionSubtitle>
          Meu compromisso com o aprendizado contínuo
        </SectionSubtitle>
      </SectionHeader>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {courses.map((course) => (
          <Certification key={course.id} {...course} />
        ))}
      </div>

      <Card className="mx-auto w-full items-center bg-transparent text-center md:w-fit md:text-start">
        <CardContent className="flex flex-col items-center gap-4 md:flex-row">
          <Badge className="aspect-square h-fit border-emerald-500/20 bg-emerald-500/10 p-2">
            <Award className="!size-8 text-emerald-500" />
          </Badge>
          <div>
            <h1 className="scroll-m-20 text-balance font-bold text-2xl tracking-tight">
              Total de horas
            </h1>
            <h3 className="scroll-m-20 font-bold text-3xl text-emerald-500 text-shadow-emerald-500/20 text-shadow-lg tracking-tight">
              {totalHours} HORAS
            </h3>
            <footer>de cursos e certificações</footer>
          </div>
        </CardContent>
      </Card>
    </SectionContainer>
  )
}

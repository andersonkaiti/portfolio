import { Badge } from '@components/ui/badge'
import { getCourses } from '@services/courses.service'
import { Award } from 'lucide-react'
import { Certification } from './certification'

export async function CertificationList() {
  const { courses, totalHours } = await getCourses()

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {courses.map((course) => (
          <Certification key={course.id} {...course} />
        ))}
      </div>
      <div className="mx-auto flex w-full flex-col items-center gap-4 bg-background text-center md:w-fit md:flex-row md:text-start">
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
      </div>
    </>
  )
}

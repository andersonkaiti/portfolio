import { stack } from '../../_constants/stack'
import { Stack } from './stack'

export function Technologies() {
  return (
    <section className="space-y-8 px-6 md:space-y-16">
      <header>
        <h1 className="scroll-m-20 text-balance text-center font-bold text-4xl tracking-wide">
          Principais Tecnologias
        </h1>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((skill) => (
          <Stack key={skill.id} {...skill} />
        ))}
      </div>
    </section>
  )
}

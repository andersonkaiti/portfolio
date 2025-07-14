import {
  SectionContainer,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { stack } from '../_constants/stack'
import { Stack } from './stack'

export default function Technologies() {
  return (
    <SectionContainer id="technologies">
      <SectionHeader>
        <SectionTitle>Principais Tecnologias</SectionTitle>
        <SectionSubtitle>
          Ferramentas e tecnologias que domino para criar soluções completas
        </SectionSubtitle>
      </SectionHeader>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((skill) => (
          <Stack key={skill.id} {...skill} />
        ))}
      </div>
    </SectionContainer>
  )
}

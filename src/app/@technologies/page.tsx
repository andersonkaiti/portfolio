import {
  SectionContainer,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
  SectionUnderline,
} from '@components/ui/section'
import { stack } from './_constants/stack'
import { Stack } from './stack'

export default function Technologies() {
  return (
    <SectionContainer id="technologies">
      <SectionHeader>
        <SectionTitle>Principais Tecnologias</SectionTitle>
        <SectionSubtitle>
          Ferramentas e tecnologias que domino para criar soluções completas
        </SectionSubtitle>
        <SectionUnderline />
      </SectionHeader>

      <div className="grid grid-cols-1">
        {stack.map((skill) => (
          <Stack key={skill.id} {...skill} />
        ))}
      </div>
    </SectionContainer>
  )
}

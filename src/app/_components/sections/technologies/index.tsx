import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { Stack } from './stack'
import { stacks } from './stacks'

export function TechnologiesSection() {
  return (
    <SectionContainer id="technologies">
      <SectionHeader>
        <SectionLabel data-aos="fade-down">Stack</SectionLabel>

        <SectionTitle data-aos="fade-down">Technologies</SectionTitle>

        <SectionSubtitle data-aos="fade-down">
          Tools and technologies I master to create complete solutions
        </SectionSubtitle>
      </SectionHeader>

      <div className="grid grid-cols-1">
        {stacks.map((stack) => (
          <Stack key={stack.id} stack={stack} />
        ))}
      </div>
    </SectionContainer>
  )
}

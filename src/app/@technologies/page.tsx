import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { stacks } from './_components/stacks'
import { Stack } from './stack'

export default function Technologies() {
  return (
    <SectionContainer id="technologies">
      <SectionHeader data-aos="fade-down">
        <SectionLabel>Stack</SectionLabel>

        <SectionTitle>Technologies</SectionTitle>

        <SectionSubtitle>
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

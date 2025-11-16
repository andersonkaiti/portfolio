import {
  SectionContainer,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
  SectionUnderline,
} from '@components/ui/section'
import { stacks } from './_constants/stack'
import { Stack } from './stack'

export default function Technologies() {
  return (
    <SectionContainer id="technologies">
      <SectionHeader data-aos="fade-down">
        <SectionTitle>Main Technologies</SectionTitle>
        <SectionSubtitle>
          Tools and technologies I master to create complete solutions
        </SectionSubtitle>
        <SectionUnderline />
      </SectionHeader>

      <div className="grid grid-cols-1">
        {stacks.map((stack) => (
          <Stack key={stack.id} stack={stack} />
        ))}
      </div>
    </SectionContainer>
  )
}

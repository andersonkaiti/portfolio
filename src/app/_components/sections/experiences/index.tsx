import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { WorkExperience } from '@components/ui/work-experience'
import { WORK_EXPERIENCES } from './experiences'

export function ExperiencesSection() {
  return (
    <SectionContainer id="experiences">
      <SectionHeader>
        <SectionLabel data-aos="fade-down">Journey</SectionLabel>

        <SectionTitle data-aos="fade-down">
          Professional Experience
        </SectionTitle>

        <SectionSubtitle data-aos="fade-down">
          My career journey and impactful work experiences
        </SectionSubtitle>
      </SectionHeader>

      <WorkExperience data-aos="fade-down" experiences={WORK_EXPERIENCES} />
    </SectionContainer>
  )
}

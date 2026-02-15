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
      <SectionHeader data-aos="fade-down">
        <SectionLabel>Journey</SectionLabel>

        <SectionTitle>Professional Experience</SectionTitle>

        <SectionSubtitle>
          My career journey and impactful work experiences
        </SectionSubtitle>
      </SectionHeader>

      <WorkExperience experiences={WORK_EXPERIENCES} />
    </SectionContainer>
  )
}

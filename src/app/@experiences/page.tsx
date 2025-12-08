import {
  SectionContainer,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
  SectionUnderline,
} from '@components/ui/section'
import { WorkExperience } from '@components/ui/work-experience'
import { WORK_EXPERIENCES } from './experiences'

export default function Experiences() {
  return (
    <SectionContainer id="experiences">
      <SectionHeader data-aos="fade-down">
        <SectionTitle>Professional Experience</SectionTitle>
        <SectionSubtitle>
          My career journey and impactful work experiences
        </SectionSubtitle>
        <SectionUnderline />
      </SectionHeader>

      <WorkExperience experiences={WORK_EXPERIENCES} />
    </SectionContainer>
  )
}

import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { WorkExperience } from '@components/ui/work-experience'
import { getTranslations } from 'next-intl/server'
import { getWorkExperiences } from './experiences'

export async function ExperiencesSection() {
  const t = await getTranslations('experiences')
  const experiences = await getWorkExperiences()

  return (
    <SectionContainer id="experiences">
      <SectionHeader>
        <SectionLabel>{t('label')}</SectionLabel>

        <SectionTitle>{t('title')}</SectionTitle>

        <SectionSubtitle>{t('subtitle')}</SectionSubtitle>
      </SectionHeader>

      <WorkExperience data-aos="fade-up" experiences={experiences} />
    </SectionContainer>
  )
}

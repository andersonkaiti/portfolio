import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
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
      <SectionHeader side="left">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle>
          {t.rich('title', {
            accent: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </SectionTitle>
      </SectionHeader>

      <WorkExperience experiences={experiences} />
    </SectionContainer>
  )
}

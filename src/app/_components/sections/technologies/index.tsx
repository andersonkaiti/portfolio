import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { getTranslations } from 'next-intl/server'
import { Stack } from './stack'
import { stacks } from './stacks'

export async function TechnologiesSection() {
  const t = await getTranslations('technologies')

  return (
    <SectionContainer id="technologies">
      <SectionHeader>
        <SectionLabel>{t('label')}</SectionLabel>

        <SectionTitle>{t('title')}</SectionTitle>

        <SectionSubtitle>{t('subtitle')}</SectionSubtitle>
      </SectionHeader>

      <div className="grid grid-cols-1">
        {stacks.map((stack) => (
          <Stack key={stack.id} stack={stack} />
        ))}
      </div>
    </SectionContainer>
  )
}

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
      <SectionHeader side="left">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle>
          {t.rich('title', {
            accent: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </SectionTitle>
        <SectionSubtitle>{t('subtitle')}</SectionSubtitle>
      </SectionHeader>

      <div className="border-t border-border">
        {stacks.map((stack, index) => (
          <Stack key={stack.id} stack={stack} index={index} />
        ))}
      </div>
    </SectionContainer>
  )
}

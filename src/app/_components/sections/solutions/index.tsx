import {
  SectionContainer,
  SectionHeader,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from '@components/ui/section'
import { getTranslations } from 'next-intl/server'
import { SolutionList } from './solution-list'

export async function SolutionsSection() {
  const t = await getTranslations('solutions')

  const items = [
    {
      num: t('s1.num'),
      title: t('s1.title'),
      desc: t('s1.desc'),
      bullets: [t('s1.b1'), t('s1.b2'), t('s1.b3')],
      tags: ['Next.js', 'React', 'Node.js', 'Prisma', 'TypeScript'],
    },
    {
      num: t('s2.num'),
      title: t('s2.title'),
      desc: t('s2.desc'),
      bullets: [t('s2.b1'), t('s2.b2'), t('s2.b3')],
      tags: ['React Native', 'TVOS', 'WebSockets', 'Digital Signage'],
    },
    {
      num: t('s3.num'),
      title: t('s3.title'),
      desc: t('s3.desc'),
      bullets: [t('s3.b1'), t('s3.b2'), t('s3.b3')],
      tags: ['React Native', 'Gamification', 'WebSockets', 'UX'],
    },
    {
      num: t('s4.num'),
      title: t('s4.title'),
      desc: t('s4.desc'),
      bullets: [t('s4.b1'), t('s4.b2'), t('s4.b3')],
      tags: ['Next.js', 'Pix', 'Node.js', 'Dashboard'],
    },
    {
      num: t('s5.num'),
      title: t('s5.title'),
      desc: t('s5.desc'),
      bullets: [t('s5.b1'), t('s5.b2'), t('s5.b3')],
      tags: ['React Native', 'Next.js', 'Node.js', 'Real-time'],
    },
  ]

  return (
    <SectionContainer id="solutions">
      <SectionHeader side="left">
        <SectionLabel>{t('label')}</SectionLabel>
        <SectionTitle>
          {t.rich('title', {
            accent: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </SectionTitle>
        <SectionSubtitle>{t('subtitle')}</SectionSubtitle>
      </SectionHeader>

      <SolutionList items={items} />
    </SectionContainer>
  )
}

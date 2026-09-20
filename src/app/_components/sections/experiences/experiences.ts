import type { ExperienceItemType } from '@components/ui/work-experience'
import { getTranslations } from 'next-intl/server'

export async function getWorkExperiences(): Promise<ExperienceItemType[]> {
  const t = await getTranslations('experiences')

  return [
    {
      id: 'prefeitura-borebi-1',
      companyName: t('borebi.companyName'),
      companyLogo: undefined,
      isCurrentEmployer: true,
      positions: [
        {
          id: 'prefeitura-borebi-1-1',
          title: t('borebi.title'),
          employmentPeriod: t('borebi.employmentPeriod'),
          employmentType: t('borebi.employmentType'),
          description: t('borebi.description'),
          skills: [
            'Laravel',
            'PHP',
            'React',
            'TypeScript',
            'Inertia.js',
            'MySQL',
            'Git',
          ],
        },
      ],
    },
    {
      id: 'solid-tech-1',
      companyName: 'Solid Tech',
      companyLogo: undefined,
      isCurrentEmployer: false,
      positions: [
        {
          id: 'solid-tech-1-1',
          title: t('solidTech.title'),
          employmentPeriod: t('solidTech.employmentPeriod'),
          employmentType: t('solidTech.employmentType'),
          description: t('solidTech.description'),
          skills: [
            'React',
            'Next.js',
            'Node.js',
            'Prisma',
            'React Native',
            'TVOS',
            'WebSockets',
          ],
        },
      ],
    },
    {
      id: 'funprev-1',
      companyName: 'Funprev Bauru',
      companyLogo: undefined,
      isCurrentEmployer: false,
      positions: [
        {
          id: 'funprev-1-1',
          title: t('funprev.title'),
          employmentPeriod: t('funprev.employmentPeriod'),
          employmentType: t('funprev.employmentType'),
          description: t('funprev.description'),
          skills: ['PHP', 'JavaScript', 'PostgreSQL', 'phpMyAdmin'],
        },
      ],
    },
  ]
}

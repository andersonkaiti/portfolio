import type { ExperienceItemType } from '@components/ui/work-experience'
import { getTranslations } from 'next-intl/server'

export async function getWorkExperiences(): Promise<ExperienceItemType[]> {
  const t = await getTranslations('experiences')

  return [
    {
      id: 'solid-tech-1',
      companyName: 'Solid Tech',
      companyLogo: undefined,
      isCurrentEmployer: true,
      positions: [
        {
          id: 'solid-tech-1-1',
          title: t('solidTech.title'),
          employmentPeriod: t('solidTech.employmentPeriod'),
          employmentType: t('solidTech.employmentType'),
          description: t('solidTech.description'),
          icon: 'code',
          skills: [
            'React',
            'Next.js',
            'Node.js',
            'Prisma',
            'React Native',
            'TVOS',
            'WebSockets',
            'Digital Signage',
            'Gamification',
            'Pix',
            'Logistics',
          ],
          isExpanded: true,
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
          icon: 'code',
          skills: [
            'PHP',
            'JavaScript',
            'PostgreSQL',
            'phpMyAdmin',
            'Technical Support',
            'Troubleshooting',
            'Network Administration',
            'Hardware & Software Setup',
            'Backup Management',
            'Process Optimization',
          ],
          isExpanded: true,
        },
      ],
    },
  ]
}

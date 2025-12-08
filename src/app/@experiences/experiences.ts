import type { ExperienceItemType } from '@components/ui/work-experience'

export const WORK_EXPERIENCES: ExperienceItemType[] = [
  {
    id: 'funprev-1',
    companyName: 'Funprev Bauru',
    companyLogo: undefined,
    isCurrentEmployer: true,
    positions: [
      {
        id: 'funprev-1-1',
        title: 'IT Intern',
        employmentPeriod: '11 Nov 2024 – 11 Nov 2025',
        employmentType: 'Internship',
        description:
          'Responsible for diagnosing and troubleshooting network and device issues, developing and maintaining systems, performing backups, and providing technical support to users. Involved in the installation and configuration of software, hardware, and network devices such as routers and switches, always aiming to optimize processes and ensure system stability.',
        icon: 'code',
        skills: [
          'Technical Support',
          'System Development',
          'Troubleshooting',
          'Networks',
          'Backups',
          'Process Optimization',
        ],
        isExpanded: true,
      },
    ],
  },
]

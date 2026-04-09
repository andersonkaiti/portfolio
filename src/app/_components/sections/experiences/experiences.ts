import type { ExperienceItemType } from '@components/ui/work-experience'

export const WORK_EXPERIENCES: ExperienceItemType[] = [
  {
    id: 'solid-tech-1',
    companyName: 'Solid Tech',
    companyLogo: undefined,
    isCurrentEmployer: true,
    positions: [
      {
        id: 'solid-tech-1-1',
        title: 'Full Stack Developer',
        employmentPeriod: 'Feb 2026 – Apr 2026',
        employmentType: 'Freelance',
        description:
          '- **Full Stack & Mobile:** Built scalable ecosystems integrating high-performance interfaces (React/Next.js) with backend systems (Node.js/Prisma).\n- **Smart TV:** Implemented digital signage and medical testing systems for Smart TVs using React Native TVOS with real-time WebSocket communication.\n- **Gamification & Social:** Developed training engines with haptic feedback, social feeds, rankings, and achievement systems.\n- **B2B & Financial:** Built admin dashboards with visual training builders and integrated financial modules for Pix checkout and subscription management.\n- **Logistics:** Developed features for logistics systems covering customer, delivery personnel, and control panel apps.',
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
        title: 'IT Internship',
        employmentPeriod: 'Nov 2024 – Nov 2025',
        employmentType: 'Internship',
        description:
          "- **IT Infrastructure Troubleshooting:** Diagnosed and resolved issues in networks, devices, and IT infrastructure, ensuring system stability, security, and continuity.\n- **Web Development:** Developed, maintained, and implemented features in internal web systems using PHP and JavaScript.\n- **Data Management:** Managed data integrity and executed SQL queries, focusing on PostgreSQL and phpMyAdmin to support reporting and system updates.\n- **Hardware & Software Setup:** Installed and configured software and hardware, ensuring proper operation of the technological environment.\n- **Backup Management:** Performed periodic backups to ensure data integrity and availability.\n- **Technical Support:** Provided user support with logical troubleshooting to minimize downtime and operational impact.\n- **Network Administration:** Configured, monitored, and maintained network devices such as routers and switches.\n- **Process Optimization:** Improved processes and proposed practical solutions aligned with the organization's technological needs.",
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

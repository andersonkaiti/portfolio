import { Cloud, Database, Globe } from 'lucide-react'
import type { IStack } from 'types/stack'

export const stack: IStack[] = [
  {
    id: 1,
    category: 'Front-end',
    icon: Globe,
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'TypeScript',
      'React.js',
      'Next.js',
      'TailwindCSS',
    ],
  },
  {
    id: 2,
    category: 'Back-end & Databases',
    icon: Database,
    technologies: [
      'Node.js',
      'Express.js',
      'Fastify',
      'MySQL',
      'MongoDB',
      'Prisma',
      'Drizzle',
    ],
  },
  {
    id: 3,
    category: 'Cloud & DevOps',
    icon: Cloud,
    technologies: ['Vercel', 'Azure', 'Firebase', 'Git', 'Docker'],
  },
]

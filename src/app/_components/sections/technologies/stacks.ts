import type { LucideIcon } from 'lucide-react'
import { Cloud, Database, Globe } from 'lucide-react'

export interface ITheme {
  dark: string
  light: string
}

export interface ITechnology {
  name: string
  logo: ITheme | string
}

export interface IStack {
  id: number
  category: string
  icon: LucideIcon
  technologies: ITechnology[]
}

export const stacks: IStack[] = [
  {
    id: 1,
    category: 'Front-end',
    icon: Globe,
    technologies: [
      { name: 'HTML5', logo: '/assets/html5.svg' },
      { name: 'CSS3', logo: '/assets/css_old.svg' },
      { name: 'JavaScript', logo: '/assets/javascript.svg' },
      { name: 'TypeScript', logo: '/assets/typescript.svg' },
      {
        name: 'React.js',
        logo: {
          dark: '/assets/react/react-dark.svg',
          light: '/assets/react/react-light.svg',
        },
      },
      { name: 'Next.js', logo: '/assets/nextjs.svg' },
      { name: 'TailwindCSS', logo: '/assets/tailwindcss.svg' },
      { name: 'React Query', logo: '/assets/reactquery.svg' },
      {
        name: 'Shadcn/ui',
        logo: {
          dark: '/assets/shadcn/shadcn-dark.svg',
          light: '/assets/shadcn/shadcn-light.svg',
        },
      },
      { name: 'Vite', logo: '/assets/vitejs.svg' },
      { name: 'Zod', logo: '/assets/zod.svg' },
      { name: 'React Hook Form', logo: '/assets/react_hook_form.svg' },
      {
        name: 'Styled Components',
        logo: {
          dark: '/assets/styled-components/styled-components-dark.svg',
          light: '/assets/styled-components/styled-components-light.svg',
        },
      },
      {
        name: 'Nuqs',
        logo: {
          dark: '/assets/nuqs/nuqs-dark.svg',
          light: '/assets/nuqs/nuqs-light.svg',
        },
      },
      {
        name: 'Cypress',
        logo: {
          dark: '/assets/cypress/cypress-dark.svg',
          light: '/assets/cypress/cypress-light.svg',
        },
      },
    ],
  },
  {
    id: 2,
    category: 'Back-end & Databases',
    icon: Database,
    technologies: [
      { name: 'Node.js', logo: '/assets/nodejs.svg' },
      {
        name: 'Express.js',
        logo: {
          dark: '/assets/express/express-dark.svg',
          light: '/assets/express/express-light.svg',
        },
      },
      {
        name: 'Fastify',
        logo: {
          dark: '/assets/fastify/fastify-dark.svg',
          light: '/assets/fastify/fastify-light.svg',
        },
      },
      { name: 'MySQL', logo: '/assets/mysql.svg' },
      { name: 'MongoDB', logo: '/assets/mongodb.svg' },
      {
        name: 'Prisma',
        logo: {
          dark: '/assets/prisma/prisma-dark.svg',
          light: '/assets/prisma/prisma-light.svg',
        },
      },
      {
        name: 'Drizzle',
        logo: {
          dark: '/assets/drizzle/drizzle-dark.svg',
          light: '/assets/drizzle/drizzle-light.svg',
        },
      },
      { name: 'Vitest', logo: '/assets/vitest.svg' },
    ],
  },
  {
    id: 3,
    category: 'Cloud & DevOps',
    icon: Cloud,
    technologies: [
      {
        name: 'Vercel',
        logo: {
          dark: '/assets/vercel/vercel-dark.svg',
          light: '/assets/vercel/vercel-light.svg',
        },
      },
      { name: 'Azure', logo: '/assets/azure.svg' },
      { name: 'Firebase', logo: '/assets/firebase.svg' },
      { name: 'Git', logo: '/assets/git.svg' },
      { name: 'Docker', logo: '/assets/docker.svg' },
    ],
  },
]

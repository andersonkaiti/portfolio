import type { LucideIcon } from 'lucide-react'
import {
  Cloud,
  Code2,
  Database,
  Globe,
  Server,
  TestTube2,
  Wrench,
} from 'lucide-react'

export interface ITheme {
  dark: string
  light: string
}

export interface ITechnology {
  name: string
  logo: ITheme | string
  featured?: boolean
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
    category: 'Languages',
    icon: Code2,
    technologies: [
      { name: 'TypeScript', logo: '/assets/typescript.svg', featured: true },
      { name: 'JavaScript', logo: '/assets/javascript.svg', featured: true },
      { name: 'HTML5', logo: '/assets/html5.svg' },
      { name: 'CSS3', logo: '/assets/css_old.svg' },
    ],
  },
  {
    id: 2,
    category: 'Front-end',
    icon: Globe,
    technologies: [
      {
        name: 'React.js',
        logo: {
          dark: '/assets/react/react-dark.svg',
          light: '/assets/react/react-light.svg',
        },
        featured: true,
      },
      { name: 'Next.js', logo: '/assets/nextjs.svg', featured: true },
      { name: 'TailwindCSS', logo: '/assets/tailwindcss.svg', featured: true },
      {
        name: 'Shadcn/ui',
        logo: {
          dark: '/assets/shadcn/shadcn-dark.svg',
          light: '/assets/shadcn/shadcn-light.svg',
        },
      },
      { name: 'Vite', logo: '/assets/vitejs.svg' },
      { name: 'React Query', logo: '/assets/reactquery.svg' },
      { name: 'React Hook Form', logo: '/assets/react_hook_form.svg' },
      { name: 'Zod', logo: '/assets/zod.svg' },
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
    ],
  },
  {
    id: 3,
    category: 'Back-end',
    icon: Server,
    technologies: [
      { name: 'Node.js', logo: '/assets/nodejs.svg', featured: true },
      {
        name: 'Fastify',
        logo: {
          dark: '/assets/fastify/fastify-dark.svg',
          light: '/assets/fastify/fastify-light.svg',
        },
        featured: true,
      },
      {
        name: 'Express.js',
        logo: {
          dark: '/assets/express/express-dark.svg',
          light: '/assets/express/express-light.svg',
        },
      },
    ],
  },
  {
    id: 4,
    category: 'Databases & ORMs',
    icon: Database,
    technologies: [
      { name: 'PostgreSQL', logo: '/assets/postgresql.svg', featured: true },
      {
        name: 'Prisma',
        logo: {
          dark: '/assets/prisma/prisma-dark.svg',
          light: '/assets/prisma/prisma-light.svg',
        },
        featured: true,
      },
      { name: 'MySQL', logo: '/assets/mysql.svg' },
      { name: 'MongoDB', logo: '/assets/mongodb.svg' },
      {
        name: 'Drizzle',
        logo: {
          dark: '/assets/drizzle/drizzle-dark.svg',
          light: '/assets/drizzle/drizzle-light.svg',
        },
      },
    ],
  },
  {
    id: 5,
    category: 'Testing & Quality',
    icon: TestTube2,
    technologies: [
      { name: 'Vitest', logo: '/assets/vitest.svg', featured: true },
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
    id: 6,
    category: 'Cloud & Serverless',
    icon: Cloud,
    technologies: [
      { name: 'AWS Lambda', logo: '/assets/aws/lambda.svg', featured: true },
      { name: 'Amazon S3', logo: '/assets/aws/s3.svg', featured: true },
      { name: 'Serverless', logo: '/assets/serverless.svg' },
      { name: 'Amazon API Gateway', logo: '/assets/aws/apigateway.svg' },
      { name: 'Amazon DynamoDB', logo: '/assets/aws/dynamodb.svg' },
      { name: 'Amazon Cognito', logo: '/assets/aws/cognito.svg' },
      { name: 'Azure', logo: '/assets/azure.svg' },
      { name: 'Firebase', logo: '/assets/firebase.svg' },
    ],
  },
  {
    id: 7,
    category: 'Tooling',
    icon: Wrench,
    technologies: [
      {
        name: 'Docker',
        logo: '/assets/docker.svg',
        featured: true,
      },
      {
        name: 'Vercel',
        logo: {
          dark: '/assets/vercel/vercel-dark.svg',
          light: '/assets/vercel/vercel-light.svg',
        },
        featured: true,
      },
      { name: 'Git', logo: '/assets/git.svg' },
    ],
  },
]

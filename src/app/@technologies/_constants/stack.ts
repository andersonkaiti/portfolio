import azureLogo from '@assets/azure.svg'
import cssLogo from '@assets/css_old.svg'
import dockerLogo from '@assets/docker.svg'
import drizzleLogoDark from '@assets/drizzle/drizzle-dark.svg'
import drizzleLogoLight from '@assets/drizzle/drizzle-light.svg'
import expressLogoDark from '@assets/express/express-dark.svg'
import expressLogoLight from '@assets/express/express-light.svg'
import fastifyLogoDark from '@assets/fastify/fastify-dark.svg'
import fastifyLogoLight from '@assets/fastify/fastify-light.svg'
import firebaseLogo from '@assets/firebase.svg'
import gitLogo from '@assets/git.svg'
import htmlLogo from '@assets/html5.svg'
import javascriptLogo from '@assets/javascript.svg'
import mongoLogo from '@assets/mongodb.svg'
import mysqlLogo from '@assets/mysql.svg'
import nextLogo from '@assets/nextjs.svg'
import nodejsLogo from '@assets/nodejs.svg'
import nuqsLogoDark from '@assets/nuqs/nuqs-dark.svg'
import nuqsLogoLight from '@assets/nuqs/nuqs-light.svg'
import prismaLogoDark from '@assets/prisma/prisma-dark.svg'
import prismaLogoLight from '@assets/prisma/prisma-light.svg'
import reactLogoDark from '@assets/react/react-dark.svg'
import reactLogoLight from '@assets/react/react-light.svg'
import reactHookForm from '@assets/react_hook_form.svg'
import reactQueryLogo from '@assets/reactquery.svg'
import shadcnLogoDark from '@assets/shadcn/shadcn-dark.svg'
import shadcnLogoLight from '@assets/shadcn/shadcn-light.svg'
import styledComponentsLogo from '@assets/styled-components.svg'
import tailwindLogo from '@assets/tailwindcss.svg'
import typescriptLogo from '@assets/typescript.svg'
import vercelLogoDark from '@assets/vercel/vercel-dark.svg'
import vercelLogoLight from '@assets/vercel/vercel-light.svg'
import viteLogo from '@assets/vitejs.svg'
import zodLogo from '@assets/zod.svg'
import type { LucideIcon } from 'lucide-react'
import { Cloud, Database, Globe } from 'lucide-react'
import type { StaticImageData } from 'next/image'

export interface ITheme {
  dark: StaticImageData
  light: StaticImageData
}

export interface ITechnology {
  name: string
  logo: ITheme | StaticImageData
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
      {
        name: 'HTML5',
        logo: htmlLogo,
      },
      {
        name: 'CSS3',
        logo: cssLogo,
      },
      {
        name: 'JavaScript',
        logo: javascriptLogo,
      },
      {
        name: 'TypeScript',
        logo: typescriptLogo,
      },
      {
        name: 'React.js',
        logo: { dark: reactLogoDark, light: reactLogoLight },
      },
      {
        name: 'Next.js',
        logo: nextLogo,
      },
      {
        name: 'TailwindCSS',
        logo: tailwindLogo,
      },
      {
        name: 'React Query',
        logo: reactQueryLogo,
      },
      {
        name: 'Shadcn/ui',
        logo: { dark: shadcnLogoDark, light: shadcnLogoLight },
      },
      {
        name: 'Vite',
        logo: viteLogo,
      },
      {
        name: 'Zod',
        logo: zodLogo,
      },
      {
        name: 'React Hook Form',
        logo: reactHookForm,
      },
      {
        name: 'Styled Components',
        logo: styledComponentsLogo,
      },
      {
        name: 'Nuqs',
        logo: { dark: nuqsLogoDark, light: nuqsLogoLight },
      },
    ],
  },
  {
    id: 2,
    category: 'Back-end & Databases',
    icon: Database,
    technologies: [
      {
        name: 'Node.js',
        logo: nodejsLogo,
      },
      {
        name: 'Express.js',
        logo: {
          dark: expressLogoDark,
          light: expressLogoLight,
        },
      },
      {
        name: 'Fastify',
        logo: {
          dark: fastifyLogoDark,
          light: fastifyLogoLight,
        },
      },
      {
        name: 'MySQL',
        logo: mysqlLogo,
      },
      {
        name: 'MongoDB',
        logo: mongoLogo,
      },
      {
        name: 'Prisma',
        logo: { dark: prismaLogoDark, light: prismaLogoLight },
      },
      {
        name: 'Drizzle',
        logo: { dark: drizzleLogoDark, light: drizzleLogoLight },
      },
    ],
  },
  {
    id: 3,
    category: 'Cloud & DevOps',
    icon: Cloud,
    technologies: [
      {
        name: 'Vercel',
        logo: { dark: vercelLogoDark, light: vercelLogoLight },
      },
      {
        name: 'Azure',
        logo: azureLogo,
      },
      {
        name: 'Firebase',
        logo: firebaseLogo,
      },
      {
        name: 'Git',
        logo: gitLogo,
      },
      {
        name: 'Docker',
        logo: dockerLogo,
      },
    ],
  },
]

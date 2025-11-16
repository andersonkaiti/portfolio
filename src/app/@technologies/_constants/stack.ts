import azureLogo from '@assets/azure.svg'
import cssLogo from '@assets/css_old.svg'
import drizzleLogo from '@assets/Drizzle ORM_light_dark/Drizzle ORM_dark.svg'
import dockerLogo from '@assets/docker.svg'
import expressLogoDark from '@assets/Express.js_light_dark/Express.js_dark.svg'
import expressLogoLight from '@assets/Express.js_light_dark/Express.js_light.svg'
import fastifyLogoDark from '@assets/Fastify_light_dark/Fastify_dark.svg'
import fastifyLogoLight from '@assets/Fastify_light_dark/Fastify_light.svg'
import firebaseLogo from '@assets/firebase.svg'
import gitLogo from '@assets/git.svg'
import htmlLogo from '@assets/html5.svg'
import javascriptLogo from '@assets/javascript.svg'
import mongoLogo from '@assets/mongodb.svg'
import mysqlLogo from '@assets/mysql.svg'
import nextLogoDark from '@assets/Next.js_wordmark_light_dark/Next.js_wordmark_dark.svg'
import nextLogoLight from '@assets/Next.js_wordmark_light_dark/Next.js_wordmark_light.svg'
import nodejsLogo from '@assets/nodejs.svg'
import prismaLogoDark from '@assets/Prisma_light_dark/Prisma_dark.svg'
import prismaLogoLight from '@assets/Prisma_light_dark/Prisma_light.svg'
import reactLogoDark from '@assets/React_light_dark/React_dark.svg'
import reactLogoLight from '@assets/React_light_dark/React_light.svg'
import reactHookForm from '@assets/react_hook_form.svg'
import reactQueryLogo from '@assets/reactquery.svg'
import shadcnLogoDark from '@assets/shadcn_ui_light_dark/shadcn/ui_dark.svg'
import shadcnLogoLight from '@assets/shadcn_ui_light_dark/shadcn/ui_light.svg'
import tailwindLogo from '@assets/tailwindcss.svg'
import typescriptLogo from '@assets/typescript.svg'
import vercelLogoDark from '@assets/Vercel_light_dark/Vercel_dark.svg'
import vercelLogoLight from '@assets/Vercel_light_dark/Vercel_light.svg'
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
        logo: { dark: nextLogoDark, light: nextLogoLight },
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
        logo: drizzleLogo,
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

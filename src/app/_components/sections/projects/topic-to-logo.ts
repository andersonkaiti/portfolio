import androidLogo from '@assets/android-icon.svg'
import androidStudioLogo from '@assets/android-studio.svg'
import awsLogoDark from '@assets/aws/aws-dark.svg'
import awsLogoLight from '@assets/aws/aws-light.svg'
import azureLogo from '@assets/azure.svg'
import babelLogo from '@assets/babel.svg'
import clerkLogoDark from '@assets/clerk/clerk-dark.svg'
import clerkLogoLight from '@assets/clerk/clerk-light.svg'
import csharpLogo from '@assets/csharp.svg'
import cssLogo from '@assets/css_old.svg'
import cypressLogoDark from '@assets/cypress/cypress-dark.svg'
import cypressLogoLight from '@assets/cypress/cypress-light.svg'
import datefnsLogoDark from '@assets/date-fns/date-fns-dark.svg'
import datefnsLogoLight from '@assets/date-fns/date-fns-light.svg'
import dayjsLogo from '@assets/dayjs.svg'
import dockerLogo from '@assets/docker.svg'
import drizzleLogoDark from '@assets/drizzle/drizzle-dark.svg'
import drizzleLogoLight from '@assets/drizzle/drizzle-light.svg'
import eslintLogoDark from '@assets/eslint/eslint-dark.svg'
import eslintLogoLight from '@assets/eslint/eslint-light.svg'
import expoLogoDark from '@assets/expo/expo-dark.svg'
import expoLogoLight from '@assets/expo/expo-light.svg'
import expressLogoDark from '@assets/express/express-dark.svg'
import expressLogoLight from '@assets/express/express-light.svg'
import fakerjsLogo from '@assets/fakerjs.svg'
import fastifyLogoDark from '@assets/fastify/fastify-dark.svg'
import fastifyLogoLight from '@assets/fastify/fastify-light.svg'
import firebaseLogo from '@assets/firebase.svg'
import gitLogo from '@assets/git.svg'
import htmlLogo from '@assets/html5.svg'
import ioniconsLogo from '@assets/ionicons.svg'
import javaLogo from '@assets/java.svg'
import javascriptLogo from '@assets/javascript.svg'
import jwtLogo from '@assets/jwt.svg'
import laravelLogo from '@assets/laravel.svg'
import lucideLogoDark from '@assets/lucide/lucide-dark.svg'
import lucideLogoLight from '@assets/lucide/lucide-light.svg'
import visualStudioLogo from '@assets/microsoft-visual-studio.svg'
import mongoLogo from '@assets/mongodb.svg'
import mysqlLogo from '@assets/mysql.svg'
import nestjsLogo from '@assets/nestjs.svg'
import nextLogo from '@assets/nextjs.svg'
import nodejsLogo from '@assets/nodejs.svg'
import nuqsLogoDark from '@assets/nuqs/nuqs-dark.svg'
import nuqsLogoLight from '@assets/nuqs/nuqs-light.svg'
import postgresqlLogo from '@assets/postgresql.svg'
import prettierLogoDark from '@assets/prettier/prettier-dark.svg'
import prettierLogoLight from '@assets/prettier/prettier-light.svg'
import prismaLogoDark from '@assets/prisma/prisma-dark.svg'
import prismaLogoLight from '@assets/prisma/prisma-light.svg'
import rabbitmqLogo from '@assets/rabbitmq.svg'
import radixLogoDark from '@assets/radix/radix-dark.svg'
import radixLogoLight from '@assets/radix/radix-light.svg'
import reactLogoDark from '@assets/react/react-dark.svg'
import reactLogoLight from '@assets/react/react-light.svg'
import reactHookForm from '@assets/react_hook_form.svg'
import reactRouterLogo from '@assets/reactrouter.svg'
import reduxLogo from '@assets/redux.svg'
import serverlessLogo from '@assets/serverless.svg'
import shadcnLogoDark from '@assets/shadcn/shadcn-dark.svg'
import shadcnLogoLight from '@assets/shadcn/shadcn-light.svg'
import shikiLogo from '@assets/shiki.svg'
import styledComponentsLogoDark from '@assets/styled-components/styled-components-dark.svg'
import styledComponentsLogoLight from '@assets/styled-components/styled-components-light.svg'
import swaggerLogo from '@assets/swagger.svg'
import t3LogoDark from '@assets/t3/t3-dark.svg'
import t3LogoLight from '@assets/t3/t3-light.svg'
import tailwindLogo from '@assets/tailwindcss.svg'
import tanstackLogo from '@assets/tanstack.svg'
import tsxLogoDark from '@assets/tsx/tsx-dark.svg'
import tsxLogoLight from '@assets/tsx/tsx-light.svg'
import turborepoLogoDark from '@assets/turborepo/turborepo-dark.svg'
import turborepoLogoLight from '@assets/turborepo/turborepo-light.svg'
import typeormLogo from '@assets/typeorm.svg'
import typescriptLogo from '@assets/typescript.svg'
import ultraciteLogoDark from '@assets/ultracite/ultracite-dark.svg'
import ultraciteLogoLight from '@assets/ultracite/ultracite-light.svg'
import vercelLogoDark from '@assets/vercel/vercel-dark.svg'
import vercelLogoLight from '@assets/vercel/vercel-light.svg'
import viteLogo from '@assets/vitejs.svg'
import vitestLogo from '@assets/vitest.svg'
import webpackLogo from '@assets/webpack.svg'
import zodLogo from '@assets/zod.svg'
import type { StaticImageData } from 'next/image'

export interface ITheme {
  dark: StaticImageData
  light: StaticImageData
}

export type TechLogo = ITheme | StaticImageData

export const topicToLogo: Record<string, TechLogo> = {
  // Front-end
  html: htmlLogo,
  html5: htmlLogo,
  css: cssLogo,
  css3: cssLogo,
  javascript: javascriptLogo,
  js: javascriptLogo,
  typescript: typescriptLogo,
  ts: typescriptLogo,
  tsx: { dark: tsxLogoDark, light: tsxLogoLight },
  react: { dark: reactLogoDark, light: reactLogoLight },
  reactjs: { dark: reactLogoDark, light: reactLogoLight },
  'react-js': { dark: reactLogoDark, light: reactLogoLight },
  'react-native': { dark: reactLogoDark, light: reactLogoLight },
  'react-router': reactRouterLogo,
  'react-router-dom': reactRouterLogo,
  reactrouter: reactRouterLogo,
  nextjs: nextLogo,
  nextjs15: nextLogo,
  'next-js': nextLogo,
  next: nextLogo,
  tailwind: tailwindLogo,
  tailwindcss: tailwindLogo,
  'tailwind-css': tailwindLogo,
  nativewind: tailwindLogo,
  'react-query': tanstackLogo,
  reactquery: tanstackLogo,
  'reactquery-v3': tanstackLogo,
  tanstack: tanstackLogo,
  '@tanstack/react-query': tanstackLogo,
  '@tanstack/react-router': tanstackLogo,
  'tanstack-router': tanstackLogo,
  'tanstack-query': tanstackLogo,
  redux: reduxLogo,
  'react-redux': reduxLogo,
  shadcn: { dark: shadcnLogoDark, light: shadcnLogoLight },
  'shadcn-ui': { dark: shadcnLogoDark, light: shadcnLogoLight },
  shadcnui: { dark: shadcnLogoDark, light: shadcnLogoLight },
  vite: viteLogo,
  vitejs: viteLogo,
  webpack: webpackLogo,
  zod: zodLogo,
  'react-hook-form': reactHookForm,
  'react-hooks-form': reactHookForm,
  rhf: reactHookForm,
  radix: { dark: radixLogoDark, light: radixLogoLight },
  'radix-ui': { dark: radixLogoDark, light: radixLogoLight },
  '@radix-ui': { dark: radixLogoDark, light: radixLogoLight },
  'styled-components': {
    dark: styledComponentsLogoDark,
    light: styledComponentsLogoLight,
  },
  styledcomponents: {
    dark: styledComponentsLogoDark,
    light: styledComponentsLogoLight,
  },
  babel: babelLogo,
  shiki: shikiLogo,
  nuqs: { dark: nuqsLogoDark, light: nuqsLogoLight },
  lucide: { dark: lucideLogoDark, light: lucideLogoLight },
  'lucide-react': { dark: lucideLogoDark, light: lucideLogoLight },
  'lucide-react-native': { dark: lucideLogoDark, light: lucideLogoLight },
  ionicons: ioniconsLogo,
  'ion-icons': ioniconsLogo,

  // Back-end & Databases
  node: nodejsLogo,
  nodejs: nodejsLogo,
  'node-js': nodejsLogo,
  nestjs: nestjsLogo,
  nest: nestjsLogo,
  express: { dark: expressLogoDark, light: expressLogoLight },
  expressjs: { dark: expressLogoDark, light: expressLogoLight },
  'express-js': { dark: expressLogoDark, light: expressLogoLight },
  fastify: { dark: fastifyLogoDark, light: fastifyLogoLight },
  mysql: mysqlLogo,
  sql: mysqlLogo,
  mongodb: mongoLogo,
  mongo: mongoLogo,
  prisma: { dark: prismaLogoDark, light: prismaLogoLight },
  drizzle: { dark: drizzleLogoDark, light: drizzleLogoLight },
  'drizzle-orm': { dark: drizzleLogoDark, light: drizzleLogoLight },
  postgresql: postgresqlLogo,
  postgres: postgresqlLogo,
  pg: postgresqlLogo,
  java: javaLogo,
  poo: javaLogo,
  laravel: laravelLogo,
  php: laravelLogo,
  csharp: csharpLogo,
  'c#': csharpLogo,
  rabbitmq: rabbitmqLogo,
  'rabbit-mq': rabbitmqLogo,

  // Tools & Libraries
  clerk: { dark: clerkLogoDark, light: clerkLogoLight },
  eslint: { dark: eslintLogoDark, light: eslintLogoLight },
  biomejs: { dark: eslintLogoDark, light: eslintLogoLight },
  biome: { dark: eslintLogoDark, light: eslintLogoLight },
  prettier: { dark: prettierLogoDark, light: prettierLogoLight },
  turborepo: { dark: turborepoLogoDark, light: turborepoLogoLight },
  t3: { dark: t3LogoDark, light: t3LogoLight },
  't3-env': { dark: t3LogoDark, light: t3LogoLight },
  't3-stack': { dark: t3LogoDark, light: t3LogoLight },
  fakerjs: fakerjsLogo,
  faker: fakerjsLogo,
  ultracite: { dark: ultraciteLogoDark, light: ultraciteLogoLight },
  cypress: { dark: cypressLogoDark, light: cypressLogoLight },
  typeorm: typeormLogo,
  jwt: jwtLogo,
  jsonwebtoken: jwtLogo,
  'date-fns': { dark: datefnsLogoDark, light: datefnsLogoLight },
  datefns: { dark: datefnsLogoDark, light: datefnsLogoLight },
  dayjs: dayjsLogo,
  'day-js': dayjsLogo,
  vitest: vitestLogo,
  swagger: swaggerLogo,
  'swagger-ui': swaggerLogo,

  // Mobile & Native
  expo: { dark: expoLogoDark, light: expoLogoLight },
  android: androidLogo,
  'android-studio': androidStudioLogo,

  // Cloud & DevOps
  vercel: { dark: vercelLogoDark, light: vercelLogoLight },
  aws: { dark: awsLogoDark, light: awsLogoLight },
  'aws-lambda': { dark: awsLogoDark, light: awsLogoLight },
  serverless: serverlessLogo,
  'serverless-framework': serverlessLogo,
  'serverless-offline': serverlessLogo,
  azure: azureLogo,
  firebase: firebaseLogo,
  git: gitLogo,
  docker: dockerLogo,
  'docker-compose': dockerLogo,
  dockerfile: dockerLogo,

  // IDEs & Editors
  'visual-studio': visualStudioLogo,
  visualstudio: visualStudioLogo,
  vs: visualStudioLogo,
  microsoft: visualStudioLogo,

  vscode: visualStudioLogo,
  'vs-code': visualStudioLogo,
  'visual-studio-code': visualStudioLogo,
  'microsoft-visual-studio-code': visualStudioLogo,
}

// Função auxiliar para obter o logo de um topic
export function getTopicLogo(topic: string): TechLogo | null {
  const normalizedTopic = topic.toLowerCase().trim()
  return topicToLogo[normalizedTopic] || null
}

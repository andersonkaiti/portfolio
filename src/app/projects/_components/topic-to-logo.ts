export interface ITheme {
  dark: string
  light: string
}

export type TechLogo = ITheme | string

export const topicToLogo: Record<string, TechLogo> = {
  html: '/assets/html5.svg',
  html5: '/assets/html5.svg',
  css: '/assets/css_old.svg',
  css3: '/assets/css_old.svg',
  javascript: '/assets/javascript.svg',
  js: '/assets/javascript.svg',
  typescript: '/assets/typescript.svg',
  ts: '/assets/typescript.svg',
  tsx: { dark: '/assets/tsx/tsx-dark.svg', light: '/assets/tsx/tsx-light.svg' },
  react: {
    dark: '/assets/react/react-dark.svg',
    light: '/assets/react/react-light.svg',
  },
  reactjs: {
    dark: '/assets/react/react-dark.svg',
    light: '/assets/react/react-light.svg',
  },
  'react-js': {
    dark: '/assets/react/react-dark.svg',
    light: '/assets/react/react-light.svg',
  },
  'react-native': {
    dark: '/assets/react/react-dark.svg',
    light: '/assets/react/react-light.svg',
  },
  'react-router': '/assets/reactrouter.svg',
  'react-router-dom': '/assets/reactrouter.svg',
  reactrouter: '/assets/reactrouter.svg',
  nextjs: '/assets/nextjs.svg',
  nextjs15: '/assets/nextjs.svg',
  'next-js': '/assets/nextjs.svg',
  next: '/assets/nextjs.svg',
  tailwind: '/assets/tailwindcss.svg',
  tailwindcss: '/assets/tailwindcss.svg',
  'tailwind-css': '/assets/tailwindcss.svg',
  nativewind: '/assets/tailwindcss.svg',
  'react-query': '/assets/tanstack.svg',
  reactquery: '/assets/tanstack.svg',
  'reactquery-v3': '/assets/tanstack.svg',
  tanstack: '/assets/tanstack.svg',
  '@tanstack/react-query': '/assets/tanstack.svg',
  '@tanstack/react-router': '/assets/tanstack.svg',
  'tanstack-router': '/assets/tanstack.svg',
  'tanstack-query': '/assets/tanstack.svg',
  redux: '/assets/redux.svg',
  'react-redux': '/assets/redux.svg',
  shadcn: {
    dark: '/assets/shadcn/shadcn-dark.svg',
    light: '/assets/shadcn/shadcn-light.svg',
  },
  'shadcn-ui': {
    dark: '/assets/shadcn/shadcn-dark.svg',
    light: '/assets/shadcn/shadcn-light.svg',
  },
  shadcnui: {
    dark: '/assets/shadcn/shadcn-dark.svg',
    light: '/assets/shadcn/shadcn-light.svg',
  },
  vite: '/assets/vitejs.svg',
  vitejs: '/assets/vitejs.svg',
  webpack: '/assets/webpack.svg',
  zod: '/assets/zod.svg',
  'react-hook-form': '/assets/react_hook_form.svg',
  'react-hooks-form': '/assets/react_hook_form.svg',
  rhf: '/assets/react_hook_form.svg',
  radix: {
    dark: '/assets/radix/radix-dark.svg',
    light: '/assets/radix/radix-light.svg',
  },
  'radix-ui': {
    dark: '/assets/radix/radix-dark.svg',
    light: '/assets/radix/radix-light.svg',
  },
  '@radix-ui': {
    dark: '/assets/radix/radix-dark.svg',
    light: '/assets/radix/radix-light.svg',
  },
  'styled-components': {
    dark: '/assets/styled-components/styled-components-dark.svg',
    light: '/assets/styled-components/styled-components-light.svg',
  },
  styledcomponents: {
    dark: '/assets/styled-components/styled-components-dark.svg',
    light: '/assets/styled-components/styled-components-light.svg',
  },
  babel: '/assets/babel.svg',
  shiki: '/assets/shiki.svg',
  nuqs: {
    dark: '/assets/nuqs/nuqs-dark.svg',
    light: '/assets/nuqs/nuqs-light.svg',
  },
  lucide: {
    dark: '/assets/lucide/lucide-dark.svg',
    light: '/assets/lucide/lucide-light.svg',
  },
  'lucide-react': {
    dark: '/assets/lucide/lucide-dark.svg',
    light: '/assets/lucide/lucide-light.svg',
  },
  'lucide-react-native': {
    dark: '/assets/lucide/lucide-dark.svg',
    light: '/assets/lucide/lucide-light.svg',
  },
  ionicons: '/assets/ionicons.svg',
  'ion-icons': '/assets/ionicons.svg',

  node: '/assets/nodejs.svg',
  nodejs: '/assets/nodejs.svg',
  'node-js': '/assets/nodejs.svg',
  nestjs: '/assets/nestjs.svg',
  nest: '/assets/nestjs.svg',
  express: {
    dark: '/assets/express/express-dark.svg',
    light: '/assets/express/express-light.svg',
  },
  expressjs: {
    dark: '/assets/express/express-dark.svg',
    light: '/assets/express/express-light.svg',
  },
  'express-js': {
    dark: '/assets/express/express-dark.svg',
    light: '/assets/express/express-light.svg',
  },
  fastify: {
    dark: '/assets/fastify/fastify-dark.svg',
    light: '/assets/fastify/fastify-light.svg',
  },
  mysql: '/assets/mysql.svg',
  sql: '/assets/mysql.svg',
  mongodb: '/assets/mongodb.svg',
  mongo: '/assets/mongodb.svg',
  prisma: {
    dark: '/assets/prisma/prisma-dark.svg',
    light: '/assets/prisma/prisma-light.svg',
  },
  drizzle: {
    dark: '/assets/drizzle/drizzle-dark.svg',
    light: '/assets/drizzle/drizzle-light.svg',
  },
  'drizzle-orm': {
    dark: '/assets/drizzle/drizzle-dark.svg',
    light: '/assets/drizzle/drizzle-light.svg',
  },
  postgresql: '/assets/postgresql.svg',
  postgres: '/assets/postgresql.svg',
  pg: '/assets/postgresql.svg',
  java: '/assets/java.svg',
  poo: '/assets/java.svg',
  laravel: '/assets/laravel.svg',
  php: '/assets/laravel.svg',
  csharp: '/assets/csharp.svg',
  'c#': '/assets/csharp.svg',
  rabbitmq: '/assets/rabbitmq.svg',
  'rabbit-mq': '/assets/rabbitmq.svg',

  clerk: {
    dark: '/assets/clerk/clerk-dark.svg',
    light: '/assets/clerk/clerk-light.svg',
  },
  eslint: {
    dark: '/assets/eslint/eslint-dark.svg',
    light: '/assets/eslint/eslint-light.svg',
  },
  biomejs: {
    dark: '/assets/eslint/eslint-dark.svg',
    light: '/assets/eslint/eslint-light.svg',
  },
  biome: {
    dark: '/assets/eslint/eslint-dark.svg',
    light: '/assets/eslint/eslint-light.svg',
  },
  prettier: {
    dark: '/assets/prettier/prettier-dark.svg',
    light: '/assets/prettier/prettier-light.svg',
  },
  turborepo: {
    dark: '/assets/turborepo/turborepo-dark.svg',
    light: '/assets/turborepo/turborepo-light.svg',
  },
  t3: { dark: '/assets/t3/t3-dark.svg', light: '/assets/t3/t3-light.svg' },
  't3-env': {
    dark: '/assets/t3/t3-dark.svg',
    light: '/assets/t3/t3-light.svg',
  },
  't3-stack': {
    dark: '/assets/t3/t3-dark.svg',
    light: '/assets/t3/t3-light.svg',
  },
  fakerjs: '/assets/fakerjs.svg',
  faker: '/assets/fakerjs.svg',
  ultracite: {
    dark: '/assets/ultracite/ultracite-dark.svg',
    light: '/assets/ultracite/ultracite-light.svg',
  },
  cypress: {
    dark: '/assets/cypress/cypress-dark.svg',
    light: '/assets/cypress/cypress-light.svg',
  },
  typeorm: '/assets/typeorm.svg',
  jwt: '/assets/jwt.svg',
  jsonwebtoken: '/assets/jwt.svg',
  'date-fns': {
    dark: '/assets/date-fns/date-fns-dark.svg',
    light: '/assets/date-fns/date-fns-light.svg',
  },
  datefns: {
    dark: '/assets/date-fns/date-fns-dark.svg',
    light: '/assets/date-fns/date-fns-light.svg',
  },
  dayjs: '/assets/dayjs.svg',
  'day-js': '/assets/dayjs.svg',
  vitest: '/assets/vitest.svg',
  swagger: '/assets/swagger.svg',
  'swagger-ui': '/assets/swagger.svg',

  expo: {
    dark: '/assets/expo/expo-dark.svg',
    light: '/assets/expo/expo-light.svg',
  },
  android: '/assets/android-icon.svg',
  'android-studio': '/assets/android-studio.svg',

  vercel: {
    dark: '/assets/vercel/vercel-dark.svg',
    light: '/assets/vercel/vercel-light.svg',
  },
  aws: { dark: '/assets/aws/aws-dark.svg', light: '/assets/aws/aws-light.svg' },
  'aws-lambda': {
    dark: '/assets/aws/aws-dark.svg',
    light: '/assets/aws/aws-light.svg',
  },
  serverless: '/assets/serverless.svg',
  'serverless-framework': '/assets/serverless.svg',
  'serverless-offline': '/assets/serverless.svg',
  azure: '/assets/azure.svg',
  firebase: '/assets/firebase.svg',
  git: '/assets/git.svg',
  docker: '/assets/docker.svg',
  'docker-compose': '/assets/docker.svg',
  dockerfile: '/assets/docker.svg',

  'visual-studio': '/assets/microsoft-visual-studio.svg',
  visualstudio: '/assets/microsoft-visual-studio.svg',
  vs: '/assets/microsoft-visual-studio.svg',
  microsoft: '/assets/microsoft-visual-studio.svg',
  vscode: '/assets/microsoft-visual-studio.svg',
  'vs-code': '/assets/microsoft-visual-studio.svg',
  'visual-studio-code': '/assets/microsoft-visual-studio.svg',
  'microsoft-visual-studio-code': '/assets/microsoft-visual-studio.svg',
}

export function getTopicLogo(topic: string): TechLogo | null {
  const normalizedTopic = topic.toLowerCase().trim()
  return topicToLogo[normalizedTopic] || null
}

const ACRONYMS = new Set([
  'api',
  'aws',
  'ci',
  'css',
  'html',
  'php',
  's3',
  'sql',
  'sqs',
  'ui',
])

const SPECIAL: Record<string, string> = {
  dynamodb: 'DynamoDB',
  javascript: 'JavaScript',
  nextjs: 'Next.js',
  nodejs: 'NodeJS',
  postgresql: 'PostgreSQL',
  tailwindcss: 'Tailwind CSS',
  typescript: 'TypeScript',
}

export function formatTopic(title: string) {
  return title
    .split('-')
    .map(
      (word) =>
        SPECIAL[word] ??
        (ACRONYMS.has(word)
          ? word.toUpperCase()
          : word.charAt(0).toUpperCase() + word.slice(1)),
    )
    .join(' ')
}

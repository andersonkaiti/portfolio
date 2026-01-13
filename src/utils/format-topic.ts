export function formatTopic(title: string) {
  return title
    .split('-')
    .map((word) => word.toUpperCase())
    .join(' ')
}

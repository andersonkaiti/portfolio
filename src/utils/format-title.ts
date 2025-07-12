export function formatTitle(title: string) {
  return title.split('-').map((word) => word.replace('', ' ').toUpperCase())
}

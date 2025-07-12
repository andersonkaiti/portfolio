export function formatTopic(title: string) {
  return title.split('-').map((word) => {
    const [letter, ...rest] = word.split('')

    return `${letter.toUpperCase()}${rest.join('')} `
  })
}

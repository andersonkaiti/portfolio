import Image from 'next/image'
import type { TechLogo } from './topic-to-logo'

interface TopicLogoImageProps {
  logo: TechLogo
  topic: string
  size?: number
}

export function TopicLogoImage({
  logo,
  topic,
  size = 24,
}: TopicLogoImageProps) {
  if (typeof logo === 'object') {
    return (
      <>
        <Image
          alt={topic}
          className="hidden size-5 dark:flex"
          src={logo.dark}
          width={size}
          height={size}
        />
        <Image
          alt={topic}
          className="flex size-5 dark:hidden"
          src={logo.light}
          width={size}
          height={size}
        />
      </>
    )
  }
  return (
    <Image
      alt={topic}
      className="size-5"
      src={logo}
      width={size}
      height={size}
    />
  )
}

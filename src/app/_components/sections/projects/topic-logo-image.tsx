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
          className="hidden dark:flex"
          src={logo.dark}
          width={size}
          height={size}
        />
        <Image
          alt={topic}
          className="flex dark:hidden"
          src={logo.light}
          width={size}
          height={size}
        />
      </>
    )
  }
  return <Image alt={topic} src={logo} width={size} height={size} />
}

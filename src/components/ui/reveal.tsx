import type { HTMLAttributes } from 'react'

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number
}

export function Reveal({ delay = 0, className, style, ...props }: RevealProps) {
  return (
    <div
      className={className}
      data-aos="fade-up"
      data-aos-delay={delay}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      suppressHydrationWarning
      {...props}
    />
  )
}

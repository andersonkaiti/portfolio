import { Riffle } from '@lucasmarkes/hairline/react'
import { cn } from 'cn'
import { FIGURE_THEME, SIGNAL_THEME } from './figure-theme'

interface RiffleDecoProps {
  className?: string
  tone?: 'page' | 'signal'
  interactive?: boolean
}

export function RiffleDeco({
  className,
  tone = 'page',
  interactive = false,
}: RiffleDecoProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(!interactive && 'pointer-events-none', className)}
    >
      <Riffle
        aria-hidden="true"
        tabIndex={-1}
        style={tone === 'signal' ? SIGNAL_THEME : FIGURE_THEME}
      />
    </div>
  )
}

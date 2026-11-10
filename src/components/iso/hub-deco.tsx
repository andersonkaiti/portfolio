import { Hub } from '@lucasmarkes/hairline/react'
import { FIGURE_THEME } from './figure-theme'

interface HubDecoProps {
  className?: string
}

export function HubDeco({ className }: HubDecoProps) {
  return (
    <div aria-hidden="true" className={className}>
      <Hub aria-hidden="true" tabIndex={-1} play style={FIGURE_THEME} />
    </div>
  )
}

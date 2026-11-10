import { Terrain } from '@lucasmarkes/hairline/react'
import { cn } from 'cn'
import type { CSSProperties } from 'react'
import { DECO_THEME } from './figure-theme'

interface IsoDecoProps {
  className?: string
  style?: CSSProperties
}

export function IsoDeco({ className, style }: IsoDecoProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none', className)}
      style={style}
    >
      <Terrain aria-hidden="true" style={DECO_THEME} />
    </div>
  )
}

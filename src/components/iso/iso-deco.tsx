import { cn } from 'cn'
import type { CSSProperties } from 'react'
import { IsoBox } from './iso-box'

const CUBE = 40
const ORIGIN = [70, 170] as const
const COLUMNS = [
  { x: 0, height: 3 },
  { x: CUBE, height: 2 },
  { x: CUBE * 2, height: 1 },
]

interface IsoDecoProps {
  className?: string
  style?: CSSProperties
}

export function IsoDeco({ className, style }: IsoDecoProps) {
  return (
    <svg
      viewBox="0 0 300 260"
      width="300"
      aria-hidden="true"
      className={cn('pointer-events-none overflow-visible', className)}
      style={style}
    >
      {COLUMNS.map(({ x, height }) => (
        <g key={x}>
          {Array.from({ length: height }, (_, level) => level).map((level) => (
            <IsoBox
              key={level}
              at={[x, 0, level * CUBE]}
              size={[CUBE, CUBE, CUBE]}
              origin={ORIGIN}
            />
          ))}
        </g>
      ))}
    </svg>
  )
}

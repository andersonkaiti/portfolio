import type { CSSProperties } from 'react'
import { type BoxSpec, boxFaces } from './projection'

interface IsoBoxProps extends BoxSpec {
  lit?: boolean
  className?: string
  delay?: number
  sheen?: number
}

export function IsoBox({
  lit = false,
  className,
  delay = 0,
  sheen,
  ...spec
}: IsoBoxProps) {
  const { left, right, top } = boxFaces(spec)

  return (
    <g
      className={className}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      <path className="ak-iso-face" d={left} />
      <path className="ak-iso-face" d={right} />
      <path
        className="ak-iso-face"
        style={lit ? { fill: 'var(--signal)' } : undefined}
        d={top}
      />
      {sheen !== undefined && (
        <path
          className="ak-sheen"
          style={{ '--sd': sheen } as CSSProperties}
          d={top}
        />
      )}
    </g>
  )
}

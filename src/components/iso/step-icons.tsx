import { Laptop, Padlock } from '@lucasmarkes/hairline/react'
import { FIGURE_THEME } from './figure-theme'
import { ProofFigure } from './proof-figure'

interface IconProps {
  compact?: boolean
}

const WIDTH = { regular: 200, compact: 168 } as const

function frame(compact: boolean) {
  return {
    'aria-hidden': true,
    style: {
      ...FIGURE_THEME,
      width: compact ? WIDTH.compact : WIDTH.regular,
    },
  } as const
}

export function LockIcon({ compact = false }: IconProps) {
  return <Padlock {...frame(compact)} />
}

export function DatabaseIcon({ compact = false }: IconProps) {
  return <Laptop {...frame(compact)} />
}

export function CheckIcon({ compact = false }: IconProps) {
  return <ProofFigure width={compact ? WIDTH.compact : WIDTH.regular} />
}

import type { CSSProperties } from 'react'

export const FIGURE_THEME = {
  '--hairline-plate': 'var(--iso-bg, var(--background))',
  '--hairline-hi': 'var(--primary)',
  '--hairline-edge': 'var(--foreground)',
  '--hairline-mid': 'var(--dash)',
  '--hairline-lo': 'var(--border)',
} as CSSProperties

const INK = (share: number) =>
  `color-mix(in srgb, var(--on-signal) ${share}%, var(--signal))`

export const SIGNAL_THEME = {
  '--hairline-plate': 'var(--signal)',
  '--hairline-hi': 'var(--on-signal)',
  '--hairline-edge': INK(88),
  '--hairline-mid': INK(62),
  '--hairline-lo': INK(40),
} as CSSProperties

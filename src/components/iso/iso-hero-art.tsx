import type { CSSProperties } from 'react'
import { IsoBox } from './iso-box'
import { project, type Vec3 } from './projection'

interface IsoHeroArtProps {
  label: string
  layers: [string, string, string]
}

const LAYER_STEP = 115
const SLAB_SIZE: Vec3 = [120, 120, 28]
const SLAB_ORIGIN = [170, 28] as const
const LABEL_X = 330
const STEP_DELAY = 0.35
const START_DELAY = 0.2

const SATELLITES = [
  { size: [16, 16, 16], origin: [36, 380] },
  { size: [12, 12, 12], origin: [300, 406] },
  { size: [10, 10, 10], origin: [20, 175] },
] as const

const layerZ = (index: number) => -index * LAYER_STEP

const delayOf = (index: number) => START_DELAY + (2 - index) * STEP_DELAY

const sheenOf = (index: number) => 0.8 + (2 - index) * 0.7

export function IsoHeroArt({ label, layers }: IsoHeroArtProps) {
  const [width, depth, height] = SLAB_SIZE

  const connectors = [0, 1].map((index) => {
    const [, from] = project([width, depth, layerZ(index)], SLAB_ORIGIN)
    const [, to] = project(
      [width / 2, depth / 2, layerZ(index + 1) + height],
      SLAB_ORIGIN,
    )

    return { from, to }
  })

  const stack = layers
    .map((text, index) => {
      const [edgeX, edgeY] = project(
        [width, 0, layerZ(index) + height / 2],
        SLAB_ORIGIN,
      )

      const [centerX, centerY] = project(
        [width / 2, depth / 2, layerZ(index) + height],
        SLAB_ORIGIN,
      )

      return { text, index, edgeX, edgeY, centerX, centerY }
    })
    .reverse()

  return (
    <svg
      viewBox="0 0 500 440"
      width="100%"
      role="img"
      aria-label={label}
      className="ml-auto block max-w-[520px] overflow-visible"
    >
      {connectors.map(({ from, to }) => (
        <line
          key={from}
          className="ak-iso-dash ak-iso-fade"
          style={{ animationDelay: `${START_DELAY + 3 * STEP_DELAY}s` }}
          x1={SLAB_ORIGIN[0]}
          y1={from}
          x2={SLAB_ORIGIN[0]}
          y2={to}
        />
      ))}

      {stack.map(({ text, index, edgeX, edgeY, centerX, centerY }) => (
        <g key={text}>
          <IsoBox
            at={[0, 0, layerZ(index)]}
            size={SLAB_SIZE}
            origin={SLAB_ORIGIN}
            className="ak-iso-drop"
            delay={delayOf(index)}
            sheen={sheenOf(index)}
          />
          <path
            className="ak-hero-check"
            d={`M${centerX - 13} ${centerY}L${centerX - 5} ${centerY + 9}L${centerX + 13} ${centerY - 10}`}
            fill="none"
            pathLength="1"
            stroke="var(--primary)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.5"
            style={{ '--d': sheenOf(index) } as CSSProperties}
            vectorEffect="non-scaling-stroke"
          />
          <g
            className="ak-iso-fade"
            style={{ animationDelay: `${delayOf(index) + 0.3}s` }}
          >
            <circle
              className="ak-beacon fill-primary"
              style={{ '--sd': (2 - index) * 0.7 } as CSSProperties}
              cx={edgeX + 10}
              cy={edgeY}
              r="2"
            />
            <circle className="fill-primary" cx={edgeX + 10} cy={edgeY} r="2" />
            <path
              d={`M${edgeX + 10} ${edgeY}h22`}
              stroke="var(--dash)"
              strokeWidth="1"
              strokeDasharray="2 4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={LABEL_X}
              y={edgeY + 5}
              className="fill-muted-foreground font-mono"
              style={{ fontSize: 13 }}
            >
              {text}
            </text>
          </g>
        </g>
      ))}

      {SATELLITES.map(({ size, origin }, index) => (
        <IsoBox
          key={origin.join('-')}
          size={size}
          origin={origin}
          delay={START_DELAY + (layers.length + index) * STEP_DELAY}
          className="ak-iso-drop"
        />
      ))}
    </svg>
  )
}

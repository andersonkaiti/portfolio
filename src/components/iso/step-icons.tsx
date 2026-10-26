import { boxFaces } from './projection'

const SVG_PROPS = {
  viewBox: '0 0 72 80',
  width: 112,
  height: 124,
  className: 'overflow-visible',
} as const

interface IconProps {
  compact?: boolean
}

const CROP = {
  LOCK: { viewBox: '14 11 44 59', width: 68, height: 91 },
  DB: { viewBox: '14 6 44 62', width: 68, height: 96 },
  CHECK: { viewBox: '8 23 56 40', width: 87, height: 62 },
} as const

const LOCK_BOX = boxFaces({ size: [22, 22, 22], origin: [36, 47] })
const LOCK_INSET = boxFaces({
  at: [4, 4, 0],
  size: [14, 14, 22],
  origin: [36, 47],
}).top
const LOCK_COLLARS = [
  boxFaces({ at: [0, 9, 22], size: [5, 5, 3], origin: [36, 47] }),
  boxFaces({ at: [9, 0, 22], size: [5, 5, 3], origin: [36, 47] }),
]
const SHACKLE = 'M24 29V24a12 12 0 0 1 24 0v5H42V24a6 6 0 0 0-12 0v5Z'
const CHECK_BOX = boxFaces({ size: [28, 28, 10], origin: [36, 34] })
const CHECK_INSET = boxFaces({
  at: [5, 5, 0],
  size: [18, 18, 10],
  origin: [36, 34],
}).top

function svgProps(compact: boolean, crop: keyof typeof CROP) {
  return compact ? { ...SVG_PROPS, ...CROP[crop] } : SVG_PROPS
}

export function LockIcon({ compact = false }: IconProps) {
  return (
    <svg aria-hidden="true" {...svgProps(compact, 'LOCK')}>
      <path className="ak-iso-face ak-lock-body" d={LOCK_BOX.left} />
      <path className="ak-iso-face ak-lock-body" d={LOCK_BOX.right} />
      <path className="ak-iso-face ak-lock-body" d={LOCK_BOX.top} />
      <g>
        <path className="ak-lit [--sd:0]" d={LOCK_BOX.top} />
        <path className="ak-lit [--sd:0.25]" d={LOCK_BOX.right} />
        <path className="ak-lit [--sd:0.5]" d={LOCK_BOX.left} />
      </g>
      <path className="ak-iso-detail ak-lock-body" d={LOCK_INSET} />
      <path
        className="ak-iso-detail ak-lock-body"
        d="M18.4 42.6 L31.6 49.2 L31.6 62.4 L18.4 55.8 Z"
      />
      <path
        className="ak-iso-detail ak-lock-body"
        d="M39.3 53.05 L54.7 45.35 M39.3 57.45 L54.7 49.75"
        strokeLinecap="round"
      />
      {LOCK_COLLARS.map((collar) => (
        <g className="ak-lock-body" key={collar.top}>
          <path className="ak-iso-face" d={collar.left} />
          <path className="ak-iso-face" d={collar.right} />
          <path className="ak-iso-face" d={collar.top} />
        </g>
      ))}
      <g>
        <path className="ak-iso-face" d={SHACKLE} strokeLinejoin="round" />
      </g>
      <g>
        <path
          className="ak-lit-line ak-lit-run"
          d={SHACKLE}
          pathLength="1"
          strokeDasharray="0.14 0.86"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
      </g>
      <g className="ak-lock-body">
        <circle
          cx="25"
          cy="51"
          r="3.2"
          className="ak-lock-ring"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1"
        />
        <circle
          cx="25"
          cy="51"
          r="3.2"
          className="fill-signal"
          stroke="var(--dash)"
          strokeWidth=".8"
        />
        <path
          d="M25 54.2v3.6"
          stroke="var(--dash)"
          strokeWidth="1.4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  )
}

export function DatabaseIcon({ compact = false }: IconProps) {
  return (
    <svg aria-hidden="true" {...svgProps(compact, 'DB')}>
      <path
        className="ak-iso-face ak-db-disc [--i:0]"
        d="M14 46v10a22 11 0 0 0 44 0V46"
      />
      <g>
        <path
          className="ak-lit-line ak-lit-rim [--sd:0.8]"
          strokeWidth="1.4"
          d="M14 46v10a22 11 0 0 0 44 0V46"
        />
      </g>
      <ellipse
        className="ak-iso-face ak-db-disc [--i:0]"
        cx="36"
        cy="46"
        rx="22"
        ry="11"
      />
      <path
        className="ak-iso-face ak-db-disc [--i:1]"
        d="M14 32v10a22 11 0 0 0 44 0V32"
      />
      <g>
        <path
          className="ak-lit-line ak-lit-rim [--sd:0.5]"
          strokeWidth="1.4"
          d="M14 32v10a22 11 0 0 0 44 0V32"
        />
      </g>
      <ellipse
        className="ak-iso-face ak-db-disc [--i:1]"
        cx="36"
        cy="32"
        rx="22"
        ry="11"
      />
      <path
        className="ak-iso-face ak-db-disc [--i:2]"
        d="M14 18v10a22 11 0 0 0 44 0V18"
      />
      <g>
        <path
          className="ak-lit-line ak-lit-rim [--sd:0.2]"
          strokeWidth="1.4"
          d="M14 18v10a22 11 0 0 0 44 0V18"
        />
      </g>
      <g className="ak-db-disc [--i:2]">
        <ellipse
          className="ak-db-ripple"
          cx="36"
          cy="18"
          rx="22"
          ry="11"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.2"
        />
        <ellipse
          className="ak-iso-face"
          cx="36"
          cy="18"
          rx="22"
          ry="11"
          style={{ fill: 'var(--signal)' }}
        />
      </g>
    </svg>
  )
}

export function CheckIcon({ compact = false }: IconProps) {
  return (
    <svg aria-hidden="true" {...svgProps(compact, 'CHECK')}>
      <path className="ak-iso-face ak-check-body" d={CHECK_BOX.left} />
      <path className="ak-iso-face ak-check-body" d={CHECK_BOX.right} />
      <path className="ak-iso-face ak-check-body" d={CHECK_BOX.top} />
      <g>
        <path className="ak-lit [--sd:0]" d={CHECK_BOX.top} />
      </g>
      <path className="ak-iso-detail ak-check-inset" d={CHECK_INSET} />
      <g>
        <path
          className="ak-lit-line ak-lit-run"
          pathLength="1"
          strokeDasharray="0.2 0.8"
          strokeWidth="1.4"
          d={CHECK_INSET}
        />
      </g>
      <g>
        <path
          d="M24 38 L33 43 L50 33"
          pathLength="1"
          fill="none"
          className="ak-check-stroke stroke-primary"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g>
        <path
          d="M24 38 L33 43 L50 33"
          fill="none"
          className="ak-lit-line ak-lit-glow"
          strokeWidth="7"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

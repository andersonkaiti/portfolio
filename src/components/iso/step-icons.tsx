import type React from 'react'

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
  DB: { viewBox: '14 6 44 62', width: 68, height: 96 },
  CHECK: { viewBox: '8 23 56 40', width: 87, height: 62 },
} as const

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
  const size = compact ? 72 : 112

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="overflow-visible"
    >
      <g>
        <path
          d="M15.29 15.03Q17.02 14.03 18.75 15.03L37.48 25.85Q39.21 26.85 39.21 28.85L39.21 37.25Q39.21 39.25 37.48 40.25L32.71 43Q30.98 44 29.25 43L10.52 32.19Q8.79 31.19 8.79 29.19L8.79 20.78Q8.79 18.78 10.52 17.78Z"
          fill="var(--background)"
        />
        <path
          d="M37.48 27.85Q39.21 26.85 39.21 28.85L39.21 37.25Q39.21 39.25 37.48 40.25L32.71 43Q30.98 44 30.98 42L30.98 31.6Z"
          fill="var(--background)"
        />
        <path
          d="M10.52 19.78Q8.79 18.78 8.79 20.78L8.79 29.19Q8.79 31.19 10.52 32.19L29.25 43Q30.98 44 30.98 42L30.98 31.6Z"
          fill="var(--background)"
        />
        <path
          d="M15.29 15.03Q17.02 14.03 18.75 15.03L37.48 25.85Q39.21 26.85 37.48 27.85L30.98 31.6L10.52 19.78Q8.79 18.78 10.52 17.78Z"
          fill="var(--background)"
        />
      </g>
      <g>
        <path
          className="ak-lit"
          d="M15.29 15.03Q17.02 14.03 18.75 15.03L37.48 25.85Q39.21 26.85 37.48 27.85L30.98 31.6L10.52 19.78Q8.79 18.78 10.52 17.78Z"
          style={{ '--sd': 0.0 } as React.CSSProperties}
        />
        <path
          className="ak-lit"
          d="M37.48 27.85Q39.21 26.85 39.21 28.85L39.21 37.25Q39.21 39.25 37.48 40.25L32.71 43Q30.98 44 30.98 42L30.98 31.6Z"
          style={{ '--sd': 0.25 } as React.CSSProperties}
        />
        <path
          className="ak-lit"
          d="M10.52 19.78Q8.79 18.78 8.79 20.78L8.79 29.19Q8.79 31.19 10.52 32.19L29.25 43Q30.98 44 30.98 42L30.98 31.6Z"
          style={{ '--sd': 0.5 } as React.CSSProperties}
        />
      </g>
      <g>
        <path
          d="M19.88 29.53L19.5 29.49"
          fill="none"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          stroke="var(--dash)"
        />
        <path
          d="M19.5 29.49L19.35 29.84"
          fill="none"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          stroke="var(--dash)"
        />
        <path
          d="M19.35 29.84L19.5 30.37"
          fill="none"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          stroke="var(--dash)"
        />
        <path
          d="M19.5 30.37L19.88 30.77"
          fill="none"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          stroke="var(--dash)"
        />
        <path
          d="M19.88 30.77L20.26 30.81"
          fill="none"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          stroke="var(--dash)"
        />
        <path
          d="M20.26 30.81L20.42 30.46"
          fill="none"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          stroke="var(--dash)"
        />
        <path
          d="M20.42 30.46L20.26 29.93"
          fill="none"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          stroke="var(--dash)"
        />
        <path
          d="M20.26 29.93L19.88 29.53"
          fill="none"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          stroke="var(--dash)"
        />
        <path
          d="M19.88 30.15L19.88 33.87"
          fill="none"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          stroke="var(--dash)"
        />
      </g>
      <g>
        <path
          d="M15.29 15.03Q17.02 14.03 18.75 15.03L37.48 25.85Q39.21 26.85 39.21 28.85L39.21 37.25Q39.21 39.25 37.48 40.25L32.71 43Q30.98 44 29.25 43L10.52 32.19Q8.79 31.19 8.79 29.19L8.79 20.78Q8.79 18.78 10.52 17.78Z"
          fill="none"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          stroke="var(--foreground)"
        />
        <path
          d="M30.98 31.6L38.78 27.1"
          fill="none"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          stroke="var(--foreground)"
        />
        <path
          d="M30.98 31.6L9.22 19.03"
          fill="none"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          stroke="var(--foreground)"
        />
        <path
          d="M30.98 31.6L30.98 43.5"
          fill="none"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          stroke="var(--foreground)"
        />
      </g>
      <g>
        <path
          className="ak-lit-line ak-lit-glow"
          d="M19.88 29.53L19.5 29.49"
          fill="none"
          strokeWidth="1.4"
        />
        <path
          className="ak-lit-line ak-lit-glow"
          d="M19.5 29.49L19.35 29.84"
          fill="none"
          strokeWidth="1.4"
        />
        <path
          className="ak-lit-line ak-lit-glow"
          d="M19.35 29.84L19.5 30.37"
          fill="none"
          strokeWidth="1.4"
        />
        <path
          className="ak-lit-line ak-lit-glow"
          d="M19.5 30.37L19.88 30.77"
          fill="none"
          strokeWidth="1.4"
        />
        <path
          className="ak-lit-line ak-lit-glow"
          d="M19.88 30.77L20.26 30.81"
          fill="none"
          strokeWidth="1.4"
        />
        <path
          className="ak-lit-line ak-lit-glow"
          d="M20.26 30.81L20.42 30.46"
          fill="none"
          strokeWidth="1.4"
        />
        <path
          className="ak-lit-line ak-lit-glow"
          d="M20.42 30.46L20.26 29.93"
          fill="none"
          strokeWidth="1.4"
        />
        <path
          className="ak-lit-line ak-lit-glow"
          d="M20.26 29.93L19.88 29.53"
          fill="none"
          strokeWidth="1.4"
        />
        <path
          className="ak-lit-line ak-lit-glow"
          d="M19.88 30.15L19.88 33.87"
          fill="none"
          strokeWidth="1.4"
        />
      </g>
      <circle
        cx="19.88"
        cy="30.15"
        r="2.6"
        className="ak-lock-ring"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <g className="ak-lock-shackle">
        <path
          d="M17.66 19.86Q19.1 20.69 20.19 20.05L21.29 19.42Q22.39 18.78 22.39 17.08L22.39 15.37Q22.39 13.66 22.42 13.35L22.44 13.05Q22.47 12.74 22.48 12.72L22.48 12.7Q22.49 12.68 22.51 12.68L22.53 12.69Q22.55 12.69 22.83 12.82L23.11 12.95Q23.39 13.08 23.67 13.27L23.95 13.47Q24.23 13.66 24.5 13.91L24.77 14.16Q25.04 14.41 25.28 14.7L25.53 15Q25.78 15.29 26 15.62L26.21 15.96Q26.43 16.29 26.61 16.64L26.79 16.99Q26.96 17.35 27.1 17.71L27.23 18.07Q27.36 18.43 27.44 18.79L27.52 19.15Q27.6 19.51 27.63 19.84L27.66 20.18Q27.69 20.52 27.69 22.23L27.69 23.94Q27.69 25.65 29.12 26.47L30.55 27.3Q31.98 28.13 33.08 27.49L34.18 26.86Q35.28 26.23 35.28 24.52L35.28 22.81Q35.28 21.1 35.22 20.42L35.17 19.75Q35.11 19.07 34.95 18.35L34.79 17.64Q34.62 16.93 34.36 16.2L34.09 15.48Q33.83 14.75 33.47 14.04L33.12 13.34Q32.76 12.63 32.33 11.97L31.89 11.31Q31.46 10.65 30.96 10.05L30.47 9.46Q29.97 8.87 29.44 8.37L28.9 7.87Q28.36 7.38 27.8 6.99L27.24 6.6Q26.68 6.22 26.13 5.96L25.57 5.7Q25.01 5.44 24.47 5.32L23.93 5.2Q23.4 5.07 22.9 5.09L22.41 5.11Q21.91 5.13 21.48 5.29L21.04 5.46Q20.61 5.62 19.51 6.25L18.41 6.88Q17.32 7.52 16.96 7.81L16.6 8.11Q16.25 8.4 15.98 8.82L15.72 9.24Q15.45 9.66 15.29 10.19L15.13 10.71Q14.96 11.24 14.91 11.85L14.85 12.47Q14.8 13.08 14.8 14.79L14.8 16.5Q14.8 18.21 16.23 19.03Z"
          fill="var(--background)"
        />
        <path
          d="M33.08 27.49Q31.98 28.13 31.98 26.42L31.98 24.71Q31.98 23 31.93 22.32L31.87 21.65Q31.82 20.97 31.66 20.26L31.49 19.54Q31.33 18.83 31.06 18.1L30.8 17.38Q30.54 16.65 30.18 15.95L29.82 15.24Q29.47 14.53 29.03 13.87L28.6 13.21Q28.16 12.55 27.67 11.96L27.17 11.36Q26.68 10.77 26.14 10.27L25.6 9.78Q25.07 9.28 24.51 8.89L23.95 8.51Q23.39 8.12 22.83 7.86L22.27 7.6Q21.72 7.34 21.18 7.22L20.64 7.1Q20.1 6.98 19.61 7L19.11 7.02Q18.62 7.04 18.18 7.2L17.75 7.36Q17.32 7.52 18.41 6.88L19.51 6.25Q20.61 5.62 21.04 5.46L21.48 5.29Q21.91 5.13 22.41 5.11L22.9 5.09Q23.4 5.07 23.93 5.2L24.47 5.32Q25.01 5.44 25.57 5.7L26.13 5.96Q26.68 6.22 27.24 6.6L27.8 6.99Q28.36 7.38 28.9 7.87L29.44 8.37Q29.97 8.87 30.47 9.46L30.96 10.05Q31.46 10.65 31.89 11.31L32.33 11.97Q32.76 12.63 33.12 13.34L33.47 14.04Q33.83 14.75 34.09 15.48L34.36 16.2Q34.62 16.93 34.79 17.64L34.95 18.35Q35.11 19.07 35.17 19.75L35.22 20.42Q35.28 21.1 35.28 22.81L35.28 24.52Q35.28 26.23 34.18 26.86Z"
          fill="var(--background)"
        />
        <path
          d="M20.19 20.05Q19.1 20.69 19.1 18.98L19.1 17.27Q19.1 15.56 19.12 15.25L19.15 14.95Q19.18 14.64 19.26 14.38L19.34 14.11Q19.42 13.85 19.55 13.64L19.69 13.43Q19.82 13.22 20 13.07L20.18 12.93Q20.35 12.78 21.45 12.15L22.55 11.51Q23.65 10.88 23.47 11.03L23.29 11.17Q23.11 11.32 22.98 11.53L22.85 11.74Q22.72 11.95 22.63 12.21L22.55 12.48Q22.47 12.74 22.44 13.05L22.42 13.35Q22.39 13.66 22.39 15.37L22.39 17.08Q22.39 18.78 21.29 19.42Z"
          fill="var(--background)"
        />
        <path
          d="M17.66 19.86Q19.1 20.69 19.1 18.98L19.1 17.27Q19.1 15.56 19.12 15.25L19.15 14.95Q19.18 14.64 19.26 14.38L19.34 14.11Q19.42 13.85 19.55 13.64L19.69 13.43Q19.82 13.22 20 13.07L20.18 12.93Q20.35 12.78 20.57 12.7L20.79 12.62Q21 12.54 21.25 12.53L21.5 12.52Q21.75 12.51 22.02 12.57L22.28 12.63Q22.55 12.69 22.83 12.82L23.11 12.95Q23.39 13.08 23.67 13.27L23.95 13.47Q24.23 13.66 24.5 13.91L24.77 14.16Q25.04 14.41 25.28 14.7L25.53 15Q25.78 15.29 26 15.62L26.21 15.96Q26.43 16.29 26.61 16.64L26.79 16.99Q26.96 17.35 27.1 17.71L27.23 18.07Q27.36 18.43 27.44 18.79L27.52 19.15Q27.6 19.51 27.63 19.84L27.66 20.18Q27.69 20.52 27.69 22.23L27.69 23.94Q27.69 25.65 29.12 26.47L30.55 27.3Q31.98 28.13 31.98 26.42L31.98 24.71Q31.98 23 31.93 22.32L31.87 21.65Q31.82 20.97 31.66 20.26L31.49 19.54Q31.33 18.83 31.06 18.1L30.8 17.38Q30.54 16.65 30.18 15.95L29.82 15.24Q29.47 14.53 29.03 13.87L28.6 13.21Q28.16 12.55 27.67 11.96L27.17 11.36Q26.68 10.77 26.14 10.27L25.6 9.78Q25.07 9.28 24.51 8.89L23.95 8.51Q23.39 8.12 22.83 7.86L22.27 7.6Q21.72 7.34 21.18 7.22L20.64 7.1Q20.1 6.98 19.61 7L19.11 7.02Q18.62 7.04 18.18 7.2L17.75 7.36Q17.32 7.52 16.96 7.81L16.6 8.11Q16.25 8.4 15.98 8.82L15.72 9.24Q15.45 9.66 15.29 10.19L15.13 10.71Q14.96 11.24 14.91 11.85L14.85 12.47Q14.8 13.08 14.8 14.79L14.8 16.5Q14.8 18.21 16.23 19.03Z"
          fill="var(--background)"
        />
        <path
          d="M17.66 19.86Q19.1 20.69 20.19 20.05L21.29 19.42Q22.39 18.78 22.39 17.08L22.39 15.37Q22.39 13.66 22.42 13.35L22.44 13.05Q22.47 12.74 22.48 12.72L22.48 12.7Q22.49 12.68 22.51 12.68L22.53 12.69Q22.55 12.69 22.83 12.82L23.11 12.95Q23.39 13.08 23.67 13.27L23.95 13.47Q24.23 13.66 24.5 13.91L24.77 14.16Q25.04 14.41 25.28 14.7L25.53 15Q25.78 15.29 26 15.62L26.21 15.96Q26.43 16.29 26.61 16.64L26.79 16.99Q26.96 17.35 27.1 17.71L27.23 18.07Q27.36 18.43 27.44 18.79L27.52 19.15Q27.6 19.51 27.63 19.84L27.66 20.18Q27.69 20.52 27.69 22.23L27.69 23.94Q27.69 25.65 29.12 26.47L30.55 27.3Q31.98 28.13 33.08 27.49L34.18 26.86Q35.28 26.23 35.28 24.52L35.28 22.81Q35.28 21.1 35.22 20.42L35.17 19.75Q35.11 19.07 34.95 18.35L34.79 17.64Q34.62 16.93 34.36 16.2L34.09 15.48Q33.83 14.75 33.47 14.04L33.12 13.34Q32.76 12.63 32.33 11.97L31.89 11.31Q31.46 10.65 30.96 10.05L30.47 9.46Q29.97 8.87 29.44 8.37L28.9 7.87Q28.36 7.38 27.8 6.99L27.24 6.6Q26.68 6.22 26.13 5.96L25.57 5.7Q25.01 5.44 24.47 5.32L23.93 5.2Q23.4 5.07 22.9 5.09L22.41 5.11Q21.91 5.13 21.48 5.29L21.04 5.46Q20.61 5.62 19.51 6.25L18.41 6.88Q17.32 7.52 16.96 7.81L16.6 8.11Q16.25 8.4 15.98 8.82L15.72 9.24Q15.45 9.66 15.29 10.19L15.13 10.71Q14.96 11.24 14.91 11.85L14.85 12.47Q14.8 13.08 14.8 14.79L14.8 16.5Q14.8 18.21 16.23 19.03Z"
          fill="none"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          stroke="var(--foreground)"
        />
        <path
          d="M31.98 27.77L31.98 24.59Q31.98 23 31.93 22.32L31.87 21.65Q31.82 20.97 31.66 20.26L31.49 19.54Q31.33 18.83 31.06 18.1L30.8 17.38Q30.54 16.65 30.18 15.95L29.82 15.24Q29.47 14.53 29.03 13.87L28.6 13.21Q28.16 12.55 27.67 11.96L27.17 11.36Q26.68 10.77 26.14 10.27L25.6 9.78Q25.07 9.28 24.51 8.89L23.95 8.51Q23.39 8.12 22.83 7.86L22.27 7.6Q21.72 7.34 21.18 7.22L20.64 7.1Q20.1 6.98 19.61 7L19.11 7.02Q18.62 7.04 18.23 7.18L17.44 7.47"
          fill="none"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          stroke="var(--foreground)"
        />
        <path
          d="M19.1 20.33L19.1 17.15Q19.1 15.56 19.12 15.25L19.15 14.95Q19.18 14.64 19.26 14.38L19.34 14.11Q19.42 13.85 19.55 13.64L19.69 13.43Q19.82 13.22 20 13.07L20.18 12.93Q20.35 12.78 20.57 12.7L20.79 12.62Q21 12.54 21.25 12.53L21.5 12.52Q21.75 12.51 21.93 12.55L22.31 12.64"
          fill="none"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          stroke="var(--foreground)"
        />
        <path
          className="ak-lit-line ak-lit-run"
          d="M31.98 27.77L31.98 24.59Q31.98 23 31.93 22.32L31.87 21.65Q31.82 20.97 31.66 20.26L31.49 19.54Q31.33 18.83 31.06 18.1L30.8 17.38Q30.54 16.65 30.18 15.95L29.82 15.24Q29.47 14.53 29.03 13.87L28.6 13.21Q28.16 12.55 27.67 11.96L27.17 11.36Q26.68 10.77 26.14 10.27L25.6 9.78Q25.07 9.28 24.51 8.89L23.95 8.51Q23.39 8.12 22.83 7.86L22.27 7.6Q21.72 7.34 21.18 7.22L20.64 7.1Q20.1 6.98 19.61 7L19.11 7.02Q18.62 7.04 18.23 7.18L17.44 7.47"
          pathLength="1"
          strokeDasharray="0.14 0.86"
          fill="none"
          strokeWidth="1.4"
        />
        <path
          className="ak-lit-line ak-lit-run"
          d="M19.1 20.33L19.1 17.15Q19.1 15.56 19.12 15.25L19.15 14.95Q19.18 14.64 19.26 14.38L19.34 14.11Q19.42 13.85 19.55 13.64L19.69 13.43Q19.82 13.22 20 13.07L20.18 12.93Q20.35 12.78 20.57 12.7L20.79 12.62Q21 12.54 21.25 12.53L21.5 12.52Q21.75 12.51 21.93 12.55L22.31 12.64"
          pathLength="1"
          strokeDasharray="0.14 0.86"
          fill="none"
          strokeWidth="1.4"
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

import { HL } from '@lib/hairline/kernel'

const { Cam, fit, proj } = HL

export const W = 96
export const T = 16
export const GAP = 30
export const LIFT = 9
export const R = 11
export const N = 3
export const REST = N - 1
export const FIT_X = 138
export const FIT_Y = 148
export const SCALE = 1.85

export const zOf = (i: number) => i * (T + GAP)

export function camera() {
  const C = Cam(45, 0.5, SCALE)
  fit(
    C,
    [
      [0, 0, zOf(N - 1) + T + 2 * LIFT],
      [W, 0, 0],
      [0, W, 0],
      [W, W, 0],
      [0, 0, 0],
    ],
    FIT_X,
    FIT_Y,
  )
  return C
}

const BASE = proj(camera())

export const LAYER_ANCHORS = [2, 1, 0].map((i) => {
  const [x, y] = BASE(W, 0, zOf(i) + T / 2)
  return { left: `${(x / 400) * 100}%`, top: `${(y / 320) * 100}%` }
})

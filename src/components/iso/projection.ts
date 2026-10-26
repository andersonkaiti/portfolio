const HALF_WIDTH = 1
const HALF_HEIGHT = 0.5

export type Vec3 = readonly [number, number, number]
export type Origin = readonly [number, number]
export type Point = readonly [number, number]

export interface BoxSpec {
  at?: Vec3
  size: Vec3
  origin?: Origin
}

const round = (value: number) => Math.round(value * 100) / 100

export function project(
  [x, y, z]: Vec3,
  [originX, originY]: Origin = [0, 0],
): Point {
  return [
    round(originX + (x - y) * HALF_WIDTH),
    round(originY + (x + y) * HALF_HEIGHT - z),
  ]
}

function outline(points: Point[]) {
  return `${points.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('')}Z`
}

export function boxFaces({ at = [0, 0, 0], size, origin }: BoxSpec) {
  const [x, y, z] = at
  const [w, d, h] = size
  const top = z + h
  const at3 = (px: number, py: number, pz: number) =>
    project([px, py, pz], origin)

  return {
    left: outline([
      at3(x, y + d, top),
      at3(x + w, y + d, top),
      at3(x + w, y + d, z),
      at3(x, y + d, z),
    ]),
    right: outline([
      at3(x + w, y + d, top),
      at3(x + w, y, top),
      at3(x + w, y, z),
      at3(x + w, y + d, z),
    ]),
    top: outline([
      at3(x, y, top),
      at3(x + w, y, top),
      at3(x + w, y + d, top),
      at3(x, y + d, top),
    ]),
  }
}

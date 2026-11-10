'use client'

import { HL } from '@lib/hairline/kernel'
import { useEffect, useRef } from 'react'
import { FIGURE_THEME } from './figure-theme'

const {
  Cam,
  clamp,
  facing,
  fit,
  mk,
  pointer,
  poly,
  proj,
  register,
  rings,
  seg,
  disposer,
  prism,
  put,
  solid,
  tween,
  tset,
  tval,
  tdone,
} = HL

const SECONDS = [2.4, 1.9, 1.5, 1.1, 0.8, 0.6]
const N = SECONDS.length
const K = 18
const BW = 12
const GAP = 6
const DEPTH = 30
const LIFT = 7
const STEP = 40
const REACH = [1, 0.36, 0.12]
const X0 = -7
const X1 = N * BW + (N - 1) * GAP + 7
const Y0 = -7
const Y1 = DEPTH + 7
const PB = 5
const WALL = 52
const REST = N - 1

function mount(stage: HTMLElement, svg: SVGSVGElement) {
  const bag = disposer()
  let act = -1

  const C = Cam(45, 0.5, 2.1)
  fit(
    C,
    [
      [X0, Y0, WALL],
      [X1, Y0, WALL],
      [X1, Y1, -PB],
      [X0, Y1, -PB],
      [X0, Y0, 0],
    ],
    200,
    166,
  )
  const P = proj(C)
  const front = facing(C)

  const g = mk('g', {}, svg)
  const [pr, pi] = rings(X0, Y0, X1, Y1, 5, 1.4)
  put(solid(g), prism(P, front, pr, pi, -PB, 0))

  const wall = [
    P(X0, Y0 + 1, 0),
    P(X0, Y0 + 1, WALL),
    P(X1, Y0 + 1, WALL),
    P(X1, Y0 + 1, 0),
  ]
  mk('path', { d: poly(wall), class: 'sil' }, g)
  mk(
    'path',
    {
      d: [18, 36]
        .map((z) => seg(P(X0 + 3, Y0 + 1, z), P(X1 - 3, Y0 + 1, z)))
        .join(''),
      class: 'nf lo',
    },
    g,
  )

  const bars = SECONDS.map((s, i) => {
    const x0 = i * (BW + GAP)
    const h = s * K
    const [ring, inner] = rings(x0, 0, x0 + BW, DEPTH, 3.4, 1.2)
    const top = P(x0 + BW / 2, DEPTH / 2, h / 2)
    return { s, h, ring, inner, top, el: solid(g), z: tween(0), drawn: NaN }
  })

  const draw = (b: (typeof bars)[number], lift: number) => {
    if (lift === b.drawn) return
    b.drawn = lift
    put(b.el, prism(P, front, b.ring, b.inner, 0, b.h + lift))
  }

  const loop = register(stage, (_dt: number, now: number) => {
    let moving = false
    for (const b of bars) {
      draw(b, tval(b.z, now))
      if (!tdone(b.z, now)) moving = true
    }
    return moving
  })
  bag.add(loop.unregister)

  const hit = ([x, y]: [number, number]) => {
    let best = -1
    let d = 40 * 40
    bars.forEach((b, i) => {
      const dd = (b.top[0] - x) ** 2 + (b.top[1] - y) ** 2
      if (dd < d) {
        d = dd
        best = i
      }
    })
    return best
  }

  const paint = () => {
    const lit = act < 0 ? REST : act
    bars.forEach((b, i) => {
      b.el.sil.classList.toggle('hi', i === lit)
    })
  }

  const setActive = (a: number) => {
    if (a === act) return
    const now = performance.now()
    const from = a >= 0 ? a : act
    act = a
    bars.forEach((b, i) => {
      const reach =
        a < 0 ? 0 : REACH[Math.min(Math.abs(i - a), REACH.length - 1)]
      tset(
        b.z,
        clamp((reach ?? 0) * LIFT, 0, LIFT),
        now,
        Math.abs(i - from) * STEP,
      )
    })
    paint()
    loop.wake()
  }

  for (const b of bars) draw(b, 0)
  paint()
  bag.add(
    pointer(stage, {
      move: (p: [number, number]) => setActive(hit(p)),
      leave: () => setActive(-1),
    }),
  )
  bag.add(() => svg.replaceChildren())

  return bag.dispose as () => void
}

interface ProofFigureProps {
  width: number
}

export function ProofFigure({ width }: ProofFigureProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = ref.current
    if (!stage) return
    HL.inject(document)
    const svg = HL.mk('svg', { viewBox: '0 0 400 320' }, stage)
    const dispose = mount(stage, svg)
    return () => {
      dispose()
      svg.remove()
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-hairline="proof"
      style={{ ...FIGURE_THEME, width }}
    />
  )
}

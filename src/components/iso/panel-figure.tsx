'use client'

import { HL } from '@lib/hairline/kernel'
import { useEffect, useRef } from 'react'
import { SIGNAL_THEME } from './figure-theme'

const {
  Cam,
  clamp,
  fit,
  facing,
  mk,
  pointer,
  poly,
  proj,
  register,
  rings,
  rrect,
  ringAt,
  disposer,
  prism,
  put,
  solid,
  tween,
  tset,
  tval,
  tdone,
  place,
} = HL

const N = 5
const W = 150
const D = 74
const TH = 9
const PITCH = 27
const X0 = 22
const SL0 = 10
const SLEN = 54
const KW = 14
const KL = 16
const KH = 11
const REST = [0.15, 0.85, 0.45, 0.9, 0.25]
const LIT = 3
const REACH = [1, 0.3, 0.1]
const STEP = 45

const colX = (i: number) => X0 + i * PITCH
const kneeY = (u: number) => SL0 + 3 + u * (SLEN - KL - 6)

type Ring = { u: number; v: number }[]

function mount(stage: HTMLElement, svg: SVGSVGElement) {
  const bag = disposer()
  let act = -1

  const C = Cam(45, 0.5, 2.15)
  fit(
    C,
    [
      [0, 0, KH],
      [W, 0, KH],
      [W, D, -TH],
      [0, D, -TH],
    ],
    200,
    166,
  )
  const P = proj(C)
  const front = facing(C)
  const g = mk('g', {}, svg)

  const [pr, pi] = rings(0, 0, W, D, 7, 1.6)
  put(solid(g), prism(P, front, pr, pi, -TH, 0))

  const leds: SVGElement[] = []
  for (let i = 0; i < N; i++) {
    const x = colX(i)
    mk(
      'path',
      {
        d: poly(ringAt(P, rrect(x - 6, SL0, x + 6, SL0 + SLEN, 6, 5), 0)),
        class: 'nf',
      },
      g,
    )
    const led = mk('ellipse', { rx: 1.5, ry: 0.8, class: 'dot off' }, g)
    place(led, P(x, D - 7, 0))
    leds.push(led)
  }

  const knobs = REST.map((u0, i) => {
    const [ring, inner] = rings(
      colX(i) - KW / 2,
      0,
      colX(i) + KW / 2,
      KL,
      4.2,
      1.4,
    )
    return {
      i,
      ring: ring as Ring,
      inner: inner as Ring,
      el: solid(g),
      u: tween(u0),
      to: u0,
      drawn: Number.NaN,
    }
  })

  const draw = (k: (typeof knobs)[number], u: number) => {
    if (u === k.drawn) return
    k.drawn = u
    const y = kneeY(u)
    const shift = (r: Ring) => r.map((q) => ({ ...q, v: q.v + y }))
    put(k.el, prism(P, front, shift(k.ring), shift(k.inner), 0, KH))
  }

  const loop = register(stage, (_dt: number, now: number) => {
    let moving = false
    for (const k of knobs) {
      draw(k, tval(k.u, now))
      if (!tdone(k.u, now)) moving = true
    }
    return moving
  })
  bag.add(loop.unregister)

  const hit = ([x, y]: [number, number]) => {
    let best = -1
    let d = 36 * 36
    for (let i = 0; i < N; i++) {
      const c = P(colX(i), SL0 + SLEN / 2, KH / 2)
      const dd = (c[0] - x) ** 2 + (c[1] - y) ** 2
      if (dd < d) {
        d = dd
        best = i
      }
    }
    return best
  }

  const paint = () => {
    knobs.forEach((k, i) => {
      k.el.sil.classList.toggle('hi', i === (act < 0 ? LIT : act))
      leds[i]?.setAttribute('class', `dot ${k.to > 0.5 ? 'm' : 'off'}`)
    })
  }

  const setActive = (a: number) => {
    if (a === act) return
    const now = performance.now()
    const from = a >= 0 ? a : act
    act = a
    knobs.forEach((k, i) => {
      const f = a < 0 ? 0 : (REACH[Math.min(Math.abs(i - a), 2)] ?? 0)
      const rest = REST[i] ?? 0
      const to = a < 0 ? rest : rest + (1 - rest) * f * (i === a ? 1 : 0.5)
      k.to = clamp(to, 0, 1)
      tset(k.u, k.to, now, Math.abs(i - from) * STEP)
    })
    paint()
    loop.wake()
  }

  for (const k of knobs) draw(k, k.to)
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

export function PanelFigure({ className }: { className?: string }) {
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
    <div className={className}>
      <div
        ref={ref}
        aria-hidden="true"
        data-hairline="panel"
        style={SIGNAL_THEME}
      />
    </div>
  )
}

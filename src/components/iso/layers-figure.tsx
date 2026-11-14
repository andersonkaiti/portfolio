'use client'

import { jetBrainsMono } from '@lib/fonts'
import { HL } from '@lib/hairline/kernel'
import { cn } from 'cn'
import { useEffect, useRef } from 'react'
import { FIGURE_THEME } from './figure-theme'
import {
  camera,
  LAYER_ANCHORS,
  LIFT,
  N,
  R,
  REST,
  T,
  W,
  zOf,
} from './layers-geometry'

const {
  clamp,
  facing,
  mk,
  pointer,
  proj,
  register,
  rings,
  disposer,
  prism,
  put,
  solid,
  tween,
  tset,
  tval,
  tdone,
  place,
  seg,
} = HL

type Tag = HTMLElement | null

function mount(stage: HTMLElement, svg: SVGSVGElement, tags: Tag[]) {
  const bag = disposer()
  let act = -1

  const C = camera()
  const P = proj(C)
  const front = facing(C)
  const g = mk('g', {}, svg)

  const slabs = [0, 1, 2].map((i) => {
    const [ring, inner] = rings(0, 0, W, W, R, 1.8)
    const el = solid(g)
    const marks: SVGElement[] = []
    if (i === 2) {
      for (let k = 0; k < 3; k++) {
        marks.push(mk('circle', { r: 1.3, class: `dot ${k ? 'off' : 'm'}` }, g))
      }
    }
    const lines = mk('path', { class: 'nf lo' }, g)
    return {
      i,
      ring,
      inner,
      el,
      marks,
      lines,
      z: tween(0),
      top: P(W / 2, W / 2, zOf(i) + T / 2),
      drawn: Number.NaN,
    }
  })

  const tagOf = (slab: number) => tags[N - 1 - slab]

  const draw = (s: (typeof slabs)[number], lift: number) => {
    if (lift === s.drawn) return
    s.drawn = lift
    const z0 = zOf(s.i) + lift
    const z1 = z0 + T
    put(s.el, prism(P, front, s.ring, s.inner, z0, z1))
    s.marks.forEach((m, k) => {
      place(m, P(18 + k * 9, 18, z1))
    })
    const zm = z0 + T / 2
    const tag = tagOf(s.i)
    if (tag) tag.style.top = `${(P(W, 0, zm)[1] / 320) * 100}%`
    if (s.i === 1) {
      s.lines.setAttribute(
        'd',
        [0, 1, 2]
          .map((k) => seg(P(20 + k * 22, W, zm), P(30 + k * 22, W, zm)))
          .join(''),
      )
    }
    if (s.i === 0) {
      s.lines.setAttribute(
        'd',
        [z0 + 5, z0 + 11]
          .map((z) => seg(P(14, W, z), P(W - 14, W, z)))
          .join(''),
      )
    }
  }

  const loop = register(stage, (_dt: number, now: number) => {
    let moving = false
    for (const s of slabs) {
      draw(s, tval(s.z, now))
      if (!tdone(s.z, now)) moving = true
    }
    return moving
  })
  bag.add(loop.unregister)

  const hit = ([x, y]: [number, number]) => {
    let best = -1
    let d = 70 * 70
    slabs.forEach((s, i) => {
      const dd = (s.top[0] - x) ** 2 + (s.top[1] - y) ** 2
      if (dd < d) {
        d = dd
        best = i
      }
    })
    return best
  }

  const paint = () => {
    const lit = act < 0 ? REST : act
    slabs.forEach((s, i) => {
      s.el.sil.classList.toggle('hi', i === lit)
      const tag = tagOf(i)
      if (tag) tag.dataset.active = String(i === act)
    })
  }

  const setActive = (a: number) => {
    if (a === act) return
    const now = performance.now()
    act = a
    slabs.forEach((s, i) => {
      tset(s.z, i === a ? clamp(LIFT, 0, LIFT * 2) : 0, now, 0)
    })
    paint()
    loop.wake()
  }

  for (const s of slabs) draw(s, 0)
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

interface LayersFigureProps {
  label: string
  labels: string[]
}

export function LayersFigure({ label, labels }: LayersFigureProps) {
  const ref = useRef<HTMLDivElement>(null)
  const tags = useRef<Tag[]>([])

  useEffect(() => {
    const stage = ref.current
    if (!stage) return
    HL.inject(document)
    const svg = HL.mk('svg', { viewBox: '0 0 400 320' }, stage)
    const dispose = mount(stage, svg, tags.current)
    return () => {
      dispose()
      svg.remove()
    }
  }, [])

  return (
    <div className="relative">
      <div
        ref={ref}
        role="img"
        aria-label={label}
        data-hairline="layers"
        style={FIGURE_THEME}
      />
      <ul
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 m-0 list-none p-0 text-[10px] text-muted-foreground sm:text-[12px]',
          jetBrainsMono.className,
        )}
      >
        {labels.map((text, index) => (
          <li
            key={text}
            ref={(el) => {
              tags.current[index] = el
            }}
            data-active="false"
            className="group absolute flex -translate-y-1/2 items-center gap-1.5 whitespace-nowrap pl-2 transition-colors duration-300 data-[active=true]:text-foreground"
            style={LAYER_ANCHORS[index]}
          >
            <span className="size-1 rounded-full bg-primary/30 transition-[background-color,box-shadow,transform] duration-300 group-data-[active=true]:scale-150 group-data-[active=true]:bg-primary group-data-[active=true]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_25%,transparent),0_0_10px_var(--primary)]" />
            <span className="h-px w-3 border-t border-dashed border-dash" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  )
}

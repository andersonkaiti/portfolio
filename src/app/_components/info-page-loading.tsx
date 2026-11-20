import { Skeleton } from '@components/ui/skeleton'
import type { CSSProperties } from 'react'

type Lines = readonly [count: number, last: number]

interface Responsive {
  m: Lines
  d: Lines
}

interface SectionShape {
  h: Responsive
  p: Responsive[]
}

interface PageShape {
  title: Responsive
  lead: Responsive
  sections: SectionShape[]
  pills?: number[]
  nav: number[]
}

const PAGES = {
  about: {
    title: { m: [2, 0.24], d: [1, 0.91] },
    lead: { m: [4, 0.52], d: [2, 0.9] },
    sections: [
      {
        h: { m: [1, 0.33], d: [1, 0.15] },
        p: [{ m: [8, 0.97], d: [4, 0.69] }],
      },
      {
        h: { m: [1, 0.63], d: [1, 0.28] },
        p: [
          { m: [8, 0.41], d: [4, 0.49] },
          { m: [9, 0.62], d: [4, 0.94] },
        ],
      },
      {
        h: { m: [1, 0.59], d: [1, 0.26] },
        p: [{ m: [7, 0.73], d: [3, 0.93] }],
      },
      { h: { m: [1, 0.52], d: [1, 0.23] }, p: [{ m: [6, 0.2], d: [3, 0.34] }] },
      {
        h: { m: [1, 0.51], d: [1, 0.23] },
        p: [{ m: [5, 0.56], d: [3, 0.09] }],
      },
    ],
    nav: [59, 92],
  },
  contact: {
    title: { m: [1, 0.43], d: [1, 0.34] },
    lead: { m: [3, 0.21], d: [2, 0.3] },
    sections: [
      { h: { m: [1, 0.5], d: [1, 0.22] }, p: [{ m: [5, 0.95], d: [3, 0.19] }] },
      {
        h: { m: [1, 0.89], d: [1, 0.4] },
        p: [
          { m: [4, 0.31], d: [2, 0.45] },
          { m: [5, 0.72], d: [3, 0.08] },
        ],
      },
      {
        h: { m: [1, 0.72], d: [1, 0.32] },
        p: [{ m: [3, 0.11], d: [1, 0.95] }],
      },
    ],
    pills: [99, 131, 114, 104],
    nav: [42, 92],
  },
  privacy: {
    title: { m: [1, 0.63], d: [1, 0.51] },
    lead: { m: [4, 0.22], d: [2, 0.81] },
    sections: [
      {
        h: { m: [1, 0.55], d: [1, 0.24] },
        p: [
          { m: [8, 0.6], d: [4, 0.41] },
          { m: [12, 0.29], d: [5, 0.9] },
          { m: [4, 0.88], d: [2, 0.82] },
        ],
      },
      {
        h: { m: [2, 0.16], d: [1, 0.47] },
        p: [{ m: [11, 0.78], d: [5, 0.98] }],
      },
      {
        h: { m: [1, 0.7], d: [1, 0.31] },
        p: [{ m: [11, 0.57], d: [5, 0.68] }],
      },
      {
        h: { m: [1, 0.87], d: [1, 0.39] },
        p: [{ m: [7, 0.18], d: [3, 0.73] }],
      },
      { h: { m: [1, 0.43], d: [1, 0.19] }, p: [{ m: [7, 0.9], d: [3, 0.76] }] },
      {
        h: { m: [1, 0.36], d: [1, 0.16] },
        p: [{ m: [3, 0.85], d: [2, 0.27] }],
      },
    ],
    nav: [42, 59],
  },
} satisfies Record<string, PageShape>

export type InfoPageLoadingKey = keyof typeof PAGES

const RAGGED = [100, 97, 99, 94, 100, 96]

interface TextLinesProps {
  lines: Lines
  lineHeight: number
  bar: number
  className?: string
}

function TextLines({ lines, lineHeight, bar, className }: TextLinesProps) {
  const [count, last] = lines

  return (
    <div className={className}>
      {Array.from({ length: count }, (_, index) => {
        const width =
          index === count - 1
            ? Math.round(last * 100)
            : (RAGGED[index % RAGGED.length] ?? 100)

        return (
          <div
            key={`${index}-${width}`}
            className="flex items-center"
            style={{ height: `${lineHeight}em` }}
          >
            <Skeleton
              className="rounded-full bg-skeleton"
              style={{ height: `${bar}em`, width: `${width}%` }}
            />
          </div>
        )
      })}
    </div>
  )
}

interface ResponsiveTextProps {
  shape: Responsive
  lineHeight: number
  bar: number
  className?: string
}

function ResponsiveText({
  shape,
  lineHeight,
  bar,
  className,
}: ResponsiveTextProps) {
  return (
    <>
      <TextLines
        lines={shape.m}
        lineHeight={lineHeight}
        bar={bar}
        className={`md:hidden ${className ?? ''}`}
      />
      <TextLines
        lines={shape.d}
        lineHeight={lineHeight}
        bar={bar}
        className={`hidden md:block ${className ?? ''}`}
      />
    </>
  )
}

const DIAMOND: CSSProperties = {
  clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
}

const HUB_TILES = Array.from({ length: 8 }, (_, index) => {
  const angle = (index / 8) * Math.PI * 2 - Math.PI / 2

  return {
    id: `tile-${index}`,
    left: 50 + Math.cos(angle) * 29,
    top: 50 + Math.sin(angle) * 20,
  }
})

function HubSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto -mb-2 block aspect-5/4 w-60 lg:absolute lg:top-6 lg:right-6 lg:z-10 lg:mx-0 lg:mb-0 lg:w-[340px]"
    >
      <Skeleton
        className="absolute rounded-none bg-skeleton opacity-50"
        style={{
          ...DIAMOND,
          left: '10%',
          top: '26%',
          width: '80%',
          height: '48%',
        }}
      />
      {HUB_TILES.map((tile) => (
        <Skeleton
          key={tile.id}
          className="absolute rounded-none bg-skeleton"
          style={{
            ...DIAMOND,
            left: `${tile.left - 6}%`,
            top: `${tile.top - 4}%`,
            width: '12%',
            height: '8%',
          }}
        />
      ))}
      <Skeleton
        className="absolute rounded-none bg-skeleton"
        style={{
          ...DIAMOND,
          left: '42%',
          top: '45%',
          width: '16%',
          height: '10%',
        }}
      />
    </div>
  )
}

export function InfoPageLoading({ page }: { page: InfoPageLoadingKey }) {
  const shape: PageShape = PAGES[page]

  return (
    <main
      aria-busy="true"
      className="relative mx-auto w-full max-w-7xl px-6 pt-[72px] pb-28"
    >
      <HubSkeleton />

      <div className="flex max-w-3xl flex-col gap-8">
        <div className="flex min-h-11 items-center gap-2.5">
          <Skeleton className="size-[18px] rounded-full bg-skeleton" />
          <Skeleton className="h-3.5 w-[50px] bg-skeleton" />
        </div>

        <ResponsiveText
          shape={shape.title}
          lineHeight={0.98}
          bar={0.62}
          className="text-[clamp(40px,6vw,72px)]"
        />

        <ResponsiveText
          shape={shape.lead}
          lineHeight={1.45}
          bar={0.62}
          className="max-w-[34em] text-[clamp(18px,1.9vw,23px)]"
        />

        {shape.pills && (
          <div className="flex flex-wrap gap-3">
            {shape.pills.map((width) => (
              <Skeleton
                key={width}
                className="h-12 rounded-full bg-skeleton"
                style={{ width }}
              />
            ))}
          </div>
        )}

        {shape.sections.map((section, index) => (
          <section
            key={`${page}-${index}-${section.h.d[1]}`}
            className="flex flex-col gap-4 border-t border-dash/35 pt-8"
          >
            <ResponsiveText
              shape={section.h}
              lineHeight={1.25}
              bar={0.6}
              className="text-2xl"
            />
            {section.p.map((paragraph) => (
              <ResponsiveText
                key={`${paragraph.m[0]}-${paragraph.d[0]}-${paragraph.m[1]}`}
                shape={paragraph}
                lineHeight={1.6}
                bar={0.62}
                className="max-w-[40em] text-lg"
              />
            ))}
          </section>
        ))}

        <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-dash/35 pt-8">
          {shape.nav.map((width) => (
            <div key={width} className="flex min-h-11 items-center">
              <Skeleton className="h-3.5 bg-skeleton" style={{ width }} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

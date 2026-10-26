import { cn } from 'cn'
import type { CSSProperties } from 'react'

const EMBERS = [
  { x: 8.5, y: 7, delay: 0 },
  { x: 15.5, y: 6, delay: 0.9 },
  { x: 12, y: 4, delay: 1.7 },
] as const

export function FlameIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        'overflow-visible dark:drop-shadow-[0_0_6px_var(--signal)]',
        className,
      )}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        className="ak-flame-body fill-signal stroke-primary"
        d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
        strokeLinejoin="round"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="ak-flame-core fill-on-signal"
        d="M12 21a3 3 0 0 0 3-3c0-1.2-.7-2-1.5-3-.5 1-1 1.3-1.5 1.8-.6-.8-.9-1.5-.9-2.3-1.3 1.2-2.1 2.4-2.1 3.5a3 3 0 0 0 3 3z"
        opacity="0.4"
      />
      {EMBERS.map(({ x, y, delay }) => (
        <circle
          className="ak-ember fill-signal stroke-primary"
          cx={x}
          cy={y}
          key={x}
          r="0.9"
          strokeWidth="0.6"
          style={{ '--d': `${delay}s` } as CSSProperties}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}

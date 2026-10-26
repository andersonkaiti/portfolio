import type { CSSProperties } from 'react'

export function StepNumber({ value }: { value: string }) {
  return (
    <>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex">
        {Array.from(value).map((char, index) => (
          <span
            className="ak-num-char inline-block"
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed digit positions
            key={index}
            style={{ '--i': index } as CSSProperties}
          >
            {char}
          </span>
        ))}
      </span>
    </>
  )
}

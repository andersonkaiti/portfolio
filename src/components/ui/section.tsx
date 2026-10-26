import { AnimatedText } from '@components/ui/animated-text'
import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import type { HTMLAttributes } from 'react'

export function SectionContainer({
  children,
  className,
  ...props
}: { children: React.ReactNode } & HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-7xl scroll-mt-[120px] space-y-8 px-6 py-14 md:space-y-10 md:py-20',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}

export function SectionBand({
  children,
  className,
  innerClassName,
  ...props
}: {
  children: React.ReactNode
  innerClassName?: string
} & HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn(
        'ak-band relative scroll-mt-[120px] overflow-hidden',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'mx-auto w-full max-w-7xl px-6 py-14 md:py-20',
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  )
}

export function SectionHeader({
  children,
  side = 'center',
  ...rest
}: {
  children: React.ReactNode
  side?: 'center' | 'left'
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn(
        side === 'left'
          ? 'flex flex-col items-start gap-3 text-left'
          : 'space-y-4 text-center',
      )}
      {...rest}
    >
      {children}
    </header>
  )
}

export function SectionLabel({
  children,
  className,
  ...rest
}: { children: React.ReactNode } & HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-balance text-sm font-medium uppercase tracking-[0.04em] text-muted-foreground',
        jetBrainsMono.className,
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  )
}

export function SectionTitle({
  children,
  className,
  ...rest
}: { children: React.ReactNode } & HTMLAttributes<HTMLHeadingElement>) {
  const titleClass = cn(
    'text-balance font-bold leading-[1.04] tracking-[-0.03em] text-[clamp(30px,3.6vw,44px)]',
    className,
  )

  if (typeof children === 'string') {
    return (
      <AnimatedText as="h2" className={titleClass}>
        {children}
      </AnimatedText>
    )
  }

  return (
    <h2 className={titleClass} {...rest}>
      {children}
    </h2>
  )
}

export function SectionSubtitle({
  children,
  ...rest
}: { children: React.ReactNode } & HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className="max-w-[36em] text-balance text-base leading-7 text-body md:text-lg"
      {...rest}
    >
      {children}
    </p>
  )
}

'use client'

import { cn } from '@lib/utils'
import { Root } from '@radix-ui/react-slot'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'

type Variant = {
  variant: string
  component: React.FC<React.ComponentProps<'div'>>
}

const variants = [
  {
    variant: 'default',
    component: ({ children, className, ...props }) => (
      <div
        {...props}
        className={cn(
          'relative rounded-xl border bg-card px-6 py-6 text-card-foreground shadow-sm',
          className,
        )}
      >
        {children}
      </div>
    ),
  },
  {
    variant: 'animated-border',
    component: ({ children, className, ...props }) => (
      <div
        {...props}
        className={cn(
          'relative rounded-xl border bg-card px-6 py-6 text-card-foreground shadow-sm',
          className,
        )}
      >
        <div
          className={cn(
            '-inset-px pointer-events-none absolute rounded-[inherit] border border-transparent',
            '[mask-clip:padding-box,border-box]',
            'mask-intersect mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)]',
          )}
        >
          <motion.div
            animate={{
              offsetDistance: ['0%', '100%'],
            }}
            className={cn(
              'absolute aspect-square bg-linear-to-r from-transparent via-primary to-primary/80 dark:from-transparent dark:via-primary/50 dark:to-primary/40',
            )}
            style={{
              width: 42,
              offsetPath: `rect(0 auto auto 0 round ${18}px)`,
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5,
              ease: 'linear',
            }}
          />
        </div>
        <span className="relative z-10">{children}</span>
      </div>
    ),
  },
  {
    variant: 'shine',
    component: ({ children, className, ...props }) => (
      <div
        {...props}
        className={cn(
          'inline-flex items-center justify-center rounded-xl border bg-card px-6 py-6 text-card-foreground text-sm shadow-sm transition-colors',
          'animate-shine',
          'bg-[linear-gradient(110deg,var(--color-card),45%,var(--color-border),55%,var(--color-card))] bg-size-[400%_100%]',
          'dark:bg-[linear-gradient(110deg,var(--color-card),45%,var(--color-border),55%,var(--color-card))]',
          className,
        )}
      >
        {children}
      </div>
    ),
  },
  {
    variant: 'revealed-pointer',
    component: ({ children, className, ...props }) => {
      const mouseX = useMotionValue(0)
      const mouseY = useMotionValue(0)

      return (
        <div
          aria-hidden="true"
          className={cn(
            'group relative overflow-hidden rounded-xl bg-border/40 p-px',
          )}
          onMouseMove={(e) => {
            const { left, top } = e.currentTarget.getBoundingClientRect()
            mouseX.set(e.clientX - left)
            mouseY.set(e.clientY - top)
          }}
        >
          <motion.div
            aria-hidden="true"
            className={cn(
              '-inset-px pointer-events-none absolute rounded-xl opacity-0 transition duration-300 group-hover:opacity-20',
              '[--color:var(--color-primary)]',
            )}
            style={{
              background: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, var(--color), transparent 80%)`,
            }}
          />
          <div
            {...props}
            className={cn(
              'relative select-none rounded-xl bg-card px-6 py-6 text-card-foreground shadow-sm',
              className,
            )}
          >
            {children}
          </div>
        </div>
      )
    },
  },
] as const satisfies readonly Variant[]

interface AnimatedCardProps extends React.ComponentProps<'div'> {
  variant?: (typeof variants)[number]['variant']
}

export function AnimatedCard({
  variant = 'default',
  className,
  ...props
}: AnimatedCardProps) {
  const FALLBACK_INDEX = 0

  const variantComponent = variants.find(
    (v) => v.variant === variant,
  )?.component

  const Component = variantComponent || variants[FALLBACK_INDEX].component

  return (
    <Root className="size-fit">
      <Component {...props} className={className} />
    </Root>
  )
}

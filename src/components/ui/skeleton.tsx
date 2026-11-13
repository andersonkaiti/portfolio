import { cn } from 'cn'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'animate-shimmer rounded-md bg-accent bg-size-[200%_100%] bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.7)_50%,transparent_65%)] dark:bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.07)_50%,transparent_65%)] motion-reduce:animate-none',
        className,
      )}
      data-slot="skeleton"
      {...props}
    />
  )
}

export { Skeleton }

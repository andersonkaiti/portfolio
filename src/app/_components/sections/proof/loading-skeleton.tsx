import { Skeleton } from '@components/ui/skeleton'

const SUMMARY_WIDTHS = ['w-32', 'w-36', 'w-16']
const CONTRIBUTION_LEVELS = [0, 1, 2, 3, 4]

export function LoadingSkeleton() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div>
          <Skeleton className="h-[clamp(56px,6.4vw,84px)] w-[clamp(180px,20vw,260px)] rounded-lg" />
          <Skeleton className="mt-3 h-4 w-52" />
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-6">
          {SUMMARY_WIDTHS.map((width) => (
            <div key={width}>
              <Skeleton className={`h-8 ${width}`} />
              <Skeleton className="mt-2 h-4 w-24" />
            </div>
          ))}
        </div>
      </div>

      <Skeleton className="mt-10 h-[200px] w-full rounded-lg" />

      <div className="mt-4 flex items-center justify-between gap-4">
        <Skeleton className="h-4 w-56" />
        <div className="flex items-center gap-1">
          {CONTRIBUTION_LEVELS.map((level) => (
            <Skeleton key={level} className="size-3 rounded-sm" />
          ))}
        </div>
      </div>
    </>
  )
}

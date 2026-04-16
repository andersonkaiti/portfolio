import { Skeleton } from '@components/ui/skeleton'

const CONTRIBUTION_LEVELS = [0, 1, 2, 3, 4]

export function LoadingSkeleton() {
  return (
    <>
      <div className="flex justify-end">
        <Skeleton className="h-5 w-32" />
      </div>

      <Skeleton className="h-37.5 w-full rounded-lg" />

      <div className="mt-4 flex justify-center gap-1">
        {CONTRIBUTION_LEVELS.map((level) => (
          <Skeleton key={level} className="size-3 rounded-sm" />
        ))}
      </div>
    </>
  )
}

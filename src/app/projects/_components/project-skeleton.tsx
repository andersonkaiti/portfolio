import { Skeleton } from '@components/ui/skeleton'

const TOPIC_SKELETONS = Array.from(
  { length: 4 },
  (_, i) => `topic-skeleton-${i}`,
)

export function ProjectSkeleton() {
  return (
    <div className="flex size-full flex-col gap-6 border border-border p-6">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-5 w-3/4 rounded-md bg-skeleton" />
          <Skeleton className="h-4 w-16 rounded-md bg-skeleton" />
        </div>

        <div className="space-y-2 pt-1">
          <Skeleton className="h-4 w-full rounded-md bg-skeleton" />
          <Skeleton className="h-4 w-full rounded-md bg-skeleton" />
          <Skeleton className="h-4 w-2/3 rounded-md bg-skeleton" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {TOPIC_SKELETONS.map((skeletonId) => (
          <Skeleton
            key={skeletonId}
            className="size-[22px] rounded-full bg-skeleton"
          />
        ))}
      </div>

      <div className="mt-auto flex gap-3 border-t border-border pt-4">
        <Skeleton className="h-8 w-20 rounded-md bg-skeleton" />
        <Skeleton className="h-8 w-20 rounded-md bg-skeleton" />
      </div>
    </div>
  )
}

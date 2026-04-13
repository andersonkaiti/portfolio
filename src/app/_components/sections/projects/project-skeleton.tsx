import { Skeleton } from '@components/ui/skeleton'

const TOPIC_SKELETONS = Array.from(
  { length: 4 },
  (_, i) => `topic-skeleton-${i}`,
)

export function ProjectSkeleton() {
  return (
    <div className="rounded-xl bg-border/40 p-px">
      <div className="flex size-full flex-col gap-6 rounded-xl bg-background p-6">
        <div className="space-y-2 py-2">
          {/* Title */}
          <Skeleton className="h-6 w-3/4 rounded-md bg-skeleton" />

          {/* Date */}
          <Skeleton className="h-4 w-1/4 rounded-md bg-skeleton" />

          {/* Description */}
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full rounded-md bg-skeleton" />
            <Skeleton className="h-4 w-full rounded-md bg-skeleton" />
            <Skeleton className="h-4 w-2/3 rounded-md bg-skeleton" />
          </div>
        </div>

        {/* Topics */}
        <div className="flex flex-wrap items-center gap-3">
          {TOPIC_SKELETONS.map((skeletonId) => (
            <Skeleton
              key={skeletonId}
              className="size-6 rounded-full bg-skeleton"
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-auto flex gap-3 border-t border-dashed pt-2">
          <Skeleton className="h-9 w-20 rounded-md bg-skeleton" />
          <Skeleton className="h-9 w-20 rounded-md bg-skeleton" />
        </div>
      </div>
    </div>
  )
}

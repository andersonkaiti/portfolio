import { Skeleton } from '@components/ui/skeleton'

const TOPIC_SKELETONS = Array.from(
  { length: 4 },
  (_, i) => `topic-skeleton-${i}`,
)

export function ProjectSkeleton() {
  return (
    <div className="flex size-full flex-col gap-6 border border-border overflow-hidden">
      {/* Preview placeholder */}
      <Skeleton className="aspect-video w-full rounded-none bg-skeleton" />

      <div className="space-y-2 px-6">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-5 w-3/4 rounded-md bg-skeleton" />
          <Skeleton className="h-4 w-1/5 rounded-md bg-skeleton" />
        </div>

        <div className="space-y-2 pt-1">
          <Skeleton className="h-4 w-full rounded-md bg-skeleton" />
          <Skeleton className="h-4 w-full rounded-md bg-skeleton" />
          <Skeleton className="h-4 w-2/3 rounded-md bg-skeleton" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 px-6">
        {TOPIC_SKELETONS.map((skeletonId) => (
          <Skeleton
            key={skeletonId}
            className="size-6 rounded-full bg-skeleton"
          />
        ))}
      </div>

      <div className="mt-auto flex gap-3 border-t border-border px-6 pb-6 pt-4">
        <Skeleton className="h-9 w-20 rounded-md bg-skeleton" />
      </div>
    </div>
  )
}

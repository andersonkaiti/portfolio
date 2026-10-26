import { Skeleton } from '@components/ui/skeleton'

const TOPIC_SKELETONS = Array.from(
  { length: 4 },
  (_, i) => `topic-skeleton-${i}`,
)

export function ProjectSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className="aspect-[16/10] w-full rounded-2xl bg-skeleton" />

      <div className="flex flex-col gap-3">
        <Skeleton className="h-7 w-3/4 rounded-md bg-skeleton" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-md bg-skeleton" />
          <Skeleton className="h-4 w-2/3 rounded-md bg-skeleton" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {TOPIC_SKELETONS.map((skeletonId) => (
            <Skeleton
              key={skeletonId}
              className="size-[22px] rounded-full bg-skeleton"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

import { Skeleton } from '@components/ui/skeleton'
import { ProjectSkeleton } from './_components/project-skeleton'

const SKELETONS = Array.from({ length: 6 }, (_, i) => `project-skeleton-${i}`)

export default function LoadingSkeleton() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-16 px-2 py-10 md:gap-40 md:px-20 md:py-30">
      <div className="flex w-full flex-col items-center gap-8">
        <Skeleton className="h-9 w-[130px] self-start rounded-md bg-skeleton" />

        <div className="flex w-full items-center gap-2">
          <Skeleton className="h-9 w-full rounded-md bg-skeleton" />
          <Skeleton className="h-9 w-[130px] shrink-0 rounded-md bg-skeleton" />
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {SKELETONS.map((skeletonId) => (
            <ProjectSkeleton key={skeletonId} />
          ))}
        </div>
      </div>
    </main>
  )
}

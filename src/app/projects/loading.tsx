import { Skeleton } from '@components/ui/skeleton'
import { ProjectLoadingSkeleton } from './_components/loading-skeleton'

export default function LoadingSkeleton() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 pt-[72px] pb-28">
      <div className="flex w-full flex-col gap-8">
        <Skeleton className="h-6 w-16 rounded-md bg-skeleton" />
        <Skeleton className="h-16 w-72 rounded-md bg-skeleton" />

        <div className="flex w-full items-center gap-2">
          <Skeleton className="h-9 w-full rounded-md bg-skeleton" />
          <Skeleton className="h-9 w-[130px] shrink-0 rounded-md bg-skeleton" />
        </div>

        <div className="mt-10">
          <ProjectLoadingSkeleton />
        </div>
      </div>
    </main>
  )
}

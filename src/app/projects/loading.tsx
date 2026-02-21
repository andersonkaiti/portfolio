/** biome-ignore-all lint/suspicious/noArrayIndexKey: none */

import { Skeleton } from '@components/ui/skeleton'

export default function LoadingSkeleton() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-16 px-2 py-10 md:gap-40 md:px-20 md:py-30">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 2 }).map((_, index: number) => (
          <div
            className="flex size-full flex-col gap-6 rounded-xl bg-background p-6"
            key={index}
          >
            <div className="space-y-2 py-2">
              <Skeleton className="h-6 w-3/4 rounded-md bg-skeleton" />
              <Skeleton className="h-4 w-full rounded-md bg-skeleton" />
              <Skeleton className="h-4 w-2/3 rounded-md bg-skeleton" />
            </div>

            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-5 w-16 rounded-full bg-skeleton" />
              <Skeleton className="h-5 w-20 rounded-full bg-skeleton" />
              <Skeleton className="h-5 w-24 rounded-full bg-skeleton" />
              <Skeleton className="h-5 w-16 rounded-full bg-skeleton" />
            </div>

            <div className="mt-auto flex gap-3 border-t border-dashed pt-2">
              <Skeleton className="h-9 w-[94.55px] rounded-md bg-skeleton" />
              <Skeleton className="h-9 w-21.5 rounded-md bg-skeleton" />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

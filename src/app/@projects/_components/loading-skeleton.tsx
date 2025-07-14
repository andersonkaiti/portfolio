/** biome-ignore-all lint/suspicious/noArrayIndexKey: none */

import { Skeleton } from '@components/ui/skeleton'

export function LoadingSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 13 }).map((_, index: number) => (
        <div
          className="flex h-73.5 flex-col gap-6 rounded-xl border-b-1 border-b-zinc-500 py-6"
          key={index}
        >
          <div className="flex flex-col gap-6 px-6">
            <Skeleton className="h-4 w-full rounded-full bg-zinc-800" />

            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Skeleton className="h-4 w-1/4 rounded-full bg-zinc-800" />
                <Skeleton className="h-4 w-1/4 rounded-full bg-zinc-800" />
                <Skeleton className="h-4 w-3/4 rounded-full bg-zinc-800" />
                <Skeleton className="h-4 w-1/4 rounded-full bg-zinc-800" />
              </div>

              <div className="flex gap-2">
                <Skeleton className="h-4 w-3/4 rounded-full bg-zinc-800" />
                <Skeleton className="h-4 w-2/4 rounded-full bg-zinc-800" />
                <Skeleton className="h-4 w-1/4 rounded-full bg-zinc-800" />
                <Skeleton className="h-4 w-1/4 rounded-full bg-zinc-800" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 px-6">
            <Skeleton className="h-4 w-full rounded-full bg-zinc-800" />
            <Skeleton className="h-4 w-full rounded-full bg-zinc-800" />
            <Skeleton className="h-4 w-1/3 rounded-full bg-zinc-800" />
          </div>

          <div className="flex justify-between gap-2 px-6">
            <Skeleton className="h-9 w-[94.55px] rounded-md bg-zinc-800" />
            <Skeleton className="h-9 w-21.5 rounded-md bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  )
}

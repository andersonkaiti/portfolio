/** biome-ignore-all lint/suspicious/noArrayIndexKey: none */

import { Skeleton } from '@components/ui/skeleton'

export function LoadingSkeleton() {
  return (
    <section className="w-full space-y-8 px-6 md:space-y-16">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 17 }).map((_, index: number) => (
          <div
            className="flex h-33.5 flex-col gap-6 rounded-xl border-b-1 border-b-zinc-500 py-6"
            key={index}
          >
            <div className="flex gap-4 px-6">
              <Skeleton className="size-10 rounded-md bg-zinc-800" />
              <div className="flex w-full flex-col justify-center gap-2.5">
                <Skeleton className="h-4 w-full rounded-full bg-zinc-800" />
                <Skeleton className="h-3 w-1/5 rounded-full bg-zinc-800" />
              </div>
            </div>

            <div className="flex justify-between gap-2 px-6">
              <Skeleton className="h-5 w-12.5 rounded-md bg-zinc-800" />
              <Skeleton className="h-5 w-15.5 rounded-md bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto flex h-35.5 w-71 items-center gap-6 rounded-xl border p-6">
        <Skeleton className="size-12.5" />
        <div className="flex w-full flex-col gap-3">
          <Skeleton className="h-6 w-full rounded-full" />
          <Skeleton className="h-8 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
        </div>
      </div>
    </section>
  )
}

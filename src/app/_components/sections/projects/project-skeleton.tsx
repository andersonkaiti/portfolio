import { Skeleton } from '@components/ui/skeleton'

export function ProjectSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-center gap-x-12 gap-y-8">
      <Skeleton className="aspect-[16/10] w-full rounded-2xl" />

      <div className="flex flex-col gap-4">
        <Skeleton className="h-7 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}

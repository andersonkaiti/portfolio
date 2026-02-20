import { Skeleton } from '@components/ui/skeleton'

export function LoadingSkeleton() {
  return (
    <>
      <div className="ml-auto">
        <Skeleton className="h-6 w-32" />
      </div>

      <Skeleton className="h-40 w-full rounded-lg" />
    </>
  )
}

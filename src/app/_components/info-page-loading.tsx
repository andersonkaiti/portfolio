import { Skeleton } from '@components/ui/skeleton'

const SECTIONS = ['first', 'second', 'third']

export function InfoPageLoading() {
  return (
    <main
      aria-busy="true"
      className="mx-auto w-full max-w-7xl px-6 pt-[72px] pb-28"
    >
      <div className="flex max-w-3xl flex-col gap-8">
        <Skeleton className="h-5 w-20 bg-skeleton" />
        <Skeleton className="h-16 w-3/4 bg-skeleton" />

        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-full bg-skeleton" />
          <Skeleton className="h-5 w-11/12 bg-skeleton" />
          <Skeleton className="h-5 w-2/3 bg-skeleton" />
        </div>

        <div className="mt-6 flex flex-col gap-10 border-t border-dash/35 pt-10">
          {SECTIONS.map((section) => (
            <div key={section} className="flex flex-col gap-3">
              <Skeleton className="h-7 w-48 bg-skeleton" />
              <Skeleton className="h-4 w-full bg-skeleton" />
              <Skeleton className="h-4 w-10/12 bg-skeleton" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

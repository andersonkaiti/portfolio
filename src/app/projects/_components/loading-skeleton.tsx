import { ProjectSkeleton } from './project-skeleton'

const SKELETONS = Array.from({ length: 6 }, (_, i) => `project-skeleton-${i}`)

export function ProjectLoadingSkeleton() {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] gap-x-12 gap-y-[72px]">
      {SKELETONS.map((skeletonId) => (
        <ProjectSkeleton key={skeletonId} />
      ))}
    </div>
  )
}

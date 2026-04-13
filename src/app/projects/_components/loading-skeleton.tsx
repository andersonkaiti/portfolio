import { ProjectSkeleton } from './project-skeleton'

const SKELETONS = Array.from({ length: 6 }, (_, i) => `project-skeleton-${i}`)

export function ProjectLoadingSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SKELETONS.map((skeletonId) => (
        <ProjectSkeleton key={skeletonId} />
      ))}
    </div>
  )
}

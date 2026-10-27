export function ProjectPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="relative size-full overflow-hidden rounded-[inherit] border border-line bg-panel text-muted-foreground"
      style={{
        backgroundImage:
          'radial-gradient(color-mix(in srgb, currentColor 28%, transparent) 1px, transparent 1.2px)',
        backgroundSize: '20px 20px',
      }}
    >
      <div className="absolute inset-x-0 top-0 flex h-9 items-center gap-[7px] border-b border-line bg-panel px-4">
        <i className="size-[9px] rounded-full border border-current opacity-60" />
        <i className="size-[9px] rounded-full border border-current opacity-60" />
        <i className="size-[9px] rounded-full border border-current opacity-60" />
        <i className="ml-3 h-2 w-1/3 rounded bg-current opacity-20" />
      </div>

      <svg
        viewBox="0 0 120 124"
        className="absolute top-[calc(50%+18px)] left-1/2 w-[clamp(84px,24%,132px)] -translate-x-1/2 -translate-y-1/2 overflow-visible"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      >
        <title>Placeholder</title>
        <path d="M20 40l40 22v44L20 84z" fill="var(--panel)" />
        <path d="M100 40L60 62v44l40-22z" fill="var(--panel)" />
        <path d="M60 18l40 22-40 22-40-22z" fill="var(--signal)" />
      </svg>
    </div>
  )
}

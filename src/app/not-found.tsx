import { Button } from '@components/ui/button'
import { jetBrainsMono } from '@lib/fonts'
import { cn } from 'cn'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center gap-6 px-8 py-20 text-center md:px-20">
      <span
        className={cn(
          'text-sm font-medium tracking-[0.2em] uppercase text-primary',
          jetBrainsMono.className,
        )}
      >
        404
      </span>

      <div className="flex flex-col gap-3">
        <h1 className="text-balance font-bold tracking-tight text-4xl sm:text-5xl">
          Page not found
        </h1>
        <p className="max-w-sm text-balance text-base text-muted-foreground">
          This page doesn't exist or was moved.
        </p>
      </div>

      <Button asChild variant="ghost">
        <Link href="/">
          <ChevronLeft className="size-4" /> Back to home
        </Link>
      </Button>
    </main>
  )
}

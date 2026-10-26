'use client'

import { Skeleton } from '@components/ui/skeleton'
import { cn } from 'cn'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ProjectPreviewProps {
  src: string
  alt: string
  href: string
  bleed?: boolean
}

export function ProjectPreview({
  src,
  alt,
  href,
  bleed = true,
}: ProjectPreviewProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <Link
      href={href}
      target="_blank"
      className={cn('block', bleed ? '-mx-6 -mt-6' : 'size-full')}
      tabIndex={-1}
      aria-hidden
    >
      <div
        className={cn(
          'relative w-full overflow-hidden',
          bleed ? 'aspect-video' : 'h-full',
        )}
      >
        {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}

        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className={cn(
            'object-cover object-center',
            bleed &&
              'scale-[1.04] transition-transform duration-700 ease-in-out group-hover/card:scale-[1.08]',
            loaded
              ? 'opacity-100'
              : 'opacity-0 transition-opacity duration-400',
          )}
          onLoad={() => setLoaded(true)}
        />

        {bleed && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-background/70 to-transparent" />
        )}
      </div>
    </Link>
  )
}

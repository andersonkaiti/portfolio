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
}

export function ProjectPreview({ src, alt, href }: ProjectPreviewProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <Link
      href={href}
      target="_blank"
      className="-mx-6 -mt-6 block overflow-hidden"
      tabIndex={-1}
      aria-hidden
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}

        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className={cn(
            'object-cover transition-[transform,opacity] duration-500 group-hover/card:scale-105',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
          onLoad={() => setLoaded(true)}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-background/70 to-transparent" />
      </div>
    </Link>
  )
}

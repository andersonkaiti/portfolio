'use client'

import { LinkPreview } from '@components/ui/link-preview'
import { Github } from 'lucide-react'
import Image from 'next/image'

export function GithubGraph() {
  return (
    <div className="rounded-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Github className="size-5 text-primary" />

          <h3 className="text-sm font-mono text-primary">
            GitHub Contributions
          </h3>
        </div>

        <LinkPreview
          url="https://github.com/andersonkaiti"
          className="font-semibold text-primary"
        >
          <span className="text-sm font-mono text-primary">@andersonkaiti</span>
        </LinkPreview>
      </div>

      <div className="h-48 overflow-x-auto">
        <div className="relative h-full w-250 mx-auto">
          <Image
            src="https://ghchart.rshah.org/40c9a2/andersonkaiti"
            alt="Anderson Kaiti GitHub Graph"
            className="rounded-lg object-contain absolute"
            unoptimized
            fill
          />
        </div>
      </div>
    </div>
  )
}

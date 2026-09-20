'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible'
import { jetBrainsMono } from '@lib/fonts'
import { cn } from '@lib/utils'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export interface SolutionItem {
  num: string
  title: string
  desc: string
  bullets: string[]
  tags: string[]
}

export function SolutionList({ items }: { items: SolutionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="border-t border-border">
      {items.map((item, index) => (
        /*
         * O data-aos fica neste wrapper externo, cujo className não muda
         * entre re-renders (só openIndex muda). React não toca no classList
         * → aos-animate persiste mesmo após o acordeão abrir/fechar.
         */
        <div
          key={item.num}
          data-aos="fade-up"
          data-aos-delay={index * 80}
          style={{ transitionDelay: `${index * 80}ms` }}
          suppressHydrationWarning
        >
          <Collapsible
            open={openIndex === index}
            onOpenChange={(open) => setOpenIndex(open ? index : null)}
          >
            {/* className dinâmico fica aqui, separado do data-aos */}
            <div
              className={cn(
                'group border-b border-border transition-[background-color,border-color] duration-[400ms] ease-[cubic-bezier(.25,0,.35,1)]',
                openIndex === index
                  ? 'border-primary/30 bg-accent/20'
                  : 'hover:bg-accent/30',
              )}
            >
              <CollapsibleTrigger asChild>
                <button
                  className="group/btn flex w-full cursor-pointer items-center px-2 py-[22px] text-left focus-visible:outline-none sm:px-1"
                  type="button"
                >
                  <div className="flex flex-1 items-center gap-4 transition-[translate] duration-[250ms] group-hover/btn:translate-x-3 sm:gap-5">
                    <span
                      className={cn(
                        'w-7 shrink-0 text-sm text-primary',
                        jetBrainsMono.className,
                      )}
                    >
                      {item.num}
                    </span>
                    <span className="flex-1 text-lg font-semibold tracking-tight sm:text-xl">
                      {item.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'ml-4 size-[18px] shrink-0 text-primary transition-transform duration-300',
                      openIndex === index && 'rotate-180',
                    )}
                  />
                </button>
              </CollapsibleTrigger>

              <CollapsibleContent className="overflow-hidden duration-[350ms] data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                <div className="ak-solution-content pb-7 pl-8 pr-2 sm:pl-12 sm:pr-1">
                  <p className="mb-4 max-w-[46rem] text-base leading-[1.75] text-muted-foreground">
                    {item.desc}
                  </p>
                  <ul className="mb-5 flex flex-col gap-2 pl-5">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="list-disc text-base text-foreground"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          'inline-flex items-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-500',
                          jetBrainsMono.className,
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      ))}
    </div>
  )
}

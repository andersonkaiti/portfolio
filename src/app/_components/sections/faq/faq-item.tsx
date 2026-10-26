'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible'

interface FaqItemProps {
  question: string
  answer: string
}

export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <Collapsible className="group/faq border-b border-dash/35 py-[22px]">
      <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-lg font-semibold">
        {question}
        <span
          aria-hidden="true"
          className="text-xl text-primary transition-transform duration-250 group-data-[state=open]/faq:rotate-45"
        >
          +
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <p className="pt-3 text-body">{answer}</p>
      </CollapsibleContent>
    </Collapsible>
  )
}

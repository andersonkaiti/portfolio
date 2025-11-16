'use client'

import {
  CollapsibleContent as RadixCollapsibleContent,
  CollapsibleTrigger as RadixCollapsibleTrigger,
  Root,
} from '@radix-ui/react-collapsible'

function Collapsible({ ...props }: React.ComponentProps<typeof Root>) {
  return <Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof RadixCollapsibleTrigger>) {
  return <RadixCollapsibleTrigger data-slot="collapsible-trigger" {...props} />
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof RadixCollapsibleContent>) {
  return <RadixCollapsibleContent data-slot="collapsible-content" {...props} />
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }

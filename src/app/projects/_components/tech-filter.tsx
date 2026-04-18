'use client'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { cn } from '@lib/utils'
import { getTopicDisplayName } from '@utils/get-topic-display-name'
import { Check, ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { TopicLogoImage } from './topic-logo-image'
import { getTopicLogo } from './topic-to-logo'

interface TechFilterProps {
  availableTechs: string[]
  selected: string[]
  onToggle: (topic: string) => void
}

export function TechFilter({
  availableTechs,
  selected,
  onToggle,
}: TechFilterProps) {
  const t = useTranslations('projects')

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'inline-flex h-9 shrink-0 items-center gap-2 rounded-md border bg-background px-3 text-sm transition-colors hover:bg-accent',
            selected.length > 0 && 'border-primary',
          )}
        >
          <span>{t('filter')}</span>
          {selected.length > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {selected.length}
            </span>
          )}
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-60 p-0">
        <Command>
          <CommandInput placeholder={t('filterSearch')} />
          <CommandList>
            <CommandEmpty>{t('noTechFound')}</CommandEmpty>
            <CommandGroup>
              {availableTechs.map((topic) => {
                const logo = getTopicLogo(topic)
                if (!logo) return null
                const isSelected = selected.includes(topic)

                return (
                  <CommandItem
                    key={topic}
                    value={getTopicDisplayName(topic)}
                    onSelect={() => onToggle(topic)}
                  >
                    <TopicLogoImage logo={logo} topic={topic} size={16} />
                    {getTopicDisplayName(topic)}
                    {isSelected && (
                      <Check className="ml-auto size-4 text-primary" />
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

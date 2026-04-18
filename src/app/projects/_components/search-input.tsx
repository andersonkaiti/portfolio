'use client'

import { Input } from '@components/ui/input'
import { Search, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface SearchInputProps {
  value: string
  onChange: (value: string | null) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const t = useTranslations('projects')

  return (
    <div className="relative w-full">
      <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        type="text"
        placeholder={t('search')}
        value={value}
        onChange={(event) => onChange(event.target.value || null)}
        className="pl-9 pr-8"
      />

      {value && (
        <button
          onClick={() => onChange(null)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label={t('clearSearch')}
          type="button"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}

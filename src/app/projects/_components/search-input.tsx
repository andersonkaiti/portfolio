'use client'

import { Input } from '@components/ui/input'
import { Search, X } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string | null) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        type="text"
        placeholder="Search projects..."
        value={value}
        onChange={(event) => onChange(event.target.value || null)}
        className="pl-9 pr-8"
      />

      {value && (
        <button
          onClick={() => onChange(null)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
          type="button"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}

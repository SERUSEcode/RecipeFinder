'use client'

import { useEffect, useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  debounceMs?: number
}

export function SearchBar({
  onSearch,
  debounceMs = 400,
}: SearchBarProps) {
  const [value, setValue] = useState('')

  useEffect(() => {
    // Empty input is a valid state → restore start meals
    if (!value.trim()) {
      onSearch('')
      return
    }

    // Debounce search to avoid API calls on every keystroke
    const timeout = setTimeout(() => {
      onSearch(value.trim())
    }, debounceMs)

    return () => clearTimeout(timeout)
  }, [value, debounceMs, onSearch])

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search recipes…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
    </div>
  )
}

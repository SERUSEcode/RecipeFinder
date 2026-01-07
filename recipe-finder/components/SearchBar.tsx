'use client'

import { useEffect, useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState('')

  useEffect(() => {
    const trimmed = value.trim()

    // Empty = reset to start/category mode
    if (!trimmed) {
      onSearch('')
      return
    }

    const timeout = setTimeout(() => {
      onSearch(trimmed)
    }, 400)

    return () => clearTimeout(timeout)
  }, [value, onSearch])

  return (
    <div className="max-w-3xl mx-auto mb-6">
      <div className="relative">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search recipes by name..."
          className="w-full rounded-xl border px-12 py-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>
    </div>
  )
}

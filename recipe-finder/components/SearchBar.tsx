// Handels the search bar component for searching recipes

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="max-w-3xl mx-auto mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search recipes…"
        className="w-full rounded-xl border px-12 py-4 shadow-sm"
      />
    </div>
  )
}

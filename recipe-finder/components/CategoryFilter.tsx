interface CategoryFilterProps {
  categories: { strCategory: string }[]
  selectedCategory: string | null
  onSelect: (category: string | null) => void
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-3 py-1 rounded border ${
          !selectedCategory ? 'bg-black text-white' : ''
        }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat.strCategory}
          onClick={() => onSelect(cat.strCategory)}
          className={`px-3 py-1 rounded border ${
            selectedCategory === cat.strCategory
              ? 'bg-black text-white'
              : ''
          }`}
        >
          {cat.strCategory}
        </button>
      ))}
    </div>
  )
}

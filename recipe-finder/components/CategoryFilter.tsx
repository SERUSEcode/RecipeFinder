// Handels the category filter buttons and category filtering logic

import { Category } from '@/lib/types'

interface Props {
  categories: Category[]
  selectedCategory: string | null
  onSelect: (category: string | null) => void
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      <CategoryButton
        active={!selectedCategory}
        onClick={() => onSelect(null)}
      >
        All
      </CategoryButton>

      {categories.map((cat) => (
        <CategoryButton
          key={cat.strCategory}
          active={selectedCategory === cat.strCategory}
          onClick={() => onSelect(cat.strCategory)}
        >
          {cat.strCategory}
        </CategoryButton>
      ))}
    </div>
  )
}

function CategoryButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full border transition ${
        active
          ? 'bg-orange-500 text-white border-orange-500'
          : 'bg-white hover:bg-orange-50'
      }`}
    >
      {children}
    </button>
  )
}

'use client'

import { useMeals } from '@/hooks/useMeals'
import { SearchBar } from '@/components/SearchBar'
import { CategoryFilter } from '@/components/CategoryFilter'

export default function Home() {
  const {
    meals,
    categories,
    loading,
    error,
    query,
    selectedCategory,
    onSearchChange,
    onCategorySelect,
  } = useMeals()

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Recipe Finder</h1>

      <SearchBar value={query} onChange={onSearchChange} />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={onCategorySelect}
      />

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="border rounded p-2 text-sm"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full rounded mb-2"
              />
              <p className="font-medium">{meal.strMeal}</p>
              <p className="text-gray-500">
                {meal.strCategory}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

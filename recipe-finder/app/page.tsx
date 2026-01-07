'use client'

import { useMeals } from '@/hooks/useMeals'

export default function Home() {
  const {
    meals,
    categories,
    loading,
    error,
    search,
    selectedCategory,
    setSelectedCategory,
  } = useMeals()

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Recipe Finder</h1>

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Temporary render (will extract next) */}
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

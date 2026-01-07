'use client'

import { useState } from 'react'
import { useMeals } from '@/hooks/useMeals'

import { Header } from '@/components/Header'
import { SearchBar } from '@/components/SearchBar'
import { CategoryFilter } from '@/components/CategoryFilter'
import { RecipeGrid } from '@/components/RecipeGrid'
import { RecipeDetailOverlay } from '@/components/RecipeDetailOverlay'

export default function Home() {
  const {
    meals,
    categories,
    query,
    selectedCategory,
    loading,
    error,
    onSearchChange,
    onCategorySelect,
  } = useMeals()

  const [selectedMealId, setSelectedMealId] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-orange-50">
      <Header />

      <SearchBar
        value={query}
        onChange={onSearchChange}
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={onCategorySelect}
      />


      <section className="max-w-7xl mx-auto px-6 pb-12">
        {!loading && !error && (
          <p className="mb-6 text-gray-600">
            {meals.length} recipes found
          </p>
        )}

        {loading && <p>Loading…</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <RecipeGrid
            meals={meals}
            onView={setSelectedMealId}
            category={selectedCategory}
          />
        )}
      </section>

      <RecipeDetailOverlay
        mealId={selectedMealId}
        onClose={() => setSelectedMealId(null)}
      />
    </main>
  )
}

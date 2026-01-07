'use client'
// Built with AI assistance - ChatGPT

import { useMeals } from '@/hooks/useMeals'
import { Header } from '@/components/Header'
import { SearchBar } from '@/components/SearchBar'
import { CategoryFilter } from '@/components/CategoryFilter'
import { RecipeCard } from '@/components/RecipeCard'

export default function Home() {
  const {
    meals,
    categories,
    loading,
    error,
    onSearchChange,
    selectedCategory,
    onCategorySelect,
    
  } = useMeals()

  return (
    <main className="min-h-screen bg-orange-50">
      <Header />

      <SearchBar onSearch={onSearchChange} />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={onCategorySelect}
      />

      <section className="max-w-7xl mx-auto px-6">
        <p className="mb-6 text-gray-600">
          {meals.length} recipes found
        </p>

        {loading && <p>Loading…</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {meals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      </section>
    </main>
  )
}

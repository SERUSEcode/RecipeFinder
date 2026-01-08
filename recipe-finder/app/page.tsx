'use client'

// React
import { useState } from 'react'

// Hooks
import { useMeals } from '@/hooks/useMeals'
import { useFavorites } from '@/hooks/useFavorites'

// Components
import { Header } from '@/components/Header'
import { SearchBar } from '@/components/SearchBar'
import { CategoryFilter } from '@/components/CategoryFilter'
import { RecipeGrid } from '@/components/RecipeGrid'
import { RecipeDetailOverlay } from '@/components/RecipeDetailOverlay'

export default function Home() {
  // Domain state (meals, categories, search, filter)
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

  // Favorites state
  const {
    favorites,
    isFavorite,
    toggleFavorite,
  } = useFavorites()

  // UI state
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null)
  const [showFavorites, setShowFavorites] = useState(false)

  // Determine which meals to show
  const visibleMeals = showFavorites
    ? favorites
    : meals

  return (
    <main className="min-h-screen bg-orange-50 text-black">
      <Header />

      {/* Search + Category */}
      <section className="py-8">
        <SearchBar
          value={query}
          onChange={onSearchChange}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={onCategorySelect}
        />
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        {/* Favorites toggle */}
        <button
          onClick={() => setShowFavorites((v) => !v)}
          className="mb-6 px-4 py-2 rounded-full border bg-white shadow"
        >
          {showFavorites ? 'Show all recipes' : 'Show favorites'}
        </button>

        {!loading && !error && (
          <p className="mb-6 text-gray-600">
            {visibleMeals.length} recipes found
          </p>
        )}

        {loading && <p>Loading…</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <RecipeGrid
            meals={visibleMeals}
            onView={setSelectedMealId}
            category={selectedCategory}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </section>

      {/* Overlay */}
      <RecipeDetailOverlay
        mealId={selectedMealId}
        onClose={() => setSelectedMealId(null)}
      />
    </main>
  )
}

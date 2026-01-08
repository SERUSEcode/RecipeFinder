// Handels the overlay that shows detailed recipe information

import { useEffect, useState } from 'react'
import { Meal } from '@/lib/types'
import { fetchMealById } from '@/lib/api'
import { Overlay } from './Overlay'

interface Props {
  mealId: string | null
  onClose: () => void
}

export function RecipeDetailOverlay({ mealId, onClose }: Props) {
  const [meal, setMeal] = useState<Meal | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!mealId) return
    const id = mealId

    async function load() {
      setLoading(true)
      const data = await fetchMealById(id)
      setMeal(data)
      setLoading(false)
    }

    load()
  }, [mealId])

  return (
    <Overlay open={!!mealId && (!!meal || loading)} onClose={onClose}>
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="
            absolute top-4 right-4 z-20
            h-9 w-9
            flex items-center justify-center
            rounded-full
            bg-white/90
            shadow
            hover:bg-white
            transition
        "
        >
        <span className="text-lg leading-none">×</span>
        </button>

      {loading && (
        <div className="animate-pulse">
            <div className="h-64 w-full bg-gray-200 rounded-t-xl" />
            <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
        </div>
      )}

      {meal && (
        <div className="relative">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-64 object-cover rounded-t-xl"
          />

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">
              {meal.strMeal}
            </h2>

            <p className="text-gray-500 mb-4">
              {meal.strCategory}
            </p>

            <h3 className="font-semibold mb-2">
              Instructions
            </h3>

            <p className="whitespace-pre-line text-gray-700">
              {meal.strInstructions}
            </p>
          </div>
        </div>
      )}
    </Overlay>
  )
}

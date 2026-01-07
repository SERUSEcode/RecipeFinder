import { useEffect, useState } from 'react'
import { Meal } from '@/lib/types'
import { fetchMealById } from '@/lib/api'

const STORAGE_KEY = 'favoriteMeals'

export function useFavorites() {
  const [favorites, setFavorites] = useState<Meal[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setFavorites(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  async function toggleFavorite(meal: Meal) {
    const exists = favorites.some((m) => m.idMeal === meal.idMeal)

    if (exists) {
        setFavorites((prev) =>
        prev.filter((m) => m.idMeal !== meal.idMeal)
        )
        return
    }

    let fullMeal: Meal

    if (meal.strInstructions) {
        fullMeal = meal
    } else {
        const fetched = await fetchMealById(meal.idMeal)
        if (!fetched) return
        fullMeal = fetched
    }

    setFavorites((prev) => [...prev, fullMeal])
  }


  function isFavorite(id: string) {
    return favorites.some((m) => m.idMeal === id)
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  }
}

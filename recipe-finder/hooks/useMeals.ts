import { useEffect, useState } from 'react'
import { Meal, Category } from '@/lib/types'
import {
  searchMeals,
  fetchCategories,
  fetchMealsByIds,
} from '@/lib/api'

const DEFAULT_MEAL_IDS = [
  '52771',
  '52802',
  '52844',
  '52977',
  '52819',
  '52874',
  '52893',
  '52959',
]

export function useMeals() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [startMeals, setStartMeals] = useState<Meal[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load start meals and categories once
  useEffect(() => {
    async function init() {
      try {
        const [initialMeals, categoryList] = await Promise.all([
          fetchMealsByIds(DEFAULT_MEAL_IDS),
          fetchCategories(),
        ])

        // Start meals are the baseline state
        setMeals(initialMeals)
        setStartMeals(initialMeals)
        setCategories(categoryList)
      } catch {
        setError('Failed to load meals')
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [])

  // Search overrides meals; empty query restores baseline
  async function search(query: string) {
    if (!query) {
      setMeals(startMeals)
      return
    }

    try {
      setError(null)
      const results = await searchMeals(query)
      setMeals(results)
    } catch {
      setError('Failed to search meals')
    }
  }

  return {
    meals,
    categories,
    loading,
    error,
    search,
  }
}

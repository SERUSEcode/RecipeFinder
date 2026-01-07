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
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Initial load
  useEffect(() => {
    async function init() {
      try {
        setLoading(true)
        const [initialMeals, categoryList] = await Promise.all([
          fetchMealsByIds(DEFAULT_MEAL_IDS),
          fetchCategories(),
        ])
        setMeals(initialMeals)
        setCategories(categoryList)
      } catch {
        setError('Failed to load meals')
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [])

  async function search(query: string) {
    try {
      setLoading(true)
      setError(null)

      const results = await searchMeals(query)

      const filtered = selectedCategory
        ? results.filter(
            (meal) => meal.strCategory === selectedCategory
          )
        : results

      setMeals(filtered)
    } catch {
      setError('Failed to search meals')
    } finally {
      setLoading(false)
    }
  }

  return {
    meals,
    categories,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    search,
  }
}

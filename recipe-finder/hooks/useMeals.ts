import { useEffect, useState } from 'react'
import { Meal, Category } from '@/lib/types'
import {
  fetchMealsByIds,
  fetchCategories,
  searchMeals,
  fetchMealsByCategory,
} from '@/lib/api'

type Mode = 'start' | 'search' | 'category'

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

  const [mode, setMode] = useState<Mode>('start')
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Initial load
  useEffect(() => {
    async function init() {
      try {
        const [initialMeals, categoryList] = await Promise.all([
          fetchMealsByIds(DEFAULT_MEAL_IDS),
          fetchCategories(),
        ])

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

  // Single source of fetching truth
  useEffect(() => {
    if (loading) return

    async function fetchByMode() {
      try {
        setError(null)

        if (mode === 'start') {
          setMeals(startMeals)
        }

        if (mode === 'search') {
          const results = await searchMeals(query)
          setMeals(results)
        }

        if (mode === 'category' && selectedCategory) {
          const results = await fetchMealsByCategory(selectedCategory)
          setMeals(results)
        }
      } catch {
        setError('Failed to load meals')
      }
    }

    fetchByMode()
  }, [mode, query, selectedCategory, startMeals, loading])

  // UI actions (no async here)

  function onSearchChange(value: string) {
    if (!value) {
      setQuery('')
      setMode('start')
      return
    }

    setQuery(value)
    setSelectedCategory(null)
    setMode('search')
  }

  function onCategorySelect(category: string | null) {
    setQuery('')

    if (!category) {
      setSelectedCategory(null)
      setMode('start')
      return
    }

    setSelectedCategory(category)
    setMode('category')
  }

  return {
    meals,
    categories,
    loading,
    error,
    query,
    selectedCategory,
    onSearchChange,
    onCategorySelect,
  }
}

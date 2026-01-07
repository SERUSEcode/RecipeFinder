// lib/api.ts

import { Meal, MealResponse, Category, CategoryResponse } from './types'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function searchMeals(query: string): Promise<Meal[]> {
  if (!query) return []

  const data = await fetchFromApi<MealResponse>(`/search.php?s=${query}`)
  return data.meals ?? []
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await fetchFromApi<CategoryResponse>('/categories.php')
  return data.categories
}

export async function fetchMealById(id: string): Promise<Meal | null> {
  const data = await fetchFromApi<MealResponse>(`/lookup.php?i=${id}`)
  return data.meals ? data.meals[0] : null
}

export async function fetchRandomMeal(): Promise<Meal> {
  const data = await fetchFromApi<MealResponse>('/random.php')
  if (!data.meals || data.meals.length === 0) {
    throw new Error('No random meal returned')
  }
  return data.meals[0]
}

export async function fetchMealsByIds(ids: string[]): Promise<Meal[]> {
  const results = await Promise.all(
    ids.map((id) => fetchMealById(id))
  )

  return results.filter((meal): meal is Meal => meal !== null)
}

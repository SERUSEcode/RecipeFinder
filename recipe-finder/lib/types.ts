// Types for TheMealDB API responses

export interface Meal {
  idMeal: string
  strMeal: string
  strCategory: string
  strMealThumb: string
  strInstructions: string

  // Ingredients (TheMealDB uses numbered fields)
  strIngredient1?: string
  strIngredient2?: string
  strIngredient3?: string
  strIngredient4?: string
  strIngredient5?: string
  strIngredient6?: string
  strIngredient7?: string
  strIngredient8?: string
  strIngredient9?: string
  strIngredient10?: string

  strMeasure1?: string
  strMeasure2?: string
  strMeasure3?: string
  strMeasure4?: string
  strMeasure5?: string
  strMeasure6?: string
  strMeasure7?: string
  strMeasure8?: string
  strMeasure9?: string
  strMeasure10?: string
}

export interface MealResponse {
  meals: Meal[] | null
}

export interface Category {
  idCategory: string
  strCategory: string
}

export interface CategoryResponse {
  categories: Category[]
}

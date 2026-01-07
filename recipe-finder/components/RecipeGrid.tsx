import { Meal } from '@/lib/types'
import { RecipeCard } from './RecipeCard'

interface Props {
  meals: Meal[]
}

export function RecipeGrid({ meals }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {meals.map(meal => (
        <RecipeCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  )
}

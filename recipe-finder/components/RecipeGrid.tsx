import { Meal } from '@/lib/types'
import { RecipeCard } from './RecipeCard'

interface Props {
  meals: Meal[]
  onView: (id: string) => void
}

export function RecipeGrid({ meals, onView }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {meals.map((meal) => (
        <RecipeCard
          key={meal.idMeal}
          meal={meal}
          onView={onView}
        />
      ))}
    </div>
  )
}

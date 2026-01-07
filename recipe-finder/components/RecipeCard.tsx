import { Meal } from '@/lib/types'

interface Props {
  meal: Meal
  onView: (id: string) => void
}

export function RecipeCard({ meal, onView }: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold mb-4">
          {meal.strMeal}
        </h3>

        <button
          onClick={() => onView(meal.idMeal)}
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
        >
          View Recipe
        </button>
      </div>
    </div>
  )
}

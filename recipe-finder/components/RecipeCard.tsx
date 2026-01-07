import { Meal } from '@/lib/types'

interface Props {
  meal: Meal
  onView: (id: string) => void
  category?: string | null
}

export function RecipeCard({ meal, onView, category }: Props) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <div className="relative">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="h-48 w-full object-cover"
        />

        {/* Category badge */}
        <span className="
          absolute top-3 left-3
          bg-orange-500 text-white
          text-xs font-medium
          px-3 py-1
          rounded-full
          shadow
          ">
          {meal.strCategory || category}
        </span>


        {/* Heart */}
        <button
          className="absolute top-3 right-3 bg-white/90 rounded-full h-8 w-8 flex items-center justify-center shadow"
          aria-label="Favorite"
        >
          ❤️
        </button>
      </div>

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

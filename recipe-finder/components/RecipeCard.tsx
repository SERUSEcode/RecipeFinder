import { Meal } from '@/lib/types'

export function RecipeCard({ meal }: { meal: Meal }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <div className="relative">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-48 object-cover"
        />

        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
          {meal.strCategory}
        </span>

        <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow">
          🤍
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold mb-2">{meal.strMeal}</h3>

        <button className="mt-3 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
          View Recipe
        </button>
      </div>
    </div>
  )
}

// Handels the header component with title and subtitle

export function Header() {
  return (
    <header className="text-center py-10">
      <div className="flex justify-center items-center gap-3 mb-2">
        <span className="text-3xl">🔍</span>
        <h1 className="text-3xl font-bold text-orange-500">
          Recipe Collection
        </h1>
      </div>

      <p className="text-gray-500">
        Discover and save your favorite recipes
      </p>
    </header>
  )
}

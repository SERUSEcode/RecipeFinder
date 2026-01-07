interface Props {
  count: number
}

export function ResultsMeta({ count }: Props) {
  return (
    <p className="mb-4 text-gray-700">
      {count} recipes found
    </p>
  )
}

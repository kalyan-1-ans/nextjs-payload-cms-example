type PageTimestampsProps = {
  createdAt: string
  updatedAt: string
  renderedAt: string
}

export function PageTimestamps({ createdAt, updatedAt, renderedAt }: PageTimestampsProps) {
  return (
    <p className="flex flex-wrap gap-x-5 gap-y-2 text-stamp text-secondary">
      <span>
        <span className="font-medium">Created</span> {createdAt}
      </span>
      <span>
        <span className="font-medium">Updated</span> {updatedAt}
      </span>
      <span>
        <span className="font-medium">Rendered</span> {renderedAt}
      </span>
    </p>
  )
}

import { RecommendationItem, type RecommendationItemProps } from '@/components/recommendation-item'

type RecommendationListProps = {
  items: RecommendationItemProps[]
}

export function RecommendationList({ items }: RecommendationListProps) {
  return (
    <section>
      <h2 className="pb-1 font-sans text-label font-normal text-secondary">
        Latest recommendations
      </h2>
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <RecommendationItem {...item} />
          </li>
        ))}
      </ul>
    </section>
  )
}

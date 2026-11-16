import Link from 'next/link'

import type { Recommendation } from '@/payload-types'

import { formatMealLine } from '@/lib/format'

export type RecommendationItemProps = {
  href: string
  meal: Recommendation['meal']
  minutes: number
  title: string
  excerpt: string
}

export function RecommendationItem({
  href,
  meal,
  minutes,
  title,
  excerpt,
}: RecommendationItemProps) {
  return (
    <article className="flex flex-col gap-3 pt-6 pb-[26px]">
      <div className="h-px w-full bg-border" />
      <Link href={href} className="flex flex-col gap-2.5 pt-2">
        <p className="text-eyebrow text-accent">{formatMealLine(meal, minutes)}</p>
        <h3 className="text-card-title text-ink">{title}</h3>
        <p className="text-excerpt whitespace-pre-line text-secondary">{excerpt}</p>
        <span className="text-link text-accent">Read recommendation →</span>
      </Link>
    </article>
  )
}

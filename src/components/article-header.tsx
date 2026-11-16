import type { Recommendation } from '@/payload-types'

import { formatMealLine } from '@/lib/format'

type ArticleHeaderProps = {
  meal: Recommendation['meal']
  minutes: number
  serves: number
  title: string
  summary: string
}

export function ArticleHeader({ meal, minutes, serves, title, summary }: ArticleHeaderProps) {
  return (
    <header className="flex flex-col gap-[14px]">
      <p className="text-eyebrow leading-[1.65] text-accent">
        {formatMealLine(meal, minutes, serves)}
      </p>
      <h1 className="text-title text-ink">{title}</h1>
      <p className="text-lede leading-[1.65] whitespace-pre-line text-secondary">{summary}</p>
    </header>
  )
}

type ArticleSectionProps = {
  heading: string
  children: string
}

export function ArticleSection({ heading, children }: ArticleSectionProps) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-section text-ink">{heading}</h2>
      <p className="text-prose whitespace-pre-line text-copy">{children}</p>
    </section>
  )
}

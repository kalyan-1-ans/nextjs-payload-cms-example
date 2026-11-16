type PageSectionProps = {
  heading: string
  children: string
}

export function PageSection({ heading, children }: PageSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-page-heading text-ink">{heading}</h2>
      <p className="text-page-body whitespace-pre-line text-copy">{children}</p>
    </section>
  )
}

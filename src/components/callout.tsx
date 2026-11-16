type CalloutProps = {
  heading: string
  children: string
}

export function Callout({ heading, children }: CalloutProps) {
  return (
    <aside className="flex flex-col gap-2 bg-callout px-5 py-4">
      <h2 className="font-sans text-compact font-normal text-accent">{heading}</h2>
      <p className="text-link leading-[1.65] text-copy">{children}</p>
    </aside>
  )
}

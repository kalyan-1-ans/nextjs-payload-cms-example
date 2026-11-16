import Link from 'next/link'

const sizes = {
  article: 'text-compact',
  page: 'text-link leading-[1.65]',
} as const

type TextLinkProps = {
  href: string
  children: string
  size: keyof typeof sizes
}

export function TextLink({ href, children, size }: TextLinkProps) {
  return (
    <Link href={href} className={`${sizes[size]} text-accent`}>
      {children}
    </Link>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
] as const

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="flex h-24 items-center justify-between border-b border-border">
      <Link href="/" className="font-serif text-wordmark text-ink">
        Small bites.
      </Link>
      <nav className="flex items-start gap-7">
        {links.map((link) => {
          const current = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={current ? 'page' : undefined}
              className={
                current
                  ? 'text-link text-accent underline decoration-solid [text-underline-position:from-font]'
                  : 'text-link text-secondary'
              }
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}

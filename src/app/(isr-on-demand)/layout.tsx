import { Inter, Noto_Serif } from 'next/font/google'
import React from 'react'

import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

import './styles.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-noto-serif',
  display: 'swap',
})

export const metadata = {
  description: 'Simple recommendations for everyday cravings.',
  title: {
    default: 'Small bites',
    template: '%s · Small bites',
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className={`${inter.variable} ${notoSerif.variable}`} lang="en">
      <body>
        <div className="mx-auto w-full max-w-[768px] px-6">
          <div className="mx-auto flex w-full max-w-[720px] flex-col">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  )
}

import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="mx-auto flex h-screen max-w-5xl flex-col items-center justify-between overflow-hidden p-6 min-[401px]:p-10">
      <div className="flex flex-1 flex-col items-center justify-center">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/3.x/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/3.x/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        <h1 className="my-6 text-center text-display min-[401px]:my-10">
          {user ? `Welcome back, ${user.email}` : 'Welcome to your new project.'}
        </h1>
        <div className="flex items-center gap-3">
          <a
            className="rounded border border-accent bg-accent px-2 py-1 text-meta text-surface no-underline"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="rounded border border-border bg-surface px-2 py-1 text-meta text-ink no-underline"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className="flex items-center gap-2 max-lg:flex-col max-lg:gap-1.5">
        <p className="m-0">Update this page by editing</p>
        <a className="rounded bg-ink px-2 text-meta text-surface no-underline" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  )
}

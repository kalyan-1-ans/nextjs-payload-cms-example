import React from 'react'

import { PageIntroduction } from '@/components/page-introduction'
import { PageSection } from '@/components/page-section'
import { PageTimestamps } from '@/components/page-timestamps'
import { TextLink } from '@/components/text-link'
import { formatTimestamp } from '@/lib/format'
import { getPayloadClient } from '@/lib/payload'

export const metadata = {
  title: 'About',
}

export default async function AboutPage() {
  const payload = await getPayloadClient()
  const about = await payload.findGlobal({ slug: 'about' })

  return (
    <>
      <main className="flex min-h-[744px] flex-col gap-[38px] pt-[60px] pb-16">
        <PageIntroduction
          eyebrow={about.eyebrow}
          lede={about.intro}
          size="about"
          title={about.headline}
        />
        {about.sections.map((section) => (
          <PageSection key={section.id ?? section.heading} heading={section.heading}>
            {section.body}
          </PageSection>
        ))}
        <TextLink href="/" size="page">
          ← Back to all recommendations
        </TextLink>
      </main>
      <PageTimestamps
        createdAt={formatTimestamp(about.createdAt)}
        renderedAt={formatTimestamp(new Date())}
        updatedAt={formatTimestamp(about.updatedAt)}
      />
    </>
  )
}

import React from 'react'

import { PageIntroduction } from '@/components/page-introduction'
import { PageTimestamps } from '@/components/page-timestamps'
import { RecommendationList } from '@/components/recommendation-list'
import { formatTimestamp } from '@/lib/format'
import { recommendationPath } from '@/lib/paths'
import { getPayloadClient } from '@/lib/payload'

export default async function HomePage() {
  const payload = await getPayloadClient()
  const [home, recommendations] = await Promise.all([
    payload.findGlobal({ slug: 'home' }),
    payload.find({
      collection: 'recommendations',
      depth: 0,
      limit: 100,
      sort: 'sortOrder',
    }),
  ])

  return (
    <>
      <main className="flex min-h-[744px] flex-col gap-9 pt-[60px] pb-16">
        <PageIntroduction
          eyebrow={home.eyebrow}
          lede={home.intro}
          size="home"
          title={home.headline}
        />
        <RecommendationList
          items={recommendations.docs.map((recommendation) => ({
            excerpt: recommendation.excerpt,
            href: recommendationPath(recommendation.slug),
            meal: recommendation.meal,
            minutes: recommendation.minutes,
            title: recommendation.title,
          }))}
        />
      </main>
      <PageTimestamps
        createdAt={formatTimestamp(home.createdAt)}
        renderedAt={formatTimestamp(new Date())}
        updatedAt={formatTimestamp(home.updatedAt)}
      />
    </>
  )
}

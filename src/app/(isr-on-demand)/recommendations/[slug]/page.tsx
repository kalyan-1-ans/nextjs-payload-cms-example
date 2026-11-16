import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import { ArticleHeader } from '@/components/article-header'
import { ArticleSection } from '@/components/article-section'
import { Callout } from '@/components/callout'
import { PageTimestamps } from '@/components/page-timestamps'
import { TextLink } from '@/components/text-link'
import { formatTimestamp } from '@/lib/format'
import { recommendationPath } from '@/lib/paths'
import { getPayloadClient } from '@/lib/payload'
import type { Recommendation } from '@/payload-types'

type RecommendationPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const recommendations = await payload.find({
    collection: 'recommendations',
    depth: 0,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return recommendations.docs.flatMap((recommendation) =>
    recommendation.slug ? [{ slug: recommendation.slug }] : [],
  )
}

const getRecommendation = cache(async (slug: string) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'recommendations',
    depth: 1,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs[0] ?? null
})

function nextRecommendation(value: Recommendation['upNext']): Recommendation | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  return value
}

export async function generateMetadata({ params }: RecommendationPageProps): Promise<Metadata> {
  const { slug } = await params
  const recommendation = await getRecommendation(slug)

  if (!recommendation) {
    return {}
  }

  return {
    title: recommendation.title,
  }
}

export default async function RecommendationPage({ params }: RecommendationPageProps) {
  const { slug } = await params
  const recommendation = await getRecommendation(slug)

  if (!recommendation) {
    notFound()
  }

  const upNext = nextRecommendation(recommendation.upNext)

  return (
    <>
      <main className="flex min-h-[744px] flex-col gap-[30px] pt-10 pb-16">
        <TextLink href="/" size="article">
          ← All recommendations
        </TextLink>
        <ArticleHeader
          meal={recommendation.meal}
          minutes={recommendation.minutes}
          serves={recommendation.serves}
          summary={recommendation.summary}
          title={recommendation.title}
        />
        <ArticleSection heading="Why I recommend it">{recommendation.why}</ArticleSection>
        <ArticleSection heading="What you’ll need">{recommendation.ingredients}</ArticleSection>
        <ArticleSection heading="Keep it simple">{recommendation.method}</ArticleSection>
        <Callout heading="One small tip">{recommendation.tip}</Callout>
        {upNext ? (
          <TextLink href={recommendationPath(upNext.slug)} size="article">
            {`Up next: ${upNext.title} →`}
          </TextLink>
        ) : null}
      </main>
      <PageTimestamps
        createdAt={formatTimestamp(recommendation.createdAt)}
        renderedAt={formatTimestamp(new Date())}
        updatedAt={formatTimestamp(recommendation.updatedAt)}
      />
    </>
  )
}

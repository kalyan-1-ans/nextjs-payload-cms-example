import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  Payload,
  PayloadRequest,
} from 'payload'

import { recommendationPath } from '@/lib/paths'
import type { Recommendation } from '@/payload-types'

function revalidationDisabled(context: { disableRevalidate?: unknown }) {
  return context.disableRevalidate === true
}

function revalidate(payload: Payload, path: string) {
  payload.logger.info(`Revalidating path: ${path}`)
  revalidatePath(path)
}

export const revalidateHome: GlobalAfterChangeHook = ({ doc, req: { context, payload } }) => {
  if (revalidationDisabled(context)) {
    return doc
  }

  revalidate(payload, '/')
  return doc
}

export const revalidateAbout: GlobalAfterChangeHook = ({ doc, req: { context, payload } }) => {
  if (revalidationDisabled(context)) {
    return doc
  }

  revalidate(payload, '/about')
  return doc
}

async function revalidateRecommendationPaths({
  doc,
  payload,
  previousSlug,
  req,
}: {
  doc: Recommendation
  payload: Payload
  previousSlug?: string
  req: PayloadRequest
}) {
  revalidate(payload, '/')

  const paths = new Set<string>()

  if (doc.slug) {
    paths.add(recommendationPath(doc.slug))
  }

  if (previousSlug && previousSlug !== doc.slug) {
    paths.add(recommendationPath(previousSlug))
  }

  const referrers = await req.payload.find({
    collection: 'recommendations',
    depth: 0,
    pagination: false,
    select: {
      slug: true,
    },
    where: {
      upNext: {
        equals: doc.id,
      },
    },
    req,
  })

  for (const referrer of referrers.docs) {
    if (referrer.slug) {
      paths.add(recommendationPath(referrer.slug))
    }
  }

  for (const path of paths) {
    revalidate(payload, path)
  }
}

export const revalidateRecommendation: CollectionAfterChangeHook<Recommendation> = async ({
  doc,
  previousDoc,
  req,
}) => {
  if (revalidationDisabled(req.context)) {
    return doc
  }

  await revalidateRecommendationPaths({
    doc,
    payload: req.payload,
    previousSlug: previousDoc?.slug,
    req,
  })

  return doc
}

export const revalidateDeletedRecommendation: CollectionAfterDeleteHook<Recommendation> = async ({
  doc,
  req,
}) => {
  if (revalidationDisabled(req.context)) {
    return doc
  }

  await revalidateRecommendationPaths({
    doc,
    payload: req.payload,
    req,
  })

  return doc
}

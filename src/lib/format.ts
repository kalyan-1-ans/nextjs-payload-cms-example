import type { Recommendation } from '@/payload-types'

export function formatTimestamp(value: string | Date | null | undefined): string {
  if (!value) {
    return ''
  }

  const date = typeof value === 'string' ? new Date(value) : value

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return date
    .toISOString()
    .replace('T', ' ')
    .replace(/\.\d{3}Z$/, ' UTC')
}

export function formatMealLine(
  meal: Recommendation['meal'],
  minutes: number,
  serves?: number,
): string {
  const line = `${meal.toUpperCase()} · ${minutes} MIN`

  if (serves === undefined) {
    return line
  }

  return `${line} · SERVES ${serves}`
}

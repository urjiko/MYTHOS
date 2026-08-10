import { describe, expect, it } from 'vitest'
import { segmentStoryCharacters } from './mythCharacters'

describe('interactive myth character annotations', () => {
  it('preserves the complete story while finding multiple character names', () => {
    const story = 'Aphrodite speaks to Paris while Athena waits.'
    const segments = segmentStoryCharacters(story, 'en')

    expect(segments.map((segment) => segment.text).join('')).toBe(story)
    expect(segments.flatMap((segment) => segment.character?.id ?? [])).toEqual([
      'aphrodite',
      'paris',
      'athena',
    ])
  })

  it('matches Turkish names before possessive suffixes', () => {
    const segments = segmentStoryCharacters('Akhilleus’un zırhını Patroklos giyer.', 'tr')

    expect(segments.filter((segment) => segment.character).map((segment) => segment.character?.id)).toEqual([
      'achilles',
      'patroclus',
    ])
  })
})

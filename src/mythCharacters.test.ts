import { describe, expect, it } from 'vitest'
import { mythScenes } from './data'
import { mythCharactersForScene, segmentStoryCharacters } from './mythCharacters'

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

  it.each(['en', 'tr'] as const)('provides at least one character dossier for every archive story in %s', (locale) => {
    mythScenes.forEach((scene) => {
      expect(mythCharactersForScene(scene, locale).length, scene.id).toBeGreaterThan(0)
    })
  })
})

import { describe, expect, it } from 'vitest'
import { catalogSummary, collections } from './catalogSummary'
import { atlasPlaces, mythScenes } from './data'

describe('MYTHOS lightweight catalog summary', () => {
  it('stays synchronized with the full lazy-loaded catalog', () => {
    expect(catalogSummary.mythScenes).toBe(mythScenes.length)
    expect(catalogSummary.atlasPlaces).toBe(atlasPlaces.length)
    expect(catalogSummary.odysseyScenes).toBe(
      mythScenes.filter((scene) => scene.category === 'odyssey').length,
    )
  })

  it('keeps the four home-page collection cards available without loading the catalog', () => {
    expect(collections.map((collection) => collection.title)).toEqual([
      'Olympians',
      'Heroes',
      'Creatures',
      'Trojan Cycle',
    ])
  })
})

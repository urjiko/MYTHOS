import { describe, expect, it } from 'vitest'
import { mythScenes } from './data'
import { createGameDeck, DEFAULT_ROUND_COUNT } from './gameDeck'

describe('MYTHOS game decks', () => {
  it('keeps the expanded archive complete', () => {
    expect(mythScenes).toHaveLength(22)
    expect(mythScenes.map((scene) => scene.id)).toEqual(expect.arrayContaining([
      'echo',
      'pegasus-birth',
      'chimera',
    ]))
  })

  it('draws a six-scene general journey without duplicates', () => {
    const deck = createGameDeck('all', () => 0)

    expect(deck).toHaveLength(DEFAULT_ROUND_COUNT)
    expect(new Set(deck.map((scene) => scene.id)).size).toBe(deck.length)
  })

  it('keeps the route game entirely inside the Odyssey cycle', () => {
    const deck = createGameDeck('odyssey', () => 0.37)
    const odysseyCount = mythScenes.filter((scene) => scene.category === 'odyssey').length

    expect(odysseyCount).toBe(13)
    expect(deck).toHaveLength(odysseyCount)
    expect(deck.every((scene) => scene.category === 'odyssey')).toBe(true)
  })

  it('shuffles answer slots without mutating the archive data', () => {
    const originalOptions = mythScenes.map((scene) => [...scene.options])
    const deck = createGameDeck('all', () => 0)

    expect(deck.every((scene) => scene.options.includes(scene.title))).toBe(true)
    expect(deck.some((scene) => scene.options.indexOf(scene.title) !== mythScenes.find((source) => source.id === scene.id)?.options.indexOf(scene.title))).toBe(true)
    expect(mythScenes.map((scene) => scene.options)).toEqual(originalOptions)
  })
})

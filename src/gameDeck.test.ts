import { describe, expect, it } from 'vitest'
import { mythScenes } from './data'
import { createGameDeck, DEFAULT_ROUND_COUNT, HIPPOLYTA_ROUTE_IDS } from './gameDeck'

describe('MYTHOS game decks', () => {
  it('keeps the expanded archive complete', () => {
    expect(mythScenes).toHaveLength(49)
    expect(mythScenes.map((scene) => scene.id)).toEqual(expect.arrayContaining([
      'echo',
      'pegasus-birth',
      'chimera',
      'judgement-paris',
      'iphigenia-aulis',
      'hector-andromache',
      'patroclus-falls',
      'achilles-hector',
      'priam-achilles',
      'orpheus-eurydice',
      'oedipus-sphinx',
      'lernaean-hydra',
      'midas-gold',
      'apollo-marsyas',
      'niobe-sipylus',
      'selene-endymion',
      'hylas-nymphs',
      'arachne-athena',
      'salmacis-hermaphroditus',
      'hero-leander',
      'hippolyta-girdle',
      'admete-request',
      'paros-crisis',
      'heracles-mygdon',
      'hera-amazons',
      'hesione-rescue',
      'leto-lycians',
      'telephus-achilles',
      'attis-great-mother',
      'io-flight',
    ]))
  })

  it('draws a five-scene general journey without duplicates', () => {
    const deck = createGameDeck('all', () => 0)

    expect(deck).toHaveLength(DEFAULT_ROUND_COUNT)
    expect(new Set(deck.map((scene) => scene.id)).size).toBe(deck.length)
  })

  it('keeps the route game entirely inside the Odyssey cycle', () => {
    const deck = createGameDeck('odyssey', () => 0.37)
    const odysseyScenes = mythScenes.filter((scene) => scene.category === 'odyssey')
    const odysseyCount = odysseyScenes.length
    const odysseyTitles = new Set(odysseyScenes.map((scene) => scene.title))

    expect(odysseyCount).toBe(13)
    expect(deck).toHaveLength(odysseyCount)
    expect(deck.every((scene) => scene.category === 'odyssey')).toBe(true)
    expect(deck.every((scene) => scene.options.every((option) => odysseyTitles.has(option)))).toBe(true)
  })

  it('builds the six-scene Trojan chronicle without pulling in the horse', () => {
    const deck = createGameDeck('iliad', () => 0.61)

    expect(deck).toHaveLength(6)
    expect(deck.every((scene) => scene.category === 'trojan')).toBe(true)
    expect(deck.some((scene) => scene.id === 'trojan-horse')).toBe(false)
  })

  it('builds a source-linked ninth-labour route with only route-specific answers', () => {
    const deck = createGameDeck('hippolyta', () => 0.43)
    const routeIds = new Set<string>(HIPPOLYTA_ROUTE_IDS)
    const routeTitles = new Set(
      mythScenes.filter((scene) => routeIds.has(scene.id)).map((scene) => scene.title),
    )

    expect(deck).toHaveLength(6)
    expect(deck.map((scene) => scene.id)).toEqual([...HIPPOLYTA_ROUTE_IDS])
    expect(deck.every((scene) => scene.options.every((option) => routeTitles.has(option)))).toBe(true)
  })

  it('shuffles answer slots without mutating the archive data', () => {
    const originalOptions = mythScenes.map((scene) => [...scene.options])
    const deck = createGameDeck('all', () => 0)

    expect(deck.every((scene) => scene.options.includes(scene.title))).toBe(true)
    expect(deck.some((scene) => scene.options.indexOf(scene.title) !== mythScenes.find((source) => source.id === scene.id)?.options.indexOf(scene.title))).toBe(true)
    expect(mythScenes.map((scene) => scene.options)).toEqual(originalOptions)
  })
})

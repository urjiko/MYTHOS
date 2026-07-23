import { describe, expect, it } from 'vitest'
import { atlasPlaces } from './data'

const answerGivingWords = [
  'aeolia',
  'calypso',
  'chimera',
  'cicones',
  'cyclop',
  'daphne',
  'echo',
  'endymion',
  'gorgon',
  'hydra',
  'hylas',
  'iphigenia',
  'laestrygon',
  'lotophag',
  'marsyas',
  'midas',
  'niobe',
  'ogygia',
  'paris',
  'pegasus',
  'scheria',
  'sphinx',
  'telepylus',
  'thrinacia',
]

describe('game-map labels', () => {
  it('uses neutral geography instead of story or character names', () => {
    const gameLabels = atlasPlaces
      .map((place) => place.gameName?.en ?? place.name)
      .join(' ')
      .toLowerCase()

    answerGivingWords.forEach((word) => expect(gameLabels).not.toContain(word))
  })

  it('keeps contextual labels available in the free atlas and answer reveal', () => {
    expect(atlasPlaces.some((place) => place.name === 'Tempe / Daphne' && place.gameName?.en === 'Tempe Valley')).toBe(true)
    expect(atlasPlaces.some((place) => place.name === 'Kelainai / Marsyas' && place.gameName?.en === 'Kelainai')).toBe(true)
  })
})

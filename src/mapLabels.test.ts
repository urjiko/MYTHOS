import { describe, expect, it } from 'vitest'
import { atlasPlaces } from './data'

const answerGivingWords = [
  'aeolia',
  'arachne',
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
  'hermaphrodit',
  'hero',
  'hippolyta',
  'iphigenia',
  'laestrygon',
  'leto',
  'lotophag',
  'marsyas',
  'midas',
  'niobe',
  'ogygia',
  'paris',
  'pegasus',
  'scheria',
  'salmacis',
  'sphinx',
  'telepylus',
  'teleph',
  'thrinacia',
  'leander',
  'attis',
]

describe('game-map labels', () => {
  it('uses neutral geography instead of story or character names', () => {
    const gameLabels = atlasPlaces
      .map((place) => place.gameName?.en ?? place.name)
      .join(' ')
      .toLowerCase()

    answerGivingWords.forEach((word) => expect(gameLabels).not.toContain(word))
  })

  it('keeps source context internally while exposing only neutral public labels', () => {
    expect(atlasPlaces.some((place) => place.name === 'Tempe / Daphne' && place.gameName?.en === 'Tempe Valley')).toBe(true)
    expect(atlasPlaces.some((place) => place.name === 'Yanartaş / Chimera' && place.gameName?.en === 'Yanartaş')).toBe(true)
    expect(atlasPlaces.some((place) => place.name === 'Kelainai / Marsyas' && place.gameName?.en === 'Kelainai')).toBe(true)
    expect(atlasPlaces.some((place) => place.name === 'Themiscyra / Hippolyta' && place.gameName?.en === 'Thermodon Plain')).toBe(true)
    expect(atlasPlaces.some((place) => place.name === 'Letoon / Leto' && place.gameName?.en === 'Xanthos Valley')).toBe(true)
    expect(atlasPlaces.some((place) => place.name === 'Pessinus / Attis' && place.gameName?.en === 'Pessinus')).toBe(true)
    expect(atlasPlaces.some((place) => place.name === 'Bosporus / Io' && place.gameName?.en === 'Thracian Bosporus')).toBe(true)
  })
})

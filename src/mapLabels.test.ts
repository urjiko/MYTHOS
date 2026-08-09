import { describe, expect, it } from 'vitest'
import { ancientRegions, atlasPlaces } from './data'
import { mapLabelForPlace, mapPeriodLabel, mapRegionLabel, mapTypeLabel } from './mapCopy'

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

  it('has a Turkish public label for every atlas place', () => {
    atlasPlaces.forEach((place) => {
      expect(place.gameName?.tr).toBeTruthy()
      expect(mapLabelForPlace(place, 'tr')).toBe(place.gameName?.tr)
    })
  })

  it('localises every map category, period, and region label', () => {
    const unchangedTypeLabels = new Set(['Polis'])
    const unchangedRegionLabels = new Set(['HELLAS'])

    new Set(atlasPlaces.map((place) => place.type)).forEach((type) => {
      if (!unchangedTypeLabels.has(type)) expect(mapTypeLabel(type, 'tr')).not.toBe(type)
    })
    new Set(atlasPlaces.map((place) => place.period)).forEach((period) => {
      expect(mapPeriodLabel(period, 'tr')).not.toBe(period)
    })
    ancientRegions.forEach((region) => {
      if (!unchangedRegionLabels.has(region.name)) expect(mapRegionLabel(region.name, 'tr')).not.toBe(region.name)
    })
  })
})

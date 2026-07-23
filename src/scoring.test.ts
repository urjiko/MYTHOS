import { describe, expect, it } from 'vitest'
import { mythScenes } from './data'
import { haversineDistanceKm, scoreRound } from './scoring'

const target = { lat: 35.2989, lng: 25.1603 }
const fullCreditRadiusKm = 90

describe('MYTHOS scoring', () => {
  it('awards the full 10,000 points for a perfect unaided answer', () => {
    expect(scoreRound({
      answer: 'Theseus and the Minotaur',
      correctAnswer: 'Theseus and the Minotaur',
      guess: target,
      target,
      fullCreditRadiusKm,
      secondsLeft: 75,
      cluesUsed: 0,
    }).total).toBe(10_000)
  })

  it('does not award recognition points for the wrong myth', () => {
    const result = scoreRound({
      answer: 'Wrong answer',
      correctAnswer: 'Theseus and the Minotaur',
      guess: target,
      target,
      fullCreditRadiusKm,
      secondsLeft: 75,
      cluesUsed: 0,
    })

    expect(result.recognition).toBe(0)
    expect(result.total).toBe(6_500)
  })

  it('reduces geography points smoothly with distance', () => {
    const near = scoreRound({
      answer: '', correctAnswer: 'x', guess: { lat: 35.5, lng: 25.2 }, target, fullCreditRadiusKm, secondsLeft: 0, cluesUsed: 3,
    })
    const far = scoreRound({
      answer: '', correctAnswer: 'x', guess: { lat: 41.9, lng: -7 }, target, fullCreditRadiusKm, secondsLeft: 0, cluesUsed: 3,
    })

    expect(near.geography).toBeGreaterThan(far.geography)
    expect(far.geography).toBeLessThan(100)
  })

  it('awards full geography points anywhere inside the accepted region', () => {
    const result = scoreRound({
      answer: '',
      correctAnswer: 'x',
      guess: { lat: 35.6, lng: 25.16 },
      target,
      fullCreditRadiusKm,
      secondsLeft: 0,
      cluesUsed: 3,
    })

    expect(result.distance).toBeGreaterThan(30)
    expect(result.geography).toBe(4_000)
    expect(result.scoredDistance).toBe(0)
  })

  it('does not treat a nearby Odyssey city as the same full-credit region', () => {
    const circeo = { lat: 41.232, lng: 13.055 }
    const formiae = { lat: 41.2557, lng: 13.6012 }
    const result = scoreRound({
      answer: '',
      correctAnswer: 'x',
      guess: formiae,
      target: circeo,
      fullCreditRadiusKm: 35,
      secondsLeft: 0,
      cluesUsed: 3,
    })

    expect(result.distance).toBeGreaterThan(45)
    expect(result.scoredDistance).toBeGreaterThan(10)
    expect(result.geography).toBeLessThan(4_000)
  })

  it('removes the oracle bonus after all three clues', () => {
    expect(scoreRound({
      answer: '', correctAnswer: 'x', guess: target, target, fullCreditRadiusKm, secondsLeft: 0, cluesUsed: 3,
    }).oracle).toBe(0)
  })

  it('measures real great-circle distance in kilometres', () => {
    const athens = { lat: 37.9715, lng: 23.7267 }
    const delphi = { lat: 38.4824, lng: 22.501 }
    expect(haversineDistanceKm(athens, delphi)).toBeGreaterThan(110)
    expect(haversineDistanceKm(athens, delphi)).toBeLessThan(140)
  })

  it('does not put every correct answer in the first slot', () => {
    const answerSlots = mythScenes.map((scene) => scene.options.indexOf(scene.title))
    expect(answerSlots.every((slot) => slot >= 0)).toBe(true)
    expect(new Set(answerSlots).size).toBeGreaterThanOrEqual(4)
    expect(answerSlots).not.toEqual(answerSlots.map(() => 0))
  })
})

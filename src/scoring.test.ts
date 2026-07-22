import { describe, expect, it } from 'vitest'
import { scoreRound } from './scoring'

const target = { x: 47, y: 79 }

describe('MYTHOS scoring', () => {
  it('awards the full 10,000 points for a perfect unaided answer', () => {
    expect(scoreRound({
      answer: 'Theseus ve Minotor',
      correctAnswer: 'Theseus ve Minotor',
      guess: target,
      target,
      secondsLeft: 75,
      cluesUsed: 0,
    }).total).toBe(10_000)
  })

  it('does not award recognition points for the wrong myth', () => {
    const result = scoreRound({
      answer: 'Yanlış cevap',
      correctAnswer: 'Theseus ve Minotor',
      guess: target,
      target,
      secondsLeft: 75,
      cluesUsed: 0,
    })

    expect(result.recognition).toBe(0)
    expect(result.total).toBe(6_500)
  })

  it('reduces geography points smoothly with distance', () => {
    const near = scoreRound({
      answer: '', correctAnswer: 'x', guess: { x: 50, y: 79 }, target, secondsLeft: 0, cluesUsed: 3,
    })
    const far = scoreRound({
      answer: '', correctAnswer: 'x', guess: { x: 5, y: 5 }, target, secondsLeft: 0, cluesUsed: 3,
    })

    expect(near.geography).toBeGreaterThan(far.geography)
    expect(far.geography).toBeLessThan(100)
  })

  it('removes the oracle bonus after all three clues', () => {
    expect(scoreRound({
      answer: '', correctAnswer: 'x', guess: target, target, secondsLeft: 0, cluesUsed: 3,
    }).oracle).toBe(0)
  })
})

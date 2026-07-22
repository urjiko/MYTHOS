import type { Point } from './data'

export type ScoreBreakdown = {
  recognition: number
  geography: number
  speed: number
  oracle: number
  total: number
  distance: number
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

export function scoreRound({
  answer,
  correctAnswer,
  guess,
  target,
  secondsLeft,
  cluesUsed,
}: {
  answer: string
  correctAnswer: string
  guess: Point
  target: Point
  secondsLeft: number
  cluesUsed: number
}): ScoreBreakdown {
  const distance = Math.hypot(guess.x - target.x, guess.y - target.y)
  const recognition = answer === correctAnswer ? 3500 : 0
  const geography = Math.round(4000 * Math.exp(-distance / 18))
  const speed = Math.round(1500 * clamp(secondsLeft / 75, 0, 1))
  const oracle = cluesUsed === 0 ? 1000 : Math.max(0, 750 - (cluesUsed - 1) * 375)
  const total = recognition + geography + speed + oracle

  return { recognition, geography, speed, oracle, total, distance }
}

export function formatScore(value: number) {
  return new Intl.NumberFormat('tr-TR').format(value)
}

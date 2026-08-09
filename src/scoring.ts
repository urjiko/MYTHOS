import type { Point } from './data'
import { ROUND_DURATION_SECONDS } from './gameClock'

export const SCORE_DIMENSIONS = ['recognition', 'geography', 'speed', 'oracle'] as const
export type ScoreDimension = (typeof SCORE_DIMENSIONS)[number]

export const SCORE_MAXIMUMS = {
  recognition: 3_500,
  geography: 4_000,
  speed: 1_500,
  oracle: 1_000,
} as const satisfies Record<ScoreDimension, number>

export const ROUND_MAX_SCORE = SCORE_DIMENSIONS.reduce(
  (sum, dimension) => sum + SCORE_MAXIMUMS[dimension],
  0,
)

export type ScoreBreakdown = {
  recognition: number
  geography: number
  speed: number
  oracle: number
  total: number
  distance: number | null
  scoredDistance: number | null
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

const EARTH_RADIUS_KM = 6371.0088
const GEOGRAPHY_DECAY_KM = 250

export function haversineDistanceKm(a: Point, b: Point) {
  const radians = (degrees: number) => degrees * (Math.PI / 180)
  const latitudeDelta = radians(b.lat - a.lat)
  const longitudeDelta = radians(b.lng - a.lng)
  const latitudeA = radians(a.lat)
  const latitudeB = radians(b.lat)
  const haversine = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(latitudeA) * Math.cos(latitudeB) * Math.sin(longitudeDelta / 2) ** 2

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(haversine))
}

export function scoreRound({
  answer,
  correctAnswer,
  guess,
  target,
  fullCreditRadiusKm,
  secondsLeft,
  cluesUsed,
}: {
  answer: string
  correctAnswer: string
  guess?: Point | null
  target: Point
  fullCreditRadiusKm: number
  secondsLeft: number
  cluesUsed: number
}): ScoreBreakdown {
  const distance = guess ? haversineDistanceKm(guess, target) : null
  const scoredDistance = distance === null
    ? null
    : Math.max(0, distance - Math.max(0, fullCreditRadiusKm))
  const recognition = answer === correctAnswer ? SCORE_MAXIMUMS.recognition : 0
  const geography = scoredDistance === null
    ? 0
    : scoredDistance === 0
      ? SCORE_MAXIMUMS.geography
      : Math.round(SCORE_MAXIMUMS.geography * Math.exp(-scoredDistance / GEOGRAPHY_DECAY_KM))
  const speed = Math.round(SCORE_MAXIMUMS.speed * clamp(secondsLeft / ROUND_DURATION_SECONDS, 0, 1))
  const hasCompleteResponse = Boolean(answer && guess)
  const oracle = hasCompleteResponse
    ? cluesUsed === 0
      ? SCORE_MAXIMUMS.oracle
      : Math.max(0, 750 - (cluesUsed - 1) * 375)
    : 0
  const total = recognition + geography + speed + oracle

  return { recognition, geography, speed, oracle, total, distance, scoredDistance }
}

export function formatScore(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

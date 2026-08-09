import type { Point } from './data'
import { ROUND_DURATION_SECONDS } from './gameClock'

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
  const recognition = answer === correctAnswer ? 3500 : 0
  const geography = scoredDistance === null
    ? 0
    : scoredDistance === 0
      ? 4000
      : Math.round(4000 * Math.exp(-scoredDistance / GEOGRAPHY_DECAY_KM))
  const speed = Math.round(1500 * clamp(secondsLeft / ROUND_DURATION_SECONDS, 0, 1))
  const hasCompleteResponse = Boolean(answer && guess)
  const oracle = hasCompleteResponse
    ? cluesUsed === 0
      ? 1000
      : Math.max(0, 750 - (cluesUsed - 1) * 375)
    : 0
  const total = recognition + geography + speed + oracle

  return { recognition, geography, speed, oracle, total, distance, scoredDistance }
}

export function formatScore(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

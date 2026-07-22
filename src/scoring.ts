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

const EARTH_RADIUS_KM = 6371.0088

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
  const distance = haversineDistanceKm(guess, target)
  const recognition = answer === correctAnswer ? 3500 : 0
  const geography = Math.round(4000 * Math.exp(-distance / 700))
  const speed = Math.round(1500 * clamp(secondsLeft / 75, 0, 1))
  const oracle = cluesUsed === 0 ? 1000 : Math.max(0, 750 - (cluesUsed - 1) * 375)
  const total = recognition + geography + speed + oracle

  return { recognition, geography, speed, oracle, total, distance }
}

export function formatScore(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

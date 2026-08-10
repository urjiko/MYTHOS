import type { GameRoundResult } from './gameSession'
import {
  ROUND_MAX_SCORE,
  SCORE_DIMENSIONS,
  SCORE_MAXIMUMS,
  type ScoreBreakdown,
  type ScoreDimension,
} from './scoring'

export type LearningSignal = ScoreDimension | 'time' | 'strong'
export type JourneyProfile = 'differentiated' | 'even' | 'balanced'

const STRONG_ROUND_MINIMUM_PERCENT = 70
const EVEN_PROFILE_MAXIMUM_SPREAD = 4
const BALANCED_MASTERY_MINIMUM_PERCENT = 90

export type DimensionPerformance = {
  dimension: ScoreDimension
  earned: number
  maximum: number
  percentage: number
}

export type JourneyReport = {
  totalScore: number
  maximumScore: number
  masteryPercentage: number
  identifiedCount: number
  timeoutCount: number
  reviewCount: number
  averageDistanceKm: number | null
  dimensions: DimensionPerformance[]
  strongest: DimensionPerformance
  focus: DimensionPerformance
}

export function scoreDimensionPercentage(
  breakdown: ScoreBreakdown,
  dimension: ScoreDimension,
) {
  return Math.round((breakdown[dimension] / SCORE_MAXIMUMS[dimension]) * 100)
}

export function roundLearningSignal(round: GameRoundResult): LearningSignal {
  if (round.timedOut) return 'time'

  const weakest = SCORE_DIMENSIONS.reduce((current, dimension) => {
    const percentage = scoreDimensionPercentage(round.breakdown, dimension)
    return percentage < current.percentage ? { dimension, percentage } : current
  }, {
    dimension: SCORE_DIMENSIONS[0] as ScoreDimension,
    percentage: scoreDimensionPercentage(round.breakdown, SCORE_DIMENSIONS[0]),
  })

  return weakest.percentage >= STRONG_ROUND_MINIMUM_PERCENT ? 'strong' : weakest.dimension
}

export function classifyJourneyProfile(
  report: Pick<JourneyReport, 'strongest' | 'focus'>,
): JourneyProfile {
  const spread = report.strongest.percentage - report.focus.percentage
  if (spread > EVEN_PROFILE_MAXIMUM_SPREAD) return 'differentiated'
  return report.focus.percentage >= BALANCED_MASTERY_MINIMUM_PERCENT ? 'balanced' : 'even'
}

export function buildJourneyReport(history: readonly GameRoundResult[]): JourneyReport {
  const roundCount = history.length
  const totalScore = history.reduce((sum, round) => sum + round.breakdown.total, 0)
  const maximumScore = roundCount * ROUND_MAX_SCORE
  const dimensions = SCORE_DIMENSIONS.map((dimension) => {
    const earned = history.reduce((sum, round) => sum + round.breakdown[dimension], 0)
    const maximum = roundCount * SCORE_MAXIMUMS[dimension]
    return {
      dimension,
      earned,
      maximum,
      percentage: maximum === 0 ? 0 : Math.round((earned / maximum) * 100),
    }
  })
  const strongest = dimensions.reduce((best, candidate) => (
    candidate.percentage > best.percentage ? candidate : best
  ))
  const focus = dimensions.reduce((weakest, candidate) => (
    candidate.percentage < weakest.percentage ? candidate : weakest
  ))
  const distances = history
    .map((round) => round.breakdown.distance)
    .filter((distance): distance is number => distance !== null && Number.isFinite(distance))

  return {
    totalScore,
    maximumScore,
    masteryPercentage: maximumScore === 0 ? 0 : Math.round((totalScore / maximumScore) * 100),
    identifiedCount: history.filter((round) => round.breakdown.recognition > 0).length,
    timeoutCount: history.filter((round) => round.timedOut).length,
    reviewCount: history.filter((round) => roundLearningSignal(round) !== 'strong').length,
    averageDistanceKm: distances.length === 0
      ? null
      : distances.reduce((sum, distance) => sum + distance, 0) / distances.length,
    dimensions,
    strongest,
    focus,
  }
}

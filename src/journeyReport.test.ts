import { describe, expect, it } from 'vitest'
import type { GameRoundResult } from './gameSession'
import { buildJourneyReport, classifyJourneyProfile, roundLearningSignal } from './journeyReport'
import { ROUND_MAX_SCORE, SCORE_MAXIMUMS, type ScoreBreakdown } from './scoring'

function breakdown(overrides: Partial<ScoreBreakdown> = {}): ScoreBreakdown {
  const value = {
    recognition: SCORE_MAXIMUMS.recognition,
    geography: SCORE_MAXIMUMS.geography,
    speed: SCORE_MAXIMUMS.speed,
    oracle: SCORE_MAXIMUMS.oracle,
    distance: 0,
    scoredDistance: 0,
    ...overrides,
  }
  return {
    ...value,
    total: value.recognition + value.geography + value.speed + value.oracle,
  }
}

function round(
  sceneId: string,
  score: ScoreBreakdown,
  timedOut = false,
): GameRoundResult {
  return { sceneId, breakdown: score, timedOut }
}

describe('journey learning report', () => {
  it('normalises unlike score components before choosing strength and focus', () => {
    const report = buildJourneyReport([
      round('one', breakdown()),
      round('two', breakdown({
        recognition: 0,
        geography: 2_000,
        speed: 750,
        distance: 200,
        scoredDistance: 200,
      })),
    ])

    expect(report.totalScore).toBe(ROUND_MAX_SCORE + 3_750)
    expect(report.maximumScore).toBe(ROUND_MAX_SCORE * 2)
    expect(report.identifiedCount).toBe(1)
    expect(report.averageDistanceKm).toBe(100)
    expect(report.dimensions.map(({ dimension, percentage }) => [dimension, percentage])).toEqual([
      ['recognition', 50],
      ['geography', 75],
      ['speed', 75],
      ['oracle', 100],
    ])
    expect(report.strongest.dimension).toBe('oracle')
    expect(report.focus.dimension).toBe('recognition')
    expect(report.reviewCount).toBe(1)
  })

  it('counts timeouts and ignores missing map distances', () => {
    const report = buildJourneyReport([
      round('expired', breakdown({ distance: null, scoredDistance: null }), true),
    ])

    expect(report.timeoutCount).toBe(1)
    expect(report.reviewCount).toBe(1)
    expect(report.averageDistanceKm).toBeNull()
    expect(roundLearningSignal(round('expired', breakdown(), true))).toBe('time')
  })

  it.each([
    ['recognition', { recognition: 0 }],
    ['geography', { geography: 0 }],
    ['speed', { speed: 0 }],
    ['oracle', { oracle: 0 }],
  ] as const)('flags %s as the weakest part of a round', (expected, overrides) => {
    expect(roundLearningSignal(round('scene', breakdown(overrides)))).toBe(expected)
  })

  it('marks balanced rounds as strong', () => {
    expect(roundLearningSignal(round('scene', breakdown()))).toBe('strong')
  })

  it('distinguishes a clear skill gap from even and mastered profiles', () => {
    const differentiated = buildJourneyReport([
      round('mixed', breakdown({ recognition: 0 })),
    ])
    const even = buildJourneyReport([
      round('even', breakdown({
        recognition: 1_750,
        geography: 2_000,
        speed: 750,
        oracle: 500,
      })),
    ])
    const balanced = buildJourneyReport([round('perfect', breakdown())])

    expect(classifyJourneyProfile(differentiated)).toBe('differentiated')
    expect(classifyJourneyProfile(even)).toBe('even')
    expect(classifyJourneyProfile(balanced)).toBe('balanced')
  })

  it('keeps empty and tied reports deterministic', () => {
    const empty = buildJourneyReport([])
    const tied = buildJourneyReport([round('zero', breakdown({
      recognition: 0,
      geography: 0,
      speed: 0,
      oracle: 0,
      distance: null,
      scoredDistance: null,
    }))])

    expect(empty).toMatchObject({
      totalScore: 0,
      maximumScore: 0,
      masteryPercentage: 0,
      identifiedCount: 0,
      timeoutCount: 0,
      reviewCount: 0,
      averageDistanceKm: null,
    })
    expect(tied.strongest.dimension).toBe('recognition')
    expect(tied.focus.dimension).toBe('recognition')
    expect(roundLearningSignal(round('zero', breakdown({
      recognition: 0,
      geography: 0,
      speed: 0,
      oracle: 0,
    })))).toBe('recognition')
  })
})

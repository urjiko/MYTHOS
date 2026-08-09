import { describe, expect, it } from 'vitest'
import { normalisePanoramaFilename, parseReviewArguments } from './panorama-review-options.mjs'

describe('panorama review command options', () => {
  it('keeps the first explicit scene instead of treating it as an option value', () => {
    expect(parseReviewArguments(['labyrinth', 'scene-medusa.webp']).explicitNames).toEqual([
      'scene-labyrinth.webp',
      'scene-medusa.webp',
    ])
  })

  it('extracts an output directory without treating it as a scene', () => {
    expect(parseReviewArguments(['--output', '/tmp/review', 'sirens'])).toEqual({
      includeAll: false,
      outputDirectory: '/tmp/review',
      inputFiles: [],
      explicitNames: ['scene-sirens.webp'],
    })
  })

  it('accepts repeated project-bound candidate inputs', () => {
    expect(parseReviewArguments([
      '--input',
      'public/assets/candidates/one.webp',
      '--input',
      'public/assets/candidates/two.webp',
    ])).toEqual({
      includeAll: false,
      outputDirectory: null,
      inputFiles: [
        'public/assets/candidates/one.webp',
        'public/assets/candidates/two.webp',
      ],
      explicitNames: [],
    })
  })

  it('normalises IDs, filenames, and prefixed filenames', () => {
    expect(normalisePanoramaFilename('prometheus')).toBe('scene-prometheus.webp')
    expect(normalisePanoramaFilename('scene-prometheus')).toBe('scene-prometheus.webp')
    expect(normalisePanoramaFilename('scene-prometheus.webp')).toBe('scene-prometheus.webp')
  })

  it('rejects ambiguous or incomplete option combinations', () => {
    expect(() => parseReviewArguments(['--output'])).toThrow(/requires/)
    expect(() => parseReviewArguments(['--input'])).toThrow(/requires/)
    expect(() => parseReviewArguments(['--all', 'labyrinth'])).toThrow(/cannot be combined/)
    expect(() => parseReviewArguments(['labyrinth', '--input', 'candidate.webp']))
      .toThrow(/cannot be combined/)
    expect(() => parseReviewArguments(['--unknown'])).toThrow(/Unknown option/)
  })
})

import { describe, expect, it } from 'vitest'
import { archiveScenesForFilter } from './archive'
import { mythScenes } from './data'
import { figureProfiles } from './figures'

describe('MYTHOS archive filters', () => {
  it('returns a complete copy for the all filter', () => {
    const result = archiveScenesForFilter('all')

    expect(result).toEqual(mythScenes)
    expect(result).not.toBe(mythScenes)
    expect(result).toHaveLength(44)
  })

  it.each([
    ['gods', 12],
    ['heroes', 11],
    ['odyssey', 13],
    ['trojan', 8],
  ] as const)('returns the %s category', (filter, count) => {
    const result = archiveScenesForFilter(filter)

    expect(result).toHaveLength(count)
    expect(result.every((scene) => scene.category === filter)).toBe(true)
  })

  it('derives creature stories from creature profile appearances', () => {
    const availableIds = new Set(mythScenes.map((scene) => scene.id))
    const expectedIds = new Set(
      figureProfiles
        .filter((profile) => profile.category === 'creatures')
        .flatMap((profile) => profile.appearanceIds)
        .filter((id) => availableIds.has(id)),
    )
    const result = archiveScenesForFilter('creatures')

    expect(new Set(result.map((scene) => scene.id))).toEqual(expectedIds)
  })
})

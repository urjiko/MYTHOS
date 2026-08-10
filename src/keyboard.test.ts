import { describe, expect, it } from 'vitest'
import { answerIndexForKey } from './keyboard'

describe('game keyboard shortcuts', () => {
  it.each([
    ['a', 0],
    ['A', 0],
    ['b', 1],
    ['D', 3],
  ])('maps %s to answer %i', (key, index) => {
    expect(answerIndexForKey(key, 4)).toBe(index)
  })

  it('ignores answers outside the available option count', () => {
    expect(answerIndexForKey('d', 3)).toBeNull()
  })

  it.each(['ArrowLeft', 'Enter', '1', ''])('ignores unrelated key %s', (key) => {
    expect(answerIndexForKey(key, 4)).toBeNull()
  })
})

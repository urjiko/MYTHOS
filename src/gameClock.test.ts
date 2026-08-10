import { describe, expect, it } from 'vitest'
import { ROUND_DURATION_MS, ROUND_DURATION_SECONDS, secondsUntilDeadline } from './gameClock'

describe('MYTHOS round clock', () => {
  const startedAt = 1_000_000
  const deadline = startedAt + ROUND_DURATION_MS

  it('starts at the configured round duration', () => {
    expect(secondsUntilDeadline(deadline, startedAt)).toBe(ROUND_DURATION_SECONDS)
  })

  it('uses the deadline instead of counting interval callbacks', () => {
    expect(secondsUntilDeadline(deadline, startedAt + 60_000)).toBe(15)
  })

  it('rounds partial seconds up for display', () => {
    expect(secondsUntilDeadline(deadline, deadline - 1)).toBe(1)
  })

  it('stops at zero and ignores backward clock drift', () => {
    expect(secondsUntilDeadline(deadline, deadline + 10_000)).toBe(0)
    expect(secondsUntilDeadline(deadline, startedAt - 10_000)).toBe(ROUND_DURATION_SECONDS)
  })
})

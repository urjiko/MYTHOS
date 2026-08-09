export const ROUND_DURATION_SECONDS = 75
export const ROUND_DURATION_MS = ROUND_DURATION_SECONDS * 1000

export function secondsUntilDeadline(deadlineMs: number, nowMs: number) {
  return Math.min(
    ROUND_DURATION_SECONDS,
    Math.max(0, Math.ceil((deadlineMs - nowMs) / 1000)),
  )
}

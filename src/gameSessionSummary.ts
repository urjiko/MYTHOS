import type { GameMode } from './gameConfig'
import { getBrowserStorage, type StorageLike } from './storage'

export const GAME_SESSION_VERSION = 2 as const

export type GameSessionSummary = {
  round: number
  total: number
  finished: boolean
}

export const gameSessionKey = (mode: GameMode) =>
  `mythos-game-session-v${GAME_SESSION_VERSION}-${mode}`

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function removeInvalidSession(storage: StorageLike, key: string) {
  try {
    storage.removeItem(key)
  } catch {
    // Storage can be unavailable in restricted browsing modes.
  }
}

export function gameSessionSummary(
  mode: GameMode,
  storage: StorageLike | null = getBrowserStorage(),
): GameSessionSummary | null {
  if (!storage) return null
  const key = gameSessionKey(mode)

  try {
    const encoded = storage.getItem(key)
    if (!encoded) return null

    const session: unknown = JSON.parse(encoded)
    if (!isRecord(session)) throw new Error('Invalid session')

    const { version, deck, round, mode: storedMode, finished, roundStarted, history, result } = session
    const deckLength = Array.isArray(deck) ? deck.length : 0
    const historyLength = Array.isArray(history) ? history.length : 0
    const validDeck = Array.isArray(deck)
      && deck.length > 0
      && deck.every((entry) => isRecord(entry)
        && typeof entry.sceneId === 'string'
        && Array.isArray(entry.options)
        && entry.options.every((option) => typeof option === 'string'))
    const validRound = Number.isInteger(round) && (round as number) >= 0 && (round as number) < deckLength
    const validHistory = Array.isArray(history)
    const validResult = result === null || isRecord(result)

    if (
      version !== GAME_SESSION_VERSION
      || storedMode !== mode
      || !validDeck
      || !validRound
      || typeof finished !== 'boolean'
      || typeof roundStarted !== 'boolean'
      || !validHistory
      || !validResult
    ) throw new Error('Invalid session')

    const hasProgress = roundStarted || historyLength > 0 || result !== null || finished
    if (!hasProgress) return null

    return {
      round: (round as number) + 1,
      total: deckLength,
      finished,
    }
  } catch {
    removeInvalidSession(storage, key)
    return null
  }
}

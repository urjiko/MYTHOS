import { mythScenes, type MythScene, type Point } from './data'
import { ROUND_DURATION_SECONDS, secondsUntilDeadline } from './gameClock'
import { DEFAULT_ROUND_COUNT, TROJAN_ROUTE_IDS, type GameMode } from './gameDeck'
import { ROUND_MAX_SCORE, SCORE_MAXIMUMS, type ScoreBreakdown } from './scoring'
import { getBrowserStorage, type StorageLike } from './storage'

export const GAME_SESSION_VERSION = 1 as const

export type GameRoundResult = {
  sceneId: string
  breakdown: ScoreBreakdown
  timedOut: boolean
}

export type GameSessionSnapshot = {
  version: typeof GAME_SESSION_VERSION
  mode: GameMode
  deck: Array<{ sceneId: string; options: string[] }>
  round: number
  seconds: number
  answer: string
  guess: Point | null
  cluesUsed: number
  result: ScoreBreakdown | null
  history: GameRoundResult[]
  finished: boolean
  roundStarted: boolean
  timedOut: boolean
  deadlineMs: number | null
  savedAt: number
}

export type RestoredGameSession = Omit<GameSessionSnapshot, 'deck'> & {
  scenes: MythScene[]
}

const sessionKey = (mode: GameMode) => `mythos-game-session-v${GAME_SESSION_VERSION}-${mode}`

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function isInteger(value: unknown): value is number {
  return isFiniteNumber(value) && Number.isInteger(value)
}

function isScoreValue(value: unknown, maximum: number): value is number {
  return isInteger(value) && value >= 0 && value <= maximum
}

function isPoint(value: unknown): value is Point {
  if (!isRecord(value)) return false
  return isFiniteNumber(value.lat)
    && value.lat >= -90
    && value.lat <= 90
    && isFiniteNumber(value.lng)
    && value.lng >= -180
    && value.lng <= 180
}

function isNullableDistance(value: unknown) {
  return value === null || (isFiniteNumber(value) && value >= 0)
}

function isScoreBreakdown(value: unknown): value is ScoreBreakdown {
  if (!isRecord(value)) return false
  const { recognition, geography, speed, oracle, total, distance, scoredDistance } = value
  if (
    !isScoreValue(recognition, SCORE_MAXIMUMS.recognition)
    || !isScoreValue(geography, SCORE_MAXIMUMS.geography)
    || !isScoreValue(speed, SCORE_MAXIMUMS.speed)
    || !isScoreValue(oracle, SCORE_MAXIMUMS.oracle)
    || !isScoreValue(total, ROUND_MAX_SCORE)
  ) return false
  if (!isNullableDistance(distance) || !isNullableDistance(scoredDistance)) return false
  return total === recognition + geography + speed + oracle
}

function isRoundResult(value: unknown): value is GameRoundResult {
  return isRecord(value)
    && typeof value.sceneId === 'string'
    && typeof value.timedOut === 'boolean'
    && isScoreBreakdown(value.breakdown)
}

function hasSameOptions(options: unknown, scene: MythScene): options is string[] {
  if (!Array.isArray(options) || options.some((option) => typeof option !== 'string')) return false
  if (options.length !== scene.options.length || new Set(options).size !== options.length) return false
  const expected = new Set(scene.options)
  return options.every((option) => expected.has(option))
}

export function snapshotGameDeck(scenes: readonly MythScene[]) {
  return scenes.map((scene) => ({ sceneId: scene.id, options: [...scene.options] }))
}

export function restoreGameSession(
  value: unknown,
  expectedMode: GameMode,
  catalog: readonly MythScene[] = mythScenes,
): RestoredGameSession | null {
  if (!isRecord(value) || value.version !== GAME_SESSION_VERSION || value.mode !== expectedMode) return null
  if (!Array.isArray(value.deck) || value.deck.length === 0) return null

  const sceneById = new Map(catalog.map((scene) => [scene.id, scene]))
  const seenSceneIds = new Set<string>()
  const scenes: MythScene[] = []

  for (const entry of value.deck) {
    if (!isRecord(entry) || typeof entry.sceneId !== 'string' || seenSceneIds.has(entry.sceneId)) return null
    const scene = sceneById.get(entry.sceneId)
    if (!scene || !hasSameOptions(entry.options, scene)) return null
    seenSceneIds.add(entry.sceneId)
    scenes.push({ ...scene, options: [...entry.options] })
  }

  const trojanIds = new Set<string>(TROJAN_ROUTE_IDS)
  const expectedDeckSize = expectedMode === 'all'
    ? Math.min(DEFAULT_ROUND_COUNT, catalog.length)
    : expectedMode === 'odyssey'
      ? catalog.filter((scene) => scene.category === 'odyssey').length
      : TROJAN_ROUTE_IDS.length
  if (scenes.length !== expectedDeckSize) return null
  if (expectedMode === 'odyssey' && scenes.some((scene) => scene.category !== 'odyssey')) return null
  if (expectedMode === 'iliad' && scenes.some((scene) => !trojanIds.has(scene.id))) return null

  const {
    round,
    seconds,
    answer,
    guess,
    cluesUsed,
    result,
    history,
    finished,
    roundStarted,
    timedOut,
    deadlineMs,
    savedAt,
  } = value
  if (!isInteger(round) || round < 0 || round >= scenes.length) return null
  if (!isInteger(seconds) || seconds < 0 || seconds > ROUND_DURATION_SECONDS) return null
  if (typeof answer !== 'string') return null
  if (answer && !scenes[round].options.includes(answer)) return null
  if (guess !== null && !isPoint(guess)) return null
  if (!isInteger(cluesUsed) || cluesUsed < 0 || cluesUsed > scenes[round].clues.length) return null
  if (result !== null && !isScoreBreakdown(result)) return null
  if (!Array.isArray(history) || !history.every(isRoundResult)) return null
  if (typeof finished !== 'boolean' || typeof roundStarted !== 'boolean' || typeof timedOut !== 'boolean') return null
  if (deadlineMs !== null && (!isFiniteNumber(deadlineMs) || deadlineMs <= 0)) return null
  if (!isFiniteNumber(savedAt) || savedAt <= 0) return null

  const expectedHistoryLength = finished ? scenes.length : round
  if (history.length !== expectedHistoryLength) return null
  if (history.some((item, index) => item.sceneId !== scenes[index].id)) return null
  if (finished && round !== scenes.length - 1) return null
  if (result !== null && !roundStarted) return null
  if (timedOut && result === null) return null
  if (!roundStarted && deadlineMs !== null) return null
  if (roundStarted && result === null && !finished && deadlineMs === null) return null

  return {
    version: GAME_SESSION_VERSION,
    mode: expectedMode,
    scenes,
    round,
    seconds,
    answer,
    guess,
    cluesUsed,
    result,
    history,
    finished,
    roundStarted,
    timedOut,
    deadlineMs,
    savedAt,
  }
}

export function saveGameSession(
  snapshot: GameSessionSnapshot,
  storage: StorageLike | null = getBrowserStorage(),
) {
  if (!storage) return false
  try {
    storage.setItem(sessionKey(snapshot.mode), JSON.stringify(snapshot))
    return true
  } catch {
    return false
  }
}

export function hasGameSessionProgress(
  snapshot: Pick<GameSessionSnapshot, 'finished' | 'history' | 'result' | 'roundStarted'>,
) {
  return snapshot.roundStarted || snapshot.history.length > 0 || snapshot.result !== null || snapshot.finished
}

export function persistGameSession(
  snapshot: GameSessionSnapshot,
  storage: StorageLike | null = getBrowserStorage(),
) {
  return hasGameSessionProgress(snapshot)
    ? saveGameSession(snapshot, storage)
    : clearGameSession(snapshot.mode, storage)
}

export function loadGameSession(
  mode: GameMode,
  storage: StorageLike | null = getBrowserStorage(),
) {
  if (!storage) return null
  const key = sessionKey(mode)
  try {
    const encoded = storage.getItem(key)
    if (!encoded) return null
    const restored = restoreGameSession(JSON.parse(encoded), mode)
    if (restored) return restored
    storage.removeItem(key)
    return null
  } catch {
    try {
      storage.removeItem(key)
    } catch {
      // Storage can be unavailable in restricted browsing modes.
    }
    return null
  }
}

export function clearGameSession(
  mode: GameMode,
  storage: StorageLike | null = getBrowserStorage(),
) {
  if (!storage) return false
  try {
    storage.removeItem(sessionKey(mode))
    return true
  } catch {
    return false
  }
}

export function gameSessionSummary(
  mode: GameMode,
  storage: StorageLike | null = getBrowserStorage(),
) {
  const session = loadGameSession(mode, storage)
  return session
    ? { round: session.round + 1, total: session.scenes.length, finished: session.finished }
    : null
}

export function restoredSessionSeconds(
  session: Pick<GameSessionSnapshot, 'deadlineMs' | 'finished' | 'result' | 'roundStarted' | 'seconds'>,
  nowMs: number = Date.now(),
) {
  return session.roundStarted && session.deadlineMs && !session.result && !session.finished
    ? secondsUntilDeadline(session.deadlineMs, nowMs)
    : session.seconds
}

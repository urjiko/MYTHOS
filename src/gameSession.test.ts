import { describe, expect, it } from 'vitest'
import { createGameDeck } from './gameDeck'
import {
  GAME_SESSION_VERSION,
  gameSessionSummary,
  loadGameSession,
  persistGameSession,
  restoreGameSession,
  restoredSessionSeconds,
  saveGameSession,
  snapshotGameDeck,
  type GameSessionSnapshot,
} from './gameSession'
import { scoreRound } from './scoring'

function memoryStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial))
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value) },
    removeItem: (key: string) => { values.delete(key) },
    value: (key: string) => values.get(key) ?? null,
  }
}

const scenes = createGameDeck('all', () => 0.5)
const firstBreakdown = scoreRound({
  answer: scenes[0].title,
  correctAnswer: scenes[0].title,
  guess: scenes[0].coordinates,
  target: scenes[0].coordinates,
  fullCreditRadiusKm: scenes[0].accuracyRadiusKm,
  secondsLeft: 40,
  cluesUsed: 1,
})

function validSnapshot(): GameSessionSnapshot {
  return {
    version: GAME_SESSION_VERSION,
    mode: 'all',
    deck: snapshotGameDeck(scenes),
    round: 1,
    seconds: 42,
    answer: scenes[1].options[2],
    guess: { lat: 38.5, lng: 27.1 },
    cluesUsed: 1,
    result: null,
    history: [{ sceneId: scenes[0].id, breakdown: firstBreakdown, timedOut: false }],
    finished: false,
    roundStarted: true,
    timedOut: false,
    deadlineMs: 2_000_000,
    savedAt: 1_950_000,
  }
}

describe('MYTHOS game session recovery', () => {
  it('restores the exact deck, option order, choices, score history, and deadline', () => {
    const restored = restoreGameSession(validSnapshot(), 'all')

    expect(restored?.scenes.map((scene) => scene.id)).toEqual(scenes.map((scene) => scene.id))
    expect(restored?.scenes[1].options).toEqual(scenes[1].options)
    expect(restored?.answer).toBe(scenes[1].options[2])
    expect(restored?.history).toEqual(validSnapshot().history)
    expect(restored?.deadlineMs).toBe(2_000_000)
  })

  it('round-trips through storage and exposes a compact home-page summary', () => {
    const storage = memoryStorage()

    expect(saveGameSession(validSnapshot(), storage)).toBe(true)
    expect(loadGameSession('all', storage)?.round).toBe(1)
    expect(gameSessionSummary('all', storage)).toEqual({ round: 2, total: 6, finished: false })
  })

  it('does not present an untouched loading screen as saved progress', () => {
    const storage = memoryStorage()
    const untouched: GameSessionSnapshot = {
      ...validSnapshot(),
      round: 0,
      seconds: 75,
      answer: '',
      guess: null,
      cluesUsed: 0,
      history: [],
      roundStarted: false,
      deadlineMs: null,
    }

    expect(persistGameSession(untouched, storage)).toBe(true)
    expect(gameSessionSummary('all', storage)).toBeNull()
  })

  it('continues an active deadline instead of resetting the round clock', () => {
    expect(restoredSessionSeconds(validSnapshot(), 1_990_000)).toBe(10)
    expect(restoredSessionSeconds(validSnapshot(), 2_000_001)).toBe(0)
  })

  it('keeps a completed journey available until the player leaves its result screen', () => {
    const completed: GameSessionSnapshot = {
      ...validSnapshot(),
      round: scenes.length - 1,
      seconds: 0,
      answer: scenes.at(-1)?.title ?? '',
      guess: scenes.at(-1)?.coordinates ?? null,
      result: firstBreakdown,
      history: scenes.map((scene) => ({ sceneId: scene.id, breakdown: firstBreakdown, timedOut: false })),
      finished: true,
    }

    expect(restoreGameSession(completed, 'all')?.finished).toBe(true)
    expect(restoredSessionSeconds(completed, 4_000_000)).toBe(0)
  })

  it('rejects another mode, an unknown version, and altered option sets', () => {
    expect(restoreGameSession(validSnapshot(), 'odyssey')).toBeNull()
    expect(restoreGameSession({ ...validSnapshot(), version: 99 }, 'all')).toBeNull()
    expect(restoreGameSession({
      ...validSnapshot(),
      deck: validSnapshot().deck.map((entry, index) => index === 0
        ? { ...entry, options: ['invented answer'] }
        : entry),
    }, 'all')).toBeNull()
  })

  it('rejects impossible progress and active rounds without a deadline', () => {
    expect(restoreGameSession({ ...validSnapshot(), history: [] }, 'all')).toBeNull()
    expect(restoreGameSession({ ...validSnapshot(), deadlineMs: null }, 'all')).toBeNull()
  })

  it('removes malformed storage instead of crashing the game', () => {
    const key = 'mythos-game-session-v1-all'
    const storage = memoryStorage({ [key]: '{not-json' })

    expect(loadGameSession('all', storage)).toBeNull()
    expect(storage.value(key)).toBeNull()
  })

  it('treats blocked storage as a recoverable failure', () => {
    const blockedStorage = {
      getItem: () => { throw new Error('blocked') },
      setItem: () => { throw new Error('blocked') },
      removeItem: () => { throw new Error('blocked') },
    }

    expect(() => loadGameSession('all', blockedStorage)).not.toThrow()
    expect(loadGameSession('all', blockedStorage)).toBeNull()
    expect(() => saveGameSession(validSnapshot(), blockedStorage)).not.toThrow()
    expect(saveGameSession(validSnapshot(), blockedStorage)).toBe(false)
  })
})

import { describe, expect, it } from 'vitest'
import { GAME_SESSION_VERSION, gameSessionKey, gameSessionSummary } from './gameSessionSummary'

function memoryStorage(initial: Record<string, string>) {
  const values = new Map(Object.entries(initial))
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value) },
    removeItem: (key: string) => { values.delete(key) },
    value: (key: string) => values.get(key) ?? null,
  }
}

describe('MYTHOS lightweight session summary', () => {
  it('reads home-page progress without restoring the full scene catalog', () => {
    const key = gameSessionKey('all')
    const storage = memoryStorage({
      [key]: JSON.stringify({
        version: GAME_SESSION_VERSION,
        mode: 'all',
        deck: Array.from({ length: 6 }, (_, index) => ({ sceneId: `scene-${index}`, options: ['A', 'B'] })),
        round: 2,
        finished: false,
        roundStarted: true,
        history: [{ sceneId: 'scene-0' }, { sceneId: 'scene-1' }],
        result: null,
      }),
    })

    expect(gameSessionSummary('all', storage)).toEqual({ round: 3, total: 6, finished: false })
  })

  it('removes malformed previews instead of exposing a broken resume action', () => {
    const key = gameSessionKey('all')
    const storage = memoryStorage({ [key]: '{broken' })

    expect(gameSessionSummary('all', storage)).toBeNull()
    expect(storage.value(key)).toBeNull()
  })
})

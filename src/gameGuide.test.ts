import { describe, expect, it } from 'vitest'
import {
  GAME_GUIDE_STORAGE_KEY,
  GAME_GUIDE_VERSION,
  gameGuideBlocksRoundStart,
  hasSeenGameGuide,
  markGameGuideSeen,
  shouldShowFirstRunGameGuide,
} from './gameGuide'

function memoryStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial))
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value) },
    removeItem: (key: string) => { values.delete(key) },
  }
}

describe('first-run game guide', () => {
  it('appears until the current guide version is completed', () => {
    const storage = memoryStorage()

    expect(shouldShowFirstRunGameGuide(false, storage)).toBe(true)
    expect(markGameGuideSeen(storage)).toBe(true)
    expect(hasSeenGameGuide(storage)).toBe(true)
    expect(storage.getItem(GAME_GUIDE_STORAGE_KEY)).toBe(String(GAME_GUIDE_VERSION))
    expect(shouldShowFirstRunGameGuide(false, storage)).toBe(false)
  })

  it('shows a revised guide when only an older version was completed', () => {
    const storage = memoryStorage({
      [GAME_GUIDE_STORAGE_KEY]: String(GAME_GUIDE_VERSION - 1),
    })

    expect(hasSeenGameGuide(storage)).toBe(false)
    expect(shouldShowFirstRunGameGuide(false, storage)).toBe(true)
  })

  it('never interrupts a restored journey with a first-run briefing', () => {
    expect(shouldShowFirstRunGameGuide(true, memoryStorage())).toBe(false)
  })

  it('blocks only the initial start and never pauses a live round', () => {
    expect(gameGuideBlocksRoundStart('first-run')).toBe(true)
    expect(gameGuideBlocksRoundStart('help')).toBe(false)
    expect(gameGuideBlocksRoundStart(null)).toBe(false)
  })

  it('fails safely when browser storage is blocked', () => {
    const blocked = {
      getItem: () => { throw new Error('blocked') },
      setItem: () => { throw new Error('blocked') },
      removeItem: () => { throw new Error('blocked') },
    }

    expect(hasSeenGameGuide(blocked)).toBe(false)
    expect(markGameGuideSeen(blocked)).toBe(false)
    expect(shouldShowFirstRunGameGuide(false, blocked)).toBe(true)
  })
})

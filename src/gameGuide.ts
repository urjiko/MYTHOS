import { getBrowserStorage, readStoredValue, type StorageLike, writeStoredValue } from './storage'

export const GAME_GUIDE_VERSION = 1 as const
export const GAME_GUIDE_STORAGE_KEY = 'mythos-game-guide-version'

export type GameGuideMode = 'first-run' | 'help'

export function hasSeenGameGuide(
  storage: StorageLike | null = getBrowserStorage(),
) {
  return readStoredValue(GAME_GUIDE_STORAGE_KEY, storage) === String(GAME_GUIDE_VERSION)
}

export function markGameGuideSeen(
  storage: StorageLike | null = getBrowserStorage(),
) {
  return writeStoredValue(GAME_GUIDE_STORAGE_KEY, String(GAME_GUIDE_VERSION), storage)
}

export function shouldShowFirstRunGameGuide(
  hasRestoredSession: boolean,
  storage: StorageLike | null = getBrowserStorage(),
) {
  return !hasRestoredSession && !hasSeenGameGuide(storage)
}

export function gameGuideBlocksRoundStart(mode: GameGuideMode | null) {
  return mode === 'first-run'
}

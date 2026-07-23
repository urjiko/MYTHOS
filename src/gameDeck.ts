import { mythScenes, type MythScene } from './data'

export type GameMode = 'all' | 'odyssey' | 'iliad'

export const DEFAULT_ROUND_COUNT = 6
export const TROJAN_ROUTE_IDS = [
  'judgement-paris',
  'iphigenia-aulis',
  'hector-andromache',
  'patroclus-falls',
  'achilles-hector',
  'priam-achilles',
] as const

const trojanRouteIds = new Set<string>(TROJAN_ROUTE_IDS)

export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }
  return shuffled
}

export function createGameDeck(
  mode: GameMode,
  random: () => number = Math.random,
): MythScene[] {
  const pool = mode === 'odyssey'
    ? mythScenes.filter((scene) => scene.category === 'odyssey')
    : mode === 'iliad'
      ? mythScenes.filter((scene) => trojanRouteIds.has(scene.id))
      : mythScenes
  const roundCount = mode === 'all'
    ? Math.min(DEFAULT_ROUND_COUNT, pool.length)
    : pool.length

  return shuffle(pool, random)
    .slice(0, roundCount)
    .map((scene) => ({ ...scene, options: shuffle(scene.options, random) }))
}

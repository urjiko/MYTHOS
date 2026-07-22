import { mythScenes, type MythScene } from './data'

export type GameMode = 'all' | 'odyssey'

export const DEFAULT_ROUND_COUNT = 6

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
    : mythScenes
  const roundCount = mode === 'odyssey'
    ? pool.length
    : Math.min(DEFAULT_ROUND_COUNT, pool.length)

  return shuffle(pool, random)
    .slice(0, roundCount)
    .map((scene) => ({ ...scene, options: shuffle(scene.options, random) }))
}

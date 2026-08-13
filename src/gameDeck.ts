import './registerDaidalosIkaros'
import './registerPrometheusBound'
import './registerFiveIconicMyths'
import { mythScenes, type MythScene } from './data'
import { DEFAULT_ROUND_COUNT, HIPPOLYTA_ROUTE_IDS, TROJAN_ROUTE_IDS, type GameMode } from './gameConfig'

export { DEFAULT_ROUND_COUNT, HIPPOLYTA_ROUTE_IDS, TROJAN_ROUTE_IDS, type GameMode } from './gameConfig'

const trojanRouteIds = new Set<string>(TROJAN_ROUTE_IDS)
const hippolytaRouteIds = new Set<string>(HIPPOLYTA_ROUTE_IDS)

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
      : mode === 'hippolyta'
        ? mythScenes.filter((scene) => hippolytaRouteIds.has(scene.id))
      : mythScenes
  const roundCount = mode === 'all'
    ? Math.min(DEFAULT_ROUND_COUNT, pool.length)
    : pool.length

  const orderedPool = mode === 'hippolyta' ? pool : shuffle(pool, random)

  return orderedPool
    .slice(0, roundCount)
    .map((scene) => ({ ...scene, options: shuffle(scene.options, random) }))
}

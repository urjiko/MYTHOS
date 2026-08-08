import type { FigureCategory } from './figures'
import type { GameMode } from './gameDeck'

export type AppRoute =
  | { view: 'home' }
  | { view: 'about' }
  | { view: 'atlas' }
  | { view: 'archive' }
  | { view: 'game'; mode: GameMode }
  | { view: 'figures'; category: FigureCategory; figureId?: string }

const gameModes = new Set<GameMode>(['all', 'odyssey', 'iliad'])
const figureCategories = new Set<FigureCategory>(['heroes', 'creatures'])

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return undefined
  }
}

export function parseAppRoute(hash: string): AppRoute {
  const path = hash.replace(/^#/, '').replace(/^\/+/, '')

  if (!path) return { view: 'home' }
  if (path === 'manifesto' || path === 'about' || path === 'about/') return { view: 'about' }

  const segments = path.split('/').filter(Boolean)
  if (segments.length === 1) {
    if (segments[0] === 'atlas') return { view: 'atlas' }
    if (segments[0] === 'archive') return { view: 'archive' }
    if (segments[0] === 'home') return { view: 'home' }
    return { view: 'home' }
  }

  if (segments[0] === 'game' && segments.length === 2 && gameModes.has(segments[1] as GameMode)) {
    return { view: 'game', mode: segments[1] as GameMode }
  }

  if (
    segments[0] === 'figures'
    && (segments.length === 2 || segments.length === 3)
    && figureCategories.has(segments[1] as FigureCategory)
  ) {
    const figureId = segments[2] ? safeDecode(segments[2]) : undefined
    return figureId
      ? { view: 'figures', category: segments[1] as FigureCategory, figureId }
      : { view: 'figures', category: segments[1] as FigureCategory }
  }

  return { view: 'home' }
}

export function appRouteToHash(route: AppRoute) {
  switch (route.view) {
    case 'home':
      return '#/'
    case 'about':
      return '#/about'
    case 'atlas':
      return '#/atlas'
    case 'archive':
      return '#/archive'
    case 'game':
      return `#/game/${route.mode}`
    case 'figures':
      return route.figureId
        ? `#/figures/${route.category}/${encodeURIComponent(route.figureId)}`
        : `#/figures/${route.category}`
  }
}

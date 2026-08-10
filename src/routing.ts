import type { FigureCategory } from './figures'
import type { GameMode } from './gameDeck'
import { ui, type Locale } from './i18n'

export type AppRoute =
  | { view: 'home' }
  | { view: 'about' }
  | { view: 'atlas' }
  | { view: 'archive'; sceneId?: string }
  | { view: 'game'; mode: GameMode }
  | { view: 'figures'; category: FigureCategory; figureId?: string }

const gameModes = new Set<GameMode>(['all', 'odyssey', 'iliad', 'hippolyta'])
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

  if (segments[0] === 'archive' && segments.length === 2) {
    const sceneId = safeDecode(segments[1])
    return sceneId ? { view: 'archive', sceneId } : { view: 'home' }
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
      return route.sceneId ? `#/archive/${encodeURIComponent(route.sceneId)}` : '#/archive'
    case 'game':
      return `#/game/${route.mode}`
    case 'figures':
      return route.figureId
        ? `#/figures/${route.category}/${encodeURIComponent(route.figureId)}`
        : `#/figures/${route.category}`
  }
}

export function appRouteTitle(route: AppRoute, locale: Locale) {
  const titles = ui[locale].titles

  switch (route.view) {
    case 'home':
      return titles.home
    case 'about':
      return titles.about
    case 'atlas':
      return titles.atlas
    case 'archive':
      return titles.archive
    case 'game':
      return route.mode === 'odyssey'
        ? titles.odyssey
        : route.mode === 'iliad'
          ? titles.iliad
          : route.mode === 'hippolyta'
            ? titles.hippolyta
          : titles.classic
    case 'figures':
      return route.category === 'heroes' ? titles.heroes : titles.creatures
  }
}

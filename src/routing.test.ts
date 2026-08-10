import { describe, expect, it } from 'vitest'
import { appRouteTitle, appRouteToHash, parseAppRoute, type AppRoute } from './routing'

describe('MYTHOS routes', () => {
  it.each(['', '#', '#/', '#/home', '#/unknown'])('falls back to home for %s', (hash) => {
    expect(parseAppRoute(hash)).toEqual({ view: 'home' })
  })

  it('keeps the old manifesto bookmark working', () => {
    expect(parseAppRoute('#manifesto')).toEqual({ view: 'about' })
  })

  it.each<AppRoute>([
    { view: 'home' },
    { view: 'about' },
    { view: 'atlas' },
    { view: 'archive' },
    { view: 'archive', sceneId: 'scylla & charybdis' },
    { view: 'game', mode: 'all' },
    { view: 'game', mode: 'odyssey' },
    { view: 'game', mode: 'iliad' },
    { view: 'game', mode: 'hippolyta' },
    { view: 'figures', category: 'heroes' },
    { view: 'figures', category: 'creatures', figureId: 'scylla & charybdis' },
  ])('round-trips $view routes', (route) => {
    expect(parseAppRoute(appRouteToHash(route))).toEqual(route)
  })

  it('rejects unsupported game modes and figure categories', () => {
    expect(parseAppRoute('#/game/troy')).toEqual({ view: 'home' })
    expect(parseAppRoute('#/figures/gods')).toEqual({ view: 'home' })
    expect(parseAppRoute('#/archive/story/extra')).toEqual({ view: 'home' })
  })

  it('provides localised document titles for every route family', () => {
    expect(appRouteTitle({ view: 'home' }, 'en')).toBe('MYTHOS · Explore Greek mythology')
    expect(appRouteTitle({ view: 'archive' }, 'tr')).toBe('Mit Arşivi · MYTHOS')
    expect(appRouteTitle({ view: 'game', mode: 'odyssey' }, 'en')).toBe('Odysseus’s Route · MYTHOS')
    expect(appRouteTitle({ view: 'game', mode: 'hippolyta' }, 'tr')).toBe('Hippolyta’nın Kuşağı · MYTHOS')
    expect(appRouteTitle({ view: 'figures', category: 'creatures' }, 'tr')).toBe('Yaratıklar · MYTHOS')
  })
})

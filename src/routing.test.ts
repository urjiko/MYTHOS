import { describe, expect, it } from 'vitest'
import { appRouteToHash, parseAppRoute, type AppRoute } from './routing'

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
    { view: 'game', mode: 'all' },
    { view: 'game', mode: 'odyssey' },
    { view: 'game', mode: 'iliad' },
    { view: 'figures', category: 'heroes' },
    { view: 'figures', category: 'creatures', figureId: 'scylla & charybdis' },
  ])('round-trips $view routes', (route) => {
    expect(parseAppRoute(appRouteToHash(route))).toEqual(route)
  })

  it('rejects unsupported game modes and figure categories', () => {
    expect(parseAppRoute('#/game/troy')).toEqual({ view: 'home' })
    expect(parseAppRoute('#/figures/gods')).toEqual({ view: 'home' })
  })
})

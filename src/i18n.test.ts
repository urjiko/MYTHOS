import { describe, expect, it } from 'vitest'
import { localiseMythTitle, resolveLocale } from './i18n'

describe('MYTHOS locale resolution', () => {
  it('uses a saved manual choice before browser preferences', () => {
    expect(resolveLocale(['tr-TR', 'en-US'], 'en')).toBe('en')
    expect(resolveLocale(['en-US'], 'tr')).toBe('tr')
  })

  it('detects Turkish and otherwise falls back safely to English', () => {
    expect(resolveLocale(['tr-TR', 'en-US'], null)).toBe('tr')
    expect(resolveLocale(['de-DE', 'fr-FR'], null)).toBe('en')
    expect(resolveLocale([], null)).toBe('en')
  })

  it('localises archive myth titles without changing the canonical answer value', () => {
    expect(localiseMythTitle('Orpheus and Eurydice', 'tr')).toBe('Orpheus ve Eurydike')
    expect(localiseMythTitle('Orpheus and Eurydice', 'en')).toBe('Orpheus and Eurydice')
  })
})

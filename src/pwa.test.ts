import { describe, expect, it } from 'vitest'
import { isAppleMobileDevice, isStandaloneApp } from './pwa'

describe('MYTHOS install targeting', () => {
  it('recognises iPhone and touch-enabled iPad desktop user agents', () => {
    expect(isAppleMobileDevice({ userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)' })).toBe(true)
    expect(isAppleMobileDevice({ userAgent: 'Mozilla/5.0 (Macintosh)', platform: 'MacIntel', maxTouchPoints: 5 })).toBe(true)
  })

  it('does not show iPhone instructions on Android or desktop Mac', () => {
    expect(isAppleMobileDevice({ userAgent: 'Mozilla/5.0 (Linux; Android 15)', platform: 'Linux armv8l', maxTouchPoints: 5 })).toBe(false)
    expect(isAppleMobileDevice({ userAgent: 'Mozilla/5.0 (Macintosh)', platform: 'MacIntel', maxTouchPoints: 0 })).toBe(false)
  })

  it('recognises both standards-based and legacy iOS standalone launches', () => {
    expect(isStandaloneApp(true, false)).toBe(true)
    expect(isStandaloneApp(false, true)).toBe(true)
    expect(isStandaloneApp(false, false)).toBe(false)
  })
})

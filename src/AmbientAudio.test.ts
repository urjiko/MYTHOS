import { describe, expect, it } from 'vitest'
import { resolveAmbientAudioEnabled } from './AmbientAudio'

describe('ambient audio preference', () => {
  it('offers music by default and preserves an explicit mute', () => {
    expect(resolveAmbientAudioEnabled(null)).toBe(true)
    expect(resolveAmbientAudioEnabled('enabled')).toBe(true)
    expect(resolveAmbientAudioEnabled('muted')).toBe(false)
  })
})

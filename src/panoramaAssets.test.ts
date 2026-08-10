import { describe, expect, it } from 'vitest'
import {
  PANORAMA_LOAD_TIMEOUT_MS,
  panoramaPreviewPath,
  panoramaTexturePath,
  preferredPanoramaQuality,
} from './panoramaAssets'

describe('panorama asset delivery', () => {
  it('maps a source panorama to its generated lightweight preview', () => {
    expect(panoramaPreviewPath('./assets/scene-labyrinth.webp'))
      .toBe('./assets/previews/scene-labyrinth.webp')
  })

  it('does not rewrite flat art or unrecognised paths', () => {
    expect(panoramaPreviewPath('./assets/hero-olympus.webp'))
      .toBe('./assets/hero-olympus.webp')
    expect(panoramaPreviewPath('https://example.com/scene-labyrinth.webp'))
      .toBe('https://example.com/scene-labyrinth.webp')
  })

  it('maps source panoramas to the 2K mobile delivery set', () => {
    expect(panoramaTexturePath('./assets/scene-labyrinth.webp', 'mobile'))
      .toBe('./assets/mobile/scene-labyrinth.webp')
    expect(panoramaTexturePath('./assets/scene-labyrinth.webp', 'source'))
      .toBe('./assets/scene-labyrinth.webp')
    expect(panoramaTexturePath('./assets/hero-olympus.webp', 'mobile'))
      .toBe('./assets/hero-olympus.webp')
  })

  it('chooses mobile textures for phones, tablets, data saving, and low-memory devices', () => {
    expect(preferredPanoramaQuality({ viewportWidth: 430 })).toBe('mobile')
    expect(preferredPanoramaQuality({ viewportWidth: 1_024, coarsePointer: true })).toBe('mobile')
    expect(preferredPanoramaQuality({ viewportWidth: 1_440, saveData: true })).toBe('mobile')
    expect(preferredPanoramaQuality({ viewportWidth: 1_440, deviceMemory: 4 })).toBe('mobile')
    expect(preferredPanoramaQuality({ viewportWidth: 1_440, deviceMemory: 8 })).toBe('source')
  })

  it('uses a bounded load deadline so a texture cannot stop a round indefinitely', () => {
    expect(PANORAMA_LOAD_TIMEOUT_MS).toBeGreaterThanOrEqual(8_000)
    expect(PANORAMA_LOAD_TIMEOUT_MS).toBeLessThanOrEqual(15_000)
  })
})

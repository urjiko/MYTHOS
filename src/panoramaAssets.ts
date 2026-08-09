const PANORAMA_SOURCE_PREFIX = './assets/'
const PANORAMA_PREVIEW_PREFIX = './assets/previews/'
const PANORAMA_MOBILE_PREFIX = './assets/mobile/'
const PANORAMA_FILENAME = /^scene-[a-z0-9-]+\.webp$/

export const PANORAMA_LOAD_TIMEOUT_MS = 12_000

export type PanoramaQuality = 'source' | 'mobile'

export type PanoramaDeliveryContext = {
  viewportWidth: number
  coarsePointer?: boolean
  saveData?: boolean
  deviceMemory?: number
}

export function preferredPanoramaQuality({
  viewportWidth,
  coarsePointer = false,
  saveData = false,
  deviceMemory,
}: PanoramaDeliveryContext): PanoramaQuality {
  if (saveData) return 'mobile'
  if (viewportWidth <= 760) return 'mobile'
  if (coarsePointer && viewportWidth <= 1_180) return 'mobile'
  if (deviceMemory !== undefined && deviceMemory > 0 && deviceMemory <= 4) return 'mobile'
  return 'source'
}

export function panoramaTexturePath(source: string, quality: PanoramaQuality) {
  if (quality === 'source' || !source.startsWith(PANORAMA_SOURCE_PREFIX)) return source

  const filename = source.slice(PANORAMA_SOURCE_PREFIX.length)
  return PANORAMA_FILENAME.test(filename)
    ? `${PANORAMA_MOBILE_PREFIX}${filename}`
    : source
}

export function panoramaPreviewPath(source: string) {
  if (!source.startsWith(PANORAMA_SOURCE_PREFIX)) return source

  const filename = source.slice(PANORAMA_SOURCE_PREFIX.length)
  return PANORAMA_FILENAME.test(filename)
    ? `${PANORAMA_PREVIEW_PREFIX}${filename}`
    : source
}

import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

export const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const SOURCE_DIRECTORY = path.join(PROJECT_ROOT, 'public', 'assets')
export const PREVIEW_DIRECTORY = path.join(SOURCE_DIRECTORY, 'previews')
export const PREVIEW_MANIFEST = path.join(PREVIEW_DIRECTORY, 'manifest.json')
export const MOBILE_DIRECTORY = path.join(SOURCE_DIRECTORY, 'mobile')
export const MOBILE_MANIFEST = path.join(MOBILE_DIRECTORY, 'manifest.json')

export const SOURCE_CONTRACT = Object.freeze({
  width: 4_096,
  height: 2_048,
  minimumBytes: 250 * 1_024,
  maximumBytes: 2.5 * 1_024 * 1_024,
  maximumCollectionBytes: 42 * 1_024 * 1_024,
  maximumSeamMae: 22,
  reviewSeamMae: 14,
})

export const PREVIEW_CONTRACT = Object.freeze({
  width: 1_024,
  height: 512,
  minimumBytes: 12 * 1_024,
  maximumBytes: 180 * 1_024,
})

export const MOBILE_CONTRACT = Object.freeze({
  width: 2_048,
  height: 1_024,
  minimumBytes: 30 * 1_024,
  maximumBytes: 600 * 1_024,
  maximumCollectionBytes: 12 * 1_024 * 1_024,
})

export const PREVIEW_MANIFEST_VERSION = 1
export const MOBILE_MANIFEST_VERSION = 1

export function isPanoramaFilename(filename) {
  return /^scene-[a-z0-9-]+\.webp$/.test(filename)
}

export async function listPanoramaFilenames(directory = SOURCE_DIRECTORY) {
  return (await readdir(directory))
    .filter(isPanoramaFilename)
    .sort((left, right) => left.localeCompare(right))
}

export async function sha256(filename) {
  return createHash('sha256').update(await readFile(filename)).digest('hex')
}

export async function inspectImage(filename, { includeSeam = false } = {}) {
  const image = sharp(filename)
  const metadata = await image.metadata()
  const result = {
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
    format: metadata.format ?? 'unknown',
    space: metadata.space ?? 'unknown',
    bytes: (await readFile(filename)).byteLength,
  }

  if (!includeSeam || !metadata.width || !metadata.height) return result

  const { data, info } = await image.removeAlpha().raw().toBuffer({ resolveWithObject: true })
  let difference = 0
  let samples = 0

  for (let y = 0; y < info.height; y += 4) {
    const rowStart = y * info.width * info.channels
    const rightPixel = rowStart + (info.width - 1) * info.channels
    for (let channel = 0; channel < info.channels; channel += 1) {
      difference += Math.abs(data[rowStart + channel] - data[rightPixel + channel])
      samples += 1
    }
  }

  return {
    ...result,
    seamMae: samples === 0 ? 0 : difference / samples,
  }
}

export async function mapWithConcurrency(items, concurrency, task) {
  const results = new Array(items.length)
  let nextIndex = 0

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex
      nextIndex += 1
      results[index] = await task(items[index], index)
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  )
  return results
}

export function formatMebibytes(bytes) {
  return `${(bytes / 1_024 / 1_024).toFixed(1)} MiB`
}

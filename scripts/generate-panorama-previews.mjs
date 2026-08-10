import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import {
  PREVIEW_CONTRACT,
  PREVIEW_DIRECTORY,
  PREVIEW_MANIFEST,
  PREVIEW_MANIFEST_VERSION,
  SOURCE_DIRECTORY,
  listPanoramaFilenames,
  mapWithConcurrency,
  sha256,
} from './panorama-assets.mjs'

const filenames = await listPanoramaFilenames()
await mkdir(PREVIEW_DIRECTORY, { recursive: true })

const assets = await mapWithConcurrency(filenames, 4, async (filename) => {
  const source = path.join(SOURCE_DIRECTORY, filename)
  const preview = path.join(PREVIEW_DIRECTORY, filename)

  await sharp(source)
    .resize(PREVIEW_CONTRACT.width, PREVIEW_CONTRACT.height, {
      fit: 'fill',
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 0.55, m1: 0.7, m2: 1.2 })
    .webp({ quality: 70, effort: 6, smartSubsample: true })
    .toFile(preview)

  return [filename, {
    sourceSha256: await sha256(source),
    previewSha256: await sha256(preview),
  }]
})

await writeFile(PREVIEW_MANIFEST, `${JSON.stringify({
  version: PREVIEW_MANIFEST_VERSION,
  generatedBy: 'npm run generate:panorama-previews',
  assets: Object.fromEntries(assets),
}, null, 2)}\n`)

console.log(`Generated ${filenames.length} panorama previews at ${PREVIEW_CONTRACT.width}×${PREVIEW_CONTRACT.height}.`)

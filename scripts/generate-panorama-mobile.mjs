import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import {
  MOBILE_CONTRACT,
  MOBILE_DIRECTORY,
  MOBILE_MANIFEST,
  MOBILE_MANIFEST_VERSION,
  SOURCE_DIRECTORY,
  listPanoramaFilenames,
  mapWithConcurrency,
  sha256,
} from './panorama-assets.mjs'

const filenames = await listPanoramaFilenames()
await mkdir(MOBILE_DIRECTORY, { recursive: true })

const assets = await mapWithConcurrency(filenames, 4, async (filename) => {
  const source = path.join(SOURCE_DIRECTORY, filename)
  const mobile = path.join(MOBILE_DIRECTORY, filename)

  await sharp(source)
    .resize(MOBILE_CONTRACT.width, MOBILE_CONTRACT.height, {
      fit: 'fill',
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 0.45, m1: 0.6, m2: 1 })
    .webp({ quality: 76, effort: 6, smartSubsample: true })
    .toFile(mobile)

  return [filename, {
    sourceSha256: await sha256(source),
    mobileSha256: await sha256(mobile),
  }]
})

await writeFile(MOBILE_MANIFEST, `${JSON.stringify({
  version: MOBILE_MANIFEST_VERSION,
  generatedBy: 'npm run generate:panorama-mobile',
  assets: Object.fromEntries(assets),
}, null, 2)}\n`)

console.log(`Generated ${filenames.length} mobile panoramas at ${MOBILE_CONTRACT.width}×${MOBILE_CONTRACT.height}.`)

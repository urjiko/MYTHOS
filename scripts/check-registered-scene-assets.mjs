import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const REGISTER_FILE = path.join(PROJECT_ROOT, 'src', 'registerDaidalosIkaros.ts')
const EXPECTED_IMAGE = './assets/registered/scene-daidalos-ikaros-native.webp'
const ASSET_FILE = path.join(PROJECT_ROOT, 'public', 'assets', 'registered', 'scene-daidalos-ikaros-native.webp')
const errors = []

function assert(condition, message) {
  if (!condition) errors.push(message)
}

const registration = await readFile(REGISTER_FILE, 'utf8')
assert(
  registration.includes(`image: '${EXPECTED_IMAGE}'`),
  `Daidalos must reference ${EXPECTED_IMAGE}`,
)

try {
  const bytes = (await stat(ASSET_FILE)).size
  const image = sharp(ASSET_FILE)
  const metadata = await image.metadata()
  const { data, info } = await image.removeAlpha().raw().toBuffer({ resolveWithObject: true })

  let difference = 0
  let samples = 0
  for (let y = 0; y < info.height; y += 4) {
    const left = y * info.width * info.channels
    const right = left + (info.width - 1) * info.channels
    for (let channel = 0; channel < Math.min(3, info.channels); channel += 1) {
      difference += Math.abs(data[left + channel] - data[right + channel])
      samples += 1
    }
  }
  const seamMae = samples ? difference / samples : 0
  const width = metadata.width ?? 0
  const height = metadata.height ?? 0
  const ratio = height ? width / height : 0

  assert(metadata.format === 'webp', `Daidalos source must be WebP; received ${metadata.format}`)
  assert(metadata.space === 'srgb', `Daidalos source must use sRGB; received ${metadata.space}`)
  assert(width === 1774 && height === 887, `Daidalos source must preserve its native 1774×887 generation; received ${width}×${height}`)
  assert(Math.abs(ratio - 2) < 0.001, `Daidalos source must remain 2:1 equirectangular; received ${ratio.toFixed(4)}:1`)
  assert(bytes >= 300 * 1024, `Daidalos source is suspiciously small at ${bytes} bytes`)
  assert(bytes <= 1024 * 1024, `Daidalos source exceeds the 1 MiB web budget at ${bytes} bytes`)
  assert(seamMae <= 22, `Daidalos source has a left/right seam MAE of ${seamMae.toFixed(2)}; maximum is 22`)

  if (errors.length === 0) {
    console.log(`Daidalos registered panorama passed: ${width}×${height}, ${(bytes / 1024).toFixed(0)} KiB, seam MAE ${seamMae.toFixed(2)}.`)
  }
} catch (error) {
  errors.push(`Daidalos native source is missing or unreadable: ${error instanceof Error ? error.message : String(error)}`)
}

if (errors.length > 0) {
  console.error(`Registered scene asset contract failed (${errors.length}):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
}

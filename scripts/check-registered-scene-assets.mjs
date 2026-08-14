import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC_DIR = path.join(PROJECT_ROOT, 'src')
const ASSET_DIR = path.join(PROJECT_ROOT, 'public', 'assets', 'registered')
const errors = []

function assert(condition, message) {
  if (!condition) errors.push(message)
}

async function inspectSceneImage(filename) {
  const fullPath = path.join(ASSET_DIR, filename)
  let info
  let bytes = 0
  try {
    bytes = (await stat(fullPath)).size
    const image = sharp(fullPath)
    const metadata = await image.metadata()
    const { data, info: rawInfo } = await image.removeAlpha().raw().toBuffer({ resolveWithObject: true })
    let difference = 0
    let samples = 0
    for (let y = 0; y < rawInfo.height; y += 4) {
      const rowStart = y * rawInfo.width * rawInfo.channels
      const rightPixel = rowStart + (rawInfo.width - 1) * rawInfo.channels
      for (let channel = 0; channel < rawInfo.channels; channel += 1) {
        difference += Math.abs(data[rowStart + channel] - data[rightPixel + channel])
        samples += 1
      }
    }
    info = {
      format: metadata.format,
      space: metadata.space,
      width: metadata.width ?? 0,
      height: metadata.height ?? 0,
      seamMae: samples === 0 ? 0 : difference / samples,
    }
  } catch (error) {
    errors.push(`${filename} is missing or unreadable: ${error instanceof Error ? error.message : String(error)}`)
    return
  }

  assert(info.format === 'heif', `${filename} must be AVIF/HEIF; received ${info.format}`)
  assert(info.space === 'srgb', `${filename} must use sRGB; received ${info.space}`)
  assert(info.width === 4096 && info.height === 2048, `${filename} must be 4096×2048; received ${info.width}×${info.height}`)
  assert(bytes >= 96 * 1024, `${filename} is suspiciously small at ${bytes} bytes`)
  assert(bytes <= 1024 * 1024, `${filename} exceeds the 1 MiB source budget`)
  assert(info.seamMae <= 22, `${filename} has a left/right seam MAE of ${info.seamMae.toFixed(2)}; maximum is 22`)
}

const registrationRoots = ['archive.ts', 'gameDeck.ts']
const activeRegisterFiles = new Set()
for (const root of registrationRoots) {
  const source = await readFile(path.join(SRC_DIR, root), 'utf8')
  for (const match of source.matchAll(/import\s+['"]\.\/(register[^'"]+)['"]/g)) {
    activeRegisterFiles.add(`${match[1]}.ts`)
  }
}

const referenced = new Set()
for (const filename of [...activeRegisterFiles].sort()) {
  const source = await readFile(path.join(SRC_DIR, filename), 'utf8')
  assert(!/image\s*:\s*`?data:image/i.test(source), `${filename} embeds a data:image asset; active registered scenes must use static high-resolution files`)

  const scenes = [...source.matchAll(/id:\s*'([^']+)'[\s\S]*?image:\s*'([^']+)'/g)]
  for (const [, id, imagePath] of scenes) {
    if (id === 'prometheus-bound') continue // Existing Prometheus AVIF follows its earlier reviewed asset path.
    const expectedPath = `./assets/registered/scene-${id}.avif`
    assert(imagePath === expectedPath, `${filename}:${id} must reference ${expectedPath}; received ${imagePath}`)
    if (imagePath === expectedPath) referenced.add(`scene-${id}.avif`)
  }
}

let files = []
try {
  files = (await readdir(ASSET_DIR)).filter((name) => /^scene-[a-z0-9-]+\.avif$/.test(name)).sort()
} catch (error) {
  errors.push(`Registered asset directory is missing or unreadable: ${error instanceof Error ? error.message : String(error)}`)
}

const expected = [...referenced].sort()
const missing = expected.filter((name) => !files.includes(name))
const unexpected = files.filter((name) => !referenced.has(name))
assert(missing.length === 0, `Registered assets missing: ${missing.join(', ')}`)
assert(unexpected.length === 0, `Registered assets unexpected: ${unexpected.join(', ')}`)

for (const filename of expected) await inspectSceneImage(filename)

if (errors.length > 0) {
  console.error(`Registered scene asset contract failed (${errors.length}):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  console.log(`Registered scene assets passed: ${expected.length} high-resolution panorama${expected.length === 1 ? '' : 's'}.`)
}

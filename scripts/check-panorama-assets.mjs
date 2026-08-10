import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import {
  MOBILE_CONTRACT,
  MOBILE_DIRECTORY,
  MOBILE_MANIFEST,
  MOBILE_MANIFEST_VERSION,
  PREVIEW_CONTRACT,
  PREVIEW_DIRECTORY,
  PREVIEW_MANIFEST,
  PREVIEW_MANIFEST_VERSION,
  PROJECT_ROOT,
  SOURCE_CONTRACT,
  SOURCE_DIRECTORY,
  formatMebibytes,
  inspectImage,
  isPanoramaFilename,
  listPanoramaFilenames,
  mapWithConcurrency,
  sha256,
} from './panorama-assets.mjs'

const errors = []
const trackedReviews = []
const REVIEW_DECISIONS = new Set(['keep', 'replace-next', 'replace-later'])

function assert(condition, message) {
  if (!condition) errors.push(message)
}

function difference(left, right) {
  const rightSet = new Set(right)
  return left.filter((value) => !rightSet.has(value))
}

function assertSameSet(label, expected, actual) {
  const missing = difference(expected, actual)
  const unexpected = difference(actual, expected)
  assert(missing.length === 0, `${label} missing: ${missing.join(', ')}`)
  assert(unexpected.length === 0, `${label} unexpected: ${unexpected.join(', ')}`)
}

function validateImage(label, image, contract) {
  assert(image.format === 'webp', `${label} must be WebP; received ${image.format}`)
  assert(image.space === 'srgb', `${label} must use sRGB; received ${image.space}`)
  assert(
    image.width === contract.width && image.height === contract.height,
    `${label} must be ${contract.width}×${contract.height}; received ${image.width}×${image.height}`,
  )
  assert(
    image.bytes >= contract.minimumBytes,
    `${label} is suspiciously small at ${image.bytes} bytes`,
  )
  assert(
    image.bytes <= contract.maximumBytes,
    `${label} exceeds the ${Math.round(contract.maximumBytes / 1_024)} KiB budget`,
  )
}

const dataSource = await readFile(path.join(PROJECT_ROOT, 'src', 'data.ts'), 'utf8')
const promptSource = await readFile(path.join(PROJECT_ROOT, 'docs', 'ASSET_PROMPTS.md'), 'utf8')
let reviewBaseline
try {
  reviewBaseline = JSON.parse(
    await readFile(path.join(PROJECT_ROOT, 'docs', 'PANORAMA_REVIEW.json'), 'utf8'),
  )
} catch (error) {
  errors.push(`Panorama review baseline is missing or invalid: ${error instanceof Error ? error.message : String(error)}`)
  reviewBaseline = { version: null, assets: {} }
}
const sceneEntries = [...dataSource.matchAll(
  /\{\s*\n\s*id:\s*'([^']+)'[\s\S]*?\n\s*image:\s*'\.\/assets\/([^']+)'/g,
)].map((match) => ({ id: match[1], filename: match[2] }))
const referencedFilenames = sceneEntries.map(({ filename }) => filename).sort()
const promptFilenames = [...promptSource.matchAll(/^## `([^`]+\.webp)`/gm)]
  .map((match) => match[1])
  .filter(isPanoramaFilename)
  .sort()
const sourceFilenames = await listPanoramaFilenames()
let previewFilenames = []
let mobileFilenames = []
try {
  previewFilenames = (await readdir(PREVIEW_DIRECTORY))
    .filter(isPanoramaFilename)
    .sort()
} catch (error) {
  errors.push(`Preview directory is missing or unreadable: ${error instanceof Error ? error.message : String(error)}`)
}
const previewFilenameSet = new Set(previewFilenames)
try {
  mobileFilenames = (await readdir(MOBILE_DIRECTORY))
    .filter(isPanoramaFilename)
    .sort()
} catch (error) {
  errors.push(`Mobile panorama directory is missing or unreadable: ${error instanceof Error ? error.message : String(error)}`)
}
const mobileFilenameSet = new Set(mobileFilenames)

assert(sceneEntries.length > 0, 'No panorama references were found in src/data.ts')
assert(
  new Set(referencedFilenames).size === referencedFilenames.length,
  'src/data.ts contains duplicate panorama references',
)
sceneEntries.forEach(({ id, filename }) => {
  assert(filename === `scene-${id}.webp`, `${id} must reference scene-${id}.webp; received ${filename}`)
})
assertSameSet('Source assets', referencedFilenames, sourceFilenames)
assertSameSet('Preview assets', referencedFilenames, previewFilenames)
assertSameSet('Mobile assets', referencedFilenames, mobileFilenames)
assertSameSet('Prompt documentation', referencedFilenames, promptFilenames)
assert(reviewBaseline.version === 1, 'Panorama review baseline must use version 1')
const unexpectedReviewEntries = difference(Object.keys(reviewBaseline.assets ?? {}), sourceFilenames)
assert(
  unexpectedReviewEntries.length === 0,
  `Panorama review baseline contains unknown assets: ${unexpectedReviewEntries.join(', ')}`,
)

let manifest
try {
  manifest = JSON.parse(await readFile(PREVIEW_MANIFEST, 'utf8'))
} catch (error) {
  errors.push(`Preview manifest is missing or invalid: ${error instanceof Error ? error.message : String(error)}`)
  manifest = { version: null, assets: {} }
}
assert(
  manifest.version === PREVIEW_MANIFEST_VERSION,
  `Preview manifest must use version ${PREVIEW_MANIFEST_VERSION}`,
)
assertSameSet('Preview manifest', referencedFilenames, Object.keys(manifest.assets ?? {}).sort())

let mobileManifest
try {
  mobileManifest = JSON.parse(await readFile(MOBILE_MANIFEST, 'utf8'))
} catch (error) {
  errors.push(`Mobile panorama manifest is missing or invalid: ${error instanceof Error ? error.message : String(error)}`)
  mobileManifest = { version: null, assets: {} }
}
assert(
  mobileManifest.version === MOBILE_MANIFEST_VERSION,
  `Mobile panorama manifest must use version ${MOBILE_MANIFEST_VERSION}`,
)
assertSameSet('Mobile manifest', referencedFilenames, Object.keys(mobileManifest.assets ?? {}).sort())

const inspected = await mapWithConcurrency(sourceFilenames, 4, async (filename) => {
  const sourcePath = path.join(SOURCE_DIRECTORY, filename)
  const previewPath = path.join(PREVIEW_DIRECTORY, filename)
  const mobilePath = path.join(MOBILE_DIRECTORY, filename)
  const hasPreview = previewFilenameSet.has(filename)
  const hasMobile = mobileFilenameSet.has(filename)
  const [source, preview, mobile, sourceHash, previewHash, mobileHash] = await Promise.all([
    inspectImage(sourcePath, { includeSeam: true }),
    hasPreview ? inspectImage(previewPath) : null,
    hasMobile ? inspectImage(mobilePath) : null,
    sha256(sourcePath),
    hasPreview ? sha256(previewPath) : null,
    hasMobile ? sha256(mobilePath) : null,
  ])

  validateImage(filename, source, SOURCE_CONTRACT)
  if (preview) validateImage(`previews/${filename}`, preview, PREVIEW_CONTRACT)
  if (mobile) validateImage(`mobile/${filename}`, mobile, MOBILE_CONTRACT)
  assert(
    source.seamMae <= SOURCE_CONTRACT.maximumSeamMae,
    `${filename} has a left/right seam MAE of ${source.seamMae.toFixed(2)}; maximum is ${SOURCE_CONTRACT.maximumSeamMae}`,
  )
  const reviewEntry = reviewBaseline.assets?.[filename]
  if (source.seamMae > SOURCE_CONTRACT.reviewSeamMae) {
    assert(
      reviewEntry?.sourceSha256 === sourceHash,
      `${filename} requires a fresh projection review; run npm run review:panoramas and update docs/PANORAMA_REVIEW.json`,
    )
    assert(
      REVIEW_DECISIONS.has(reviewEntry?.decision),
      `${filename} has an invalid panorama review decision`,
    )
    assert(
      Math.abs((reviewEntry?.seamMae ?? 0) - source.seamMae) <= 0.15,
      `${filename} seam measurement no longer matches its review baseline`,
    )
    if (reviewEntry?.sourceSha256 === sourceHash) {
      trackedReviews.push(`${filename} · ${reviewEntry.decision}`)
    }
  } else {
    assert(
      reviewEntry === undefined,
      `${filename} no longer exceeds the projection-review threshold; remove its stale baseline entry`,
    )
  }

  const manifestEntry = manifest.assets?.[filename]
  assert(manifestEntry?.sourceSha256 === sourceHash, `${filename} preview is stale; regenerate previews`)
  if (previewHash) {
    assert(manifestEntry?.previewSha256 === previewHash, `previews/${filename} differs from its manifest hash`)
  }

  const mobileManifestEntry = mobileManifest.assets?.[filename]
  assert(mobileManifestEntry?.sourceSha256 === sourceHash, `${filename} mobile panorama is stale; regenerate mobile panoramas`)
  if (mobileHash) {
    assert(mobileManifestEntry?.mobileSha256 === mobileHash, `mobile/${filename} differs from its manifest hash`)
  }

  return { filename, source, preview, mobile }
})

const sourceBytes = inspected.reduce((total, item) => total + item.source.bytes, 0)
const previewBytes = inspected.reduce((total, item) => total + (item.preview?.bytes ?? 0), 0)
const mobileBytes = inspected.reduce((total, item) => total + (item.mobile?.bytes ?? 0), 0)
assert(
  sourceBytes <= SOURCE_CONTRACT.maximumCollectionBytes,
  `Panorama collection exceeds ${formatMebibytes(SOURCE_CONTRACT.maximumCollectionBytes)}; received ${formatMebibytes(sourceBytes)}`,
)
assert(
  mobileBytes <= MOBILE_CONTRACT.maximumCollectionBytes,
  `Mobile panorama collection exceeds ${formatMebibytes(MOBILE_CONTRACT.maximumCollectionBytes)}; received ${formatMebibytes(mobileBytes)}`,
)

if (trackedReviews.length > 0) {
  console.log(`Tracked panorama decisions (${trackedReviews.length}):`)
  trackedReviews.sort().forEach((review) => console.log(`- ${review}`))
}

if (errors.length > 0) {
  console.error(`Panorama asset contract failed (${errors.length}):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  const previewReduction = sourceBytes === 0 ? 0 : Math.round((1 - previewBytes / sourceBytes) * 100)
  const mobileReduction = sourceBytes === 0 ? 0 : Math.round((1 - mobileBytes / sourceBytes) * 100)
  console.log(
    `Panorama assets passed: ${inspected.length} sources (${formatMebibytes(sourceBytes)}) · `
      + `${inspected.length} mobile (${formatMebibytes(mobileBytes)}, ${mobileReduction}% lighter) · `
      + `${inspected.length} previews (${formatMebibytes(previewBytes)}, ${previewReduction}% lighter).`,
  )
}

import { mkdir } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import sharp from 'sharp'
import {
  SOURCE_CONTRACT,
  SOURCE_DIRECTORY,
  inspectImage,
  listPanoramaFilenames,
  mapWithConcurrency,
} from './panorama-assets.mjs'
import { projectEquirectangular } from './panorama-projection.mjs'
import { parseReviewArguments } from './panorama-review-options.mjs'

const VIEW_SIZE = 512
const HEADER_HEIGHT = 58
const LABEL_HEIGHT = 34
const FONT_CACHE_DIRECTORY = path.join(os.tmpdir(), 'mythos-font-cache')
await mkdir(FONT_CACHE_DIRECTORY, { recursive: true })
process.env.XDG_CACHE_HOME ||= FONT_CACHE_DIRECTORY

const REVIEW_VIEWS = [
  { label: 'FRONT · 000°', yaw: 0, pitch: 0 },
  { label: 'RIGHT · 090°', yaw: 90, pitch: 0 },
  { label: 'SEAM · 180°', yaw: 180, pitch: 0 },
  { label: 'LEFT · 270°', yaw: 270, pitch: 0 },
  { label: 'ZENITH · +90°', yaw: 0, pitch: 90 },
  { label: 'NADIR · −90°', yaw: 0, pitch: -90 },
]

function svgText(width, height, text, { large = false } = {}) {
  const safeText = text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
  const fontSize = large ? 19 : 13
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#191813" fill-opacity="0.92" />
      <text x="18" y="${Math.round(height / 2 + fontSize * 0.36)}"
        fill="#f7f0df" font-family="Arial, sans-serif" font-size="${fontSize}"
        font-weight="700" letter-spacing="1.4">${safeText}</text>
    </svg>
  `)
}

async function generateReviewSheet({ filename, sourcePath }, outputDirectory) {
  const [{ data, info }, metrics] = await Promise.all([
    sharp(sourcePath).removeAlpha().raw().toBuffer({ resolveWithObject: true }),
    inspectImage(sourcePath, { includeSeam: true }),
  ])
  const source = {
    data,
    width: info.width,
    height: info.height,
    channels: info.channels,
  }
  const sheetWidth = VIEW_SIZE * 3
  const sheetHeight = HEADER_HEIGHT + VIEW_SIZE * 2
  const composites = [
    {
      input: svgText(
        sheetWidth,
        HEADER_HEIGHT,
        `${filename} · seam MAE ${metrics.seamMae.toFixed(2)}`,
        { large: true },
      ),
      left: 0,
      top: 0,
    },
  ]

  REVIEW_VIEWS.forEach((view, index) => {
    const column = index % 3
    const row = Math.floor(index / 3)
    const left = column * VIEW_SIZE
    const top = HEADER_HEIGHT + row * VIEW_SIZE
    const projection = projectEquirectangular(source, {
      width: VIEW_SIZE,
      height: VIEW_SIZE,
      yaw: view.yaw,
      pitch: view.pitch,
      fieldOfView: 90,
    })
    composites.push({
      input: Buffer.from(projection.data),
      raw: {
        width: projection.width,
        height: projection.height,
        channels: projection.channels,
      },
      left,
      top,
    })
    composites.push({
      input: svgText(VIEW_SIZE, LABEL_HEIGHT, view.label),
      left,
      top: top + VIEW_SIZE - LABEL_HEIGHT,
    })
  })

  const outputPath = path.join(outputDirectory, `${path.parse(filename).name}.webp`)
  await sharp({
    create: {
      width: sheetWidth,
      height: sheetHeight,
      channels: 3,
      background: '#191813',
    },
  })
    .composite(composites)
    .webp({ quality: 88, effort: 5, smartSubsample: true })
    .toFile(outputPath)
  return outputPath
}

const allFilenames = await listPanoramaFilenames()
const {
  includeAll,
  outputDirectory: requestedOutputDirectory,
  inputFiles,
  explicitNames,
} = parseReviewArguments(process.argv.slice(2))
const outputDirectory = requestedOutputDirectory
  ? path.resolve(requestedOutputDirectory)
  : path.join(os.tmpdir(), 'mythos-panorama-review')

let selectedAssets
if (inputFiles.length > 0) {
  selectedAssets = inputFiles.map((filename) => ({
    filename: path.basename(filename),
    sourcePath: path.resolve(filename),
  }))
} else if (explicitNames.length > 0) {
  const known = new Set(allFilenames)
  const unknown = explicitNames.filter((filename) => !known.has(filename))
  if (unknown.length > 0) throw new Error(`Unknown panorama: ${unknown.join(', ')}`)
  selectedAssets = [...new Set(explicitNames)].sort().map((filename) => ({
    filename,
    sourcePath: path.join(SOURCE_DIRECTORY, filename),
  }))
} else if (includeAll) {
  selectedAssets = allFilenames.map((filename) => ({
    filename,
    sourcePath: path.join(SOURCE_DIRECTORY, filename),
  }))
} else {
  const measured = await mapWithConcurrency(allFilenames, 4, async (filename) => ({
    filename,
    metrics: await inspectImage(path.join(SOURCE_DIRECTORY, filename), { includeSeam: true }),
  }))
  selectedAssets = measured
    .filter(({ metrics }) => metrics.seamMae > SOURCE_CONTRACT.reviewSeamMae)
    .map(({ filename }) => ({
      filename,
      sourcePath: path.join(SOURCE_DIRECTORY, filename),
    }))
}

await mkdir(outputDirectory, { recursive: true })
const outputs = await mapWithConcurrency(selectedAssets, 2, (asset) => (
  generateReviewSheet(asset, outputDirectory)
))

console.log(`Generated ${outputs.length} panorama review sheet${outputs.length === 1 ? '' : 's'}:`)
outputs.forEach((output) => console.log(output))

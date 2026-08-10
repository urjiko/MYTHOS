import { readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

const ENTRY_BUDGET_BYTES = 300 * 1024
const SPHERE_VIEWER_BUDGET_BYTES = 540 * 1024
const html = readFileSync(resolve('dist/index.html'), 'utf8')
const entryTag = [...html.matchAll(/<script\b[^>]*>/g)]
  .map(([tag]) => tag)
  .find((tag) => /\btype="module"/.test(tag))
const entrySource = entryTag?.match(/\bsrc="([^"]+\.js)"/)?.[1]

if (!entrySource) {
  throw new Error('Could not find the production entry script in dist/index.html')
}

const entryPath = resolve('dist', entrySource.replace(/^\.\//, ''))
const entryBytes = statSync(entryPath).size
const entryKilobytes = (entryBytes / 1024).toFixed(1)
const budgetKilobytes = (ENTRY_BUDGET_BYTES / 1024).toFixed(0)

console.log(`Initial JavaScript: ${entryKilobytes} KiB / ${budgetKilobytes} KiB budget`)

if (entryBytes > ENTRY_BUDGET_BYTES) {
  console.error('Initial JavaScript bundle exceeds its performance budget.')
  process.exitCode = 1
}

const assetDirectory = resolve('dist', 'assets')
const sphereViewerFilename = readdirSync(assetDirectory)
  .find((filename) => /^SphereViewer-[A-Za-z0-9_-]+\.js$/.test(filename))

if (!sphereViewerFilename) {
  console.error('Could not find the lazy SphereViewer JavaScript chunk.')
  process.exitCode = 1
} else {
  const sphereViewerBytes = statSync(resolve(assetDirectory, sphereViewerFilename)).size
  const sphereViewerKilobytes = (sphereViewerBytes / 1024).toFixed(1)
  const sphereViewerBudgetKilobytes = (SPHERE_VIEWER_BUDGET_BYTES / 1024).toFixed(0)
  console.log(`Lazy 360° viewer: ${sphereViewerKilobytes} KiB / ${sphereViewerBudgetKilobytes} KiB budget`)

  if (sphereViewerBytes > SPHERE_VIEWER_BUDGET_BYTES) {
    console.error('Lazy SphereViewer bundle exceeds its performance budget.')
    process.exitCode = 1
  }
}

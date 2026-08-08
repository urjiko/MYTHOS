import { readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

const ENTRY_BUDGET_BYTES = 400 * 1024
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

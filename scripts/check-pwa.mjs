import { readFile, stat } from 'node:fs/promises'
import { resolve } from 'node:path'
import sharp from 'sharp'

const dist = resolve('dist')
const html = await readFile(resolve(dist, 'index.html'), 'utf8')
const manifest = JSON.parse(await readFile(resolve(dist, 'manifest.webmanifest'), 'utf8'))
const worker = await readFile(resolve(dist, 'service-worker.js'), 'utf8')
const errors = []

function assert(condition, message) {
  if (!condition) errors.push(message)
}

assert(/rel="manifest" href="\.\/manifest\.webmanifest"/.test(html), 'Built page must link the web app manifest')
assert(/rel="apple-touch-icon"[^>]+href="\.\/icons\/apple-touch-icon\.png"/.test(html), 'Built page must expose an Apple touch icon')
assert(/name="apple-mobile-web-app-capable" content="yes"/.test(html), 'Built page must enable iOS standalone mode')
assert(manifest.id === './', 'Manifest must keep a stable app id')
assert(manifest.start_url === './#/', 'Manifest must launch the hash-routed home page')
assert(manifest.scope === './', 'Manifest must remain scoped to the deployed GitHub Pages directory')
assert(manifest.display === 'standalone', 'Manifest must launch without browser chrome')
assert(Array.isArray(manifest.icons) && manifest.icons.length >= 3, 'Manifest must provide standard and maskable icons')

const entrySource = html.match(/<script\b[^>]*\bsrc="([^"]+\.js)"/)?.[1]
assert(Boolean(entrySource), 'Could not find the built JavaScript entry')
if (entrySource) {
  const entry = await readFile(resolve(dist, entrySource.replace(/^\.\//, '')), 'utf8')
  assert(entry.includes('service-worker.js'), 'Production entry must register the service worker')
}

assert(worker.includes("MOBILE_CACHE, 8"), 'Service worker must bound cached mobile panoramas to eight')
assert(worker.includes("PREVIEW_CACHE, 16"), 'Service worker must bound cached previews to sixteen')
assert(!worker.includes("cacheFirst(request, RUNTIME_CACHE"), 'Full-resolution scene assets must not use unbounded runtime caching')

const expectedIcons = new Map([
  ['./icons/icon-192.png', 192],
  ['./icons/icon-512.png', 512],
  ['./icons/maskable-512.png', 512],
  ['./icons/apple-touch-icon.png', 180],
])

for (const [iconPath, expectedSize] of expectedIcons) {
  const absolutePath = resolve(dist, iconPath.replace(/^\.\//, ''))
  const [metadata, file] = await Promise.all([sharp(absolutePath).metadata(), stat(absolutePath)])
  assert(metadata.width === expectedSize && metadata.height === expectedSize, `${iconPath} must be ${expectedSize}×${expectedSize}`)
  assert(file.size > 1_000, `${iconPath} appears empty or invalid`)
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'))
  process.exit(1)
}

console.log('PWA passed: standalone manifest, iPhone icon, offline shell, and bounded mobile caches.')

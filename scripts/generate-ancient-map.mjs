import { readFile, writeFile, mkdir } from 'node:fs/promises'
import bboxClip from '@turf/bbox-clip'
import { feature } from 'topojson-client'

const topology = JSON.parse(
  await readFile(new URL('../node_modules/world-atlas/land-10m.json', import.meta.url), 'utf8'),
)
const worldLandCollection = feature(topology, topology.objects.land)
const worldLand = worldLandCollection.features[0]
const mediterraneanLand = bboxClip(worldLand, [-12, 28, 45, 48])

const roundCoordinates = (value) => {
  if (!Array.isArray(value)) return value
  if (typeof value[0] === 'number') {
    return value.map((coordinate) => Math.round(coordinate * 10_000) / 10_000)
  }
  return value.map(roundCoordinates)
}

mediterraneanLand.geometry.coordinates = roundCoordinates(mediterraneanLand.geometry.coordinates)
  .filter((polygon) => polygon.some((ring) => ring.length >= 4))
mediterraneanLand.properties = {
  source: 'Natural Earth 1:10m land polygons, public domain',
  bounds: [-12, 28, 45, 48],
}

const outputDirectory = new URL('../public/data/', import.meta.url)
await mkdir(outputDirectory, { recursive: true })
await writeFile(
  new URL('mediterranean-land.geojson', outputDirectory),
  `${JSON.stringify(mediterraneanLand)}\n`,
)

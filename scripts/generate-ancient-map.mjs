import { readFile, writeFile, mkdir } from 'node:fs/promises'
import bboxClip from '@turf/bbox-clip'
import { feature } from 'topojson-client'

const topology = JSON.parse(
  await readFile(new URL('../node_modules/world-atlas/land-50m.json', import.meta.url), 'utf8'),
)
const worldLandCollection = feature(topology, topology.objects.land)
const worldLand = worldLandCollection.features[0]
// Keep a generous visual margin around the playable Mediterranean. Leaflet can
// reveal far more north/south terrain in a tall mobile viewport; clipping land
// to the interaction bounds made those areas look like abrupt, artificial sea.
const visualLandBounds = [-35, -5, 80, 75]
const mediterraneanLand = bboxClip(worldLand, visualLandBounds)

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
  source: 'Natural Earth 1:50m land polygons, public domain',
  bounds: visualLandBounds,
}

const outputDirectory = new URL('../public/data/', import.meta.url)
await mkdir(outputDirectory, { recursive: true })
await writeFile(
  new URL('mediterranean-land.geojson', outputDirectory),
  `${JSON.stringify(mediterraneanLand)}\n`,
)

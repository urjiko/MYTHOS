import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'

describe('generated ancient map land coverage', () => {
  it('extends well beyond the playable Mediterranean on tall and wide screens', async () => {
    const land = JSON.parse(await readFile(
      new URL('../public/data/mediterranean-land.geojson', import.meta.url),
      'utf8',
    ))

    expect(land.properties.bounds[0]).toBeLessThanOrEqual(-30)
    expect(land.properties.bounds[1]).toBeLessThanOrEqual(0)
    expect(land.properties.bounds[2]).toBeGreaterThanOrEqual(70)
    expect(land.properties.bounds[3]).toBeGreaterThanOrEqual(70)
  })
})

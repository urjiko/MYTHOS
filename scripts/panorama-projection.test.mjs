import { describe, expect, it } from 'vitest'
import { perspectiveDirection, projectEquirectangular } from './panorama-projection.mjs'

function coordinateSource(width = 9, height = 5) {
  const data = new Uint8Array(width * height * 3)
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 3
      data[offset] = x * 20
      data[offset + 1] = y * 30
      data[offset + 2] = 100
    }
  }
  return { data, width, height, channels: 3 }
}

describe('equirectangular review projection', () => {
  it('points the centre ray at the requested yaw and pitch', () => {
    const direction = perspectiveDirection({
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      yaw: 90,
      pitch: 0,
      fieldOfView: 90,
    })

    expect(direction.x).toBeCloseTo(0, 8)
    expect(direction.y).toBeCloseTo(0, 8)
    expect(direction.z).toBeCloseTo(1, 8)
  })

  it('samples the equirectangular centre for a front-facing one-pixel view', () => {
    const result = projectEquirectangular(coordinateSource(), { width: 1, height: 1 })
    expect([...result.data]).toEqual([80, 60, 100])
  })

  it('wraps a seam-centred view between the final and first source columns', () => {
    const result = projectEquirectangular(coordinateSource(), {
      width: 1,
      height: 1,
      yaw: 180,
    })
    expect(result.data[0]).toBe(80)
    expect(result.data[1]).toBe(60)
  })

  it('maps zenith and nadir views to the top and bottom source rows', () => {
    const source = coordinateSource()
    const zenith = projectEquirectangular(source, { width: 1, height: 1, pitch: 90 })
    const nadir = projectEquirectangular(source, { width: 1, height: 1, pitch: -90 })

    expect(zenith.data[1]).toBe(0)
    expect(nadir.data[1]).toBe(120)
  })

  it('rejects malformed buffers and impossible fields of view', () => {
    expect(() => projectEquirectangular({
      data: new Uint8Array(2),
      width: 1,
      height: 1,
      channels: 3,
    })).toThrow(/buffer/)
    expect(() => projectEquirectangular(coordinateSource(), { fieldOfView: 180 }))
      .toThrow(/field of view/)
  })
})

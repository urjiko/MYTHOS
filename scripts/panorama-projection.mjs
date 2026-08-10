const TAU = Math.PI * 2

function normalise(vector) {
  const length = Math.hypot(vector.x, vector.y, vector.z) || 1
  return {
    x: vector.x / length,
    y: vector.y / length,
    z: vector.z / length,
  }
}

function sampleBilinear(source, x, y, channel) {
  const wrappedX = ((x % source.width) + source.width) % source.width
  const clampedY = Math.min(source.height - 1, Math.max(0, y))
  const x0 = Math.floor(wrappedX)
  const x1 = (x0 + 1) % source.width
  const y0 = Math.floor(clampedY)
  const y1 = Math.min(source.height - 1, y0 + 1)
  const mixX = wrappedX - x0
  const mixY = clampedY - y0
  const offset = (pixelX, pixelY) => (
    (pixelY * source.width + pixelX) * source.channels + channel
  )
  const top = source.data[offset(x0, y0)] * (1 - mixX)
    + source.data[offset(x1, y0)] * mixX
  const bottom = source.data[offset(x0, y1)] * (1 - mixX)
    + source.data[offset(x1, y1)] * mixX
  return Math.round(top * (1 - mixY) + bottom * mixY)
}

export function perspectiveDirection({ x, y, width, height, yaw, pitch, fieldOfView }) {
  const yawRadians = yaw * Math.PI / 180
  const pitchRadians = pitch * Math.PI / 180
  const halfHeight = Math.tan(fieldOfView * Math.PI / 360)
  const halfWidth = halfHeight * (width / height)
  const cameraX = ((x + 0.5) / width * 2 - 1) * halfWidth
  const cameraY = (1 - (y + 0.5) / height * 2) * halfHeight
  const cosPitch = Math.cos(pitchRadians)
  const sinPitch = Math.sin(pitchRadians)
  const cosYaw = Math.cos(yawRadians)
  const sinYaw = Math.sin(yawRadians)
  const forward = {
    x: cosPitch * cosYaw,
    y: sinPitch,
    z: cosPitch * sinYaw,
  }
  const right = { x: -sinYaw, y: 0, z: cosYaw }
  const up = {
    x: -cosYaw * sinPitch,
    y: cosPitch,
    z: -sinYaw * sinPitch,
  }

  return normalise({
    x: forward.x + right.x * cameraX + up.x * cameraY,
    y: forward.y + right.y * cameraX + up.y * cameraY,
    z: forward.z + right.z * cameraX + up.z * cameraY,
  })
}

export function projectEquirectangular(source, {
  width = 512,
  height = 512,
  yaw = 0,
  pitch = 0,
  fieldOfView = 90,
} = {}) {
  if (source.data.length !== source.width * source.height * source.channels) {
    throw new Error('Source pixel buffer does not match its dimensions and channel count.')
  }
  if (width < 1 || height < 1 || fieldOfView <= 0 || fieldOfView >= 180) {
    throw new Error('Projection dimensions and field of view must describe a finite perspective view.')
  }

  const output = new Uint8Array(width * height * source.channels)
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const direction = perspectiveDirection({ x, y, width, height, yaw, pitch, fieldOfView })
      const longitude = Math.atan2(direction.z, direction.x)
      const latitude = Math.asin(Math.min(1, Math.max(-1, direction.y)))
      const sourceX = (longitude / TAU + 0.5) * source.width - 0.5
      const sourceY = (0.5 - latitude / Math.PI) * source.height - 0.5
      const outputOffset = (y * width + x) * source.channels

      for (let channel = 0; channel < source.channels; channel += 1) {
        output[outputOffset + channel] = sampleBilinear(source, sourceX, sourceY, channel)
      }
    }
  }

  return { data: output, width, height, channels: source.channels }
}

import { Compass, Eye, Minus, Plus, RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  LinearFilter,
  LinearMipmapLinearFilter,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  RepeatWrapping,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from 'three'
import type { MythScene } from './data'
import { ui, type Locale } from './i18n'
import {
  PANORAMA_LOAD_TIMEOUT_MS,
  panoramaPreviewPath,
  panoramaTexturePath,
  preferredPanoramaQuality,
  type PanoramaQuality,
} from './panoramaAssets'

type ViewerStatus = 'loading' | 'ready' | 'error'

type View = {
  yaw: number
  pitch: number
  fov: number
}

type TouchPoint = {
  x: number
  y: number
}

const DEFAULT_FOV = 80
const MIN_FOV = 42
const MAX_FOV = 100
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const distanceBetween = (first: TouchPoint, second: TouchPoint) => Math.hypot(second.x - first.x, second.y - first.y)

type DeliveryNavigator = Navigator & {
  deviceMemory?: number
  connection?: {
    saveData?: boolean
    addEventListener?: (type: 'change', listener: () => void) => void
    removeEventListener?: (type: 'change', listener: () => void) => void
  }
}

function readPanoramaQuality(): PanoramaQuality {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return 'source'
  const deliveryNavigator = navigator as DeliveryNavigator
  return preferredPanoramaQuality({
    viewportWidth: window.innerWidth,
    coarsePointer: window.matchMedia('(pointer: coarse)').matches,
    saveData: deliveryNavigator.connection?.saveData,
    deviceMemory: deliveryNavigator.deviceMemory,
  })
}

export function SphereViewer({
  scene,
  locale = 'en',
  onReadyChange,
}: {
  scene: MythScene
  locale?: Locale
  onReadyChange?: (ready: boolean) => void
}) {
  const copy = ui[locale]
  const canvasHost = useRef<HTMLDivElement>(null)
  const renderFrame = useRef<(() => void) | null>(null)
  const view = useRef<View>({ yaw: 0, pitch: 0, fov: DEFAULT_FOV })
  const drag = useRef<{ pointerId: number; x: number; y: number; yaw: number; pitch: number } | null>(null)
  const touchPointers = useRef(new Map<number, TouchPoint>())
  const pinch = useRef<{ distance: number; fov: number } | null>(null)
  const onReadyChangeRef = useRef(onReadyChange)
  const [status, setStatus] = useState<ViewerStatus>('loading')
  const [heading, setHeading] = useState(0)
  const [fov, setFov] = useState(DEFAULT_FOV)
  const [previewFailedFor, setPreviewFailedFor] = useState<string | null>(null)
  const [panoramaQuality, setPanoramaQuality] = useState<PanoramaQuality>(readPanoramaQuality)

  const previewSource = previewFailedFor === scene.image
    ? scene.image
    : panoramaPreviewPath(scene.image)
  const textureSource = panoramaTexturePath(scene.image, panoramaQuality)
  const usesMobileTexture = textureSource !== scene.image

  onReadyChangeRef.current = onReadyChange

  const updateView = useCallback((next: Partial<View>) => {
    const current = view.current
    current.yaw = next.yaw ?? current.yaw
    current.pitch = clamp(next.pitch ?? current.pitch, -85, 85)
    current.fov = clamp(next.fov ?? current.fov, MIN_FOV, MAX_FOV)

    const normalisedHeading = ((current.yaw % 360) + 360) % 360
    setHeading(Math.round(normalisedHeading))
    setFov(Math.round(current.fov))
    renderFrame.current?.()
  }, [])

  const resetView = useCallback(() => {
    updateView({ yaw: 0, pitch: 0, fov: DEFAULT_FOV })
  }, [updateView])

  useEffect(() => {
    const deliveryNavigator = navigator as DeliveryNavigator
    const connection = deliveryNavigator.connection
    const updateQuality = () => setPanoramaQuality(readPanoramaQuality())

    window.addEventListener('resize', updateQuality, { passive: true })
    connection?.addEventListener?.('change', updateQuality)
    return () => {
      window.removeEventListener('resize', updateQuality)
      connection?.removeEventListener?.('change', updateQuality)
    }
  }, [])

  useEffect(() => {
    const host = canvasHost.current
    if (!host) return

    let renderer: WebGLRenderer | null = null
    let texture: Texture | null = null
    let animationFrame = 0
    let disposed = false
    let loadDeadline = 0

    view.current = { yaw: 0, pitch: 0, fov: DEFAULT_FOV }
    drag.current = null
    touchPointers.current.clear()
    pinch.current = null
    setHeading(0)
    setFov(DEFAULT_FOV)
    setStatus('loading')
    onReadyChangeRef.current?.(false)

    try {
      renderer = new WebGLRenderer({
        antialias: false,
        alpha: true,
        depth: false,
        stencil: false,
        powerPreference: usesMobileTexture ? 'default' : 'high-performance',
      })
    } catch {
      setStatus('error')
      onReadyChangeRef.current?.(true)
      return
    }

    renderer.outputColorSpace = SRGBColorSpace
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, usesMobileTexture ? 1.5 : 2))
    host.appendChild(renderer.domElement)

    loadDeadline = window.setTimeout(() => {
      if (disposed) return
      setStatus('error')
      onReadyChangeRef.current?.(true)
    }, PANORAMA_LOAD_TIMEOUT_MS)

    const world = new Scene()
    const camera = new PerspectiveCamera(DEFAULT_FOV, 1, 0.01, 30)
    const cameraTarget = new Vector3()
    camera.position.set(0, 0, 0)

    const geometry = new SphereGeometry(10, usesMobileTexture ? 64 : 96, usesMobileTexture ? 40 : 64)
    geometry.scale(-1, 1, 1)
    const material = new MeshBasicMaterial({ color: 0xffffff, depthTest: false, depthWrite: false })
    const sphere = new Mesh(geometry, material)
    sphere.visible = false
    world.add(sphere)

    const draw = () => {
      if (disposed || !renderer) return
      const { yaw, pitch, fov: currentFov } = view.current
      const yawRadians = MathUtils.degToRad(yaw)
      const pitchRadians = MathUtils.degToRad(pitch)
      const horizontal = Math.cos(pitchRadians)
      cameraTarget.set(
        -Math.cos(yawRadians) * horizontal,
        Math.sin(pitchRadians),
        Math.sin(yawRadians) * horizontal,
      )

      camera.fov = currentFov
      camera.updateProjectionMatrix()
      camera.lookAt(cameraTarget)
      renderer.render(world, camera)
    }

    const scheduleDraw = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(draw)
    }
    renderFrame.current = scheduleDraw

    const resize = () => {
      if (!renderer) return
      const rect = host.getBoundingClientRect()
      if (rect.width < 1 || rect.height < 1) return
      renderer.setSize(rect.width, rect.height, false)
      camera.aspect = rect.width / rect.height
      camera.updateProjectionMatrix()
      scheduleDraw()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    resize()

    const applyTexture = (loadedTexture: Texture) => {
      window.clearTimeout(loadDeadline)
      if (disposed) {
        loadedTexture.dispose()
        return
      }
      texture = loadedTexture
      texture.colorSpace = SRGBColorSpace
      texture.wrapS = RepeatWrapping
      texture.minFilter = LinearMipmapLinearFilter
      texture.magFilter = LinearFilter
      texture.anisotropy = Math.min(
        usesMobileTexture ? 4 : 8,
        renderer?.capabilities.getMaxAnisotropy() ?? 1,
      )
      material.map = texture
      material.needsUpdate = true
      sphere.visible = true
      setStatus('ready')
      onReadyChangeRef.current?.(true)
      scheduleDraw()
    }
    const failTexture = () => {
      window.clearTimeout(loadDeadline)
      if (!disposed) {
        setStatus('error')
        onReadyChangeRef.current?.(true)
      }
    }
    const textureLoader = new TextureLoader()
    const loadTexture = (source: string, allowSourceFallback: boolean) => {
      textureLoader.load(source, applyTexture, undefined, () => {
        if (disposed) return
        if (allowSourceFallback) {
          loadTexture(scene.image, false)
          return
        }
        failTexture()
      })
    }
    loadTexture(textureSource, usesMobileTexture)

    return () => {
      disposed = true
      renderFrame.current = null
      resizeObserver.disconnect()
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(loadDeadline)
      texture?.dispose()
      geometry.dispose()
      material.dispose()
      renderer?.dispose()
      renderer?.domElement.remove()
    }
  }, [scene.image, textureSource, usesMobileTexture])

  return (
    <div
      className={`scene-viewer scene-viewer--${status}`}
      style={{ '--scene-fallback': scene.fallback } as React.CSSProperties}
      role="application"
      aria-label={copy.viewer.aria}
      aria-busy={status === 'loading'}
      tabIndex={0}
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest('button')) return

        if (event.pointerType === 'touch') {
          touchPointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
          event.currentTarget.setPointerCapture(event.pointerId)

          if (touchPointers.current.size >= 2) {
            const [first, second] = Array.from(touchPointers.current.values())
            pinch.current = { distance: distanceBetween(first, second), fov: view.current.fov }
            drag.current = null
            return
          }
        }

        drag.current = {
          pointerId: event.pointerId,
          x: event.clientX,
          y: event.clientY,
          yaw: view.current.yaw,
          pitch: view.current.pitch,
        }
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.setPointerCapture(event.pointerId)
        }
      }}
      onPointerMove={(event) => {
        if (event.pointerType === 'touch' && touchPointers.current.has(event.pointerId)) {
          touchPointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

          if (touchPointers.current.size >= 2) {
            const [first, second] = Array.from(touchPointers.current.values())
            const currentDistance = distanceBetween(first, second)
            if (!pinch.current) {
              pinch.current = { distance: currentDistance, fov: view.current.fov }
            }
            if (currentDistance > 0 && pinch.current.distance > 0) {
              updateView({ fov: pinch.current.fov * (pinch.current.distance / currentDistance) })
            }
            return
          }
        }

        if (!drag.current || drag.current.pointerId !== event.pointerId) return
        updateView({
          yaw: drag.current.yaw + (event.clientX - drag.current.x) * 0.12,
          pitch: drag.current.pitch + (event.clientY - drag.current.y) * 0.1,
        })
      }}
      onPointerUp={(event) => {
        if (event.pointerType === 'touch') {
          touchPointers.current.delete(event.pointerId)
          pinch.current = null
          const remaining = touchPointers.current.entries().next().value as [number, TouchPoint] | undefined
          drag.current = remaining
            ? {
                pointerId: remaining[0],
                x: remaining[1].x,
                y: remaining[1].y,
                yaw: view.current.yaw,
                pitch: view.current.pitch,
              }
            : null
        } else if (drag.current?.pointerId === event.pointerId) {
          drag.current = null
        }

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId)
        }
      }}
      onPointerCancel={(event) => {
        touchPointers.current.delete(event.pointerId)
        pinch.current = null
        if (drag.current?.pointerId === event.pointerId) drag.current = null
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId)
        }
      }}
      onWheel={(event) => {
        event.preventDefault()
        updateView({ fov: view.current.fov + event.deltaY * 0.025 })
      }}
      onDoubleClick={resetView}
      onKeyDown={(event) => {
        const keyActions: Record<string, () => void> = {
          ArrowLeft: () => updateView({ yaw: view.current.yaw + 7 }),
          ArrowRight: () => updateView({ yaw: view.current.yaw - 7 }),
          ArrowUp: () => updateView({ pitch: view.current.pitch + 7 }),
          ArrowDown: () => updateView({ pitch: view.current.pitch - 7 }),
          '+': () => updateView({ fov: view.current.fov - 5 }),
          '=': () => updateView({ fov: view.current.fov - 5 }),
          '-': () => updateView({ fov: view.current.fov + 5 }),
          '0': resetView,
        }
        const action = keyActions[event.key]
        if (!action) return
        event.preventDefault()
        action()
      }}
    >
      <img
        className="scene-viewer__fallback"
        src={previewSource}
        alt=""
        draggable="false"
        decoding="async"
        fetchPriority="high"
        onError={() => setPreviewFailedFor(scene.image)}
      />
      <div ref={canvasHost} className="scene-viewer__canvas" aria-hidden="true" />
      <div className="scene-viewer__vignette" />

      {status === 'loading' && <div className="scene-viewer__status" role="status" aria-live="polite">{copy.viewer.loading}</div>}
      {status === 'error' && <div className="scene-viewer__status" role="status" aria-live="polite">{copy.viewer.error}</div>}

      <div className="scene-viewer__drag"><Eye size={16} /> {copy.viewer.drag}</div>
      <div
        className="scene-viewer__instruments"
        onPointerDown={(event) => event.stopPropagation()}
        onDoubleClick={(event) => event.stopPropagation()}
      >
        <div className="scene-viewer__compass" aria-label={`${copy.viewer.heading}: ${heading}°`}>
          <div className="scene-viewer__compass-dial" aria-hidden="true">
            <span>N</span>
            <i style={{ transform: `rotate(${heading}deg)` }} />
            <Compass size={14} />
          </div>
          <div>
            <small>{copy.viewer.heading}</small>
            <strong>{String(heading).padStart(3, '0')}°</strong>
          </div>
        </div>
        <div className="scene-viewer__zoom" aria-label={copy.viewer.zoom}>
          <span className="scene-viewer__zoom-label">{copy.viewer.fieldOfView}</span>
          <div className="scene-viewer__zoom-controls">
            <button type="button" onClick={() => updateView({ fov: view.current.fov + 6 })} aria-label={copy.viewer.zoomOut}><Minus size={16} /></button>
            <output aria-live="off">{fov}°</output>
            <button type="button" onClick={() => updateView({ fov: view.current.fov - 6 })} aria-label={copy.viewer.zoomIn}><Plus size={16} /></button>
          </div>
          <button className="scene-viewer__reset" type="button" onClick={resetView} aria-label={copy.viewer.reset}>
            <RotateCcw size={14} /> <span>{copy.viewer.reset}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

import { Eye, Minus, Plus } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import type { MythScene } from './data'

type ViewerStatus = 'loading' | 'ready' | 'error'

type View = {
  yaw: number
  pitch: number
  fov: number
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export function SphereViewer({ scene }: { scene: MythScene }) {
  const canvasHost = useRef<HTMLDivElement>(null)
  const renderFrame = useRef<(() => void) | null>(null)
  const view = useRef<View>({ yaw: 0, pitch: 0, fov: 72 })
  const drag = useRef<{ pointerId: number; x: number; y: number; yaw: number; pitch: number } | null>(null)
  const [status, setStatus] = useState<ViewerStatus>('loading')
  const [heading, setHeading] = useState(0)
  const [fov, setFov] = useState(72)

  const updateView = useCallback((next: Partial<View>) => {
    const current = view.current
    current.yaw = next.yaw ?? current.yaw
    current.pitch = clamp(next.pitch ?? current.pitch, -85, 85)
    current.fov = clamp(next.fov ?? current.fov, 42, 92)

    const normalisedHeading = ((current.yaw % 360) + 360) % 360
    setHeading(Math.round(normalisedHeading))
    setFov(Math.round(current.fov))
    renderFrame.current?.()
  }, [])

  const resetView = useCallback(() => {
    updateView({ yaw: 0, pitch: 0, fov: 72 })
  }, [updateView])

  useEffect(() => {
    const host = canvasHost.current
    if (!host) return

    let renderer: THREE.WebGLRenderer | null = null
    let texture: THREE.Texture | null = null
    let animationFrame = 0
    let disposed = false

    view.current = { yaw: 0, pitch: 0, fov: 72 }
    setHeading(0)
    setFov(72)
    setStatus('loading')

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      setStatus('error')
      return
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    host.appendChild(renderer.domElement)

    const world = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(72, 1, 0.01, 30)
    camera.position.set(0, 0, 0)

    const geometry = new THREE.SphereGeometry(10, 96, 64)
    geometry.scale(-1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const sphere = new THREE.Mesh(geometry, material)
    sphere.visible = false
    world.add(sphere)

    const draw = () => {
      if (disposed || !renderer) return
      const { yaw, pitch, fov: currentFov } = view.current
      const yawRadians = THREE.MathUtils.degToRad(yaw)
      const pitchRadians = THREE.MathUtils.degToRad(pitch)
      const horizontal = Math.cos(pitchRadians)
      const target = new THREE.Vector3(
        -Math.cos(yawRadians) * horizontal,
        Math.sin(pitchRadians),
        Math.sin(yawRadians) * horizontal,
      )

      camera.fov = currentFov
      camera.updateProjectionMatrix()
      camera.lookAt(target)
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

    new THREE.TextureLoader().load(
      scene.image,
      (loadedTexture) => {
        if (disposed) {
          loadedTexture.dispose()
          return
        }
        texture = loadedTexture
        texture.colorSpace = THREE.SRGBColorSpace
        texture.wrapS = THREE.RepeatWrapping
        texture.minFilter = THREE.LinearMipmapLinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.anisotropy = Math.min(16, renderer?.capabilities.getMaxAnisotropy() ?? 1)
        material.map = texture
        material.needsUpdate = true
        sphere.visible = true
        setStatus('ready')
        scheduleDraw()
      },
      undefined,
      () => {
        if (!disposed) setStatus('error')
      },
    )

    return () => {
      disposed = true
      renderFrame.current = null
      resizeObserver.disconnect()
      window.cancelAnimationFrame(animationFrame)
      texture?.dispose()
      geometry.dispose()
      material.dispose()
      renderer?.dispose()
      renderer?.domElement.remove()
    }
  }, [scene.image])

  return (
    <div
      className={`scene-viewer scene-viewer--${status}`}
      style={{ '--scene-fallback': scene.fallback } as React.CSSProperties}
      role="application"
      aria-label={`${scene.title}: immersive 360-degree spherical scene. Drag to look around, or use the arrow and plus/minus keys.`}
      tabIndex={0}
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest('button')) return
        drag.current = {
          pointerId: event.pointerId,
          x: event.clientX,
          y: event.clientY,
          yaw: view.current.yaw,
          pitch: view.current.pitch,
        }
        event.currentTarget.setPointerCapture(event.pointerId)
      }}
      onPointerMove={(event) => {
        if (!drag.current || drag.current.pointerId !== event.pointerId) return
        updateView({
          yaw: drag.current.yaw - (event.clientX - drag.current.x) * 0.12,
          pitch: drag.current.pitch + (event.clientY - drag.current.y) * 0.1,
        })
      }}
      onPointerUp={(event) => {
        if (drag.current?.pointerId !== event.pointerId) return
        drag.current = null
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId)
        }
      }}
      onPointerCancel={() => { drag.current = null }}
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
      <img className="scene-viewer__fallback" src={scene.image} alt="" draggable="false" />
      <div ref={canvasHost} className="scene-viewer__canvas" aria-hidden="true" />
      <div className="scene-viewer__vignette" />

      {status === 'loading' && <div className="scene-viewer__status">Preparing the sphere…</div>}
      {status === 'error' && <div className="scene-viewer__status">WebGL unavailable · showing a flat preview</div>}

      <div className="scene-viewer__drag"><Eye size={16} /> 360° · drag to look around</div>
      <div className="scene-viewer__compass" aria-hidden="true">
        <span>{String(heading).padStart(3, '0')}°</span><i style={{ transform: `rotate(${heading}deg)` }} />
      </div>
      <div className="scene-viewer__zoom" aria-label="Zoom controls">
        <button type="button" onClick={() => updateView({ fov: view.current.fov + 6 })} aria-label="Zoom out"><Minus size={15} /></button>
        <span>{fov}°</span>
        <button type="button" onClick={() => updateView({ fov: view.current.fov - 6 })} aria-label="Zoom in"><Plus size={15} /></button>
      </div>
    </div>
  )
}

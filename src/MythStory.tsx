import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { MythScene } from './data'
import type { Locale } from './i18n'
import { segmentStoryCharacters, type MythCharacter } from './mythCharacters'
import { localiseMythStory } from './mythStories'

type DossierPosition = {
  left: number
  top: number
}

type ActiveCharacter = {
  segment: number
  character: MythCharacter
  position?: DossierPosition
}

function dossierPosition(clientX: number, clientY: number): DossierPosition {
  const margin = 16
  const gap = 14
  const width = Math.min(350, Math.max(240, window.innerWidth - margin * 2))
  const height = Math.min(310, Math.max(180, window.innerHeight - margin * 2))

  let left = clientX + gap
  let top = clientY + gap

  if (left + width > window.innerWidth - margin) left = clientX - width - gap
  if (top + height > window.innerHeight - margin) top = clientY - height - gap

  return {
    left: Math.max(margin, Math.min(left, window.innerWidth - width - margin)),
    top: Math.max(margin, Math.min(top, window.innerHeight - height - margin)),
  }
}

function usesFinePointer() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export function MythStory({ scene, locale }: { scene: MythScene; locale: Locale }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const dossierRef = useRef<HTMLElement>(null)
  const [activeCharacter, setActiveCharacter] = useState<ActiveCharacter | null>(null)
  const story = useMemo(() => localiseMythStory(scene, locale), [locale, scene])
  const segments = useMemo(() => segmentStoryCharacters(story, locale), [locale, story])

  useEffect(() => {
    setActiveCharacter(null)
  }, [locale, scene.id])

  useEffect(() => {
    const closeOnOutsideTap = (event: PointerEvent) => {
      const target = event.target as Node
      if (!rootRef.current?.contains(target) && !dossierRef.current?.contains(target)) {
        setActiveCharacter(null)
      }
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveCharacter(null)
    }

    document.addEventListener('pointerdown', closeOnOutsideTap)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideTap)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  const hint = locale === 'tr'
    ? 'Kısa bilgi için karakter adının üzerine gel veya adına bir kez dokun.'
    : 'Hover over a character name, or tap it once, for a quick profile.'

  return (
    <div ref={rootRef} className="myth-story">
      <p>
        {segments.map((segment, index) => {
          if (!segment.character) return <span key={`${index}-${segment.text}`}>{segment.text}</span>
          const isOpen = activeCharacter?.segment === index
          const dossierId = `myth-character-dossier-${scene.id}`

          return (
            <button
              key={`${index}-${segment.character.id}`}
              type="button"
              className={`myth-character ${isOpen ? 'is-open' : ''}`}
              aria-expanded={isOpen}
              aria-controls={dossierId}
              onPointerEnter={(event) => {
                if (event.pointerType !== 'mouse') return
                setActiveCharacter({
                  segment: index,
                  character: segment.character!,
                  position: dossierPosition(event.clientX, event.clientY),
                })
              }}
              onPointerMove={(event) => {
                if (event.pointerType !== 'mouse' || activeCharacter?.segment !== index) return
                setActiveCharacter({
                  segment: index,
                  character: segment.character!,
                  position: dossierPosition(event.clientX, event.clientY),
                })
              }}
              onFocus={(event) => {
                const rect = event.currentTarget.getBoundingClientRect()
                setActiveCharacter({
                  segment: index,
                  character: segment.character!,
                  position: usesFinePointer()
                    ? dossierPosition(rect.right, rect.bottom)
                    : undefined,
                })
              }}
              onClick={(event) => setActiveCharacter((current) => {
                const finePointer = usesFinePointer()
                if (current?.segment === index && !finePointer) return null

                const rect = event.currentTarget.getBoundingClientRect()
                const pointerX = event.clientX || rect.right
                const pointerY = event.clientY || rect.bottom
                return {
                  segment: index,
                  character: segment.character!,
                  position: finePointer ? dossierPosition(pointerX, pointerY) : undefined,
                }
              })}
            >
              {segment.text}
            </button>
          )
        })}
      </p>
      <small className="myth-story__hint">ⓘ {hint}</small>
      {activeCharacter && createPortal(
        <aside
          ref={dossierRef}
          id={`myth-character-dossier-${scene.id}`}
          className="myth-character-dossier"
          style={activeCharacter.position}
          aria-live="polite"
          aria-label={locale === 'tr' ? 'Karakter kısa bilgisi' : 'Character quick profile'}
        >
          <span className="myth-character-dossier__eyebrow">
            {locale === 'tr' ? 'KARAKTER DOSYASI' : 'CHARACTER DOSSIER'}
          </span>
          <strong>{activeCharacter.character.name[locale]}</strong>
          <p>{activeCharacter.character.info[locale]}</p>
          <button
            type="button"
            onClick={() => setActiveCharacter(null)}
            aria-label={locale === 'tr' ? 'Karakter bilgisini kapat' : 'Close character profile'}
          >
            <span aria-hidden="true">×</span>
          </button>
        </aside>,
        document.body,
      )}
    </div>
  )
}

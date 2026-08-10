import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { MythScene } from './data'
import type { Locale } from './i18n'
import { segmentStoryCharacters, type MythCharacter } from './mythCharacters'
import { localiseMythStory } from './mythStories'

type ActiveCharacter = {
  segment: number
  character: MythCharacter
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
                if (event.pointerType === 'mouse') {
                  setActiveCharacter({ segment: index, character: segment.character! })
                }
              }}
              onFocus={() => setActiveCharacter({ segment: index, character: segment.character! })}
              onClick={() => setActiveCharacter((current) => {
                const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
                return current?.segment === index && !finePointer
                  ? null
                  : { segment: index, character: segment.character! }
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

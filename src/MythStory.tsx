import { useEffect, useMemo, useRef, useState } from 'react'
import type { MythScene } from './data'
import type { Locale } from './i18n'
import { segmentStoryCharacters } from './mythCharacters'
import { localiseMythStory } from './mythStories'

export function MythStory({ scene, locale }: { scene: MythScene; locale: Locale }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [activeSegment, setActiveSegment] = useState<number | null>(null)
  const story = useMemo(() => localiseMythStory(scene, locale), [locale, scene])
  const segments = useMemo(() => segmentStoryCharacters(story, locale), [locale, story])

  useEffect(() => {
    setActiveSegment(null)
  }, [locale, scene.id])

  useEffect(() => {
    const closeOnOutsideTap = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setActiveSegment(null)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveSegment(null)
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
          const isOpen = activeSegment === index
          const tooltipId = `myth-character-${scene.id}-${index}`

          return (
            <button
              key={`${index}-${segment.character.id}`}
              type="button"
              className={`myth-character ${isOpen ? 'is-open' : ''}`}
              aria-expanded={isOpen}
              aria-describedby={tooltipId}
              onClick={() => setActiveSegment((current) => current === index ? null : index)}
            >
              {segment.text}
              <span id={tooltipId} className="myth-character__card" role="tooltip">
                <strong>{segment.character.name[locale]}</strong>
                <span>{segment.character.info[locale]}</span>
              </span>
            </button>
          )
        })}
      </p>
      <small className="myth-story__hint">ⓘ {hint}</small>
    </div>
  )
}

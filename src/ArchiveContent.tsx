import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { archiveScenesForFilter, type ArchiveFilter } from './archive'
import { mythScenes } from './data'
import { localiseMythTitle, ui, type Locale } from './i18n'
import { localiseScenePresentation } from './sceneCopy'
import type { GameMode } from './gameConfig'

type ArchiveContentProps = {
  locale: Locale
  onStartGame: (mode: GameMode) => void
}

export default function ArchiveContent({ locale, onStartGame }: ArchiveContentProps) {
  const copy = ui[locale]
  const [filter, setFilter] = useState<ArchiveFilter>('all')
  const filteredScenes = archiveScenesForFilter(filter)
  const filterLabels: Record<ArchiveFilter, string> = {
    all: copy.archive.all,
    gods: copy.archive.gods,
    heroes: copy.archive.heroes,
    creatures: copy.archive.creatures,
    odyssey: copy.archive.odyssey,
    trojan: copy.archive.troy,
  }
  const filters = Object.keys(filterLabels) as ArchiveFilter[]

  return (
    <>
      <div className="archive-page__toolbar">
        <div className="archive-page__filters" aria-label={copy.archive.filterLabel}>
          {filters.map((item) => (
            <button
              type="button"
              className={filter === item ? 'is-active' : ''}
              aria-pressed={filter === item}
              key={item}
              onClick={() => setFilter(item)}
            >
              {filterLabels[item]}
            </button>
          ))}
        </div>
        <button className="button button--ink archive-page__play" onClick={() => onStartGame('all')}>
          {copy.archive.play} <ArrowRight size={15} />
        </button>
      </div>
      <p className="archive-page__count" aria-live="polite">
        {copy.archive.showing(filteredScenes.length, mythScenes.length)}
      </p>
      <div className="archive-page__grid">
        {filteredScenes.map((scene, index) => {
          const presentation = localiseScenePresentation(scene, locale)
          return <article className="archive-myth-card" key={scene.id} aria-labelledby={`archive-title-${scene.id}`}>
            <div className="archive-myth-card__art" style={{ background: scene.fallback }}>
              <img
                src={scene.image}
                alt=""
                loading="lazy"
                decoding="async"
                onError={(event) => { event.currentTarget.style.display = 'none' }}
              />
              <span aria-hidden="true">{scene.symbol}</span>
              <small>{String(index + 1).padStart(2, '0')}</small>
            </div>
            <div className="archive-myth-card__body">
              <div className="archive-myth-card__meta">
                <span>{filterLabels[scene.category]}</span>
                <span>{presentation.cycle}</span>
              </div>
              <h2 id={`archive-title-${scene.id}`}>{localiseMythTitle(scene.title, locale)}</h2>
              <p className="archive-myth-card__location">{presentation.location}</p>
              <div className="archive-myth-card__source">
                <span>{copy.archive.source}</span>
                <p>{presentation.source}</p>
                {scene.pleiadesUrl && (
                  <a href={scene.pleiadesUrl} target="_blank" rel="noreferrer">{copy.archive.placeRecord}</a>
                )}
              </div>
            </div>
          </article>
        })}
      </div>
    </>
  )
}

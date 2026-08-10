import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, MapPin, ScrollText, Users } from 'lucide-react'
import { archiveScenesForFilter, type ArchiveFilter } from './archive'
import { mythScenes, type MythScene } from './data'
import { localiseMythTitle, ui, type Locale } from './i18n'
import { mythCharactersForScene } from './mythCharacters'
import { localiseMythStory } from './mythStories'
import { localiseScenePresentation } from './sceneCopy'
import type { GameMode } from './gameConfig'

type ArchiveContentProps = {
  locale: Locale
  selectedId?: string
  onSelectScene: (sceneId?: string) => void
  onStartGame: (mode: GameMode) => void
}

function ArchiveDetail({
  scene,
  locale,
  onBack,
  onStartGame,
}: {
  scene: MythScene
  locale: Locale
  onBack: () => void
  onStartGame: (mode: GameMode) => void
}) {
  const copy = ui[locale]
  const presentation = localiseScenePresentation(scene, locale)
  const characters = useMemo(() => mythCharactersForScene(scene, locale), [locale, scene])
  const story = useMemo(() => localiseMythStory(scene, locale), [locale, scene])

  return (
    <article className="archive-detail">
      <a
        className="archive-detail__back"
        href="#/archive"
        onClick={(event) => { event.preventDefault(); onBack() }}
      >
        <ArrowLeft size={16} /> {copy.archive.back}
      </a>

      <header className="archive-detail__hero" style={{ background: scene.fallback }}>
        <img
          src={scene.image}
          alt=""
          decoding="async"
          fetchPriority="high"
          onError={(event) => { event.currentTarget.style.display = 'none' }}
        />
        <div className="archive-detail__hero-shade" />
        <div className="archive-detail__hero-copy">
          <span>{presentation.cycle}</span>
          <h1>{localiseMythTitle(scene.title, locale)}</h1>
          <p><MapPin size={15} aria-hidden="true" /> {presentation.location}</p>
        </div>
        <strong className="archive-detail__symbol" aria-hidden="true">{scene.symbol}</strong>
      </header>

      <div className="archive-detail__body">
        <section className="archive-detail__story" aria-labelledby="archive-story-title">
          <span className="archive-detail__section-label"><BookOpen size={15} /> {copy.archive.storyTitle}</span>
          <h2 id="archive-story-title">{localiseMythTitle(scene.title, locale)}</h2>
          <p>{story}</p>
        </section>

        <aside className="archive-detail__context">
          <span className="archive-detail__section-label"><MapPin size={15} /> {copy.archive.contextTitle}</span>
          <dl>
            <div><dt>{copy.archive.location}</dt><dd>{presentation.location}</dd></div>
            <div><dt>{copy.archive.cycle}</dt><dd>{presentation.cycle}</dd></div>
            <div><dt>{copy.archive.geography}</dt><dd>{presentation.geographyNote}</dd></div>
          </dl>
        </aside>
      </div>

      <section className="archive-detail__characters" aria-labelledby="archive-characters-title">
        <div className="archive-detail__section-heading">
          <span className="archive-detail__section-label"><Users size={15} /> {copy.archive.charactersTitle}</span>
          <h2 id="archive-characters-title">{copy.archive.charactersHeading}</h2>
          <p>{copy.archive.charactersLede}</p>
        </div>
        <div className="archive-character-grid">
          {characters.map((character, index) => (
            <article className="archive-character-card" key={character.id}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{character.name[locale]}</h3>
              <p>{character.info[locale]}</p>
              {character.facts && character.facts.length > 0 && (
                <>
                  <strong>{copy.archive.facts}</strong>
                  <ul>
                    {character.facts.map((fact) => <li key={fact.en}>{fact[locale]}</li>)}
                  </ul>
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="archive-detail__sources" aria-labelledby="archive-sources-title">
        <span className="archive-detail__section-label"><ScrollText size={15} /> {copy.archive.source}</span>
        <h2 id="archive-sources-title">{presentation.source}</h2>
        <p>{presentation.sourceNote}</p>
        <div>
          {scene.pleiadesUrl && (
            <a href={scene.pleiadesUrl} target="_blank" rel="noreferrer">{copy.archive.placeRecord}</a>
          )}
          <button className="button button--terracotta" onClick={() => onStartGame('all')}>
            {copy.archive.play} <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </article>
  )
}

export default function ArchiveContent({ locale, selectedId, onSelectScene, onStartGame }: ArchiveContentProps) {
  const copy = ui[locale]
  const [filter, setFilter] = useState<ArchiveFilter>('all')
  const selectedScene = selectedId ? mythScenes.find((scene) => scene.id === selectedId) : undefined
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

  if (selectedScene) {
    return (
      <ArchiveDetail
        scene={selectedScene}
        locale={locale}
        onBack={() => onSelectScene()}
        onStartGame={onStartGame}
      />
    )
  }

  if (selectedId) {
    return (
      <section className="archive-detail__unavailable">
        <span aria-hidden="true">Ω</span>
        <h1>{copy.archive.unavailable}</h1>
        <button className="button button--ink" onClick={() => onSelectScene()}>
          <ArrowLeft size={16} /> {copy.archive.back}
        </button>
      </section>
    )
  }

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
          return (
            <a
              className="archive-myth-card"
              key={scene.id}
              href={`#/archive/${encodeURIComponent(scene.id)}`}
              aria-labelledby={`archive-title-${scene.id}`}
              onClick={(event) => { event.preventDefault(); onSelectScene(scene.id) }}
            >
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
                  <strong>{copy.archive.openStory} <ArrowRight size={14} /></strong>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </>
  )
}

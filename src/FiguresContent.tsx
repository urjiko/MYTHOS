import { ArrowRight } from 'lucide-react'
import { mythScenes } from './data'
import { figureProfiles, profilesForCategory, type FigureCategory } from './figures'
import { localiseMythTitle, ui, type Locale } from './i18n'

type FiguresContentProps = {
  category: FigureCategory
  locale: Locale
  selectedId?: string
  onCategoryChange: (category: FigureCategory) => void
  onSelectFigure: (figureId?: string) => void
}

export default function FiguresContent({
  category,
  locale,
  selectedId,
  onCategoryChange,
  onSelectFigure,
}: FiguresContentProps) {
  const copy = ui[locale]
  const profiles = profilesForCategory(category)
  const selected = figureProfiles.find((profile) => profile.id === selectedId && profile.category === category)

  if (selected) {
    const appearances = selected.appearanceIds
      .map((id) => mythScenes.find((scene) => scene.id === id))
      .filter((scene): scene is NonNullable<typeof scene> => Boolean(scene))

    return (
      <main id="main-content" className="figure-detail section-shell" tabIndex={-1}>
        <button className="figure-back" onClick={() => onSelectFigure()}>← {copy.figures.back}</button>
        <div className="figure-detail__hero">
          <img src={selected.image} alt="" decoding="async" style={{ objectPosition: selected.objectPosition }} />
          <div className="figure-detail__veil" />
          <div>
            <span className="kicker">{category === 'heroes' ? copy.figures.heroesTitle : copy.figures.creaturesTitle}</span>
            <h1>{selected.name[locale]}</h1>
            <p>{selected.epithet[locale]}</p>
          </div>
        </div>
        <div className="figure-detail__body">
          <div className="figure-detail__summary">
            <p>{selected.summary[locale]}</p>
            <a href={selected.externalUrl} target="_blank" rel="noreferrer">
              {copy.figures.more} {selected.externalSite} <ArrowRight size={16} />
            </a>
          </div>
          <aside>
            <span>{copy.figures.facts}</span>
            <ul>{selected.facts.map((fact) => <li key={fact.en}>{fact[locale]}</li>)}</ul>
          </aside>
        </div>
        <section className="figure-appearances">
          <span className="kicker">{copy.figures.appears}</span>
          <div>
            {appearances.length
              ? appearances.map((scene) => (
                <article key={scene.id}>
                  <img src={scene.image} alt="" loading="lazy" decoding="async" />
                  <span>{localiseMythTitle(scene.title, locale)}</span>
                </article>
              ))
              : <p>{copy.figures.unavailable}</p>}
          </div>
        </section>
      </main>
    )
  }

  return (
    <main id="main-content" className="inner-page__main section-shell" tabIndex={-1}>
      <span className="kicker">{copy.figures.kicker}</span>
      <h1>{category === 'heroes' ? copy.figures.heroesTitle : copy.figures.creaturesTitle}</h1>
      <p className="inner-page__lede">{category === 'heroes' ? copy.figures.heroesLede : copy.figures.creaturesLede}</p>
      <div className="figure-tabs" role="group" aria-label={copy.accessibility.figureCategories}>
        <button aria-pressed={category === 'heroes'} className={category === 'heroes' ? 'is-active' : ''} onClick={() => onCategoryChange('heroes')}>{copy.figures.heroesTitle}</button>
        <button aria-pressed={category === 'creatures'} className={category === 'creatures' ? 'is-active' : ''} onClick={() => onCategoryChange('creatures')}>{copy.figures.creaturesTitle}</button>
      </div>
      <div className="figure-grid">
        {profiles.map((profile) => (
          <button className="figure-card" key={profile.id} onClick={() => onSelectFigure(profile.id)} aria-label={`${copy.figures.open}: ${profile.name[locale]}`}>
            <img src={profile.image} alt="" loading="lazy" decoding="async" style={{ objectPosition: profile.objectPosition }} />
            <span><strong>{profile.name[locale]}</strong><small>{profile.epithet[locale]}</small></span>
            <ArrowRight size={18} />
          </button>
        ))}
      </div>
    </main>
  )
}

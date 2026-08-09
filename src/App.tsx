import { lazy, Suspense, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { ArrowRight, Compass, Map, Menu, Sparkles, X } from 'lucide-react'
import type { MythMapProps } from './AncientMap'
import { archiveScenesForFilter, type ArchiveFilter } from './archive'
import { atlasPlaces, collections, mythScenes } from './data'
import { figureProfiles, profilesForCategory, type FigureCategory } from './figures'
import { DEFAULT_ROUND_COUNT, TROJAN_ROUTE_IDS, type GameMode } from './gameDeck'
import { localiseMythTitle, localisedNumber, persistLocale, resolveLocale, ui, type Locale } from './i18n'
import { appRouteTitle, appRouteToHash, parseAppRoute, type AppRoute } from './routing'
import { IconForMode, Logo, Ornament } from './ui'

const Game = lazy(() => import('./components'))
const MythMap = lazy(() => import('./AncientMap').then((module) => ({ default: module.MythMap })))

type NavigationView = 'home' | 'atlas' | 'archive'

const maximumScore = DEFAULT_ROUND_COUNT * 10_000
const odysseySceneCount = mythScenes.filter((scene) => scene.category === 'odyssey').length
const trojanSceneCount = TROJAN_ROUTE_IDS.length

function MapPlaceholder({ locale = 'en' }: { locale?: Locale }) {
  return (
    <div className="myth-map myth-map--placeholder" role="status">
      <span>{locale === 'tr' ? 'Antik harita hazırlanıyor…' : 'Preparing the ancient map…'}</span>
    </div>
  )
}

function DeferredMythMap(props: MythMapProps) {
  const placeholderRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const placeholder = placeholderRef.current
    if (!placeholder || shouldLoad) return

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setShouldLoad(true)
      observer.disconnect()
    }, { rootMargin: '400px' })

    observer.observe(placeholder)
    return () => observer.disconnect()
  }, [shouldLoad])

  if (!shouldLoad) {
    return (
      <div ref={placeholderRef} className="myth-map myth-map--placeholder" role="status">
        <span>{props.locale === 'tr' ? 'Antik harita kaydırınca yüklenecek' : 'The ancient map will load as you scroll'}</span>
      </div>
    )
  }

  return (
    <Suspense fallback={<MapPlaceholder locale={props.locale} />}>
      <MythMap {...props} />
    </Suspense>
  )
}

function GamePlaceholder({ locale }: { locale: Locale }) {
  return (
    <main id="main-content" className="game-loading" role="status" tabIndex={-1}>
      <Logo inverse />
      <span>{locale === 'tr' ? 'Kehanet hazırlanıyor…' : 'Preparing the oracle…'}</span>
    </main>
  )
}

const routeStops = [
  { name: 'Troy', note: { en: 'The war ends', tr: 'Savaş sona erer' } },
  { name: 'Ismaros', note: { en: 'The Cicones strike back', tr: 'Kikonlar karşı saldırıya geçer' } },
  { name: 'Djerba', note: { en: 'The lotus temptation', tr: 'Lotus ayartısı' } },
  { name: 'Cyclopes’ Coast', note: { en: 'Nobody and the giant', tr: 'Hiç Kimse ve dev' } },
  { name: 'Lipari', note: { en: 'The bag of winds', tr: 'Rüzgâr torbası' } },
  { name: 'Formiae', note: { en: 'The fleet is shattered', tr: 'Filo parçalanır' } },
  { name: 'Aeaea', note: { en: 'Circe’s enchantment', tr: 'Kirke’nin büyüsü' } },
  { name: 'Acheron', note: { en: 'Counsel from the dead', tr: 'Ölülerden öğüt' } },
  { name: 'Siren Rocks', note: { en: 'The forbidden song', tr: 'Yasak şarkı' } },
  { name: 'Messina Strait', note: { en: 'Two sea dangers', tr: 'İki deniz tehlikesi' } },
  { name: 'Thrinacia', note: { en: 'The Sun’s sacred cattle', tr: 'Güneş’in kutsal sığırları' } },
  { name: 'Ogygia', note: { en: 'Calypso’s distant island', tr: 'Kalypso’nun uzak adası' } },
  { name: 'Scheria', note: { en: 'The Phaeacians’ welcome', tr: 'Phaiakların karşılaması' } },
  { name: 'Ithaca', note: { en: 'The homecoming', tr: 'Eve dönüş' } },
]

function FateDisk() {
  return (
    <div className="fate-disk" aria-hidden="true">
      <div className="fate-disk__aura" />
      <div className="fate-disk__orbit fate-disk__orbit--outer">
        <span>OLYMPUS</span><span>DELPHI</span><span>TROIA</span><span>KNOSSOS</span>
      </div>
      <div className="fate-disk__orbit fate-disk__orbit--middle" />
      <div className="fate-disk__face">
        <div className="fate-disk__sun" />
        <span className="fate-disk__symbol fate-disk__symbol--one">ϟ</span>
        <span className="fate-disk__symbol fate-disk__symbol--two">Ψ</span>
        <span className="fate-disk__symbol fate-disk__symbol--three">☿</span>
        <span className="fate-disk__symbol fate-disk__symbol--four">☾</span>
        <div className="fate-disk__eye"><i /></div>
      </div>
      <span className="fate-pin fate-pin--one"><i />Olympus</span>
      <span className="fate-pin fate-pin--two"><i />Troy</span>
      <span className="fate-pin fate-pin--three"><i />Crete</span>
    </div>
  )
}

type NavigationProps = {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  onNavigate: (view: NavigationView) => void
  onShowAbout: () => void
  onStartGame: (mode: GameMode) => void
  onOpenFigures: (category: FigureCategory) => void
}

function LanguageSwitch({ locale, onLocaleChange, compact = false }: {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  compact?: boolean
}) {
  const copy = ui[locale]
  return (
    <div className={`language-switch ${compact ? 'language-switch--compact' : ''}`} aria-label={copy.nav.language}>
      <button className={locale === 'en' ? 'is-active' : ''} onClick={() => onLocaleChange('en')} lang="en" aria-pressed={locale === 'en'}>EN</button>
      <span aria-hidden="true">/</span>
      <button className={locale === 'tr' ? 'is-active' : ''} onClick={() => onLocaleChange('tr')} lang="tr" aria-pressed={locale === 'tr'}>TR</button>
    </div>
  )
}

function Header({ locale, onLocaleChange, onNavigate, onShowAbout, onStartGame }: NavigationProps) {
  const [open, setOpen] = useState(false)
  const copy = ui[locale]
  const menuId = useId()
  const navRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const mobileViewport = window.matchMedia('(max-width: 760px)')
    if (!mobileViewport.matches) return

    const previousOverflow = document.body.style.overflow
    const background = Array.from(document.querySelectorAll<HTMLElement>('main, footer, .site-header > .logo-button'))
    document.body.style.overflow = 'hidden'
    background.forEach((element) => element.setAttribute('inert', ''))

    const frame = window.requestAnimationFrame(() => {
      navRef.current?.querySelector<HTMLElement>('button, a[href]')?.focus()
    })
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (!event.matches) setOpen(false)
    }
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setOpen(false)
      window.requestAnimationFrame(() => menuButtonRef.current?.focus())
    }

    mobileViewport.addEventListener('change', closeOnDesktop)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      window.cancelAnimationFrame(frame)
      mobileViewport.removeEventListener('change', closeOnDesktop)
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = previousOverflow
      background.forEach((element) => element.removeAttribute('inert'))
    }
  }, [open])

  function trapMenuFocus(event: KeyboardEvent<HTMLElement>) {
    if (!open || event.key !== 'Tab') return
    const nav = navRef.current
    const menuButton = menuButtonRef.current
    if (!nav || !menuButton) return

    const items = [
      ...nav.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]'),
      menuButton,
    ]
    const first = items[0]
    const last = items.at(-1)
    if (!first || !last) return

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <header className="site-header" onKeyDown={trapMenuFocus}>
      <button className="logo-button" aria-label={copy.nav.home} onClick={() => onNavigate('home')}><Logo /></button>
      <nav ref={navRef} id={menuId} className={open ? 'is-open' : ''} aria-label={copy.nav.primary}>
        <button onClick={() => { onNavigate('archive'); setOpen(false) }}>{copy.nav.archive}</button>
        <button onClick={() => { onNavigate('atlas'); setOpen(false) }}>{copy.nav.atlas}</button>
        <a href="#/about" onClick={(event) => { event.preventDefault(); onShowAbout(); setOpen(false) }}>{copy.nav.about}</a>
        <LanguageSwitch locale={locale} onLocaleChange={onLocaleChange} />
        <button className="nav-play" onClick={() => { onStartGame('all'); setOpen(false) }}><Sparkles size={15} /> {copy.nav.begin}</button>
      </nav>
      <button
        ref={menuButtonRef}
        className="mobile-menu"
        onClick={() => setOpen(!open)}
        aria-controls={menuId}
        aria-expanded={open}
        aria-label={open ? copy.nav.closeMenu : copy.nav.openMenu}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  )
}

function Home(props: NavigationProps) {
  const { locale, onNavigate, onStartGame, onOpenFigures } = props
  const copy = ui[locale]
  const [best, setBest] = useState(0)
  useEffect(() => setBest(Number(localStorage.getItem('mythos-best-score') || 0)), [])

  const modes: Array<{
    type: string
    title: string
    note: string
    badge?: string
    gameMode?: GameMode
    destination?: NavigationView
  }> = [
    { type: 'journey', title: copy.modes.classicTitle, note: copy.modes.classicNote, badge: copy.modes.random, gameMode: 'all' },
    { type: 'odyssey', title: copy.modes.odysseyTitle, note: copy.modes.odysseyNote(odysseySceneCount), badge: copy.modes.new, gameMode: 'odyssey' },
    { type: 'duel', title: copy.modes.iliadTitle, note: copy.modes.iliadNote(trojanSceneCount), badge: copy.modes.new, gameMode: 'iliad' },
    { type: 'archive', title: copy.modes.archiveTitle, note: copy.modes.archiveNote, destination: 'archive' },
  ]

  const collectionCopy = {
    Olympians: { title: copy.collections.olympians, note: copy.collections.olympiansNote },
    Heroes: { title: copy.collections.heroes, note: copy.collections.heroesNote },
    Creatures: { title: copy.collections.creatures, note: copy.collections.creaturesNote },
    'Trojan Cycle': { title: copy.collections.trojan, note: copy.collections.trojanNote },
  }

  return (
    <>
      <Header {...props} />
      <main id="main-content" tabIndex={-1}>
        <section className="hero">
          <div className="hero__noise" />
          <div className="hero__copy">
            <span className="kicker"><span className="kicker__line" /> {copy.home.oracleAwaits}</span>
            <h1>{copy.home.enter}<br /><em>{copy.home.legend}</em></h1>
            <p>{copy.home.intro}</p>
            <div className="hero__actions">
              <button className="button button--terracotta" onClick={() => onStartGame('all')}>
                {copy.home.begin} <ArrowRight size={17} />
              </button>
              <button className="button button--ghost" onClick={() => onNavigate('atlas')}>
                {copy.home.atlas} <Map size={17} />
              </button>
            </div>
            <div className="hero__meta">
              <span><strong>{DEFAULT_ROUND_COUNT}</strong> {copy.home.randomScenes}</span>
              <span><strong>{localisedNumber(maximumScore, locale)}</strong> {copy.home.max}</span>
              <span><strong>{best ? localisedNumber(best, locale) : '—'}</strong> {copy.home.best}</span>
            </div>
          </div>
          <div className="hero__visual"><FateDisk /></div>
          <div className="hero__scroll"><span /> {copy.home.descend}</div>
        </section>

        <section className="modes section-shell">
          <div className="section-heading">
            <span className="kicker">{copy.home.choose}</span>
            <h2>{copy.home.journeys}<br /><em>{copy.home.withOracle}</em></h2>
            <p>{copy.home.prototype}</p>
          </div>
          <div className="mode-grid">
            {modes.map((mode, index) => (
              <button
                key={mode.title}
                className="mode-card"
                onClick={() => mode.gameMode ? onStartGame(mode.gameMode) : mode.destination ? onNavigate(mode.destination) : undefined}
              >
                <span className="mode-card__number">0{index + 1}</span>
                <span className="mode-card__icon"><IconForMode type={mode.type} /></span>
                {mode.badge && <small>{mode.badge}</small>}
                <h3>{mode.title}</h3>
                <p>{mode.note}</p>
                <i><ArrowRight size={17} /></i>
              </button>
            ))}
          </div>
        </section>

        <section className="collections">
          <div className="section-shell">
            <div className="section-heading section-heading--row">
              <div><span className="kicker">{copy.home.archiveKicker}</span><h2>{copy.home.immortal}<br /><em>{copy.home.mortal}</em></h2></div>
              <button className="text-link" onClick={() => onNavigate('archive')}>{copy.home.viewCollections} <ArrowRight size={16} /></button>
            </div>
            <div className="collection-grid">
              {collections.map((collection) => {
                const translated = collectionCopy[collection.title as keyof typeof collectionCopy]
                const figureCategory = collection.title === 'Heroes'
                  ? 'heroes'
                  : collection.title === 'Creatures'
                    ? 'creatures'
                    : null
                return (
                  <button
                    className={`collection-card ${figureCategory ? 'collection-card--interactive' : ''}`}
                    key={collection.title}
                    style={{ '--accent': collection.color } as React.CSSProperties}
                    onClick={() => figureCategory ? onOpenFigures(figureCategory) : onNavigate('archive')}
                  >
                    <img src={collection.art} alt="" loading="lazy" decoding="async" onError={(event) => { event.currentTarget.style.display = 'none' }} />
                    <span className="collection-card__veil" />
                    <span>{collection.count} {copy.home.stories}</span>
                    <div>
                      <h3>{translated.title}</h3>
                      <p>{translated.note}</p>
                      {figureCategory && <small>{copy.home.exploreFigures}</small>}
                    </div>
                    <ArrowRight />
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <section className="atlas-preview section-shell">
          <div className="atlas-preview__copy">
            <span className="kicker">{copy.home.geography}</span>
            <h2>{copy.home.legends}<br /><em>{copy.home.void}</em></h2>
            <p>{copy.home.geographyText}</p>
            <div className="atlas-preview__stats">
              <span><strong>{atlasPlaces.length}</strong><small>{copy.home.mappedPlaces}</small></span>
              <span><strong>{mythScenes.length}</strong><small>{copy.home.playableMyths}</small></span>
              <span><strong>01</strong><small>{copy.home.livingAtlas}</small></span>
            </div>
            <button className="button button--ink" onClick={() => onNavigate('atlas')}>{copy.home.exploreAtlas} <Compass size={17} /></button>
          </div>
          <div className="atlas-preview__map">
            <div className="browser-bar"><i /><i /><i /><span>MYTHOS / ATLAS</span></div>
            <DeferredMythMap showRoute locale={locale} />
            <span className="atlas-preview__legend">{copy.home.mapLegend}</span>
          </div>
        </section>

        <section className="manifesto" id="manifesto" tabIndex={-1}>
          <Ornament />
          <span className="manifesto__symbol">Ω</span>
          <blockquote>{copy.home.quote}</blockquote>
          <p>{copy.home.manifesto}</p>
          <button className="button button--gold" onClick={() => onStartGame('all')}>{copy.home.firstOracle} <ArrowRight size={17} /></button>
        </section>
      </main>
      <Footer {...props} />
    </>
  )
}

function AtlasPage(props: NavigationProps) {
  const { locale, onStartGame } = props
  const copy = ui[locale]
  return (
    <div className="inner-page">
      <Header {...props} />
      <main id="main-content" className="inner-page__main section-shell" tabIndex={-1}>
        <span className="kicker">{copy.atlas.kicker}</span>
        <h1>{copy.atlas.title} <em>{copy.atlas.titleEm}</em></h1>
        <p className="inner-page__lede">{copy.atlas.lede}</p>
        <div className="atlas-page__layout">
          <Suspense fallback={<MapPlaceholder locale={locale} />}>
            <MythMap showRoute locale={locale} />
          </Suspense>
          <aside>
            <span>{copy.atlas.selected}</span>
            <h2>{copy.atlas.route}</h2>
            <p>{copy.atlas.routeText}</p>
            <ol>
              {routeStops.map((stop, index) => (
                <li key={stop.name}><i>{String(index + 1).padStart(2, '0')}</i>{stop.name}<small>{stop.note[locale]}</small></li>
              ))}
            </ol>
            <button className="button button--terracotta" onClick={() => onStartGame('odyssey')}>{copy.atlas.play} <ArrowRight size={17} /></button>
          </aside>
        </div>
      </main>
      <Footer {...props} />
    </div>
  )
}

function ArchivePage(props: NavigationProps) {
  const { locale, onStartGame } = props
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
    <div className="inner-page">
      <Header {...props} />
      <main id="main-content" className="inner-page__main section-shell" tabIndex={-1}>
        <span className="kicker">{copy.archive.kicker}</span>
        <h1>{copy.archive.title} <em>{copy.archive.titleEm}</em></h1>
        <p className="inner-page__lede">{copy.archive.lede(mythScenes.length)}</p>
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
          {filteredScenes.map((scene, index) => (
            <article className="archive-myth-card" key={scene.id} aria-labelledby={`archive-title-${scene.id}`}>
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
                  <span>{scene.cycle}</span>
                </div>
                <h2 id={`archive-title-${scene.id}`}>{localiseMythTitle(scene.title, locale)}</h2>
                <p className="archive-myth-card__location">{scene.location}</p>
                <div className="archive-myth-card__source">
                  <span>{copy.archive.source}</span>
                  <p>{scene.source}</p>
                  {scene.pleiadesUrl && (
                    <a href={scene.pleiadesUrl} target="_blank" rel="noreferrer">{copy.archive.placeRecord}</a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer {...props} />
    </div>
  )
}

function FiguresPage({ category, selectedId, onCategoryChange, onSelectFigure, ...props }: NavigationProps & {
  category: FigureCategory
  selectedId?: string
  onCategoryChange: (category: FigureCategory) => void
  onSelectFigure: (figureId?: string) => void
}) {
  const { locale } = props
  const copy = ui[locale]
  const profiles = profilesForCategory(category)
  const selected = figureProfiles.find((profile) => profile.id === selectedId && profile.category === category)

  if (selected) {
    const appearances = selected.appearanceIds
      .map((id) => mythScenes.find((scene) => scene.id === id))
      .filter((scene): scene is NonNullable<typeof scene> => Boolean(scene))
    return (
      <div className="inner-page figure-page">
        <Header {...props} />
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
        <Footer {...props} />
      </div>
    )
  }

  return (
    <div className="inner-page figure-page">
      <Header {...props} />
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
      <Footer {...props} />
    </div>
  )
}

function Footer(props: NavigationProps) {
  const { locale, onNavigate, onShowAbout, onStartGame } = props
  const copy = ui[locale]
  return (
    <footer className="site-footer">
      <div><Logo inverse /><p>{copy.footer.tagline}</p></div>
      <nav aria-label={copy.nav.footer}><button onClick={() => onStartGame('all')}>{copy.footer.play}</button><button onClick={() => onNavigate('atlas')}>{copy.footer.atlas}</button><button onClick={() => onNavigate('archive')}>{copy.footer.archive}</button><a href="#/about" onClick={(event) => { event.preventDefault(); onShowAbout() }}>{copy.footer.about}</a></nav>
      <span>{copy.footer.version}<br />{copy.footer.credit}</span>
    </footer>
  )
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => parseAppRoute(window.location.hash))
  const [locale, setLocale] = useState<Locale>(() => resolveLocale())
  const initialRoute = useRef(true)

  function navigate(nextRoute: AppRoute, replace = false) {
    const hash = appRouteToHash(nextRoute)

    if (replace) {
      window.history.replaceState(null, '', hash)
      setRoute(nextRoute)
      return
    }

    if (window.location.hash === hash) {
      setRoute({ ...nextRoute })
      return
    }

    window.location.hash = hash
  }

  function navigateView(view: NavigationView) {
    navigate({ view })
  }

  function startGame(mode: GameMode) {
    navigate({ view: 'game', mode })
  }

  function openFigures(category: FigureCategory) {
    navigate({ view: 'figures', category })
  }

  function changeLocale(nextLocale: Locale) {
    persistLocale(nextLocale)
    setLocale(nextLocale)
  }

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = appRouteTitle(route, locale)
  }, [locale, route])

  useEffect(() => {
    const syncRoute = () => setRoute(parseAppRoute(window.location.hash))
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    const shouldMoveFocus = !initialRoute.current
    const frame = window.requestAnimationFrame(() => {
      if (route.view === 'about') {
        const manifesto = document.getElementById('manifesto')
        manifesto?.scrollIntoView({ block: 'start' })
        if (shouldMoveFocus) manifesto?.focus({ preventScroll: true })
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' })
        if (shouldMoveFocus) document.getElementById('main-content')?.focus({ preventScroll: true })
      }
      initialRoute.current = false
    })

    return () => window.cancelAnimationFrame(frame)
  }, [route])

  const navigationProps: NavigationProps = {
    locale,
    onLocaleChange: changeLocale,
    onNavigate: navigateView,
    onShowAbout: () => navigate({ view: 'about' }),
    onStartGame: startGame,
    onOpenFigures: openFigures,
  }

  let content: ReactNode
  if (route.view === 'game') {
    content = (
      <Suspense fallback={<GamePlaceholder locale={locale} />}>
        <Game key={route.mode} mode={route.mode} locale={locale} onLocaleChange={changeLocale} onExit={() => navigate({ view: 'home' }, true)} />
      </Suspense>
    )
  } else if (route.view === 'atlas') {
    content = <AtlasPage {...navigationProps} />
  } else if (route.view === 'archive') {
    content = <ArchivePage {...navigationProps} />
  } else if (route.view === 'figures') {
    content = (
      <FiguresPage
        {...navigationProps}
        category={route.category}
        selectedId={route.figureId}
        onCategoryChange={(category) => navigate({ view: 'figures', category })}
        onSelectFigure={(figureId) => navigate({ view: 'figures', category: route.category, figureId })}
      />
    )
  } else {
    content = <Home {...navigationProps} />
  }

  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault()
          const main = document.getElementById('main-content')
          main?.scrollIntoView({ block: 'start' })
          main?.focus({ preventScroll: true })
        }}
      >
        {ui[locale].accessibility.skip}
      </a>
      {content}
    </>
  )
}

import { lazy, Suspense, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { ArrowRight, Compass, Map, Menu, Sparkles, X } from 'lucide-react'
import type { MythMapProps } from './AncientMap'
import AmbientAudio from './AmbientAudio'
import { catalogSummary, collections } from './catalogSummary'
import type { FigureCategory } from './figures'
import { DEFAULT_ROUND_COUNT, HIPPOLYTA_ROUTE_IDS, TROJAN_ROUTE_IDS, type GameMode } from './gameConfig'
import { gameSessionSummary, type GameSessionSummary } from './gameSessionSummary'
import { localisedNumber, persistLocale, resolveLocale, ui, type Locale } from './i18n'
import InstallPrompt from './InstallPrompt'
import { appRouteTitle, appRouteToHash, parseAppRoute, type AppRoute } from './routing'
import { readStoredNumber } from './storage'
import { IconForMode, Logo, Ornament } from './ui'

const Game = lazy(() => import('./components'))
const MythMap = lazy(() => import('./AncientMap').then((module) => ({ default: module.MythMap })))
const ArchiveContent = lazy(() => import('./ArchiveContent'))
const FiguresContent = lazy(() => import('./FiguresContent'))

type NavigationView = 'home' | 'atlas' | 'archive'

const maximumScore = DEFAULT_ROUND_COUNT * 10_000
const odysseySceneCount = catalogSummary.odysseyScenes
const trojanSceneCount = TROJAN_ROUTE_IDS.length
const hippolytaSceneCount = HIPPOLYTA_ROUTE_IDS.length

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

function RouteContentPlaceholder({ locale, section }: { locale: Locale; section: 'archive' | 'figures' }) {
  const label = section === 'archive'
    ? locale === 'tr' ? 'Mit arşivi hazırlanıyor…' : 'Preparing the myth archive…'
    : locale === 'tr' ? 'Kişiler ve varlıklar hazırlanıyor…' : 'Preparing people and beings…'

  return <div className="route-content-loading" role="status"><span>{label}</span></div>
}

const routeStops = [
  { name: { en: 'Troy', tr: 'Troya' }, note: { en: 'The war ends', tr: 'Savaş sona erer' } },
  { name: { en: 'Ismaros', tr: 'Ismaros' }, note: { en: 'The Cicones strike back', tr: 'Kikonlar karşı saldırıya geçer' } },
  { name: { en: 'Djerba', tr: 'Cerbe' }, note: { en: 'The lotus temptation', tr: 'Lotus ayartısı' } },
  { name: { en: 'Cyclopes’ Coast', tr: 'Kykloplar Kıyısı' }, note: { en: 'Nobody and the giant', tr: 'Hiç Kimse ve dev' } },
  { name: { en: 'Lipari', tr: 'Lipari' }, note: { en: 'The bag of winds', tr: 'Rüzgâr torbası' } },
  { name: { en: 'Formiae', tr: 'Formiae' }, note: { en: 'The fleet is shattered', tr: 'Filo parçalanır' } },
  { name: { en: 'Aeaea', tr: 'Aiaia' }, note: { en: 'Circe’s enchantment', tr: 'Kirke’nin büyüsü' } },
  { name: { en: 'Acheron', tr: 'Akheron' }, note: { en: 'Counsel from the dead', tr: 'Ölülerden öğüt' } },
  { name: { en: 'Siren Rocks', tr: 'Siren Kayalıkları' }, note: { en: 'The forbidden song', tr: 'Yasak şarkı' } },
  { name: { en: 'Messina Strait', tr: 'Messina Boğazı' }, note: { en: 'Two sea dangers', tr: 'İki deniz tehlikesi' } },
  { name: { en: 'Thrinacia', tr: 'Thrinakia' }, note: { en: 'The Sun’s sacred cattle', tr: 'Güneş’in kutsal sığırları' } },
  { name: { en: 'Ogygia', tr: 'Ogygia' }, note: { en: 'Calypso’s distant island', tr: 'Kalypso’nun uzak adası' } },
  { name: { en: 'Scheria', tr: 'Skheria' }, note: { en: 'The Phaeacians’ welcome', tr: 'Phaiakların karşılaması' } },
  { name: { en: 'Ithaca', tr: 'İthaka' }, note: { en: 'The homecoming', tr: 'Eve dönüş' } },
]

function FateDisk({ locale }: { locale: Locale }) {
  const labels = locale === 'tr'
    ? { olympus: 'Olympos', delphi: 'Delphoi', troy: 'Troya', crete: 'Girit' }
    : { olympus: 'Olympus', delphi: 'Delphi', troy: 'Troy', crete: 'Crete' }
  return (
    <div className="fate-disk" aria-hidden="true">
      <div className="fate-disk__aura" />
      <div className="fate-disk__orbit fate-disk__orbit--outer">
        <span>{labels.olympus.toUpperCase()}</span><span>{labels.delphi.toUpperCase()}</span><span>TROIA</span><span>KNOSSOS</span>
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
      <span className="fate-pin fate-pin--one"><i />{labels.olympus}</span>
      <span className="fate-pin fate-pin--two"><i />{labels.troy}</span>
      <span className="fate-pin fate-pin--three"><i />{labels.crete}</span>
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
  const [best] = useState(() => readStoredNumber('mythos-best-score'))
  const [savedModes] = useState<Partial<Record<GameMode, GameSessionSummary>>>(() => {
    const summaries: Partial<Record<GameMode, GameSessionSummary>> = {}
    for (const mode of ['all', 'odyssey', 'iliad', 'hippolyta'] as const) {
      const summary = gameSessionSummary(mode)
      if (summary) summaries[mode] = summary
    }
    return summaries
  })

  const modeNote = (mode: GameMode, fallback: string) => {
    const saved = savedModes[mode]
    if (!saved) return fallback
    return saved.finished ? copy.modes.resultsSaved : copy.modes.resumeNote(saved.round, saved.total)
  }

  const modes: Array<{
    type: string
    title: string
    note: string
    badge?: string
    gameMode?: GameMode
    destination?: NavigationView
  }> = [
    { type: 'journey', title: copy.modes.classicTitle, note: modeNote('all', copy.modes.classicNote), badge: savedModes.all ? copy.modes.continue : copy.modes.random, gameMode: 'all' },
    { type: 'odyssey', title: copy.modes.odysseyTitle, note: modeNote('odyssey', copy.modes.odysseyNote(odysseySceneCount)), badge: savedModes.odyssey ? copy.modes.continue : copy.modes.new, gameMode: 'odyssey' },
    { type: 'duel', title: copy.modes.iliadTitle, note: modeNote('iliad', copy.modes.iliadNote(trojanSceneCount)), badge: savedModes.iliad ? copy.modes.continue : copy.modes.new, gameMode: 'iliad' },
    { type: 'labour', title: copy.modes.hippolytaTitle, note: modeNote('hippolyta', copy.modes.hippolytaNote(hippolytaSceneCount)), badge: savedModes.hippolyta ? copy.modes.continue : copy.modes.new, gameMode: 'hippolyta' },
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
      <InstallPrompt locale={locale} />
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
          <div className="hero__visual"><FateDisk locale={locale} /></div>
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
              <span><strong>{catalogSummary.atlasPlaces}</strong><small>{copy.home.mappedPlaces}</small></span>
              <span><strong>{catalogSummary.mythScenes}</strong><small>{copy.home.playableMyths}</small></span>
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
                <li key={stop.name.en}><i>{String(index + 1).padStart(2, '0')}</i>{stop.name[locale]}<small>{stop.note[locale]}</small></li>
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

function ArchivePage({ selectedId, onSelectScene, ...props }: NavigationProps & {
  selectedId?: string
  onSelectScene: (sceneId?: string) => void
}) {
  const { locale } = props
  const copy = ui[locale]

  return (
    <div className={`inner-page ${selectedId ? 'archive-detail-page' : ''}`}>
      <Header {...props} />
      <main id="main-content" className="inner-page__main section-shell" tabIndex={-1}>
        {!selectedId && (
          <>
            <span className="kicker">{copy.archive.kicker}</span>
            <h1>{copy.archive.title} <em>{copy.archive.titleEm}</em></h1>
            <p className="inner-page__lede">{copy.archive.lede(catalogSummary.mythScenes)}</p>
          </>
        )}
        <Suspense fallback={<RouteContentPlaceholder locale={locale} section="archive" />}>
          <ArchiveContent
            locale={locale}
            selectedId={selectedId}
            onSelectScene={onSelectScene}
            onStartGame={props.onStartGame}
          />
        </Suspense>
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
  return (
    <div className="inner-page figure-page">
      <Header {...props} />
      <Suspense fallback={(
        <main id="main-content" className="inner-page__main section-shell" tabIndex={-1}>
          <RouteContentPlaceholder locale={props.locale} section="figures" />
        </main>
      )}>
        <FiguresContent
          category={category}
          locale={props.locale}
          selectedId={selectedId}
          onCategoryChange={onCategoryChange}
          onSelectFigure={onSelectFigure}
        />
      </Suspense>
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
    content = (
      <ArchivePage
        {...navigationProps}
        selectedId={route.sceneId}
        onSelectScene={(sceneId) => navigate({ view: 'archive', sceneId })}
      />
    )
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
      <AmbientAudio locale={locale} placement={route.view === 'game' ? 'game' : 'site'} />
      {content}
    </>
  )
}

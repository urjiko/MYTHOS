import { useEffect, useState } from 'react'
import { atlasPlaces, collections, mythScenes } from './data'
import { DEFAULT_ROUND_COUNT, type GameMode } from './gameDeck'
import {
  ArrowRight,
  Compass,
  Game,
  IconForMode,
  Logo,
  Map,
  Menu,
  MythMap,
  Ornament,
  Sparkles,
  X,
} from './components'

type View = 'home' | 'game' | 'atlas' | 'archive'

const maximumScore = DEFAULT_ROUND_COUNT * 10_000
const odysseySceneCount = mythScenes.filter((scene) => scene.category === 'odyssey').length

const modes: Array<{
  type: string
  title: string
  note: string
  badge?: string
  gameMode?: GameMode
  destination?: View
  muted?: boolean
}> = [
  { type: 'journey', title: 'Classic Journey', note: 'Six myths drawn from the full archive in a new order every game.', badge: 'RANDOM', gameMode: 'all' },
  { type: 'odyssey', title: 'Odysseus’s Route', note: `Only the Odyssey voyage: ${odysseySceneCount} encounters, shuffled on every run.`, badge: 'NEW', gameMode: 'odyssey' },
  { type: 'duel', title: 'Duel of the Gods', note: 'Live one-on-one encounters planned for a later chapter.', badge: 'SOON', muted: true },
  { type: 'archive', title: 'Myth Archive', note: 'Explore gods, heroes, monsters, and ancient sources.', destination: 'archive' },
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
  onNavigate: (view: View) => void
  onStartGame: (mode: GameMode) => void
}

function Header({ onNavigate, onStartGame }: NavigationProps) {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <button className="logo-button" onClick={() => onNavigate('home')}><Logo /></button>
      <nav className={open ? 'is-open' : ''} aria-label="Primary navigation">
        <button onClick={() => { onNavigate('archive'); setOpen(false) }}>Archive</button>
        <button onClick={() => { onNavigate('atlas'); setOpen(false) }}>Atlas</button>
        <a href="#manifesto" onClick={() => setOpen(false)}>About</a>
        <button className="nav-play" onClick={() => { onStartGame('all'); setOpen(false) }}><Sparkles size={15} /> Begin the oracle</button>
      </nav>
      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Open or close menu">
        {open ? <X /> : <Menu />}
      </button>
    </header>
  )
}

function Home({ onNavigate, onStartGame }: NavigationProps) {
  const [best, setBest] = useState(0)
  useEffect(() => setBest(Number(localStorage.getItem('mythos-best-score') || 0)), [])

  return (
    <>
      <Header onNavigate={onNavigate} onStartGame={onStartGame} />
      <main>
        <section className="hero">
          <div className="hero__noise" />
          <div className="hero__copy">
            <span className="kicker"><span className="kicker__line" /> YOUR FIRST ORACLE AWAITS</span>
            <h1>Enter the<br /><em>legend.</em></h1>
            <p>Step into the world of gods, heroes, and monsters. Read the clues, identify the myth, and place it on the ancient map.</p>
            <div className="hero__actions">
              <button className="button button--terracotta" onClick={() => onStartGame('all')}>
                Begin the oracle <ArrowRight size={17} />
              </button>
              <button className="button button--ghost" onClick={() => onNavigate('atlas')}>
                Mythic atlas <Map size={17} />
              </button>
            </div>
            <div className="hero__meta">
              <span><strong>{DEFAULT_ROUND_COUNT}</strong> random scenes / game</span>
              <span><strong>{maximumScore.toLocaleString('en-US')}</strong> max OP</span>
              <span><strong>{best ? best.toLocaleString('en-US') : '—'}</strong> personal best</span>
            </div>
          </div>
          <div className="hero__visual"><FateDisk /></div>
          <div className="hero__scroll"><span /> DESCEND</div>
        </section>

        <section className="modes section-shell">
          <div className="section-heading">
            <span className="kicker">CHOOSE YOUR FATE</span>
            <h2>Every journey begins<br /><em>with an oracle.</em></h2>
            <p>The prototype turns close reading, spatial reasoning, and primary sources into one continuous journey through Greek myth.</p>
          </div>
          <div className="mode-grid">
            {modes.map((mode, index) => (
              <button
                key={mode.title}
                className={`mode-card ${mode.muted ? 'mode-card--muted' : ''}`}
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
              <div><span className="kicker">MYTH ARCHIVE</span><h2>Immortal stories,<br /><em>mortal flaws.</em></h2></div>
              <button className="text-link" onClick={() => onNavigate('archive')}>View every collection <ArrowRight size={16} /></button>
            </div>
            <div className="collection-grid">
              {collections.map((collection) => (
                <article className="collection-card" key={collection.title} style={{ '--accent': collection.color } as React.CSSProperties}>
                  <img src={collection.art} alt="" onError={(event) => { event.currentTarget.style.display = 'none' }} />
                  <div className="collection-card__veil" />
                  <span>{collection.count} STORIES</span>
                  <div><h3>{collection.title}</h3><p>{collection.note}</p></div>
                  <ArrowRight />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="atlas-preview section-shell">
          <div className="atlas-preview__copy">
            <span className="kicker">SACRED GEOGRAPHY</span>
            <h2>Legends did not<br /><em>live in a void.</em></h2>
            <p>From Olympus to Troy and Delphi to Crete, each story gathers around a mountain, island, sanctuary, or city. Zoom, pan, and open the sites to explore their ancient context.</p>
            <div className="atlas-preview__stats">
              <span><strong>{atlasPlaces.length}</strong><small>Mapped places</small></span>
              <span><strong>{mythScenes.length}</strong><small>Playable myths</small></span>
              <span><strong>01</strong><small>Living atlas</small></span>
            </div>
            <button className="button button--ink" onClick={() => onNavigate('atlas')}>Explore the atlas <Compass size={17} /></button>
          </div>
          <div className="atlas-preview__map">
            <div className="browser-bar"><i /><i /><i /><span>MYTHOS / ATLAS</span></div>
            <MythMap showRoute />
            <span className="atlas-preview__legend">GODS · HEROES · MONSTERS</span>
          </div>
        </section>

        <section className="manifesto" id="manifesto">
          <Ornament />
          <span className="manifesto__symbol">Ω</span>
          <blockquote>“Myths are not lies left in the past;<br /><em>they are the oldest truths we tell ourselves.</em>”</blockquote>
          <p>MYTHOS turns Greek mythology from a list to memorise into a world to explore, play, question, and trace back to its sources.</p>
          <button className="button button--gold" onClick={() => onStartGame('all')}>Make your first oracle <ArrowRight size={17} /></button>
        </section>
      </main>
      <Footer onNavigate={onNavigate} onStartGame={onStartGame} />
    </>
  )
}

function AtlasPage({ onNavigate, onStartGame }: NavigationProps) {
  return (
    <div className="inner-page">
      <Header onNavigate={onNavigate} onStartGame={onStartGame} />
      <main className="inner-page__main section-shell">
        <span className="kicker">SACRED GEOGRAPHY</span>
        <h1>Mythic <em>Atlas</em></h1>
        <p className="inner-page__lede">A navigable map built from real coastlines and ancient place records—not modern borders. Attested sites, later traditions, and purely mythic placements are identified as such.</p>
        <div className="atlas-page__layout">
          <MythMap showRoute />
          <aside>
            <span>SELECTED ROUTE</span>
            <h2>Odysseus returns</h2>
            <p>The route from Troy to Ithaca is not a literal sailing chart. Ancient geography, epic poetry, and centuries of interpretation overlap here.</p>
            <ol>
              <li><i>01</i> Troy <small>The war ends</small></li>
              <li><i>02</i> Ismaros <small>The Cicones strike back</small></li>
              <li><i>03</i> Djerba <small>The lotus temptation</small></li>
              <li><i>04</i> Cyclopes’ Coast <small>Nobody and the giant</small></li>
              <li><i>05</i> Lipari <small>The bag of winds</small></li>
              <li><i>06</i> Formiae <small>The fleet is shattered</small></li>
              <li><i>07</i> Aeaea <small>Circe’s enchantment</small></li>
              <li><i>08</i> Acheron <small>Counsel from the dead</small></li>
              <li><i>09</i> Siren Rocks <small>The forbidden song</small></li>
              <li><i>10</i> Messina Strait <small>Two sea dangers</small></li>
              <li><i>11</i> Thrinacia <small>The Sun’s sacred cattle</small></li>
              <li><i>12</i> Ogygia <small>Calypso’s distant island</small></li>
              <li><i>13</i> Scheria <small>The Phaeacians’ welcome</small></li>
              <li><i>14</i> Ithaca <small>The homecoming</small></li>
            </ol>
            <button className="button button--terracotta" onClick={() => onStartGame('odyssey')}>Play the route <ArrowRight size={17} /></button>
          </aside>
        </div>
      </main>
      <Footer onNavigate={onNavigate} onStartGame={onStartGame} />
    </div>
  )
}

function ArchivePage({ onNavigate, onStartGame }: NavigationProps) {
  return (
    <div className="inner-page">
      <Header onNavigate={onNavigate} onStartGame={onStartGame} />
      <main className="inner-page__main section-shell">
        <span className="kicker">MYTH ARCHIVE</span>
        <h1>Ancient <em>stories</em></h1>
        <p className="inner-page__lede">Nineteen playable stories now form the first chapter. The archive will grow as new panoramic scenes are researched and produced.</p>
        <div className="archive-page__filters">
          <button className="is-active">All</button><button>Gods</button><button>Heroes</button><button>Monsters</button><button>Troy</button>
        </div>
        <div className="archive-page__grid">
          {collections.map((collection, index) => (
            <article key={collection.title} style={{ '--accent': collection.color } as React.CSSProperties}>
              <div><img src={collection.art} alt="" onError={(event) => { event.currentTarget.style.display = 'none' }} /><span>0{index + 1}</span></div>
              <small>{collection.count} PLANNED STORIES</small>
              <h2>{collection.title}</h2>
              <p>{collection.note}</p>
              <button onClick={() => onStartGame('all')}>Play a random journey <ArrowRight size={15} /></button>
            </article>
          ))}
        </div>
      </main>
      <Footer onNavigate={onNavigate} onStartGame={onStartGame} />
    </div>
  )
}

function Footer({ onNavigate, onStartGame }: NavigationProps) {
  return (
    <footer className="site-footer">
      <div><Logo inverse /><p>A playable way to explore Greek mythology.</p></div>
      <nav><button onClick={() => onStartGame('all')}>Play</button><button onClick={() => onNavigate('atlas')}>Atlas</button><button onClick={() => onNavigate('archive')}>Archive</button><a href="#manifesto">About</a></nav>
      <span>MYTHOS · PROTOTYPE 0.4<br />ORIGINAL ART &amp; CODE</span>
    </footer>
  )
}

export default function App() {
  const [view, setView] = useState<View>('home')
  const [gameMode, setGameMode] = useState<GameMode>('all')

  function startGame(mode: GameMode) {
    setGameMode(mode)
    setView('game')
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [view])

  if (view === 'game') return <Game key={gameMode} mode={gameMode} onExit={() => setView('home')} />
  if (view === 'atlas') return <AtlasPage onNavigate={setView} onStartGame={startGame} />
  if (view === 'archive') return <ArchivePage onNavigate={setView} onStartGame={startGame} />
  return <Home onNavigate={setView} onStartGame={startGame} />
}

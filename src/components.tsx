import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Compass,
  Flame,
  Map,
  Menu,
  RotateCcw,
  Sparkles,
  Swords,
  Timer,
  Trophy,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Point } from './data'
import { atlasPlaces, mythScenes } from './data'
import { formatScore, scoreRound, type ScoreBreakdown } from './scoring'
import { SphereViewer } from './SphereViewer'

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`logo ${inverse ? 'logo--inverse' : ''}`} aria-label="MYTHOS ana sayfa">
      <svg className="logo__mark" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="20" />
        <path d="M12 24h24M24 12v24M16 16l16 16M32 16 16 32" />
        <circle cx="24" cy="24" r="5" />
      </svg>
      <span>MYTHOS</span>
    </span>
  )
}

export function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <span />
      <svg viewBox="0 0 120 18">
        <path d="M1 9h35l8-7 8 14 8-14 8 14 8-14 8 7h35" />
      </svg>
      <span />
    </div>
  )
}

export function MythMap({
  guess,
  target,
  reveal = false,
  interactive = false,
  onGuess,
}: {
  guess?: Point | null
  target?: Point
  reveal?: boolean
  interactive?: boolean
  onGuess?: (point: Point) => void
}) {
  const mapRef = useRef<HTMLDivElement>(null)

  const choosePoint = (clientX: number, clientY: number) => {
    if (!interactive || !mapRef.current || !onGuess) return
    const rect = mapRef.current.getBoundingClientRect()
    onGuess({
      x: Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)),
      y: Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100)),
    })
  }

  return (
    <div
      ref={mapRef}
      className={`myth-map ${interactive ? 'myth-map--interactive' : ''}`}
      role={interactive ? 'application' : 'img'}
      aria-label={interactive ? 'Mitolojik haritada tahmin noktası seç' : 'Mitolojik Ege atlası'}
      tabIndex={interactive ? 0 : undefined}
      onClick={(event) => choosePoint(event.clientX, event.clientY)}
      onKeyDown={(event) => {
        if (!interactive || !onGuess || !guess) return
        const delta = event.shiftKey ? 4 : 1.5
        const next = { ...guess }
        if (event.key === 'ArrowLeft') next.x -= delta
        if (event.key === 'ArrowRight') next.x += delta
        if (event.key === 'ArrowUp') next.y -= delta
        if (event.key === 'ArrowDown') next.y += delta
        if (next.x !== guess.x || next.y !== guess.y) {
          event.preventDefault()
          onGuess({ x: Math.min(100, Math.max(0, next.x)), y: Math.min(100, Math.max(0, next.y)) })
        }
      }}
    >
      <svg className="myth-map__land" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <filter id="paper-edge">
            <feTurbulence baseFrequency="0.02" numOctaves="3" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" />
          </filter>
          <pattern id="waves" width="36" height="18" patternUnits="userSpaceOnUse">
            <path d="M0 9Q9 1 18 9t18 0" />
          </pattern>
        </defs>
        <rect width="1000" height="620" className="myth-map__sea" />
        <rect width="1000" height="620" fill="url(#waves)" className="myth-map__waves" />
        <path
          filter="url(#paper-edge)"
          className="myth-map__coast"
          d="M0 12h302l30 45 75 12 27 42 78 1 20 38-28 29 21 36-68 34-15 80-50 28-5 57-77 29-54 70H0ZM1000 0H702l-32 51-50 34 28 49-42 44 22 58 60 24 37-21 31 37-17 69 49 54 9 62 83 38 41 111h79Z"
        />
        <path
          filter="url(#paper-edge)"
          className="myth-map__island"
          d="M392 485l72-22 86 13 54 45-72 46-103-10-55-35Zm183-142 22-17 35 13-4 23-37 9Zm-98-14 14-18 25 14-8 23-27 2Zm115 76 18-13 24 17-11 22-25-6Zm-210 60 16-11 22 17-9 19-26-5Z"
        />
      </svg>

      {atlasPlaces.map((place) => (
        <span
          className="myth-map__place"
          key={place.name}
          style={{ left: `${place.x}%`, top: `${place.y}%` }}
        >
          <i />
          <small>{place.name}</small>
        </span>
      ))}

      {guess && (
        <span className="myth-map__guess" style={{ left: `${guess.x}%`, top: `${guess.y}%` }}>
          <span />
          <small>Tahminin</small>
        </span>
      )}

      {reveal && target && (
        <span className="myth-map__target" style={{ left: `${target.x}%`, top: `${target.y}%` }}>
          <span><Check size={13} /></span>
          <small>Gerçek konum</small>
        </span>
      )}
    </div>
  )
}

type RoundResult = { sceneId: string; breakdown: ScoreBreakdown }

export function Game({ onExit }: { onExit: () => void }) {
  const [round, setRound] = useState(0)
  const [seconds, setSeconds] = useState(75)
  const [answer, setAnswer] = useState('')
  const [guess, setGuess] = useState<Point | null>(null)
  const [cluesUsed, setCluesUsed] = useState(0)
  const [result, setResult] = useState<ScoreBreakdown | null>(null)
  const [history, setHistory] = useState<RoundResult[]>([])
  const [finished, setFinished] = useState(false)
  const scene = mythScenes[round]

  useEffect(() => {
    if (result || finished) return
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [round, result, finished])

  useEffect(() => {
    if (seconds === 0 && !result && guess && answer) submitRound()
    // submitRound is intentionally driven by the current answer state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds])

  const total = useMemo(
    () => history.reduce((sum, item) => sum + item.breakdown.total, 0) + (result?.total ?? 0),
    [history, result],
  )

  function submitRound() {
    if (!guess || !answer || result) return
    setResult(scoreRound({
      answer,
      correctAnswer: scene.title,
      guess,
      target: scene.coordinates,
      secondsLeft: seconds,
      cluesUsed,
    }))
  }

  function nextRound() {
    if (!result) return
    const nextHistory = [...history, { sceneId: scene.id, breakdown: result }]
    if (round === mythScenes.length - 1) {
      setHistory(nextHistory)
      setFinished(true)
      const finalScore = nextHistory.reduce((sum, item) => sum + item.breakdown.total, 0)
      const best = Number(localStorage.getItem('mythos-best-score') || 0)
      if (finalScore > best) localStorage.setItem('mythos-best-score', String(finalScore))
      return
    }
    setHistory(nextHistory)
    setRound((value) => value + 1)
    setSeconds(75)
    setAnswer('')
    setGuess(null)
    setCluesUsed(0)
    setResult(null)
  }

  function restart() {
    setRound(0)
    setSeconds(75)
    setAnswer('')
    setGuess(null)
    setCluesUsed(0)
    setResult(null)
    setHistory([])
    setFinished(false)
  }

  if (finished) {
    const finalScore = history.reduce((sum, item) => sum + item.breakdown.total, 0)
    const correct = history.filter((item) => item.breakdown.recognition > 0).length
    return (
      <main className="results-screen">
        <div className="results-screen__sun" aria-hidden="true" />
        <Logo inverse />
        <div className="results-card">
          <span className="kicker kicker--gold"><Trophy size={14} /> KEHANET TAMAMLANDI</span>
          <h1>Kader seni<br /><em>hatırlayacak.</em></h1>
          <p className="results-card__score">{formatScore(finalScore)} <small>/ 50.000</small></p>
          <div className="results-card__stats">
            <span><strong>{correct}/5</strong><small>Doğru mit</small></span>
            <span><strong>%{Math.round((finalScore / 50000) * 100)}</strong><small>Hakimiyet</small></span>
            <span><strong>{formatScore(Number(localStorage.getItem('mythos-best-score') || finalScore))}</strong><small>En iyi</small></span>
          </div>
          <div className="results-card__rounds">
            {history.map((item, index) => (
              <span key={item.sceneId}><i>{index + 1}</i>{formatScore(item.breakdown.total)}</span>
            ))}
          </div>
          <div className="results-card__actions">
            <button className="button button--gold" onClick={restart}><RotateCcw size={17} /> Yeniden oyna</button>
            <button className="button button--ghost-inverse" onClick={onExit}>Tapınağa dön</button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="game-shell">
      <header className="game-topbar">
        <button className="icon-button icon-button--dark" onClick={onExit} aria-label="Oyundan çık"><X size={19} /></button>
        <Logo inverse />
        <div className="game-topbar__progress">
          <span>KEHANET {round + 1} / {mythScenes.length}</span>
          <div>{mythScenes.map((item, index) => <i key={item.id} className={index <= round ? 'is-active' : ''} />)}</div>
        </div>
        <span className={`game-timer ${seconds < 16 ? 'is-urgent' : ''}`}><Timer size={16} /> 00:{String(seconds).padStart(2, '0')}</span>
        <strong className="game-score">{formatScore(total)} <small>KP</small></strong>
      </header>

      <section className="game-stage">
        <SphereViewer scene={scene} />
        <div className="game-stage__title">
          <span>{scene.eyebrow}</span>
          <p>{scene.prompt}</p>
        </div>

        {!result && (
          <button
            className="oracle-button"
            disabled={cluesUsed >= scene.clues.length}
            onClick={() => setCluesUsed((value) => Math.min(scene.clues.length, value + 1))}
          >
            <Sparkles size={16} /> Kahine sor
            <small>{cluesUsed === 0 ? '+1.000 KP korunuyor' : `${scene.clues.length - cluesUsed} ipucu kaldı`}</small>
          </button>
        )}

        {cluesUsed > 0 && !result && (
          <aside className="clue-scroll" aria-live="polite">
            <span>KAHİNİN FISILTISI · {cluesUsed}/{scene.clues.length}</span>
            <p>“{scene.clues[cluesUsed - 1]}”</p>
          </aside>
        )}

        <aside className={`guess-panel ${result ? 'guess-panel--result' : ''}`}>
          {!result ? (
            <>
              <div className="guess-panel__head">
                <span className="kicker"><Compass size={14} /> KEHANETİNİ YAP</span>
                <strong>10.000 KP</strong>
              </div>
              <div className="guess-panel__columns">
                <div className="myth-choice">
                  <h2>Hangi efsanenin içindesin?</h2>
                  <div>
                    {scene.options.map((option) => (
                      <button className={answer === option ? 'is-selected' : ''} key={option} onClick={() => setAnswer(option)}>
                        <span />{option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="map-choice">
                  <h2>Mitolojik haritada neredesin?</h2>
                  <MythMap interactive guess={guess} onGuess={setGuess} />
                  <p>{guess ? 'İğneyi değiştirmek için haritaya tekrar dokun.' : 'Harita üzerine bir konum işaretle.'}</p>
                </div>
              </div>
              <div className="guess-panel__footer">
                <span><i>3.500</i> Mit</span>
                <span><i>4.000</i> Konum</span>
                <span><i>1.500</i> Hız</span>
                <span><i>1.000</i> Kahinsiz</span>
                <button className="button button--ink" disabled={!answer || !guess} onClick={submitRound}>
                  Kehaneti mühürle <Flame size={17} />
                </button>
              </div>
            </>
          ) : (
            <div className="round-result">
              <div className="round-result__copy">
                <span className={`kicker ${result.recognition ? 'kicker--success' : 'kicker--danger'}`}>
                  {result.recognition ? <Check size={14} /> : <X size={14} />}
                  {result.recognition ? 'MİTİ TANIDIN' : 'KADERİ YANLIŞ OKUDUN'}
                </span>
                <h2>{scene.title}</h2>
                <p className="round-result__place"><Map size={15} /> {scene.location} · {scene.cycle}</p>
                <p>{scene.reveal}</p>
                <small>{scene.source}<br />{scene.sourceNote}</small>
              </div>
              <MythMap guess={guess} target={scene.coordinates} reveal />
              <div className="score-table">
                <div><span>Mit tanıma</span><strong>{formatScore(result.recognition)}</strong><small>/ 3.500</small></div>
                <div><span>Coğrafya</span><strong>{formatScore(result.geography)}</strong><small>/ 4.000</small></div>
                <div><span>Hız</span><strong>{formatScore(result.speed)}</strong><small>/ 1.500</small></div>
                <div><span>Kahin bonusu</span><strong>{formatScore(result.oracle)}</strong><small>/ 1.000</small></div>
                <div className="score-table__total"><span>Tur puanı</span><strong>{formatScore(result.total)}</strong><small>KP</small></div>
              </div>
              <button className="button button--gold round-result__next" onClick={nextRound}>
                {round === mythScenes.length - 1 ? 'Sonucu gör' : 'Sonraki kehanet'} <ChevronRight size={18} />
              </button>
            </div>
          )}
        </aside>
      </section>
    </main>
  )
}

export function IconForMode({ type }: { type: string }) {
  if (type === 'daily') return <Sparkles />
  if (type === 'journey') return <Compass />
  if (type === 'duel') return <Swords />
  return <BookOpen />
}

export { ArrowRight, BookOpen, Compass, Flame, Map, Menu, Sparkles, Swords, Trophy, X }

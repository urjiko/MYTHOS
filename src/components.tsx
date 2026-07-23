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
import { useEffect, useMemo, useState } from 'react'
import type { Point } from './data'
import { createGameDeck, type GameMode } from './gameDeck'
import { localiseMythTitle, ui, type Locale } from './i18n'
import { formatScore, scoreRound, type ScoreBreakdown } from './scoring'
import { MythMap } from './AncientMap'
import { SphereViewer } from './SphereViewer'

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`logo ${inverse ? 'logo--inverse' : ''}`} aria-label="MYTHOS home">
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

type RoundResult = { sceneId: string; breakdown: ScoreBreakdown }

export function Game({
  onExit,
  onLocaleChange,
  mode = 'all',
  locale = 'en',
}: {
  onExit: () => void
  onLocaleChange: (locale: Locale) => void
  mode?: GameMode
  locale?: Locale
}) {
  const copy = ui[locale]
  const [scenes, setScenes] = useState(() => createGameDeck(mode))
  const [round, setRound] = useState(0)
  const [seconds, setSeconds] = useState(75)
  const [answer, setAnswer] = useState('')
  const [guess, setGuess] = useState<Point | null>(null)
  const [cluesUsed, setCluesUsed] = useState(0)
  const [result, setResult] = useState<ScoreBreakdown | null>(null)
  const [history, setHistory] = useState<RoundResult[]>([])
  const [finished, setFinished] = useState(false)
  const scene = scenes[round]
  const maximumScore = scenes.length * 10_000
  const modeCopy = mode === 'odyssey'
    ? { bestScoreKey: 'mythos-best-score-odyssey', journeyLabel: copy.game.odyssey, completionLabel: copy.game.odysseyComplete }
    : mode === 'iliad'
      ? { bestScoreKey: 'mythos-best-score-iliad', journeyLabel: copy.game.troy, completionLabel: copy.game.troyComplete }
      : { bestScoreKey: 'mythos-best-score', journeyLabel: copy.game.oracle, completionLabel: copy.game.oracleComplete }
  const { bestScoreKey, journeyLabel, completionLabel } = modeCopy

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
      fullCreditRadiusKm: scene.accuracyRadiusKm,
      secondsLeft: seconds,
      cluesUsed,
    }))
  }

  function nextRound() {
    if (!result) return
    const nextHistory = [...history, { sceneId: scene.id, breakdown: result }]
    if (round === scenes.length - 1) {
      setHistory(nextHistory)
      setFinished(true)
      const finalScore = nextHistory.reduce((sum, item) => sum + item.breakdown.total, 0)
      const best = Number(localStorage.getItem(bestScoreKey) || 0)
      if (finalScore > best) localStorage.setItem(bestScoreKey, String(finalScore))
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
    setScenes(createGameDeck(mode))
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
          <span className="kicker kicker--gold"><Trophy size={14} /> {completionLabel}</span>
          <h1>{copy.game.fate}<br /><em>{copy.game.remember}</em></h1>
          <p className="results-card__score">{formatScore(finalScore)} <small>/ {formatScore(maximumScore)}</small></p>
          <div className="results-card__stats">
            <span><strong>{correct}/{scenes.length}</strong><small>{copy.game.identified}</small></span>
            <span><strong>{Math.round((finalScore / maximumScore) * 100)}%</strong><small>{copy.game.mastery}</small></span>
            <span><strong>{formatScore(Number(localStorage.getItem(bestScoreKey) || finalScore))}</strong><small>{copy.game.personalBest}</small></span>
          </div>
          <div className="results-card__rounds">
            {history.map((item, index) => (
              <span key={item.sceneId}><i>{index + 1}</i>{formatScore(item.breakdown.total)}</span>
            ))}
          </div>
          <div className="results-card__actions">
            <button className="button button--gold" onClick={restart}><RotateCcw size={17} /> {copy.game.again}</button>
            <button className="button button--ghost-inverse" onClick={onExit}>{copy.game.return}</button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="game-shell">
      <header className="game-topbar">
        <button className="icon-button icon-button--dark" onClick={onExit} aria-label={copy.game.exit}><X size={19} /></button>
        <Logo inverse />
        <div className="game-topbar__progress">
          <span>{journeyLabel} {round + 1} / {scenes.length}</span>
          <div>{scenes.map((item, index) => <i key={item.id} className={index <= round ? 'is-active' : ''} />)}</div>
        </div>
        <span className={`game-timer ${seconds < 16 ? 'is-urgent' : ''}`}><Timer size={16} /> 00:{String(seconds).padStart(2, '0')}</span>
        <strong className="game-score">{formatScore(total)} <small>OP</small></strong>
        <button className="game-language" onClick={() => onLocaleChange(locale === 'en' ? 'tr' : 'en')} aria-label={copy.nav.language}>{locale === 'en' ? 'TR' : 'EN'}</button>
      </header>

      <section className="game-stage">
        <SphereViewer scene={scene} locale={locale} />

        {!result && (
          <button
            className="oracle-button"
            disabled={cluesUsed >= scene.clues.length}
            onClick={() => setCluesUsed((value) => Math.min(scene.clues.length, value + 1))}
          >
            <Sparkles size={16} /> {copy.game.ask}
            <small>{cluesUsed === 0 ? copy.game.preserved : copy.game.cluesRemain(scene.clues.length - cluesUsed)}</small>
          </button>
        )}

        {cluesUsed > 0 && !result && (
          <aside className="clue-scroll" aria-live="polite">
            <span>{copy.game.whispers} · {cluesUsed}/{scene.clues.length}</span>
            <p>“{scene.clues[cluesUsed - 1]}”</p>
          </aside>
        )}

        <aside className={`guess-panel ${result ? 'guess-panel--result' : ''}`}>
          {!result ? (
            <div className="oracle-workbench">
              <section className="oracle-card oracle-card--myth">
                <div className="guess-panel__head">
                  <span className="kicker"><Compass size={14} /> {copy.game.make}</span>
                  <strong>10,000 OP</strong>
                </div>
                <div className="myth-choice">
                  <h2>{copy.game.inside}</h2>
                  <div>
                    {scene.options.map((option, index) => (
                      <button className={answer === option ? 'is-selected' : ''} key={option} onClick={() => setAnswer(option)}>
                        <span>{String.fromCharCode(65 + index)}</span>{localiseMythTitle(option, locale)}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              <section className="oracle-card oracle-card--map">
                <div className="map-choice">
                  <h2>{copy.game.where}</h2>
                  <MythMap interactive guess={guess} onGuess={setGuess} locale={locale} />
                  <p>{guess
                    ? copy.game.pinPlaced
                    : copy.game.pinEmpty}</p>
                </div>
                <button className="button button--gold oracle-card__submit" disabled={!answer || !guess} onClick={submitRound}>
                  {copy.game.seal} <Flame size={17} />
                </button>
              </section>
            </div>
          ) : (
            <div className="round-result">
              <div className="round-result__copy">
                <span className={`kicker ${result.recognition ? 'kicker--success' : 'kicker--danger'}`}>
                  {result.recognition ? <Check size={14} /> : <X size={14} />}
                  {result.recognition ? copy.game.correct : copy.game.wrong}
                </span>
                <h2>{localiseMythTitle(scene.title, locale)}</h2>
                <p className="round-result__place"><Map size={15} /> {scene.location} · {scene.cycle}</p>
                <p>{scene.reveal}</p>
                <small>
                  {scene.geographyNote}<br />
                  {copy.game.fullCredit(scene.accuracyRadiusKm)}<br />
                  {scene.source}<br />{scene.sourceNote}
                  {scene.pleiadesUrl && <><br /><a href={scene.pleiadesUrl} target="_blank" rel="noreferrer">{copy.game.pleiades}</a></>}
                </small>
              </div>
              <MythMap
                guess={guess}
                target={scene.coordinates}
                targetRadiusKm={scene.accuracyRadiusKm}
                targetConfidence={scene.mapConfidence}
                locale={locale}
                reveal
              />
              <div className="score-table">
                <div><span>{copy.game.myth}</span><strong>{formatScore(result.recognition)}</strong><small>/ 3,500</small></div>
                <div><span>{copy.game.geography}</span><strong>{formatScore(result.geography)}</strong><small>/ 4,000</small></div>
                <div><span>{copy.game.speed}</span><strong>{formatScore(result.speed)}</strong><small>/ 1,500</small></div>
                <div><span>{copy.game.bonus}</span><strong>{formatScore(result.oracle)}</strong><small>/ 1,000</small></div>
                <div className="score-table__total"><span>{copy.game.total}</span><strong>{formatScore(result.total)}</strong><small>{copy.game.away(Math.round(result.distance))}</small></div>
              </div>
              <button className="button button--gold round-result__next" onClick={nextRound}>
                {round === scenes.length - 1 ? copy.game.final : copy.game.next} <ChevronRight size={18} />
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
  if (type === 'odyssey') return <Map />
  if (type === 'duel') return <Swords />
  return <BookOpen />
}

export { ArrowRight, BookOpen, Compass, Flame, Map, Menu, Sparkles, Swords, Trophy, X }
export { MythMap }

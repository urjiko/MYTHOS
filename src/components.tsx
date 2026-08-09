import {
  Check,
  ChevronRight,
  Compass,
  Flame,
  Map,
  RotateCcw,
  Sparkles,
  Timer,
  TimerOff,
  Trophy,
  X,
} from 'lucide-react'
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import type { MythScene, Point } from './data'
import { ROUND_DURATION_MS, ROUND_DURATION_SECONDS, secondsUntilDeadline } from './gameClock'
import { createGameDeck, type GameMode } from './gameDeck'
import { localiseMythTitle, ui, type Locale } from './i18n'
import { answerIndexForKey } from './keyboard'
import { localiseSceneClues } from './sceneCopy'
import { formatScore, scoreRound, type ScoreBreakdown } from './scoring'
import { MythMap } from './AncientMap'
import { Logo } from './ui'

const SphereViewer = lazy(() => import('./SphereViewer').then((module) => ({ default: module.SphereViewer })))

function SphereViewerPlaceholder({ scene, locale }: { scene: MythScene; locale: Locale }) {
  return (
    <div
      className="scene-viewer scene-viewer--loading"
      style={{ '--scene-fallback': scene.fallback } as React.CSSProperties}
      role="status"
    >
      <img className="scene-viewer__fallback" src={scene.image} alt="" draggable="false" />
      <div className="scene-viewer__vignette" />
      <div className="scene-viewer__status">{ui[locale].viewer.loading}</div>
    </div>
  )
}

type RoundResult = { sceneId: string; breakdown: ScoreBreakdown; timedOut: boolean }

export default function Game({
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
  const [seconds, setSeconds] = useState(ROUND_DURATION_SECONDS)
  const [answer, setAnswer] = useState('')
  const [guess, setGuess] = useState<Point | null>(null)
  const [cluesUsed, setCluesUsed] = useState(0)
  const [result, setResult] = useState<ScoreBreakdown | null>(null)
  const [history, setHistory] = useState<RoundResult[]>([])
  const [finished, setFinished] = useState(false)
  const [viewerReady, setViewerReady] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const [roundStarted, setRoundStarted] = useState(false)
  const [timedOut, setTimedOut] = useState(false)
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState === 'visible')
  const deadlineRef = useRef<number | null>(null)
  const gameMainRef = useRef<HTMLElement>(null)
  const roundResultRef = useRef<HTMLDivElement>(null)
  const finalResultRef = useRef<HTMLElement>(null)
  const scene = scenes[round]
  const sceneClues = localiseSceneClues(scene, locale)
  const maximumScore = scenes.length * 10_000
  const modeCopy = mode === 'odyssey'
    ? { bestScoreKey: 'mythos-best-score-odyssey', journeyLabel: copy.game.odyssey, completionLabel: copy.game.odysseyComplete }
    : mode === 'iliad'
      ? { bestScoreKey: 'mythos-best-score-iliad', journeyLabel: copy.game.troy, completionLabel: copy.game.troyComplete }
      : { bestScoreKey: 'mythos-best-score', journeyLabel: copy.game.oracle, completionLabel: copy.game.oracleComplete }
  const { bestScoreKey, journeyLabel, completionLabel } = modeCopy
  const roundReady = viewerReady && mapReady

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', updateVisibility)
    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => gameMainRef.current?.focus({ preventScroll: true }))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!roundReady || !pageVisible || roundStarted || result || finished) return
    deadlineRef.current = Date.now() + ROUND_DURATION_MS
    setRoundStarted(true)
  }, [finished, pageVisible, result, roundReady, roundStarted])

  useEffect(() => {
    if (!roundStarted || result || finished || deadlineRef.current === null) return

    const updateClock = () => {
      if (deadlineRef.current === null) return
      setSeconds(secondsUntilDeadline(deadlineRef.current, Date.now()))
    }
    updateClock()
    const timer = window.setInterval(updateClock, 250)
    return () => window.clearInterval(timer)
  }, [finished, result, round, roundStarted])

  useEffect(() => {
    if (roundStarted && seconds === 0 && !result && !finished) resolveRound(true)
    // The timeout resolves the current answer and guess state exactly once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, roundStarted, result, finished])

  useEffect(() => {
    if (!result) return
    const nextScene = scenes[round + 1]
    if (!nextScene) return
    const image = new Image()
    image.src = nextScene.image
  }, [result, round, scenes])

  useEffect(() => {
    if (!roundStarted || result || finished) return

    const selectAnswer = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      const target = event.target
      if (
        target instanceof HTMLElement
        && (target.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName))
      ) return

      const index = answerIndexForKey(event.key, scene.options.length)
      if (index === null) return
      event.preventDefault()
      setAnswer(scene.options[index])
    }

    document.addEventListener('keydown', selectAnswer)
    return () => document.removeEventListener('keydown', selectAnswer)
  }, [finished, result, roundStarted, scene.options])

  useEffect(() => {
    if (!result) return
    const frame = window.requestAnimationFrame(() => roundResultRef.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [result])

  useEffect(() => {
    if (!finished) return
    const frame = window.requestAnimationFrame(() => finalResultRef.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [finished])

  const total = useMemo(
    () => history.reduce((sum, item) => sum + item.breakdown.total, 0) + (result?.total ?? 0),
    [history, result],
  )

  function resolveRound(expired = false) {
    if (result || (!expired && (!guess || !answer))) return
    setTimedOut(expired)
    setResult(scoreRound({
      answer,
      correctAnswer: scene.title,
      guess,
      target: scene.coordinates,
      fullCreditRadiusKm: scene.accuracyRadiusKm,
      secondsLeft: expired ? 0 : seconds,
      cluesUsed,
    }))
  }

  function submitRound() {
    resolveRound(seconds === 0)
  }

  function nextRound() {
    if (!result) return
    const nextHistory = [...history, { sceneId: scene.id, breakdown: result, timedOut }]
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
    deadlineRef.current = null
    setSeconds(ROUND_DURATION_SECONDS)
    setAnswer('')
    setGuess(null)
    setCluesUsed(0)
    setResult(null)
    setViewerReady(false)
    setMapReady(false)
    setRoundStarted(false)
    setTimedOut(false)
  }

  function restart() {
    setScenes(createGameDeck(mode))
    setRound(0)
    deadlineRef.current = null
    setSeconds(ROUND_DURATION_SECONDS)
    setAnswer('')
    setGuess(null)
    setCluesUsed(0)
    setResult(null)
    setHistory([])
    setFinished(false)
    setViewerReady(false)
    setMapReady(false)
    setRoundStarted(false)
    setTimedOut(false)
  }

  if (finished) {
    const finalScore = history.reduce((sum, item) => sum + item.breakdown.total, 0)
    const correct = history.filter((item) => item.breakdown.recognition > 0).length
    return (
      <main id="main-content" ref={finalResultRef} className="results-screen" tabIndex={-1}>
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
    <main id="main-content" ref={gameMainRef} className="game-shell" tabIndex={-1}>
      <header className="game-topbar">
        <button className="icon-button icon-button--dark" onClick={onExit} aria-label={copy.game.exit}><X size={19} /></button>
        <Logo inverse />
        <div
          className="game-topbar__progress"
          role="progressbar"
          aria-label={journeyLabel}
          aria-valuemin={1}
          aria-valuemax={scenes.length}
          aria-valuenow={round + 1}
          aria-valuetext={copy.accessibility.roundProgress(round + 1, scenes.length)}
        >
          <span>{journeyLabel} {round + 1} / {scenes.length}</span>
          <div>{scenes.map((item, index) => <i key={item.id} className={index <= round ? 'is-active' : ''} />)}</div>
        </div>
        <span
          className={`game-timer ${roundStarted && seconds < 16 ? 'is-urgent' : ''} ${!roundStarted ? 'is-paused' : ''}`}
          role="timer"
          aria-label={roundStarted ? copy.game.timeRemaining(seconds) : copy.game.roundPreparing}
        >
          <Timer size={16} /> {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
        </span>
        <span className="sr-only" aria-live="assertive">
          {roundStarted && (seconds === 15 || seconds === 5) ? copy.accessibility.timeWarning(seconds) : ''}
        </span>
        <strong className="game-score">{formatScore(total)} <small>OP</small></strong>
        <button className="game-language" onClick={() => onLocaleChange(locale === 'en' ? 'tr' : 'en')} aria-label={copy.nav.language}>{locale === 'en' ? 'TR' : 'EN'}</button>
      </header>

      <section className="game-stage">
        <Suspense fallback={<SphereViewerPlaceholder scene={scene} locale={locale} />}>
          <SphereViewer scene={scene} locale={locale} onReadyChange={setViewerReady} />
        </Suspense>

        {!roundStarted && !result && (
          <div className="round-preparing" role="status">
            <span><Timer size={18} /> {copy.game.roundPreparing}</span>
            <small>{copy.game.roundPreparingNote}</small>
          </div>
        )}

        {!result && (
          <button
            className="oracle-button"
            disabled={!roundStarted || cluesUsed >= sceneClues.length}
            onClick={() => setCluesUsed((value) => Math.min(sceneClues.length, value + 1))}
          >
            <Sparkles size={16} /> {copy.game.ask}
            <small>{cluesUsed === 0 ? copy.game.preserved : copy.game.cluesRemain(sceneClues.length - cluesUsed)}</small>
          </button>
        )}

        {cluesUsed > 0 && !result && (
          <aside className="clue-scroll" aria-live="polite">
            <span>{copy.game.whispers} · {cluesUsed}/{sceneClues.length}</span>
            <p>“{sceneClues[cluesUsed - 1]}”</p>
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
                <div className="myth-choice" role="group" aria-labelledby="myth-choice-title">
                  <h2 id="myth-choice-title">{copy.game.inside}</h2>
                  <div>
                    {scene.options.map((option, index) => {
                      const shortcut = String.fromCharCode(65 + index)
                      return (
                        <button
                          disabled={!roundStarted}
                          className={answer === option ? 'is-selected' : ''}
                          key={option}
                          aria-pressed={answer === option}
                          aria-keyshortcuts={shortcut}
                          onClick={() => setAnswer(option)}
                        >
                          <span>{shortcut}</span>{localiseMythTitle(option, locale)}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </section>

              <section className="oracle-card oracle-card--map">
                <div className="map-choice">
                  <h2>{copy.game.where}</h2>
                  <MythMap interactive guess={guess} onGuess={roundStarted ? setGuess : undefined} onReadyChange={setMapReady} locale={locale} />
                  <p>{guess
                    ? copy.game.pinPlaced
                    : copy.game.pinEmpty}</p>
                </div>
                <button className="button button--gold oracle-card__submit" disabled={!roundStarted || !answer || !guess} onClick={submitRound}>
                  {copy.game.seal} <Flame size={17} />
                </button>
              </section>
            </div>
          ) : (
            <div
              ref={roundResultRef}
              className="round-result"
              role="region"
              aria-labelledby="round-result-title"
              tabIndex={-1}
            >
              <div className="round-result__copy">
                <span className={`kicker ${!timedOut && result.recognition ? 'kicker--success' : 'kicker--danger'}`}>
                  {timedOut ? <TimerOff size={14} /> : result.recognition ? <Check size={14} /> : <X size={14} />}
                  {timedOut ? copy.game.timeExpired : result.recognition ? copy.game.correct : copy.game.wrong}
                </span>
                <h2 id="round-result-title">{localiseMythTitle(scene.title, locale)}</h2>
                <p className="round-result__place"><Map size={15} /> {scene.location} · {scene.cycle}</p>
                {timedOut && <p className="round-result__timeout">{copy.game.timeoutNote}</p>}
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
                <div className="score-table__total"><span>{copy.game.total}</span><strong>{formatScore(result.total)}</strong><small>{result.distance === null ? copy.game.noMapGuess : copy.game.away(Math.round(result.distance))}</small></div>
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

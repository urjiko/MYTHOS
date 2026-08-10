import {
  Check,
  ChevronRight,
  CircleHelp,
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
import {
  gameGuideBlocksRoundStart,
  markGameGuideSeen,
  shouldShowFirstRunGameGuide,
  type GameGuideMode,
} from './gameGuide'
import {
  clearGameSession,
  GAME_SESSION_VERSION,
  loadGameSession,
  persistGameSession,
  restoredSessionSeconds,
  snapshotGameDeck,
  type GameRoundResult,
  type GameSessionSnapshot,
} from './gameSession'
import { localiseMythTitle, ui, type Locale } from './i18n'
import {
  buildJourneyReport,
  classifyJourneyProfile,
  roundLearningSignal,
  scoreDimensionPercentage,
  type LearningSignal,
} from './journeyReport'
import { answerIndexForKey } from './keyboard'
import { localiseSceneClues, localiseScenePresentation } from './sceneCopy'
import {
  formatScore,
  ROUND_MAX_SCORE,
  SCORE_DIMENSIONS,
  SCORE_MAXIMUMS,
  scoreRound,
  type ScoreBreakdown,
  type ScoreDimension,
} from './scoring'
import { readStoredNumber, writeStoredValue } from './storage'
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
  const [initialSession] = useState(() => loadGameSession(mode))
  const [guideMode, setGuideMode] = useState<GameGuideMode | null>(() => (
    shouldShowFirstRunGameGuide(Boolean(initialSession)) ? 'first-run' : null
  ))
  const [scenes, setScenes] = useState(() => initialSession?.scenes ?? createGameDeck(mode))
  const [round, setRound] = useState(() => initialSession?.round ?? 0)
  const [seconds, setSeconds] = useState(() => initialSession
    ? restoredSessionSeconds(initialSession)
    : ROUND_DURATION_SECONDS)
  const [answer, setAnswer] = useState(() => initialSession?.answer ?? '')
  const [guess, setGuess] = useState<Point | null>(() => initialSession?.guess ?? null)
  const [cluesUsed, setCluesUsed] = useState(() => initialSession?.cluesUsed ?? 0)
  const [result, setResult] = useState<ScoreBreakdown | null>(() => initialSession?.result ?? null)
  const [history, setHistory] = useState<GameRoundResult[]>(() => initialSession?.history ?? [])
  const [finished, setFinished] = useState(() => initialSession?.finished ?? false)
  const [viewerReady, setViewerReady] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const [roundStarted, setRoundStarted] = useState(() => initialSession?.roundStarted ?? false)
  const [timedOut, setTimedOut] = useState(() => initialSession?.timedOut ?? false)
  const [showRestoreNotice, setShowRestoreNotice] = useState(() => Boolean(initialSession && !initialSession.finished))
  const [confirmFresh, setConfirmFresh] = useState(false)
  const [restoringRound, setRestoringRound] = useState(() => Boolean(
    initialSession?.roundStarted && !initialSession.result && !initialSession.finished,
  ))
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState === 'visible')
  const [mobileMapOpen, setMobileMapOpen] = useState(false)
  const deadlineRef = useRef<number | null>(initialSession?.deadlineMs ?? null)
  const discardSessionRef = useRef(false)
  const gameMainRef = useRef<HTMLElement>(null)
  const guideDialogRef = useRef<HTMLDivElement>(null)
  const guidePrimaryRef = useRef<HTMLButtonElement>(null)
  const roundResultRef = useRef<HTMLDivElement>(null)
  const finalResultRef = useRef<HTMLElement>(null)
  const mobileMapLaunchRef = useRef<HTMLButtonElement>(null)
  const mobileMapCloseRef = useRef<HTMLButtonElement>(null)
  const scene = scenes[round]
  const sceneClues = localiseSceneClues(scene, locale)
  const scenePresentation = localiseScenePresentation(scene, locale)
  const modeCopy = mode === 'odyssey'
    ? { bestScoreKey: 'mythos-best-score-odyssey', journeyLabel: copy.game.odyssey, completionLabel: copy.game.odysseyComplete }
    : mode === 'iliad'
      ? { bestScoreKey: 'mythos-best-score-iliad', journeyLabel: copy.game.troy, completionLabel: copy.game.troyComplete }
      : { bestScoreKey: 'mythos-best-score', journeyLabel: copy.game.oracle, completionLabel: copy.game.oracleComplete }
  const { bestScoreKey, journeyLabel, completionLabel } = modeCopy
  const roundReady = viewerReady && mapReady
  const roundPlayable = roundStarted && roundReady && guideMode === null
  const sessionSnapshot: GameSessionSnapshot = {
    version: GAME_SESSION_VERSION,
    mode,
    deck: snapshotGameDeck(scenes),
    round,
    seconds,
    answer,
    guess,
    cluesUsed,
    result,
    history,
    finished,
    roundStarted,
    timedOut,
    deadlineMs: deadlineRef.current,
    savedAt: Date.now(),
  }
  const latestSessionRef = useRef(sessionSnapshot)
  latestSessionRef.current = sessionSnapshot

  useEffect(() => {
    persistGameSession(latestSessionRef.current)
  })

  useEffect(() => {
    const persistLatestSession = () => persistGameSession(latestSessionRef.current)
    window.addEventListener('pagehide', persistLatestSession)
    return () => {
      window.removeEventListener('pagehide', persistLatestSession)
      if (!discardSessionRef.current) persistLatestSession()
    }
  }, [mode])

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
    if (!guideMode) return

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null
    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = window.requestAnimationFrame(() => guidePrimaryRef.current?.focus())
    const keepFocusInsideGuide = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeGameGuide()
        return
      }
      if (event.key !== 'Tab' || !guideDialogRef.current) return

      const buttons = Array.from(
        guideDialogRef.current.querySelectorAll<HTMLButtonElement>('button:not([disabled])'),
      )
      if (buttons.length === 0) return
      const first = buttons[0]
      const last = buttons[buttons.length - 1]
      if (event.shiftKey && (document.activeElement === first || document.activeElement === guideDialogRef.current)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', keepFocusInsideGuide)
    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', keepFocusInsideGuide)
      document.body.style.overflow = previousBodyOverflow
      window.requestAnimationFrame(() => {
        const focusTarget = previousFocus?.isConnected ? previousFocus : gameMainRef.current
        focusTarget?.focus({ preventScroll: true })
      })
    }
  }, [guideMode])

  useEffect(() => {
    if (roundReady) setRestoringRound(false)
  }, [roundReady])

  useEffect(() => {
    if (!mobileMapOpen) return

    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = window.requestAnimationFrame(() => mobileMapCloseRef.current?.focus())
    const keepFocusInsideMap = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMobileMapOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const sheet = document.getElementById('mobile-map-sheet')
      if (!sheet) return
      const focusable = Array.from(sheet.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      )).filter((element) => !element.hasAttribute('disabled'))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', keepFocusInsideMap)
    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', keepFocusInsideMap)
      document.body.style.overflow = previousBodyOverflow
      window.requestAnimationFrame(() => mobileMapLaunchRef.current?.focus({ preventScroll: true }))
    }
  }, [mobileMapOpen])

  useEffect(() => {
    if (
      !roundReady
      || !pageVisible
      || roundStarted
      || result
      || finished
      || gameGuideBlocksRoundStart(guideMode)
    ) return
    deadlineRef.current = Date.now() + ROUND_DURATION_MS
    setRoundStarted(true)
  }, [finished, guideMode, pageVisible, result, roundReady, roundStarted])

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
    if (!roundPlayable || result || finished) return

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
  }, [finished, result, roundPlayable, scene.options])

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

  function saveAndExit() {
    persistGameSession(latestSessionRef.current)
    onExit()
  }

  function closeGameGuide() {
    if (guideMode === 'first-run') markGameGuideSeen()
    setGuideMode(null)
  }

  function returnHome() {
    discardSessionRef.current = true
    clearGameSession(mode)
    onExit()
  }

  function resolveRound(expired = false) {
    if (result || (!expired && (!guess || !answer))) return
    setMobileMapOpen(false)
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
      const best = readStoredNumber(bestScoreKey)
      if (finalScore > best) writeStoredValue(bestScoreKey, String(finalScore))
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
    setShowRestoreNotice(false)
    setConfirmFresh(false)
    setRestoringRound(false)
    setMobileMapOpen(false)
  }

  function restart() {
    clearGameSession(mode)
    discardSessionRef.current = false
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
    setShowRestoreNotice(false)
    setConfirmFresh(false)
    setRestoringRound(false)
    setMobileMapOpen(false)
  }

  if (finished) {
    const report = buildJourneyReport(history)
    const averageDistance = report.averageDistanceKm === null
      ? null
      : Math.round(report.averageDistanceKm)
    const profile = classifyJourneyProfile(report)
    const hasEvenProfile = profile !== 'differentiated'
    const hasBalancedMastery = profile === 'balanced'
    const dimensionCopy: Record<ScoreDimension, {
      label: string
      strength: string
      focus: string
    }> = {
      recognition: {
        label: copy.game.reportRecognition,
        strength: copy.game.reportRecognitionStrength,
        focus: copy.game.reportRecognitionFocus,
      },
      geography: {
        label: copy.game.reportGeography,
        strength: copy.game.reportGeographyStrength,
        focus: copy.game.reportGeographyFocus,
      },
      speed: {
        label: copy.game.reportSpeed,
        strength: copy.game.reportSpeedStrength,
        focus: copy.game.reportSpeedFocus,
      },
      oracle: {
        label: copy.game.reportOracle,
        strength: copy.game.reportOracleStrength,
        focus: copy.game.reportOracleFocus,
      },
    }
    const signalLabels: Record<LearningSignal, string> = {
      strong: copy.game.reportStrongRound,
      time: copy.game.reportTimeRound,
      recognition: copy.game.reportRecognitionRound,
      geography: copy.game.reportGeographyRound,
      speed: copy.game.reportSpeedRound,
      oracle: copy.game.reportOracleRound,
    }
    return (
      <main id="main-content" ref={finalResultRef} className="results-screen" tabIndex={-1}>
        <div className="results-screen__sun" aria-hidden="true" />
        <Logo inverse />
        <div className="results-layout">
          <section className="results-card" aria-labelledby="journey-result-title">
            <span className="kicker kicker--gold"><Trophy size={14} /> {completionLabel}</span>
            <h1 id="journey-result-title">{copy.game.fate}<br /><em>{copy.game.remember}</em></h1>
            <p className="results-card__score">{formatScore(report.totalScore, locale)} <small>/ {formatScore(report.maximumScore, locale)}</small></p>
            <div className="results-card__stats">
              <span><strong>{report.identifiedCount}/{scenes.length}</strong><small>{copy.game.identified}</small></span>
              <span><strong>{report.masteryPercentage}%</strong><small>{copy.game.mastery}</small></span>
              <span><strong>{formatScore(readStoredNumber(bestScoreKey, report.totalScore), locale)}</strong><small>{copy.game.personalBest}</small></span>
            </div>
            <div className="results-card__learning">
              <article>
                <small>{hasEvenProfile ? copy.game.reportEven : copy.game.reportStrength}</small>
                <strong>
                  {hasEvenProfile ? copy.game.reportEvenTitle : dimensionCopy[report.strongest.dimension].label}
                  {' · '}{report.strongest.percentage}%
                </strong>
                <p>{hasEvenProfile ? copy.game.reportEvenNote : dimensionCopy[report.strongest.dimension].strength}</p>
              </article>
              <article>
                <small>{hasBalancedMastery ? copy.game.reportBalanced : copy.game.reportFocus}</small>
                <strong>
                  {hasBalancedMastery ? copy.game.reportBalancedTitle : dimensionCopy[report.focus.dimension].label}
                  {' · '}{report.focus.percentage}%
                </strong>
                <p>{hasBalancedMastery ? copy.game.reportBalancedNote : dimensionCopy[report.focus.dimension].focus}</p>
              </article>
            </div>
          </section>

          <section className="results-report" aria-labelledby="journey-report-title">
            <header>
              <span className="kicker kicker--gold">{copy.game.reportKicker}</span>
              <h2 id="journey-report-title">{copy.game.reportTitle}</h2>
              <p>{copy.game.reportOverview(report.reviewCount, history.length, report.timeoutCount, averageDistance)}</p>
            </header>

            <div className="results-report__dimensions" aria-label={copy.game.reportDimensions}>
              {report.dimensions.map((performance) => {
                const label = dimensionCopy[performance.dimension].label
                return (
                  <div
                    key={performance.dimension}
                    role="progressbar"
                    aria-label={copy.game.reportMetric(label, performance.percentage)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={performance.percentage}
                  >
                    <span><strong>{label}</strong><small>{performance.percentage}%</small></span>
                    <i aria-hidden="true"><b style={{ width: `${performance.percentage}%` }} /></i>
                    <em>{formatScore(performance.earned, locale)} / {formatScore(performance.maximum, locale)} OP</em>
                  </div>
                )
              })}
            </div>

            <div className="results-report__heading">
              <h3>{copy.game.reportRoundsTitle}</h3>
              <p>{copy.game.reportRoundsLede}</p>
            </div>
            <ol className="results-report__rounds">
              {history.map((item, index) => {
                const reviewedScene = scenes.find((candidate) => candidate.id === item.sceneId)
                if (!reviewedScene) return null
                const reviewedPresentation = localiseScenePresentation(reviewedScene, locale)
                const signal = roundLearningSignal(item)
                return (
                  <li key={item.sceneId} className={`results-report__round is-${signal}`}>
                    <div className="results-report__round-head">
                      <span className="results-report__round-number">{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <small>{signalLabels[signal]}</small>
                        <h4>{localiseMythTitle(reviewedScene.title, locale)}</h4>
                        <p><Map size={14} aria-hidden="true" /> {reviewedPresentation.location} · {reviewedPresentation.cycle}</p>
                      </div>
                      <strong>{formatScore(item.breakdown.total, locale)} <small>/ {formatScore(ROUND_MAX_SCORE, locale)} OP</small></strong>
                    </div>
                    <div className="results-report__round-metrics">
                      {SCORE_DIMENSIONS.map((dimension) => {
                        const percentage = scoreDimensionPercentage(item.breakdown, dimension)
                        const label = dimensionCopy[dimension].label
                        return (
                          <div
                            key={dimension}
                            role="progressbar"
                            aria-label={copy.game.reportMetric(label, percentage)}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={percentage}
                          >
                            <span><small>{label}</small><strong>{formatScore(item.breakdown[dimension], locale)} / {formatScore(SCORE_MAXIMUMS[dimension], locale)}</strong></span>
                            <i aria-hidden="true"><b style={{ width: `${percentage}%` }} /></i>
                          </div>
                        )
                      })}
                    </div>
                    <p className="results-report__distance">
                      {item.breakdown.distance === null
                        ? copy.game.reportNoMap
                        : copy.game.reportDistance(Math.round(item.breakdown.distance))}
                    </p>
                  </li>
                )
              })}
            </ol>
            <div className="results-card__actions">
              <button className="button button--gold" onClick={restart}><RotateCcw size={17} /> {copy.game.again}</button>
              <button className="button button--ghost-inverse" onClick={returnHome}>{copy.game.return}</button>
            </div>
          </section>
        </div>
      </main>
    )
  }

  return (
    <main id="main-content" ref={gameMainRef} className="game-shell" tabIndex={-1}>
      <header className="game-topbar">
        <button
          className="icon-button icon-button--dark"
          onClick={saveAndExit}
          aria-label={copy.game.saveAndExit}
          title={copy.game.saveAndExit}
        ><X size={19} /></button>
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
          <span className="game-topbar__progress-label">{journeyLabel} {round + 1} / {scenes.length}</span>
          <span className="game-topbar__progress-mobile" aria-hidden="true">{round + 1}/{scenes.length}</span>
          <div>{scenes.map((item, index) => <i key={item.id} className={index <= round ? 'is-active' : ''} />)}</div>
        </div>
        <span
          className={`game-timer ${roundStarted && seconds < 16 ? 'is-urgent' : ''} ${!roundStarted ? 'is-paused' : ''}`}
          role="timer"
          aria-label={roundStarted
            ? copy.game.timeRemaining(seconds)
            : gameGuideBlocksRoundStart(guideMode)
              ? copy.game.guideWaiting
              : copy.game.roundPreparing}
        >
          <Timer size={16} /> {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
        </span>
        <span className="sr-only" aria-live="assertive">
          {roundStarted && (seconds === 15 || seconds === 5) ? copy.accessibility.timeWarning(seconds) : ''}
        </span>
        <strong className="game-score">{formatScore(total, locale)} <small>OP</small></strong>
        <button
          className="game-help"
          onClick={() => setGuideMode('help')}
          aria-label={copy.game.help}
          title={copy.game.help}
        ><CircleHelp size={16} /></button>
        <button className="game-language" onClick={() => onLocaleChange(locale === 'en' ? 'tr' : 'en')} aria-label={copy.nav.language}>{locale === 'en' ? 'TR' : 'EN'}</button>
      </header>

      <section className="game-stage">
        <Suspense fallback={<SphereViewerPlaceholder scene={scene} locale={locale} />}>
          <SphereViewer scene={scene} locale={locale} onReadyChange={setViewerReady} />
        </Suspense>

        {guideMode && (
          <div className="game-guide-backdrop">
            <div
              ref={guideDialogRef}
              className="game-guide"
              role="dialog"
              aria-modal="true"
              aria-labelledby="game-guide-title"
              aria-describedby="game-guide-lede"
              tabIndex={-1}
            >
              <button
                className="game-guide__close"
                onClick={closeGameGuide}
                aria-label={copy.game.closeGuide}
              ><X size={18} /></button>
              <span className="kicker kicker--gold"><CircleHelp size={14} /> {copy.game.guideKicker}</span>
              <h2 id="game-guide-title">{copy.game.guideTitle}</h2>
              <p id="game-guide-lede">
                {guideMode === 'first-run' ? copy.game.guideLede : copy.game.guideHelpLede}
              </p>
              {guideMode === 'help' && (
                <p className="game-guide__live"><Timer size={15} /> {copy.game.guideLive}</p>
              )}
              <div className="game-guide__steps">
                <article>
                  <span><Compass size={18} /></span>
                  <div><small>01</small><h3>{copy.game.guideLookTitle}</h3><p>{copy.game.guideLookBody}</p></div>
                </article>
                <article>
                  <span><Check size={18} /></span>
                  <div><small>02</small><h3>{copy.game.guideAnswerTitle}</h3><p>{copy.game.guideAnswerBody}</p></div>
                </article>
                <article>
                  <span><Map size={18} /></span>
                  <div><small>03</small><h3>{copy.game.guideMapTitle}</h3><p>{copy.game.guideMapBody}</p></div>
                </article>
                <article>
                  <span><Sparkles size={18} /></span>
                  <div><small>04</small><h3>{copy.game.guideScoreTitle}</h3><p>{copy.game.guideScoreBody}</p></div>
                </article>
              </div>
              <button ref={guidePrimaryRef} className="button button--gold game-guide__primary" onClick={closeGameGuide}>
                {guideMode === 'first-run' ? copy.game.guideBegin : copy.game.guideReturn}
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {showRestoreNotice && (roundReady || result) && (
          <div className="session-restored">
            <div role="status">
              <RotateCcw size={16} aria-hidden="true" />
              <span>
                <strong>{copy.game.journeyRestored}</strong>
                <small>{copy.game.journeyRestoredNote(round + 1, scenes.length)}</small>
              </span>
            </div>
            <button
              className={`session-restored__fresh ${confirmFresh ? 'is-confirming' : ''}`}
              onClick={() => confirmFresh ? restart() : setConfirmFresh(true)}
            >
              {confirmFresh ? copy.game.confirmFresh : copy.game.startFresh}
            </button>
            <button
              className="session-restored__dismiss"
              onClick={() => { setShowRestoreNotice(false); setConfirmFresh(false) }}
              aria-label={copy.game.dismissRestore}
            ><X size={15} /></button>
          </div>
        )}

        {!roundPlayable && !result && (
          <div className="round-preparing" role="status">
            <span><Timer size={18} /> {restoringRound ? copy.game.roundRestoring : copy.game.roundPreparing}</span>
            <small>{restoringRound ? copy.game.roundRestoringNote : copy.game.roundPreparingNote}</small>
          </div>
        )}

        {!result && (
          <button
            className="oracle-button"
            disabled={!roundPlayable || cluesUsed >= sceneClues.length}
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
                  <span className="kicker guess-panel__desktop-kicker"><Compass size={14} /> {copy.game.make}</span>
                  <span className="kicker mobile-myth-step"><Compass size={14} /> {copy.game.mobileMythStep}</span>
                  <strong>{formatScore(ROUND_MAX_SCORE, locale)} OP</strong>
                </div>
                <div className="myth-choice" role="group" aria-labelledby="myth-choice-title">
                  <h2 id="myth-choice-title">{copy.game.inside}</h2>
                  <div>
                    {scene.options.map((option, index) => {
                      const shortcut = String.fromCharCode(65 + index)
                      return (
                        <button
                          disabled={!roundPlayable}
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

              <button
                ref={mobileMapLaunchRef}
                type="button"
                className="mobile-map-launch"
                aria-controls="mobile-map-sheet"
                aria-expanded={mobileMapOpen}
                disabled={!roundPlayable}
                onClick={() => setMobileMapOpen(true)}
              >
                <span>{copy.game.mobileMapStep}</span>
                <strong>{guess ? copy.game.mobileChangeMap : copy.game.mobileOpenMap}</strong>
                <Map size={20} aria-hidden="true" />
              </button>

              <section
                id="mobile-map-sheet"
                className={`oracle-card oracle-card--map ${mobileMapOpen ? 'is-mobile-map-open' : ''}`}
                role={mobileMapOpen ? 'dialog' : undefined}
                aria-modal={mobileMapOpen ? true : undefined}
                aria-labelledby={mobileMapOpen ? 'mobile-map-sheet-title' : undefined}
              >
                <div className="mobile-map-sheet__head">
                  <div><small>{copy.game.mobileMapStep}</small><strong id="mobile-map-sheet-title">{copy.game.mobileMapTitle}</strong></div>
                  <span
                    className={`mobile-map-sheet__timer ${roundStarted && seconds < 16 ? 'is-urgent' : ''}`}
                    role="timer"
                    aria-label={copy.game.timeRemaining(seconds)}
                  ><Timer size={15} aria-hidden="true" /> {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</span>
                  <button
                    ref={mobileMapCloseRef}
                    type="button"
                    onClick={() => setMobileMapOpen(false)}
                    aria-label={copy.game.mobileMapBack}
                  ><X size={19} aria-hidden="true" /> {copy.game.mobileMapBack}</button>
                </div>
                <div className="map-choice">
                  <h2>{copy.game.where}</h2>
                  <MythMap interactive guess={guess} onGuess={roundPlayable ? setGuess : undefined} onReadyChange={setMapReady} locale={locale} />
                  <p>{guess
                    ? copy.game.pinPlaced
                    : copy.game.pinEmpty}</p>
                </div>
                <button className="button button--gold oracle-card__submit" disabled={!roundPlayable || !answer || !guess} onClick={submitRound}>
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
                <p className="round-result__place"><Map size={15} /> {scenePresentation.location} · {scenePresentation.cycle}</p>
                {timedOut && <p className="round-result__timeout">{copy.game.timeoutNote}</p>}
                <p>{scenePresentation.reveal}</p>
                <small>
                  {scenePresentation.geographyNote}<br />
                  {copy.game.fullCredit(scene.accuracyRadiusKm)}<br />
                  {scenePresentation.source}<br />{scenePresentation.sourceNote}
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
                <div><span>{copy.game.myth}</span><strong>{formatScore(result.recognition, locale)}</strong><small>/ {formatScore(SCORE_MAXIMUMS.recognition, locale)}</small></div>
                <div><span>{copy.game.geography}</span><strong>{formatScore(result.geography, locale)}</strong><small>/ {formatScore(SCORE_MAXIMUMS.geography, locale)}</small></div>
                <div><span>{copy.game.speed}</span><strong>{formatScore(result.speed, locale)}</strong><small>/ {formatScore(SCORE_MAXIMUMS.speed, locale)}</small></div>
                <div><span>{copy.game.bonus}</span><strong>{formatScore(result.oracle, locale)}</strong><small>/ {formatScore(SCORE_MAXIMUMS.oracle, locale)}</small></div>
                <div className="score-table__total"><span>{copy.game.total}</span><strong>{formatScore(result.total, locale)}</strong><small>{result.distance === null ? copy.game.noMapGuess : copy.game.away(Math.round(result.distance))}</small></div>
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

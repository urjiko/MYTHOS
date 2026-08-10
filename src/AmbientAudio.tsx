import { Music2, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ui, type Locale } from './i18n'
import { readStoredValue, writeStoredValue } from './storage'

export const AMBIENT_AUDIO_STORAGE_KEY = 'mythos-ambient-audio'

const ENABLED_VALUE = 'enabled'
const MUTED_VALUE = 'muted'
const TRACK_TITLE = 'Sun over the Portico'

export function resolveAmbientAudioEnabled(savedValue: string | null) {
  return savedValue !== MUTED_VALUE
}

export default function AmbientAudio({
  locale,
  placement,
}: {
  locale: Locale
  placement: 'site' | 'game'
}) {
  const copy = ui[locale].audio
  const audioRef = useRef<HTMLAudioElement>(null)
  const [enabled, setEnabled] = useState(() => (
    resolveAmbientAudioEnabled(readStoredValue(AMBIENT_AUDIO_STORAGE_KEY))
  ))
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.2
    const markPlaying = () => setPlaying(true)
    const markPaused = () => setPlaying(false)
    audio.addEventListener('play', markPlaying)
    audio.addEventListener('pause', markPaused)
    audio.addEventListener('ended', markPaused)

    return () => {
      audio.removeEventListener('play', markPlaying)
      audio.removeEventListener('pause', markPaused)
      audio.removeEventListener('ended', markPaused)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (!enabled) {
      audio.pause()
      return
    }

    const unlockPlayback = (event: Event) => {
      const target = event.target
      if (
        !audio.paused
        || (target instanceof Element && target.closest('[data-ambient-audio-control]'))
      ) return

      void audio.play().catch(() => setPlaying(false))
    }

    document.addEventListener('pointerdown', unlockPlayback, true)
    document.addEventListener('click', unlockPlayback, true)
    document.addEventListener('keydown', unlockPlayback, true)
    return () => {
      document.removeEventListener('pointerdown', unlockPlayback, true)
      document.removeEventListener('click', unlockPlayback, true)
      document.removeEventListener('keydown', unlockPlayback, true)
    }
  }, [enabled])

  async function togglePlayback() {
    const audio = audioRef.current
    if (!audio) return

    if (!audio.paused) {
      audio.pause()
      setEnabled(false)
      writeStoredValue(AMBIENT_AUDIO_STORAGE_KEY, MUTED_VALUE)
      return
    }

    setEnabled(true)
    writeStoredValue(AMBIENT_AUDIO_STORAGE_KEY, ENABLED_VALUE)
    try {
      await audio.play()
    } catch {
      setPlaying(false)
    }
  }

  const controlLabel = playing ? copy.mute : copy.start
  const status = playing ? copy.playing : enabled ? copy.waiting : copy.muted
  const Icon = playing ? Volume2 : enabled ? Music2 : VolumeX

  return (
    <div className={`ambient-audio ambient-audio--${placement}`}>
      <audio
        ref={audioRef}
        src="./audio/sun-over-the-portico.mp3"
        loop
        playsInline
        preload="metadata"
      />
      <button
        type="button"
        className="ambient-audio__button"
        data-ambient-audio-control
        onClick={togglePlayback}
        aria-label={controlLabel}
        aria-pressed={playing}
        title={controlLabel}
      >
        <Icon size={17} aria-hidden="true" />
        <span className="ambient-audio__copy">
          <small>{copy.label}</small>
          <strong>{TRACK_TITLE}</strong>
        </span>
      </button>
      <span className="sr-only" aria-live="polite">{status}</span>
    </div>
  )
}

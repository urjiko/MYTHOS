import { BookOpen, Compass, Map, Sparkles, Swords } from 'lucide-react'

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`logo ${inverse ? 'logo--inverse' : ''}`} role="img" aria-label="MYTHOS">
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

export function IconForMode({ type }: { type: string }) {
  if (type === 'daily') return <Sparkles />
  if (type === 'journey') return <Compass />
  if (type === 'odyssey') return <Map />
  if (type === 'duel') return <Swords />
  return <BookOpen />
}

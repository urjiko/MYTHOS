import L from 'leaflet'
import type { GeoJsonObject } from 'geojson'
import { useEffect, useRef, useState } from 'react'
import type { MapConfidence, Point } from './data'
import { ancientRegions, atlasPlaces, odysseyRoute } from './data'
import type { Locale } from './i18n'

const MEDITERRANEAN_BOUNDS = L.latLngBounds([28.5, -12], [48, 45])
const INITIAL_BOUNDS = L.latLngBounds([30.5, -10], [45.5, 39])
const MIN_ZOOM = 3.5

const markerIcon = (className: string, glyph = '') => L.divIcon({
  className: `ancient-map__pin ${className}`,
  html: `<span>${glyph}</span>`,
  iconAnchor: [13, 13],
  iconSize: [26, 26],
})

export function MythMap({
  guess,
  target,
  targetRadiusKm,
  targetConfidence = 'attested',
  reveal = false,
  interactive = false,
  showRoute = false,
  onGuess,
  locale = 'en',
}: {
  guess?: Point | null
  target?: Point
  targetRadiusKm?: number
  targetConfidence?: MapConfidence
  reveal?: boolean
  interactive?: boolean
  showRoute?: boolean
  onGuess?: (point: Point) => void
  locale?: Locale
}) {
  const text = locale === 'tr'
    ? {
        zoomIn: 'Yakınlaştır',
        zoomOut: 'Uzaklaştır',
        attested: 'Belgelenmiş antik yer',
        traditional: 'Geleneksel mit ilişkisi',
        mythic: 'Yaklaşık mitik konum',
        record: 'Pleiades kaydı ↗',
        noRecord: 'Bağlı bağımsız yer kaydı yok',
        guess: 'Tahminin',
        storyAttested: 'Belgelenmiş hikâye yeri',
        storyTraditional: 'Geleneksel ilişkilendirme',
        storyMythic: 'Yaklaşık mitik konum',
        fullCredit: 'Tam puan bölgesi',
        interactiveAria: 'Antik Akdeniz’in etkileşimli haritası. Sürükleyip yakınlaş ve tahminini yerleştirmek için tıkla.',
        atlasAria: 'Antik Ege ve Akdeniz’in etkileşimli atlası.',
        loading: 'Antik kıyı çizgisi çiziliyor…',
        error: 'Kıyı çizgisi katmanı yüklenemedi.',
        era: 'ANTİK AKDENİZ · MODERN SINIR YOK',
        keyAria: 'Harita kesinlik anahtarı',
        keyAttested: 'Belgelenmiş',
        keyTraditional: 'Gelenek',
        keyMythic: 'Mitik',
      }
    : {
        zoomIn: 'Zoom in',
        zoomOut: 'Zoom out',
        attested: 'Attested ancient site',
        traditional: 'Traditional myth association',
        mythic: 'Approximate mythic placement',
        record: 'Pleiades record ↗',
        noRecord: 'No individual gazetteer link attached',
        guess: 'Your guess',
        storyAttested: 'Attested story site',
        storyTraditional: 'Traditional association',
        storyMythic: 'Approximate mythic placement',
        fullCredit: 'Full-credit region',
        interactiveAria: 'Interactive map of the ancient Mediterranean. Pan and zoom, then click to place your guess.',
        atlasAria: 'Interactive atlas of the ancient Aegean and Mediterranean.',
        loading: 'Drawing the ancient coastline…',
        error: 'The coastline layer could not be loaded.',
        era: 'ANCIENT MEDITERRANEAN · NO MODERN BORDERS',
        keyAria: 'Map confidence key',
        keyAttested: 'Attested',
        keyTraditional: 'Tradition',
        keyMythic: 'Mythic',
      }
  const hostRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const answerLayers = useRef<L.LayerGroup | null>(null)
  const onGuessRef = useRef(onGuess)
  const [mapStatus, setMapStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  onGuessRef.current = onGuess

  useEffect(() => {
    if (!hostRef.current) return

    let cancelled = false
    const host = hostRef.current
    const map = L.map(host, {
      attributionControl: false,
      zoomControl: false,
      minZoom: MIN_ZOOM,
      maxZoom: 9,
      maxBounds: MEDITERRANEAN_BOUNDS.pad(0.08),
      maxBoundsViscosity: 0.75,
      worldCopyJump: false,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      wheelPxPerZoomLevel: 90,
      keyboard: true,
      scrollWheelZoom: true,
      touchZoom: true,
      doubleClickZoom: true,
    })
    mapRef.current = map
    answerLayers.current = L.layerGroup().addTo(map)

    const updateLabelScale = () => {
      const zoomAboveOverview = Math.max(0, map.getZoom() - MIN_ZOOM)
      const labelScale = Math.min(1.38, 1 + zoomAboveOverview * 0.075)
      host.style.setProperty('--map-label-scale', labelScale.toFixed(3))
    }

    L.control.zoom({ position: 'topright', zoomInTitle: text.zoomIn, zoomOutTitle: text.zoomOut }).addTo(map)
    L.control.scale({ position: 'bottomleft', imperial: false, maxWidth: 110 }).addTo(map)
    L.control.attribution({ position: 'bottomright', prefix: false })
      .addAttribution(
        '<a href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer">Natural Earth</a> · ancient places: <a href="https://pleiades.stoa.org/" target="_blank" rel="noreferrer">Pleiades</a>',
      )
      .addTo(map)

    for (let longitude = -10; longitude <= 40; longitude += 5) {
      L.polyline([[29, longitude], [47.5, longitude]], {
        className: 'ancient-map__graticule',
        color: '#486d70',
        weight: 0.65,
        opacity: 0.2,
        interactive: false,
      }).addTo(map)
    }
    for (let latitude = 30; latitude <= 45; latitude += 5) {
      L.polyline([[latitude, -12], [latitude, 45]], {
        className: 'ancient-map__graticule',
        color: '#486d70',
        weight: 0.65,
        opacity: 0.2,
        interactive: false,
      }).addTo(map)
    }

    ancientRegions.forEach((region) => {
      L.marker([region.lat, region.lng], {
        interactive: false,
        icon: L.divIcon({
          className: `ancient-map__region ancient-map__region--${region.kind}`,
          html: `<span>${region.name}</span>`,
          iconAnchor: [65, 8],
          iconSize: [130, 16],
        }),
      }).addTo(map)
    })

    atlasPlaces.forEach((place) => {
      const placeName = interactive
        ? place.gameName?.[locale] ?? place.name
        : place.name
      const confidenceLabel: Record<MapConfidence, string> = {
        attested: text.attested,
        traditional: text.traditional,
        mythic: text.mythic,
      }
      const popupSource = place.pleiadesUrl
        ? `<a href="${place.pleiadesUrl}" target="_blank" rel="noreferrer">${text.record}</a>`
        : `<span>${text.noRecord}</span>`
      L.marker([place.lat, place.lng], {
        icon: L.divIcon({
          className: `ancient-map__site ancient-map__site--${place.confidence}`,
          html: '<span></span>',
          iconAnchor: [5, 5],
          iconSize: [10, 10],
        }),
        keyboard: true,
        title: placeName,
      })
        .bindTooltip(placeName, {
          className: 'ancient-map__site-label',
          permanent: true,
          direction: 'right',
          offset: [6, 0],
        })
        .bindPopup(`<strong>${placeName}</strong><small>${place.type} · ${place.period}<br>${confidenceLabel[place.confidence]}</small>${popupSource}`)
        .addTo(map)
    })

    if (showRoute) {
      L.polyline(odysseyRoute.map((point): L.LatLngTuple => [point.lat, point.lng]), {
        className: 'ancient-map__route',
        color: '#9f432d',
        weight: 2,
        opacity: 0.72,
        dashArray: '6 8',
        interactive: false,
      }).addTo(map)
    }

    const handleMapClick = (event: L.LeafletMouseEvent) => {
      if (!interactive) return
      onGuessRef.current?.({ lat: event.latlng.lat, lng: event.latlng.lng })
    }
    map.on('click', handleMapClick)
    map.on('zoomend', updateLabelScale)
    map.fitBounds(INITIAL_BOUNDS, { padding: [10, 10] })
    updateLabelScale()

    const resizeObserver = new ResizeObserver(() => map.invalidateSize({ pan: false }))
    resizeObserver.observe(host)

    fetch('./data/mediterranean-land.geojson')
      .then((response) => {
        if (!response.ok) throw new Error(`Map data request failed: ${response.status}`)
        return response.json()
      })
      .then((land: GeoJsonObject) => {
        if (cancelled) return
        L.geoJSON(land, {
          interactive: false,
          style: {
            className: 'ancient-map__land',
            color: '#62533e',
            fillColor: '#d6c9a9',
            fillOpacity: 0.92,
            opacity: 0.86,
            weight: 1,
          },
        }).addTo(map).bringToBack()
        setMapStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setMapStatus('error')
      })

    return () => {
      cancelled = true
      resizeObserver.disconnect()
      map.off('click', handleMapClick)
      map.off('zoomend', updateLabelScale)
      map.remove()
      mapRef.current = null
      answerLayers.current = null
    }
  }, [interactive, locale, showRoute])

  useEffect(() => {
    const map = mapRef.current
    const layers = answerLayers.current
    if (!map || !layers) return
    layers.clearLayers()

    if (guess) {
      L.marker([guess.lat, guess.lng], { icon: markerIcon('ancient-map__pin--guess') })
        .bindTooltip(text.guess, { className: 'ancient-map__answer-label', direction: 'top', offset: [0, -12] })
        .addTo(layers)
    }

    if (reveal && target) {
      const targetLabel: Record<MapConfidence, string> = {
        attested: text.storyAttested,
        traditional: text.storyTraditional,
        mythic: text.storyMythic,
      }
      const revealBounds = L.latLngBounds([[target.lat, target.lng]])

      if (targetRadiusKm && targetRadiusKm > 0) {
        const accuracyRegion = L.circle([target.lat, target.lng], {
          radius: targetRadiusKm * 1000,
          className: 'ancient-map__accuracy-radius',
          color: '#c49a4d',
          fillColor: '#c49a4d',
          fillOpacity: 0.13,
          weight: 1.5,
          dashArray: '4 5',
          interactive: false,
        })
          .bindTooltip(`${text.fullCredit} · ${Math.round(targetRadiusKm)} km`, {
            className: 'ancient-map__answer-label',
            direction: 'bottom',
          })
          .addTo(layers)
        revealBounds.extend(accuracyRegion.getBounds())
      }

      L.marker([target.lat, target.lng], { icon: markerIcon(`ancient-map__pin--target ancient-map__pin--${targetConfidence}`, '✓') })
        .bindTooltip(targetLabel[targetConfidence], { className: 'ancient-map__answer-label', permanent: true, direction: 'top', offset: [0, -12] })
        .addTo(layers)

      if (guess) {
        revealBounds.extend([guess.lat, guess.lng])
        L.polyline([[guess.lat, guess.lng], [target.lat, target.lng]], {
          color: '#9f432d',
          weight: 2,
          opacity: 0.78,
          dashArray: '5 7',
          interactive: false,
        }).addTo(layers)
        map.fitBounds(revealBounds, { padding: [40, 40], maxZoom: 7 })
      } else {
        map.fitBounds(revealBounds, { padding: [40, 40], maxZoom: 6 })
      }
    }
  }, [guess, locale, reveal, target, targetConfidence, targetRadiusKm])

  return (
    <div className={`myth-map myth-map--${mapStatus} ${interactive ? 'myth-map--interactive' : ''}`}>
      <div
        ref={hostRef}
        className="myth-map__leaflet"
        role="application"
        aria-label={interactive
          ? text.interactiveAria
          : text.atlasAria}
        onKeyDown={(event) => {
          if (!interactive || event.key !== 'Enter' || !mapRef.current) return
          event.preventDefault()
          const centre = mapRef.current.getCenter()
          onGuessRef.current?.({ lat: centre.lat, lng: centre.lng })
        }}
      />
      {mapStatus === 'loading' && <span className="myth-map__status">{text.loading}</span>}
      {mapStatus === 'error' && <span className="myth-map__status">{text.error}</span>}
      <span className="myth-map__era">{text.era}</span>
      <span className="myth-map__key" aria-label={text.keyAria}>
        <i className="is-attested" /> {text.keyAttested} <i className="is-traditional" /> {text.keyTraditional} <i className="is-mythic" /> {text.keyMythic}
      </span>
    </div>
  )
}

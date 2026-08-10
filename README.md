# MYTHOS

An immersive web game that turns Greek mythology from a list to memorise into a world to explore.

## Prototype 0.9

- Forty-four playable myths, including eight new Anatolian stories spanning Hypaipa, Halicarnassus, the Hellespont, Themiscyra, Letoon, Teuthrania, Pessinus, and the Bosporus
- Browser-language detection for the English/Turkish interface, with a persistent manual override and English fallback
- Complete English/Turkish titles, progressive clues, archive/result copy, source context, and geographic metadata for every playable story
- Clickable Heroes and Creatures collections with square scene portraits, expanded bilingual profiles, story appearances, and further-reading links
- Six-round general journeys drawn at random from the full archive
- A thirteen-encounter Odysseus’s Route mode that draws only from the Odyssey cycle
- A six-encounter Trojan chronicle spanning two war preludes and four episodes from Homer’s Iliad
- Forty-four monoscopic 360° scenes rendered from inside a WebGL sphere
- Device-aware 2K/4K sphere delivery plus lightweight previews and a bounded flat fallback when WebGL or the texture request fails
- Route-level code splitting keeps the initial JavaScript under a 300 KiB budget; archive copy, figure profiles, map code, and the 360° viewer load only when needed
- Full-stage desktop panoramas with separate translucent answer and map cards
- A square desktop game map with collision-aware, Apple Maps-style progressive labels; all map modes use neutral ancient toponyms so they do not reveal the answer
- Four-choice myth identification with freshly shuffled answer positions each game
- Pan, pinch, wheel, keyboard, bounded zoom, and button zoom on a real geographic map
- Natural Earth 10m coastline geometry with no modern political borders
- Ancient place labels and source links grounded in the Pleiades gazetteer
- Explicit confidence notes for attested, traditional, and purely mythic locations
- Great-circle distance scoring in kilometres, with a visible full-credit region tailored to each myth’s geographic certainty
- Progressive oracle clues, source context, and browser-saved personal best
- A bilingual journey report that normalises every scoring skill, identifies the next learning focus, and reviews each completed round
- Versioned per-mode journey recovery that preserves shuffled decks, choices, scores, and active deadlines
- A first-run oracle briefing that teaches the complete loop before the opening clock starts, with non-pausing in-game help thereafter
- Keyboard answer shortcuts, route-aware focus, localised page titles, and a focus-safe mobile menu
- Responsive desktop and mobile layouts, with a focused full-screen map step, safe-area support, and larger touch targets on small screens
- Installable iPhone/Android web app behavior with standalone launch, bilingual installation guidance, an offline shell, and bounded caches for recently used mobile panoramas

## Scoring

| Component | Maximum |
| --- | ---: |
| Identify the myth | 3,500 |
| Geographic proximity | 4,000 |
| Time remaining | 1,500 |
| Complete without clues | 1,000 |
| **Round total** | **10,000** |

The five-scene general journey is worth 50,000 Oracle Points, the Trojan chronicle is worth 60,000, and Odysseus’s thirteen-scene route is worth 130,000. Geographic proximity uses Haversine distance, so guesses are scored in real kilometres rather than arbitrary screen coordinates. Exact pins are not required: every myth defines a deliberately tight full-credit radius, after which points decay smoothly with distance.

## Local development

```bash
npm install
npm run generate:map
npm run check:assets
npm run test
npm run dev
```

Production check:

```bash
npm run check
npm run check:assets
npm run build
npm run check:bundle
npm run check:pwa
```

## The ancient map

`scripts/generate-ancient-map.mjs` clips Natural Earth 10m land geometry to the Mediterranean. Leaflet supplies the interaction layer, but the map intentionally omits modern tiles and borders. Ancient sites use geographic coordinates and, where individually verified, link to Pleiades records. Story cards say whether a location is archaeologically attested, a later traditional association, or an intentionally approximate mythic direction.

Map data credits are always visible in the atlas. Natural Earth data is public domain; Pleiades data is CC BY.

## 360° scenes

The forty-four source textures in `public/assets/` are 4096×2048 WebP files. They cover 360° horizontally and 180° vertically, keep the horizon near the middle, and are mapped to the inside of a Three.js sphere with the camera at its centre. Phones, coarse-pointer tablets, data-saving connections, and devices reporting 4 GB or less memory receive generated 2048×1024 textures from `public/assets/mobile/`; capable desktop devices retain the 4K source. Every scene also has a 1024×512 preview in `public/assets/previews/`, so it appears immediately while the projected texture loads. If the mobile derivative is unavailable the viewer retries the 4K source, and if WebGL or both texture requests fail the preview remains usable instead of blocking the round.

The source generations are 1774×887 PNGs. The 4K delivery files use high-quality resampling and lighter compression to reduce browser artefacts; that improves presentation but does not invent the same detail as a future native-4K or dedicated super-resolution source pass. Mobile textures and previews are reproducible, gitignored build outputs generated automatically before development and production builds; CI regenerates them before validation and deployment. `npm run check:assets` enforces source/mobile/preview dimensions, sRGB WebP delivery, per-file and collection budgets, one-to-one scene/prompt coverage, derivative freshness, and a left/right seam threshold. Projection views at yaw 0°/90°/180°/270° plus zenith and nadir remain a deliberate human review because a numeric seam score cannot prove spherical composition.

See `docs/ART_DIRECTION.md`, `docs/ASSET_PROMPTS.md`, and `docs/ASSET_PIPELINE.md` for the art and delivery contracts.

## Deployment

`.github/workflows/deploy-pages.yml` builds and publishes the Vite app whenever `main` changes. GitHub Pages must use **GitHub Actions** as its source.

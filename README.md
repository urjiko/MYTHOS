# MYTHOS

An immersive web game that turns Greek mythology from a list to memorise into a world to explore.

## Prototype 0.3

- Nine playable myths with fully English UI and story text
- Six-round general journeys drawn at random from the full archive
- A four-encounter Odysseus’s Route mode that draws only from the Odyssey cycle
- Nine monoscopic 360° scenes rendered from inside a WebGL sphere
- Four-choice myth identification with freshly shuffled answer positions each game
- Pan, pinch, wheel, keyboard, bounded zoom, and button zoom on a real geographic map
- Natural Earth 10m coastline geometry with no modern political borders
- Ancient place labels and source links grounded in the Pleiades gazetteer
- Explicit confidence notes for attested, traditional, and purely mythic locations
- Great-circle distance scoring in kilometres, with a visible full-credit region tailored to each myth’s geographic certainty
- Progressive oracle clues, source context, and browser-saved personal best
- Responsive desktop and mobile layouts

## Scoring

| Component | Maximum |
| --- | ---: |
| Identify the myth | 3,500 |
| Geographic proximity | 4,000 |
| Time remaining | 1,500 |
| Complete without clues | 1,000 |
| **Round total** | **10,000** |

The general six-scene journey is worth 60,000 Oracle Points; Odysseus’s four-scene route is worth 40,000. Geographic proximity uses Haversine distance, so guesses are scored in real kilometres rather than arbitrary screen coordinates. Exact pins are not required: every myth defines a full-credit radius, after which points decay smoothly with distance.

## Local development

```bash
npm install
npm run generate:map
npm run test
npm run dev
```

Production check:

```bash
npm run check
npm run build
```

## The ancient map

`scripts/generate-ancient-map.mjs` clips Natural Earth 10m land geometry to the Mediterranean. Leaflet supplies the interaction layer, but the map intentionally omits modern tiles and borders. Ancient sites use geographic coordinates and, where individually verified, link to Pleiades records. Story cards say whether a location is archaeologically attested, a later traditional association, or an intentionally approximate mythic direction.

Map data credits are always visible in the atlas. Natural Earth data is public domain; Pleiades data is CC BY.

## 360° scenes

The nine game textures in `public/assets/` are 4096×2048 WebP files. They cover 360° horizontally and 180° vertically, keep the horizon near the middle, and are mapped to the inside of a Three.js sphere with the camera at its centre.

The source generations are 1774×887 PNGs. The 4K delivery files use high-quality resampling and lighter compression to reduce browser artefacts; that improves presentation but does not invent the same detail as a future native-4K or dedicated super-resolution source pass. Every new panorama is checked as ordinary views at yaw 0°/90°/180°/270°, at the zenith and nadir, and across the left/right seam.

See `docs/ART_DIRECTION.md` and `docs/ASSET_PROMPTS.md` for the art contract.

## Deployment

`.github/workflows/deploy-pages.yml` builds and publishes the Vite app whenever `main` changes. GitHub Pages must use **GitHub Actions** as its source.

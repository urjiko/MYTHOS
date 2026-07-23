# MYTHOS — Art direction

## Mythic fresco realism

MYTHOS uses cinematic spatial depth with an aged fresco and oil-paint surface. The world should feel archaeologically informed without pretending that a myth has one objectively correct reconstruction.

### Palette

- Bone white: `#f7f0df`
- Obsidian: `#191813`
- Terracotta: `#9f432d`
- Aegean teal: `#1d6670`
- Oracle gold: `#c49a4d`
- Muted olive: `#596049`

### Scene rules

1. The answer is communicated through several small clues, never one oversized hero prop.
2. Architecture and landscape establish place before characters establish plot.
3. Gods and monsters remain enigmatic; avoid close-up fantasy portraits.
4. No text is baked into scene art.
5. Images must retain useful details across every yaw direction for spherical exploration.
6. Clothing, ships, fortifications, and material culture are archaic-inspired rather than Roman or medieval.
7. Generated scenes are interpretations, not archaeological evidence.

### Spherical format

The forty-four game images are true monoscopic 2:1 equirectangular textures. Their 1774×887 source generations are delivered as 4096×2048 WebP files with high-quality resampling and light sharpening. Each covers 360° horizontally and 180° vertically, keeps the horizon near mid-height, and joins its left and right edges. The website maps each texture to the inside of a WebGL sphere with the camera at its centre.

An asset is accepted only after these checks:

1. Reproject yaw 0°, 90°, 180°, and 270° into rectilinear views.
2. Reproject zenith and nadir to catch collapsed poles.
3. Compare mirrored left/right edge strips; investigate visible discontinuities.
4. Confirm clues remain discoverable without becoming oversized answer props.
5. Confirm the initial view and touch controls work on mobile.

### Asset optimisation

Source PNGs are converted to 4096×2048 WebP at quality 90 or above. The forty-four sphere textures total roughly 35.6 MiB, a deliberate increase over the original aggressively compressed set. Browser rendering uses mipmaps, linear filtering, up to 16× anisotropy, and a device-pixel-ratio cap of 2. The landing-page art remains a separate flat image.

The 4K delivery pass reduces compression and sampling artefacts; it cannot recreate detail that was absent from the generated source. Native-4K generation or a dedicated projection-safe super-resolution pass remains a future upgrade.

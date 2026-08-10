# MYTHOS — Panorama projection review

Review date: 9 August 2026

Scope: the seven assets initially above the automated seam-review threshold, their P0 replacements, plus Labyrinth, Medusa, Sirens, Trojan Horse, and Prometheus as lower-MAE controls. Every asset was inspected as 90° rectilinear views centred at longitude 0°, 90°, 180° (the wrap seam), and 270°, followed by zenith and nadir views.

The source hash, measured seam value, and decision for every current threshold candidate are recorded in `PANORAMA_REVIEW.json`. CI accepts that decision only while the exact source hash remains unchanged. Replacing a source therefore forces a fresh projection review instead of inheriting an obsolete approval.

## Resolved in this pass

| Asset | Previous finding | Accepted replacement |
| --- | --- | --- |
| `scene-hippolyta-girdle.webp` | The 19.07 seam MAE, crowded edge detail, conspicuous pole convergence, and oversized heroic figure worked against a convincing sphere. | Rebuilt as a distributed Themiscyra shore scene, then corrected so Heracles remains fully clothed and secondary to the environment. All six review views are coherent; seam MAE is 9.52. |
| `scene-telephus-achilles.webp` | The armour and formation read as later Roman/imperial, while foliage and equipment collapsed toward the poles. | Rebuilt around the Mysian coast and corrected to restrained Late Bronze Age Mycenaean clothing, low helmets, and period-appropriate shields. All six review views are coherent; seam MAE is 9.31. |

## Hippolyta route art pass

The five new route panoramas were generated as environment-first 2:1 equirectangular scenes and inspected in their flat source form before delivery at 4096×2048. Their seam measurements remain below the 14 MAE projection-review threshold: Admete’s request 7.51, Paros 11.80, Mygdon 9.68, Hera among the Amazons 7.85, and Hesione 8.38. The existing 9.52 MAE Themiskyra panorama remains the peaceful centre of the six-scene route.

## Ganymedes art pass

The Mount Ida panorama was inspected as front, right, seam, left, zenith, and nadir projections after 4096×2048 delivery processing. Ganymedes and the divine eagle remain readable across the front and zenith views, while the horses, herds, shepherd camp, and golden bowl reward turning and looking down. The ground and sky remain continuous, the seam view is coherent, and the measured seam MAE is 11.31—below the mandatory review threshold.

## Decision queue

| Priority | Asset | Finding | Decision |
| --- | --- | --- | --- |
| P1 | `scene-leto-lycians.webp` | The join is usable, but one foreground figure dominates the clue field and the nadir has severe radial collapse. | Replace in the following art pass |
| P1 | `scene-attis-great-mother.webp` | The scene is readable but excessively crowded, with clipped edge figures and strong zenith/nadir convergence. | Replace in the following art pass |
| P1 | `scene-phaeacians.webp` | The seam is continuous, but the monumental palace and oversized beached ship weaken archaic plausibility and the quieter fresco treatment used by the strongest scenes. | Replace in the following art pass |
| Keep | `scene-niobe-sipylus.webp` | The measured edge difference does not become a visible seam in projection; composition and surface treatment remain coherent. | Keep until a native-4K pass |
| Keep | `scene-salmacis-hermaphroditus.webp` | The join is visually coherent and the fresco surface is among the strongest of the newer scenes; pole compression remains manageable. | Keep until a native-4K pass |

## Control result

Labyrinth, Medusa, Sirens, Trojan Horse, and Prometheus all retain coherent cardinal views and visibly cleaner seams at roughly 5–7 MAE. Their enclosed ceilings, open skies, ground planes, and ship structures also show that the projection tool distinguishes a strong sphere from a merely wide image.

The numeric MAE is not a beauty score. It only decides when human review is mandatory. Perspective, archaeological plausibility, clue distribution, and Mythic Fresco Realism remain human judgments recorded above.

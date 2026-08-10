# MYTHOS — Panorama asset pipeline

The 4K source panorama is the artwork. A generated 2K texture is the mobile delivery variant; the generated preview is only a fast first frame and resilient flat fallback.

## Add or replace a panorama

1. Export `public/assets/scene-{scene-id}.webp` as a 4096×2048 sRGB WebP.
2. Keep the filename aligned with the scene ID in `src/data.ts`.
3. Document the exact generation prompt under the same filename in `docs/ASSET_PROMPTS.md`.
4. Regenerate every derived delivery asset:

   ```bash
   npm run generate:panorama-assets
   ```

5. Run the complete asset contract:

   ```bash
   npm run check:assets
   ```

6. Review the panorama inside the actual sphere at yaw 0°, 90°, 180°, and 270°, then at the zenith, nadir, and left/right join.

   ```bash
   npm run review:panoramas
   ```

   With no arguments, the command generates review sheets only for assets above the manual seam-review threshold. Use `npm run review:panoramas -- --all` for the full collection, pass scene IDs such as `npm run review:panoramas -- hippolyta-girdle`, or inspect a not-yet-adopted candidate with `npm run review:panoramas -- --input public/assets/candidates/scene-hippolyta-girdle-v2.webp`. Sheets are written to the operating system's temporary `mythos-panorama-review` directory unless `--output <directory>` is supplied.

Commit the changed 4K source and its prompt/review records. Mobile textures, previews, and their hash manifests are reproducible build outputs: they stay out of Git and are regenerated before local development, production builds, and CI validation. The manifests still bind each derivative to its exact source SHA-256, so the checker rejects stale or hand-edited delivery files before deployment.

## Automated rejection rules

The checker rejects:

- missing, orphaned, duplicated, or incorrectly named scene art;
- missing prompt documentation;
- any source that is not 4096×2048 sRGB WebP;
- any mobile texture that is not 2048×1024 sRGB WebP;
- any preview that is not 1024×512 sRGB WebP;
- suspiciously small placeholders or files above their delivery budgets;
- a complete 4K collection above 42 MiB or mobile collection above 12 MiB;
- source/mobile/preview hashes that no longer match their manifests;
- a left/right edge mean absolute error above the rejection threshold.

The seam metric is a guardrail, not an art critic. A low value cannot prove correct perspective, useful clue placement, or clean poles. Assets above the lower review threshold are printed as a manual review queue even when they remain below hard rejection.

Completed threshold reviews live in `docs/PANORAMA_REVIEW.md`; `docs/PANORAMA_REVIEW.json` binds each decision to the exact source SHA-256. CI rejects an unreviewed threshold candidate or a changed source carrying a stale decision.

## Runtime behaviour

The lightweight preview is requested immediately. Three.js loads a 2K texture on phones, coarse-pointer tablets, data-saving connections, and devices reporting at most 4 GB of memory; other devices receive the 4K source. Mobile rendering also lowers pixel ratio, sphere tessellation, and anisotropy while omitting unnecessary antialias, depth, and stencil buffers. A missing mobile derivative retries the 4K source. A failed or stalled texture request is released after a bounded deadline, leaving the preview visible and allowing the round to continue. This preserves playability without pretending that a flat preview is a successful 360° load.

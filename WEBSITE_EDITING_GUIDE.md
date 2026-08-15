# Vera Sung website — editing guide

This file exists only to make future edits faster. It is not loaded by the website and therefore does not change the site's appearance or behaviour.

## Deployment

- Repository: `verasungvs/vera-sung-site`
- Production domain: `https://verasungvs.com/`
- Main branch: `main`
- Netlify deploys automatically after pushes to `main`.

## Visual contract

Unless Vera explicitly requests otherwise, preserve the current visual language exactly:

- warm off-white paper background
- subtle paper grain / vignette
- stamped / typewriter typography
- current header and navigation layout
- current footer layout
- existing spacing rhythm
- current responsive behaviour
- Night Walks dark theme
- no redesign, no new colours, no new fonts

When a request concerns one page or one image, do not refactor unrelated visual code in the same commit.

## Main files

- `index.html`: global CSS, layout, responsive rules and script loading
- `colors_and_type.css`: colour and typography tokens
- `pages.jsx`: project/page content and photographic sequences
- `app.jsx`: routing, header/footer, homepage override and Passage presentation overrides
- `assets/`: all photographic assets

## Current homepage Passage presentation

Homepage hero is controlled in `app.jsx` inside `HomePage`.

Current intent:

- hero links to `photography/passage`
- image should display at natural aspect ratio
- desktop presentation is intentionally not full browser width
- mobile presentation should remain simple and readable
- subtle bottom-right text: `LE PASSAGE, 2026`
- no decorative band beneath the image

Before changing the homepage image, verify that the exact asset referenced by `heroSrc` exists in `/assets` and is the intended photograph. Do not create multiple similarly named temporary assets unless necessary.

## Current Passage presentation

Passage-specific presentation is controlled in `app.jsx` inside `PassageSequence` and `PassageWatermarkedPhoto`.

Current intent:

- Passage images are somewhat smaller than the original site presentation, but still clearly readable
- web-resolution image delivery is used to reduce print usefulness while preserving viewing quality
- first six sequence positions use the subtle mark `LE PASSAGE, 2026`
- following sequence positions use `LE PASSAGE, 2023`
- right-click / drag protection is retained where possible

## Fast editing workflow

For future changes:

1. Read only the file(s) relevant to the requested area.
2. Group all requested changes for that area into one batch.
3. Preserve every value not explicitly requested to change.
4. Use one clearly named commit per batch.
5. After writing, verify the exact GitHub file paths and references before asking Vera to check Netlify.
6. For image replacements, verify both the asset path and the actual asset content before changing presentation code.
7. Avoid adding new rendering layers when a normal `<img>` is sufficient.
8. Do not use a CSS/background-image workaround for a normal photographic image unless there is a specific technical reason.

## Preferred request format

A compact request can be handled as one batch, for example:

```
Homepage + Passage only
1. Homepage image: [asset]
2. Homepage desktop width: 900px
3. Watermark opacity: 0.35
4. Passage desktop width: 76%
5. Passage mobile width: 94%
6. Everything else unchanged
```

The phrase `everything else unchanged` should be treated as a strict constraint.

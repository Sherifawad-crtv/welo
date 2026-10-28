# Welo

Calorie tracker app prototype. Static HTML/CSS, no build step.

- `index.html`: Home screen

## Deploy on Vercel

Import the repo in Vercel with the **Other** framework preset and leave build command and output directory empty. Vercel serves the repo root. `vercel.json` adds clean URLs and basic security headers.

Local preview: `npx serve .`

## PWA

Installable and offline-capable: `manifest.webmanifest`, `sw.js` (network-first pages, cache-first assets), icons in `icons/`. On phones the app fills the screen with safe-area insets and no fake status bar; on desktop it still shows the framed mockup. Service workers need HTTPS (or localhost), so test the install on the Vercel URL.

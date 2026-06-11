---
name: run-agastsya-dev
description: Run, build, screenshot, or smoke-test the agastsya.dev portfolio site (Vite + React SPA). Use when asked to run the app, take screenshots, verify a visual change, or check the site on desktop/mobile viewports.
---

# Run agastsya.dev

Single-page React portfolio built with Vite. No backend, no env vars, no
database. Driven headlessly with Playwright via the locally installed Google
Chrome (`playwright-core` + `channel: "chrome"` — no browser download).

All paths are relative to the repo root.

## Prerequisites

- Node + npm (any recent version; verified with the system install).
- Google Chrome at `/Applications/Google Chrome.app` (used headlessly).
- `npm install` (installs `playwright-core` as a devDependency).

## Run (agent path) — the driver

```bash
node .claude/skills/run-agastsya-dev/driver.mjs
```

What it does, in order:

1. Starts `vite` on port **5199** (strict; fails fast if the port is taken).
2. Loads the page at 1440×900, asserts the hero `h1` rendered.
3. Scrolls the full page in steps so the IntersectionObserver reveals,
   count-up metrics, and parallax all fire.
4. Drives one real flow: types `wins` into the dashboard terminal widget,
   presses Enter, asserts the response mentions "Microsoft Hackmania".
5. Screenshots → `.claude/skills/run-agastsya-dev/shots/`:
   `desktop-hero.png`, `desktop-projects.png`, `desktop-dashboard.png`,
   `desktop-band-warp.png`, `desktop-band-planets.png`, `mobile-hero.png`
   (390×844).
6. Kills the dev server. Prints `OK` on success, `FAIL: …` lines otherwise
   (exit code 1).

Flags:

- `--url http://localhost:5173` — drive an already-running server instead of
  starting one.
- `--keep` — leave the dev server running on port 5199 after the run.

## Build

```bash
npx vite build     # outputs to dist/, ~600ms
```

## Run (human path)

```bash
npm run dev        # vite on http://localhost:5173, Ctrl-C to stop
```

## Gotchas

- **The page is animation-heavy.** Screenshots taken immediately after
  `goto` miss content: sections are `opacity: 0` until their
  IntersectionObserver fires, and the metric numbers count up from 0. The
  driver's full-page scroll pass (step 3) exists to flush all of that —
  don't screenshot below-the-fold sections without it.
- **The hero photo is a base64 string inside `src/App.jsx`**, which makes
  that file ~84k characters with very long lines. Grep for sections instead
  of reading it whole.
- **All CSS lives in a template literal (`const CSS`) inside `src/App.jsx`**
  — there is no separate stylesheet.
- **All section artwork is live Three.js** (`src/ThreeScenes.jsx`, lazy-loaded
  so `three` stays out of the main bundle). Six scene variants: hero `waves`,
  project cards `network`/`streams`/`terrain`, art bands `warp`/`planets` —
  six WebGL contexts total. Each pauses when scrolled off-screen, renders a
  single static frame under prefers-reduced-motion, and renders fine in
  headless Chrome (software WebGL).

## Troubleshooting

- `vite dev server did not come up` — port 5199 already in use (strictPort
  is on). Kill the stale process or pass `--url` at the running instance.
- `browserType.launch: Chromium distribution 'chrome' is not found` —
  Google Chrome isn't installed; install it or run
  `npx playwright install chromium` and drop the `channel` option in
  `driver.mjs`.

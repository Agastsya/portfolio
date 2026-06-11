# agastsya.dev — deploy guide

## Before deploying (2 min)
Open `src/App.jsx` and fill in the `LINKS` config at the top:
GitHub URL, LinkedIn URL, hosted resume PDF, project repo links.
Set `GITHUB_USERNAME` to enable the live repo feed.

## Option A — Vercel (recommended)
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → import the repo
3. Vercel auto-detects Vite. Click Deploy. Done.

## Option B — Netlify (no git needed)
1. Run: npm install && npm run build
2. Drag the generated `dist/` folder onto app.netlify.com/drop

## Custom domain
Buy agastsyajoshi.dev (or similar) and add it in your
Vercel/Netlify project settings → Domains.

## Local dev
npm install
npm run dev

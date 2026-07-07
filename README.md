# QUBITRIX — qubitrixai.com

Cinematic scroll-journey site for Qubitrix, an AI engineering studio.
Vite + React + TypeScript + Tailwind v4 + GSAP + Lenis + three.js. Deploys on Netlify.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build & verify

```bash
npm run build      # typecheck + production build → dist/
npm run preview    # serve dist/ at http://localhost:4173
npm run screenshot # Playwright screenshots of every route (needs: npx playwright install chromium)
```

## Deploy (Netlify)

1. Push this folder to its own GitHub repository.
2. Netlify → "Add new site" → import the repo. `netlify.toml` supplies build command, publish dir, functions dir, and SPA redirect.
3. Set environment variables (Site settings → Environment variables):
   - `ANTHROPIC_API_KEY` (or `GEMINI_API_KEY`) — powers the chat assistant. Without a key the console runs in scripted demo mode.
   - `VITE_N8N_WEBHOOK_URL` — receives booking/request submissions as JSON. Without it, forms fall back to mailto.
   - `VITE_CALENDLY_URL` — optional calendar embed on /book.
4. Point the qubitrixai.com domain at the new site.

## Where things live

- All site copy → `src/content/` (edit text here, never in components)
- Placeholders to replace before launch → grep `TODO(owner)`
- Testimonials (placeholder, swap with real ones) → `src/content/testimonials.ts`
- Particle journey → `src/scenes/canvas/`, scenes → `src/scenes/sections/`
- Chat proxy (API key stays server-side) → `netlify/functions/chat.mts`

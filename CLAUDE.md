# QUBITRIX — qubitrix-site

Cinematic single-page journey + subpages for qubitrixai.com. Vite + React 18 + TS + Tailwind v4 + GSAP/ScrollTrigger + Lenis + three.js (one persistent particle canvas). Deploys to Netlify (user pushes to git). Full design strategy: `~/.claude/plans/qubitrix-website-redesign-floofy-shell.md`.

## Identity — "Obsidian Instrument / Qubitrix OS"
- 90% monochrome: obsidian base (`--color-obsidian-0/1/2`), silver text, metallic gradient display headlines (`.metal-text`).
- Energy accents ONLY volt `#7C6BFF` + plasma `#3EE0F0`; glow is a shadow, never a fill; max one aurora-gradient element per viewport.
- Type: Clash Display (display), Inter (body), JetBrains Mono (HUD labels via `.hud-label`).
- Copy rules: headlines ≤ 8 words, no emoji, no exclamation marks, ALL text lives in `src/content/` — components never hardcode copy.
- Brand says QUBITRIX everywhere. Quantum = metaphor/ambition, never a hardware claim. No fabricated stats or clients.

## Architecture invariants
- ONE WebGL canvas (`scenes/canvas/SceneManager.ts`), driven by `getScene().setProgress(0..5)` from ScrollTriggers in `pages/Home.tsx`. Formations: Q(0) stream(1) lattice(2) orbital(3) starfield(4) aurora(5).
- Pins ONLY on Hero, Lab (desktop), Contact-adjacent moments. Everything else = natural scroll + `[data-reveal]` (see `lib/useReveal.ts`). Never add more pins (user decision).
- Motion: GSAP + Lenis only — no framer-motion. DOM animates `transform`/`opacity` only.
- No auth, no login popups, the site never interrupts the visitor.
- Secrets: AI keys live in `netlify/functions/` env only. Anything `VITE_`-prefixed is public.

## Before any implementation
1. Read the relevant plan section; inspect the files you'll touch and their imports.
2. Check `src/content/` first — copy changes are content changes, not component changes.
3. State what you intend to change before changing it.

## Definition of done — verify before presenting (non-negotiable)
1. `npm run build` clean (runs `tsc --noEmit` first).
2. `npm run preview` + `npm run screenshot` → review EVERY screenshot critically at 390/768/1440 (script fails on console errors).
3. Walk flows: full home scroll, service overlay open/Esc, /work → detail, /book form, request builder 3 steps, console chat, 404.
4. Reduced-motion pass (emulate `prefers-reduced-motion`): site fully usable, poster instead of canvas.
5. Keyboard pass: skip link, focus rings, Esc closes overlays and returns focus.
6. Iterate until it feels premium — never present the first draft. Screenshot & verify before delivering (standing user requirement).

## Budgets (hard gates, plan §14)
LCP < 2.5s mobile · CLS < 0.05 · initial JS < 180KB gz (three/gsap are separate chunks) · DPR ≤ 1.75 · adaptive particle count via `lib/caps.ts` · Lighthouse mobile ≥ 90 perf / ≥ 95 a11y.

## Content placeholders awaiting owner (`TODO(owner)` in src/content/site.ts)
WhatsApp number · hello@ mailbox · Calendly URL (`VITE_CALENDLY_URL`) · n8n webhook (`VITE_N8N_WEBHOOK_URL`) · real testimonials (swap `content/testimonials.ts`).

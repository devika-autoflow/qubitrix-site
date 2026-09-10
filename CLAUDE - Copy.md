# QUBITRIX — qubitrix-site

Cinematic single-page journey + subpages for qubitrixai.com. Vite + React 18 + TS + Tailwind v4 + GSAP/ScrollTrigger + Lenis + three.js (one persistent particle canvas). Deploys to Netlify (user pushes to git). Full design strategy: `~/.claude/plans/qubitrix-website-redesign-floofy-shell.md`.

## Identity — "Obsidian Instrument / Qubitrix OS"
- 90% monochrome: obsidian base (`--color-obsidian-0/1/2`), silver text, metallic gradient display headlines (`.metal-text`).
- Energy accents ONLY volt `#7C6BFF` + plasma `#3EE0F0`; glow is a shadow, never a fill; max one aurora-gradient element per viewport.
- Type: Clash Display (display), Inter (body), JetBrains Mono (HUD labels via `.hud-label`).
- Copy rules: headlines ≤ 8 words, no emoji, no exclamation marks, ALL text lives in `src/content/` — components never hardcode copy.
- Brand says QUBITRIX everywhere. Quantum = metaphor/ambition, never a hardware claim. No fabricated stats or clients.

## Architecture invariants
- ONE WebGL canvas (`scenes/canvas/SceneManager.ts`), driven by `getScene().setProgress(0..7)` from ScrollTriggers in `pages/Home.tsx`. User decision (redesigned): the Q assembles in Hero, dissolves ONCE into an ambient floating particle field, and stays that shape for the rest of the page — `setProgress` past 1.0 only drives a slow per-section color-tint drift (never another shape morph, no orbital/black-hole/starfield/aurora shapes anymore).
- Pins ONLY on Hero, Lab (desktop), Contact-adjacent moments. Everything else = natural scroll + `[data-reveal]` (see `lib/useReveal.ts`). Never add more pins (user decision).
- Motion split (user decision, July 2026): GSAP + ScrollTrigger owns the canvas journey and section pins; framer-motion owns UI micro-interactions, overlays, nav, and scroll-linked reveal/parallax effects. Never animate the same element with both. DOM animates `transform`/`opacity` only.
- Background/scroll animation must stay LIGHT: no scroll-jacking beyond existing pins, no heavy blur/filter animation, no layout-thrashing scroll listeners. If a scroll effect drops frames on mobile emulation, cut it.
- No auth, no login popups, the site never interrupts the visitor.
- Secrets: AI keys live in `netlify/functions/` env only. Anything `VITE_`-prefixed is public.

## Skill routing — load ONLY the skill the task needs, not all at once
Check this table before starting UI work; read the matching skill file on demand:
- **`.claude/skills/frontend-design/SKILL.md`** → use when CREATING new UI or reshaping the look of existing UI: aesthetic direction, typography choices, hero/section composition, making the site feel distinctive and award-winning rather than templated.
- **`.claude/skills/ui-ux-pro-max/SKILL.md`** → use when you need concrete design DATA or a UX quality check: picking color palettes, font pairings, component patterns (navbar, modal, card, form, table, chart), accessibility/UX review, or when UI "doesn't look professional" and you need to diagnose why. Its navigation/component docs are the reference for chrome components like the navbar.
- **framer-motion (npm package)** → use for implementing UI animation: scroll-linked effects, reveals, parallax, overlay/panel transitions, hover micro-interactions. Do NOT use it for the three.js canvas or section pins — that stays GSAP.
- Pure logic/content/backend tasks → no design skill needed.

## Output protocol — every time you present work to the user
1. The localhost preview must be open AT ALL TIMES: on EVERY prompt, make sure `npm run dev` is running (background) and GIVE THE LOCALHOST URL in your final message — the user always previews every change in the browser BEFORE anything is pushed. Never leave a change unpreviewed.
2. Verify the background/scroll animation is smooth and NOT heavy (watch for dropped frames, long tasks, jank at 390px width) before presenting.
3. Quality bar: "award-winning" (Awwwards-level) — polished, pro, AI-futuristic. Never present something that looks default or templated.

## CODE_MAP.md — the project index (mandatory)
- `CODE_MAP.md` (repo root) is the library index of every file: sections routed by request type ("change copy" → §1, "icon" → §4, "booking" → §5, …) with a description of what each file contains.
- If you are lost or don't know which file a request touches, open `CODE_MAP.md` FIRST and route from its table — don't scan files one by one.
- Whenever you ADD, DELETE, RENAME a file or change what a file is responsible for, you MUST update `CODE_MAP.md` in the same task. An out-of-date map is a bug.

## Before any implementation
1. Analyse the request, then use `CODE_MAP.md` to locate the exact file(s); read the relevant plan section; inspect the files you'll touch and their imports.
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

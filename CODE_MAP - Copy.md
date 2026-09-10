# CODE MAP — Qubitrix Website Index

> **Purpose:** This is the library index of the entire project. Lost? Don't know which file to open?
> Come here FIRST. Find the section matching the request, and it tells you the exact file(s).
> **MAINTENANCE RULE (non-negotiable): whenever a file is added, deleted, renamed, or its purpose
> changes, update this map in the same task.**

---

## HOW TO USE THIS MAP (request → section routing)

Analyse the user's request, then jump to the matching section like a library aisle:

| If the request is about… | Go to section |
|---|---|
| Changing any TEXT / copy / headline / prices / FAQ answers | §1 CONTENT (text lives here, never in components) |
| A page (home, book, work, blog, legal, 404, auth) | §2 PAGES & ROUTES |
| Homepage scroll sections (hero, services grid, process, FAQ…) | §3 HOME SECTIONS |
| Nav bar, dock, footer, logo, buttons, cards, form fields, icons | §4 CHROME & UI COMPONENTS |
| Booking form, request builder, chatbot console, login/auth | §5 FEATURES |
| Particle background, 3D canvas, scroll animations | §6 CANVAS & ANIMATION |
| Smooth scroll, GSAP setup, Supabase, device checks, chat IDs | §7 LIB (shared utilities) |
| Colors, fonts, CSS utility classes | §8 STYLES |
| AI chat backend, API keys, deploy config | §9 BACKEND & CONFIG |
| Images, fonts, logos, screenshots | §10 ASSETS |
| Reference material outside the app | §11 OUTSIDE THE APP |

All paths below are relative to `qubitrix-site/` unless noted.

---

## §1 CONTENT — all site text (edit copy HERE, never in components)

Every visible word lives in `src/content/`. A copy change is a content change.

| File | What's inside |
|---|---|
| `src/content/site.ts` | Global facts: brand name, domain, tagline, hero headline/kicker/subline, nav links, section list, contact details (WhatsApp, email, Calendly, socials). `TODO(owner)` placeholders live here. |
| `src/content/services.ts` | The services/capabilities: each service's slug, title, value line, tag chips, and full dossier (what/deliverables/stack/timeline) shown on `/services/:slug`. |
| `src/content/impact.ts` | Financial Impact comparison table rows (human cost vs AI cost vs savings), banner, footnote. Illustrative figures only — no fabricated client claims. |
| `src/content/edge.ts` | "Quantum Edge" section copy — intro, blocks, CTA. Quantum = metaphor, never hardware claim. |
| `src/content/process.ts` | The process steps (index, title, timeframe chip, description). |
| `src/content/work.ts` | Portfolio case studies: slug, title, outcome, kind, stack, body, images (images live in `public/work/`). |
| `src/content/testimonials.ts` | Testimonial quotes (placeholders — swap when real ones land). |
| `src/content/faq.ts` | FAQ questions & answers. |
| `src/content/blog.ts` | Quantum Core journal posts (slug, title, tag, minutes, excerpt, body paragraphs). |
| `src/content/lab.ts` | The Lab orbital-map threads: tech domains with status (ACTIVE/EXPLORING/INCUBATING) and relations. |
| `src/content/legal.ts` | Privacy policy / terms documents rendered at `/legal/:doc`. |
| `src/content/about.ts` | About page copy — brand story, what we do, philosophy, mission, research, vision, promise — plus the `team` array (name, role, bio, photo path or `null` if awaiting a headshot). |

---

## §2 PAGES & ROUTES — one file per URL

Router: `src/App.tsx` (all routes declared here + global DockNav + ConsoleLauncher + scroll-to-top).
Entry point: `src/main.tsx` (mounts App, imports fonts + CSS).

| Route | File | What's inside |
|---|---|---|
| `/` | `src/pages/Home.tsx` | The cinematic single-page journey. Assembles canvas + all §3 sections; owns the ScrollTriggers that drive the canvas's section index (`setProgress`, 0=hero..7=contact) — dissolve + color tint only, no shape morphs. |
| `/about` | `src/pages/About.tsx` | Brand story page — story, what we do, philosophy, mission, research, team grid (photos from `public/team/`), vision, promise, CTA. Content in `content/about.ts`. |
| `/services/:slug` | `src/pages/ServicePage.tsx` | Full service detail dossier page. |
| `/work` | `src/pages/WorkIndex.tsx` | Portfolio grid (GlowCards). |
| `/work/:slug` | `src/pages/WorkDetail.tsx` | Single case study detail. |
| `/book` | `src/pages/Book.tsx` | Booking page — hosts BookingForm + RequestBuilder toggle. |
| `/quantum` (and `/blog` redirect) | `src/pages/Quantum.tsx` | Quantum Core hub: CSS atom animation + blog post list. |
| `/blog/:slug` | `src/pages/BlogPost.tsx` | Single journal article. |
| `/auth` | `src/pages/Auth.tsx` | Sign in / sign up (Supabase + Google OAuth). |
| `/auth/reset` | `src/pages/ResetPassword.tsx` | Request password-reset email. |
| `/auth/update-password` | `src/pages/UpdatePassword.tsx` | Landing for the recovery email link; sets new password. |
| `/legal/:doc` | `src/pages/Legal.tsx` | Renders a doc from `content/legal.ts`. |
| `*` | `src/pages/NotFound.tsx` | 404 page. |

---

## §3 HOME SECTIONS — the scroll journey (in order), `src/scenes/sections/`

| Scene | File | What's inside |
|---|---|---|
| 01 Hero | `Hero.tsx` | Pinned hero — headline left, Q particle formation right, CTAs. |
| 02 Capabilities | `Capabilities.tsx` | "What We Provide" services grid; cards open `/services/:slug`. |
| 03 Impact | `Impact.tsx` | Financial impact table with count-up numbers (useInView). |
| 04 Edge | `Edge.tsx` | Compact quantum-edge credibility block, two cards + research link. |
| 05 Process | `Process.tsx` | Process steps with circuit line that draws on scroll. |
| 06 Proof | `Proof.tsx` | Case studies + testimonials. |
| 07 Contact | `Contact.tsx` | Aurora finale — BookingForm + social channels. |
| FAQ | `Faq.tsx` | Accordion (framer-motion). |

(Ordering/assembly and the Lab/OrbitalMap placement is controlled in `src/pages/Home.tsx`.)

---

## §4 CHROME & UI COMPONENTS

### Chrome (persistent site furniture) — `src/components/chrome/`
| File | What's inside |
|---|---|
| `Nav.tsx` | Fixed top bar; hides on scroll-down; hamburger on phones; greets signed-in user. |
| `DockNav.tsx` | Bottom macOS-style dock with section links. **Nav ICONS (SVGs) are defined here.** |
| `Dock.tsx` | The generic magnifying-dock mechanic (framer-motion springs) used by DockNav. |
| `Footer.tsx` | Site footer: logo, links, socials. |
| `LogoIntro.tsx` | 0.4s logo glint intro on first load (no boot theater). |
| `ProgressRail.tsx` | Left HUD rail, mono indices 01–07, desktop only. |
| `QuantumButton.tsx` | Mini quantum-processor button in nav → opens `/quantum`. Static icon (no orbiting animation — removed per owner request). |
| `AboutButton.tsx` | "ABOUT" nav button next to QuantumButton → opens `/about`. Static icon, no motion. |
| `ScrollAura.tsx` | Fixed ambient glow that deepens with scroll (framer-motion). |
| `CosmicLayer.tsx` | Pure-CSS star sheets, nebula, meteors, grid horizon backdrop. |

### UI primitives (reusable building blocks) — `src/components/ui/`
| File | What's inside |
|---|---|
| `Button.tsx` | Button/link with variants: primary (aurora border), ghost, chip. |
| `Field.tsx` | Form inputs: TextField, TextArea, SelectField (shared obsidian style). |
| `GlowCard.tsx` | Pointer-tracked spotlight card (used by services, work, blog). |
| `SectionHeading.tsx` | Kicker + metal display heading + sub — the "OS voice" for every section. |
| `QubitrixLogo.tsx` | Renders the real brand lockup image (`public/brand/logo-wide.png` with wordmark, `q-mark.png` icon-only) — not a redrawn approximation. |
| `SocialIcons.tsx` | Email/LinkedIn/Instagram **icon SVGs** + links (URLs from `content/site.ts`). |
| `OrbitalMap.tsx` | The Lab's orbital node map (rings + status-colored nodes from `content/lab.ts`). |

> **"Add/change an icon?"** → DockNav icons: `DockNav.tsx` · social icons: `SocialIcons.tsx` ·
> favicon: `public/favicon.svg` · logo: `QubitrixLogo.tsx` / `public/brand/`.

---

## §5 FEATURES — interactive flows, `src/features/`

| File | What's inside |
|---|---|
| `booking/BookingForm.tsx` | **The contact/enquiry form** (name/email/phone optional/message → n8n webhook `VITE_N8N_WEBHOOK_URL`, mailto fallback, status states). Used on `/book` and in home Contact section. Calendly (`site.calendlyUrl`) is the dedicated call-scheduling path; this form is the catch-all "reach us" channel — the n8n workflow owns emailing info@ / storing the lead. |
| `request-builder/RequestBuilder.tsx` | 3-step guided "build my automation request" wizard on `/book`. |
| `console/ConsoleLauncher.tsx` | Floating brand-dot chat launcher (lazy-loads the panel). |
| `console/ConsolePanel.tsx` | The AI chat window UI — talks to `netlify/functions/chat.mts`; scripted demo fallback. |
| `auth/AuthShell.tsx` | Shared centered panel chrome for all auth pages + AuthNotice. |

---

## §6 CANVAS & ANIMATION — `src/scenes/canvas/`

ONE persistent WebGL canvas for the whole site (architecture invariant).

| File | What's inside |
|---|---|
| `SceneManager.ts` | The three.js engine: particle system, render loop, `setProgress(0..7)`. The Q assembles in Hero, dissolves ONCE into an ambient floating field (no further shape morphs, user decision), and `setProgress` past 1.0 only drives a slow per-section color-tint drift. |
| `SceneCanvas.tsx` | React wrapper; capability gating (reduced motion → static poster, WebGL check, particle budget); exports `getScene()`. |
| `formations.ts` | Precomputed particle shapes: `qFormation` (Hero) and `floatFormation` (the ambient dust field everything after Hero dissolves into and stays as). |

Rules: GSAP/ScrollTrigger owns canvas journey + pins; framer-motion owns UI micro-interactions. Never both on one element. ScrollTriggers driving formations live in `pages/Home.tsx`.

---

## §7 LIB — shared utilities, `src/lib/`

| File | What's inside |
|---|---|
| `gsap.ts` | GSAP + ScrollTrigger registration and defaults. Import gsap from here, never directly. |
| `lenis.ts` | Smooth-scroll (Lenis) init, `getLenis()`, `scrollToTarget()`. Disabled under reduced motion. |
| `caps.ts` | Device capability checks: `prefersReducedMotion`, `isCoarsePointer`, `supportsWebGL`, `particleBudget`, `dprClamp`. |
| `useReveal.ts` | `[data-reveal]` scroll-in reveal hook for natural-scroll sections. |
| `supabase.ts` | Supabase client factory (`getSupabase()` — null when env missing). |
| `useSession.ts` | Live Supabase session hook + `displayName()`. |
| `chatSession.ts` | Chat identity: persistent userId, per-tab sessionId, per-conversation chatId. |

---

## §8 STYLES

| File | What's inside |
|---|---|
| `src/styles/index.css` | Tailwind v4 setup + ALL design tokens: obsidian/silver/volt/plasma colors, `.metal-text`, `.hud-label`, `.hairline`, aurora borders, keyframe animations, font-face for Clash Display. |
| `index.html` | HTML shell: meta/OG tags, title, favicon link, root div. |

Identity rules: 90% monochrome, accents ONLY volt `#7C6BFF` + plasma `#3EE0F0`, glow is a shadow never a fill.

---

## §9 BACKEND & CONFIG

| File | What's inside |
|---|---|
| `netlify/functions/chat.mts` | **AI chat backend** — serverless proxy with system prompt (Qubitrix Assistant persona). API keys live here server-side only (ANTHROPIC_API_KEY → Claude, else GEMINI_API_KEY, else 503/demo mode). |
| `netlify.toml` | Netlify build/deploy config, redirects, headers. |
| `.env` / `.env.example` | Env vars. `VITE_`-prefixed = public (Supabase URL/anon key, Calendly, n8n webhook). Secrets never `VITE_`. |
| `package.json` | Scripts: `dev`, `build` (tsc + vite), `preview`, `screenshot`. Dependencies. |
| `vite.config.ts` | Vite + React plugin, chunk splitting (three/gsap separate). |
| `tsconfig.json` | TypeScript config. |
| `postcss.config.js` | Tailwind v4 PostCSS hookup. |
| `scripts/screenshot.mjs` | Playwright verification screenshots — every route at 390/768/1440 + journey scroll positions; fails on console errors. Output → `screenshots/`. |
| `supabase/email-templates/` | Custom Supabase auth email HTML (confirm-signup) + README with setup steps. |

---

## §10 ASSETS

| Location | What's inside |
|---|---|
| `public/brand/` | Owner-supplied master files: `logo-square.jpeg`, `logo-wide.jpeg`. Derived transparent-background PNGs actually used on-site: `logo-wide.png` (full lockup, used by `QubitrixLogo.tsx`), `logo-square.png`, `q-mark.png` (icon-only, used by `QubitrixLogo.tsx` + `LogoIntro.tsx`). If the master JPEGs are ever replaced, regenerate the PNGs (alpha = pixel brightness, since the masters are shot on pure black). |
| `public/favicon.svg` | Browser tab icon. |
| `public/fonts/` | Clash Display woff2 (500/600). |
| `public/work/` | Case-study flow images referenced by `content/work.ts`. |
| `public/team/` | Team headshots referenced by `content/about.ts` (`team[].photo`). Members without a photo yet render initials instead — drop the file here and set the path when a photo arrives. |
| `screenshots/` | Generated verification screenshots (output only — never edit by hand). |

---

## §11 OUTSIDE THE APP (parent folder `QUBITRIX WEBSITE/`)

Reference material only — the deployed site lives entirely in `qubitrix-site/`.

| Location | What's inside |
|---|---|
| `website guide/` | The owner's source copy docs (`qubitrix section 1 to 8.md`, combined guide) — where site copy originally came from. |
| `portfolio/` | Raw case-study notes + screenshots that fed `content/work.ts` and `public/work/`. |
| `components  qubitrix/`, `images/` | Loose reference screenshots. |
| `qubitrix dump.txt` | Old site dump (legacy reference). |
| `LOGO.jpeg`, `logoo.jpeg` | Original logo files (processed versions live in `public/brand/`). |

---

## QUICK ANSWERS — common requests

- **"Change the WhatsApp number / email / Calendly link"** → `src/content/site.ts`
- **"Add a new service"** → `src/content/services.ts` (grid + detail page adapt automatically)
- **"Add a case study"** → `src/content/work.ts` + image in `public/work/`
- **"Add a blog post"** → `src/content/blog.ts`
- **"Change the hero headline"** → `src/content/site.ts`
- **"Add an icon to the dock"** → `src/components/chrome/DockNav.tsx` (+ nav entry in `content/site.ts`)
- **"Booking form field / webhook"** → `src/features/booking/BookingForm.tsx`
- **"Chatbot answers wrong / change its personality"** → system prompt in `netlify/functions/chat.mts`; chat UI in `src/features/console/ConsolePanel.tsx`
- **"Background particles / 3D animation"** → `src/scenes/canvas/` (+ triggers in `pages/Home.tsx`)
- **"Change a color / font"** → `src/styles/index.css`
- **"Add a new page"** → create in `src/pages/`, register route in `src/App.tsx`, then UPDATE THIS MAP

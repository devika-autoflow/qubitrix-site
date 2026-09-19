# LEARNINGS — qubitrix-site

Error/fix log for this repo. Read before re-diagnosing something that smells familiar.

---

## OneDrive "- Copy" files were NEWER than the originals, and /demo was dead in production (2026-09-19)
**Symptom:** 105 `" - Copy"` files were tracked in git. The global rule says these are byte-identical OneDrive junk — but `src/App - Copy.tsx`, `src/content/site - Copy.ts`, `.env - Copy.example` and `_- Copy.env` differed from their originals. The Copy versions were the *newer* ones (Aug 25–28 vs Jul 11–18) and contained the `/demo` and `/unsubscribe` routes. `src/pages/Demo.tsx` and `Unsubscribe.tsx` existed with no Copy sibling.
**Cause:** OneDrive resolved a sync conflict by writing the newer content to the `- Copy` name and leaving a stale file at the real path. Vite builds from `src/App.tsx`, so the deployed site had no `/demo` or `/unsubscribe` route at all despite both pages being written and committed.
**Fix:** Diffed all 105 before touching any (`cmp -s` against the de-Copy'd name). 101 were identical junk; the 4 that differed were promoted Copy → original. Then `git rm --cached` on all 105 and added `* - Copy.*` / `*- Copy.*` / `_- Copy.env` to `.gitignore`.
**Avoid next time:** **Never bulk-delete `- Copy` files in this repo without diffing first.** The global "identical junk" assumption does not hold here. Run the `cmp` sweep, and if any differ, check timestamps — the Copy may be the live version. After any such cleanup, confirm the routes in `src/App.tsx` match the files in `src/pages/`.

---

## A copy of the real .env was committed to GitHub (2026-09-19)
**Symptom:** `git ls-files | grep env` listed `_- Copy.env`, containing the live Supabase URL + anon key, all three n8n webhook URLs and the Calendly link.
**Cause:** `.gitignore` covered `.env` and `.env.*`, but OneDrive's duplicate was named `_- Copy.env`, which matches neither pattern.
**Fix:** `git rm --cached "_- Copy.env"` plus explicit `.gitignore` entries for the Copy naming.
**Avoid next time:** The anon key is public by design, but the n8n webhook URLs should be rotated. Any `.gitignore` rule for secrets here must also cover the OneDrive mangling — check `git ls-files | grep -i env` returns nothing but `.env.example` before every push.

---

## three.js was loading on every route and blocking first paint (2026-09-19)
**Symptom:** A single 704 kB eager bundle plus a 462 kB three chunk downloaded on `/book`, `/legal/*` — pages with no canvas at all.
**Cause:** `App.tsx` imported every page statically, and `Home.tsx` imported `SceneCanvas`, which imported `SceneManager` (→ three) at module scope. `getScene` being exported from `SceneCanvas` meant anything reaching for the scene pulled three in too.
**Fix:** React.lazy for every route but Home; `SceneManager` behind a dynamic `import()` on a `requestIdleCallback`; `getScene`/`setScene` moved to `sceneRegistry.ts` with a **type-only** three import. First-paint payload went 330 kB → ~157 kB gzip, FCP 584 ms, and three now loads at ~359 ms *after* paint.
**Avoid next time:** After any change under `src/scenes/`, run `npm run build` and confirm `three-*.js` is NOT in the `modulepreload` links of `dist/index.html`. If it is, something re-imported three at module scope.

---

## Verifying the CSP without deploying (2026-09-19)
**Symptom:** Netlify headers in `netlify.toml` are not applied by `vite preview`, so a strict CSP could break production with nothing failing locally.
**Fix:** Run `vite preview`, then drive it with Playwright (`chromium.launch({channel:'msedge'})` — no bundled browser is installed on this machine) and `context.route()` to inject the `content-security-policy` header on document responses only. Walk every route and collect `console`/`pageerror`. All routes passed with zero violations.
**Avoid next time:** Do this before shipping any CSP change. Note `style-src` needs `'unsafe-inline'` — framer-motion and GSAP write inline style attributes and a nonce cannot cover them. `script-src` must never gain `'unsafe-inline'`; `cdn.jsdelivr.net` is the one third-party origin allowed, and only for the `/demo` chat widget (below).

---

## /demo rendered an empty fallback: the env var only existed in the OneDrive copy (2026-09-19)
**Symptom:** After restoring the `/demo` route, the page loaded but the chat widget never mounted and no jsDelivr request was made at all.
**Cause:** `src/pages/Demo.tsx` starts with `if (!site.demoChatWebhookUrl) return;`. `VITE_DEMO_CHAT_WEBHOOK_URL` was present in `_- Copy.env` but missing from the real `.env` and from `.env.example` — the same OneDrive split that stranded the route itself. Vite inlines env vars at build time, so it failed silently with no error.
**Fix:** Added the var to `.env` and documented it in `.env.example`. Confirmed with `grep -c "ee4d6cf0" dist/assets/index-*.js` that it reached the bundle, then verified the widget mounts.
**Avoid next time:** `/demo` and `/unsubscribe` are **outreach infrastructure** — cold emails link to them, so breakage is invisible until a lead hits a dead page. After any deploy, load both: `/demo` must show the chat input, and `/unsubscribe?email=test@example.com` must echo the address. `VITE_DEMO_CHAT_WEBHOOK_URL` must be set in the **Netlify** environment too, not just locally — a missing var there fails exactly this silently.

---

## The /demo chat widget needs a CDN exception in the CSP (2026-09-19)
**Symptom:** A strict `script-src 'self'` CSP silently kills `/demo`.
**Cause:** `Demo.tsx` deliberately loads `@n8n/chat` from `cdn.jsdelivr.net` rather than npm (the file header explains: installing it pulled a native dependency, isolated-vm, that broke the build). The widget pulls a script, a stylesheet and several lazy `.mjs` chunks, and talks to the n8n host over both HTTPS and WebSocket.
**Fix:** `cdn.jsdelivr.net` added to `script-src`, `style-src`, `img-src`, `font-src` and `connect-src`, and `wss://n8n.devikarajnr.fyi` added to `connect-src`. Verified: 5 jsDelivr resources load, widget mounts, zero violations.
**Avoid next time:** If `@n8n/chat` is ever bundled locally, drop jsDelivr from `script-src`/`style-src` — it is the only third-party code origin on the site.

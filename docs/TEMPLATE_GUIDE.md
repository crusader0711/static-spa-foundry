# Static SPA Template — Build Playbook

A reusable pattern for zero-backend, hash-routed, client-side reference apps
hosted free on GitHub Pages. Derived from the SALTDOG pattern
(`https://thepollywog.github.io/saltdog/#/`).

---

## 1. Problem frame

**System boundary:** browser only. **Objective:** ship a maintainable
information/tool app with zero infrastructure, zero cost, zero data custody.

## 2. When this pattern fits (and when it doesn't)

Use the pattern when ALL of these hold:

| Criterion | Test |
|---|---|
| Content is reference-shaped | Links, knowledge cards, checklists, small calculators |
| No shared state | Nothing needs to sync between users or devices |
| No secrets | All content is fine being world-readable in a public repo |
| Data sensitivity is low OR personal-only | User data can live in localStorage and be lost if the browser is cleared |
| Update cadence is human-speed | You edit a file and push; no live feeds required |
| Audience is small/known | No SEO-critical marketing needs, no per-page URLs for sharing deep content |

**Decision matrix vs. alternatives:**

| Need | Right tool |
|---|---|
| Reference app, tools, checklists (this pattern) | **This template** — vanilla JS hash SPA |
| Many long-form content pages, SEO matters | Jekyll (native to GH Pages) or Astro |
| Complex interactive state, many components | Vite + React/Vue, GH Actions deploy |
| Multi-user data, auth, live data | Not static — needs a backend (Amplify, Lambda + API GW, etc.) |
| Client deliverable with custom domain + forms | Static host + serverless form endpoint, or full app |

**Failure modes of forcing this pattern past its envelope:** localStorage as a
"database" (single-device, evictable, ~5 MB), secrets in a public repo,
hand-rolled auth (there is none — Pages is public), content so large that
data.js becomes unmanageable (>~1,500 lines → switch to fetched JSON files or
Jekyll).

## 3. Architecture

```
Browser
 ├─ index.html      static shell: masthead, nav mount, #app mount
 ├─ css/style.css   TOKENS block (theme) + structural CSS (don't touch)
 ├─ js/data.js      SITE config + PAGES array  ← 95% of edits happen here
 ├─ js/custom.js    window.CUSTOM registry     ← bespoke interactive pages
 └─ js/app.js       engine: hash router + 4 page-type renderers (don't touch)

State: localStorage, namespaced by SITE.lsPrefix
Routing: location.hash ("#/route") → PAGES lookup → renderer
```

**Why hash routing:** GitHub Pages serves static files only. History-API
routing (`/route`) 404s on refresh without server rewrites; hash routing
(`#/route`) never leaves `index.html`. It is the correct choice for this host,
not a compromise.

**Control-loop view:** `hashchange` event → route() → pure render from data →
DOM. One direction, no state reconciliation, no framework needed. The PAGES
array is the single source of truth; renderers are stateless functions of it.

## 4. Page-type schema (built-in renderers)

| type | Purpose | Key fields |
|---|---|---|
| `linkGrid` | Grouped outbound link cards + live filter | `groups[].links[] {name,url,desc,tag}` |
| `cards` | Static knowledge/info cards | `cards[] {title,tag,body}` |
| `checklist` | Date tracker, green/amber/red, localStorage | `items[] {id,label,warnDays}` |
| `custom` | Anything else | `render: "fnName"` in js/custom.js |

Tags are semantic: `ROUTINE` (neutral) / `PRIORITY` (accent) / `FLASH` (red).
Repurpose freely (e.g., `STABLE/BETA/DEPRECATED` for a dev-tools page) — add
matching `.tag.NAME` rules in CSS if you need new colors.

## 5. Instantiation checklist (new project, ~30 min)

1. Copy template folder → new repo name.
2. `js/data.js`: set `SITE` (name, tagline, strip text, **unique `lsPrefix`**,
   footer). Define `PAGES` — nav and routes generate themselves from it.
3. `css/style.css`: edit the TOKENS block only — 8 colors × 2 themes + 3 font
   stacks. Keep accent ≥ 4.5:1 contrast on surface.
4. Fonts: default is system stacks (zero external requests — appropriate for
   restricted-network audiences). To add webfonts, insert one Google Fonts
   `<link>` in index.html and update the token stacks.
5. `index.html`: update `<meta name="description">`.
6. Custom pages: write render functions in `js/custom.js` on `window.CUSTOM`;
   each gets `(el, ctx)` with `esc / lsGet / lsSet / daysUntil` helpers.
   **Always pipe user-visible strings through `ctx.esc()`** — it's the XSS
   boundary for this codebase.
7. Deploy (§7). Run verification (§8).

## 6. Extension patterns (in order of increasing complexity)

- **More content** → grow PAGES. No engine changes.
- **New reusable page type** → add a renderer function + one entry in
  `RENDERERS` in app.js (e.g., a `table` type, an `faq` accordion type).
- **Long-form pages** → add a `markdown` type: fetch `.md` files from a
  `/content` folder, render with marked.js from a CDN (~1 extra script tag).
- **Live external data** → `fetch()` a public JSON API client-side. Constraint:
  API must allow CORS and require no secret key. Anything needing a key is
  out of envelope — key would be world-readable.
- **Cross-device state** → export/import: add a button that serializes the
  localStorage namespace to a JSON file download and re-imports it. Keeps the
  zero-backend property while surviving browser clears.
- **Private content** → GitHub Pages on a private repo requires a paid plan
  and the *site* is still public unless you use Enterprise access control.
  For truly restricted content, host on an internal server or S3 + CloudFront
  with an auth layer instead — the same four files deploy anywhere static.

## 7. Deployment

```bash
gh repo create <project> --public --clone
cd <project>
# copy template files in
git add -A && git commit -m "Initial static SPA" && git push -u origin main
# GitHub → repo → Settings → Pages → Deploy from a branch → main / (root)
```

Live at `https://<user>.github.io/<project>/#/` in ~1 min. Every push
redeploys. Custom domain: Settings → Pages → Custom domain + DNS CNAME to
`<user>.github.io`; TLS is automatic.

Local dev: `python3 -m http.server` in the folder → `http://localhost:8000`.
(Opening index.html via `file://` works for everything except `fetch()`.)

## 8. Verification checklist

- [ ] Every route renders; browser back/forward traverse pages correctly
- [ ] Unknown hash (`#/garbage`) falls back to the first page
- [ ] Filter narrows link cards and hides emptied groups
- [ ] Checklist dates survive a hard refresh; two template-derived sites on
      the same domain don't collide (distinct `lsPrefix`)
- [ ] Dark mode: flip OS theme; check contrast on tags and statuses
- [ ] 380 px viewport: no horizontal scroll; tabs scroll horizontally
- [ ] Keyboard: tab through nav/cards/inputs; focus rings visible
- [ ] No console errors; no unexpected network requests (open DevTools →
      Network — should be your files + fonts only)

## 9. Maintenance model

Content edits are data edits (data.js), doable from the GitHub web editor on
a phone. Engine (app.js) and structure (CSS below tokens) change rarely and
propagate to new projects by re-copying the template. Treat the template
folder itself as the upstream: when you improve the engine in one project,
back-port to the template so the next instantiation inherits it.

---

## 10. Tailwind hybrid (v1.TW)

As of v1.TW the template ships with the **Tailwind Play CDN** wired into
`index.html`, with the token palette mapped into `tailwind.config` so
utilities resolve to the same CSS variables as the engine theme.

**The hybrid rule:**

| Surface | Styling method | Why |
|---|---|---|
| Engine-rendered pages (`linkGrid`, `cards`, `checklist`) | Semantic classes in `css/style.css` | Keeps `app.js` project-agnostic and back-portable |
| Everything you write (`js/custom.js`, new page types, bespoke HTML) | **Tailwind utilities only** | No new CSS classes; markup is self-describing |
| Theme | TOKENS block, unchanged | One edit re-skins BOTH engine CSS and Tailwind markup, because utilities map to the same variables |

**Token-mapped utilities available:** `bg-bg`, `bg-surface`, `text-ink`,
`text-ink2`, `border-line`, `text-accent`/`bg-accent`, `text-flash`,
`text-ok`, `text-warn`, `font-mono`, `font-display`.

**Integrating your own Tailwind template:** drop its color/font values into
the TOKENS block (CSS variables) rather than into `tailwind.config` directly —
that keeps the engine CSS and utility markup in lockstep. Component markup
from your Tailwind template pastes straight into custom views; swap its
hardcoded palette classes for the token utilities above.

**Trade-offs accepted:** Play CDN is ~110 KB of runtime JS and Tailwind labels
it non-production — acceptable for this template's envelope (small personal
reference apps). Escalation path if a project outgrows it: standalone
Tailwind CLI + GitHub Action producing purged CSS (~10 KB), at the cost of
the zero-build and edit-from-phone properties.

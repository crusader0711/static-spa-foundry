# Architecture

static-spa-foundry is a monorepo of one **engine** (the template), one **standard**, one **verifier** and several **instances** (examples).

```
templates/static-spa/  ──copy──►  your project  (edit js/data.js, TOKENS in css/style.css, js/custom.js)
        ▲                                │
        │ fixes ported back by PR        ▼
   docs/DEVELOPMENT_STANDARD.md     src/smoke.js  (headless jsdom gate: title, nav, every route renders, images exist)
```

- **Engine:** vanilla JS, hash router, data-driven page types (`cards`, `linkGrid`, `table`, `custom`…), dark-first token-based CSS; optional Tailwind Play CDN hybrid (`docs/TEMPLATE_GUIDE.md` §10).
- **State:** `localStorage` under a per-project `lsPrefix`; no server, no secrets.
- **Verification:** `src/smoke.js` loads `index.html` in jsdom, executes the project scripts, visits every declared route and asserts substantive DOM.
- **Delivery:** static files on GitHub Pages; the owner enables Pages after the human OPSEC review.
- **Integrity:** deterministic release tarballs, `RELEASE_MANIFEST.json`, `SHA256SUMS` (see `docs/runbooks/00-release.md`).

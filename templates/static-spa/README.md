# static-spa

Reusable template for zero-backend, hash-routed, client-side reference apps
hosted free on GitHub Pages. No framework, no build step, no server, no data
custody — user state lives in browser localStorage only.

**Live demo of the pattern this derives from:** `https://thepollywog.github.io/saltdog/#/`
**Worked example:** [`examples/technical-cv`](../examples/technical-cv)

## Quick start (new project)

```bash
# 1. Use this repo as a template (GitHub UI: "Use this template" → new repo)
#    or clone and re-point:
git clone https://github.com/your-username/static-spa-foundry && cp -r static-spa-foundry/template my-project
cd my-project && rm -rf .git && git init

# 2. Edit exactly three files:
#    js/data.js        SITE config + PAGES content   (95% of edits)
#    css/style.css     TOKENS block only             (theme)
#    js/custom.js      bespoke interactive pages     (optional)

# 3. Push + enable Pages (Settings → Pages → main / root)
```

Full fit criteria, architecture, page-type schema, extension patterns, and
verification checklist: **[../docs/TEMPLATE_GUIDE.md](../docs/TEMPLATE_GUIDE.md)**.
Program rules and workflow: **[../docs/DEVELOPMENT_STANDARD.md](../docs/DEVELOPMENT_STANDARD.md)**.

## File roles

| File | Role | Edit per project? |
|---|---|---|
| `js/data.js` | SITE config + PAGES array (content, nav, routes) | Always |
| `css/style.css` | TOKENS block = theme; below it = structure | Tokens only |
| `js/custom.js` | `window.CUSTOM` registry for bespoke pages | If needed |
| `js/app.js` | Engine: router + built-in renderers | Never (back-port improvements here) |
| `index.html` | Shell + meta description + optional font link | Meta only |

## Built-in page types

`linkGrid` (grouped link cards + filter) · `cards` (knowledge cards) ·
`checklist` (localStorage date tracker, green/amber/red) · `custom` (yours).

## Maintenance model

This repo is upstream. When an instantiated project improves the engine
(`js/app.js`) or structural CSS, back-port the change here so every future
project inherits it.

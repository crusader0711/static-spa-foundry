# STATIC-SPA DEVELOPMENT STANDARD
// the rule set for building static SPAs from this repository

This is the normative document for any agent or human building a static SPA
under this program. The template is the mold; this standard is how castings
get made. It binds every contributor, human or automated: automation drafts
and files, **the owner merges and deploys — every time**.

---

## 1. Authority and roles

| Actor | May do | May never do |
|---|---|---|
| Owner (repository maintainer) | Everything — sole merge, deploy, and Pages authority | — |
| Project manager / reviewer (scope-limited) | Spec/steering authorship, review with file+line evidence, decision memos | Execute, merge, place files, hold credentials |
| Any contributor bot or AI agent | Draft `data.js` content, propose theme tokens, write custom views on a branch, run the verifier, file findings | Merge, deploy, edit the engine (§4), publish a site, add credentials or secrets to any file |

Work enters as a tasking (statement of work or owner request) that names: the project, the
subject, the page list, the theme direction, and the deployment posture
(public / private / Pages-off). No tasking, no build.

## 2. The pattern, in one paragraph

Zero-backend, hash-routed (`#/route`) single-page apps served as plain static
files from GitHub Pages. No build step, no framework, no server, no data
custody: user state lives only in namespaced browser `localStorage`. An
engine (`js/app.js`) generates nav and routing from a declarative `PAGES`
array; all content lives in `js/data.js`; bespoke pages register on
`window.CUSTOM` in `js/custom.js`; the theme is a CSS token block consumed by
both the engine's semantic classes and Tailwind utilities (Play CDN, token-
mapped). Full architecture, fit criteria, and the decision matrix for when
NOT to use this pattern: [`TEMPLATE_GUIDE.md`](TEMPLATE_GUIDE.md).

## 3. Instantiation workflow (every new project)

1. **Fit check** — confirm the project passes TEMPLATE_GUIDE §2 fit criteria
   (reference-shaped content, no shared state, no secrets, human-speed
   updates). If it fails, stop and file a decision memo naming the right
   stack instead.
2. **Copy `templates/static-spa/`** into a new working folder (or repo). Never build
   inside `templates/static-spa/` itself.
3. **Edit exactly three surfaces:**
   - `js/data.js` — `SITE` config (unique `lsPrefix` — mandatory; all
     `*.github.io` pages for one account share an origin) + `PAGES` content
   - `css/style.css` — the TOKENS block only
   - `js/custom.js` — bespoke views, **Tailwind utilities only** (v1.TW
     convention, TEMPLATE_GUIDE §10); every user-visible string goes through
     `ctx.esc()`
4. **Study the nearest example** in `examples/` (gallery in the README) and
   reuse its patterns rather than inventing new ones.
5. **Verify:** `node src/smoke.js <project-dir>` must print
   `ALL CHECKS PASS`. A project with failing checks is PARTIAL and must not
   be presented as done.
6. **README:** instantiate from [`../templates/PROJECT_README_TEMPLATE.md`](../templates/PROJECT_README_TEMPLATE.md)
   — fill every placeholder, delete instructional comments,
   dashboard metrics measured-only.
7. **OPSEC review (release gate, human):** public repo = public site. No
   credentials, internal hostnames/IPs, real telemetry, personal or household details,
   or employer/client/government material — when in doubt, the deployment
   posture is private. The owner makes this call per project; see
   `examples/signal-spa/ACCESS_REQUIREMENTS.md` for the worked example of
   gating live data.
8. **Deliver as a branch/package for the owner.** The owner creates the
   repo, merges, and flips on Pages (BUILD_TUTORIAL has the click-path).

## 4. Hard rules (the containment lines)

- **The engine is never edited per project.** `js/app.js` and the structural
  CSS below the tokens are upstream property. A project that needs an engine
  change files the change against `templates/static-spa/` here — and every example then
  inherits it (§5).
- **No secrets in any file, ever.** A key shipped to a browser is a
  disclosed key. Live data comes only via the architectures in
  `examples/signal-spa/ACCESS_REQUIREMENTS.md` (push-to-static collectors,
  read-only relay, or private hosting) — each one an owner decision.
- **No invented data presented as live.** Mock data is labeled MOCK on the
  page itself, with a source line naming the pending feed. A page that looks
  live and isn't is a defect.
- **External dependencies:** Tailwind Play CDN and Google Fonts only.
  Anything else requires an owner decision memo first.
- **One subject per repo.** Multi-project content goes in multiple
  instantiations, not one sprawling site.

## 5. The back-port loop (how the mold improves)

Template and instances are independent copies — nothing propagates
automatically. The discipline:

- Fix discovered in an instance → port it to `templates/static-spa/` in this repo in the
  same change set, with the examples updated if structural.
- Improvement made to `templates/static-spa/` → owner decides which live instances carry
  it; new projects inherit it automatically.
- Every change to `templates/static-spa/` or `src/` runs the full CI matrix (all
  examples) before merge — the workflow in `.github/workflows/validate.yml`
  does this on every push and PR.

## 6. Definition of done

A static-SPA tasking is DONE when, and only when:

1. `node src/smoke.js <dir>` → ALL CHECKS PASS
2. Renders correctly at 380 px width and at desktop, dark theme verified
   (and light, if the project's tokens define one)
3. README instantiated from `PROJECT_README_TEMPLATE.md` with measured dashboard values
4. OPSEC review verdict recorded (public / private / Pages-off)
5. `lsPrefix` unique across the account's deployed sites
6. Handed to the owner as an unmerged package — with evidence, not claims

Anything less is PARTIAL. Absence of evidence is the state.

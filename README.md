<!--
  static-spa-foundry
  Static Web · Vanilla JS · GitHub Pages · Zero Backend
  Template: README template v1.0
-->

<div align="center">
  <h1>static-spa-foundry</h1>
  <sub>the mold and its castings — template, standard, verifier and examples for zero-backend static SPAs</sub>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Status-MAINTAINED-39FF14?style=for-the-badge&labelColor=1a1a1a" alt="Status" />
  <img src="https://img.shields.io/badge/Version-v1.0.0-FF6B00?style=for-the-badge&labelColor=1a1a1a" alt="Version" />
  <img src="https://img.shields.io/badge/Phase-Deployed-FF6B00?style=for-the-badge&labelColor=1a1a1a" alt="Phase" />
  <img src="https://img.shields.io/badge/License-MIT-1a1a1a?style=for-the-badge&labelColor=000000" alt="License" />
  <img src="https://img.shields.io/badge/Tier-T1-1a1a1a?style=for-the-badge&labelColor=000000" alt="Tier" />
</p>

---

## Abstract

Small reference sites, dashboards and rosters keep getting rebuilt from scratch, usually with a backend, a build chain and a pile of secrets they never needed. This repository packages one hash-routed, vanilla-JS static template (v1.TW), a binding development standard, and a headless jsdom verifier that gates every project on "every declared route renders". A project edits exactly three surfaces (`js/data.js`, the TOKENS block in `css/style.css`, `js/custom.js`), so a change is content, not code, and a site deploys as plain files to GitHub Pages. The template and all three examples pass the smoke gate in CI on every push.

> **Design intent:** Ship a governed static SPA with no backend, no build step and no secrets — with the owner holding merge and deploy authority at every step.

---

## Project Dashboard

<div align="center">

| Metric | Target | Current | Δ |
|:-------|:------:|:-------:|:--:|
| **Smoke gate — template + examples passing** | 4 / 4 | 4 / 4 | on target |
| **Backend services required** | 0 | 0 | — |
| **Secrets in repository** | 0 | 0 | — |
| **PII-guard hits (tree)** | 0 | 0 | — |
| **Open Risks (High)** | 0 | 0 | — |

</div>

---

## Scope & Objectives

**In scope**

- Provide a copy-and-edit static SPA template with a hash router and data-driven page types.
- Provide a binding development standard (roles, workflow, hard limits, Definition of Done).
- Provide a headless verifier (`src/smoke.js`) usable locally and in CI.
- Provide worked examples for the common shapes: live API feed, many-page dashboard, profile-card roster.

**Explicitly out of scope**

- Shared state, authentication, credentialed live APIs, SEO-critical long-form sites (see `docs/TEMPLATE_GUIDE.md` §2).
- Any server-side component or build toolchain.

**Success criteria** — the project is *done* when a first-timer can copy the template, edit three surfaces and pass `src/smoke.js` without installing anything beyond Node and jsdom.

---

## System Architecture

```text
┌──────────────────────┐    copy    ┌──────────────────────┐   verify   ┌──────────────────┐
│ templates/static-spa │──────────▶│ your project         │──────────▶│ src/smoke.js     │
│ (engine v1.TW)       │            │ data.js·TOKENS·custom│            │ (jsdom DoD gate) │
└──────────────────────┘            └──────────────────────┘            └──────────────────┘
        ▲  fixes ported back by PR            │ owner merges, deploys, enables Pages
        └──────── docs/DEVELOPMENT_STANDARD.md┘
```

| Layer | Component | Interface / Protocol | Notes |
|:------|:----------|:---------------------|:------|
| Engine | `templates/static-spa/` | `<script>` tags, hash routes | copy it, never build in it |
| Standard | `docs/DEVELOPMENT_STANDARD.md` | — | binding: roles, workflow, hard limits, DoD |
| Verifier | `src/smoke.js` | Node + jsdom | title, nav, every route renders, images exist |
| Examples | `examples/*` | static files | `technical-cv`, `signal-spa`, `nightshift-ghouls` |

Full overview: [`docs/architecture.md`](docs/architecture.md).

### Which example to copy from

| You are building… | Start from | Why |
|---|---|---|
| A page fed by a live public API | `examples/technical-cv` | fetch + 30-min localStorage cache + stale-cache + link-of-last-resort fallback chain |
| A many-page ops/metrics dashboard | `examples/signal-spa` | one renderer, data-driven section types, command palette, sidebar layout; `ACCESS_REQUIREMENTS.md` = pattern for gating live data behind owner decisions |
| A team roster / profile cards | `examples/nightshift-ghouls` | image-avatar cards with tagline/lane/limits anatomy |

---

## Dependencies & Environment

### Runtime / Software

| Dependency | Version | Purpose | Pinned? |
|:-----------|:-------:|:--------|:-------:|
| Node.js | 18+ | run `src/smoke.js`, syntax checks | ✅ |
| jsdom | 24+ | headless DOM (dev/CI only, `--no-save`) | ⚠️ floating |
| Tailwind Play CDN | 3.x | optional hybrid utilities | ⚠️ floating |

### Environmental Requirements

- **Network:** the template needs none; only `technical-cv` calls the public GitHub API from the visitor's browser.
- **Security posture:** no outbound calls by default, no telemetry, no credentials anywhere.

---

## Milestones & Roadmap

| Milestone | Target | Status |
|:----------|:------:|:------:|
| v1.0.0 — template, standard, verifier, three examples, public scaffold | 2026-10 | ✅ |
| Port further page types discovered in instances | as needed | ⏳ |

---

## Risk Register

| ID | Risk | L | C | Score | Mitigation | Owner | Status |
|:--:|:-----|:-:|:-:|:-----:|:-----------|:-----:|:------:|
| R1 | If personal or internal data is put in `data.js`, then it is published with the site, resulting in a privacy leak | 2 | 4 | 8 | PII guard in hooks + CI; human OPSEC review gate in the standard | maintainer | Open |

---

## Verification & Test

| Check | Command | Result |
|:------|:--------|:------:|
| PII guard + syntax + shellcheck | `make lint` | ✅ |
| Smoke over template + every example | `make test` | ✅ |
| Release integrity | `sha256sum -c SHA256SUMS` | ✅ |

---

## Quick Start

```bash
git clone https://github.com/<owner>/static-spa-foundry.git
cd static-spa-foundry

# 1. Read docs/DEVELOPMENT_STANDARD.md (5 minutes; it is the contract)
# 2. Copy the mold
cp -r templates/static-spa ../my-project

# 3. Edit exactly three surfaces in ../my-project
#    js/data.js      SITE (UNIQUE lsPrefix!) + PAGES content
#    css/style.css   TOKENS block only
#    js/custom.js    bespoke views — Tailwind utilities only

# 4. Preview
cd ../my-project && python3 -m http.server   # → http://localhost:8000

# 5. Verify — the DoD gate
npm install --no-save jsdom
node ../static-spa-foundry/src/smoke.js .
```

Then: README from `templates/PROJECT_README_TEMPLATE.md`, OPSEC review, and hand the package to the owner for repo creation, merge and Pages.
Governance in one line: automation drafts, verifies and files evidence; **the owner merges, deploys and flips on Pages — every project, every time** (binding long form: `docs/DEVELOPMENT_STANDARD.md`).

---

## Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-FF6B00?style=for-the-badge&logoColor=white" alt="JavaScript" />
  <img src="https://img.shields.io/badge/GitHub_Pages-39FF14?style=for-the-badge&logoColor=black" alt="GitHub Pages" />
  <img src="https://img.shields.io/badge/jsdom-1a1a1a?style=for-the-badge&logoColor=39FF14" alt="jsdom" />
</p>

---

## Changelog

| Version | Date | Change |
|:-------:|:----:|:-------|
| v1.0.0 | 2026-10-30 | Public release: template, standard, verifier, three examples, canonical scaffold, PII guard. |

Full history: [`CHANGELOG.md`](CHANGELOG.md).

---

## Connect

Questions, bugs and improvements: open an issue or pull request in this repository (see [`CONTRIBUTING.md`](CONTRIBUTING.md)); security reports go through the repository **Security** tab (see [`SECURITY.md`](SECURITY.md)).

---

<div align="center">
  <sub>static-spa-foundry · Built for environments that punish fragility</sub>
</div>

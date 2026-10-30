# AGENTS.md — static-spa-foundry (source of truth for AI agents)

**Tier:** T1 · **Template:** Canonical Repository Structure Template v1.0 · **Repo tags:** SemVer

A template ("the mold"), a binding development standard, a headless verifier and three worked examples for **zero-backend,
hash-routed static single-page apps**. Automation drafts and verifies; **the owner merges, deploys and enables Pages — every time.**

## Layout (where things are)
| Path | What |
|---|---|
| `templates/static-spa/` | the canonical engine (v1.TW) — COPY it, never build in it |
| `templates/PROJECT_README_TEMPLATE.md` | README template every project starts from |
| `src/smoke.js` | generic headless verifier (jsdom) — the Definition-of-Done gate |
| `examples/` | `technical-cv` (live API feed), `signal-spa` (12-page dashboard), `nightshift-ghouls` (profile cards) |
| `docs/` | `DEVELOPMENT_STANDARD.md` (the rules), `TEMPLATE_GUIDE.md`, `BUILD_TUTORIAL.md`, `architecture.md`, `decisions/`, `runbooks/` |
| `skills/` | agent skill: how to start a new SPA project from this repo |
| `scripts/`, `hooks/`, `config/` | lint/test/build/release, PII guard + git hooks, allow-list |
| `tests/` | `unit/` (PII-guard tests), `integration/` (smoke over template + examples, via `make test`), `fixtures/` |

## Commands that actually work
```
make setup     # install git hooks (core.hooksPath=hooks/)
make lint      # PII scan, JS syntax check, shellcheck (if installed)
make test      # PII-guard tests + smoke over templates/static-spa and every example (installs jsdom --no-save into a temp dir)
make build     # deterministic dist/ tarballs (template, examples, docs)
make release   # RELEASE_MANIFEST.json + SHA256SUMS (scripts/release.sh vX.Y.Z)
make clean
```

## Rules
- Read `docs/DEVELOPMENT_STANDARD.md` first; it is binding. Edit exactly three surfaces in a project: `js/data.js`, the TOKENS block in `css/style.css`, `js/custom.js`.
- No credentials, tokens, keys, internal hostnames/IPs or personal data in any file. Example IPs use RFC 5737 ranges.
- ## PII guard
  Every commit/push is scanned by `scripts/pii-scan.sh` (hooks + CI). Hits are removed or, if reviewed false positives, added to
  `config/pii-allowlist.txt`. An owner deny-list kept **outside** the repo can be supplied via `PII_DENYLIST=/path` (never commit it).
- Do not commit `node_modules/` or lockfiles; jsdom is installed with `--no-save`.

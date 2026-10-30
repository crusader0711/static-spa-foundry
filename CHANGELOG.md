# Changelog

All notable changes to this repository are documented here. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); repo tags follow SemVer.

## [1.0.0] — 2026-10-30
### Added
- Template (`templates/static-spa/`, v1.TW), README template, development standard, template guide, build tutorial.
- Headless verifier `src/smoke.js`; three worked examples (technical-cv, signal-spa, nightshift-ghouls).
- Canonical repository scaffold (tier T1): governance files, Makefile verbs, PII guard, hooks, CI, release manifest + SHA256SUMS.
### Changed
- Public release: organization branding and internal references removed; examples genericized (placeholder usernames, RFC 5737 IPs); MIT license.
- `template/` → `templates/static-spa/`; `tools/smoke.js` → `src/smoke.js`.

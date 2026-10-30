# Contributing to static-spa-foundry

**Tier:** T1 (public). Contributions welcome via pull request.

## Ground rules (non-negotiable)
- Read `docs/DEVELOPMENT_STANDARD.md`. The engine in `templates/static-spa/` changes only by pull request here; instances never fork it.
- No credentials, keys, tokens, internal hostnames/IPs or personal data. `make lint` runs the PII guard; CI repeats it.
- Zero backend, zero build step for projects: vanilla JS + CSS (+ Tailwind Play CDN for the hybrid).

## Workflow
- Trunk-based: `main` protected; branches `feat/<slug>`, `fix/<slug>`, `docs/<slug>`; squash-merge.
- Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`, `chore:`, `ci:`).
- `make setup` once (installs hooks); `make lint test` before every push. Every change to `templates/` or `src/` runs the full matrix (template + all examples).
- Architecture decisions → new ADR in `docs/decisions/`; accepted ADRs are immutable (supersede, don't edit).

## DCO
Sign off commits (`git commit -s`) to certify you have the right to contribute under the LICENSE.

## Release artifacts
`dist/` is gitignored. `RELEASE_MANIFEST.json` lists the `dist/` tarballs; the committed `SHA256SUMS` covers the manifest and
passes `sha256sum -c SHA256SUMS` on a clean clone. Tarballs are deterministic (sorted, fixed mtime); their hashes ship in
`dist/SHA256SUMS` — attach both to the GitHub release.

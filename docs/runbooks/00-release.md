# Runbook 00 — Cut a release

1. `make lint test` green on a clean clone.
2. Update `CHANGELOG.md` (top version = release version).
3. `scripts/release.sh vX.Y.Z` — builds `dist/`, writes `RELEASE_MANIFEST.json` and `SHA256SUMS`, creates an annotated tag (`GPG_SIGN=1` also signs the sums).
4. `sha256sum -c SHA256SUMS` and `(cd dist && sha256sum -c SHA256SUMS)` both pass.
5. Commit manifest + sums, sign/push the tag (owner only), attach `dist/*` to the GitHub release.

`git_commit` in the manifest reads `pre-release` until the release commit exists; the release commit/tag is the authoritative provenance.

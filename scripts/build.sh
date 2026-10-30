#!/usr/bin/env bash
# Build deterministic tarballs into dist/ (sorted names, fixed mtime/owner, no gzip timestamp).
set -euo pipefail
cd "$(dirname "$0")/.."
VERSION="${VERSION:-$(git describe --tags --always 2>/dev/null || echo v1.0.0-dev)}"
rm -rf dist && mkdir -p dist
mktar() { out="$1"; shift; tar --sort=name --mtime='@0' --owner=0 --group=0 --numeric-owner -cf - "$@" | gzip -n -9 > "$out"; }
mktar "dist/static-spa-template-${VERSION}.tar.gz" templates
mktar "dist/examples-${VERSION}.tar.gz" examples
mktar "dist/docs-${VERSION}.tar.gz" docs README.md
mktar "dist/smoke-verifier-${VERSION}.tar.gz" src
echo "[build] $(ls dist | wc -l) artifacts in dist/"

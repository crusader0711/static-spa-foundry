#!/usr/bin/env bash
# Install git hooks. No other dependencies are installed globally.
set -euo pipefail
cd "$(dirname "$0")/.."
git config core.hooksPath hooks
chmod +x hooks/* scripts/*.sh tests/unit/*.sh 2>/dev/null || true
echo "[setup] hooks installed (core.hooksPath=hooks). Needs: node >= 18 for 'make test'."

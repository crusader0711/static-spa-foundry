#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
rc=0
./scripts/pii-scan.sh || rc=1
while IFS= read -r f; do node --check "$f" || rc=1; done < <(git ls-files '*.js' 2>/dev/null || find . -name '*.js' -not -path './node_modules/*')
if command -v shellcheck >/dev/null; then shellcheck -S warning scripts/*.sh hooks/* tests/unit/*.sh || rc=1; fi
exit $rc

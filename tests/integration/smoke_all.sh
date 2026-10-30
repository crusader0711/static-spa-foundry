#!/usr/bin/env bash
# Smoke-verify templates/static-spa and every examples/*/ project with src/smoke.js.
set -euo pipefail
cd "$(dirname "$0")/../.."
DEPS=".smoke-deps"
if [ ! -d "$DEPS/node_modules/jsdom" ]; then
  mkdir -p "$DEPS" && ( cd "$DEPS" && echo '{"name":"smoke-deps","private":true}' > package.json && npm install --no-save --no-audit --no-fund jsdom >/dev/null )
fi
export NODE_PATH="$PWD/$DEPS/node_modules"
fail=0
for p in templates/static-spa examples/*/; do
  echo "=== $p ==="
  node src/smoke.js "$p" || fail=1
done
exit $fail

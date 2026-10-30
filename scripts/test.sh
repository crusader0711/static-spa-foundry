#!/usr/bin/env bash
# PII-guard tests, then smoke-verify the template and every example (jsdom installed --no-save into a throwaway dir).
set -euo pipefail
cd "$(dirname "$0")/.."
./tests/unit/test_pii_scan.sh
./tests/integration/smoke_all.sh

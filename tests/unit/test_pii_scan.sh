#!/usr/bin/env bash
# Unit: scripts/pii-scan.sh detects each generic PII class, honors the allow-list, deny-list and modes.
# Fixtures are assembled at runtime from fragments so this file itself holds no PII-shaped literals.
# shellcheck disable=SC2329,SC2317,SC2034  # helpers are invoked through eval; $out is read inside eval strings
set -uo pipefail
cd "$(dirname "$0")/../.." || exit 1
ROOT=$PWD
FAIL=0
ok(){ if eval "$2"; then echo "  PASS: $1"; else echo "  FAIL: $1"; FAIL=1; fi }
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
git init -q "$T/r" && cd "$T/r" || exit 1
git config user.email "t@""t.invalid"; git config user.name t
mkdir -p scripts config
cp "$ROOT/scripts/pii-scan.sh" scripts/; cp "$ROOT/config/pii-allowlist.txt" config/
scan(){ ./scripts/pii-scan.sh "$@" >/dev/null 2>&1; }
put(){ printf '%s\n' "$1" > doc.md; git add doc.md; }

put "clean text only"; ok "clean file passes" "scan"
put "mail a""lice@""acme-widgets.biz"; ok "email flagged" "! scan"
put "mail someone@""example.com"; ok "example.com email allowed" "scan"
put "call 301-""555-""9876"; ok "phone flagged" "! scan"
put "call (301) ""555-""0142"; ok "fictional 555-01xx phone allowed" "scan"
put "lives at 1234 Maple Ridge ""Rd"; ok "street address flagged" "! scan"
put "Springfield, ""MD 21000"; ok "city/state/ZIP flagged" "! scan"
put "ssn 123-45-""6789"; ok "SSN flagged" "! scan"
put "card 4111 1111 ""1111 1111"; ok "Luhn-valid card flagged" "! scan"
put "card 4111 1111 ""1111 1112"; ok "non-Luhn digits ignored" "scan"
put "account number: ""12345678"; ok "account number flagged" "! scan"
put "account number is required"; ok "prose about account number not flagged" "scan"
put "verification code is ""123456"; ok "one-time code flagged" "! scan"
put "x a""lice@""acme-widgets.biz pii-scan:allow"; ok "inline allow marker honored" "scan"
put "mail a""lice@""acme-widgets.biz"
ok "--staged flags added line" "! scan --staged"
git commit -qm base; put "later clean line"; git commit -qam clean
put "mail b""ob@""acme-widgets.biz"; git commit -qam leak
ok "--diff flags leaking commit" "! scan --diff HEAD~1...HEAD"
ok "--diff of earlier clean commit passes" "scan --diff HEAD~2...HEAD~1"
out=$(./scripts/pii-scan.sh 2>&1); ok "output masks matched text" "! grep -q 'acme-widgets' <<<\"\$out\""
# deny-list
put "ordinary line with Zorbo in it"; git commit -qam deny-fixture
printf '# comment\nZorbo\nre:q[x]z\n' > "$T/deny.txt"
ok "no denylist: passes" "scan"
ok "denylist whole-word hit flagged" "! PII_DENYLIST=$T/deny.txt ./scripts/pii-scan.sh >/dev/null 2>&1"
out=$(PII_DENYLIST=$T/deny.txt ./scripts/pii-scan.sh 2>&1); ok "denylist output never prints the entry" "! grep -q 'Zorbo' <<<\"\$out\""
put "Zorbonic is not the word"; ok "denylist is whole-word" "PII_DENYLIST=$T/deny.txt ./scripts/pii-scan.sh >/dev/null 2>&1"
ok "unreadable PII_DENYLIST fails closed (exit 2)" "PII_DENYLIST=$T/missing.txt ./scripts/pii-scan.sh >/dev/null 2>&1; [[ \$? -eq 2 ]]"
exit $FAIL

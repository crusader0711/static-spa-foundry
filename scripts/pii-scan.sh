#!/usr/bin/env bash
# pii-scan.sh: block PII from entering the repo (Repo PII Guard, template v1.1 section 11).
#
# Usage:
#   ./scripts/pii-scan.sh              scan every tracked text file (default; used by make lint / CI)
#   ./scripts/pii-scan.sh --staged     scan only lines being added in the git index (pre-commit)
#   ./scripts/pii-scan.sh --diff RANGE scan only lines added in a git range, e.g. origin/main...HEAD
#   ./scripts/pii-scan.sh --show       print matched text (local use only; default output masks it)
#
# Layers:
#   1. Generic patterns (this file): emails, US phones, street addresses, city/state/ZIP, SSN,
#      card numbers (Luhn-checked), account numbers, one-time codes.
#   2. Optional owner deny-list OUTSIDE the repo: env PII_DENYLIST=/path/to/file (fallback
#      ~/.config/pii-guard/denylist.txt). One entry per line; '#' comments; plain entry = case-insensitive
#      whole-word match; 're:<regex>' = case-insensitive regex. The deny-list is never committed.
#      If PII_DENYLIST is set but unreadable the scan FAILS (no silent skip).
#   3. Allow-list in the repo: config/pii-allowlist.txt ('match:' / 'path:' lines) and the inline
#      marker 'pii-scan:allow' on a line for reviewed false positives.
#
# Output never prints deny-list entries; matches are masked unless --show. Exit 0 clean, 1 hits, 2 usage/config.
set -uo pipefail
cd "$(git rev-parse --show-toplevel 2>/dev/null || echo "$(dirname "$0")/..")" || exit 2
command -v python3 >/dev/null || { echo "pii-scan: python3 required" >&2; exit 2; }

MODE=tree RANGE=""; SHOW=0
while [[ $# -gt 0 ]]; do
  case "$1" in
    --staged) MODE=staged ;;
    --diff) MODE="diff"; RANGE="${2:-}"; shift; [[ -n "$RANGE" ]] || { echo "pii-scan: --diff needs a range" >&2; exit 2; } ;;
    --show) SHOW=1 ;;
    -h|--help) sed -n '2,22p' "$0"; exit 0 ;;
    *) echo "pii-scan: unknown arg $1" >&2; exit 2 ;;
  esac
  shift
done

DENY="${PII_DENYLIST:-}"
if [[ -z "$DENY" && -r "$HOME/.config/pii-guard/denylist.txt" ]]; then DENY="$HOME/.config/pii-guard/denylist.txt"; fi
if [[ -n "${PII_DENYLIST:-}" && ! -r "$PII_DENYLIST" ]]; then
  echo "pii-scan: PII_DENYLIST is set but not readable" >&2; exit 2
fi

export PII_MODE="$MODE" PII_RANGE="$RANGE" PII_SHOW="$SHOW" PII_DENY_FILE="$DENY" PII_ALLOW_FILE="config/pii-allowlist.txt"
exec python3 - <<'PY'
import fnmatch, os, re, subprocess, sys

mode, rng, show = os.environ["PII_MODE"], os.environ["PII_RANGE"], os.environ["PII_SHOW"] == "1"
deny_file, allow_file = os.environ["PII_DENY_FILE"], os.environ["PII_ALLOW_FILE"]

def git(*a):
    return subprocess.run(["git", *a], capture_output=True, check=False).stdout

# ---- allow-list -----------------------------------------------------------------
allow_match, allow_path = [], []
if os.path.isfile(allow_file):
    for raw in open(allow_file, encoding="utf-8"):
        raw = raw.strip()
        if not raw or raw.startswith("#"): continue
        kind, _, val = raw.partition(":")
        val = val.strip()
        if kind == "match": allow_match.append(re.compile(val, re.I))
        elif kind == "path": allow_path.append(val)

# ---- deny-list (outside the repo) -------------------------------------------------
deny = []
if deny_file:
    for i, raw in enumerate(open(deny_file, encoding="utf-8"), 1):
        raw = raw.strip()
        if not raw or raw.startswith("#"): continue
        if raw.lower().startswith("re:"): rx = re.compile(raw[3:], re.I)
        else: rx = re.compile(r"(?<![A-Za-z0-9])" + re.escape(raw) + r"(?![A-Za-z0-9])", re.I)
        deny.append((i, rx))

# ---- generic patterns -------------------------------------------------------------
STATES = "AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|DC"
SUFFIX = "St|Street|Ave|Avenue|Rd|Road|Blvd|Boulevard|Dr|Drive|Ln|Lane|Ct|Court|Way|Pl|Place|Pkwy|Parkway|Hwy|Highway|Cir|Circle|Ter|Terrace"
PATTERNS = {
    "email": re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}"),
    "phone": re.compile(r"(?<![\d.])(?:\+?1[\s.-]?)?(?:\(\d{3}\)\s?|\d{3}[\s.-])\d{3}[\s.-]\d{4}(?![\d])"),
    "street-address": re.compile(r"\b\d{1,6}\s+(?:(?:N|S|E|W|NE|NW|SE|SW)\.?\s+|North\s+|South\s+|East\s+|West\s+)?(?:[A-Z][A-Za-z0-9'-]*\s+){1,3}(?:%s)\b\.?" % SUFFIX),
    "city-state-zip": re.compile(r"\b[A-Z][A-Za-z.' -]{2,},?\s+(?:%s)\s+\d{5}(?:-\d{4})?\b" % STATES),
    "ssn": re.compile(r"(?<![\d-])(?!000|666|9\d\d)\d{3}-(?!00)\d{2}-(?!0000)\d{4}(?![\d-])"),
    "card": re.compile(r"(?<![\d-])(?:\d[ -]?){12,18}\d(?![\d-])"),
    "account-number": re.compile(r"\b(?:acct|account|routing|member|policy|claim|patient|student)\s*(?:number|no\.?|num|id|#)\s*[:=#]?\s*[A-Z0-9-]{6,}\b", re.I),
    "one-time-code": re.compile(r"\b(?:one[- ]time|verification|security|2fa|otp|passcode|login)\s+(?:code|pin)\s*(?:is|[:=])?\s*\d{4,8}\b", re.I),
}

def luhn(s):
    d = [int(c) for c in s if c.isdigit()]
    if not 13 <= len(d) <= 19: return False
    t = 0
    for i, n in enumerate(reversed(d)):
        if i % 2: n = n * 2 - 9 if n > 4 else n * 2
        t += n
    return t % 10 == 0

def mask(s):
    s = s.strip()
    return s if show else (s[:2] + "***" + s[-2:] if len(s) > 6 else "***")

# account-number: the captured value must contain a digit and not be a word (e.g. "account number is")
def acct_ok(m):
    tail = re.split(r"[:=#\s]+", m, maxsplit=2)[-1]
    return any(c.isdigit() for c in tail)

# ---- file/line sources ------------------------------------------------------------
def skip_path(p):
    return any(fnmatch.fnmatch(p, g) or fnmatch.fnmatch(os.path.basename(p), g) for g in allow_path) \
        or re.search(r"\.(png|jpe?g|gif|ico|pdf|docx?|xlsx?|pptx?|zip|gz|tgz|woff2?|ttf|bundle)$", p, re.I)

def lines_tree():
    for p in git("ls-files", "-z").decode("utf-8", "replace").split("\0"):
        if not p or skip_path(p) or not os.path.isfile(p): continue
        raw = open(p, "rb").read()
        if b"\0" in raw: continue          # binary or encrypted content
        for n, line in enumerate(raw.decode("utf-8", "replace").splitlines(), 1):
            yield p, n, line

def lines_diff(args):
    out = git(*args, "--no-color", "-U0", "--no-ext-diff").decode("utf-8", "replace")
    path, n = None, 0
    for line in out.splitlines():
        if line.startswith("+++ "):
            path = line[6:] if line.startswith("+++ b/") else None
        elif line.startswith("@@"):
            m = re.search(r"\+(\d+)", line); n = int(m.group(1)) if m else 0
        elif line.startswith("+") and path and not skip_path(path):
            yield path, n, line[1:]; n += 1

if mode == "tree": src = lines_tree()
elif mode == "staged": src = lines_diff(["diff", "--cached", "--diff-filter=ACMR"])
else: src = lines_diff(["diff", "--diff-filter=ACMR", rng])

hits = []
for path, n, line in src:
    if "pii-scan:allow" in line: continue
    for label, rx in PATTERNS.items():
        for m in rx.finditer(line):
            t = m.group(0)
            if label == "card" and not luhn(t): continue
            if label == "account-number" and not acct_ok(t): continue
            if any(a.fullmatch(t.strip()) for a in allow_match): continue
            hits.append((path, n, label, mask(t)))
    for i, rx in deny:
        if rx.search(line):
            hits.append((path, n, "denylist", "entry #%d" % i if not show else rx.search(line).group(0)))

if hits:
    print("PII-SCAN FAIL: %d potential PII hit(s) (matches masked; fix, move to private state, or allow-list a reviewed false positive)" % len(hits))
    for p, n, label, t in hits: print("  %s:%d: [%s] %s" % (p, n, label, t))
    sys.exit(1)
print("PASS: pii-scan clean (%s%s)" % (mode, ", denylist on" if deny else ", generic only"))
PY

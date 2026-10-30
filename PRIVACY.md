# Privacy & Data Handling

This repository contains a static-site template, a development standard, a headless verifier, and three example sites.

## What it touches
| Class | Examples | Handling |
|---|---|---|
| Site content | `js/data.js` in a project | public by design — a deployed static site is public; keep it at public level |
| Browser state | `localStorage` keys under the project's unique `lsPrefix` | stays in the visitor's browser; nothing is transmitted |
| Public APIs | `examples/technical-cv` calls the public GitHub REST API from the visitor's browser | unauthenticated, cached 30 min; no keys |
| Telemetry | none | the template ships no analytics or tracking |

## Rules
- **No PII in the repository:** no personal email addresses, phone numbers, street addresses, account numbers, or credentials.
  `scripts/pii-scan.sh` enforces this (hooks + CI); reviewed false positives live in `config/pii-allowlist.txt`.
- Example data is mock/fictional. Mock IP addresses use RFC 5737 documentation ranges.
- Before publishing a project built from this template, run the human OPSEC review in `docs/DEVELOPMENT_STANDARD.md` §3.

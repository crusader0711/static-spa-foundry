# Security Policy

## Supported versions
| Version | Supported |
|---|---|
| 1.x (main) | ✅ |

## Reporting a vulnerability
Please **do not open a public issue**. Report privately through GitHub's private vulnerability reporting (repository **Security** tab → **Report a vulnerability**). Include reproduction steps and impact.
Acknowledgement within 72 h; coordinated disclosure window 90 days.

## Scope notes
- The template and examples are zero-backend static pages: no credentials, tokens, or server-side state exist in this repository, and none may be added.
- `src/smoke.js` runs only on a developer machine/CI against local files (jsdom); it makes no network calls.
- Live-data patterns are documented with their no-secrets architecture options in `examples/signal-spa/ACCESS_REQUIREMENTS.md`.

# Attribution — third-party code, fonts and services consumed

| Component | Version | License | Use |
|---|---|---|---|
| Tailwind CSS (Play CDN) | 3.x | MIT | utility classes in the hybrid template (see `docs/TEMPLATE_GUIDE.md` §10) |
| JetBrains Mono (webfont) | — | OFL-1.1 | monospace UI font |
| jsdom | 24+ | MIT | headless DOM for `src/smoke.js` (dev/CI only, installed with `--no-save`, never committed) |
| shields.io | — | service | README badges |
| GitHub REST API | v3 | service terms | live repo feed in `examples/technical-cv` |
| gitleaks | 8.x | MIT | secret scanning (CI) |

Example avatar and logo images in `examples/nightshift-ghouls/assets/` are original generated artwork supplied with this repository under its MIT license.
Pin versions in the page `<script>`/`<link>` tags and in CI; this table lists the floor.

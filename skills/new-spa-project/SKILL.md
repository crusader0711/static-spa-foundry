---
name: new-spa-project
description: Start a new zero-backend static SPA from static-spa-foundry — copy the template, edit three surfaces, verify with the smoke gate.
---
1. Read `docs/DEVELOPMENT_STANDARD.md` (binding).
2. `cp -r templates/static-spa ../my-project`; give it a UNIQUE `lsPrefix` in `js/data.js`.
3. Edit only `js/data.js`, the TOKENS block of `css/style.css`, and `js/custom.js`.
4. Verify: `npm install --no-save jsdom && node src/smoke.js ../my-project`.
5. Instantiate the README from `templates/PROJECT_README_TEMPLATE.md`; do the human OPSEC review; hand off to the owner for merge, deploy, Pages.

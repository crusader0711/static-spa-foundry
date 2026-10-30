# docs/decisions/0000-scope-and-posture.md
Date: 2026-10-30   Status: accepted

## Context
Many small reference sites and dashboards need the same hardened skeleton: no backend, no secrets, hash routing, a verifier.

## Decision
One repository holds the engine, the binding standard, the verifier and worked examples. Instances copy the engine and never fork it; fixes are ported back by pull request. The owner alone merges, deploys and enables Pages.

## Consequences
Right for reference sites, dashboards, rosters, checklists, small tools. Wrong for shared state, authentication, credentialed live APIs, SEO-critical long-form sites (see `docs/TEMPLATE_GUIDE.md` §2).

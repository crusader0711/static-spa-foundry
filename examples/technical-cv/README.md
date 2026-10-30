# technical-cv

Live project dashboard and technical CV for a GitHub user — a single source
of truth for all GitHub repositories, flagship projects, professional profile,
and resources.

**Live (after you deploy):** `https://your-username.github.io/technical-cv/#/`
**Built from:** [`static-spa-foundry/template`](https://github.com/your-username/static-spa-foundry) template (zero-backend, hash-routed vanilla JS)

## How it stays current

The **Repos** tab fetches `api.github.com/users/<GH_USER>/repos` live from
the visitor's browser (public endpoint, no key) and renders every repository
with language, stars, forks, last update, and a LIVE SITE link for any repo
with Pages enabled. Publishing a new repo updates this page automatically —
zero maintenance. Results are cached in localStorage for 30 min to stay well
inside the unauthenticated rate limit (60 req/hr per client IP).

Set `GH_USER` at the top of `js/data.js` (ships as GitHub's demo account `octocat`). Curated content (Featured, Profile, Resources) lives in the same file.

## Editing

| Change | File |
|---|---|
| Featured projects, profile cards, resource links | `js/data.js` |
| Theme (colors/fonts) | `css/style.css` — TOKENS block |
| Repo feed behavior | `js/custom.js` (`reposPage`) |

## OPSEC

This is a public site in a public repo. Content policy: public-résumé level
only. Review `js/data.js` diffs before every push.

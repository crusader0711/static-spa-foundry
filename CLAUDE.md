Read AGENTS.md first — it is the source of truth.

Claude-specific notes:
- Prefer the Makefile verbs (`make lint`, `make test`) over ad-hoc commands so the docs stay true.
- Never edit the engine in a project copy; port fixes back to `templates/static-spa/` (see `docs/DEVELOPMENT_STANDARD.md` §4).

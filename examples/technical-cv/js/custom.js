/* ============================================================
   CUSTOM VIEWS — technical-cv
   reposPage: live GitHub repo feed for GH_USER.
   - Fetches public API client-side (no key, CORS-enabled)
   - Caches in localStorage 30 min to respect the 60 req/hr
     unauthenticated rate limit
   - Filter box, language dot, stars/forks, Pages-site link
   ============================================================ */

window.CUSTOM = {

  async reposPage(el, ctx) {
    const { esc, lsGet, lsSet } = ctx;
    el.innerHTML = `
      <div class="section-label">Repositories — live from GitHub</div>
      <input class="search" id="rq" type="search" placeholder="FILTER REPOS…" aria-label="Filter repositories">
      <p class="font-mono text-xs text-ink2 mt-1 mb-3.5" id="rnote">Fetching from api.github.com…</p>
      <div class="grid" id="rgrid"></div>`;

    const note = document.getElementById("rnote");
    const grid = document.getElementById("rgrid");
    const CACHE_KEY = "repos";
    const CACHE_TTL_MS = 30 * 60 * 1000;

    let repos = null;
    let fromCache = false;

    // 1. Try cache
    try {
      const raw = lsGet(CACHE_KEY);
      if (raw) {
        const c = JSON.parse(raw);
        if (Date.now() - c.t < CACHE_TTL_MS) { repos = c.repos; fromCache = true; }
      }
    } catch (_) { /* corrupt cache — refetch */ }

    // 2. Fetch if needed
    if (!repos) {
      try {
        const res = await fetch(
          `https://api.github.com/users/${encodeURIComponent(GH_USER)}/repos?per_page=100&sort=updated`,
          { headers: { Accept: "application/vnd.github+json" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        repos = data.map((r) => ({
          name: r.name,
          url: r.html_url,
          desc: r.description || "",
          lang: r.language || "",
          stars: r.stargazers_count,
          forks: r.forks_count,
          fork: r.fork,
          pages: r.has_pages,
          updated: r.updated_at,
        }));
        lsSet(CACHE_KEY, JSON.stringify({ t: Date.now(), repos }));
      } catch (err) {
        const stale = (() => {
          try { return JSON.parse(lsGet(CACHE_KEY) || "null"); } catch (_) { return null; }
        })();
        if (stale && stale.repos) {
          repos = stale.repos;
          fromCache = true;
          note.textContent = "API unavailable — showing cached list.";
        } else {
          note.innerHTML =
            `Could not reach the GitHub API (${esc(err.message)}). ` +
            `View repositories directly at <a href="https://github.com/${esc(GH_USER)}?tab=repositories" target="_blank" rel="noopener">github.com/${esc(GH_USER)}</a>.`;
          return;
        }
      }
    }

    note.textContent = `${repos.length} repositories · sorted by last update` +
      (fromCache ? " · cached ≤30 min" : "");

    const fmtDate = (iso) => {
      const d = new Date(iso);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    };

    /* v1.TW: custom-emitted markup uses Tailwind utilities (token-mapped). */
    const linkBtn = (href, label) => `<a href="${href}" target="_blank" rel="noopener"
      class="font-mono text-[11px] font-semibold tracking-wider text-accent no-underline border border-line rounded px-2 py-0.5 hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">${label}</a>`;
    const card = (r) => `
      <div class="bg-surface border border-line rounded-[10px] px-4 py-3.5">
        <div class="flex items-baseline justify-between gap-2">
          <h3 class="font-display text-xl font-semibold tracking-tight m-0">${esc(r.name)}</h3>
          ${r.fork
            ? `<span class="font-mono text-[10px] font-semibold tracking-wider px-1.5 py-px rounded border border-line text-ink2 shrink-0">FORK</span>`
            : `<span class="font-mono text-[10px] font-semibold tracking-wider px-1.5 py-px rounded border border-accent text-accent shrink-0">SOURCE</span>`}
        </div>
        <p class="mt-1.5 mb-0 text-sm text-ink2">${r.desc ? esc(r.desc) : "No description."}</p>
        <div class="flex flex-wrap gap-x-3.5 gap-y-1.5 mt-2.5 font-mono text-[11px] tracking-wide text-ink2">
          ${r.lang ? `<span><span class="inline-block w-2 h-2 rounded-full bg-accent mr-1"></span>${esc(r.lang)}</span>` : ""}
          <span>★ ${r.stars}</span>
          <span>⑂ ${r.forks}</span>
          <span>UPD ${esc(fmtDate(r.updated))}</span>
        </div>
        <div class="mt-2.5 flex gap-2 flex-wrap">
          ${linkBtn(esc(r.url), "REPO")}
          ${r.pages ? linkBtn(`https://${esc(GH_USER)}.github.io/${esc(r.name)}/`, "LIVE SITE") : ""}
        </div>
      </div>`;

    const draw = (list) => { grid.innerHTML = list.map(card).join(""); };
    draw(repos);

    document.getElementById("rq").addEventListener("input", (e) => {
      const term = e.target.value.trim().toLowerCase();
      draw(!term ? repos : repos.filter((r) =>
        (r.name + " " + r.desc + " " + r.lang).toLowerCase().includes(term)));
    });
  },

};

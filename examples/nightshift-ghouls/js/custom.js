/* ============================================================
   CUSTOM VIEWS — v1.TW convention: Tailwind utilities only.
   roster:   stat row + 8 profile cards + doctrine teaser
   doctrine: full "why the team works" page
   ============================================================ */

window.CUSTOM = {

  roster(el, ctx) {
    const { esc } = ctx;

    const tagColor = { GATE: "border-flash text-flash", WATCH: "border-spectre text-spectre",
      BUILD: "border-warn text-warn", LEDGER: "border-warn text-warn",
      DOCS: "border-spectre text-spectre", TRIAGE: "border-accent text-accent" };

    const stats = [
      { l: "Crew", v: "8", d: "one lane each" },
      { l: "Write Authority", v: "0", d: "humans merge" },
      { l: "Coverage", v: "24/7", d: "scheduled sweeps" },
      { l: "Output Channel", v: "GitHub", d: "PRs · issues · checks" },
    ].map((s) => `
      <div class="bg-surface border border-line rounded-[10px] px-4 py-3">
        <div class="font-mono text-[10px] tracking-wider text-ink2 uppercase">${esc(s.l)}</div>
        <div class="font-mono text-[22px] font-bold text-ink mt-0.5">${esc(s.v)}</div>
        <div class="font-mono text-[10px] mt-0.5 text-accent">${esc(s.d)}</div>
      </div>`).join("");

    const card = (b) => `
      <div class="bot-card">
        <img class="bot-avatar" src="${esc(b.img)}" alt="${esc(b.name)} avatar" loading="lazy">
        <div class="px-4 py-3.5">
          <div class="flex items-baseline justify-between gap-2">
            <h3 class="font-mono text-[16px] font-bold text-ink m-0">${esc(b.name)}</h3>
            <span class="font-mono text-[10px] font-semibold tracking-wider px-1.5 py-px rounded border ${tagColor[b.tag] || "border-line text-ink2"}">${esc(b.tag)}</span>
          </div>
          <p class="font-mono text-[12px] italic text-spectre mt-1.5 mb-0">&ldquo;${esc(b.tagline)}&rdquo;</p>

          <div class="font-mono text-[10px] tracking-wider text-ink2 uppercase mt-3 pt-2.5 border-t border-line">Lane</div>
          <p class="text-[12.5px] text-ink mt-0.5 mb-0 leading-snug">${esc(b.lane)}</p>

          <div class="font-mono text-[10px] tracking-wider text-ink2 uppercase mt-2.5">Schedule</div>
          <p class="font-mono text-[11.5px] text-accent mt-0.5 mb-0">${esc(b.schedule)}</p>

          <div class="font-mono text-[10px] tracking-wider text-ink2 uppercase mt-2.5">Hard Limits</div>
          <ul class="list-none p-0 mt-1 mb-0">
            ${b.limits.map((l) => `<li class="text-[12px] text-ink2 leading-snug mb-1 pl-4 relative"><span class="absolute left-0 text-flash font-bold">✕</span>${esc(l)}</li>`).join("")}
          </ul>

          <div class="font-mono text-[10px] text-ink2 mt-2.5 pt-2 border-t border-line">REPORTS → <span class="text-ink">${esc(b.reports)}</span></div>
        </div>
      </div>`;

    el.innerHTML = `
      <div class="flex justify-center mt-1 mb-2">
        <img src="${esc(SITE.logo)}" alt="The Nightshift Ghouls — team logo" class="w-full max-w-[520px] rounded-[14px] border border-line" loading="eager">
      </div>
      <p class="font-mono text-[11px] text-ink2 text-center mt-0 mb-4">Eight specialized agents · observe, report, propose · housed in GitHub — card content syncing with PR #1</p>
      <div class="grid gap-3 mb-4" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr))">${stats}</div>
      <div class="section-label">Profiles</div>
      <div class="grid gap-3.5" style="grid-template-columns:repeat(auto-fill,minmax(270px,1fr))">${BOTS.map(card).join("")}</div>
      <div class="section-label">Why the Team Works</div>
      <p class="text-[13px] text-ink2 mb-2">Separation of duties, enforced limits, and a fully auditable output channel — the short version. The full doctrine lives on its own page.</p>
      <a href="#/doctrine" class="font-mono text-[12px] font-semibold text-accent no-underline border border-line rounded px-3 py-1.5 inline-block hover:border-accent">READ THE DOCTRINE →</a>`;
  },

  doctrine(el, ctx) {
    const { esc } = ctx;
    el.innerHTML = `
      <h2 class="font-mono text-[20px] font-bold text-ink mt-1 mb-0.5">Doctrine — Why the Team Works</h2>
      <p class="font-mono text-[11px] text-ink2 mt-0 mb-4">The operating principles behind the crew. Every principle maps to an enforced control, not a vibe.</p>
      <div class="grid">${DOCTRINE.map((d) => `
        <div class="card">
          <div class="card-top"><h3>${esc(d.title)}</h3><span class="tag SPECTRE">${esc(d.tag)}</span></div>
          <p>${esc(d.body)}</p>
        </div>`).join("")}
      </div>`;
  },

};

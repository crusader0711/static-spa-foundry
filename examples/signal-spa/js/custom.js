/* ============================================================
   SIGNAL renderer (v1.TW convention: Tailwind utilities only).
   One renderer, five section types: table | hosts | uptime |
   budget | (stats row + banner built-in). All pages read their
   definition from SIGNAL[route]. Plus: Ctrl/Cmd+K palette.
   ============================================================ */

window.CUSTOM = {

  signal(el, ctx) {
    const { esc } = ctx;
    const route = location.hash.replace(/^#/, "") || "/";
    const d = SIGNAL[route];
    if (!d) { el.innerHTML = `<p class="hint">No SIGNAL definition for ${esc(route)}.</p>`; return; }

    const bmap = { ok: "border-accent text-accent", warn: "border-warn text-warn", err: "border-flash text-flash", mut: "border-line text-ink2" };
    const badge = (c) => `<span class="font-mono text-[10px] font-semibold tracking-wider px-1.5 py-px rounded border ${bmap[c.b] || bmap.mut} whitespace-nowrap">${esc(c.t)}</span>`;
    const cell = (c) => (c && typeof c === "object") ? badge(c) : esc(String(c));

    const barColor = (p) => p >= 85 ? "bg-flash" : p >= 70 ? "bg-warn" : "bg-accent";
    const bar = (label, pct) => `
      <div class="flex items-center gap-2 mt-1.5">
        <span class="font-mono text-[10px] text-ink2 w-14 shrink-0">${esc(label)}</span>
        <span class="flex-1 h-1.5 rounded bg-bg overflow-hidden"><span class="block h-full ${barColor(pct)}" style="width:${pct}%"></span></span>
        <span class="font-mono text-[10px] ${pct >= 85 ? "text-flash" : pct >= 70 ? "text-warn" : "text-ink2"} w-8 text-right">${pct}%</span>
      </div>`;

    const stats = (d.stats || []).map((s) => `
      <div class="bg-surface border border-line rounded-[10px] px-4 py-3">
        <div class="font-mono text-[10px] tracking-wider text-ink2 uppercase">${esc(s.l)}</div>
        <div class="font-mono text-[22px] font-bold text-ink mt-0.5">${esc(s.v)}</div>
        <div class="font-mono text-[10px] mt-0.5 ${s.dir === "warn" ? "text-warn" : s.dir === "err" ? "text-flash" : "text-accent"}">${esc(s.d)}</div>
      </div>`).join("");

    const table = (s, idx) => `
      <div class="overflow-x-auto bg-surface border border-line rounded-[10px]">
        <table class="w-full border-collapse min-w-[560px]" data-tbl="${idx}">
          <thead><tr>${s.cols.map((c) => `<th class="text-left font-mono text-[10px] tracking-wider uppercase text-ink2 px-3.5 py-2.5 border-b border-line">${esc(c)}</th>`).join("")}</tr></thead>
          <tbody>${s.rows.map((r) => `<tr class="hover:bg-bg">${r.map((c, i) => `<td class="px-3.5 py-2.5 border-b border-line font-mono text-[12px] ${i === 0 ? "font-semibold text-ink" : "text-ink2"}">${cell(c)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </div>`;

    const hosts = (s) => `
      <div class="grid gap-3" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr))">
        ${s.hosts.map((h) => `
        <div class="bg-surface border border-line rounded-[10px] px-4 py-3.5">
          <div class="flex items-baseline justify-between gap-2">
            <div><span class="font-mono text-[13px] font-bold text-ink">${esc(h.name)}</span>
            <div class="font-mono text-[10px] text-ink2">${esc(h.ip)}</div></div>
            ${badge(h.badge)}
          </div>
          <div class="font-mono text-[10px] text-ink2 mt-2 pb-1.5 border-b border-line">${esc(h.meta)}</div>
          ${h.bars.map(([l, p]) => bar(l, p)).join("")}
          <div class="font-mono text-[10px] text-ink2 mt-2.5">${esc(h.foot)}</div>
        </div>`).join("")}
      </div>`;

    const uptime = (s) => s.services.map((svc) => {
      let cells = "", x = svc.seed * 7919;
      const badIdx = new Set();
      for (let i = 0; i < svc.bad; i++) { x = (x * 48271) % 2147483647; badIdx.add(x % 60); }
      for (let i = 0; i < 60; i++) cells += `<span class="h-5 rounded-[2px] ${badIdx.has(i) ? "bg-warn" : "bg-accent"}" style="flex:1"></span>`;
      return `
      <div class="bg-surface border border-line rounded-[10px] px-4 py-3 mb-3">
        <div class="flex items-baseline justify-between gap-2 flex-wrap">
          <span class="font-mono text-[12px] font-semibold text-ink">${esc(svc.name)}</span>
          <span class="font-mono text-[11px] text-ink2">~ ${esc(svc.ms)} · <span class="text-ink font-bold">${esc(svc.pct)}</span></span>
        </div>
        <div class="flex gap-px mt-2">${cells}</div>
        <div class="flex justify-between font-mono text-[9px] text-ink2 mt-1"><span>90 days ago</span><span>Today</span></div>
      </div>`;
    }).join("");

    const budget = (s) => `
      <div class="bg-surface border border-line rounded-[10px] px-4 py-3.5">
        ${s.items.map(([l, spent, cap]) => {
          const p = Math.round((spent / cap) * 100);
          return `<div class="mb-3 last:mb-0">
            <div class="flex justify-between font-mono text-[11px]"><span class="text-ink font-semibold">${esc(l)}</span><span class="text-ink2">$${spent} / $${cap} · <span class="${p >= 90 ? "text-flash" : p >= 75 ? "text-warn" : "text-accent"}">${p}%</span></span></div>
            <div class="h-2 rounded bg-bg overflow-hidden mt-1"><span class="block h-full ${p >= 90 ? "bg-flash" : p >= 75 ? "bg-warn" : "bg-accent"}" style="width:${Math.min(p, 100)}%"></span></div>
          </div>`;
        }).join("")}
      </div>`;

    const sections = (d.sections || []).map((s, i) => `
      <div class="section-label">${esc(s.h)}</div>
      ${s.type === "table" ? table(s, i) : s.type === "hosts" ? hosts(s) : s.type === "uptime" ? uptime(s) : s.type === "budget" ? budget(s) : ""}`).join("");

    el.innerHTML = `
      <h2 class="font-mono text-[22px] font-bold text-ink mt-1 mb-0.5">${esc(d.title)}</h2>
      <p class="font-mono text-[11px] text-ink2 mt-0 mb-1">${esc(d.sub)}</p>
      <p class="font-mono text-[10px] text-warn/90 mb-3">▲ ${esc(d.src)}</p>
      ${d.banner ? `<div class="border ${d.banner.b === "err" ? "border-flash text-flash" : "border-warn text-warn"} bg-surface rounded-[10px] px-4 py-3 font-mono text-[12px] font-semibold mb-4">△ ${esc(d.banner.text)}</div>` : ""}
      ${d.filter ? `<input id="sigq" type="search" placeholder="FILTER ROWS…" aria-label="Filter rows" class="w-full font-mono text-sm px-3.5 py-3 border border-line rounded-lg bg-surface text-ink mb-3">` : ""}
      <div class="grid gap-3 mb-2" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr))">${stats}</div>
      ${sections}`;

    if (d.filter) {
      document.getElementById("sigq").addEventListener("input", (e) => {
        const term = e.target.value.trim().toLowerCase();
        el.querySelectorAll("tbody tr").forEach((tr) => {
          tr.style.display = !term || tr.textContent.toLowerCase().includes(term) ? "" : "none";
        });
      });
    }
  },
};

/* ---------- Command palette (Ctrl/Cmd+K) ---------- */
(() => {
  let open = false, sel = 0, matches = [];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function close() { document.querySelector(".cmdk")?.remove(); open = false; }
  function go(route) { close(); location.hash = "#" + route; }

  function draw(term) {
    matches = PAGES.filter((p) => !term || (p.label + " " + p.route).toLowerCase().includes(term));
    sel = Math.min(sel, Math.max(matches.length - 1, 0));
    document.querySelector(".cmdk-list").innerHTML = matches.map((p, i) =>
      `<div class="cmdk-item" data-sel="${i === sel ? 1 : 0}" data-route="${esc(p.route)}"><span>${esc(p.label)}</span><span class="k">#${esc(p.route)}</span></div>`).join("") ||
      `<div class="cmdk-item"><span class="k">no matches</span></div>`;
    document.querySelectorAll(".cmdk-item[data-route]").forEach((n) =>
      n.addEventListener("click", () => go(n.dataset.route)));
  }

  function openPalette() {
    if (open) return; open = true; sel = 0;
    const wrap = document.createElement("div");
    wrap.className = "cmdk";
    wrap.innerHTML = `<div class="cmdk-panel"><input placeholder="jump to page…" aria-label="Command palette"><div class="cmdk-list"></div></div>`;
    document.body.appendChild(wrap);
    const inp = wrap.querySelector("input");
    draw(""); inp.focus();
    inp.addEventListener("input", () => { sel = 0; draw(inp.value.trim().toLowerCase()); });
    inp.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { sel = Math.min(sel + 1, matches.length - 1); draw(inp.value.trim().toLowerCase()); e.preventDefault(); }
      else if (e.key === "ArrowUp") { sel = Math.max(sel - 1, 0); draw(inp.value.trim().toLowerCase()); e.preventDefault(); }
      else if (e.key === "Enter" && matches[sel]) go(matches[sel].route);
      else if (e.key === "Escape") close();
    });
    wrap.addEventListener("click", (e) => { if (e.target === wrap) close(); });
  }

  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); open ? close() : openPalette(); }
    else if (e.key === "Escape" && open) close();
  });
})();

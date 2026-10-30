/* ============================================================
   CUSTOM VIEWS — extension point for bespoke interactive pages.
   Register functions on window.CUSTOM; reference them by name
   from a { type: "custom", render: "fnName" } page in data.js.

   v1.TW CONVENTION: all markup written here uses TAILWIND
   UTILITIES, not new CSS classes. Token colors are available as
   utilities (bg-surface, text-accent, border-line, text-ink2,
   text-warn, text-flash, text-ok) — they resolve to the same
   CSS variables as the engine theme, so re-skinning a project
   via the TOKENS block restyles Tailwind markup automatically.
   Engine-rendered pages (linkGrid/cards/checklist) keep their
   semantic classes in css/style.css — do not restyle those here.

   Each function receives (el, ctx):
     el   the <main> element to render into
     ctx  { lsGet, lsSet, esc, daysUntil }  shared helpers
   ============================================================ */

window.CUSTOM = {

  /* Example custom page in the v1.TW Tailwind pattern.
     Replace or delete for your project. */
  toolsPage(el, ctx) {
    el.innerHTML = `
      <div class="section-label">Tools</div>

      <div class="bg-surface border border-line rounded-[10px] p-4 mb-3.5">
        <h3 class="font-display text-[21px] font-semibold tracking-tight m-0 mb-2.5">Example Calculator</h3>
        <label for="calc-in" class="block font-mono text-xs tracking-wider text-ink2 mb-1">INPUT VALUE</label>
        <input type="number" id="calc-in" step="any" inputmode="decimal" placeholder="e.g. 42"
          class="font-mono text-sm bg-bg text-ink border border-line rounded-md px-2.5 py-2 w-full max-w-xs">
        <div class="font-mono text-[15px] font-semibold mt-3 text-accent" id="calc-out">—</div>
      </div>

      <div class="bg-surface border border-line rounded-[10px] p-4 mb-3.5">
        <h3 class="font-display text-[21px] font-semibold tracking-tight m-0 mb-2.5">Countdown</h3>
        <label for="cd-date" class="block font-mono text-xs tracking-wider text-ink2 mb-1">TARGET DATE</label>
        <input type="date" id="cd-date"
          class="font-mono text-sm bg-bg text-ink border border-line rounded-md px-2.5 py-2 w-full max-w-xs">
        <div class="font-mono text-[15px] font-semibold mt-3 text-accent" id="cd-out">—</div>
      </div>`;

    const inp = document.getElementById("calc-in");
    inp.addEventListener("input", () => {
      const v = parseFloat(inp.value);
      document.getElementById("calc-out").textContent =
        isNaN(v) ? "—" : `×2 = ${(v * 2).toLocaleString()}`;
    });

    const dd = document.getElementById("cd-date");
    const saved = ctx.lsGet("cd-date");
    if (saved) { dd.value = saved; show(); }
    dd.addEventListener("change", () => { ctx.lsSet("cd-date", dd.value); show(); });
    function show() {
      if (!dd.value) return;
      const d = ctx.daysUntil(dd.value);
      document.getElementById("cd-out").textContent =
        d < 0 ? "DATE PASSED" : d === 0 ? "TODAY" : `${d} DAY${d === 1 ? "" : "S"} REMAINING`;
    }
  },

};

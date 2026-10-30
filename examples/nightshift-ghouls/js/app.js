/* ============================================================
   ENGINE — data-driven hash router + page-type renderers.
   (static-spa v1.TW engine; do not edit per project.)
   Content:   js/data.js  ·  Theme: css/style.css TOKENS
   Bespoke:   js/custom.js (window.CUSTOM registry)
   ============================================================ */
(() => {
  "use strict";

  const app = document.getElementById("app");
  const nav = document.getElementById("nav");

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const lsGet = (k) => localStorage.getItem(SITE.lsPrefix + k);
  const lsSet = (k, v) => localStorage.setItem(SITE.lsPrefix + k, v);
  const daysUntil = (iso) =>
    Math.ceil((new Date(iso + "T00:00:00") - new Date()) / 86400000);
  const ctx = { esc, lsGet, lsSet, daysUntil };

  /* ---------- Chrome from SITE ---------- */
  document.title = `${SITE.name} — ${SITE.tagline.replace(/^\/\/\s*/, "")}`;
  document.getElementById("site-name").textContent = SITE.name;
  document.getElementById("site-tagline").textContent = SITE.tagline;
  document.getElementById("strip-left").textContent = SITE.stripLeft;
  document.getElementById("footer-text").textContent = SITE.footer;

  const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const stripRight = document.getElementById("strip-right");
  if (SITE.stripRight === "dtg") {
    const p = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const d = new Date();
      stripRight.textContent =
        `DTG: ${p(d.getUTCDate())}${p(d.getUTCHours())}${p(d.getUTCMinutes())}Z ${MONTHS[d.getUTCMonth()]} ${String(d.getUTCFullYear()).slice(2)}`;
    };
    tick();
    setInterval(tick, 15000);
  } else {
    stripRight.textContent = SITE.stripRight;
  }

  nav.innerHTML = PAGES.map((p) =>
    `<a href="#${esc(p.route)}" data-route="${esc(p.route)}">${esc(p.label)}</a>`).join("");

  /* ---------- Built-in renderers ---------- */
  function renderCards(page) {
    app.innerHTML = `
      <div class="section-label">${esc(page.label)}</div>
      <div class="grid">${page.cards.map((r) => `
        <div class="card">
          <div class="card-top"><h3>${esc(r.title)}</h3>${r.tag ? `<span class="tag ${esc(r.tagClass || "")}">${esc(r.tag)}</span>` : ""}</div>
          <p>${esc(r.body)}</p>
        </div>`).join("")}
      </div>`;
  }

  function renderLinkGrid(page) {
    const groups = page.groups.map((g, i) => `
      <div class="link-group" data-group="${i}">
        <div class="section-label">${esc(g.group)}</div>
        <div class="grid">${g.links.map((l) => `
          <a class="card" href="${esc(l.url)}" target="_blank" rel="noopener">
            <div class="card-top"><h3>${esc(l.name)}</h3>${l.tag ? `<span class="tag ${esc(l.tag)}">${esc(l.tag)}</span>` : ""}</div>
            <p>${esc(l.desc)}</p></a>`).join("")}
        </div>
      </div>`).join("");
    app.innerHTML = groups;
  }

  function renderCustom(page) {
    const fn = window.CUSTOM && window.CUSTOM[page.render];
    if (typeof fn === "function") fn(app, ctx);
    else app.innerHTML = `<p class="hint">Custom view "${esc(page.render)}" not found in js/custom.js.</p>`;
  }

  const RENDERERS = { cards: renderCards, linkGrid: renderLinkGrid, custom: renderCustom };

  /* ---------- Router ---------- */
  function route() {
    const hash = location.hash.replace(/^#/, "") || PAGES[0].route;
    const page = PAGES.find((p) => p.route === hash) || PAGES[0];
    nav.querySelectorAll("a").forEach((a) =>
      a.classList.toggle("active", a.dataset.route === page.route));
    (RENDERERS[page.type] || (() => { app.innerHTML = ""; }))(page);
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);
  route();
})();

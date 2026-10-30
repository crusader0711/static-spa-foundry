#!/usr/bin/env node
/* ============================================================
   Generic headless verifier for any static-spa project.
   Usage:  node src/smoke.js <project-dir>
   Needs:  npm install jsdom   (dev machine only, never shipped)
   Checks: title set · nav generated from PAGES · every declared
   route renders substantive DOM · unknown route falls back to
   the first page · every <img src> in rendered pages exists.
   Exit 0 = all pass. Wire into CI or run before every push.
   ============================================================ */
const { JSDOM } = require("jsdom");
const fs = require("fs"), path = require("path");

const dir = process.argv[2];
if (!dir || !fs.existsSync(path.join(dir, "index.html"))) {
  console.error("usage: node src/smoke.js <project-dir containing index.html>");
  process.exit(2);
}

let html = fs.readFileSync(path.join(dir, "index.html"), "utf8")
  .replace(/<script src="https:[^"]+"><\/script>/g, "")   // CDN scripts (Tailwind) — not needed for DOM checks
  .replace(/<link[^>]+(googleapis|gstatic)[^>]*>/g, "");   // webfonts

const dom = new JSDOM(html, { runScripts: "outside-only", url: "https://example.github.io/app/" });
const w = dom.window;
const bundle = ["js/data.js", "js/custom.js", "js/app.js"]
  .filter((f) => fs.existsSync(path.join(dir, f)))
  .map((f) => fs.readFileSync(path.join(dir, f), "utf8")).join("\n;\n");
// Top-level const in one eval() call does not persist to a later eval()
// (unlike browser <script> tags, which share script scope) — so export
// PAGES onto window from inside the same bundle evaluation.
w.eval(bundle + "\n;window.__PAGES = (typeof PAGES !== 'undefined') ? PAGES : [];");
const PAGES = w.window === undefined ? [] : (w.__PAGES || []);

(async () => {
  const d = w.document, checks = [];
  const go = (r) => { w.location.hash = "#" + r; w.dispatchEvent(new w.Event("hashchange")); return new Promise((res) => setTimeout(res, 50)); };

  checks.push(["title set", d.title.trim().length > 3, d.title]);
  checks.push([`nav tabs = ${PAGES.length}`, d.querySelectorAll("#nav a").length === PAGES.length, ""]);

  const missingImgs = new Set();
  for (const p of PAGES) {
    await go(p.route);
    const len = d.getElementById("app").innerHTML.length;
    const active = d.querySelector("#nav a.active")?.dataset.route;
    checks.push([`route ${p.route}`, len > 40 && active === p.route, `${len}ch active=${active}`]);
    d.querySelectorAll("#app img[src], .masthead img[src]").forEach((i) => {
      const src = i.getAttribute("src");
      if (!/^(https?:|data:)/.test(src) && !fs.existsSync(path.join(dir, src))) missingImgs.add(src);
    });
  }
  checks.push(["all image assets exist", missingImgs.size === 0, [...missingImgs].join(", ")]);

  await go("/__no_such_route__");
  checks.push(["unknown route falls back", d.querySelector("#nav a.active")?.dataset.route === PAGES[0]?.route, ""]);

  let fail = 0;
  for (const [name, ok, info] of checks) {
    console.log(`${ok ? "PASS" : "FAIL"}  ${name}${info ? "  " + info : ""}`);
    if (!ok) fail++;
  }
  console.log(fail ? `\n${fail} FAILURE(S)` : "\nALL CHECKS PASS");
  process.exit(fail ? 1 : 0);
})();

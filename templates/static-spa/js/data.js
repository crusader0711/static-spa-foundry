/* ============================================================
   CONTENT + CONFIG — the only file you edit for a new project
   (plus the TOKENS block at the top of css/style.css for theme,
   and js/custom.js if you need bespoke interactive pages).

   PAGE TYPES (built into app.js):
     linkGrid   groups of outbound link cards, with live filter
     cards      static info/knowledge cards
     checklist  localStorage date tracker w/ green-amber-red status
     custom     your own render function registered in js/custom.js
   ============================================================ */

const SITE = {
  name: "PROJECT NAME",                 // masthead display name
  tagline: "// ONE-LINE PURPOSE",       // small mono subtitle
  stripLeft: "REF: PROJECT",            // top-left mono strip text
  stripRight: "dtg",                    // "dtg" = live Zulu clock, or any static string, or "" to hide
  lsPrefix: "proj:",                    // localStorage namespace — CHANGE per project to avoid collisions
  footer: "Static reference site. All data stays in this browser (localStorage). Verify against authoritative sources.",
};

/* Nav order = array order. First page is the default route (#/). */
const PAGES = [
  {
    route: "/",
    label: "Links",
    type: "linkGrid",
    filter: true,                        // show search box
    groups: [
      {
        group: "Primary Resources",
        links: [
          { name: "Example Portal", url: "https://example.com", desc: "What this link is for, in one sentence.", tag: "PRIORITY" },
          { name: "Example Docs", url: "https://example.com/docs", desc: "Secondary resource description.", tag: "ROUTINE" },
        ],
      },
      {
        group: "Secondary Resources",
        links: [
          { name: "Time-Critical Thing", url: "https://example.com/urgent", desc: "Tag FLASH renders red for time-sensitive items.", tag: "FLASH" },
        ],
      },
    ],
  },
  {
    route: "/refs",
    label: "References",
    type: "cards",
    cards: [
      { title: "Key Concept One", tag: "TOPIC", body: "One concept per card. Keep it to 2–4 sentences so it scans on a phone." },
      { title: "Key Concept Two", tag: "TOPIC", body: "These render as a responsive grid. Add as many as needed." },
    ],
  },
  {
    route: "/tracker",
    label: "Tracker",
    type: "checklist",
    intro: "Dates are stored only in this browser's localStorage — nothing is transmitted.",
    items: [
      { id: "item1", label: "Recurring Obligation A", warnDays: 30 },
      { id: "item2", label: "Recurring Obligation B", warnDays: 60 },
      { id: "cert",  label: "Certification / Expiration", warnDays: 90 },
    ],
  },
  {
    route: "/tools",
    label: "Tools",
    type: "custom",
    render: "toolsPage",                 // function name exported on window.CUSTOM in js/custom.js
  },
];

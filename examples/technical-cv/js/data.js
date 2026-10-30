/* ============================================================
   TECHNICAL-CV content + config.
   OPSEC NOTE: this deploys to a PUBLIC site in a PUBLIC repo.
   Keep everything here at public-résumé level. Review before push.
   ============================================================ */

const GH_USER = "octocat";   // EDIT: GitHub username driving the live repo feed (octocat = GitHub demo account)

const SITE = {
  name: "TECHNICAL CV",
  tagline: "// your-username — single source of truth",
  stripLeft: "USR: YOUR-USERNAME",
  stripRight: "dtg",
  lsPrefix: "tcv:",
  footer: "Static dashboard. Repo data fetched live from the public GitHub API in your browser; nothing else is transmitted or stored server-side.",
};

const PAGES = [
  {
    route: "/",
    label: "Repos",
    type: "custom",
    render: "reposPage",              // live GitHub API feed — see js/custom.js
  },
  {
    route: "/featured",
    label: "Featured",
    type: "linkGrid",
    filter: false,
    groups: [
      {
        group: "Flagship Projects",
        links: [
          { name: "static-spa", url: "https://github.com/your-username/static-spa-foundry", desc: "Reusable zero-backend SPA template + build playbook. Upstream for this site and future project pages.", tag: "STABLE" },
          { name: "technical-cv", url: "https://github.com/your-username/technical-cv", desc: "This dashboard — live GitHub project feed, professional profile, and resource index.", tag: "STABLE" },
          /* EDIT: add flagship repos as you publish them. */
          { name: "Add your next flagship", url: "https://github.com/your-username?tab=repositories", desc: "Placeholder — replace with a published project and a one-line value statement.", tag: "WIP" },
        ],
      },
    ],
  },
  {
    route: "/profile",
    label: "Profile",
    type: "cards",
    cards: [
      { title: "Focus Areas", tag: "SCOPE", body: "EDIT: your technical focus areas, e.g. cloud architecture · security engineering · embedded systems." },
      { title: "Education", tag: "EDU", body: "EDIT: degrees and programs, at public-résumé level." },
      { title: "Certifications", tag: "CERTS", body: "EDIT: certifications you are comfortable listing publicly." },
      { title: "Engineering Identity", tag: "ID", body: "EDIT: a short statement of how you build — tools, habits, and the kinds of problems you like." },
      { title: "This Site", tag: "META", body: "Built from the static-spa template: hash-routed vanilla JS, zero backend, GitHub Pages hosting. The repo list is fetched live from the public GitHub API in your browser." },
    ],
  },
  {
    route: "/resources",
    label: "Resources",
    type: "linkGrid",
    filter: true,
    groups: [
      {
        group: "Profiles",
        links: [
          { name: "GitHub — your-username", url: "https://github.com/your-username", desc: "All public repositories and activity.", tag: "PRIORITY" },
          { name: "LinkedIn", url: "https://www.linkedin.com/", desc: "EDIT: paste your public profile URL.", tag: "ROUTINE" },
          { name: "Credly", url: "https://www.credly.com/", desc: "EDIT: paste your badge wallet URL (CEH, AWS certs).", tag: "ROUTINE" },
        ],
      },
      {
        group: "Project Resources",
        links: [
          { name: "static-spa Template Guide", url: "https://github.com/your-username/static-spa-foundry/blob/main/docs/TEMPLATE_GUIDE.md", desc: "Build playbook: fit criteria, architecture, instantiation checklist, extension patterns.", tag: "PRIORITY" },
          { name: "GitHub Pages Docs", url: "https://docs.github.com/en/pages", desc: "Hosting, custom domains, HTTPS.", tag: "ROUTINE" },
          { name: "GitHub REST API — Repos", url: "https://docs.github.com/en/rest/repos", desc: "The public endpoint powering the live Repos tab.", tag: "ROUTINE" },
        ],
      },
      {
        group: "Toolchain",
        links: [
          { name: "shields.io", url: "https://shields.io", desc: "README badges for repo status, CI, versions.", tag: "ROUTINE" },
          { name: "choosealicense.com", url: "https://choosealicense.com", desc: "Pick licenses for public repos deliberately.", tag: "ROUTINE" },
        ],
      },
    ],
  },
];

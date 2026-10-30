/* ============================================================
   GHOSTS & GOBLINS — content + config.
   THIS IS THE FILE YOU EDIT. Each bot card below is a DRAFT
   derived from the taglines — overwrite lane / schedule /
   limits / reports with the approved card content from PR #1.
   Fields:
     tagline  the bot's own words (verbatim, in quotes on the card)
     tag      lane category chip: GATE · WATCH · BUILD · LEDGER · DOCS · TRIAGE
     lane     what the bot owns — one sentence, verb-first
     schedule when it runs (cron-speak or plain)
     limits   HARD LIMITS — what it must never do (rendered in red)
     reports  where its output lands (PRs / issues / channel)
   ============================================================ */

const SITE = {
  name: "THE NIGHTSHIFT GHOULS",
  tagline: "// ai bot team roster — example",
  logo: "assets/nightshift-ghouls-logo.jpg",
  stripLeft: "NIGHTSHIFT GHOULS · CREW: 8 · GITHUB",
  stripRight: "dtg",
  lsPrefix: "gng:",
  footer: "THE NIGHTSHIFT GHOULS — static roster, no telemetry, no credentials. Every bot observes and reports; only humans merge. Card content pending final sync with PR #1.",
};

const PAGES = [
  { route: "/",         label: "Roster",   type: "custom", render: "roster" },
  { route: "/doctrine", label: "Doctrine", type: "custom", render: "doctrine" },
];

const BOTS = [
  {
    name: "Count Gatekeeper", img: "assets/count-gatekeeper.jpg", tag: "GATE",
    tagline: "The castle gate opens only by my word.",
    lane: "Guards repository access — branch protection, required checks, CODEOWNERS review gates, and secrets hygiene on every pull request.",
    schedule: "On every PR · nightly access audit 0200Z",
    limits: [
      "Never merges — gate verdicts only, humans turn the key",
      "Never creates, rotates, or reads credential values",
      "Never grants access — flags and recommends only",
    ],
    reports: "PR status checks + nightly audit issue",
  },
  {
    name: "Banshee", img: "assets/banshee.jpg", tag: "WATCH",
    tagline: "I wail before the storm arrives.",
    lane: "Early warning — watches CI failure trends, error-budget burn, and anomaly precursors, and raises the alarm before incidents mature.",
    schedule: "Continuous watch · 15-min sweep cadence",
    limits: [
      "Never silences or downgrades an alert",
      "Never auto-remediates — notify only",
      "Never pages twice for the same root cause",
    ],
    reports: "Alert issues + severity-tagged notifications",
  },
  {
    name: "Cauldron", img: "assets/cauldron.jpg", tag: "BUILD",
    tagline: "Something wicked good is simmering.",
    lane: "Brews the builds — CI pipelines, test runs, container packaging, and artifact signing for every push.",
    schedule: "On push · full nightly brew 0300Z",
    limits: [
      "Never deploys to production — staging stops the brew",
      "Never force-pushes or rewrites history",
      "Never skips a failing test to go green",
    ],
    reports: "Pipeline checks + tagged build artifacts",
  },
  {
    name: "Scrollkeeper", img: "assets/scrollkeeper.jpg", tag: "DOCS",
    tagline: "Every deadline inked in the ancient scrolls.",
    lane: "Keeps the record — changelogs, READMEs, milestone tracking, and deadline reminders across every repo in the crew's demesne.",
    schedule: "Daily digest 0900 local · on milestone events",
    limits: [
      "Never edits code — documentation and issues only",
      "Never deletes a record — supersede, never erase",
      "Never moves a deadline without a human's mark",
    ],
    reports: "Docs PRs + daily deadline digest issue",
  },
  {
    name: "Coin Goblin", img: "assets/coin-goblin.jpg", tag: "LEDGER",
    tagline: "I count every coin, and touch none.",
    lane: "Counts the hoard — cloud spend rollups, budget-bar tracking, and waste findings with savings recommendations.",
    schedule: "Daily cost pull 0600Z · month-end reckoning",
    limits: [
      "Read-only billing — never purchases or provisions",
      "Never resizes or terminates a resource",
      "Never holds payment credentials of any kind",
    ],
    reports: "Daily cost report + optimization issues",
  },
  {
    name: "Oracle Wisp", img: "assets/oracle-wisp.jpg", tag: "WATCH",
    tagline: "I glimpse the market's mist, never its till.",
    lane: "Reads the mist — market, pricing, and dependency-landscape scans distilled into forecast summaries for planning.",
    schedule: "Weekly outlook Monday 0700 local",
    limits: [
      "Never trades, transacts, or touches an account",
      "Never issues financial advice — analysis only",
      "Never presents a forecast as a certainty",
    ],
    reports: "Weekly outlook doc + trend-flag issues",
  },
  {
    name: "Gremlin", img: "assets/gremlin.jpg", tag: "TRIAGE",
    tagline: "I watch the wires so nothing goes bump.",
    lane: "Walks the wires — uptime probes, certificate expiry, disk and queue watermarks across the lab and cloud fleet.",
    schedule: "5-min probes · Sunday deep inspection",
    limits: [
      "Never restarts production services",
      "Never changes a config — opens issues only",
      "Never probes beyond the declared fleet list",
    ],
    reports: "Health issues + weekly wire report",
  },
  {
    name: "Doc Phantom", img: "assets/doc-phantom.jpg", tag: "TRIAGE",
    tagline: "A quiet presence keeping watch over the living.",
    lane: "Makes the rounds — dependency CVE scans, repo health checks, and stale-branch hygiene across every living project.",
    schedule: "Nightly rounds 0100Z",
    limits: [
      "Never auto-patches production — dev-branch PRs only",
      "Never reads beyond repo metadata and manifests",
      "Never closes a finding without human sign-off",
    ],
    reports: "Patch PRs to dev + nightly rounds summary",
  },
];

/* Why the team works — rendered at the foot of the Roster and on Doctrine */
const DOCTRINE = [
  { title: "One Lane Each", tag: "DESIGN", body: "Every bot owns exactly one lane. No bot's duties overlap another's authority, so a misbehaving agent is contained to its lane by construction — least privilege as an org chart." },
  { title: "Observe, Report, Propose", tag: "DESIGN", body: "Bots flag, file, and draft. Humans merge, deploy, and decide. No agent in the crew holds write authority over production, money, or access — the hard limits on each card are enforced, not aspirational." },
  { title: "Hard Limits Are Contracts", tag: "CONTROL", body: "Each card's red list is the bot's permission boundary, mirrored in its token scopes and workflow permissions. A limit that isn't technically enforced is just a wish." },
  { title: "Predictable Cadence", tag: "OPS", body: "Scheduled sweeps instead of always-on autonomy: load is predictable, output is auditable, and silence outside the schedule is itself a signal." },
  { title: "Overlapping Watch, Separate Voices", tag: "OPS", body: "Banshee watches trends while Gremlin walks the wires — two independent observers on the same infrastructure means one failed watcher never means blindness." },
  { title: "Everything Through the Repo", tag: "AUDIT", body: "All output lands as PRs, issues, and checks — versioned, attributable, reviewable. The GitHub history is the crew's complete flight recorder." },
];

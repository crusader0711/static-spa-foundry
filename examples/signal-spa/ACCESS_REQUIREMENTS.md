# SIGNAL-SPA — ACCESS_REQUIREMENTS (v0.1 → live data)

Everything in v0.1 renders MOCK data. This file is the gate to live telemetry:
what each page needs, what you must provide, and the security architecture
that makes it possible without ever putting a credential in a public site.

---

## 0. The constraint that shapes everything

SIGNAL-SPA is a **public static site**. Any API key, token, or credential
shipped to the browser is publicly disclosed the moment the page loads.
Therefore: **no direct client-side calls to AWS, NAS, Kubernetes, or any
authenticated API — ever.** The only exception is the GitHub public API
(unauthenticated, already proven in technical-cv).

## 1. Pick the integration architecture (DECISION REQUIRED)

| Option | Mechanism | Secrets live in | Freshness | Effort | Fit |
|---|---|---|---|---|---|
| **A. Push-to-static (recommended start)** | Cron/agents on NAS + GitHub Actions collect metrics → write sanitized `data/*.json` → commit/push (or S3 public bucket) → SIGNAL fetches JSON | NAS + GitHub Actions secrets | 1–15 min batches | Low | Dashboards, uptime, costs — everything here |
| **B. Read-only relay API** | Tiny authenticated-outbound proxy (Lambda/Cloudflare Worker) exposes sanitized read-only JSON; SIGNAL fetches it | Lambda/Worker env | Near-real-time | Medium | Live-ish gauges; needs CORS + rate limiting + careful sanitization |
| **C. Self-host SIGNAL privately** | Serve the same static files from NAS (nginx container) behind Tailscale/VPN; a local relay can hold credentials | Home lab | Real-time | Medium | If the dashboard should not be public at all |

**Recommendation:** A for v0.2 (zero new attack surface — the site stays
static and dumb), C in parallel for a private full-fidelity instance. B only
if you later want public near-real-time numbers.

**OPSEC note before anything ships:** the mock data uses realistic hostnames
and private IPs as placeholders. For a PUBLIC deployment, real hostnames,
internal IPs, CVE exposure, and Suricata findings should NOT be published —
Option A must sanitize at the collector, or those pages stay mock/private
(Option C). Decide per page below.

## 2. Per-page data source matrix

| Page | Live source | Access needed from you | Path | Public-safe? |
|---|---|---|---|---|
| Overview | Aggregate of all below | — (derived) | A | Only from sanitized feeds |
| Servers | AWS CloudWatch (EC2) + NAS system stats | IAM read-only role (see §3); NAS API key or telegraf container | A | ⚠️ strip private IPs/hostnames |
| Containers | NAS Docker API (`dockerd` socket) | Approve a read-only collector container on nas-01 | A | ⚠️ image names OK, ports/mounts NO |
| Deploys | GitHub Actions + Deployments API | None for public repos; PAT (`repo` read) if private repos included | Direct client-side (public) or A | ✅ public repos |
| Kubernetes | kube-state-metrics / `kubectl` snapshot | Read-only ServiceAccount kubeconfig for the collector (never the site) | A | ⚠️ node names generic only |
| Incidents | Alertmanager webhook → JSON, or manual entries in `data/incidents.json` | Webhook target decision; or nothing (manual) | A | ⚠️ scrub details |
| Logs | Loki / CloudWatch Logs filtered export | Log group names + IAM (`logs:FilterLogEvents`) | A (sampled) or C (full) | ❌ full logs never public → C |
| Status | Uptime Kuma (NAS container) status JSON export | Approve Uptime Kuma deploy + its public status page toggle | A | ✅ by design |
| Databases | RDS Performance Insights / `pg_stat_statements` | IAM (`pi:GetResourceMetrics`) or pg read-only user for collector | A | ⚠️ query text redacted |
| Security | Trivy/Grype in Actions + Suricata EVE JSON | Actions workflow approval; Suricata log path on NAS | C strongly preferred | ❌ findings/CVEs never public |
| API | Prometheus histogram summaries | Prometheus URL reachable by collector | A | ✅ if endpoints generic |
| Costs | AWS Cost Explorer / CUR daily export | IAM (`ce:GetCostAndUsage`); optional CUR→S3 setup | A | ⚠️ round numbers, no account IDs |

## 3. Concrete access items needed from you

**AWS** (create once, least-privilege):
1. A dedicated IAM role `signal-collector-ro` with a policy limited to:
   `cloudwatch:GetMetricData`, `ce:GetCostAndUsage`, `logs:FilterLogEvents`
   (only if Logs page goes live), `pi:GetResourceMetrics` (only if DB page
   goes live). No write actions, no `*` resources where avoidable.
2. Where the collector runs: GitHub Actions (store creds as **Actions
   secrets** via OIDC role-assumption — preferred, no long-lived keys) or on
   NAS (access keys in the container env, never in any repo).
3. Region list + which accounts/tags are in scope for cost rollups.

**NAS:**
4. Approve one read-only collector container (telegraf or a small script) with
   access to: system stats, Docker socket (read-only mount), Suricata EVE log
   path. Provide nothing to me — you deploy it; I write the config.
5. Uptime Kuma container (if adopting for Status) — its JSON export URL.

**GitHub:**
6. Which repos count as "services" for the Deploys page (list), and whether
   any are private (→ fine-grained PAT, read-only, stored as an Actions
   secret — never sent to me, never in the site).

**Kubernetes (if the cluster is real and in scope):**
7. Read-only ServiceAccount token for the collector; confirm the cluster is
   never internet-exposed for this purpose.

**Decisions (answer these before v0.2):**
- D1: Architecture A / B / C per §1 (can be A + C split)
- D2: Public vs private deployment — which pages are public-safe (see matrix)
- D3: Refresh cadence (5 min? 15 min?) — sets Actions schedule + NAS cron
- D4: Confirm/replace the mock hostnames, service names, and page merges
  (Deploys=Deployments+Pipelines, Status=Uptime+Status Page)

## 4. Data contract (how live data plugs in)

The renderer already consumes the shapes in `js/data.js`. Going live means the
collector writes the same shapes to `data/<page>.json`, and the renderer's
only change is `SIGNAL[route]` → `fetch("data/" + page + ".json")` with the
same cache/fallback pattern proven in technical-cv. Mock and live are
interchangeable per page — pages can go live one at a time.

## 5. Descoped from the commercial feature list (deliberate)

| Feature | Status | Rationale |
|---|---|---|
| Light mode | Cut | Dark-only per requirement |
| 6 color presets | Token swap documented in style.css | One-line change; no preset UI needed |
| Density modes | Deferred | Add as a body-class toggle if wanted |
| i18n (EN/DE/FR) | Cut | Single-operator tool |
| Auth pages ×8, billing, kanban, calendar | Cut | 12-page scope; no backend exists to auth against |
| Recharts line/donut charts | Deferred to v0.2 | Chart.js via CDN slots into the section system; needs live data to be worth it |
| Next.js/React/shadcn stack | Not used | Original implementation on static-spa v1.TW engine; zero build retained |

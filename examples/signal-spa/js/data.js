/* ============================================================
   SIGNAL-SPA content + config.  v0.1 — ALL DATA IS MOCK.
   Live integrations are gated on ACCESS_REQUIREMENTS.md.
   Badge codes: ok | warn | err | mut
   ============================================================ */

const SITE = {
  name: "SIGNAL",
  tagline: "// devops dashboard — example",
  stripLeft: "ENV: LAB",
  stripRight: "dtg",
  lsPrefix: "sig:",
  footer: "SIGNAL v0.1 — static build, mock telemetry. Live data sources pending per ACCESS_REQUIREMENTS.md. No credentials exist in this site.",
};

const PAGES = [
  { route: "/",           label: "Overview",   type: "custom", render: "signal" },
  { route: "/servers",    label: "Servers",    type: "custom", render: "signal" },
  { route: "/containers", label: "Containers", type: "custom", render: "signal" },
  { route: "/deploys",    label: "Deploys",    type: "custom", render: "signal" },
  { route: "/k8s",        label: "Kubernetes", type: "custom", render: "signal" },
  { route: "/incidents",  label: "Incidents",  type: "custom", render: "signal" },
  { route: "/logs",       label: "Logs",       type: "custom", render: "signal" },
  { route: "/status",     label: "Status",     type: "custom", render: "signal" },
  { route: "/db",         label: "Databases",  type: "custom", render: "signal" },
  { route: "/security",   label: "Security",   type: "custom", render: "signal" },
  { route: "/api",        label: "API",        type: "custom", render: "signal" },
  { route: "/costs",      label: "Costs",      type: "custom", render: "signal" },
];

const B = (t, b) => ({ t, b });   // badge cell
const SIGNAL = {

"/": { title: "Infrastructure Overview", sub: "Real-time monitoring across all environments — MOCK DATA",
  src: "Aggregates: NAS + AWS CloudWatch + GitHub (pending)",
  stats: [
    { l: "Active Servers", v: "6/8", d: "+1 from last week", dir: "ok" },
    { l: "Deployments Today", v: "18", d: "+22% from yesterday", dir: "ok" },
    { l: "Open Incidents", v: "3", d: "-40% from last week", dir: "ok" },
    { l: "Avg Response Time", v: "142ms", d: "-8% from last hour", dir: "ok" },
  ],
  sections: [
    { h: "Service Health", type: "table",
      cols: ["Service", "Status", "Latency", "Uptime 90d"],
      rows: [
        ["api-gateway", B("HEALTHY","ok"), "42ms", "99.99%"],
        ["auth-service", B("HEALTHY","ok"), "28ms", "99.98%"],
        ["log-ingest", B("DEGRADED","warn"), "320ms", "99.82%"],
        ["worker-queue", B("HEALTHY","ok"), "61ms", "99.95%"],
        ["metrics-collector", B("DOWN","err"), "—", "98.10%"],
      ]},
    { h: "Recent Deployments", type: "table",
      cols: ["Service", "Version", "Env", "Status", "Age"],
      rows: [
        ["api-gateway", "v2.14.0", B("production","mut"), B("SUCCESS","ok"), "2m"],
        ["auth-service", "v1.8.3", B("production","mut"), B("ROLLING","warn"), "5m"],
        ["web-frontend", "v3.2.1", B("production","mut"), B("SUCCESS","ok"), "38m"],
        ["notification-svc", "v1.4.7", B("production","mut"), B("FAILED","err"), "1h"],
      ]},
  ]},

"/servers": { title: "Server Fleet", sub: "Monitor and manage your infrastructure — MOCK DATA",
  src: "Source: NAS API + AWS EC2/CloudWatch (pending)",
  stats: [
    { l: "Total Nodes", v: "8", d: "6 online · 1 degraded · 1 offline", dir: "ok" },
    { l: "Fleet CPU Avg", v: "48%", d: "steady", dir: "ok" },
    { l: "Fleet Mem Avg", v: "64%", d: "+6% 24h", dir: "warn" },
    { l: "Alerts", v: "2", d: "prod-api-02 · prod-db-01", dir: "warn" },
  ],
  sections: [
    { h: "Nodes", type: "hosts", hosts: [
      { name: "prod-web-01", ip: "192.0.2.12", badge: B("Online","ok"), meta: "us-east-1 · Ubuntu 22.04", bars: [["CPU",45],["Memory",68],["Disk",32]], foot: "Uptime: 14d 6h" },
      { name: "prod-web-02", ip: "192.0.2.13", badge: B("Online","ok"), meta: "us-east-1 · Ubuntu 22.04", bars: [["CPU",52],["Memory",71],["Disk",35]], foot: "Uptime: 14d 6h" },
      { name: "prod-api-01", ip: "198.51.100.20", badge: B("Online","ok"), meta: "us-west-2 · AL2023", bars: [["CPU",78],["Memory",82],["Disk",45]], foot: "Uptime: 7d 12h" },
      { name: "prod-api-02", ip: "198.51.100.21", badge: B("Degraded","warn"), meta: "us-west-2 · AL2023", bars: [["CPU",92],["Memory",88],["Disk",47]], foot: "Uptime: 7d 12h" },
      { name: "prod-db-01", ip: "192.0.2.50", badge: B("Online","ok"), meta: "us-east-1 · Ubuntu 22.04", bars: [["CPU",35],["Memory",90],["Disk",72]], foot: "Uptime: 30d 2h" },
      { name: "nas-01", ip: "203.0.113.10", badge: B("Online","ok"), meta: "home-lab · NAS", bars: [["CPU",22],["Memory",41],["Array",63]], foot: "Uptime: 45d 11h" },
      { name: "staging-api-01", ip: "198.51.100.110", badge: B("Offline","err"), meta: "eu-west-1 · AL2023", bars: [["CPU",0],["Memory",0],["Disk",22]], foot: "Uptime: 0d 0h" },
      { name: "prod-worker-01", ip: "203.0.113.30", badge: B("Online","ok"), meta: "ap-southeast-1 · Ubuntu", bars: [["CPU",61],["Memory",55],["Disk",28]], foot: "Uptime: 21d 4h" },
    ]},
  ]},

"/containers": { title: "Containers", sub: "Docker container management — MOCK DATA",
  src: "Source: NAS Docker API / dockerd socket relay (pending)",
  stats: [
    { l: "Running", v: "17/21", d: "4 stopped", dir: "ok" },
    { l: "Images", v: "34", d: "6 unused", dir: "warn" },
    { l: "Host CPU", v: "22%", d: "nas-01", dir: "ok" },
    { l: "Restarts 24h", v: "3", d: "plex ×2 · grafana ×1", dir: "warn" },
  ],
  sections: [
    { h: "Containers — nas-01", type: "table",
      cols: ["Name", "Image", "State", "CPU", "Mem", "Uptime"],
      rows: [
        ["ollama", "ollama/ollama:latest", B("running","ok"), "38%", "9.2 GiB", "12d"],
        ["open-webui", "ghcr.io/open-webui", B("running","ok"), "2%", "410 MiB", "12d"],
        ["grafana", "grafana/grafana:11", B("running","ok"), "1%", "180 MiB", "6h"],
        ["prometheus", "prom/prometheus", B("running","ok"), "3%", "620 MiB", "31d"],
        ["suricata", "jasonish/suricata", B("running","ok"), "11%", "1.1 GiB", "31d"],
        ["plex", "plexinc/pms-docker", B("restarting","warn"), "—", "—", "2m"],
        ["pihole", "pihole/pihole", B("running","ok"), "0.4%", "90 MiB", "45d"],
        ["backup-agent", "restic/restic", B("exited","mut"), "—", "—", "—"],
      ]},
  ]},

"/deploys": { title: "Deploys & Pipelines", sub: "CI/CD tracking with stage visibility — MOCK DATA",
  src: "Source: GitHub Actions + Deployments API (public repos work client-side)",
  stats: [
    { l: "Today's Deploys", v: "18", d: "across 9 services", dir: "ok" },
    { l: "Success Rate", v: "94.2%", d: "7d rolling", dir: "ok" },
    { l: "Avg Duration", v: "3m 24s", d: "-12s vs 7d", dir: "ok" },
    { l: "Rollbacks", v: "2", d: "notification-svc · search", dir: "warn" },
  ],
  sections: [
    { h: "Deployment History", type: "table",
      cols: ["Service", "Version", "Branch", "Env", "Status", "Dur", "Age"],
      rows: [
        ["api-gateway", "v2.14.0", "main", B("production","mut"), B("SUCCESS","ok"), "2m 18s", "2m"],
        ["auth-service", "v1.8.3", "hotfix/auth-fix", B("production","mut"), B("ROLLING","warn"), "1m 42s", "5m"],
        ["web-frontend", "v3.2.1", "main", B("production","mut"), B("SUCCESS","ok"), "4m 52s", "38m"],
        ["payment-service", "v2.1.0", "release/2.1", B("staging","mut"), B("SUCCESS","ok"), "3m 05s", "55m"],
        ["notification-svc", "v1.4.7", "main", B("production","mut"), B("FAILED","err"), "1m 12s", "1h"],
        ["user-service", "v2.9.0", "feature/profiles", B("development","mut"), B("SUCCESS","ok"), "2m 38s", "1h"],
        ["worker-queue", "v1.6.2", "main", B("production","mut"), B("CANCELLED","mut"), "0m 48s", "3h"],
      ]},
    { h: "Pipeline Stages — api-gateway v2.14.0", type: "table",
      cols: ["Stage", "Status", "Duration"],
      rows: [
        ["build", B("PASS","ok"), "48s"], ["unit tests", B("PASS","ok"), "1m 02s"],
        ["container scan", B("PASS","ok"), "22s"], ["deploy: canary", B("PASS","ok"), "31s"],
        ["deploy: fleet", B("PASS","ok"), "35s"],
      ]},
  ]},

"/k8s": { title: "Kubernetes", sub: "Nodes, pods, namespaces, resource usage — MOCK DATA",
  src: "Source: kube-state-metrics → JSON relay (pending; cluster API never public)",
  stats: [
    { l: "Nodes", v: "8/10", d: "1 cordoned · 1 not ready", dir: "warn" },
    { l: "Pods Running", v: "124", d: "3 pending", dir: "ok" },
    { l: "CPU Usage", v: "62%", d: "cluster-wide", dir: "ok" },
    { l: "Namespaces", v: "12", d: "prod 100% healthy", dir: "ok" },
  ],
  sections: [
    { h: "Nodes", type: "table",
      cols: ["Name", "Status", "Role", "CPU", "Mem", "Pods", "Age"],
      rows: [
        ["node-pool-1a-xk9m", B("Ready","ok"), B("control-plane","mut"), "2.4/8", "6.2/16Gi", "28", "142d"],
        ["node-pool-1a-j3nf", B("Ready","ok"), "worker", "5.8/8", "12.1/16Gi", "32", "142d"],
        ["node-pool-1b-m8qw", B("Ready","ok"), "worker", "6.2/8", "13.4/16Gi", "28", "98d"],
        ["node-pool-1b-r4vz", B("Ready","ok"), "worker", "3.1/8", "8.6/16Gi", "18", "98d"],
        ["node-pool-gpu-1a", B("Ready","ok"), "worker", "7.1/16", "48.2/64Gi", "8", "34d"],
        ["node-pool-1c-p2kd", B("Cordoned","warn"), "worker", "0.2/8", "1.8/16Gi", "2", "67d"],
        ["node-pool-1a-z5bw", B("Not Ready","err"), "worker", "0/8", "0/16Gi", "0", "142d"],
      ]},
  ]},

"/incidents": { title: "Incidents", sub: "Severity-based incident management — MOCK DATA",
  src: "Source: manual entries + alertmanager webhook relay (pending)",
  stats: [
    { l: "Open", v: "3", d: "1 SEV-2 · 2 SEV-3", dir: "warn" },
    { l: "MTTR 30d", v: "42m", d: "-11m vs prior 30d", dir: "ok" },
    { l: "MTTA 30d", v: "6m", d: "steady", dir: "ok" },
    { l: "Resolved 7d", v: "9", d: "no repeats", dir: "ok" },
  ],
  sections: [
    { h: "Active", type: "table",
      cols: ["ID", "Sev", "Title", "Service", "Status", "Age"],
      rows: [
        ["INC-0141", B("SEV-2","err"), "metrics-collector down", "metrics", B("INVESTIGATING","warn"), "38m"],
        ["INC-0140", B("SEV-3","warn"), "log ingest latency > 300ms", "log-ingest", B("MONITORING","mut"), "3h"],
        ["INC-0139", B("SEV-3","warn"), "elevated 5xx on search", "search-svc", B("MITIGATED","ok"), "6h"],
      ]},
    { h: "Recent — Resolved", type: "table",
      cols: ["ID", "Sev", "Title", "MTTR"],
      rows: [
        ["INC-0138", B("SEV-2","err"), "auth token refresh loop", "51m"],
        ["INC-0137", B("SEV-4","mut"), "staging cert expiry", "12m"],
        ["INC-0136", B("SEV-3","warn"), "worker-queue backlog", "1h 20m"],
      ]},
  ]},

"/logs": { title: "Log Explorer", sub: "Filterable stream with severity levels — MOCK DATA",
  src: "Source: Loki/CloudWatch Logs relay (pending). Filter box is live.",
  stats: [
    { l: "Ingest Rate", v: "4.2k/s", d: "steady", dir: "ok" },
    { l: "Errors 1h", v: "212", d: "+38 vs prior hour", dir: "warn" },
    { l: "Warnings 1h", v: "1.1k", d: "steady", dir: "ok" },
    { l: "Retention", v: "30d", d: "hot tier", dir: "ok" },
  ],
  filter: true,
  sections: [
    { h: "Stream — tail", type: "table",
      cols: ["Time", "Level", "Service", "Message"],
      rows: [
        ["14:02:11Z", B("ERROR","err"), "metrics-collector", "connection refused 192.0.2.7:9090"],
        ["14:02:09Z", B("WARN","warn"), "log-ingest", "batch flush 412ms exceeds SLO 250ms"],
        ["14:02:08Z", B("INFO","ok"), "api-gateway", "GET /v2/health 200 3ms"],
        ["14:02:05Z", B("INFO","ok"), "auth-service", "token issued sub=svc-deployer"],
        ["14:01:59Z", B("ERROR","err"), "notification-svc", "SMTP timeout after 30s — retry 2/3"],
        ["14:01:52Z", B("DEBUG","mut"), "worker-queue", "claimed 24 jobs shard=3"],
        ["14:01:47Z", B("INFO","ok"), "web-frontend", "SSR render /dashboard 41ms"],
        ["14:01:40Z", B("WARN","warn"), "prod-db-01", "slow query 1.8s — see /db"],
      ]},
  ]},

"/status": { title: "Status & Uptime", sub: "90-day availability with response trends — MOCK DATA",
  src: "Source: Uptime Kuma on NAS → published JSON (pending)",
  banner: { text: "DEGRADED PERFORMANCE — log ingestion pipeline", b: "warn" },
  stats: [
    { l: "Overall 90d", v: "99.94%", d: "6 services", dir: "ok" },
    { l: "Active Alerts", v: "1", d: "log-ingest", dir: "warn" },
    { l: "Checks", v: "30s", d: "interval", dir: "ok" },
    { l: "Last Incident", v: "38m", d: "INC-0141", dir: "warn" },
  ],
  sections: [
    { h: "Services — 90 days", type: "uptime", services: [
      { name: "API Gateway", ms: "42ms", pct: "99.99%", seed: 1, bad: 0 },
      { name: "Authentication Service", ms: "28ms", pct: "99.98%", seed: 2, bad: 4 },
      { name: "Compute Engine", ms: "55ms", pct: "99.97%", seed: 3, bad: 2 },
      { name: "Database Cluster", ms: "3ms", pct: "99.99%", seed: 4, bad: 1 },
      { name: "Log Ingestion Pipeline", ms: "320ms", pct: "99.82%", seed: 5, bad: 12 },
      { name: "CDN / Static Assets", ms: "12ms", pct: "100%", seed: 6, bad: 0 },
    ]},
  ]},

"/db": { title: "Databases", sub: "Connection pools, query performance — MOCK DATA",
  src: "Source: RDS Performance Insights + pg_stat relay (pending)",
  stats: [
    { l: "Instances", v: "3", d: "2 pg · 1 redis", dir: "ok" },
    { l: "Pool Usage", v: "61%", d: "184/300 conns", dir: "ok" },
    { l: "QPS", v: "2.4k", d: "primary", dir: "ok" },
    { l: "Slow Queries 1h", v: "7", d: "> 1s", dir: "warn" },
  ],
  sections: [
    { h: "Instances", type: "table",
      cols: ["Instance", "Engine", "Status", "Conns", "CPU", "Repl Lag"],
      rows: [
        ["prod-pg-primary", "postgres 16", B("HEALTHY","ok"), "142/200", "38%", "—"],
        ["prod-pg-replica", "postgres 16", B("HEALTHY","ok"), "42/100", "21%", "180ms"],
        ["prod-redis-01", "redis 7", B("HEALTHY","ok"), "310 clients", "9%", "—"],
      ]},
    { h: "Slow Queries — top", type: "table",
      cols: ["Query", "Calls 1h", "Mean", "Max"],
      rows: [
        ["SELECT … FROM events WHERE payload @> $1", "212", "1.4s", "3.9s"],
        ["UPDATE sessions SET last_seen …", "1.8k", "1.1s", "2.2s"],
        ["SELECT count(*) FROM audit_log …", "12", "1.9s", "2.4s"],
      ]},
  ]},

"/security": { title: "Security Audit", sub: "Scans, compliance, findings — MOCK DATA",
  src: "Source: Trivy/Grype scans via Actions + Suricata alerts relay (pending)",
  stats: [
    { l: "Compliance Score", v: "91%", d: "CIS baseline", dir: "ok" },
    { l: "Critical Findings", v: "1", d: "openssl CVE — api base image", dir: "err" },
    { l: "High", v: "4", d: "-2 vs last scan", dir: "warn" },
    { l: "Last Scan", v: "3h", d: "nightly + on-push", dir: "ok" },
  ],
  sections: [
    { h: "Findings", type: "table",
      cols: ["ID", "Severity", "Component", "Finding", "Status"],
      rows: [
        ["CVE-2026-1187", B("CRITICAL","err"), "api-gateway:base", "openssl RCE — patch available", B("OPEN","err")],
        ["CVE-2026-0912", B("HIGH","warn"), "web-frontend", "npm transitive dep prototype pollution", B("OPEN","warn")],
        ["SIG-F-031", B("HIGH","warn"), "prod-api-02", "SSH password auth enabled", B("IN PROGRESS","warn")],
        ["SIG-F-030", B("MEDIUM","mut"), "staging VPC", "SG allows 0.0.0.0/0 :8080", B("OPEN","mut")],
        ["SIG-F-028", B("HIGH","warn"), "nas-01", "Suricata: repeated 4625-pattern probes", B("MONITORING","mut")],
      ]},
  ]},

"/api": { title: "API Monitoring", sub: "Latency percentiles, error rates, RPM — MOCK DATA",
  src: "Source: Prometheus histograms → JSON relay (pending)",
  stats: [
    { l: "Requests / min", v: "38.4k", d: "peak 61k", dir: "ok" },
    { l: "Error Rate", v: "0.41%", d: "SLO < 1%", dir: "ok" },
    { l: "p95 Latency", v: "184ms", d: "SLO < 250ms", dir: "ok" },
    { l: "p99 Latency", v: "412ms", d: "watch: /search", dir: "warn" },
  ],
  sections: [
    { h: "Endpoints", type: "table",
      cols: ["Endpoint", "RPM", "p50", "p95", "p99", "Err%"],
      rows: [
        ["GET /v2/items", "12.1k", "22ms", "96ms", "210ms", B("0.12","ok")],
        ["POST /v2/auth/token", "3.4k", "31ms", "88ms", "140ms", B("0.08","ok")],
        ["GET /v2/search", "6.2k", "84ms", "310ms", "690ms", B("0.94","warn")],
        ["POST /v2/orders", "2.2k", "45ms", "150ms", "300ms", B("0.22","ok")],
        ["GET /v2/metrics", "0.9k", "12ms", "40ms", "85ms", B("2.10","err")],
      ]},
  ]},

"/costs": { title: "Cloud Costs", sub: "Spend tracking with budget bars — MOCK DATA",
  src: "Source: AWS Cost Explorer daily export → S3 JSON (pending)",
  stats: [
    { l: "MTD Spend", v: "$1,284", d: "budget $1,800", dir: "ok" },
    { l: "Forecast", v: "$1,710", d: "95% of budget", dir: "warn" },
    { l: "vs Last Month", v: "+6%", d: "GPU node added", dir: "warn" },
    { l: "Savings Found", v: "$140/mo", d: "3 recommendations", dir: "ok" },
  ],
  sections: [
    { h: "Budgets — month to date", type: "budget", items: [
      ["EC2 / Compute", 620, 800], ["RDS / Storage", 240, 350],
      ["Data Transfer", 118, 200], ["SageMaker", 196, 250],
      ["Other", 110, 200],
    ]},
    { h: "Optimization Recommendations", type: "table",
      cols: ["Item", "Action", "Est. Savings"],
      rows: [
        ["prod-api-02 (m5.xlarge)", "Rightsize → m5.large (p95 CPU 41%)", "$62/mo"],
        ["staging fleet", "Stop nights + weekends via scheduler", "$48/mo"],
        ["unattached EBS ×3", "Delete after snapshot", "$30/mo"],
      ]},
  ]},
};

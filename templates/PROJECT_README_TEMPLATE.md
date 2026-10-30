<!--
  {{PROJECT_CODENAME}}
  {{ONE_LINE_DOMAIN_TAGS — e.g., Cyber-Physical Systems · Edge AI · RF Engineering}}
  Template: PROJECT_README_TEMPLATE v1.0 · Replace all {{PLACEHOLDERS}} · Delete instructional comments before publish
-->

<div align="center">
  <img src="./assets/{{PROJECT_BANNER}}.png" width="880" alt="{{PROJECT_NAME}}" />
</div>

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/Status-{{STATUS}}-39FF14?style=for-the-badge&labelColor=1a1a1a" alt="Status" />
  <img src="https://img.shields.io/badge/Version-{{vX.Y.Z}}-FF6B00?style=for-the-badge&labelColor=1a1a1a" alt="Version" />
  <img src="https://img.shields.io/badge/Phase-{{PHASE}}-FF6B00?style=for-the-badge&labelColor=1a1a1a" alt="Phase" />
  <img src="https://img.shields.io/badge/License-{{LICENSE}}-1a1a1a?style=for-the-badge&labelColor=000000" alt="License" />
</p>

<!--
  STATUS options:   CONCEPT · DESIGN · PROTOTYPE · ACTIVE · FIELD_TEST · MAINTAINED · ARCHIVED
  PHASE options:    SFR · PDR · CDR · Build · Integration · V%26V · Deployed   (use %26 for "&" inside badge text)
-->

---

## Abstract

<!--
  Write this like a technical paper abstract, 4–6 sentences, no marketing language:
  1. Problem statement — what gap or failure mode exists in the real world.
  2. Approach — what this system does and the core architecture in one breath.
  3. Differentiator — what makes this implementation survive real environments.
  4. Result / current state — what has been demonstrated, measured, or deployed.
-->

{{PROBLEM_SENTENCE}}. {{APPROACH_SENTENCE — architecture, key components, and integration boundary in one sentence}}. {{DIFFERENTIATOR_SENTENCE — self-hosted, auditable, degraded-network-tolerant, etc.}}. {{RESULT_SENTENCE — measured outcome, deployment state, or demonstrated capability with a number if one exists}}.

> **Design intent:** {{ONE_LINE_INTENT — e.g., "Operator-owned drone detection without cloud dependency or recurring licensing."}}

---

## Project Dashboard

<div align="center">

| Metric | Target | Current | Δ |
|:-------|:------:|:-------:|:--:|
| **Schedule** — {{MILESTONE_NAME}} | {{DATE}} | {{DATE_OR_%COMPLETE}} | {{ON_TRACK / +N days / −N days}} |
| **Budget / BOM Cost** | ${{TARGET}} | ${{ACTUAL}} | {{±$ or ±%}} |
| **{{KPI_1 — e.g., Detection Range}}** | {{VALUE_UNIT}} | {{VALUE_UNIT}} | {{±}} |
| **{{KPI_2 — e.g., Inference Latency p95}}** | {{VALUE_UNIT}} | {{VALUE_UNIT}} | {{±}} |
| **Test Coverage / V&V** | {{%}} | {{%}} | {{±}} |
| **Open Risks (High)** | 0 | {{N}} | — |

</div>

<!--
  Rules for this table:
  - Every metric must be measurable. If you can't measure it, it doesn't belong here.
  - "Δ" column is the honest one — do not leave it blank; write ON_TRACK explicitly.
  - Update the table on every milestone commit; stale metrics are worse than none.
-->

---

## Scope & Objectives

**In scope**

- {{OBJECTIVE_1 — verb-first, verifiable: "Detect Group 1 UAS at ≥ 2 km with Pd ≥ 0.9"}}
- {{OBJECTIVE_2}}
- {{OBJECTIVE_3}}

**Explicitly out of scope**

- {{EXCLUSION_1 — kill the scope creep here, in writing}}
- {{EXCLUSION_2}}

**Success criteria** — the project is *done* when: {{SINGLE_SENTENCE_EXIT_CRITERIA}}.

---

## System Architecture

<!--
  Text block diagram — keep it renderable in raw Markdown. Replace with your signal/data path.
-->

```text
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  {{SENSOR /      │────▶│  {{PROCESSING /  │────▶│  {{OUTPUT /      │
│   INGEST LAYER}} │     │   CONTROL LAYER}}│     │   DECISION LAYER}}│
└─────────────────┘     └──────────────────┘     └──────────────────┘
        │                        │                        │
        ▼                        ▼                        ▼
  {{INTERFACE_1}}          {{INTERFACE_2}}          {{INTERFACE_3}}
```

| Layer | Component | Interface / Protocol | Notes |
|:------|:----------|:---------------------|:------|
| {{LAYER}} | {{COMPONENT}} | {{e.g., MQTT / REST / SPI / 10GbE}} | {{failure mode, latency budget, or constraint}} |
| {{LAYER}} | {{COMPONENT}} | {{PROTOCOL}} | {{NOTE}} |

---

## Dependencies & Environment

### Runtime / Software

| Dependency | Version | Purpose | Pinned? |
|:-----------|:-------:|:--------|:-------:|
| {{e.g., Python}} | {{3.11+}} | {{Core runtime}} | ✅ |
| {{e.g., Docker / Compose}} | {{VERSION}} | {{Containerized deployment}} | ✅ |
| {{LIBRARY}} | {{VERSION}} | {{PURPOSE}} | {{✅ / ⚠️ floating}} |

### Hardware / Physical

| Item | Spec | Qty | Source | Notes |
|:-----|:-----|:---:|:-------|:------|
| {{e.g., Compute node}} | {{CPU/RAM/GPU}} | {{N}} | {{VENDOR}} | {{thermal/power constraint}} |
| {{e.g., Sensor}} | {{SPEC}} | {{N}} | {{VENDOR}} | {{lead time / supply risk}} |

### Environmental Requirements

- **Power:** {{e.g., 120 VAC + 12 VDC backup, ≤ 150 W steady-state}}
- **Network:** {{e.g., operates on ≤ 5 Mbps uplink; full function when air-gapped}}
- **Thermal / Enclosure:** {{e.g., −10 °C to 45 °C, IP54, passive cooling}}
- **RF / EMI:** {{e.g., coexists with 2.4/5 GHz WLAN; X-band emissions per Part 15}}
- **Security posture:** {{e.g., no outbound calls by default; all telemetry local-first}}

---

## Milestones & Roadmap

| ID | Milestone | Exit Criteria | Target | Status |
|:--:|:----------|:--------------|:------:|:------:|
| M1 | {{MILESTONE}} | {{VERIFIABLE_CRITERIA}} | {{DATE}} | {{🟢 / 🟡 / 🔴 / ✅}} |
| M2 | {{MILESTONE}} | {{CRITERIA}} | {{DATE}} | {{STATUS}} |
| M3 | {{MILESTONE}} | {{CRITERIA}} | {{DATE}} | {{STATUS}} |

---

## Risk Register

| ID | Risk | L | C | Score | Mitigation | Owner | Status |
|:--:|:-----|:-:|:-:|:-----:|:-----------|:-----:|:------:|
| R1 | {{RISK_STATEMENT — "If X, then Y, resulting in Z"}} | {{1–5}} | {{1–5}} | {{L×C}} | {{ACTIVE_MITIGATION}} | {{OWNER}} | {{Open / Watch / Closed}} |
| R2 | {{RISK}} | {{L}} | {{C}} | {{S}} | {{MITIGATION}} | {{OWNER}} | {{STATUS}} |

<!-- L = Likelihood, C = Consequence, 5×5 scale. Anything ≥ 12 gets a mitigation with a date, not a hope. -->

---

## Verification & Test

| Test | Method | Requirement Traced | Result | Evidence |
|:-----|:-------|:-------------------|:------:|:---------|
| {{T1 — e.g., Latency under load}} | {{Bench / Field / Sim / Analysis}} | {{OBJ_1}} | {{PASS / FAIL / PENDING}} | {{link to /test/results or issue #}} |
| {{T2}} | {{METHOD}} | {{OBJ}} | {{RESULT}} | {{EVIDENCE}} |

**Repro:** `{{SINGLE_COMMAND_TO_RUN_TEST_SUITE — e.g., make test / pytest -v / ./scripts/field_check.sh}}`

---

## Quick Start

```bash
# Clone
git clone https://github.com/{{GITHUB_HANDLE}}/{{REPO_NAME}}.git
cd {{REPO_NAME}}

# Configure
cp .env.example .env        # {{note any required secrets/paths}}

# Deploy
{{DEPLOY_COMMAND — e.g., docker compose up -d}}

# Verify
{{HEALTHCHECK_COMMAND — e.g., curl localhost:8080/health}}
```

---

## Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/{{TECH_1}}-FF6B00?style=for-the-badge&logoColor=white" alt="{{TECH_1}}" />
  <img src="https://img.shields.io/badge/{{TECH_2}}-39FF14?style=for-the-badge&logoColor=black" alt="{{TECH_2}}" />
  <img src="https://img.shields.io/badge/{{TECH_3}}-1a1a1a?style=for-the-badge&logoColor=39FF14" alt="{{TECH_3}}" />
  <img src="https://img.shields.io/badge/{{TECH_4}}-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="{{TECH_4}}" />
</p>

<!--
  Badge color scheme (keep consistent across your repos):
    FF6B00 (forge orange)  → domain/hardware badges
    39FF14 (neon green)    → AI/security badges
    1a1a1a (near-black)     → infrastructure/self-hosted badges
    Official brand colors  → named products (AWS 232F3E/FF9900, Python 3776AB, Docker 2496ED, Linux FCC624)
-->

---

## Changelog

| Version | Date | Change |
|:-------:|:----:|:-------|
| {{vX.Y.Z}} | {{YYYY-MM-DD}} | {{WHAT_CHANGED — one line, past tense}} |
| v0.1.0 | {{DATE}} | Initial architecture and baseline commit |

---

## Connect

<p align="center">
  <a href="https://github.com/{{GITHUB_HANDLE}}"><img src="https://img.shields.io/badge/GitHub-{{GITHUB_HANDLE}}-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="https://x.com/{{X_HANDLE}}"><img src="https://img.shields.io/badge/X-@{{X_HANDLE}}-000000?style=for-the-badge&logo=x&logoColor=white" alt="X" /></a>
  <a href="https://medium.com/@{{MEDIUM_HANDLE}}"><img src="https://img.shields.io/badge/Medium-@{{MEDIUM_HANDLE}}-12100E?style=for-the-badge&logo=medium&logoColor=white" alt="Medium" /></a>
</p>

---

<div align="center">
  <sub>{{PROJECT_CODENAME}} · Built for environments that punish fragility</sub>
</div>

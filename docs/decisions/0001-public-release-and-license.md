# docs/decisions/0001-public-release-and-license.md
Date: 2026-10-30   Status: proposed

## Decision
Publish as a public repository under the MIT license (template §4: MIT for public). Examples are fictional/mock; personal profile data, organization branding and internal hostnames/IPs are not carried. The PII guard (`scripts/pii-scan.sh`, hooks, CI) is a mandatory control; any owner deny-list stays outside the repo. History is a single orphan commit.

## Consequences
Anything not safe for the public never enters the tree; reviewed false positives are recorded in `config/pii-allowlist.txt`.

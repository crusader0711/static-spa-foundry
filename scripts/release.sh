#!/usr/bin/env bash
# Release integrity chain (Canonical Repository Structure Template v1.0 §6): tag → RELEASE_MANIFEST.json → SHA256SUMS (→ optional GPG sig).
# Tagging is skipped when NO_TAG=1. RELEASE_COMMIT overrides the recorded commit (baseline before the release commit exists).
set -euo pipefail
cd "$(dirname "$0")/.."
VERSION="${1:-${VERSION:-}}"
[ -n "$VERSION" ] || { echo "usage: scripts/release.sh vX.Y.Z"; exit 2; }
[[ "$VERSION" =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z.]+)?$ ]] || { echo "not SemVer: $VERSION"; exit 2; }
VERSION="$VERSION" ./scripts/build.sh
COMMIT="${RELEASE_COMMIT:-$(git rev-parse --short HEAD 2>/dev/null || echo nogit)}"
NOW="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
BUILT_BY="${CI:+ci}"; BUILT_BY="${BUILT_BY:-local}"
BUILDER="${GITHUB_ACTIONS:+github-actions}"; BUILDER="${BUILDER:-local}"
python3 - "$VERSION" "$NOW" "$COMMIT" "$BUILT_BY" "$BUILDER" <<'PY'
import hashlib, json, os, sys
v, now, commit, built_by, builder = sys.argv[1:]
arts = []
for f in sorted(os.listdir("dist")):
    p = os.path.join("dist", f)
    arts.append({"path": p, "sha256": hashlib.sha256(open(p, "rb").read()).hexdigest(), "size_bytes": os.path.getsize(p)})
m = {"name": "static-spa-foundry", "version": v.lstrip("v"), "released": now, "git_commit": commit, "artifacts": arts,
     "provenance": {"built_by": built_by, "builder_id": builder}}
json.dump(m, open("RELEASE_MANIFEST.json", "w"), indent=2); open("RELEASE_MANIFEST.json", "a").write("\n")
# dist/SHA256SUMS ships beside the release assets; the root SHA256SUMS covers only committed files so it verifies on a clean clone.
with open("dist/SHA256SUMS", "w") as out:
    for a in arts: out.write(f"{a['sha256']}  {os.path.basename(a['path'])}\n")
with open("SHA256SUMS", "w") as out:
    out.write(f"{hashlib.sha256(open('RELEASE_MANIFEST.json','rb').read()).hexdigest()}  RELEASE_MANIFEST.json\n")
print(f"[release] manifest: {len(arts)} artifacts")
PY
if [ "${GPG_SIGN:-0}" = "1" ]; then gpg --armor --detach-sign SHA256SUMS; fi
if git rev-parse --git-dir >/dev/null 2>&1 && [ "${NO_TAG:-0}" != "1" ]; then
  git tag -a "$VERSION" -m "release $VERSION" 2>/dev/null || echo "[release] tag $VERSION exists"
fi
echo "[release] verify committed files: sha256sum -c SHA256SUMS ; verify built artifacts: (cd dist && sha256sum -c SHA256SUMS)"

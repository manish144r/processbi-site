#!/usr/bin/env python3
"""
Deploy processbi-3d-deploy to processbi.com.au via Vercel API.
Run from the processbi-3d-deploy directory:
    python deploy_processbi.py
"""

import os, sys, json, base64, mimetypes, time
import urllib.request, urllib.error
from pathlib import Path

# ── Config ──────────────────────────────────────────────────────────────────
TEAM_ID      = "team_yze6KFOP792mMfampVb6mbGq"
PROJECT_ID   = "prj_Wnag8yg7ICxswmn05QY3nVGFDgxw"
DEPLOY_URL   = f"https://api.vercel.com/v13/deployments?teamId={TEAM_ID}"
ALIAS_DOMAIN = "processbi.com.au"

INCLUDE_EXTS = {".html", ".js", ".css", ".svg", ".png", ".ico",
                ".txt", ".xml", ".json", ".woff2", ".woff", ".ttf"}
EXCLUDE_PATTERNS = {
    ".md", ".py", ".log", ".sql", ".jsonl", ".bak",
    "screenshot", "deploy_log", "deploy_processbi",
    "forge_pm_queue", "run_forge_queue",
    "blog-pipeline-spec", "content-audit-report",
    "digital-marketing-plan", "linkedin-setup-guide",
    "outreach-playbook", "seo-keyword-research",
    "seo-optimization-report",
}

# ── Read token ───────────────────────────────────────────────────────────────
def get_token():
    # 1. env var
    t = os.environ.get("VERCEL_TOKEN")
    if t:
        return t
    # 2. secrets.env two levels up from this script
    candidates = [
        Path(__file__).parent.parent.parent / "NightFactory" / "secrets.env",
        Path(__file__).parent.parent / "secrets.env",
        Path(__file__).parent / "secrets.env",
    ]
    for path in candidates:
        if path.exists():
            for line in path.read_text().splitlines():
                if line.startswith("VERCEL_TOKEN="):
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
    sys.exit("ERROR: VERCEL_TOKEN not found. Set it as an env var or put it in secrets.env")

# ── Collect files ─────────────────────────────────────────────────────────────
def should_include(p: Path) -> bool:
    if p.suffix.lower() not in INCLUDE_EXTS:
        return False
    name = p.stem.lower()
    for pat in EXCLUDE_PATTERNS:
        if pat in name or pat in str(p).lower():
            return False
    return True

def collect_files(root: Path):
    files = []
    for p in root.rglob("*"):
        if p.is_file() and should_include(p):
            rel = p.relative_to(root)
            # skip hidden dirs except .nojekyll
            parts = rel.parts
            if any(part.startswith(".") and part != ".nojekyll" for part in parts[:-1]):
                continue
            files.append((rel, p))
    return files

# ── API helper ────────────────────────────────────────────────────────────────
def api(method, url, token, body=None):
    data = json.dumps(body).encode() if body else None
    req = urllib.request.Request(
        url, data=data, method=method,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }
    )
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        err = e.read().decode()
        print(f"HTTP {e.code}: {err[:500]}")
        raise

# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    root = Path(__file__).parent
    token = get_token()
    print(f"Token: ...{token[-6:]}")
    print(f"Project: {PROJECT_ID}")
    print(f"Team:    {TEAM_ID}")
    print()

    files = collect_files(root)
    print(f"Collecting {len(files)} files...")

    payload_files = []
    for rel, path in files:
        content = path.read_bytes()
        enc = base64.b64encode(content).decode()
        mime = mimetypes.guess_type(str(path))[0] or "application/octet-stream"
        # Vercel expects forward-slash paths
        file_path = str(rel).replace("\\", "/")
        payload_files.append({
            "file": file_path,
            "data": enc,
            "encoding": "base64",
        })
        print(f"  + {file_path} ({len(content):,} bytes)")

    print(f"\nDeploying {len(payload_files)} files to Vercel...")
    payload = {
        "name": "processbi",
        "target": "production",
        "files": payload_files,
    }

    resp = api("POST", DEPLOY_URL, token, payload)
    deploy_id = resp.get("id")
    deploy_url = resp.get("url")
    print(f"\nDeployment created: {deploy_id}")
    print(f"URL: https://{deploy_url}")

    # ── Poll for READY ────────────────────────────────────────────────────────
    print("\nWaiting for READY", end="", flush=True)
    poll_url = f"https://api.vercel.com/v13/deployments/{deploy_id}?teamId={TEAM_ID}"
    for _ in range(60):
        time.sleep(5)
        d = api("GET", poll_url, token)
        state = d.get("readyState", d.get("state", "?"))
        print(f" [{state}]", end="", flush=True)
        if state == "READY":
            print("\n✓ READY")
            break
        if state in ("ERROR", "CANCELED"):
            print(f"\n✗ Deployment failed: {state}")
            sys.exit(1)
    else:
        print("\nTimeout waiting for READY")
        sys.exit(1)

    # ── Check / set domain alias ──────────────────────────────────────────────
    aliases = d.get("alias", [])
    print(f"\nAliases: {aliases}")
    if ALIAS_DOMAIN not in aliases:
        print(f"Setting alias {ALIAS_DOMAIN}...")
        alias_url = f"https://api.vercel.com/v13/deployments/{deploy_id}/aliases?teamId={TEAM_ID}"
        api("POST", alias_url, token, {"alias": ALIAS_DOMAIN})
        print(f"✓ Alias set")
    else:
        print(f"✓ {ALIAS_DOMAIN} already aliased")

    # ── Verify live ───────────────────────────────────────────────────────────
    print("\nVerifying live site...")
    check_url = f"https://{ALIAS_DOMAIN}/shared-nav.js?v=6"
    req = urllib.request.Request(check_url)
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            body = r.read().decode()
            if "nb-arrow" in body:
                print(f"✓ shared-nav.js contains nb-arrow")
            else:
                print(f"✗ shared-nav.js missing nb-arrow")
    except Exception as e:
        print(f"Could not fetch {check_url}: {e}")

    print(f"\n{'='*60}")
    print(f"Deployment ID : {deploy_id}")
    print(f"Domain        : https://{ALIAS_DOMAIN}")
    print(f"Deploy URL    : https://{deploy_url}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()

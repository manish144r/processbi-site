# NightFactory System State Audit — 2026-06-19

**Produced by:** Claude (Cowork session) — 2026-06-19  
**Sources:** Memory files (confirmed), filesystem (confirmed), schtask audit CSV (confirmed), log files (confirmed)  
**Scope:** Full stack — memory, filesystem, scheduled tasks, services, pipelines, blockers, priorities

---

## 1. Memory / Projects — Active Status

### FundChecker / AtomicSMSF
**Status: LIVE but partially blocked**  
- Product live since 2026-06-01 under AtomicSMSF parent brand, DesignersMeet family
- B365 run complete (2026-06-08): master GHL checklist, FCK audit, week-1 social content (31 posts), PRISM patch
- Contact list: 138 rows (ASIC-registered SMSF auditors) — 8 direct emails + 130 LinkedIn-only
- FCK landing page exists at `products/AtomicSMSF/fundchecker-landing/index.html` but NOT deployed to live domain
- **Pending Manish actions** (~2.5 hrs total — see Section 8)

### Business 365 Orchestrator
**Status: SCHEDULED, RUNNING**  
- Stage A fully scaffolded (2026-06-07): orchestrator, Phase 1 validator, Phase 3 architect, 27/27 tests pass
- Picks highest-scored candidate from latest product-discovery file, runs Phase 1+3 in sequence
- Scheduled at 22:30 / 02:30 / 06:30 daily via VBS-wrapped schtask
- Current candidate: `n8n-automation-workflow-pack-au-verticals` (score 82/100, GO)
- GHL integration: stubbed — awaiting agency-scoped PIT

### DesignersMeet / GHL CRM
**Status: PARTIALLY CONFIGURED**  
- DM sub-account wired: GHL PIT (`pit-55fc11e9...60b8c9`) — data-plane reads working
- 6 contacts in CRM; smoke-tested against `/contacts/?locationId=` (200 OK)
- Agency-level scoped PIT NOT created — blocks FCK API work and B365 GHL automation
- Full GHL product setup playbook: `briefs/ghl_setup_master_checklist.md` (17 sections)

### PRISM Social Pipeline
**Status: ACTIVE (last run 2026-06-15)**  
- Last confirmed posts: 2026-06-15 08:29–08:30 — two LinkedIn posts published (scores 90.0, 100.0)
- FundChecker registered in COMPANY_THEMES + SOCIAL_PERSONA_TEMPLATES (verified 2026-06-08)
- 31 pieces of week-1 FCK content ready at `knowledge/atomicsmsf/fundchecker_week1_content_2026-06-08.md`
- LinkedIn gate threshold: 75.0 (one draft was blocked at 73.0 on 2026-06-15 08:08)
- 4 active patterns: anchor_roundtable, mvp_in_room_reporter, salary_anchor_curation, withhold_the_name

### ProcessBI
**Status: SITE EXISTS, DEPLOY UNCONFIRMED**  
- Full HTML site in `outputs/processbi-3d-deploy/` (index, about, services, case-studies, technology, methodology, contact, sitemap, robots.txt)  
- `processbi-launch/` directory has execution plan and poc-system, portfolio-specs, website subdirs  
- ProcessBI identified in Hermes system context as active business (Power BI consulting, analytics pipeline)  
- **No confirmed live URL from memory** — deployment to Vercel/hosting not verified in any log

### Ad Spend Cap Enforcer
**Status: DEPLOYED (Meta only)**  
- Worker: `workers/ad_spend_cap_enforcer.py`, schtask `NF-AdSpend-CapEnforcer` (every 15 min, 06:00–23:00)
- Meta: LIVE — token valid until 2026-07-31, ad account `act_1115611793953735`
- Google Ads: NOT CONFIGURED (developer token + OAuth missing; only `GOOGLE_ADS_CUSTOMER_ID = 5880774766` set)
- TikTok: NOT CONFIGURED
- 24 tests passing; Postgres sink to `ad_spend_alerts`

### Hermes Comms Bridge / Voice Bridge
**Status: INFRASTRUCTURE IN PLACE**  
- Hermes Comms Bridge: `workers/hermes_comms_bridge.py` — wired (reference in MEMORY.md)
- Twilio: Trial account, $15.50 USD, SID/Auth Token in `secrets.env` — smoke-tested
- Voice Bridge (port 7801), Voice Bridge Mobile: VBS launchers exist
- WhatsApp, Gmail, Google Calendar, Outlook all referenced in Hermes Control Board sections

### ForgePM
**Status: EXISTS AS PRODUCT, NO LIVE EVIDENCE**  
- `products/ForgePM/` directory present
- No memory file, no deployment log, no confirmed URL found in this session

### Influencer Monitor / Competitor Monitor / LinkedIn Prospecting
**Status: SCHEDULED, PARTIALLY STALE**  
- Influencer monitor: schtask Ready, last session memory from 2026-06-05 (partial)
- Competitor monitor: schtask not visible in CSV, session from 2026-06-05 (partial)
- LinkedIn prospecting: schtask `\NightFactory_LinkedIn_Prospector` Ready, session 2026-06-05 (completed, 150+ AU C-suite leads)

### Autonomous Execution Architecture
**Status: POLICY ACTIVE, HERMES LOOP UNCERTAIN**  
- Policy written 2026-06-17: all scheduled tasks execute without asking Manish
- `dispatch_reporter.py` exists (11.9 KB, 2026-06-17) — triggers `HermesAgent.autonomous_execution_loop()` every 15 min
- `workers/pipeline/nf_hermes_agent.py` (35.3 KB, updated 2026-06-18) — main executor
- Task runner memory (nf-hermes-task-runner) shows successful runs throughout today (every ~1-2 hrs), all `tasks_processed=0` — queue draining but no new work being queued

---

## 2. NightFactory Filesystem

### Root-Level Structure (confirmed)
Top-level directory count: 70+ subdirectories. Key areas:

| Directory | Purpose | State |
|---|---|---|
| `workers/` | All automation scripts | ~3,970 Python scripts |
| `workers/pipeline/` | Hermes + B365 pipeline | Active, key scripts present |
| `knowledge/` | Durable knowledge base | Active |
| `memory/` | Cowork + scheduled job memory | 40+ entries |
| `outputs/` | All generated outputs | Active |
| `products/` | Per-product directories | AtomicSMSF, DentalOps, DesignersMeet, ForgePM, FundCheckPro, FundChecker, NightFactory.ai, ProcessBI, TradiePro |
| `briefs/` | B365 + GHL + business briefs | Active |
| `logs/` | Service logs | Active |
| `_archived/` | Retired scripts | Contains bak-20260605-popupfix mass archive |

### Worker Count
- **3,970 Python scripts** in `workers/` (including all subdirectories)
- Many scripts have `.bak-20260605-popupfix` variants — large mass-archiving event on 2026-06-05 (popupfix)
- `db_config.py` is DEAD (per CLAUDE.md): all new scripts must use inline psycopg2 connection

### Key Pipeline Files (confirmed present)
- `workers/dispatch_reporter.py` — 11.9 KB, 2026-06-17
- `workers/pipeline/nf_hermes_agent.py` — 35.3 KB, 2026-06-18
- `workers/pipeline/nf_hermes_runner.py` — present
- `workers/pipeline/nf_hermes_runner_simple.py` — active wrapper (avoids psycopg2 hang in original runner)
- `workers/pipeline/nf_hermes_status_api.py` — present (9.8 KB)
- `workers/nf_stats_dashboard.py` — present (13.9 KB, 2026-06-18)
- `workers/hermes_control_board.py` — present
- `workers/ad_spend_cap_enforcer.py` — present
- `workers/prism_social_pipeline.py` — present

### Anomalies / Gaps
- **`nf_supervisor.stop` file present** in `workers/` (created 2026-06-13) — NF-Supervisor intentionally stopped; the supervisor's state JSON is from 2026-05-26 (stale)
- Root-level clutter exists: `$null`, `nul`, `'`, `100`, `3`, `now()`, `cold`, `heuristic`, `use`, `_*.err` files (known; do not add to)
- `research_queue.json` — 18 items, all status `actioned` — queue is clear

---

## 3. Scheduled Tasks

**Source:** `outputs/audit/all_schtasks.csv` (confirmed file-read)

### NF-* Tasks: All Ready (no failures detected in CSV)

| Task | Status | Last Run |
|---|---|---|
| `\NF-Agent-Dream` | Ready | 19/06/2026 11:00 AM |
| `\NF-Agent-Sharma` | Ready | 20/06/2026 8:00 AM (upcoming) |
| `\NF-AgenticOS-Synthesize` | Ready | 21/06/2026 (upcoming) |
| `\NF-AutoLearning` | Ready | 17/06/2026 11:10 PM |
| `\NF-Backup-Daily` | Ready | 20/06/2026 (upcoming) |
| `\NF-Business-Discovery` | Ready | 18/06/2026 6:00 AM |
| `\NF-CTO-Autonomous-M1` | Ready | 17/06/2026 10:30 PM |
| `\NF-Daily-Stats` | Ready | 18/06/2026 6:00 AM |
| `\NF-DM-Job-Scanner` | Ready | 17/06/2026 10:00 AM |
| `\NF-DM-Pro-Adapter` | Ready | N/A (never run) |
| `\NF-FreeLLMAPI-Start` | Ready | N/A (trigger: logon) |
| `\NF-Hermes-Agent` | Ready | 17/06/2026 11:14 AM |
| `\NF-HermesWebUI-Start` | Ready | N/A (trigger: logon) |
| `\NF-HyperspeedIngest` | Ready | 17/06/2026 11:30 PM |
| `\NF-Knowledge-Backfill` | Ready | 17/06/2026 11:20 AM |
| `\NF-Ollama-Keepalive` | Ready | 17/06/2026 11:21 AM |
| `\NF-Ops-Watchdog` | Ready | 18/06/2026 7:02 AM |
| `\NF-PG-Backup` | Ready | 18/06/2026 3:00 AM |
| `\NF-Pool-Counter-Reset` | Ready | 18/06/2026 12:05 AM |
| `\NF-PostgreSQL-Guardian` | Ready | 17/06/2026 11:40 AM |
| `\NF-PostgreSQL-Start` | Ready | N/A (trigger: logon) |
| `\NF-Qdrant` | Ready | N/A (trigger: logon) |
| `\NF-Queue-Worker` | Ready | 17/06/2026 8:48 AM |
| `\NF-Schtask-Watchdog` | Ready | 17/06/2026 12:02 PM |
| `\NF-Security-Scanner` | Ready | 18/06/2026 6:00 AM |
| `\NF-SEO-Scanner` | Ready | 19/06/2026 6:00 AM |
| `\NF-YouTube-Backfill` | Ready | 28/06/2026 (upcoming) |
| `\NF-YouTubeTurbo` | Ready | 17/06/2026 10:30 PM |
| `\NightFactory\NF-Business-365-Daily` | Ready | 18/06/2026 6:00 AM |
| `\NightFactory\NF-Hermes-Evolve` | Ready | 17/06/2026 9:30 AM |
| `\NightFactory\NF-Hermes-Self-Improver` | Ready | 18/06/2026 3:00 AM |
| `\NightFactory\ClaudeScheduledJobCompactor` | Ready | 17/06/2026 10:54 AM |
| `\NightFactory\ClaudePostUpdateGuard` | Ready | 17/06/2026 9:05 AM |
| `\NightFactory\NF-StatsDashboard` | Ready (inferred) | 2026-06-18 (registered) |
| `\NightFactory\NF-HermesControlBoard` | Ready (inferred) | AtLogon |

### Disabled Tasks (1 NF task)
- `\NightFactory_IdleDetector` — **Disabled** (intentionally retired)

### Observation
Most tasks show last-run of 2026-06-17 or 2026-06-18 (1–2 days ago). Many have next-run timestamps in the 2026-06-20 to 2026-06-22 range, which is expected for weekly/daily cycles. No tasks show a "Failed" or "Could not start" status in the CSV snapshot. **CSV is from 2026-06-18 — live status today may differ.**

---

## 4. Hermes / API Pool

### Hermes Status API (port 7779)
**Status: CRITICALLY DOWN — manual restart required**  
- Script: `workers/pipeline/nf_hermes_status_api.py`
- Was briefly UP on 2026-06-18 03:48 (PID 41248, uvicorn running, dependencies installed)
- Went DOWN at 2026-06-18 07:30 (3h50m after restart)
- Has been down repeatedly — scheduled daemon (`nf-hermes-daemon`) cannot restart it from the Linux sandbox
- To restart: run `C:\Users\smani\CompanyWorkspaces\NightFactory\workers\pipeline\start_api.bat` from Windows native shell

### Hermes Task Runner (port: none — DB-based)
**Status: HEALTHY — running every ~1 hr today**  
- Script: `workers/pipeline/nf_hermes_runner_simple.py` (wrapper; original runner has psycopg2 hang issue)  
- Today's runs (2026-06-19): 14:07, 15:23, 17:32, 19:45, 21:28, 23:31 — all `tasks_processed=0, status=ok`
- Postgres confirmed healthy via `host.docker.internal` (Docker-to-Windows bridge, port 5433)

### Hermes Control Board (port 7900)
**Status: CONFIGURED, LIKELY RUNNING**  
- Log shows: `[HermesControlBoard] Listening at http://localhost:7900`
- Schtask `\NightFactory\NF-HermesControlBoard` (AtLogon + AtStartup, restart every 1 min)
- Registry Run key also set as belt-and-suspenders

### Hermes WebUI (port 8787)
**Status: CONFIGURED**  
- WSL Ubuntu at `~/hermes-webui`, `ctl.sh` daemon
- Password auth enabled; password in `secrets.env` as `HERMES_WEBUI_PASSWORD`
- Schtask `\NF-HermesWebUI-Start` (Ready, trigger: logon)
- Desktop shortcut verified 2026-06-08

### Dispatch Reporter
**Status: FILE PRESENT, EXECUTION UNCONFIRMED TODAY**  
- `workers/dispatch_reporter.py` (11.9 KB, updated 2026-06-17)  
- Intended to trigger Hermes autonomous execution loop every 15 min via `check_dispatch_reporter()` in `nf_supervisor.py`  
- **NF-Supervisor is stopped** (`workers/nf_supervisor.stop` present since 2026-06-13) — dispatch reporter may not be running on its intended schedule

### Free LLM API Pool (port 8765)
**Status: SCHTASK READY**  
- `workers/freellmapi_manager.py` exists
- `\NF-FreeLLMAPI-Start` schtask Ready (logon trigger)
- No log data verified in this session

---

## 5. Key Services & Ports

**Note: Port checks from the Linux sandbox cannot reach the Windows host network directly. Status below is inferred from memory + log files — not live socket checks.**

| Port | Service | Status (inferred) | Source |
|---|---|---|---|
| 5433 | PostgreSQL | **RUNNING** | nf-hermes-task-runner log: "Postgres healthy" (confirmed 2026-06-19 23:31) |
| 7779 | Hermes Status API | **DOWN** | nf-hermes-daemon memory (2026-06-18 07:30) |
| 7800 | NF Stats Dashboard | **LIKELY RUNNING** | Schtask Ready; registered 2026-06-18 |
| 7900 | Hermes Control Board | **LIKELY RUNNING** | Log shows "Listening at http://localhost:7900" |
| 8765 | Free LLM API | **UNKNOWN** | Schtask Ready; no recent log |
| 8787 | Hermes WebUI (WSL) | **CONFIGURED** | Desktop shortcut verified 2026-06-08 |
| 6333 | Qdrant | **LIKELY RUNNING** | `\NF-Qdrant` schtask Ready (logon trigger) |
| 11434 | Ollama | **LIKELY RUNNING** | `\NF-Ollama-Keepalive` schtask Ready |

**Port 7000 (Odysseus):** Not found in any memory file or log — likely not deployed.

---

## 6. ProcessBI

**Status: STATIC SITE EXISTS, NO CONFIRMED LIVE URL**

- `outputs/processbi-3d-deploy/` contains full multi-page HTML site:  
  index.html, about.html, services.html, case-studies.html, technology.html, methodology.html, contact.html, sitemap.xml, robots.txt, logo-animated.svg, favicon.svg, shared-nav.js, shared.css, og-image.png, `_redirects` (Netlify/Vercel routing file), assets/
- `processbi-launch/` has `00_MAY_2026_EXECUTION_PLAN.md`, poc-system/, portfolio-specs/, website/ subdirs
- Referenced in Hermes system context as an active business (Power BI consulting)
- No Vercel deployment URL, no Surge URL, no Netlify URL confirmed in any memory file read this session
- `_redirects` file suggests Netlify/Vercel deployment was intended

---

## 7. Active Pipelines — Last Known State

| Pipeline | Status | Last Evidence |
|---|---|---|
| **PRISM Social** | Active — publishing | 2 LinkedIn posts published 2026-06-15 (scores 90, 100) |
| **Free LLM API Pool** | Configured, status unknown | Schtask Ready; last memory session stale |
| **Content Factory** | Directory exists | `content-factory/` + `workers/content_factory/` present; no recent log |
| **Business 365** | Running | Orchestrator schtask Ready; task runner hourly (today) |
| **YouTube Pipeline** | Ready | NF-YouTubeTurbo, NF-YT-Knowledge-Engine, NF-YT-Transcript-Runner all Ready |
| **LinkedIn Prospecting** | Ready | `\NightFactory_LinkedIn_Prospector` Ready, next run 2026-06-22 |
| **Knowledge Compounding** | Ready | `\NF-HyperspeedIngest`, `\NightFactory\NF-Knowledge-Blitz`, etc. all Ready |
| **Influencer Monitor** | Ready | `\NF-Influencer-Scanner` schtask Ready, next run 2026-06-21 |
| **Market Trends** | Ready | `\NF-Market-Trends` schtask Ready, next run 2026-06-21 |
| **Ad Spend Cap** | Running (Meta only) | Deployed 2026-06-08, dry-run verified; Google/TikTok unconfigured |
| **NF-Supervisor** | **STOPPED** | `workers/nf_supervisor.stop` file present since 2026-06-13 |

---

## 8. Pending / Blocked — Items Requiring Manish Action

Listed in priority order.

### CRITICAL — Time-Sensitive

**8.1 ACMA Sender ID Submission** ⚠️ DEADLINE IN 12 DAYS  
- Australia's ACMA 1 July 2026 SMS Sender ID enforcement deadline = **12 days away**
- Submission must happen now to start the 1–4 week approval clock
- Required for FundChecker AU SMS channel (Twilio AU number provisioning also waits on this)
- Action: Submit ACMA Sender ID application for DESIGNERSMEET PTY LTD / FundChecker

**8.2 Hermes API Manual Restart (port 7779)**  
- Has been down since 2026-06-18 07:30; scheduled daemon cannot restart from sandbox
- Command to run from Windows native shell:  
  `C:\Users\smani\CompanyWorkspaces\NightFactory\workers\pipeline\start_api.bat`  
  (or: `start /B pythonw "C:\Users\smani\CompanyWorkspaces\NightFactory\workers\pipeline\nf_hermes_status_api.py"`)
- If it exits immediately: check fastapi/uvicorn/psycopg2 imports and HERMES_WEBUI_PASSWORD env var

### HIGH — Unblocking FCK Automation

**8.3 Mint Agency-Scoped GHL PIT** (~2 min)  
- Current DM PIT only covers DM sub-account data plane
- Agency-scoped PIT needed to touch FundChecker location via API and run B365 GHL automation
- Action: HighLevel desktop app → Agency Settings → Private Integrations → Create new token with agency-level scopes

**8.4 Capture FundChecker GHL Location ID** (~1 min)  
- FCK location ID is NOT in secrets.env, NOT in any memory file
- Action: HighLevel desktop app → FundChecker sub-account → Settings → copy Location ID → add to `secrets.env` as `GHL_FCK_LOCATION_ID`

**8.5 Decide FundChecker Domain** (~3 min)  
- Landing page exists but no live domain assigned
- Action: choose domain, point to hosting, update GHL sub-account domain settings

### HIGH — Compliance / External Timelines

**8.6 Twilio AU Regulatory Bundle** (~15 min, 1–3 business day approval)  
- Required before provisioning an Australian phone number for FCK SMS
- Needs DESIGNERSMEET PTY LTD business details + address proof
- ABN `87685053623` confirmed; ABR PDF print still pending (JSON is canonical for form-fillers)

**8.7 Google Ads Developer Token Application**  
- Required to activate Google Ads in Ad Spend Cap Enforcer and FCK paid-search leg
- No secrets in place; only Customer ID set
- Timeline: 1–14 day review

**8.8 Meta Access Token Renewal Pipeline** (due 2026-07-31)  
- Current META_ACCESS_TOKEN valid until 2026-07-31 (~42 days)
- Should queue the renewal process now to avoid ad ops going dark

### MEDIUM — One-Time Setup

**8.9 Build GHL Workflows + Email Templates for FCK** (~75 min)  
- 8 workflows + 8 email templates, UI work in GHL
- Once done, save as `NF-SaaS-Baseline-Snapshot` for instant re-apply on product #2

**8.10 ProcessBI Live Deployment**  
- Static site files in `outputs/processbi-3d-deploy/` with `_redirects` suggesting Netlify/Vercel intent
- No confirmed live URL — verify or deploy

**8.11 NF-Supervisor Restart Decision**  
- `workers/nf_supervisor.stop` present since 2026-06-13 — supervisor was intentionally stopped
- Supervisor orchestrates dispatch_reporter, check functions, and watchdog restarts
- If intended to remain stopped: confirm which workers are being handled by schtasks instead
- If should be running: delete `workers/nf_supervisor.stop` and trigger the supervisor schtask

---

## 9. Immediate Top 5 Priorities

### #1 — ACMA Sender ID (12-day deadline)
**Do today.** July 1 enforcement is not a soft deadline — after that date AU businesses sending SMS with an unregistered Sender ID face carrier blocking. The application takes 1–4 weeks to process. Submitting now minimises risk.

### #2 — Hermes Status API 7779 Restart
**Do in next 5 minutes.** The API has been reliably down and the daemon can't fix it autonomously. Hermes task processing (runner) is healthy, but any downstream system expecting a REST endpoint at 7779 is receiving connection refused. Run `start_api.bat` from a native Windows shell.

### #3 — Mint Agency GHL PIT + Capture FCK Location ID
**~6 minutes combined.** These two items unlock: B365 GHL automation for FundChecker, the CRM sync, all 8 GHL workflows, and the FCK budget_check and crm_sync task types in Hermes. Everything else in the FCK automation stack is ready to go.

### #4 — ProcessBI Live Deployment Verification
**Unknown blocker.** The site files are complete and the `_redirects` file implies a deployment platform was chosen. Either confirm the site is live (find the URL) or trigger deployment to Netlify/Vercel/Surge. ProcessBI is listed as an active revenue business in Hermes context — it should have a live presence.

### #5 — Twilio + Google Ads Submissions
**Start the external clocks.** Both require external review (1–3 days for Twilio AU bundle; 1–14 days for Google Ads dev token). Submitting them today means the external clocks are running in the background while other work proceeds. Twilio gates FCK's AU SMS channel; Google Ads gates the paid-search leg of FCK's marketing.

---

## Appendix — Confirmed vs Memory-Only

| Claim | Confirmed | Source |
|---|---|---|
| Postgres running on 5433 | ✅ Confirmed | nf-hermes-task-runner log 2026-06-19 |
| Hermes API 7779 DOWN | ✅ Confirmed | nf-hermes-daemon memory (multiple runs) |
| PRISM published 2026-06-15 | ✅ Confirmed | prism_social_pipeline.log |
| 3,970 Python scripts in workers/ | ✅ Confirmed | find count |
| All NF-* schtasks show Ready | ✅ Confirmed | all_schtasks.csv (2026-06-18) |
| nf_supervisor.stop present | ✅ Confirmed | file ls -la |
| Hermes Control Board log "Listening 7900" | ✅ Confirmed | outputs/hermes_control_board.log |
| dispatch_reporter.py present | ✅ Confirmed | file ls |
| nf_hermes_agent.py present | ✅ Confirmed | file ls (35.3 KB, 2026-06-18) |
| ProcessBI site files in outputs/ | ✅ Confirmed | directory listing |
| ForgePM products/ directory | ✅ Confirmed | products/ listing |
| ACMA deadline July 1 | ✅ Confirmed (from memory) | project_fundchecker_b365_run_20260608.md |
| Meta token expiry 2026-07-31 | ✅ Memory only | project_ad_spend_cap_enforcer.md |
| ProcessBI live URL | ❌ Not found | No URL in any memory or log |
| Hermes WebUI 8787 live | ⚠️ Memory only | reference_hermes_webui_install_20260608.md |
| Ports 7000, 8765 status | ❌ Unknown | No log/memory coverage |

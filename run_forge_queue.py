"""
Insert all 18 Forge PM feature gaps into agent_task_queue
Reads secrets from NightFactory/workers/secrets.env
"""
import os, sys, json, re
from datetime import datetime, timezone

# Load secrets.env
secrets_path = r"C:\Users\smani\CompanyWorkspaces\NightFactory\workers\secrets.env"
env = {}
try:
    with open(secrets_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                k, v = line.split('=', 1)
                env[k.strip()] = v.strip().strip('"').strip("'")
except Exception as e:
    print(f"Could not read secrets.env: {e}")

# DB connection
try:
    import psycopg2
except ImportError:
    import subprocess, sys
    subprocess.run([sys.executable, "-m", "pip", "install", "psycopg2-binary", "--break-system-packages", "-q"])
    import psycopg2

DB_HOST = env.get("NF_DB_HOST", env.get("DB_HOST", "localhost"))
DB_PORT = env.get("NF_DB_PORT", env.get("DB_PORT", "5433"))
DB_NAME = env.get("NF_DB_NAME", env.get("DB_NAME", "nightfactory"))
DB_USER = env.get("NF_DB_USER", env.get("DB_USER", "postgres"))
DB_PASS = env.get("NF_DB_PASS", env.get("DB_PASS", env.get("POSTGRES_PASSWORD", "postgres")))

print(f"Connecting to {DB_HOST}:{DB_PORT}/{DB_NAME} as {DB_USER}")

tasks = [
    # Critical
    ("forge_pm_hermes_endpoint_wiring", 1, "Hermes AI Endpoint Wiring", "Critical", "2 days",
     "Wire Hermes API (port 7779) into the existing AI Hub scaffold. UI is already built — needs endpoint configured, auth headers, streaming response handler, and fallback error states.", True),
    ("forge_pm_kanban_board", 1, "Kanban Board View", "Critical", "3 days",
     "Add Kanban view alongside Gantt/list views. Columns map to task status. Drag-and-drop, WIP limits, swimlanes by assignee or sprint, card quick-edit.", False),
    ("forge_pm_automation_rules_engine", 1, "Automation / Workflow Rules Engine", "Critical", "5 days",
     "No-code automation engine: IF trigger THEN action. 10 trigger types, 8 action types, 10 pre-built templates, DB-backed rule storage, event bus evaluation.", True),
    ("forge_pm_github_integration", 1, "GitHub Integration", "Critical", "3 days",
     "Bi-directional GitHub sync: link PRs/commits to tasks via branch naming. Show PR status on cards. Auto-update status on merge. GitHub Actions webhook for CI/CD status.", False),
    ("forge_pm_velocity_predictive_analytics", 1, "Velocity & Predictive Analytics", "Critical", "3 days",
     "Sprint velocity tracking, 6-sprint rolling average, predictive burndown via linear regression, scope creep detection, capacity vs commitment ratio. Feeds Hermes Risk Radar.", True),
    # High
    ("forge_pm_time_tracking", 2, "Time Tracking", "High", "2 days",
     "Built-in start/stop timer on every task. Manual time log with date+note. Total logged vs estimated hours at task and project level. CSV export. EVM cost variance integration.", False),
    ("forge_pm_document_wiki_layer", 2, "Document / Wiki Layer", "High", "4 days",
     "Rich-text wiki per project: nested pages, Markdown, task @mentions, image uploads, version history. TipTap/ProseMirror editor. Searchable. Hermes can summarise or generate docs.", True),
    ("forge_pm_mobile_pwa", 2, "Native Mobile PWA", "High", "3 days",
     "Service Worker offline cache for current sprint. Add-to-homescreen. Web Push notifications. 375px-optimised layout focused on daily standup workflow.", False),
    ("forge_pm_slack_teams_notifications", 2, "Slack / Teams Notifications", "High", "2 days",
     "Incoming Webhook integration for Slack and Teams. Notify on assignment, blocked status, @mentions, sprint events, overdue tasks, PR merges. Per-user preferences.", False),
    ("forge_pm_custom_fields", 2, "Custom Fields", "High", "3 days",
     "Admin-defined fields: text, number, date, select, multi-select, URL, person. JSONB storage in Postgres. Filterable, exportable. Pre-built templates for common verticals.", False),
    ("forge_pm_recurring_tasks", 2, "Recurring Tasks", "High", "1 day",
     "Recurring task schedules: daily, weekly, bi-weekly, monthly, custom. Auto-create next instance on completion. Recurrence badge on cards. Cron-based scheduling.", False),
    # Medium
    ("forge_pm_dependency_graph_visualiser", 3, "Dependency Graph Visualiser", "Medium", "3 days",
     "Force-directed graph of task dependencies (blocks/blocked-by). Status color coding. Critical path highlight. Sprint risk chains. PNG export. Complements Gantt CPM.", True),
    ("forge_pm_budget_tracking", 3, "Budget Tracking", "Medium", "2 days",
     "Project budget: total budget, spend tracking via hours x rate + expenses, burn rate, forecast to completion, variance. Integrates with EVM suite. Role-based visibility.", False),
    ("forge_pm_client_portal", 3, "Client Portal", "Medium", "4 days",
     "Read-only external portal via magic link. Project status, milestones, issues, activity. White-label. Client comment thread maps to internal tasks. Agency/consultancy focused.", False),
    ("forge_pm_resource_levelling", 3, "Resource Levelling", "Medium", "3 days",
     "Detect over-allocation. Enhance capacity heatmap. Suggest redistribution. Drag-to-reassign. Hermes suggests optimal allocation based on skills and historical velocity.", True),
    ("forge_pm_dark_mode", 3, "Dark Mode", "Medium", "1 day",
     "Full dark mode via CSS custom properties / Fabric theme tokens. System prefers-color-scheme support. Toggle in user preferences. Forge fire icon shines on dark backgrounds.", False),
    ("forge_pm_guest_access", 3, "Guest Access", "Medium", "2 days",
     "Email-based guest invitations, no M365 required. View-only or can-comment roles. Time-limited with expiry. Audit log. Essential for agency workflows and client collaboration.", False),
    ("forge_pm_advanced_search", 3, "Advanced Search", "Medium", "1 day",
     "Global search across tasks, comments, docs, projects. Multi-filter. Saved search views. Cmd/Ctrl+K command palette. Hermes natural language task lookup integration.", True),
]

try:
    conn = psycopg2.connect(host=DB_HOST, port=int(DB_PORT), dbname=DB_NAME, user=DB_USER, password=DB_PASS)
    cur = conn.cursor()
    print(f"Connected OK")

    inserted = 0
    skipped = 0
    for (ikey, priority, name, tier, effort, spec, hermes) in tasks:
        payload = json.dumps({
            "feature_name": name,
            "tier": tier,
            "estimated_effort": effort,
            "spec_summary": spec,
            "hermes_opportunity": hermes,
            "app": "ForgePM",
            "source": "gap_analysis_2026-06-19"
        })
        try:
            cur.execute("""
                INSERT INTO agent_task_queue
                    (agent_name, task_type, status, priority, idempotency_key, payload, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (idempotency_key) DO NOTHING
            """, ("NF-ForgePM-Builder", "BUILD_FEATURE", "pending", priority, ikey, payload, datetime.now(timezone.utc)))
            if cur.rowcount > 0:
                inserted += 1
                print(f"  ✓ [{tier}] {name}")
            else:
                skipped += 1
                print(f"  ~ SKIP (exists): {name}")
        except Exception as e:
            print(f"  ✗ FAILED {name}: {e}")
            conn.rollback()

    conn.commit()
    print(f"\nDone: {inserted} inserted, {skipped} skipped")

    cur.execute("SELECT priority, count(*) FROM agent_task_queue WHERE agent_name='NF-ForgePM-Builder' GROUP BY priority ORDER BY priority")
    rows = cur.fetchall()
    print("\nQueue summary:")
    total = 0
    for p, c in rows:
        label = {1:"Critical", 2:"High", 3:"Medium"}.get(p, f"P{p}")
        print(f"  Priority {p} ({label}): {c} tasks")
        total += c
    print(f"  TOTAL: {total} ForgePM tasks in queue")

    cur.close()
    conn.close()
except Exception as e:
    print(f"DB ERROR: {e}")
    sys.exit(1)

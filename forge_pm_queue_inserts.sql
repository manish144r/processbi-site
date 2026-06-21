-- Forge PM — All 18 Feature Gaps → agent_task_queue
-- Run in pgAdmin or psql against localhost:5433/nightfactory
-- Generated: 2026-06-19

INSERT INTO agent_task_queue (agent_name, task_type, status, priority, idempotency_key, payload, created_at)
VALUES

-- ═══════════════════════════════════════════
-- CRITICAL (Priority 1)
-- ═══════════════════════════════════════════

('NF-ForgePM-Builder', 'BUILD_FEATURE', 'pending', 1,
 'forge_pm_hermes_endpoint_wiring',
 '{"feature_name":"Hermes AI Endpoint Wiring","tier":"Critical","estimated_effort":"2 days","spec_summary":"Wire Hermes API (port 7779) into the existing AI Hub scaffold in Forge PM. The UI is already built — it just needs the endpoint configured, auth headers, streaming response handler, and fallback error states. Unlocks all 8 Hermes AI opportunities immediately.","hermes_opportunity":true,"app":"ForgePM","source":"gap_analysis_2026-06-19"}',
 NOW()),

('NF-ForgePM-Builder', 'BUILD_FEATURE', 'pending', 1,
 'forge_pm_kanban_board',
 '{"feature_name":"Kanban Board View","tier":"Critical","estimated_effort":"3 days","spec_summary":"Add a Kanban view alongside the existing Gantt/list views. Columns map to task status (Backlog, In Progress, In Review, Done). Support drag-and-drop between columns, WIP limits per column, swimlanes by assignee or sprint, and card quick-edit. Use the same data model as the task list.","hermes_opportunity":false,"app":"ForgePM","source":"gap_analysis_2026-06-19"}',
 NOW()),

('NF-ForgePM-Builder', 'BUILD_FEATURE', 'pending', 1,
 'forge_pm_automation_rules_engine',
 '{"feature_name":"Automation / Workflow Rules Engine","tier":"Critical","estimated_effort":"5 days","spec_summary":"Build a no-code automation engine: IF trigger THEN action. Triggers: task status change, due date approaching, assignee change, new comment, sprint start/end. Actions: assign task, change status, move to sprint, send notification, create subtask, update custom field. Store rules in DB, evaluate on event bus. Start with 10 pre-built templates.","hermes_opportunity":true,"app":"ForgePM","source":"gap_analysis_2026-06-19"}',
 NOW()),

('NF-ForgePM-Builder', 'BUILD_FEATURE', 'pending', 1,
 'forge_pm_github_integration',
 '{"feature_name":"GitHub Integration","tier":"Critical","estimated_effort":"3 days","spec_summary":"Bi-directional GitHub sync: link PRs and commits to tasks via branch naming convention (forge/TASK-123). Show PR status on task cards. Auto-update task status when PR merges. Display commit history on task detail. Support GitHub Actions webhook for CI/CD status display. Use GitHub OAuth for auth.","hermes_opportunity":false,"app":"ForgePM","source":"gap_analysis_2026-06-19"}',
 NOW()),

('NF-ForgePM-Builder', 'BUILD_FEATURE', 'pending', 1,
 'forge_pm_velocity_predictive_analytics',
 '{"feature_name":"Velocity & Predictive Analytics","tier":"Critical","estimated_effort":"3 days","spec_summary":"Track sprint velocity and show 6-sprint rolling average. Add predictive burndown using linear regression on historical velocity. Highlight scope creep automatically. Show team capacity vs commitment ratio. Feed data to Hermes Risk Radar for AI-powered delivery predictions.","hermes_opportunity":true,"app":"ForgePM","source":"gap_analysis_2026-06-19"}',
 NOW()),

-- ═══════════════════════════════════════════
-- HIGH (Priority 2)
-- ═══════════════════════════════════════════

('NF-ForgePM-Builder', 'BUILD_FEATURE', 'pending', 2,
 'forge_pm_time_tracking',
 '{"feature_name":"Time Tracking","tier":"High","estimated_effort":"2 days","spec_summary":"Built-in timer on every task: start/stop/pause. Log manual time entries with date and note. Show total logged vs estimated hours on task and project level. Export timesheet as CSV. Integrate logged hours into the EVM cost variance calculation already in the app.","hermes_opportunity":false,"app":"ForgePM","source":"gap_analysis_2026-06-19"}',
 NOW()),

('NF-ForgePM-Builder', 'BUILD_FEATURE', 'pending', 2,
 'forge_pm_document_wiki_layer',
 '{"feature_name":"Document / Wiki Layer","tier":"High","estimated_effort":"4 days","spec_summary":"Rich-text document/wiki per project. Support nested pages, Markdown with live preview, embedded task mentions, image uploads, and version history. Use TipTap or ProseMirror. Documents are searchable and linkable from tasks. Hermes can summarise or generate docs from task context.","hermes_opportunity":true,"app":"ForgePM","source":"gap_analysis_2026-06-19"}',
 NOW()),

('NF-ForgePM-Builder', 'BUILD_FEATURE', 'pending', 2,
 'forge_pm_mobile_pwa',
 '{"feature_name":"Native Mobile PWA","tier":"High","estimated_effort":"3 days","spec_summary":"Convert Forge PM to a Progressive Web App with offline support via Service Worker. Cache current sprint tasks offline. Add to home screen support. Push notifications via Web Push API. Optimise for 375px screens focused on daily standup workflow.","hermes_opportunity":false,"app":"ForgePM","source":"gap_analysis_2026-06-19"}',
 NOW()),

('NF-ForgePM-Builder', 'BUILD_FEATURE', 'pending', 2,
 'forge_pm_slack_teams_notifications',
 '{"feature_name":"Slack / Teams Notifications","tier":"High","estimated_effort":"2 days","spec_summary":"Webhook-based integration with Slack and Microsoft Teams. Notify on: task assignment, status change to blocked, comment @mention, sprint start/end, overdue tasks, PR merge. Use Incoming Webhooks for v1. Allow per-user notification preferences.","hermes_opportunity":false,"app":"ForgePM","source":"gap_analysis_2026-06-19"}',
 NOW()),

('NF-ForgePM-Builder', 'BUILD_FEATURE', 'pending', 2,
 'forge_pm_custom_fields',
 '{"feature_name":"Custom Fields","tier":"High","estimated_effort":"3 days","spec_summary":"Project admins define custom fields on tasks: text, number, date, single-select, multi-select, URL, person. Store as JSONB in Postgres. Show in task detail sidebar, filterable in list/board views, exportable to CSV. Pre-built field templates for common verticals.","hermes_opportunity":false,"app":"ForgePM","source":"gap_analysis_2026-06-19"}',
 NOW()),

('NF-ForgePM-Builder', 'BUILD_FEATURE', 'pending', 2,
 'forge_pm_recurring_tasks',
 '{"feature_name":"Recurring Tasks","tier":"High","estimated_effort":"1 day","spec_summary":"Mark any task as recurring: daily, weekly, bi-weekly, monthly, or custom interval. On completion, auto-create next instance with same metadata. Show recurrence badge on task cards. Support end-date or count-based termination. Implement as a scheduled cron job.","hermes_opportunity":false,"app":"ForgePM","source":"gap_analysis_2026-06-19"}',
 NOW()),

-- ═══════════════════════════════════════════
-- MEDIUM (Priority 3)
-- ═══════════════════════════════════════════

('NF-ForgePM-Builder', 'BUILD_FEATURE', 'pending', 3,
 'forge_pm_dependency_graph_visualiser',
 '{"feature_name":"Dependency Graph Visualiser","tier":"Medium","estimated_effort":"3 days","spec_summary":"Interactive force-directed graph showing task dependencies (blocks/blocked-by). Color-code by status. Highlight the critical path. Show dependency chains risking sprint deadline. Export as PNG. Complements the existing CPM + float analysis in Gantt.","hermes_opportunity":true,"app":"ForgePM","source":"gap_analysis_2026-06-19"}',
 NOW()),

('NF-ForgePM-Builder', 'BUILD_FEATURE', 'pending', 3,
 'forge_pm_budget_tracking',
 '{"feature_name":"Budget Tracking","tier":"Medium","estimated_effort":"2 days","spec_summary":"Project-level budget: set total budget, track spend via logged hours x rate + expenses. Show burn rate, forecast to completion, and variance. Integrate with the existing EVM suite. Role-based: PMs see full budget, contributors see only their time cost. Export to CSV/Excel.","hermes_opportunity":false,"app":"ForgePM","source":"gap_analysis_2026-06-19"}',
 NOW()),

('NF-ForgePM-Builder', 'BUILD_FEATURE', 'pending', 3,
 'forge_pm_client_portal',
 '{"feature_name":"Client Portal","tier":"Medium","estimated_effort":"4 days","spec_summary":"Read-only external portal for clients: project status, milestones, open issues, recent activity. No login required (magic link). Customisable sections. White-label with client branding. Comment thread for client feedback that maps back to internal tasks. Essential for agency/consultancy use cases.","hermes_opportunity":false,"app":"ForgePM","source":"gap_analysis_2026-06-19"}',
 NOW()),

('NF-ForgePM-Builder', 'BUILD_FEATURE', 'pending', 3,
 'forge_pm_resource_levelling',
 '{"feature_name":"Resource Levelling","tier":"Medium","estimated_effort":"3 days","spec_summary":"Detect over-allocated team members (assigned hours exceed sprint capacity). Enhance the existing capacity heatmap. Suggest task redistribution. Allow drag-to-reassign from heatmap. Hermes suggests optimal allocation based on skills and historical velocity.","hermes_opportunity":true,"app":"ForgePM","source":"gap_analysis_2026-06-19"}',
 NOW()),

('NF-ForgePM-Builder', 'BUILD_FEATURE', 'pending', 3,
 'forge_pm_dark_mode',
 '{"feature_name":"Dark Mode","tier":"Medium","estimated_effort":"1 day","spec_summary":"Full dark mode using CSS custom properties / Fabric theme tokens. Toggle in user preferences, respect system prefers-color-scheme. Test all components. The forge fire icon looks great on dark — natural fit for the brand. Persist preference to user profile.","hermes_opportunity":false,"app":"ForgePM","source":"gap_analysis_2026-06-19"}',
 NOW()),

('NF-ForgePM-Builder', 'BUILD_FEATURE', 'pending', 3,
 'forge_pm_guest_access',
 '{"feature_name":"Guest Access","tier":"Medium","estimated_effort":"2 days","spec_summary":"Invite external collaborators as guests (email-based, no M365 account required). Guests see only invited projects. Roles: view-only or can-comment. Time-limited invitations with expiry. Track guest activity in audit log. Essential for agency workflows.","hermes_opportunity":false,"app":"ForgePM","source":"gap_analysis_2026-06-19"}',
 NOW()),

('NF-ForgePM-Builder', 'BUILD_FEATURE', 'pending', 3,
 'forge_pm_advanced_search',
 '{"feature_name":"Advanced Search","tier":"Medium","estimated_effort":"1 day","spec_summary":"Global search across tasks, comments, documents, and projects. Filters: assignee, status, priority, date range, project, custom fields. Saved search views. Cmd/Ctrl+K command palette. Optionally feed queries to Hermes for natural language task lookup.","hermes_opportunity":true,"app":"ForgePM","source":"gap_analysis_2026-06-19"}',
 NOW())

ON CONFLICT (idempotency_key) DO NOTHING;

-- ─── Verify ────────────────────────────────────────────────────────────────
SELECT priority, count(*) AS tasks
FROM agent_task_queue
WHERE agent_name = 'NF-ForgePM-Builder'
GROUP BY priority ORDER BY priority;

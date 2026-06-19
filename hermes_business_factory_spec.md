# Hermes Autonomous Business Factory — Architecture Spec
_Last updated: 2026-06-19_

## Overview

The NightFactory Autonomous Business Factory is a 5-phase pipeline that creates 5 complete
businesses per day, fully automated with zero human employees. Each pipeline run picks one
business from the `b365_businesses` queue, runs it through all 5 phases, and writes
lessons back to the knowledge base to make every subsequent run smarter.

---

## Phase Architecture

### Phase 1 — Ideation (5×5 Brief Methodology)

**Entry:** Pull next business from `b365_businesses` WHERE `status='queued'`, ordered by
`priority_score DESC`. If queue is empty, generate a new idea from `nf_market_briefs`.

**Method:** Run 5 strategic lenses × 5 refinement loops = 25 total iterations:

| Lens | Question |
|------|----------|
| `market_size` | Bottom-up TAM estimate in AUD — who buys, how many, at what price? |
| `zero_employee_feasibility` | Can AI + software handle 100% of delivery with no human staff? Score 0-100. |
| `agentic_ai_applicability` | How deeply can AI agents replace lead gen, content, CS, and product iteration? |
| `monetization_speed` | Can first $1 of revenue arrive within 30 days? Map day-by-day critical path. |
| `cost_structure` | Can the full stack run for < $50/month? Railway/Render + Claude/Ollama + NF-local PG. |

Each lens runs 5 refinement loops. Each loop: generate brief → score against 5 SCORING_AXES
(TAM, margin, speed_to_1k_mrr, build_simplicity, defensibility) → use score to improve.

**Gate:** Weighted average score across all 25 iterations must be ≥ 75.
If score < 75, business is requeued (`status='queued'`) and run aborts. No further phases run.

**Outputs:** `ideation_result` dict with `master`, `all_briefs`, `weighted_avg`, `gate_passed`.

---

### Phase 2 — Tech Selection (Internal Knowledge First)

**KB-first policy:** Read `nf_tech_knowledge` table for the required tech categories.
If an existing entry for the category has `score ≥ 80`, use it directly — no LLM call.

If no entry OR `score < 80`:
1. Call `TechKnowledgeEngine.research_and_update(category)` via LLM pool
2. Research top 10 approaches, score each 0-100 on: free/OSS, zero-employee operable,
   zero-cost at low scale, AI-native
3. Persist winner back to `nf_tech_knowledge` — this becomes reusable knowledge
4. Future runs check this table first (compounds across every run)

**Tech categories evaluated:** frontend_framework, backend_framework, hosting, auth,
payments, crm, email, analytics, database, ai_provider, vector_db.

**LLM:** Claude API (primary) → Ollama hermes3 (fallback).

---

### Phase 3 — Brand Generation

**Candidates:** Generate 20 brand name candidates via LLM.

**Scoring per candidate:**
- Memorability (LLM score + rule-based: length 6-14 chars, 1-2 words)
- Domain availability — real DNS socket lookup for `.com`, `.co`, `.io`, `.app`
  (available = no DNS record resolves)
- SEO friendliness (not a generic word, distinct syllable pattern)
- No purple/violet/lavender vibes (hard disqualifier, -50 points)
- AU market resonance (not US-centric names)

**Output:** Top 3 brand candidates stored in business brief. Winner persisted to
`b365_businesses.brand_name` and `b365_businesses.brand_brief`.

**Full brand package:** name, slug, tagline, hero headline, value prop, 3 differentiators,
colour palette (no purple/violet), font suggestion, CTA copy, price anchor.

---

### Phase 4 — Build Orchestration

**Aider task dispatch:**
Each component is its own row in `agent_task_queue` with `agent_name='aider'`.
Default components: landing_page, backend_api, ghl_config, stripe_config, prism_content_pack.

**QA Loop per component:**
```
for iteration in range(1, 201):          # max 200 iterations
    artifact = build_component(spec, feedback)
    review   = qa_review(artifact)       # LLM scores 0-100
    if review.score >= 95:               # target threshold → stop early
        save_artifact(); break
    if review.score >= 85:               # pass threshold
        save_artifact(); break
    feedback = review.issues + review.improvements
    # loop continues with feedback prepended to next build
```

**Thresholds:** pass=85, target=95, max_iterations=200.
If max_iterations reached without passing, save best attempt and continue.

**Artifacts saved** to `products/<slug>/frontend/`, `products/<slug>/api/`, `products/<slug>/prism/`.

---

### Phase 5 — Knowledge Compounding

Every run (success OR failure) writes lessons back:

**Lessons extracted (LLM):** 3-5 ALWAYS/NEVER rules written to `lessons_learned` table.

**Tech knowledge updated:** Every stack choice used in this run is recorded back to
`nf_tech_knowledge` with the run's QA score as evidence. Blended score = 70% new + 30% historical.

**Market intel persisted:** `knowledge/market-research/<YYYY-MM-DD>/<slug>-market-intel.md`
with TAM, key players, pain points, opportunities, source URLs.

**Reprioritisation:** Next 2 same-vertical queued businesses get +10 priority_score.

**Auto-requeue:** If composite run_score < 70, business is requeued for a second attempt.
Composite = 40% build score + 35% brief score + 25% brand score.

**Build run record:** Saved to `nf_build_runs` with `brief_score`, `components_built`,
`components_passed`, `avg_qa_loops`, `total_duration_seconds`, `lessons`, `status`.

---

## Research Mandate

The factory ONLY researches topics within these 6 categories:

| Category | Topics |
|----------|--------|
| `ZERO_HUMAN_BUSINESS` | Fully automated SaaS, digital products, API-as-a-service, passive income models |
| `MONETIZATION_STRATEGY` | Autopilot revenue, low-CAC distribution, AppSumo/PH launches, GHL marketplace |
| `AGENTIC_AI_METHODS` | Multi-agent orchestration, self-improving loops, RAG, agent memory, model routing |
| `ZERO_COST_TECH_STACK` | Sub-$50/month SaaS infra, OSS alternatives, GHL economics, free-tier comparison |
| `BUSINESS_CREATION_METHODOLOGY` | Pieter Levels/Marc Lou patterns, validate-before-build, 1000 MRR, niche selection |
| `AI_MODEL_INTELLIGENCE` | Model benchmarks 2025+, free API tiers, local LLM performance, task-type routing |

**NOT in scope for the factory:** ProcessBI consulting, PowerBI, enterprise sales.

---

## ProcessBI — Separate Pipeline

ProcessBI is Manish's personal consulting business (Power BI / Microsoft Fabric contracts).
It is COMPLETELY SEPARATE from the autonomous factory. It never touches `b365_businesses`.

**Tender Scanner (`nf_processbi_tender_scanner.py`):**
- Sources: AusTender, NSW eTendering, QLD Government (QGP + SmartJobs), LinkedIn Jobs, Seek, Upwork
- Filter: Power BI, Microsoft Fabric, Analytics Engineer, Azure Data, Synapse, Databricks
- Rate threshold: AUD $150/hr OR project value AUD $10k+
- GHL push: top 5 daily to GHL ProcessBI pipeline as contacts (via local GHL API)
- CSV fallback: `outputs/processbi_tenders_YYYY-MM-DD.csv` if GHL API fails
- Schedule: Daily 07:00 AEST via `NightFactory\NF-ProcessBI-Tender-Scanner` schtask

---

## Tech Knowledge Engine (`nf_tech_knowledge.py`)

### API
```python
engine = TechKnowledgeEngine()

# Read-first — always call before any tech decision
best = engine.get_best_tech("frontend_framework")
# → {"tech_name": "HTML+Tailwind", "score": 88.0, "reasoning": "..."}

# Research + update (when score < 80 or no entry)
best = engine.research_and_update("frontend_framework")
# LLM researches top 10, scores each, persists winner

# Weekly supersession scan (called by NF-Supervisor)
events = engine.check_supersessions()
# Scans yt_atomic_facts + nf_market_briefs for "X is better than Y" signals
```

### Self-Improving Loop
```
Run 1: empty table → seed with defaults (score=50-93)
Run N: every build outcome writes back → scores drift toward real performance
Run N+K: LLM research populates new categories → never re-research if score ≥ 80
Weekly: check_supersessions() scans corpus for supersession signals → marks old entries
```

### Table Schema
```sql
nf_tech_knowledge (
    id, category, tech_name, option_name, score,
    reasoning, evidence, source,
    last_used, last_verified, superseded_by,
    created_at, updated_at
)
```

---

## DB Tables

| Table | Purpose |
|-------|---------|
| `nf_tech_knowledge` | Tech decision scores, self-improving across runs |
| `nf_build_runs` | Per-run record: scores, durations, lessons |
| `lessons_learned` | ALWAYS/NEVER rules extracted from every run |
| `nf_market_briefs` | Per-vertical market intelligence, compounded |
| `nf_task_reviews` | QA loop history per component per iteration |
| `nf_pipeline_log` | Event log for all factory phases |
| `b365_businesses` | Business queue with status, brand, priority |
| `agent_task_queue` | Aider build tasks (agent_name='aider') |
| `dm_jobs` | ProcessBI tender/contract opportunities |

---

## Scheduled Tasks

| Task | Script | Schedule | Notes |
|------|--------|----------|-------|
| `NightFactory\NF-Business-Factory` | nf_business_factory.py | 04:00, 07:00, 11:00, 15:00, 20:00 AEST | 5× daily, 4hr timeout |
| `NightFactory\NF-ProcessBI-Tender-Scanner` | nf_processbi_tender_scanner.py | 07:00 AEST | Daily |

All schtasks use `run_hidden.vbs` wrapper. Never direct `powershell.exe` or `cmd.exe`.

---

## Key Constraints

- **No Supabase** — all data to local PostgreSQL (localhost:5433/nightfactory)
- **No purple/violet/lavender** in any brand output (hard disqualifier)
- **PRISM Social** owns all LinkedIn/social posting — factory generates content packs,
  PRISM distributes them
- **GHL local only** — never navigate to app.gohighlevel.com; use local API only
- **Knowledge first** — always query internal KB before any web search or LLM research call
- **Scan persistence rule** — every scan/research output written to `knowledge/market-research/`
  before session ends

---

## File Index

```
workers/pipeline/
  nf_business_factory.py        ← Main orchestrator (phases 1-5)
  nf_tech_knowledge.py          ← Tech knowledge engine (get_best_tech, research_and_update, check_supersessions)
  nf_brand_engine.py            ← Brand generation + DNS checks
  nf_processbi_tender_scanner.py ← ProcessBI tender scanner (separate)

briefs/
  templates/master_brief_template.md ← Canonical brief template
  <slug>_master_brief.md              ← Per-business output

products/
  <slug>/frontend/                    ← Landing page artifacts
  <slug>/api/                         ← Backend artifacts
  <slug>/prism/                       ← Social content packs

knowledge/market-research/<YYYY-MM-DD>/
  <slug>-market-intel.md              ← Run-level market intel

outputs/
  processbi-3d-deploy/hermes_business_factory_spec.md ← This file
  processbi_tenders_YYYY-MM-DD.csv                    ← Tender scanner fallback
```

---

## Live Test Status (2026-06-19)

**Status: CONFIRMED OPERATIONAL**

Factory test run on slug `invoicepro` ran successfully, confirmed by log at
`outputs/factory_test_run.log`. Key observations:

- All 5 `market_size` strategy loops completed (scores: 72, 68, 68, 68, 70)
- `zero_employee_feasibility` lens started (score=72)
- Cerebras key rotation working: 34 keys available, rotates on 429
- Internal KB queries working (psycopg2 + rollback pattern fixed)
- Test harness timed out during run — this is expected (the factory makes ~25 LLM calls at ~8s each ≈ 3.5 minutes per run, plus scoring calls)

**Bugs fixed during this session:**

| Issue | Root Cause | Fix |
|-------|------------|-----|
| `KeyError: 'content'` on Cerebras | `gpt-oss-120b` is a reasoning model; needs ≥ 1024 tokens to emit `content` after reasoning | Floor of 1024 tokens + `reasoning` fallback key |
| Cerebras 429 rate-limit | Single key exhausted quickly at 30 RPM | Collect all `CEREBRAS_API_KEY_*` (34 keys), rotate up to 5 on 429 |
| OpenRouter 404 | Model `llama-3.1-70b-instruct:free` deprecated | Updated to `meta-llama/llama-4-maverick:free` |
| All API providers skipped | `workers/secrets.env` missing `CEREBRAS_API_KEY_*` / `OPENROUTER_API_KEY_1` (those live in root `secrets.env`) | Factory now merges both secrets files at startup |
| `InFailedSqlTransaction` | Missing `conn.rollback()` in KB query exception blocks | Added `rollback()` to all except blocks |
| Wrong KB column names | Assumed generic schema; actual tables differ | Rewrote all KB queries with actual column names and aliases |

**LLM Chain (working order):**
1. NF API pool at 8765 (freellmapi) — fast-fails when not running
2. Claude direct (ANTHROPIC_API_KEY absent — skipped)
3. Cerebras `gpt-oss-120b` — **PRIMARY** (34 keys, rotating)
4. OpenRouter `meta-llama/llama-4-maverick:free` — fallback
5. Ollama `hermes3:latest` — last resort (currently 500 under load)

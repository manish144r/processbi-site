# Phase 2 — Auto-Lodgement via Portal APIs

**Document type:** Planning / scoping (no build)  
**Date:** 2026-06-23  
**Depends on:** Phase 1 (Grant Finder + Pre-fill) operational and used on first live client  

---

## Overview

Phase 2 automates the submission of pre-filled grant applications directly to Australian government grant portals — eliminating the need for the client or consultant to manually transcribe and lodge the draft. This turns ProcessBI's Grant Add-on from a "we prepare the paperwork" service into a near-end-to-end funnel automation.

---

## Portal Landscape

### 1. GrantConnect (grants.gov.au)
**Authority:** Department of Finance  
**Coverage:** All Commonwealth grants  
**API status:** GrantConnect has a public **RESTful API** for discovering grant opportunities (GET /opportunities). It does NOT currently expose a lodgement API — applications are directed to agency-specific portals.  
**Implication:** GrantConnect is useful for automated opportunity discovery (Phase 1 enhancement) but not for direct lodgement. Each Commonwealth program links out to its own application system.

### 2. business.gov.au (AusIndustry programs)
**Coverage:** R&D Tax Incentive registration, Entrepreneurs' Programme, AI Adopt, Accelerating Commercialisation  
**API status:** No public lodgement API. Applications use a web form system (Connect portal / business.gov.au online forms).  
**Lodgement approach:** **Playwright form-fill** — the business.gov.au application forms are JavaScript-rendered but structurally consistent and automatable. Key fields: entity details, project description, expenditure schedule, outcome projections.  
**Auth:** Requires myGovID / business.gov.au account login. Integration requires the client to grant ProcessBI delegate access or provide credentials — handled via a secure credential hand-off step.

### 3. ATO Online Services (R&D Tax Incentive)
**Coverage:** RDTI registration (lodge before tax return), Advance Finding requests  
**API status:** ATO has a **Standard Business Reporting (SBR2)** framework with machine-to-machine lodgement. RDTI registration (R&D Registration form) is SBR2-enabled via ATO's API gateway.  
**Lodgement approach:** SBR2 via `ato.gov.au` API gateway — requires AUSkey / myGovID credential, registered software product. Most feasible path: use a registered tax agent or BAS agent platform (e.g., Practice Manager API) that exposes SBR2 endpoints.  
**Complexity:** High. Requires registered software provider ID.

### 4. Investment NSW (NSW Manufacturing Modernisation Fund)
**Coverage:** NSW state manufacturing grants  
**API status:** No public API. Applications submitted via SmartyGrants (most NSW programs use SmartyGrants as their form backend).  
**Lodgement approach:** **SmartyGrants integration** — SmartyGrants has a documented API (REST, JSON) available to "approved integration partners." ProcessBI would need to register as a SmartyGrants integration partner.  
**URL:** `https://apply.smartygrants.com.au/api/`  

### 5. SmartyGrants (NSW, VIC, QLD, SA state programs)
**Coverage:** Majority of state government grant programs in AU (NSW, VIC, QLD, SA)  
**API status:** REST API available to approved partners  
**Key capabilities:** List open forms, get form schema, submit application (POST), attach files  
**Requirement:** ProcessBI registers as SmartyGrants Trusted Partner. One integration covers most state programs.  
**This is the highest-leverage API integration for Phase 2.**

### 6. Austrade (EMDG)
**Coverage:** Export Market Development Grant  
**API status:** No public API. Application via austrade.gov.au online form.  
**Lodgement approach:** Playwright form-fill  

---

## Recommended Phase 2 Build Plan

### Stage 2A — Discovery automation (low effort, high value)
Automate grant opportunity scanning using GrantConnect API + SmartyGrants open-forms listing:

```
workers/processbi_grant_discovery.py
  → calls GrantConnect API for new Commonwealth opportunities
  → calls SmartyGrants API for open state program forms
  → matches against client profile database
  → pushes matches to research_queue.json for review
```

Effort: ~3 days. No portal credentials needed.

### Stage 2B — SmartyGrants submission (high value, medium effort)
Integrate with SmartyGrants API to pre-fill and submit state grant applications:

```
workers/processbi_smartygrants_submitter.py
  → loads pre-filled application from processbi_grant_prefill.py
  → authenticates with SmartyGrants API (client's credentials via secrets.env)
  → maps application fields to SmartyGrants form schema
  → attaches PDF documents (SOW, budget, financials)
  → submits application and returns submission ID
  → logs to PG table processbi_grant_submissions
```

**Registration required:** Apply for SmartyGrants Partner API access at `smartygrants.com.au/partners`

Effort: ~5 days (excluding SmartyGrants partner approval, which takes 2–4 weeks).

### Stage 2C — business.gov.au Playwright form-fill (medium value, medium effort)
Playwright automation for AusIndustry programs (Entrepreneurs' Programme, AI Adopt):

```
workers/processbi_businessgov_filler.py
  → launches headless Chromium via Playwright
  → logs in via client's myGovID (requires client to set up delegate access)
  → navigates to application form
  → fills each field from pre-filled application dict
  → uploads attachments
  → saves draft (does NOT auto-submit — requires human review and submit)
```

**Important:** Playwright form-fill for government portals should NEVER auto-submit. It fills and saves a draft; a human reviews and clicks Submit. This is the PRISM-style approach — queue to "ready for submission" state, not to auto-lodgement.

Effort: ~4 days per portal (each portal has a different form structure).

### Stage 2D — ATO SBR2 for RDTI (optional, high complexity)
Connect to ATO SBR2 API for R&D registration:

- Requires registered software provider ID with ATO
- ProcessBI would need to partner with an existing registered SBR2 software provider (e.g., a tax agent platform)
- Recommended approach: partner with a registered R&D tax consultant who has SBR2 access rather than building directly

Effort: ~15 days + SBR2 registration process. **Recommend outsourcing rather than building.**

---

## PRISM-Style Submission Queue

### Queue architecture
Following the existing NightFactory queue pattern (`business_strategist_queue`, `agent_task_queue`):

```
PG table: processbi_grant_submissions
  id            SERIAL PRIMARY KEY
  client_name   TEXT
  grant_id      TEXT
  portal        TEXT           -- smartygrants, businessgov, ato
  status        TEXT           -- draft | ready_for_review | submitted | approved | rejected
  draft_md_path TEXT           -- path to pre-filled markdown
  submission_id TEXT           -- portal submission reference
  notes         TEXT
  created_at    TIMESTAMPTZ
  updated_at    TIMESTAMPTZ
```

### Queue worker
```
workers/processbi_submission_queue_worker.py
  → polls processbi_grant_submissions for status = 'ready_for_review'
  → presents to consultant via Slack/email notification (not auto-submit)
  → after human approval, routes to appropriate submitter (SmartyGrants API / Playwright)
  → updates status to 'submitted' with submission ID
```

### Human-in-the-loop (mandatory)
All submissions require a human review and approval step before lodgement. The queue worker flags "ready for submission" — the consultant reviews, edits if needed, and approves. Never auto-submit without human sign-off.

---

## Costs and Access Requirements

| Component | Requirement | Estimated Cost | Timeline |
|---|---|---|---|
| SmartyGrants Partner API | Register as integration partner | Free (approval process) | 2–4 weeks |
| business.gov.au Playwright | Client provides myGovID delegate access | Development only | Per client |
| ATO SBR2 | Partner with registered SBR2 provider | Partner arrangement | 1–3 months |
| GrantConnect API | Public API, free | Free | Immediate |
| Playwright (Chromium) | pip install playwright | Free | Immediate |
| PG table | Existing NightFactory Postgres | Free | 1 day |

---

## Recommended First Steps (to kick off Phase 2)

1. **Apply for SmartyGrants Partner API access** — this single integration covers most NSW, VIC, QLD, SA state programs
2. **Build Stage 2A** (GrantConnect discovery) — 3 days, delivers immediate value
3. **Test Stage 2B** (SmartyGrants) on a real NSW client submission once partner access is approved
4. **Document the myGovID delegate access flow** — required for Stage 2C, needs client cooperation

---

## What Phase 2 Is NOT

- Phase 2 does not remove the need for a grants consultant on complex programs (RDTI, MMI)
- Phase 2 does not auto-approve or guarantee grant success — it automates paperwork, not outcomes
- Phase 2 does not handle post-lodgement acquittals or milestone reporting (Phase 3 scope)

---

*ProcessBI | processbi.com.au | Prepared 2026-06-23*  
*Status: Planning only — do not build until Phase 1 is live with ≥2 paying clients*

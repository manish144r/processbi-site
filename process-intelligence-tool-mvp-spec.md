# Process Intelligence Tool — MVP Build Specification

_Date: 2026-06-24 | Status: APPROVED FOR BUILD_
_Target: Demo-ready to large enterprise client within 4 weeks_

---

## What This Tool Is

A Python-based AI pipeline that takes raw process inputs (interview transcripts, existing documents, Visio/Lucid exports) and generates a complete set of client-ready process intelligence artefacts:

- Swimlane diagrams (draw.io XML → Lucidchart-importable / Visio-compatible)
- RACI matrix (Excel)
- SOP document set (Word .docx)
- Data flow map (per-step system + data entity tags)
- Automation opportunity scores (per step, 0–100)
- Recommended automation tools (per step: Power Automate / ServiceNow / custom API / RPA)
- Regulatory compliance flags (APRA CPS 230, SOX, GDPR)
- Client-ready Power BI dashboard (PBIX template with process map and ROI projections)

---

## MVP Scope (4 weeks to demo)

The MVP is a **command-line Python pipeline + simple web UI**. It does not need to be a polished SaaS product. It needs to be demo-able to one large enterprise client with a real process input.

### Included in MVP
- Input: text transcript (interview, Word doc, paste) + optional process title/industry
- Output: all artefacts listed above (auto-generated, human-reviewable)
- Web UI: single-page upload form + download pack (FastAPI + basic HTML)
- Power BI template: pre-built PBIX with placeholder process dataset
- Demo dataset: one Finance process (Procure-to-Pay) fully worked through

### Excluded from MVP (Phase 2)
- Lucidchart live API integration (MVP uses draw.io XML; Phase 2 pushes to Lucidchart)
- Multi-process consolidation (one process at a time in MVP)
- Real-time collaboration or client portal
- Event-log / ERP data ingestion (Phase 2: connect to SAP / Dynamics data)
- Compliance rule engine (MVP has basic CPS 230 flags; Phase 2 adds full rule library)

---

## Technical Architecture

```
Input Layer
  ├── text_ingest.py          # Accepts transcript .txt/.docx, Visio .vsdx, Lucid .json
  ├── input_normaliser.py     # Normalises all inputs to structured text + metadata
  └── chunker.py              # Splits large docs into processable segments

Extraction Layer (LLM)
  ├── process_extractor.py    # Claude API: extracts structured Process JSON from text
  ├── actor_resolver.py       # Resolves actor names/roles to canonical list
  └── system_tagger.py        # Tags each step with source/target systems + data entities

Intelligence Layer
  ├── automation_scorer.py    # Rule-based + LLM scoring: automation_score 0–100 per step
  ├── hitl_classifier.py      # Classifies: FULLY_AUTOMATABLE / HUMAN_ASSISTED / HUMAN_ONLY
  ├── tool_recommender.py     # Maps step type → recommended automation tool
  └── compliance_flagger.py   # Pattern-matches steps against CPS230/SOX/GDPR rule library

Artefact Generation Layer
  ├── swimlane_generator.py   # Generates draw.io XML swimlane from Process JSON
  ├── raci_generator.py       # Generates RACI Excel (openpyxl)
  ├── sop_generator.py        # Generates SOP Word doc (python-docx)
  ├── dataflow_generator.py   # Generates data flow map (draw.io XML)
  ├── roi_calculator.py       # Calculates FTE savings estimate from automation scores
  └── pbi_template_loader.py  # Loads Process JSON into Power BI PBIX template dataset

Output Layer
  ├── pack_builder.py         # Assembles ZIP: all artefacts + cover README
  └── api.py                  # FastAPI endpoint: POST /process → returns download link

Web UI
  └── ui/index.html           # Single-page upload + download UI (vanilla JS, no framework)
```

### Process JSON Schema (internal canonical format)

```json
{
  "process_id": "uuid",
  "process_name": "string",
  "industry": "string",
  "version": "1.0",
  "steps": [
    {
      "step_id": "S001",
      "step_name": "string",
      "description": "string",
      "actor": "string",           // e.g. "Accounts Payable Team"
      "actor_role": "string",       // e.g. "Processor"
      "systems_used": ["SAP", "Email"],
      "data_in": ["Purchase Order"],
      "data_out": ["Payment Voucher"],
      "decision_point": false,
      "decision_options": [],       // if decision_point: ["Approve", "Reject"]
      "automation_score": 85,       // 0-100
      "automation_class": "FULLY_AUTOMATABLE",  // or HUMAN_ASSISTED, HUMAN_ONLY
      "automation_tool_rec": "Power Automate",
      "automation_tool_reason": "string",
      "compliance_flags": ["CPS230_MATERIAL_STEP"],
      "hitl_notes": "string"
    }
  ],
  "actors": [
    {
      "actor_id": "A001",
      "actor_name": "string",
      "department": "string",
      "raci_role": "R"              // R, A, C, I
    }
  ],
  "systems": ["SAP", "Email", "SharePoint"],
  "roi_estimate": {
    "automatable_step_count": 8,
    "total_steps": 12,
    "estimated_fte_hours_saved_per_cycle": 4.5,
    "estimated_annual_saving_aud": 125000,
    "assumptions": "string"
  }
}
```

---

## LLM Prompting Strategy

### Extraction Prompt (process_extractor.py)
```
You are a business process analyst. From the following text, extract a structured business process.

Identify:
1. All distinct process steps (ordered)
2. The actor/role responsible for each step
3. Systems or tools used at each step
4. Data inputs and outputs at each step
5. Any decision points and their options

Output as a JSON array of steps following this schema: [...]

Rules:
- One step = one atomic action (do not combine or split steps)
- If an actor is unclear, infer from context or mark as "Unknown"
- Include ALL steps, even administrative or approval steps
- Flag steps that involve approval, sign-off, or exception handling

Text:
{text}
```

### Automation Scoring Logic (automation_scorer.py)
Score = weighted average of:
- **Rule complexity** (0–25): Is the decision rule simple and deterministic? High = more automatable
- **Exception rate** (0–25): Does this step have many exceptions or edge cases? Low = more automatable
- **System integration** (0–25): Are the systems involved API-enabled? High = more automatable
- **Data availability** (0–25): Is the data structured and accessible? High = more automatable

Scoring thresholds:
- 80–100: FULLY_AUTOMATABLE → recommend Power Automate / API
- 50–79: HUMAN_ASSISTED → recommend RPA with human validation gate
- 0–49: HUMAN_ONLY → flag for SLA optimisation, not automation

### Tool Recommendation Rules (tool_recommender.py)
```python
TOOL_RULES = {
    "approval_workflow": "Power Automate (Approvals connector)",
    "document_generation": "Power Automate (SharePoint + Word templates)",
    "erp_data_entry": "UiPath RPA (SAP/Dynamics UI automation)",
    "email_routing": "Power Automate (Outlook connector)",
    "itsm_ticket": "ServiceNow Workflow",
    "data_extraction_structured": "Power Automate (Excel/Dataverse)",
    "data_extraction_unstructured": "Azure AI Document Intelligence + Power Automate",
    "scheduling": "Power Automate (Scheduling connector)",
    "notifications": "Power Automate (Teams/Email connector)",
    "cross_system_sync": "Power Automate (Custom connector or Azure Logic Apps)",
    "complex_business_logic": "Custom API / Azure Function",
    "physical_action": "HUMAN_ONLY — no automation applicable"
}
```

---

## Artefact Specifications

### 1. Swimlane Diagram (draw.io XML)
- One swimlane per actor (horizontal or vertical layout)
- Steps as rounded rectangles, decisions as diamonds
- Arrows show sequence flow
- Colour coding: green = fully automatable, amber = human-assisted, red = human-only
- Export: draw.io XML (importable to Lucidchart, Visio, Confluence)

### 2. RACI Matrix (Excel)
- Rows: process steps
- Columns: actors
- Cells: R, A, C, I (multiple codes allowed)
- Summary tab: actor workload count
- Auto-formatted with ProcessBI colour scheme

### 3. SOP Document (Word .docx)
- ProcessBI branded template (header, footer, logo placeholder)
- One page per process step: step name, purpose, actor, inputs, outputs, decision criteria, exception handling
- Summary table at front: all steps with actor + automation class
- Uses python-docx; fully automated from Process JSON

### 4. Automation Opportunity Report (Word .docx + embedded chart)
- Executive summary: overall automation score, top 3 quick wins
- Per-step scorecard: step name, score, class, recommended tool, rationale
- ROI summary table: steps automatable, FTE hours saved, annual saving estimate
- Priority matrix chart: impact vs effort per step

### 5. Power BI Dashboard (PBIX template)
- Pre-built PBIX with placeholder Process JSON dataset
- Pages:
  1. **Process Overview**: step count, automation coverage %, estimated annual saving
  2. **Process Map**: visual swimlane (via custom visual or table-based representation)
  3. **Step Detail**: drill-through per step showing score, tool recommendation, compliance flags
  4. **ROI Model**: adjustable assumptions sliders (FTE cost, process frequency, implementation cost)
- Publish to ProcessBI Fabric workspace; share link with client

---

## Build Plan: 4-Week Sprint

### Week 1 — Core Extraction Pipeline
- [ ] `text_ingest.py`: support .txt, .docx, plain text paste
- [ ] `process_extractor.py`: Claude API extraction → Process JSON (test on 3 process transcripts)
- [ ] `actor_resolver.py`: canonical actor list deduplication
- [ ] `system_tagger.py`: system and data entity tagging
- [ ] Unit tests: 3 real process transcripts (Finance P2P, HR onboarding, IT service desk)
- **Deliverable**: Python script that takes a transcript and outputs valid Process JSON

### Week 2 — Artefact Generation
- [ ] `swimlane_generator.py`: draw.io XML swimlane from Process JSON
- [ ] `raci_generator.py`: Excel RACI with openpyxl
- [ ] `sop_generator.py`: Word SOP document with python-docx
- [ ] `pack_builder.py`: ZIP assembly
- **Deliverable**: End-to-end: transcript in → ZIP of swimlane + RACI + SOP out

### Week 3 — Intelligence Layer + Web UI
- [ ] `automation_scorer.py`: scoring logic + validation against manual score benchmark
- [ ] `hitl_classifier.py`: classification rules
- [ ] `tool_recommender.py`: recommendation mapping
- [ ] `compliance_flagger.py`: CPS 230 + SOX + GDPR pattern rules
- [ ] `roi_calculator.py`: FTE saving estimate model
- [ ] `api.py`: FastAPI POST /process endpoint
- [ ] `ui/index.html`: upload + download UI
- **Deliverable**: Web-accessible tool with full intelligence layer

### Week 4 — Power BI Integration + Demo Prep
- [ ] Build Finance P2P Process JSON demo dataset
- [ ] Build Power BI PBIX template with 3 pages
- [ ] `pbi_template_loader.py`: inject Process JSON into PBIX dataset
- [ ] Demo script: walkthrough with P2P process, live generation, client artefact pack review
- [ ] Register in `fix_observations` (per CLAUDE.md Standing Development Pattern)
- **Deliverable**: Demo-ready tool + complete P2P process artefact pack

---

## File Paths

| Component | Path |
|---|---|
| Main worker | `workers/process_intelligence_tool/` |
| Web UI | `workers/process_intelligence_tool/ui/index.html` |
| FastAPI entry | `workers/process_intelligence_tool/api.py` |
| Demo dataset | `outputs/processbi-3d-deploy/demo/p2p-process/` |
| Power BI template | `outputs/processbi-3d-deploy/templates/process-intelligence.pbix` |
| Sample output pack | `outputs/processbi-3d-deploy/demo/p2p-artefact-pack.zip` |
| SOP template | `outputs/processbi-3d-deploy/templates/sop-template.docx` |

---

## Dependencies

```
fastapi
uvicorn
anthropic          # Claude API
python-docx        # Word generation
openpyxl           # Excel generation
xmltodict          # draw.io XML manipulation
lxml               # XML processing
jinja2             # Template rendering for SOP/HTML
python-dotenv      # secrets.env loading
psycopg2           # PG logging to fix_observations
```

---

## Observations / Risks

1. **LLM consistency**: Claude extraction quality varies with transcript quality. Mitigation: structured extraction prompt with strict JSON schema and retry on validation failure (per loop_retry_gold_standard.md: 5 loops minimum for extraction).

2. **Visio VSDX import**: Reading existing Visio files adds complexity. MVP accepts text/transcript only; Visio import is Week 5+ scope.

3. **Power BI PBIX manipulation**: Programmatic injection into PBIX is achievable via the Tabular Object Model (TOM) or CSV dataset swap, but requires testing. If blocked, MVP delivers a CSV that the consultant loads manually into the template.

4. **RACI completeness**: RACI requires human review — AI will get actor assignments approximately right but not perfectly. Build in a "review mode" where the consultant can edit the RACI before finalising.

5. **Compliance rules**: CPS 230 flags in MVP are pattern-based (keyword matching on step descriptions). Phase 2 adds a full rule engine with APRA references. Don't claim regulatory compliance in MVP — position as "compliance indicator" only.

---

_Spec approved 2026-06-24. Build owner: ProcessBI / NightFactory._

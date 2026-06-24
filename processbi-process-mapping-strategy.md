# ProcessBI — Business Process Mapping: Strategy Memo

_Date: 2026-06-24 | Author: Claude (Cowork session) | Status: LIVE_

---

## Executive Summary

ProcessBI has a genuine, validated white space: **no consulting firm in the data space currently offers integrated process mapping + automation enablement as a bundled service.** This is not a crowded market with a marginal differentiation story. It is a structurally absent offering.

The market forces are aligned:
- APRA CPS 230 (effective July 2025) mandates documented operational process maps for material business services at Australian regulated entities
- Nintex end-of-life (June 2026) is displacing 40,000+ enterprise workflow customers who need to re-document and re-automate
- Only 16% of enterprise AI deployments are true agents — organisations need a trusted guide from "we have processes" to "those processes are automated"
- Microsoft Fabric IQ (Build 2026) makes Power BI semantic models the intelligence layer for enterprise AI agents — ProcessBI's native stack becomes a moat

**Recommendation: move immediately.** Build the consulting methodology and the Process Intelligence Tool in parallel. The methodology is sellable now. The tool is demoed within 4 weeks.

---

## Market Validation

### What the Competition Does

| Category | Players | What They Miss |
|---|---|---|
| Enterprise BPM tools | SAP Signavio, ARIS, Celonis | $150K–$600K/year; tool vendors, not consulting delivery; no workshop-to-blueprint flow |
| Process mining | Celonis, UiPath Process Mining | Requires event log data from ERP; can't discover from human interviews |
| Automation platforms | Power Automate, UiPath, ServiceNow | Implement automations but inherit whatever process docs exist |
| SOP tools | Tango, Scribe, Trainual | Capture existing documented processes; no automation mapping |
| Consulting firms | McKinsey, Accenture, EY | Deliver swimlanes and SOPs; hand off automation to separate engagement |

**The gap:** nobody in the market takes a client from "here's how we think our process works" → structured map → automation blueprint → ROI projection in a single, AI-accelerated engagement.

### Market Size
- AI Process Intelligence market: $2.45B (2025) → $7.85B (2034), CAGR ~15%
- Enterprise process automation consulting: $10B+ globally; fragmented between BPM vendors and SI partners
- APRA CPS 230 compliance addressable market in AU: 400+ regulated entities (banks, super funds, insurers) needing documented material business service maps by end-2025

---

## ProcessBI Service Offering

### Core Service: Process Intelligence Engagement
A 4–6 week consulting engagement that delivers:

1. **Process Discovery** — Facilitated workshops + structured interview capture (Days 1–5)
2. **Process Map Generation** — AI-accelerated swimlane BPMN diagrams (Days 5–10)
3. **RACI + SOP Pack** — Auto-generated from the process model, human-reviewed (Days 8–12)
4. **Automation Opportunity Assessment** — Each step scored 0–100, classified as automatable/human-in-loop/human-only (Days 10–15)
5. **Automation Blueprint** — Tool-specific recommendations (Power Automate / ServiceNow / custom API / RPA), sequenced by ROI (Days 12–18)
6. **Client Artefact Pack** — Visio-compatible maps, RACI Excel, SOP Word/PDF set, Power BI ROI dashboard (Days 18–22)

### Pricing Guidance (enterprise consulting rates)
- **Tier 1 — Single Process Domain** (e.g., Procure-to-Pay): $45,000–$75,000 | 3–4 weeks
- **Tier 2 — Multi-Domain Process Mapping** (3–5 process families): $120,000–$180,000 | 5–8 weeks
- **Tier 3 — Enterprise-Wide Process Intelligence** (full operating model mapping + automation roadmap): $250,000–$400,000 | 10–14 weeks
- **Compliance Pack Add-on** (APRA CPS 230, SOX, GDPR flagging): +$15,000–$30,000

Compare to: Celonis Year 1 = $470K–$1.5M (software only, no consulting deliverables); McKinsey process transformation = $500K+.

---

## Recommended Tool Stack

| Role | Tool | Rationale |
|---|---|---|
| Client-facing process maps | **Lucidchart (Enterprise)** | Open API, MS365 native, Visio export, enterprise compliance, consulting partner pricing available |
| Workshop SOP capture | **Tango (Business)** | AI agents for automation suggestions, Guide Me walkthroughs, screen-capture in live sessions |
| Formal SOP library | **Scribe (Enterprise)** | HIPAA-grade, approval workflows, version control — regulated industry clients |
| Automation recommendation target | **Power Automate** | Primary post-Nintex migration target; 1,000+ connectors; M365 already licensed at most clients |
| Internal process generation | **draw.io XML + custom Python pipeline** | Open source, free, standard XML output for programmatic generation |
| Client dashboard | **Power BI / Microsoft Fabric** | ProcessBI's native stack; embeds process KPIs + ROI projections |

### API / Build Opportunity
Both Lucidchart and draw.io have APIs allowing ProcessBI to programmatically generate diagrams from structured process JSON. This is the foundation of the Process Intelligence Tool (see MVP spec).

---

## Microsoft Fabric / Power BI Integration: The Moat

ProcessBI's differentiation from every other process mapping consultancy is the Fabric connection. Competitors deliver static artefacts. ProcessBI delivers **living process intelligence**.

### What ProcessBI builds for every client:
- Process steps stored as structured Fabric dataset (OneLake)
- Process KPIs as Power BI semantic model measures (cycle time, error rate, automation coverage %)
- Automation ROI projections as embedded Power BI reports in client portal
- Power Automate flows wired from automation recommendations — not just documented, but initiated
- With Fabric IQ (2026): process ontologies feed enterprise AI agents → processes become machine-readable

### The pitch to the CIO/CDO:
> "Other firms give you a Visio file and a Word document. We give you a live process intelligence layer in your Fabric environment — maps, metrics, and automation triggers — that your team owns and your AI agents can query."

---

## Compliance Driver: APRA CPS 230

APRA CPS 230 (Operational Risk Management) — effective July 2025 for all APRA-regulated entities — requires:
- Documented material business service (MBS) process maps
- Identification of critical operations within each MBS
- Tolerance metrics (maximum time and minimum service level)
- Documented roles and responsibilities (RACI equivalent)
- Regular testing and review

**ProcessBI delivers every one of these as standard outputs.** This is a compliance-driven purchase, not a discretionary one, for 400+ AU regulated entities. Marketing message: "Achieve CPS 230 process documentation compliance in 4 weeks."

---

## Go-to-Market

### Primary ICP
- Head of Operations / Chief Operating Officer at APRA-regulated entity (bank, super fund, insurer, 200–5,000 employees)
- Head of Digital / Chief Digital Officer evaluating automation investments ($500K–$5M budget)
- CIO at large enterprise with Nintex EOL migration requirement

### Channel Strategy
1. **Direct outreach** to COOs at AU regulated entities on CPS 230 compliance need
2. **Microsoft Partner Network**: leverage existing ProcessBI Fabric/Power BI credentials to access Microsoft's enterprise pipeline
3. **Content marketing**: thought leadership on process-to-automation gap (LinkedIn articles — use `linkedin-brand-content` skill)
4. **Industry events**: APRA compliance, digital transformation conferences

### Competitive Positioning
- vs. Celonis: "A quarter of the cost, delivered by consultants who hand you the roadmap, not just a dashboard"
- vs. McKinsey/Accenture: "Faster, cheaper, with a tool layer that persists after we leave"
- vs. UiPath partners: "We map first, then automate — not the other way around"
- vs. local BPM consultants: "AI-accelerated delivery and a Microsoft Fabric integration no boutique firm offers"

---

## NF Actions

- [ ] Build Process Intelligence Tool MVP (see `process-intelligence-tool-mvp-spec.md`)
- [ ] Create ProcessBI Process Mapping service page and collateral
- [ ] Write CPS 230 compliance pitch document
- [ ] Develop one industry-specific process template pack (Finance: P2P, R2R, OTC)
- [ ] Identify 10 target enterprises for first outreach wave
- [ ] Register ProcessBI as Microsoft AI Cloud Partner (for Fabric/Power BI co-sell)

---

_Provenance: Cowork session 2026-06-24. Research brief: processbi-process-mapping.md._

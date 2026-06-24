# GHL Sub-Account Configuration — ProcessBI
_Generated: 2026-06-24 | Go-live target: 2026-07-01_

---

## 1. Sub-Account Identity

| Field | Value |
|---|---|
| Sub-account name | ProcessBI |
| Business type | B2B Consulting |
| Industry | Management Consulting / Business Process Management |
| Target geography | Australia (AU) |
| Currency | AUD |
| Timezone | Australia/Sydney (AEST/AEDT) |
| Primary contact email | (ProcessBI owner email) |
| Website | https://processbi.com.au |
| Logo | Navy/teal ProcessBI mark (upload to GHL Media Library) |

---

## 2. Opportunities Pipeline — "ProcessBI Deal Flow"

Create pipeline named **`ProcessBI Deal Flow`** with the following stages in order.

Each stage has a default probability and optional `auto-move` trigger where noted.

| # | Stage Name | Probability | Notes / Auto-triggers |
|---|---|---|---|
| 1 | Prospect Identified | 5% | Contact created, tagged `pbi-prospect`. No sequence yet. |
| 2 | LinkedIn/Email Contacted | 10% | Entry point for outreach sequences. Triggers **Workflow: New Lead Outreach Sequence** |
| 3 | Discovery Call Booked | 25% | Calendar booking confirmed. Triggers confirmation email + prep brief. |
| 4 | Discovery Call Done → Proposal Sent | 40% | Stage split: call completed AND proposal emailed. Triggers **Workflow: Proposal Follow-Up** |
| 5 | Proposal Under Review | 50% | Contact is reviewing proposal. 3-day reminder auto-triggers if no status change. |
| 6 | Engagement Contract Signed | 75% | DocuSign / manual confirm. Triggers **Workflow: Contract Signed → Kick-Off Checklist** |
| 7 | Project Kick-Off | 80% | Kick-off meeting booked. Triggers client onboarding email. |
| 8 | Delivery In Progress | 85% | Active engagement. Milestone tracking via custom field. |
| 9 | Project Complete → Upsell/Retainer | 90% | Final deliverable sent. Triggers **Workflow: Upsell/Retainer Offer** |
| 10 | Closed Won | 100% | Retainer confirmed or repeat project booked. |
| 11 | Closed Lost | 0% | Reason captured via custom field `pbi_lost_reason`. |

**Pipeline currency:** AUD  
**Default deal value field:** `Opportunity Value (AUD)`

---

## 3. Custom Fields (Contact & Opportunity Level)

### Contact-Level Custom Fields

| Field Name | Type | Options / Notes |
|---|---|---|
| `pbi_company_size` | Dropdown | 500–1,000; 1,001–5,000; 5,000+ |
| `pbi_industry_vertical` | Dropdown | Financial Services; Insurance; Energy/Utilities; Healthcare; Government; Manufacturing; Telco; Other |
| `pbi_target_persona` | Dropdown | CEO; COO; CFO; CIO/CTO; Head of Operations; Risk/Compliance Lead |
| `pbi_pain_point` | Multi-select | Process inefficiency; Compliance gap (CPS 230/ISO 9001); Reporting visibility; Automation readiness; Cost reduction |
| `pbi_referral_source` | Dropdown | LinkedIn; Email outreach; Referral; Tender; Inbound; Event |
| `pbi_abn` | Text | Australian Business Number (for invoicing) |

### Opportunity-Level Custom Fields

| Field Name | Type | Notes |
|---|---|---|
| `pbi_engagement_type` | Dropdown | Process Discovery Workshop; Process Mapping Engagement; Automation Blueprint; Reporting Suite; Monthly Retainer |
| `pbi_project_value_aud` | Number | Project total (excl. GST) |
| `pbi_retainer_monthly_aud` | Number | Monthly retainer value (excl. GST) |
| `pbi_proposal_sent_date` | Date | Auto-set when stage = Proposal Sent |
| `pbi_contract_signed_date` | Date | Auto-set when stage = Contract Signed |
| `pbi_project_start_date` | Date | |
| `pbi_project_end_date` | Date | |
| `pbi_invoice_count` | Number | Running invoice count for PBI-YYYY-NNN numbering |
| `pbi_lost_reason` | Dropdown | Price; No budget; Went with competitor; No decision; Timing |

---

## 4. Tags

| Tag | Purpose |
|---|---|
| `pbi-prospect` | Any identified target before contact |
| `pbi-active-outreach` | In sequence |
| `pbi-discovery-booked` | Calendar booking confirmed |
| `pbi-proposal-sent` | Proposal emailed |
| `pbi-contract-signed` | Signed — project in progress |
| `pbi-retainer` | Active retainer client |
| `pbi-closed-lost` | Did not convert |
| `pbi-c-suite` | CEO / COO / CFO / CIO persona |
| `pbi-cps230` | CPS 230 / compliance angle identified |
| `pbi-au-enterprise` | Large AU enterprise (1,000+ staff) |

---

## 5. Calendars

### Discovery Call Calendar

| Setting | Value |
|---|---|
| Name | ProcessBI Discovery Call |
| Duration | 60 minutes |
| Buffer after | 15 minutes |
| Booking link slug | `processbi-discovery` |
| Confirmation email | Yes — include prep questionnaire link |
| Reminder | 24h + 1h before |
| Owner | ProcessBI consultant |

### Proposal Review Call Calendar

| Setting | Value |
|---|---|
| Name | ProcessBI Proposal Review |
| Duration | 45 minutes |
| Buffer after | 15 minutes |
| Booking link slug | `processbi-proposal-review` |

---

## 6. Invoicing System Configuration

> **Decision: Use GHL built-in invoicing** (no Stripe required — GHL invoicing supports manual bank transfer payment).  
> See `invoice-template.md` for the full invoice design spec.

### GHL Invoicing Settings for ProcessBI

| Setting | Value |
|---|---|
| Invoice numbering | PBI-2026-001, PBI-2026-002 … (manual increment — tracked in `pbi_invoice_count` field) |
| Tax label | GST (10%) |
| Currency | AUD |
| Payment methods enabled | Bank Transfer (BSB/Account provided in invoice footer) |
| Stripe | DISABLED — do not connect Stripe to ProcessBI sub-account |
| Default payment terms | Net 14 days |
| Invoice footer | ABN, bank details, GST registration note |
| Auto-send | Yes — trigger from GHL workflow after stage change or manual action |

### Standard Line Items (Product Catalogue)

Create the following products in GHL for quick invoice population:

| Product Name | Default Price (AUD excl. GST) | Type |
|---|---|---|
| Process Discovery Workshop (Half Day) | $4,500 | One-time |
| Process Discovery Workshop (Full Day) | $8,500 | One-time |
| Process Mapping Engagement | $15,000–$40,000 | One-time (custom) |
| Automation Blueprint | $12,000–$25,000 | One-time (custom) |
| Power BI / Fabric Reporting Suite | $18,000–$35,000 | One-time (custom) |
| Monitoring Retainer — Essential | $3,000/month | Recurring |
| Monitoring Retainer — Standard | $5,000/month | Recurring |
| Monitoring Retainer — Premium | $8,000/month | Recurring |
| Ad hoc Advisory (per hour) | $450/hour | One-time |

### Payment Terms Logic

- **Project work:** 50% invoice on contract signing + 50% on final delivery.
  - Create two invoices per project: `PBI-YYYY-NNN-A` (deposit) and `PBI-YYYY-NNN-B` (completion).
- **Retainer:** Monthly invoice in advance, due on the 1st of each month.
- **Late payment:** Note in invoice: "Late payment fee of 2% per month applies after 14 days."

---

## 7. Email Templates (GHL Email Builder)

Create the following base templates in GHL:

| Template Name | Subject | Purpose |
|---|---|---|
| `pbi-outreach-1` | "A question about [Company]'s operational processes" | Cold LinkedIn/email #1 |
| `pbi-outreach-2` | "Following up — process efficiency at [Company]" | Follow-up #2 (Day 4) |
| `pbi-outreach-3` | "Last note — process intelligence for [Company]" | Follow-up #3 (Day 10) |
| `pbi-proposal-followup` | "Your ProcessBI proposal — any questions?" | 3-day proposal reminder |
| `pbi-contract-welcome` | "Welcome — let's kick off your engagement" | Post-signature onboarding |
| `pbi-invoice-send` | "Invoice [PBI-YYYY-NNN] from ProcessBI" | Invoice delivery |
| `pbi-invoice-reminder` | "Payment reminder — Invoice [PBI-YYYY-NNN]" | 7-day payment nudge |
| `pbi-upsell-retainer` | "Protecting your process gains — retainer offer" | Post-project upsell |
| `pbi-lead-magnet-delivery` | "Your Free Process Health Check Template" | Lead magnet delivery |

---

## 8. GHL Setup Execution Notes

Since GHL runs locally via `workers/ghl_agency_setup.py`:

1. Set env var `GHL_PROCESSBI_API_KEY` in `workers/secrets.env` once the ProcessBI sub-account PIT is created.
2. Add `GHL_PROCESSBI_LOCATION_ID` to `secrets.env` once the sub-account location ID is confirmed.
3. The `ghl_agency_setup.py` script can be extended with a `--profile processbi` flag to scope all GHL API calls to the ProcessBI location.
4. All pipeline, tag, and custom field creation can be idempotently run via the GHL Pipelines, Tags, and Custom Fields API endpoints scoped to `GHL_PROCESSBI_LOCATION_ID`.
5. Do NOT run `ghl_agency_setup.py` with DM (DesignersMeet) keys for ProcessBI setup — use separate ProcessBI PIT.

---

## 9. Contacts Import / Seed Data

On go-live (July 1), seed the following:
- Import initial prospect list (AU enterprise C-suite contacts) with tags `pbi-prospect`, `pbi-c-suite`, `pbi-au-enterprise`.
- Assign to **Stage 1: Prospect Identified** in `ProcessBI Deal Flow` pipeline.
- Source field: LinkedIn / internal research.

---

_Next: See `ghl-automations.md` for all workflow automation specs._
_See `invoice-template.md` for the full invoice design and PDF spec._

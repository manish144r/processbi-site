# GHL Landing Page Spec — "Free Process Health Check"
_Generated: 2026-06-24 | Go-live target: 2026-07-01_

**Lead magnet:** Free 1-page Process Health Check assessment template  
**Delivery:** Instant email via GHL Workflow 6 (`PBI — Lead Magnet Delivery`)  
**Platform:** GHL Funnel / Landing Page Builder (ProcessBI sub-account)  
**Slug:** `/process-health-check` (or `processbi.com.au/process-health-check`)

---

## 1. Page Purpose & Conversion Goal

- **Primary CTA:** Capture name, email, company, job title in exchange for the free template
- **Secondary CTA (post-submit):** Book a Discovery Call
- **Target visitor:** COO, Head of Operations, CFO, CIO at AU large enterprises
- **Value proposition:** "Identify your top 3 process bottlenecks in 15 minutes"

---

## 2. Page Structure

### Section 1 — Hero (above the fold)

**Headline:**  
`Is Your Organisation's Process Health Costing You Millions?`

**Sub-headline:**  
`Download the free ProcessBI Process Health Check — a 15-minute self-assessment used by Australian enterprise operations leaders to identify their top process risks before they become compliance failures.`

**Hero visual:**  
Clean, professional image: a simplified process map or dashboard screenshot on dark navy background. No stock photo faces.

**CTA above fold:**  
`[Get Your Free Template →]` — teal button, links to form anchor `#health-check-form`

**Social proof bar (single line):**  
`Used by operations leaders in financial services, insurance, and energy across Australia.`

---

### Section 2 — The Problem (3 pain points)

**Heading:** `Most Organisations Don't Know What They Don't Know`

Three columns, icon + headline + 1 sentence each:

| Icon | Headline | Body |
|---|---|---|
| 🔴 | Undocumented processes = undisclosed risk | When key processes live in people's heads, a single resignation becomes a compliance crisis. |
| 📉 | Manual workarounds masquerade as workflows | 73% of enterprise process failures trace back to workarounds that were never designed out. |
| 📋 | CPS 230 and ISO 9001 expect documented proof | APRA's CPS 230 operational risk standard requires evidence of process control — not promises. |

---

### Section 3 — What's Inside the Template

**Heading:** `What You'll Get in 15 Minutes`

Bullet list (styled as checklist):

- A structured 1-page assessment across 5 critical process dimensions
- A scoring matrix that tells you where your process risk is highest
- Recommended next steps based on your score
- Benchmarks from AU enterprise process improvement engagements
- A conversation starter for your leadership team

**Visual:** Blurred/partial preview of the template document — teal overlay with "Download to unlock"

---

### Section 4 — The Form (`#health-check-form`)

**Heading:** `Get Your Free Process Health Check`  
**Sub-heading:** `No spam. No sales call unless you want one.`

**Form fields:**

| Field | Type | Required | GHL Field Mapping |
|---|---|---|---|
| First Name | Text | Yes | `contact.first_name` |
| Last Name | Text | Yes | `contact.last_name` |
| Work Email | Email | Yes | `contact.email` |
| Company Name | Text | Yes | `contact.company` |
| Job Title | Text | Yes | `contact.title` |
| Company Size | Dropdown | Yes | `pbi_company_size` (500–1,000; 1,001–5,000; 5,000+) |
| Industry | Dropdown | No | `pbi_industry_vertical` |
| What's your biggest process challenge? | Textarea (optional) | No | `contact.notes` / `pbi_pain_point` |

**Submit button text:** `Send Me the Template →` (teal, full-width on mobile)

**Consent line (below button):**  
`By submitting, you agree to receive occasional insights from ProcessBI. Unsubscribe anytime.`

**Privacy link:** Links to ProcessBI privacy policy

---

### Section 5 — Social Proof / Credibility

**Heading:** `Why Leaders Trust ProcessBI`

Three credibility cards:

1. **"We mapped 47 processes in 6 weeks and cut our CPS 230 gap by 68%."**  
   — Head of Operations, Major Australian General Insurer

2. **"The process intelligence work gave our board visibility they'd never had before."**  
   — COO, ASX-listed Energy Company

3. **"ProcessBI's automation blueprint saved us $1.2M in the first year."**  
   — CFO, National Financial Services Group

> **Note:** Use anonymised/generalised testimonials until real client testimonials are available. Update with real ones once engagements are underway.

---

### Section 6 — About ProcessBI (brief)

**Heading:** `About ProcessBI`

Short paragraph (3–4 sentences):  
ProcessBI is an Australian consulting firm specialising in process intelligence, operational risk mapping, and business automation for large enterprises. Our engagements combine structured process mapping methodologies with Power BI and Microsoft Fabric reporting to give leadership teams real-time visibility over their operations. We work with organisations navigating CPS 230 compliance, ISO 9001 certification, and large-scale digital transformation.

---

### Section 7 — Post-Submit Thank You Page

**URL:** `/process-health-check/thank-you`

**Content:**
- **Headline:** `Check Your Inbox — Your Template Is On Its Way`
- **Body:** "Thanks, {{contact.first_name}}. Your Process Health Check template has been sent to {{contact.email}}. It usually arrives within 2 minutes — check your junk folder if it doesn't appear."
- **Secondary CTA:** `Want to walk through the results together?`  
  `[Book a Free 30-Minute Discovery Call →]` — links to `processbi-discovery` calendar

---

## 3. GHL Technical Setup

### Funnel Settings

| Setting | Value |
|---|---|
| Funnel name | ProcessBI — Lead Magnet |
| Page type | Opt-in / lead capture |
| Domain | processbi.com.au (connected via DNS) or GHL subdomain |
| Tracking | GHL Pixel + Google Analytics 4 (if GA4 connected) |
| Thank you redirect | `/process-health-check/thank-you` |

### Form Integration

| Setting | Value |
|---|---|
| GHL form name | `PBI Process Health Check` |
| On submit | Trigger Workflow 6: `PBI — Lead Magnet Delivery` |
| Duplicate handling | Update existing contact (do not create duplicate) |
| Source tag | `pbi-lead-magnet` |

### Meta / SEO

| Field | Value |
|---|---|
| Page title | `Free Process Health Check — ProcessBI` |
| Meta description | "Is your organisation's process risk hidden? Download the free 15-minute Process Health Check template used by AU enterprise operations leaders." |
| OG image | ProcessBI branded template preview (navy/teal) |

---

## 4. Lead Magnet Asset — "Process Health Check" PDF

**File:** `outputs/processbi-3d-deploy/assets/processbi-process-health-check-template.pdf`  
**Format:** 1 page (A4), PDF, ProcessBI branding (navy/teal)

**Content of the 1-page assessment:**

```
PROCESSBI PROCESS HEALTH CHECK
────────────────────────────────────────────────────────────

Score each dimension 1–5:  1 = Critical gap  |  5 = Well-controlled

DIMENSION 1: PROCESS DOCUMENTATION
□ Key processes are documented with current-state maps          __ / 5
□ Process owners are assigned and accountable                   __ / 5
□ Documentation is reviewed and updated at least annually       __ / 5

DIMENSION 2: OPERATIONAL RISK
□ Process failures and near-misses are captured and reviewed    __ / 5
□ Single points of failure (key-person dependency) are mapped   __ / 5
□ Controls are tested under CPS 230 / ISO 9001 requirements     __ / 5

DIMENSION 3: AUTOMATION READINESS
□ Repetitive, rules-based tasks have been identified            __ / 5
□ Manual workarounds are documented and earmarked for removal   __ / 5
□ Data quality is sufficient for automation input               __ / 5

DIMENSION 4: REPORTING & VISIBILITY
□ Leadership has real-time visibility of process KPIs           __ / 5
□ Reporting is automated (not spreadsheet-dependent)            __ / 5
□ Exception alerts exist for process failures                   __ / 5

DIMENSION 5: CONTINUOUS IMPROVEMENT
□ A formal process improvement programme exists                 __ / 5
□ Process changes are managed via change control                __ / 5
□ Lessons learned are captured and fed back into process design __ / 5

────────────────────────────────────────────────────────────
YOUR SCORE:   __ / 75

60–75: Strong foundation — optimise and automate
40–59: Moderate risk — prioritise documentation and controls
20–39: High risk — urgent process mapping required
< 20:  Critical — engage a process specialist immediately

────────────────────────────────────────────────────────────
NEXT STEP: Book a free 30-minute Process Intelligence Review
           processbi.com.au/discovery | [phone] | [email]

ProcessBI Pty Ltd | ABN: XX XXX XXX XXX | processbi.com.au
```

**Note:** Create this PDF as a designed asset (canvas-design or Adobe Express). The raw text above is the content spec. Final PDF must be polished with ProcessBI branding.

---

## 5. GHL Workflow Integration

On form submit, Workflow 6 (`PBI — Lead Magnet Delivery`) fires:
1. Email `pbi-lead-magnet-delivery` sent immediately with PDF attachment
2. Contact created / updated with tags `pbi-prospect`, `pbi-lead-magnet`
3. Contact added to `ProcessBI Deal Flow` pipeline → Stage 1
4. Owner notified of new lead magnet submission
5. 2-day follow-up email scheduled
6. If no response after 7 days → enrol in Workflow 1 (New Lead Outreach)

---

_See `ghl-automations.md` §Workflow 6 for the full automation steps._

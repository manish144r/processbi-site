# GHL Automation Workflow Specs — ProcessBI
_Generated: 2026-06-24 | Go-live target: 2026-07-01_

All workflows operate within the **ProcessBI GHL sub-account** (location ID: `GHL_PROCESSBI_LOCATION_ID`).  
All emails use templates defined in `ghl-processbi-config.md §7`.

---

## Workflow 1: New Lead Outreach Sequence

**Name:** `PBI — New Lead Outreach`  
**Trigger:** Contact is added to pipeline **ProcessBI Deal Flow** at stage **LinkedIn/Email Contacted** (Stage 2)  
**Also triggers on:** Tag `pbi-active-outreach` added to any contact  
**Goal:** Warm the prospect through a 3-touch email sequence over ~10 days

### Steps

| Step | Delay | Action | Notes |
|---|---|---|---|
| 1 | Immediate | Send email `pbi-outreach-1` | Subject: "A question about [Company]'s operational processes" — personalise with `{{contact.company}}` and `{{contact.first_name}}` |
| 2 | Wait | 4 days | |
| 3 | Condition | Check: Did contact reply or book a call? | If YES → exit workflow; move to Stage 3 |
| 4 (if no reply) | — | Send email `pbi-outreach-2` | Subject: "Following up — process efficiency at [Company]" |
| 5 | Wait | 6 days | |
| 6 | Condition | Check: Did contact reply or book a call? | If YES → exit workflow; move to Stage 3 |
| 7 (if no reply) | — | Send email `pbi-outreach-3` | Subject: "Last note — process intelligence for [Company]" — includes link to Free Process Health Check lead magnet |
| 8 | Wait | 7 days | |
| 9 | End | Tag contact `pbi-no-response-outreach-1` | Keep in pipeline Stage 2 for future re-engagement |

**Exit conditions:**  
- Contact books a discovery call → auto-move to Stage 3  
- Contact replies to any email → notify owner; pause sequence; owner manually advances stage  
- Contact unsubscribes → remove from sequence; tag `pbi-unsubscribed`

**Personalisation tokens:**  
`{{contact.first_name}}`, `{{contact.company}}`, `{{contact.title}}`

---

## Workflow 2: Proposal Follow-Up (No-Response Reminder)

**Name:** `PBI — Proposal Follow-Up`  
**Trigger:** Opportunity moves to stage **Discovery Call Done → Proposal Sent** (Stage 4)  
**Goal:** Keep the deal moving with a single polite 3-day nudge; escalate to owner if still no response

### Steps

| Step | Delay | Action | Notes |
|---|---|---|---|
| 1 | Immediate | Internal task notification | Notify owner: "Proposal sent to {{contact.first_name}} at {{contact.company}}. Follow up if no response in 3 days." |
| 2 | Wait | 3 days | |
| 3 | Condition | Has stage changed from Stage 4 in the last 3 days? | If YES (stage advanced or moved to Closed Lost) → exit workflow |
| 4 (no change) | — | Send email `pbi-proposal-followup` | Subject: "Your ProcessBI proposal — any questions?" — offer to jump on a quick call; include booking link `processbi-proposal-review` |
| 5 | Wait | 4 days | |
| 6 | Condition | Has stage changed? | If YES → exit |
| 7 (no change) | — | Create internal task for owner | "⚠️ No proposal response after 7 days — {{contact.first_name}} @ {{contact.company}}. Consider a phone call or re-qualification." |
| 8 | End | Log no-response tag | Tag: `pbi-proposal-no-response` |

**Exit conditions:**  
- Stage changes to any other stage → workflow exits  
- Contact books proposal review call → workflow exits  
- Contact replies → owner notified, workflow exits

---

## Workflow 3: Contract Signed → Kick-Off Checklist

**Name:** `PBI — Contract Signed Kick-Off`  
**Trigger:** Opportunity moves to stage **Engagement Contract Signed** (Stage 6)  
**Goal:** Immediately confirm the relationship, send welcome email, and create internal kick-off tasks

### Steps

| Step | Delay | Action | Notes |
|---|---|---|---|
| 1 | Immediate | Send email `pbi-contract-welcome` | Subject: "Welcome — let's kick off your engagement" — include kick-off questionnaire link + booking link for kick-off call; congratulatory, professional tone |
| 2 | Immediate | Create internal task: Generate deposit invoice | "Create PBI-YYYY-NNN-A (50% deposit invoice) for {{contact.company}} — {{pbi_engagement_type}} — AUD {{pbi_project_value_aud / 2}}" |
| 3 | Immediate | Create internal task: Send deposit invoice | "Send invoice within 24 hours of contract signing" |
| 4 | Immediate | Create internal task: Book kick-off call | "Book kick-off call with {{contact.first_name}} within 5 business days" |
| 5 | Immediate | Create internal task: Prepare project folder | "Create SharePoint/Drive folder: ProcessBI / {{contact.company}} / {{pbi_engagement_type}}" |
| 6 | Immediate | Add tag | `pbi-contract-signed` |
| 7 | Immediate | Remove tag | `pbi-active-outreach` (if present) |
| 8 | Wait | 1 day | |
| 9 | Condition | Has deposit invoice been sent? (check `pbi_invoice_count` updated) | If NO → escalate to owner with reminder |
| 10 | End | Move opportunity to Stage 7: Project Kick-Off | Auto-advance after kick-off task confirmed |

**Internal checklist (to be completed by owner before Stage 8: Delivery In Progress):**
- [ ] Deposit invoice sent and received
- [ ] Kick-off call scheduled
- [ ] Project folder created
- [ ] Engagement lead assigned
- [ ] Statement of Work (SOW) / engagement plan shared with client

---

## Workflow 4: Invoice Sent → Payment Reminder

**Name:** `PBI — Invoice Payment Reminder`  
**Trigger:** GHL Invoice status = Sent (i.e., when any invoice is emailed to client)  
**Goal:** Ensure payment without manual chasing; send one polite reminder at Day 7

### Steps

| Step | Delay | Action | Notes |
|---|---|---|---|
| 1 | Immediate | Log invoice in opportunity notes | "Invoice {{invoice_number}} sent — AUD {{invoice_amount}} — due {{due_date}}" |
| 2 | Wait | 7 days | |
| 3 | Condition | Has invoice been marked paid? | If YES → exit workflow; log payment confirmed |
| 4 (unpaid) | — | Send email `pbi-invoice-reminder` | Subject: "Payment reminder — Invoice {{invoice_number}}" — professional, non-aggressive; include bank details again; state due date |
| 5 | Wait | 7 days | |
| 6 | Condition | Has invoice been marked paid? | If YES → exit |
| 7 (still unpaid) | — | Create internal task for owner | "⚠️ Invoice {{invoice_number}} unpaid at Day 14 — {{contact.company}}. Escalate: call client directly or issue formal overdue notice." |
| 8 | End | Tag | `pbi-invoice-overdue` |

**Exit conditions:**  
- Invoice marked as paid at any point → workflow exits, tag `pbi-invoice-paid` added  

**Note:** For retainer invoices (monthly), this workflow fires each month on invoice send date.

---

## Workflow 5: Project Complete → Upsell / Retainer Offer

**Name:** `PBI — Project Complete Upsell`  
**Trigger:** Opportunity moves to stage **Project Complete → Upsell/Retainer** (Stage 9)  
**Goal:** Convert completed project clients to retainer or follow-on engagement

### Steps

| Step | Delay | Action | Notes |
|---|---|---|---|
| 1 | Immediate | Send email `pbi-upsell-retainer` | Subject: "Protecting your process gains — retainer offer" — acknowledge the completed project; position the retainer as "locking in the gains"; include 3 retainer tiers with pricing |
| 2 | Immediate | Create internal task | "Send completion invoice PBI-YYYY-NNN-B (50% final payment) for {{contact.company}}" |
| 3 | Immediate | Create internal task | "Book a debrief / retainer conversation with {{contact.first_name}} — within 5 business days" |
| 4 | Immediate | Add tag | `pbi-upsell-active` |
| 5 | Wait | 5 days | |
| 6 | Condition | Has contact responded or moved to Closed Won (retainer) or new opportunity created? | If YES → exit |
| 7 (no response) | — | Internal task | "Follow up on upsell offer — {{contact.first_name}} @ {{contact.company}}. Consider: offer a complimentary 30-min retainer scoping call." |
| 8 | Wait | 10 days | |
| 9 | Condition | Is contact now a retainer client? | If YES → tag `pbi-retainer`; move to Closed Won |
| 10 (no retainer) | — | Quarterly re-engagement | Schedule task for 90 days: "Re-engage {{contact.company}} — check if pain points have evolved" |
| 11 | End | Tag | `pbi-project-complete` (remove `pbi-upsell-active`) |

---

## Workflow 6: Lead Magnet — Free Process Health Check Delivery

**Name:** `PBI — Lead Magnet Delivery`  
**Trigger:** Form submission on GHL landing page "Free Process Health Check" (see `lead-magnet-landing.md`)  
**Goal:** Deliver the lead magnet instantly, tag, and initiate a warm nurture sequence

### Steps

| Step | Delay | Action | Notes |
|---|---|---|---|
| 1 | Immediate | Send email `pbi-lead-magnet-delivery` | Subject: "Your Free Process Health Check Template" — attach 1-page PDF assessment; include a soft CTA to book a discovery call |
| 2 | Immediate | Create contact (if new) | Tag `pbi-prospect`, `pbi-lead-magnet` |
| 3 | Immediate | Add to pipeline | ProcessBI Deal Flow → Stage 1: Prospect Identified |
| 4 | Immediate | Internal notification | "New lead magnet submission: {{contact.first_name}} @ {{contact.company}} — {{contact.email}}" |
| 5 | Wait | 2 days | |
| 6 | Send email | Light-touch follow-up | "Did the Process Health Check uncover anything? Happy to walk through it with you." + booking link |
| 7 | Wait | 5 days | |
| 8 | Condition | Did contact book a call or reply? | If YES → move to Stage 3; exit |
| 9 (no reply) | — | Move to Stage 2 | Tag `pbi-active-outreach`; enrol in **Workflow 1: New Lead Outreach Sequence** |

---

## Automation Summary Table

| Workflow | Trigger | Key Outcome |
|---|---|---|
| 1. New Lead Outreach | Stage 2 or tag `pbi-active-outreach` | 3-touch email sequence over 10 days |
| 2. Proposal Follow-Up | Stage 4 (Proposal Sent) | 3-day reminder; 7-day escalation |
| 3. Contract Signed | Stage 6 | Welcome email + deposit invoice task + kick-off checklist |
| 4. Invoice Reminder | Invoice sent | Day-7 payment nudge; Day-14 escalation |
| 5. Project Upsell | Stage 9 (Project Complete) | Retainer pitch email + conversion nurture |
| 6. Lead Magnet | Form submission | Instant delivery + 2-day follow-up + Workflow 1 enrol |

---

_All workflows require GHL Automation module enabled on the ProcessBI sub-account._  
_Test each workflow in GHL sandbox mode before go-live July 1._

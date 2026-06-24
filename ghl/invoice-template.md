# ProcessBI Invoice Template Spec
_Generated: 2026-06-24 | Go-live target: 2026-07-01_

This spec covers both the GHL invoice template and the custom PDF generator (`workers/processbi_invoice_gen.py`).  
The PDF generator is the primary output — GHL invoicing is the delivery mechanism.

---

## 1. Invoice Design — Visual Identity

### Colour Palette

| Element | Colour | Hex |
|---|---|---|
| Header background | Navy | `#0D1B2A` |
| Accent / dividers | Teal | `#1E8FA3` |
| Body text | Dark charcoal | `#1A1A2E` |
| Table header row | Navy `#0D1B2A` | White text `#FFFFFF` |
| Table alt rows | Light teal tint | `#F0F8FA` |
| Footer background | Light grey | `#F5F5F7` |
| Footer text | Muted grey | `#6B7280` |

### Typography

| Element | Font | Size | Weight |
|---|---|---|---|
| Company name | Montserrat | 22pt | Bold |
| Invoice heading | Montserrat | 16pt | SemiBold |
| Body / labels | Inter or Helvetica Neue | 10pt | Regular |
| Table headers | Inter | 9pt | Bold |
| Table body | Inter | 9pt | Regular |
| Footer | Inter | 8pt | Regular |

> **Note for `processbi_invoice_gen.py`:** Use `reportlab` with embedded fonts. Fallback to Helvetica if Montserrat/Inter not installed. See `workers/processbi_invoice_gen.py`.

---

## 2. Invoice Layout — Section by Section

### HEADER BLOCK (navy background)
```
┌─────────────────────────────────────────────────────────────────┐
│  [ProcessBI logo — white version, left-aligned]                 │
│                                         TAX INVOICE              │
│                                   Invoice No: PBI-2026-001       │
│                                   Date: DD Month YYYY            │
│                                   Due Date: DD Month YYYY        │
└─────────────────────────────────────────────────────────────────┘
```

- Logo: white/teal mark on navy background
- "TAX INVOICE" — right-aligned, 16pt, Montserrat SemiBold, white
- Invoice number, date, due date — right-aligned, 10pt, white

### FROM / TO BLOCK

```
FROM                                    BILL TO
ProcessBI Pty Ltd                       [Client Company Name]
[Street Address]                        [Contact Name / Dept]
[Suburb, State, Postcode]               [Street Address]
Australia                               [Suburb, State, Postcode]
ABN: XX XXX XXX XXX                     Australia
[Email] | [Phone]                       [Client ABN if applicable]
```

- Two-column layout: ProcessBI details left, client details right
- Teal horizontal divider line below this block

### LINE ITEMS TABLE

| # | Description | Qty | Unit Price (AUD) | GST | Amount (AUD) |
|---|---|---|---|---|---|
| 1 | [Service description] | 1 | $X,XXX.00 | $X.00 | $X,XXX.00 |
| 2 | [Service description] | 1 | $X,XXX.00 | $X.00 | $X,XXX.00 |

- Table header: navy background, white text
- Alternating rows: white / light teal tint `#F0F8FA`
- Teal left border on table

### TOTALS BLOCK (right-aligned)

```
                         Subtotal (excl. GST):    $XX,XXX.00
                         GST (10%):               $X,XXX.00
                         ─────────────────────────────────────
                         TOTAL DUE (AUD):         $XX,XXX.00
```

- Bold total row with navy left accent bar
- Currency: AUD, formatted with comma separators

### PAYMENT DETAILS BLOCK

```
PAYMENT DETAILS
───────────────────────────────────────────
Bank:           [Bank Name]
Account Name:   ProcessBI Pty Ltd
BSB:            XXX-XXX
Account No:     XXXXXXXXX

Reference:      PBI-2026-001 + [Company Name]

Payment Terms:  Net 14 days from invoice date.
                Late payment fee of 2% per month applies after due date.
```

### NOTES BLOCK (optional)

```
NOTES
───────────────────────────────────────────
[Any project-specific notes, milestone references, PO numbers]
```

Only rendered if notes are provided.

### FOOTER (light grey background)

```
ProcessBI Pty Ltd | ABN: XX XXX XXX XXX | GST Registered
[Website] | [Email] | [Phone]

This invoice is GST-compliant under Australian Tax Law (A New Tax System (Goods and Services Tax) Act 1999).
For queries regarding this invoice, contact [accounts email].

Page X of Y
```

---

## 3. Invoice Numbering System

**Format:** `PBI-YYYY-NNN`  
**Examples:** `PBI-2026-001`, `PBI-2026-002`

**Split invoice suffixes (project work):**
- Deposit (50%): `PBI-2026-001-A`
- Final (50%): `PBI-2026-001-B`

**Retainer invoices:**
- Monthly recurring: `PBI-2026-001-R01`, `PBI-2026-001-R02` (R = retainer month sequence)

**Tracking:** Increment counter in GHL custom field `pbi_invoice_count` per opportunity, or maintain a JSON counter file at `outputs/processbi-3d-deploy/invoice-counter.json` for the PDF generator.

---

## 4. Standard Line Item Descriptions

Use consistent phrasing across all invoices for professionalism and ATO compliance:

| Engagement | Line Item Description |
|---|---|
| Process Discovery Workshop (Half Day) | "Process Discovery Workshop — Half Day Session (4 hours) — [Client Company], [Date/Period]" |
| Process Discovery Workshop (Full Day) | "Process Discovery Workshop — Full Day Session (8 hours) — [Client Company], [Date/Period]" |
| Process Mapping Engagement | "Process Mapping Engagement — [Scope description, e.g., 'End-to-end Accounts Payable process mapping'] — [Client Company]" |
| Automation Blueprint | "Automation Blueprint — [Process name] — Design and documentation of automation opportunities — [Client Company]" |
| Power BI / Fabric Reporting Suite | "Power BI Reporting Suite — [Description] — [Client Company]" |
| Monthly Monitoring Retainer | "Monthly Process Monitoring Retainer — [Month YYYY] — [Client Company]" |
| Ad hoc Advisory | "Advisory Services — [X] hours @ $450/hour — [Brief description] — [Client Company]" |

---

## 5. Payment Terms by Engagement Type

| Engagement Type | Terms |
|---|---|
| All project work (workshops, mapping, blueprints, suites) | 50% on contract signing (Invoice A), 50% on final deliverable acceptance (Invoice B). Net 14 days each. |
| Monthly retainer | 100% in advance, 1st of each month. Net 7 days. |
| Ad hoc advisory | 100% on invoice, Net 14 days. |

---

## 6. GST Compliance (AU)

All invoices must comply with ATO Tax Invoice requirements:

- [ ] The words "Tax Invoice" must appear prominently
- [ ] Supplier name: ProcessBI Pty Ltd
- [ ] Supplier ABN
- [ ] Date of issue
- [ ] A brief description of the supply
- [ ] GST amount (or statement that price includes GST)
- [ ] Total price including GST

For invoices ≥ $1,000 (which all ProcessBI invoices will be):
- [ ] Recipient's identity (client name/company)
- [ ] Extent to which each supply is a taxable supply

---

## 7. Delivery Method

1. PDF generated by `workers/processbi_invoice_gen.py` (see that file for implementation)
2. Saved to `outputs/processbi-3d-deploy/invoices/PBI-YYYY-NNN.pdf`
3. Attached to GHL email `pbi-invoice-send` and sent to client contact email
4. Logged in GHL opportunity notes: "Invoice PBI-YYYY-NNN sent — AUD [amount] — due [date]"
5. GHL invoice record created for payment tracking

---

## 8. Invoice Counter State File

`outputs/processbi-3d-deploy/invoice-counter.json`:

```json
{
  "year": 2026,
  "last_sequence": 0,
  "last_invoice_number": null,
  "updated": "2026-06-24"
}
```

The PDF generator reads and increments this file atomically on each invoice creation.

---

_See `workers/processbi_invoice_gen.py` for the Python PDF implementation._

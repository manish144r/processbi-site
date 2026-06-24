# ProcessBI — Competitor Nav & Structure Research
*Compiled: 2026-06-24*

---

## Sites Studied

| Site | Category | Notes |
|------|----------|-------|
| Celonis.com | Process mining SaaS | Enterprise, global |
| Nintex.com | Workflow automation SaaS | Mid-market/enterprise |
| McKinsey Operations | Big-4 consulting | Org consulting |
| BCG Operations | Big-4 consulting | Strategy + ops |

---

## 1. Celonis.com

### Navigation
- **Top-level nav**: Platform | Solutions | Resources | Company
- "Solutions" expands to show items grouped by **type** (Initiative vs Function):
  - **By Initiative**: AI, Process Excellence
  - **By Function**: Supply Chain, Finance & Shared Services, Enterprise IT Modernization
- No mega-menu — simplified top-level with secondary landing pages

### Homepage structure (scannable, each section < 5 seconds)
1. Hero — tagline + 2 CTAs ("Try for free" / "Join a demo")
2. Social proof — customer count
3. Product explainer — "The Context Model" (1 concept, 1 short paragraph)
4. Solutions section — 5 cards, each with: **Bold headline → 3 bullet outcomes → "Learn more →"**
5. Success stories — named companies with outcome metrics (real numbers)
6. Events / news bar
7. Bottom CTA — "Get started"

### Key UX patterns
- **Group services by business initiative, not product category**
- Every service card has exactly 3 outcome-oriented bullet points (not feature lists)
- Case studies lead with an **outcome metric in large type**, then the company name
- Two CTAs always present: one high-intent (demo/free trial) + one lower-intent (learn more)
- Pages are medium-length — no endless scrolling; drill-down pages exist for depth

### CTAs
- Primary: "Try for free" / "Join a demo"
- Secondary: "Learn more" (on each service card)
- Footer: "Get started"

---

## 2. Nintex.com

### Navigation — Full Mega-Menu
- **Platforms** dropdown: 3 columns (Cloud / Self-Hosted / Salesforce) — each platform has sub-items listed with 1-line descriptions
- **Solutions** dropdown: 4 columns (By Use Case / By Industry / By Department / Ecosystems)
- **Partners**, **Resources**, **Company** — each opens a panel

### Homepage structure
1. Hero — one headline, 2 CTAs ("Read about capabilities" + "Schedule a demo")
2. Product launch callout bar (sticky-ish)
3. Persona-based cards — "CIOs & IT Leaders" / "CFOs & Finance Leaders" (role-based, not product-based)
4. Industry section — Manufacturing / Finance / Government — each card has 3 bullet outcomes + "Outcome:" summary sentence
5. Platform spotlight — 4 bullet advantages
6. Research download gated content
7. Use cases — rotating card carousel
8. Customer stories — photo + quote + "View customer story"
9. FAQ accordion
10. Demo CTA

### Key UX patterns
- **Persona-based homepage sections** — speaks to role (CIO, CFO) before speaking to product
- Solutions nav uses 4 groupings: Use Case, Industry, Department, Ecosystem — very granular
- Industry cards use "Outcome:" summary sentence at the bottom — closes the value loop
- FAQ accordion at bottom captures mid-funnel "evaluation mode" visitors
- Reviews section with TrustRadius/G2 quotes — social proof at scale

### CTAs
- "Request a demo" (primary — repeated multiple times)
- "Try for free" (trial)
- "Get started with templates" (lower-intent entry point)

---

## 3. McKinsey Operations

### Navigation
- Top-level: How We Help Clients | Our Insights | Our People | Contact
- "How We Help Clients" shows **4 clean service categories** — no mega-menu

### Services page structure
- **4 service categories** listed:
  1. Capital Excellence
  2. Product Development & Procurement
  3. Manufacturing & Supply Chain
  4. Service Operations
- Each category: 1-sentence description only (no bullet lists)
- Click → dedicated sub-page with full detail

### Homepage / capability page structure
1. Bold headline + 1 CTA ("Get in touch")
2. Stats bar — outcome metrics (e.g., "0–30% typical cost savings")
3. "How we help clients" — 4 category links with brief description
4. Case studies section — photo + company name + one big metric + "Read more"
5. Featured insights
6. Team grid
7. "Get in touch" footer CTA

### Key UX patterns
- **Maximum brevity on overview pages** — force drill-down for depth
- Stats shown before service descriptions — anchors the value proposition
- Case studies always lead with a **single metric** in large type (the most important number)
- "People" section on capability pages builds trust in expertise
- Single, consistent CTA — "Get in touch" used everywhere

### CTAs
- "Get in touch" (only CTA — high-signal, low volume)

---

## 4. Key Patterns Across All Three

### Service grouping
| Pattern | Celonis | Nintex | McKinsey |
|---------|---------|--------|----------|
| # of top-level service groups | 5 (by initiative/function) | 4+ (by use case/industry/dept) | 4 (by practice) |
| Grouping logic | Business outcome | Who uses it / what industry | Practice area |
| Drill-down model | Card → landing page | Mega-menu → sub-page | Category → sub-page |

**Takeaway for ProcessBI**: Group 7 services into **4 practice areas** (Process Excellence, Data Engineering, Automation & AI, Strategic Advisory). Show the 4-group overview first; detailed service content below via anchor nav.

### Navigation patterns
- **Mega-menu dropdowns** are standard for solution-heavy sites (Nintex)
- **Simple category links** work better for high-trust consulting brands (McKinsey)
- **Services dropdown with grouped sub-items** is the middle ground — appropriate for ProcessBI

### Homepage section length
| Section | Celonis | Nintex | McKinsey | Recommendation |
|---------|---------|--------|----------|----------------|
| Hero | Full viewport, minimal text | Full viewport, bold tagline | 2 lines + CTA | Keep ProcessBI hero (it's strong) |
| Services | 5 cards, 3 bullets each | Persona cards, then industry | 4 category links | Replace 7-card flat list with 4 categories |
| Social proof | Logo strip + case studies | Reviews grid | Stats bar | Add outcome metrics to ProcessBI |
| CTA | Repeated 3x | Repeated 5x | Once, consistently | Use "Book a Call" as the primary CTA consistently |

### Case study / outcome presentation
- All three sites: outcome metric first, company name second
- Celonis: full stories with business context
- Nintex: photo + 1-sentence quote + "View story"
- McKinsey: clean thumbnail + big metric + company name

**Takeaway**: ProcessBI case studies should lead with a metric (e.g., "40% cycle time reduction") and use the client industry (not name, if confidential).

### CTA patterns
- Celonis: "Try for free" (low commitment) + "Join a demo" (higher commitment)
- Nintex: "Request a demo" (consistent primary)
- McKinsey: "Get in touch" (single, high-trust signal)

**Takeaway**: "Book a Free Discovery Call" is ProcessBI's primary CTA. It's well-positioned — keep it. Add a secondary lower-friction CTA ("See Case Studies" or "Explore Services") next to it.

---

## Applied Recommendations for ProcessBI

### 1. Services nav dropdown (shared-nav.js)
Add a dropdown under "Services" showing 4 practice areas:
- Process Excellence → #process-design
- Data Engineering → #db-design
- Automation & AI → #automation
- Strategic Advisory → #consulting

### 2. Services page overview (services.html)
Replace 8 flat service cards with 4 practice-area cards. Each card shows:
- Practice area badge
- Practice area name
- 2 services listed
- "Explore ↓" link to detailed section

### 3. Homepage (index.html)
- Hero is strong — keep it, add interactive parallax
- Services section (4 cards on homepage) is well-scoped — keep as-is
- Consider adding an "Outcome:" summary to the Why ProcessBI section

### 4. Navigation (all pages)
- Current nav: Home | Services | Industries | Case Studies | About | Insights
- Keep order; add Services dropdown
- "Book a Call" button is the right CTA in the nav

---

*Sources: Direct web_fetch of celonis.com, nintex.com, mckinsey.com/capabilities/operations. Additional context from websearch on Celonis and Nintex 2026 positioning.*

# ProcessBI — AI Blog Pipeline Specification
**Version 1.0 | June 2026 | Confidential**

---

## Overview

This document defines the end-to-end specification for the NightFactory AI pipeline to produce high-quality, SEO-optimised, technically credible blog posts for processbi.com.au on a continuous basis. At a cadence of 2 posts/month, the 50 titles below cover ~2 years of publishing without repetition.

**Pipeline summary:**
1. Select title from the list below (or generate a new one following the same format)
2. Run the GEDI research prompt to gather source material
3. Run the GEDI draft prompt to generate the post
4. Run the GEDI review prompt to quality-assess the draft
5. Human review and approval (15–20 minutes per post)
6. Publish to processbi.com.au CMS
7. Cross-post to LinkedIn as an Article via PRISM Social
8. Submit to Google Search Console for indexing

---

## 50 Blog Post Titles with Target Keywords

### Cluster 1: Process Mapping and Documentation (Posts 1–10)

| # | Title | Primary keyword | Target ICP |
|---|---|---|---|
| 1 | Why Process Mapping Should Come Before Your Power BI Project | process mapping before Power BI | CIO/CDO considering BI investment |
| 2 | Swim Lane Diagrams vs Process Flow Charts: Which Does Your Organisation Need? | swim lane diagram vs process flow chart | Business analyst, project manager |
| 3 | How to Document a Business Process That Nobody Can Explain | how to document business process | Head of Operations, COO |
| 4 | The 7 Warning Signs Your Business Process Documentation Is Dangerously Out of Date | business process documentation | Compliance, risk, operations |
| 5 | BPMN vs Swim Lane vs Value Stream Map: A Practical Guide for Australian Organisations | BPMN guide Australia | Business analyst, process consultant buyer |
| 6 | How Long Should a Process Mapping Project Take? A Realistic Guide | process mapping project duration | CIO, procurement manager |
| 7 | Process Mapping for ISO Certification: What Australian Companies Need to Document | process mapping ISO certification Australia | Operations, quality manager |
| 8 | The Difference Between Process Mapping and Process Mining — and Why It Matters | process mapping vs process mining | CDO, data leader |
| 9 | Why Process Documentation Projects Fail (And How to Make Yours Succeed) | process documentation project failure | Project sponsor, COO |
| 10 | How to Run a Process Mapping Workshop: A Step-by-Step Facilitator's Guide | process mapping workshop guide | Business analyst, internal consultant |

### Cluster 2: Microsoft Fabric (Posts 11–20)

| # | Title | Primary keyword | Target ICP |
|---|---|---|---|
| 11 | Microsoft Fabric vs Power BI: What's the Difference and Which Do You Need? | Microsoft Fabric vs Power BI | CIO, CDO, IT lead |
| 12 | Microsoft Fabric for Australian Enterprises: A Plain-English Guide | Microsoft Fabric Australia | CIO, Head of Data |
| 13 | How Microsoft Fabric Changes the Case for a Data Warehouse in 2026 | Microsoft Fabric data warehouse 2026 | CDO, data architect |
| 14 | Microsoft Fabric Licensing in Australia: What You Actually Pay | Microsoft Fabric licensing cost Australia | CIO, IT procurement |
| 15 | How to Prepare Your Organisation for Microsoft Fabric Before You Buy | prepare for Microsoft Fabric | IT lead, data architect |
| 16 | Microsoft Fabric and the ASD Essential 8: What Government Agencies Need to Know | Microsoft Fabric Essential 8 government | APS ICT, security lead |
| 17 | Building a Process Intelligence Layer with Microsoft Fabric: A Practitioner's Guide | process intelligence Microsoft Fabric | CDO, data lead |
| 18 | Microsoft Fabric OneLake Explained: What Australian IT Leaders Need to Know | Microsoft Fabric OneLake | IT architect, CDO |
| 19 | Microsoft Fabric Real-Time Intelligence: Use Cases for Australian Utilities and Manufacturing | Microsoft Fabric real-time analytics Australia | COO, head of operations |
| 20 | Migrating from Azure Synapse to Microsoft Fabric: Lessons from the Field | migrate Synapse to Microsoft Fabric | Data architect, CDO |

### Cluster 3: Power BI (Posts 21–28)

| # | Title | Primary keyword | Target ICP |
|---|---|---|---|
| 21 | Why 60% of Power BI Dashboards Aren't Used Six Months After Go-Live | Power BI adoption failure | CDO, BI project sponsor |
| 22 | Power BI Semantic Model vs Direct Query: When to Use Each | Power BI semantic model | Data engineer, BI developer |
| 23 | How to Structure a Power BI Project for an Australian Enterprise | Power BI project structure | CIO, BI project manager |
| 24 | Power BI Embedded vs Power BI Service: Which Is Right for Your Organisation? | Power BI embedded vs service | CIO, product manager |
| 25 | Power BI for Government: Reporting Requirements and Compliance Considerations in Australia | Power BI government Australia | APS IT lead, Head of Reporting |
| 26 | How to Build a Power BI Dashboard That Your Executive Team Will Actually Use | Power BI executive dashboard | CDO, Head of Analytics |
| 27 | Power BI Cost vs Value: How to Build the Business Case for Australian Organisations | Power BI business case Australia | CIO, finance director |
| 28 | Row-Level Security in Power BI: A Practical Guide for Regulated Industries | Power BI row level security | Data architect, compliance |

### Cluster 4: Process Automation (Posts 29–34)

| # | Title | Primary keyword | Target ICP |
|---|---|---|---|
| 29 | Before You Automate: Why Process Redesign Must Come First | process redesign before automation | COO, Head of Operations |
| 30 | Power Automate vs RPA: Which Process Automation Approach Is Right for You? | Power Automate vs RPA Australia | IT lead, operations manager |
| 31 | How to Calculate the ROI of Process Automation in Australian Government | process automation ROI government | CFO, operations director |
| 32 | The Process Automation Maturity Model: Where Is Your Organisation? | process automation maturity model | COO, CIO |
| 33 | AI-Assisted Process Automation: What's Real and What's Hype in 2026 | AI process automation Australia 2026 | CDO, CIO |
| 34 | Automating Government Service Delivery: A Process-First Framework for APS Agencies | government process automation APS | APS executives, transformation leads |

### Cluster 5: Sector-Specific — Financial Services (Posts 35–39)

| # | Title | Primary keyword | Target ICP |
|---|---|---|---|
| 35 | APRA CPG 235 and the Process Documentation Gap: What Regulated Firms Are Missing | APRA CPG 235 process documentation | CRO, Head of Compliance |
| 36 | Business Process Intelligence for APRA-Regulated Organisations: A Practical Framework | process intelligence APRA regulated | COO, CRO, CDO |
| 37 | How Australian Banks Are Using Process Mining to Reduce Operational Risk | process mining Australian banks | COO, Head of Operational Risk |
| 38 | Claims Process Automation for Australian Insurers: Where to Start | insurance claims process automation Australia | COO, Head of Claims |
| 39 | Power BI for Superannuation Funds: Reporting, Compliance, and Member Analytics | Power BI superannuation fund | Head of Analytics, CTO of super fund |

### Cluster 6: Sector-Specific — Government (Posts 40–43)

| # | Title | Primary keyword | Target ICP |
|---|---|---|---|
| 40 | Why APS Digital Transformation Programs Keep Reinventing the Same Processes | APS digital transformation process | APS SES, transformation leads |
| 41 | How to Build a Process Documentation Program for an Australian Government Agency | government process documentation program | APS Band 6+ operational leads |
| 42 | Business Intelligence for Australian Government: From AusTender to Analytics | government business intelligence Australia | APS CDO, Head of Reporting |
| 43 | Using Power BI for Grants Management Reporting in the Australian Public Service | Power BI grants management APS | Program manager, CDO |

### Cluster 7: Sector-Specific — Manufacturing and Utilities (Posts 44–46)

| # | Title | Primary keyword | Target ICP |
|---|---|---|---|
| 44 | Digital Factory Programs That Fail: The Process Documentation Problem Nobody Talks About | digital factory process documentation | COO, Head of Operations, CIO |
| 45 | Microsoft Fabric for Utilities: Real-Time Operational Data Intelligence | Microsoft Fabric utilities Australia | CTO, Head of Asset Management |
| 46 | OEE Dashboards in Power BI: How Australian Manufacturers Are Measuring What Matters | OEE dashboard Power BI Australia | Head of Operations, Plant Manager |

### Cluster 8: Strategy and Methodology (Posts 47–50)

| # | Title | Primary keyword | Target ICP |
|---|---|---|---|
| 47 | Business Process Reengineering vs Continuous Improvement: What Australian Organisations Need in 2026 | business process reengineering Australia | COO, CIO, transformation sponsor |
| 48 | How to Choose a Business Process Consultant in Australia: 8 Questions to Ask | business process consultant Australia | Any buyer searching for a supplier |
| 49 | The Process Intelligence Stack: Combining Lean, BPMN, Fabric, and AI | process intelligence stack | CDO, CIO, analytically-minded leaders |
| 50 | What a Good Process Map Actually Looks Like: 10 Examples and What They Get Right | good process map examples | Business analyst, project sponsor |

---

## Quality Criteria (Every Post Must Pass Before Publishing)

A post passes if it meets ALL of the following criteria. Fail any one = send back for revision.

### Content Quality

- [ ] **Primary keyword appears** in the H1 title, within the first 100 words, in at least one H2 subheading, and in the URL slug
- [ ] **Word count is 1,200–2,500 words** (below 1,200 is insufficient for Google ranking; above 2,500 without subheadings is hard to read)
- [ ] **The post contains a specific, concrete claim or insight** that is not found in the first page of Google results for the target keyword (this is what makes it worth reading)
- [ ] **No marketing language**: no "world-class", "cutting-edge", "innovative solution", "leading provider", "best-in-class", "passionate about"
- [ ] **At least one data point or statistic** (from a cited source — ABS, APRA, Gartner, Microsoft, academic research)
- [ ] **At least one real-world scenario or anonymised example** — abstract advice without context is not useful
- [ ] **Australian English** throughout: "organisation" not "organization", "colour" not "color", "realise" not "realize", AUD not USD, AEST not EST, references to Australian regulators/standards where relevant
- [ ] **Correct technical accuracy**: all Microsoft product names correct and current (Fabric, Power BI, Power Automate — not "PowerBI" or "Power Bi"), all process methodology terms correct

### Structure Quality

- [ ] **H1**: contains primary keyword, max 70 characters, no clickbait
- [ ] **Introduction** (first 150 words): states what the post covers and what the reader will know by the end — no preamble, no "In today's digital age..."
- [ ] **H2 subheadings** at least every 400 words — the post must be skimmable
- [ ] **Conclusion** includes a concrete next step or takeaway (not just a summary of what was covered)
- [ ] **CTA**: one clear call-to-action (see CTA templates below)
- [ ] **Internal links**: at least 2 links to other pages on processbi.com.au (services pages, other blog posts)
- [ ] **External link**: at least 1 link to a credible external source (Microsoft docs, ABS, APRA, ANAO, Gartner)
- [ ] **Meta description** written (150–160 characters; includes primary keyword; written to be clicked, not just to summarise)
- [ ] **URL slug**: short, keyword-containing, lowercase, hyphens not underscores (e.g., `/process-mapping-before-power-bi`)

### Tone Quality

- [ ] **Voice is practitioner-to-practitioner**, not consultant-talking-down-to-client
- [ ] **Sentences average under 20 words** — long sentences lose readers
- [ ] **No passive voice** in more than 15% of sentences (use Hemingway App to check)
- [ ] **First paragraph has no question that starts with "Have you ever..."** or "Are you wondering..." — these are clichés

---

## GEDI Review Prompt

Run this prompt on every draft before human review. The GEDI review prompt applies a four-lens quality check.

```
You are a senior content editor and SEO specialist reviewing a blog post draft for ProcessBI — an Australian business process and Microsoft Fabric/Power BI consultancy. Apply the GEDI framework: Grade, Evaluate, Diagnose, Improve.

TARGET KEYWORD: [INSERT PRIMARY KEYWORD]
TARGET READER: [INSERT ICP — e.g., "A CIO at an ASX-listed company considering a Power BI investment"]

---

GRADE (score each 1–5):
1. SEO completeness: Does the keyword appear in H1, first 100 words, at least one H2, URL slug, and meta description?
2. Content depth: Does the post contain insights not easily found on the first page of Google for this keyword?
3. Practical value: Will the target reader finish this post knowing something actionable they didn't know before?
4. Tone accuracy: Is this written practitioner-to-practitioner, with no marketing language or corporate clichés?
5. Structure: Is there an H2 at least every 400 words? Is the introduction direct (no "In today's world..." openers)?

Total score: [SUM]/25

---

EVALUATE:
- List any factual claims that should be verified before publishing
- List any technical terms that are used incorrectly or imprecisely
- Note any Australian English errors (US spellings, wrong currency, wrong regulator names)
- Note any passive voice problems

---

DIAGNOSE:
- What is the single weakest paragraph in this draft and why?
- Is the CTA appropriate for the target reader's buying stage?
- Does the post fulfil the promise made in the title?

---

IMPROVE:
- Rewrite the introduction if it scores below 4/5 on tone or structure
- Suggest a stronger H1 if the current one is over 70 characters or doesn't contain the keyword
- Suggest 2 internal links that could be added (name the services or blog pages on processbi.com.au they should point to)
- Write an improved meta description if the current one is over 160 characters or doesn't include the keyword

---

PUBLISH RECOMMENDATION:
- Ready to publish (score ≥ 20/25, no critical errors): YES / NO
- If NO: List the specific changes required before publishing
```

---

## Submitting to PRISM Social for LinkedIn Article Cross-Posting

After a post is published on processbi.com.au, cross-post it to LinkedIn as an Article within 48 hours. LinkedIn Articles are indexed by Google and distribute to your newsletter subscribers if you use LinkedIn newsletters.

### Cross-posting process:

1. **Adapt the title** for LinkedIn: LinkedIn article titles can be slightly more conversational than blog post H1s (which must be keyword-optimised). The LinkedIn title should prioritise curiosity over keyword placement.
   - Blog: "APRA CPG 235 and the Process Documentation Gap: What Regulated Firms Are Missing"
   - LinkedIn Article: "The Process Documentation Problem That APRA Keeps Finding — And What It Actually Means"

2. **Trim the introduction**: LinkedIn readers scroll more than blog readers. Cut the first paragraph to 3–4 lines maximum.

3. **Add a personal note at the top** (2–3 sentences in italics or as a quote block):
   > *This piece was originally published at processbi.com.au. I'm republishing it here because [why this is relevant for your LinkedIn audience right now]. If you'd prefer to read the full version with embedded links and resources, it's here: [URL]*

4. **Add a LinkedIn-specific CTA at the bottom**:
   - Different from the website CTA (which goes to a contact form)
   - LinkedIn CTA: "If this is relevant to a challenge you're working on, I'd welcome a comment or a DM."
   - Or: "Follow ProcessBI on LinkedIn for posts like this every week."

5. **In PRISM Social** (or equivalent scheduling tool):
   - Create a new "LinkedIn Article" post
   - Paste the adapted content
   - Set publish time: 48 hours after blog post goes live, 8:00 AM AEST Tuesday–Thursday
   - Add 3–5 hashtags (from the approved list in the LinkedIn Setup Guide)
   - Schedule a companion short-form post for the day the article publishes: "I just published [topic] — the most interesting thing I found while researching it was [one surprising insight]. Full article in the link below."

---

## Internal Linking Rules

Every blog post must contain at minimum 2 internal links to other pages on processbi.com.au. These links serve two purposes: they pass SEO authority to key service pages, and they guide readers toward a commercial outcome.

### Priority internal link targets (link to these most frequently):

| Page | Anchor text examples | Link when post is about |
|---|---|---|
| /services/process-mapping | "process mapping", "business process documentation", "swim lane diagrams" | Any post in Clusters 1, 4, 8 |
| /services/power-bi | "Power BI", "Power BI dashboards", "business intelligence reporting" | Any post in Clusters 3, 5, 6, 7 |
| /services/microsoft-fabric | "Microsoft Fabric", "Fabric analytics", "data lakehouse" | Any post in Cluster 2 |
| /services/process-automation | "process automation", "Power Automate", "automated workflows" | Cluster 4 posts |
| /services/ai-consulting | "AI consulting", "AI-assisted", "process intelligence with AI" | Cluster 8, any AI-adjacent post |
| /contact | "get in touch", "discovery call", "speak with us" | Always — at least once per post |
| /case-studies | "case study", "similar organisations", "see how we've done this" | When citing client examples |

### Linking rules:
- Use descriptive anchor text — never "click here" or "read more"
- Never link to the same page twice in the same post (once per internal link target)
- Place at least one internal link in the body of the post (not just the CTA) — this improves crawlability
- When linking to another blog post, choose one that is topically related but not a direct competitor for the same keyword

---

## Call-to-Action Template for Each Post

Every post ends with exactly one CTA. Choose the appropriate template based on the post's topic and the reader's likely buying stage.

### CTA Type 1 — Discovery Call (for high commercial-intent posts)

Use when: The reader is likely actively considering engaging a consultant.
Trigger posts: "How to choose a business process consultant", any post targeting a specific buying pain point.

```
---

**Ready to apply this to your organisation?**

ProcessBI works with Australian enterprise and government organisations on exactly this kind of challenge. If you'd like to explore whether there's a fit, the fastest path is a 20-minute discovery call — no deck, no pitch, just a direct conversation.

[Book a discovery call](https://processbi.com.au/contact)

```

### CTA Type 2 — Lead Magnet (for educational / top-of-funnel posts)

Use when: The reader is learning, not yet buying. The post solves a problem conceptually.
Trigger posts: How-to guides, methodology explanations, framework overviews.

```
---

**Want to assess where your organisation sits?**

We've built a 47-question diagnostic checklist that maps your organisation's process maturity across five dimensions. It takes about 20 minutes to complete and will tell you exactly where to focus first.

[Download the ProcessBI Diagnostic Checklist](https://processbi.com.au/checklist)

```

### CTA Type 3 — Newsletter / Follow (for awareness / brand posts)

Use when: The post is thought leadership, industry observation, or sector-specific insight.
Trigger posts: Government digital, financial services sector posts, methodology opinion pieces.

```
---

**Found this useful?**

ProcessBI publishes insights like this for Australian enterprise and government leaders monthly. Subscribe to receive them directly.

[Subscribe to the ProcessBI newsletter](https://processbi.com.au/newsletter)

```

### CTA Type 4 — Related Content (for SEO / internal link reinforcement)

Use when: The reader would benefit from reading another specific post next.
Always append as a secondary CTA after one of the above primary CTAs.

```
**Related reading:**
- [Why Process Mapping Should Come Before Your Power BI Project](https://processbi.com.au/blog/process-mapping-before-power-bi)
- [Microsoft Fabric for Australian Enterprises: A Plain-English Guide](https://processbi.com.au/blog/microsoft-fabric-australia-guide)
```

---

## Publishing Checklist (Run Before Every Post Goes Live)

- [ ] Primary keyword in H1, intro, H2, URL slug, meta description
- [ ] Word count 1,200–2,500 words
- [ ] GEDI review score ≥ 20/25
- [ ] Human review approved
- [ ] At least 2 internal links to service pages
- [ ] At least 1 external link to credible source
- [ ] CTA present and appropriate for post type
- [ ] Meta description written (150–160 chars, contains keyword)
- [ ] URL slug is short, lowercase, hyphenated, keyword-containing
- [ ] Featured image uploaded (1200×630px; include ALT text with keyword)
- [ ] Post submitted to Google Search Console for indexing (via URL Inspection tool)
- [ ] LinkedIn Article version scheduled in PRISM Social (publish 48 hours after blog post)
- [ ] Companion short-form LinkedIn post scheduled for same day as article

---

## Pipeline Cadence Summary

| Action | Frequency | Owner |
|---|---|---|
| Select next post titles (2 months ahead) | Quarterly | Human |
| Run GEDI research and draft prompt | Per post | NightFactory AI pipeline |
| Run GEDI review prompt | Per post | NightFactory AI pipeline |
| Human review and approval | Per post | Human (15–20 mins) |
| Publish to CMS | Per post | Human or CMS automation |
| Submit to Google Search Console | Per post | Human (2 mins) |
| Schedule LinkedIn Article in PRISM Social | Per post | Human or PRISM automation |
| Review top-performing posts by organic traffic | Monthly | Human |
| Update any post that drops in ranking | Quarterly | AI-assisted |

---

*Last updated: June 2026 | Owner: ProcessBI*

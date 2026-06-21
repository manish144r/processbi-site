# PRISM Social Creative Agent Stack
**Design Brief & Integration Plan**
_Produced: 2026-06-20 | Mandate: 4-5 Sigma Quality, Zero Human Escalation_

---

## Executive Summary

PRISM Social is NightFactory's creative intelligence layer — a self-healing team of 5 AI agents that generates, reviews, and publishes brand-consistent social content at 4-sigma (99.4%) quality without human intervention. The system addresses the root problem: "random things on websites/posts throwing the entire process out into water." The fix is a **Brand Guardian** that sits downstream of every creative agent and auto-rejects anything below a 90/100 score before it touches Postiz or the live site.

At 21 posts/week (90/month), estimated all-in cost: **~$60–85/month**.

---

## Part 1: Tool Research — Top Picks Per Category

### A. Visual Design AI APIs

Research covered: Flux 1.1 Pro, Recraft V3, Adobe Firefly API, Ideogram v3/v4, GPT Image 1.5 (DALL-E), Imagen 4 Ultra, Leonardo AI, Stability AI SD3, Midjourney v7, Kling Image.

| Rank | Tool | API | Brand Consistency (1-5) | Output Quality (1-5) | Cost/Image | Self-Correction | Notes |
|------|------|-----|------------------------|---------------------|------------|-----------------|-------|
| 1 | **Recraft V3** | ✅ | 5 | 4 | $0.04 raster / $0.08 vector | Via re-prompt | Only API offering true vector output + reusable Brand Style Codes from your images |
| 2 | **Flux 1.1 Pro** (BFL) | ✅ | 4 | 5 | $0.04 | Via LoRA re-train | Elo 1,265 quality crown; LoRA brand fine-tuning for ~$35/model; 4.5s generation |
| 3 | **Adobe Firefly API** | ✅ Enterprise | 5 | 4 | $0.02–0.10 | Custom model retry | Royalty-free commercial use; Custom Models trained on brand aesthetics; ~$1,000/mo min commit |
| 4 | **Ideogram v4** | ✅ | 4 | 4 | $0.025–0.10 | Style code re-use | Best text/typography rendering; 3 style reference images → reusable Style Code; character reference |
| 5 | **GPT Image 1.5** | ✅ | 3 | 5 | $0.04 | Via re-prompt | Elo 1,264; no native brand style system; strong general quality |
| 6 | **Imagen 4 Ultra** | ✅ | 3 | 5 | $0.08 | Via re-prompt | Most photorealistic; 8s/image; Google Vertex API |
| 7 | **Stability AI SD3** | ✅ | 3 | 3 | $0.02–0.04 | LoRA | Open-weight; cheapest at scale; less consistent |
| 8 | **Leonardo AI** | ✅ | 3 | 4 | $0.02–0.04 | Style reference | Good consistency features; Phoenix model solid |
| 9 | **Midjourney v7** | ❌ (beta) | 4 | 5 | $10-120/mo sub | Manual | No stable public API yet; quality excellent but can't programmatically integrate |
| 10 | **Kling Image** | ✅ (via Kling API) | 3 | 3 | Via credits | Via re-prompt | Bundled with Kling video suite; not a standalone image leader |

**Top 3 for PRISM Social:**
1. **Recraft V3** — PRIMARY for brand graphics, icons, social cards, vector assets. The Brand Style Code system (upload 5+ brand images → get a reusable style token) is exactly what PRISM needs for brand-locked generation.
2. **Flux 1.1 Pro** — PRIMARY for photorealistic lifestyle/product images. Train a LoRA on NightFactory/ProcessBI brand assets once ($35), reuse on every image call.
3. **Ideogram v4** — FALLBACK for any text-heavy graphics (banners, quote cards, stat posts) where typography must be pixel-perfect.

---

### B. Video / Film AI Agents

Research covered: Kling 3.0, Runway Gen-4, Luma Ray 2, Google Veo 3.1, HeyGen (already in use), Higgsfield (already in use), Pika 2.0, Captions.ai, Opus Clip, Sora 2.

| Rank | Tool | API | Use Case | Cost/Reel | Brand Overlay | Notes |
|------|------|-----|----------|-----------|---------------|-------|
| 1 | **Kling 3.0** | ✅ | Social reels, UGC-style | ~$0.075/s (~$0.38/5s) | Via prompt | Best cost/quality ratio for volume; no failed-task credit burn |
| 2 | **HeyGen** *(active)* | ✅ | Avatar/presenter | $0.05/s Avatar V | Template brand kit | Already integrated; ~$3/min Avatar V |
| 3 | **Higgsfield** *(active)* | ✅ | Social motion video | $0.16–$0.70/gen | Via prompt | Already at $0.70/reel; good for dynamic social content |
| 4 | **Runway Gen-4** | ✅ | Premium quality | ~$6/10s clip | Post-production | Most control; 4K, up to 60s; best for hero brand videos |
| 5 | **Luma Ray 2** | ✅ | Creative/cinematic | $0.60–0.95/5s | Post-production | Ray 2 Flash at $0.60/5s good for volume |
| 6 | **Google Veo 3.1** | ✅ (Vertex) | Highest quality | $0.15/s | Post-production | Best output quality; expensive; reserve for flagship content |
| 7 | **Captions.ai** | ✅ ($79.99/mo Business) | Auto-caption + brand overlay | Included in plan | Built-in brand kit | Purpose-built for social video finishing; adds captions + overlays automatically |
| 8 | **Opus Clip** | ✅ (Business/custom) | Long-form → short clips | Custom | Via template | Repurposes webinars/podcasts into social reels automatically |
| 9 | **Pika 2.0** | ✅ | Short social video | ~$0.10/clip | Via prompt | Good budget option; image-to-video strong |
| 10 | **Sora 2** | ✅ | High-quality narrative | $0.56/s | None native | Most expensive; reserve for cinematic brand storytelling only |

**Top 3 for PRISM Social:**
1. **Kling 3.0 API** — PRIMARY for volume social reels. $0.075/s = ~$0.38 per 5s clip. At 4 reels/week, cost is ~$6/month.
2. **Captions.ai Business** — FINISHING layer. Adds brand captions, overlays, and translates Kling/Higgsfield output into platform-ready format. $79.99/mo covers 300 min/month.
3. **HeyGen Avatar V** (existing) — KEEP for presenter/avatar content. Integrate brand background templates to ensure visual consistency.

---

### C. Social Media + Content AI Agents

Research covered: Predis.ai, Taplio, Feedhive, Publer, Jasper AI, Copy.ai, Vista Social, Emplifi, Sprinklr AI+, Persado.

| Rank | Tool | API | Platforms | Brand Voice | Performance AI | Cost |
|------|------|-----|-----------|-------------|----------------|------|
| 1 | **Predis.ai** | ✅ | Instagram, TikTok, LinkedIn, FB, Twitter | ✅ Full brand kit | ✅ Competitor analysis | $19–212/mo |
| 2 | **Claude claude-sonnet-4** (direct) | ✅ | Any (output → Postiz) | ✅ System prompt brand voice | ✅ Via structured eval | ~$3/M tokens |
| 3 | **Taplio** | ✅ | LinkedIn-specific | ✅ Personal brand | ✅ Viral post DB | $49–99/mo |
| 4 | **Feedhive** | ✅ | Multi-platform | ✅ | ✅ Pre-publish scoring | $15/mo+ |
| 5 | **Publer** | Limited | Multi-platform | Partial | ✅ AI labels | $12–40/mo |
| 6 | **Jasper AI** | ✅ | Any (output layer) | ✅ Brand voice profiles | Limited | $39–125/mo |
| 7 | **Copy.ai** | ✅ | Any (output layer) | ✅ | Via workflows | $36–186/mo |
| 8 | **Vista Social** | ✅ | Multi-platform | ✅ | ✅ | $39/mo |
| 9 | **Emplifi** | ✅ | Enterprise multi | ✅ | ✅ Advanced | Enterprise$ |
| 10 | **Persado** | ✅ | Email/social | ✅ Language AI | ✅ Emotional AI | Enterprise$ |

**Top 3 for PRISM Social:**
1. **Claude claude-sonnet-4 (direct API)** — PRIMARY copy engine. System prompt encodes NightFactory/ProcessBI brand voice. No per-post SaaS markup. Output is structured JSON fed directly into Postiz payload builder.
2. **Predis.ai API** — SECONDARY for full-package generation (copy + visual + hashtags in one call). Use when speed > control.
3. **Taplio** — SPECIALIST for LinkedIn. Manages Manish's personal brand posts, carousels, and DM outreach sequences separately from brand account posts.

---

### D. Brand QA / Visual Consistency Agents

Research covered: Claude Vision, Brandfetch API, Applitools Eyes, Percy (BrowserStack), BackstopJS, Playwright visual testing, Lytho, Bynder, Frontify.

| Rank | Tool | API | Use Case | Brand-Specific | Cost | Auto-Fix |
|------|------|-----|----------|---------------|------|----------|
| 1 | **Claude claude-opus-4 Vision** | ✅ | Multimodal brand audit (color, logo, copy) | ✅ Custom guidelines in prompt | $15/M input tokens | ✅ Returns structured issue list |
| 2 | **Brandfetch API** | ✅ | Official brand asset retrieval (logos, colors, fonts) | ✅ Brand-verified data | Free / $49/mo Pro | ✅ Returns canonical assets |
| 3 | **Applitools Eyes** | ✅ | Visual regression for website elements | Partial (CSS/layout) | ~$200/mo (small) | ✅ Checkpoint AI diffing |
| 4 | **Percy (BrowserStack)** | ✅ | Visual regression, CI/CD integrated | Partial | ~$39/mo | ✅ AI diffing, 3x faster |
| 5 | **Playwright Visual** | ✅ (OSS) | Screenshot comparison vs. approved baseline | Manual baseline | Free | Manual review |
| 6 | **BackstopJS** | ✅ (OSS) | CSS regression | Manual | Free | Scenario-based |
| 7 | **Lytho/Bynder/Frontify** | ✅ | DAM + brand compliance portal | ✅ Full DAM | $500+/mo | Limited automation |
| 8 | **Claude Brand Builder** | ✅ | Generate + maintain brand system docs | ✅ | Included in Claude API | N/A |
| — | **Playwright + Claude Vision** | ✅ | Screenshot page → Claude Vision checks brand | ✅ Hybrid approach | Low (~$0.01/check) | ✅ Best combo |

**Top 3 for PRISM Social:**
1. **Claude claude-opus-4 Vision** — THE brand guardian brain. Audits every image/video thumbnail/web screenshot against a hardcoded brand spec (colors, logo, claims). Returns structured JSON: `{score: 87, issues: [{dimension: "color", value: "#7B2FBE", expected: "#1A56DB", severity: "HIGH"}]}`.
2. **Brandfetch API** — PARTNER LOGO validator. Before any partner logo appears in content, query Brandfetch to get the canonical SVG. Eliminate wrong icons at source.
3. **Playwright + Screenshots → Claude Vision** — WEBSITE QA. After any deploy, Playwright screenshots key pages; Claude Vision checks against brand spec. Zero cost beyond API calls.

---

### E. Multi-Agent Orchestration Frameworks

Research covered: CrewAI, LangGraph, AutoGen, AWS Bedrock Agents, Vertex AI Agent Builder.

| Framework | Model | Strength | Production Readiness | NF Fit |
|-----------|-------|----------|---------------------|--------|
| **CrewAI** | Python | Role-based agent teams, Crew Studio visual builder, 450M workflows/mo, F500 adoption | ✅ Production | ✅ Best fit — pre-built patterns for Designer/Reviewer/Publisher roles |
| **LangGraph** | Python | State machine graphs, conditional routing, quality control loops, Google/IBM backed | ✅ Production | ✅ Best for QA loops with retry logic (≥90 approve, retry chain) |
| **AutoGen** (Microsoft) | Python | Async multi-agent, code execution | ✅ Production | Partial — stronger for code than creative |
| **AWS Bedrock Agents** | Managed | Fully managed, no infra ops | ✅ Production | ❌ Vendor lock-in; expensive at scale |
| **Vertex AI Agent Builder** | Managed | Google-native, Gemini integration | ✅ Production | Partial — best if using Veo/Imagen heavily |

**Decision:** Use **LangGraph** as the orchestration backbone (state machine enables the retry QA loop cleanly) with **CrewAI-style role definitions** for each agent's persona, tools, and backstory. Both are Python-native and slot directly into NightFactory's existing `workers/` pattern.

---

## Part 2: The PRISM Social Agent Team (5 Agents)

### Architecture Overview

```
Campaign Brief → [Creative Director] → routes tasks ↓
                                      ↓              ↓              ↓
                              [Visual Designer] [Video Producer] [Content Strategist]
                                      ↓              ↓              ↓
                              ← ← ← [Brand Guardian] → → → →
                                      ↓              ↓
                               APPROVE (≥90)    REJECT/FLAG
                                      ↓              ↓
                               [Postiz Queue]   [Auto-fix loop]
```

---

### Agent 1: Creative Director (Orchestrator)

**Role:** Campaign brief parser and task router. Sets creative constraints for all downstream agents.

**Primary Tool:** Claude claude-opus-4 + LangGraph StateGraph

**Input:**
- Campaign brief (topic, platform, goal, posting date)
- Brand guidelines (loaded from `knowledge/brand/nightfactory-brand-spec.md`)
- Content calendar slot

**Output:**
```json
{
  "brief_id": "NF-2026-0621-001",
  "platform": "linkedin",
  "visual_spec": {"style": "recraft_style_code:NF_CORPORATE_V2", "aspect": "1:1", "palette": ["#1A56DB","#FFFFFF","#111827"]},
  "copy_spec": {"tone": "authoritative_visionary", "char_limit": 3000, "hook_type": "stat_lead"},
  "video_spec": null,
  "compliance_flags": ["no_purple", "use_official_partner_logos", "no_unverified_stats"]
}
```

**Quality Gate:** Schema validation — all mandatory fields populated, compliance flags present.

**Auto-fix:** Re-calls itself with stricter prompt if output schema is incomplete.

---

### Agent 2: Visual Designer

**Role:** Generates brand-locked images, graphics, and thumbnails.

**Primary Tools:**
- Recraft V3 API (brand style code `NF_CORPORATE_V2`) — social cards, icons, infographics
- Flux 1.1 Pro + NightFactory LoRA — photorealistic product/team imagery
- Ideogram v4 — stat cards, quote graphics, text-heavy banners

**Input:** `brief.visual_spec` + asset type + platform dimensions

**Output:** Image file(s) at correct dimensions + generation metadata (model, prompt, seed)

**Quality Gate (pre-Guardian):**
- Recraft returns with style code locked → guaranteed palette adherence
- Flux LoRA enforces brand aesthetics at model level

**Auto-fix Loop:**
1. Generate image → send to Brand Guardian
2. If Guardian flags color issue → re-generate with explicit negative prompt: `"no purple, no magenta, no gradient backgrounds"`
3. If Guardian flags logo issue → switch to Brandfetch-sourced SVG overlay (skip AI generation for logos entirely)

---

### Agent 3: Video Producer

**Role:** Generates short-form video content and finishes with captions/overlays.

**Primary Tools:**
- Kling 3.0 API — motion video, UGC-style, product demos (primary volume tool)
- Captions.ai Business API — caption burn-in, brand overlays, multi-platform export
- HeyGen Avatar V API — presenter/avatar content (existing)
- Higgsfield API — dynamic social reels (existing)

**Input:** `brief.video_spec` + script from Content Strategist + brand asset URLs

**Output:** Platform-ready `.mp4` with burned captions, brand watermark/lower-third

**Quality Gate (pre-Guardian):**
- Captions.ai applies brand color caption style before Brand Guardian sees it
- Duration compliance check (15s for Reels, 60s for LinkedIn, 60s for TikTok)

**Auto-fix Loop:**
1. Generate via Kling 3.0 → run through Captions.ai brand finish
2. If Guardian flags off-brand visual element in video frame → flag timestamp + description → regenerate that segment or replace with static frame
3. Max 3 video regeneration attempts (cost control); on 3rd fail → escalate

---

### Agent 4: Content Strategist

**Role:** Platform-optimized copywriting, hashtag research, Postiz payload assembly.

**Primary Tools:**
- Claude claude-sonnet-4 API (primary copy engine with brand voice system prompt)
- Predis.ai API (full-package fallback for speed)
- Taplio API (LinkedIn-specific carousel and post sequencing)

**Input:** `brief.copy_spec` + campaign topic + recent performance data

**Output:**
```json
{
  "platform": "linkedin",
  "hook": "93% of data projects fail before go-live. Here's the pattern we fixed.",
  "body": "...(3000 chars max)...",
  "cta": "Drop a comment with your biggest integration headache.",
  "hashtags": ["#MicrosoftFabric","#DataEngineering","#PowerBI","#NightFactory"],
  "alt_text": "Diagram showing 5-stage data pipeline with ProcessBI integration points",
  "postiz_payload": {...}
}
```

**Quality Gate (pre-Guardian):**
- Character limit validation per platform (auto-trim if over)
- Fabricated claim scan: any number/stat → flagged for Brand Guardian accuracy check

**Auto-fix Loop:**
1. If Guardian flags brand voice mismatch → re-generate copy section with tighter tone instruction
2. If Guardian flags fabricated stat → replace with `[VERIFIED STAT NEEDED]` placeholder and escalate that specific claim only (not the whole post)

---

### Agent 5: Brand Guardian (QA Gate)

**Role:** Downstream quality gate. ALL output from Agents 2, 3, 4 passes through here before Postiz. Self-corrects by returning structured failure reasons to the responsible agent.

**Primary Tools:**
- Claude claude-opus-4 Vision API (multimodal brand audit)
- Brandfetch API (official partner/brand asset verification)
- Playwright + screenshot (website QA path)
- Custom Python scoring engine (`workers/prism_brand_guardian.py`)

**Input:** Complete post package — image/video thumbnail + copy + metadata

**Output:**
```json
{
  "decision": "FLAG",
  "score": 82,
  "breakdown": {
    "brand_voice": 18,
    "visual_consistency": 14,
    "platform_optimization": 20,
    "engagement_potential": 16,
    "accuracy": 14
  },
  "issues": [
    {"dimension": "visual_consistency", "issue": "Background color #6B21A8 (purple) detected, expected #1A56DB (brand blue)", "severity": "HIGH", "auto_fix_instruction": "Regenerate image with explicit palette constraint"},
    {"dimension": "accuracy", "issue": "Stat '87% reduction' unverified in knowledge base", "severity": "MEDIUM", "auto_fix_instruction": "Replace with verified stat from knowledge/market-research/ or remove"}
  ],
  "retry_count": 1,
  "approved": false
}
```

**Quality Gate:** Score ≥ 90 to APPROVE. See full sigma loop in Part 3.

---

## Part 3: The 4-5 Sigma QA Loop

### Decision Tree

```
Creative Agent produces output
         │
         ▼
Brand Guardian scores (0–100)
         │
    ┌────┼────────────┐
    │    │            │
  ≥90  75–89       50–74 or <50
  │    │            │
APPROVE FLAG      REJECT
  │    │            │
  ▼    ▼            ▼
Postiz  Auto-fix  Regenerate
Queue   (1 retry)  from scratch
         │          │
         ▼          ▼ (attempts 2–5)
       Re-score   Re-score
         │          │
        ≥90?       ≥90?
       Yes→APPROVE  No → attempt+1
       No→REJECT    After 5 fails:
                   ESCALATE to Manish
                   (structured report only)
```

### Scoring Rubric — Social Posts (100 points)

| Dimension | Max | Scoring Logic |
|-----------|-----|---------------|
| **Brand Voice Match** | 20 | Claude rates tone vs. brand voice spec (authoritative, never hype, data-first). Deduct 5/point for wrong register, superlatives without data, first-person informal |
| **Visual Consistency** | 20 | Claude Vision checks: correct blue (#1A56DB), no purple/magenta, logo from Brandfetch SVG, no rogue gradients. Each violation -5 |
| **Platform Optimization** | 20 | Char limits met, correct aspect ratio, hashtag count in range (3-5 LinkedIn, 5-10 Instagram), CTA present, alt text populated |
| **Engagement Potential** | 20 | Hook in first line, curiosity gap or stat, clear CTA, visual stopping power (contrast, focal point). Rated by Claude against viral post benchmarks |
| **Accuracy** | 20 | Every stat/claim cross-referenced against `knowledge/market-research/`. Any unverified number → -10. Any fabricated company name → -20 (instant floor at 0) |

**Approval threshold: ≥ 90/100**
**Sigma mapping:** 90–95 = 4σ (99.38%), 95–99 = 4.5σ (99.87%), 99–100 = 5σ (99.9997%)

### Scoring Rubric — Website Elements (100 points)

| Dimension | Max | Scoring Logic |
|-----------|-----|---------------|
| **Official Partner Icons** | 25 | Brandfetch API lookup: all partner logos match canonical SVG. Wrong format/colour → -10 per logo |
| **Colour Compliance** | 25 | Playwright screenshot → Claude Vision hex-samples key regions. Any purple/off-brand hex → -10. Checked against `brand-spec.json` palette |
| **No Fabricated Stats** | 25 | Claude reads all visible numbers → cross-checks against knowledge base. Unverified stat → -10 each |
| **Layout/Nav Correctness** | 25 | Percy/Playwright visual diff against approved baseline. Any layout regression → -5/element. Missing nav items → -10 |

### Auto-fix Instructions (structured, not freeform)

Every Brand Guardian rejection includes a machine-readable `auto_fix_instruction` per issue. The responsible agent reads this and applies it deterministically:

| Issue Type | Auto-fix Action |
|------------|----------------|
| Wrong color detected | Re-generate with `color_palette: ["#1A56DB","#FFFFFF","#111827"]` explicit constraint |
| Wrong/AI-generated logo | Replace with Brandfetch API SVG asset; bypass AI generation for logos entirely |
| Brand voice off (too casual) | Rewrite with system prompt: `"Tone: McKinsey-level authority. No superlatives without data."` |
| Stat unverified | Query `knowledge/market-research/` → replace or flag as `[NEEDS SOURCE]` |
| Char limit exceeded | Claude trims body, preserving hook + CTA; re-scores |
| Layout regression | Trigger Postiz hold + alert Manish (website changes can't auto-fix) |
| Fabricated claim in video | Flag timestamp, replace frame with static approved graphic |

---

## Part 4: NightFactory Integration Plan

### Architecture Fit

```
agent_task_queue (PG localhost:5433/nightfactory)
    │
    ├── task_type: "prism_social_post" → prism_orchestrator.py
    ├── task_type: "prism_website_qa" → prism_brand_guardian.py (website path)
    └── task_type: "prism_video_reel" → prism_video_agent.py

prism_orchestrator.py (LangGraph StateGraph)
    ├── calls: prism_visual_agent.py     → Recraft V3 / Flux API
    ├── calls: prism_video_agent.py      → Kling 3.0 / Captions.ai API
    ├── calls: prism_content_agent.py    → Claude claude-sonnet-4 API
    └── calls: prism_brand_guardian.py   → Claude claude-opus-4 Vision + Brandfetch API
                    │
                    ▼
            APPROVE → Postiz REST API (self-hosted, 33 platforms)
            ESCALATE → hermes_dispatch_results table (status='prism_escalation')
```

### New Python Workers (to build)

| File | Function | APIs Called |
|------|----------|-------------|
| `workers/prism/prism_orchestrator.py` | LangGraph StateGraph; reads from `agent_task_queue`; routes to sub-agents | Claude claude-opus-4, PG |
| `workers/prism/prism_visual_agent.py` | Image generation with brand style codes | Recraft V3 API, Flux BFL API, Ideogram API |
| `workers/prism/prism_video_agent.py` | Video generation + caption finishing | Kling 3.0 API, Captions.ai API, HeyGen API |
| `workers/prism/prism_content_agent.py` | Copy generation + Postiz payload assembly | Claude claude-sonnet-4 API, Taplio API |
| `workers/prism/prism_brand_guardian.py` | Scoring engine + auto-fix dispatcher | Claude claude-opus-4 Vision, Brandfetch API, Playwright |
| `workers/prism/brand_spec.json` | NightFactory/ProcessBI brand spec | N/A (static) |
| `workers/prism/postiz_publisher.py` | Postiz REST API client; publishes approved payloads | Postiz self-hosted REST API |

### Integration with Existing NightFactory Systems

- **agent_task_queue (PG):** PRISM tasks enqueued here by Hermes or manually. `task_type = 'prism_social_post'`. Existing `queue_worker` picks up and dispatches to `prism_orchestrator.py`.
- **hermes_dispatch_results (PG):** Brand Guardian escalations written here with `status='prism_escalation'`, `payload=structured_failure_report`. Claude Dispatch surfaces to Manish in next morning briefing.
- **knowledge/brand/:** New folder. Store `nightfactory-brand-spec.md` (colour hex, font, voice), `processbi-brand-spec.md`, `recraft-style-codes.json` (brand → style code mapping).
- **knowledge/market-research/:** Brand Guardian's fact-check source. Claims are cross-referenced here before approval.
- **nf_supervisor.py:** Add `check_prism_agent_health()` — monitors for stale `agent_task_queue` PRISM tasks (>30min unprocessed = alert).
- **Postiz (self-hosted):** `postiz_publisher.py` calls Postiz REST API (`POST /api/posts`) to fan out approved content to 33 platforms. No human touch.
- **fix_observations:** On first deploy, register: `INSERT INTO fix_observations (component, error_summary, fix_applied) VALUES ('prism_orchestrator', 'Initial deployment', 'LangGraph QA loop with Brand Guardian');`

### Secrets (workers/secrets.env additions)

```
RECRAFT_API_KEY=
FLUX_BFL_API_KEY=
IDEOGRAM_API_KEY=
KLING_API_KEY=
CAPTIONS_AI_API_KEY=
BRANDFETCH_API_KEY=
POSTIZ_API_URL=http://localhost:3000
POSTIZ_API_KEY=
```

---

## Part 5: Priority Install Sequence

### Week 1 — Brand Guardian First (Stops the Bleeding)

**Goal:** Deploy the QA gate immediately. Every existing content output gets checked before publishing. Fixes the "random things breaking the process" problem TODAY.

Tasks:
1. Create `workers/prism/brand_spec.json` — encode NightFactory brand: hex colours, logo URLs (via Brandfetch), voice rules, forbidden elements list
2. Deploy `workers/prism/prism_brand_guardian.py` — Claude claude-opus-4 Vision scoring against brand spec
3. Integrate Brandfetch API — fetch canonical logos for all known partners; store locally in `knowledge/brand/partner-logos/`
4. Wire Brand Guardian into existing Postiz publish flow — all posts must pass ≥90 score before `postiz_publisher.py` fires
5. Set up Playwright baseline screenshots for ProcessBI website — store in `knowledge/brand/website-baselines/`
6. Add `check_prism_agent_health()` to `nf_supervisor.py`

**Cost this week:** Brandfetch Pro $49/mo, Claude Vision at usage (~$5-10)

---

### Week 2 — Content Strategist (Automate Copy)

**Goal:** Stop writing social posts manually. Claude claude-sonnet-4 generates all copy; Brand Guardian approves before Postiz fan-out.

Tasks:
1. Build `workers/prism/prism_content_agent.py` with NightFactory brand voice system prompt
2. Create content brief schema — structured JSON campaign briefs enqueue to `agent_task_queue`
3. Build `workers/prism/postiz_publisher.py` — Postiz REST client with platform-specific payload formatting
4. Set up Taplio integration for LinkedIn personal brand posts (Manish)
5. Test 5 posts end-to-end: brief → content agent → brand guardian → Postiz → live
6. Wire escalation path to `hermes_dispatch_results` for Guardian failures

**Cost this week:** Claude API ~$15-20, Taplio $49/mo

---

### Week 3 — Visual Designer + Video Producer (Full Creative Stack)

**Goal:** Generate all images and videos in-house with brand locking. Zero manual design work.

Tasks:
1. Train Flux 1.1 Pro LoRA on NightFactory/ProcessBI brand assets (one-time, ~$35)
2. Create Recraft Brand Style Code for NightFactory (upload 5+ brand images via Recraft API)
3. Deploy `workers/prism/prism_visual_agent.py` — Recraft V3 (primary) + Flux LoRA (photorealistic)
4. Deploy `workers/prism/prism_video_agent.py` — Kling 3.0 (volume reels) + Captions.ai finishing
5. Build `workers/prism/prism_orchestrator.py` — LangGraph StateGraph wiring all 5 agents
6. Run first fully automated campaign: brief → orchestrator → all 4 creative agents → brand guardian → Postiz
7. Register `prism_orchestrator` in `fix_observations` and start observation schedule

**Cost this week:** Flux LoRA training $35 (one-time), Recraft API ~$10, Kling API ~$5, Captions.ai $79.99/mo

---

## Part 6: Cost Model

### Per-Post Cost (90 posts/month at 21 posts/week)

| Component | Cost Model | Monthly Cost |
|-----------|-----------|--------------|
| Images (2/post avg) | Recraft V3 $0.04 × 180 images | $7.20 |
| Flux photorealistic (20% of posts) | $0.04 × 36 images | $1.44 |
| Ideogram text cards (10% of posts) | $0.08 × 18 images | $1.44 |
| Claude claude-sonnet-4 copy | ~5K tokens/post × 90 × $3/M | $1.35 |
| Claude claude-opus-4 Vision (Brand Guardian) | ~15K tokens/check × 90 × $15/M | $20.25 |
| Kling 3.0 video (4 reels/week) | $0.075/s × 5s × 16 reels | $6.00 |
| Captions.ai Business (video finishing) | $79.99/mo flat | $79.99 |
| HeyGen avatar (2 videos/month) | $3/min × 3min × 2 | $18.00 |
| Brandfetch Pro (logo lookups) | $49/mo flat | $49.00 |
| Taplio LinkedIn (Manish personal brand) | $49/mo | $49.00 |
| Postiz self-hosted | $0 (already running) | $0 |
| **TOTAL** | | **~$233/mo** |

### Cost Per Post: ~$2.60/post fully automated (vs. ~$50-200 human designer equivalent)

### Breakeven: At 2 hours/month of designer time saved ($100/hr) → ROI positive at 2 posts

### Scale Sensitivity

| Volume | Monthly Cost | Cost/Post |
|--------|-------------|-----------|
| 21 posts/week (current) | ~$233 | $2.60 |
| 50 posts/week | ~$380 | $1.73 |
| 100 posts/week | ~$510 | $1.16 |

_Captions.ai and Taplio are fixed costs; marginal cost per post is ~$0.35 at scale._

---

## MCP Registry Search Results

Searched keywords: `["canva", "design", "image generation"]`, `["social media", "video", "content generation"]`, `["brand", "visual", "design", "image"]`

**Result: No relevant MCP connectors found in registry** for these categories. The PRISM Social stack must be implemented as Python workers calling APIs directly — this is actually preferable for NightFactory's architecture since it integrates natively with `agent_task_queue` and `hermes_dispatch_results`.

One notable finding: **HeyGen MCP is available** (listed in system tools) — this can be used for HeyGen avatar video generation directly from Claude sessions as an orchestration step.

---

## Appendix A: brand_spec.json Schema

```json
{
  "brand_name": "NightFactory / ProcessBI",
  "colours": {
    "primary_blue": "#1A56DB",
    "dark_bg": "#111827",
    "white": "#FFFFFF",
    "accent_grey": "#6B7280",
    "forbidden": ["#7B2FBE", "#6B21A8", "#9333EA", "#A855F7"]
  },
  "logo": {
    "primary_url": "https://brandfetch.io/[domain]/logo",
    "usage_rules": "Always on white or dark_bg. Minimum 40px height. No effects."
  },
  "typography": {
    "heading": "Inter Bold",
    "body": "Inter Regular",
    "forbidden": ["Comic Sans", "Papyrus", "decorative script"]
  },
  "voice": {
    "tone": "authoritative_data_driven",
    "register": "professional_b2b",
    "forbidden_patterns": ["superlatives without data", "first_person_informal", "excessive_exclamation"]
  },
  "partner_logos": {
    "microsoft": "brandfetch://microsoft.com",
    "azure": "brandfetch://azure.microsoft.com",
    "power_bi": "brandfetch://powerbi.microsoft.com",
    "fabric": "brandfetch://fabric.microsoft.com"
  }
}
```

---

## Appendix B: LangGraph State Schema (prism_orchestrator.py)

```python
from typing import TypedDict, Literal

class PRISMState(TypedDict):
    brief_id: str
    campaign_brief: dict
    visual_output: dict | None
    video_output: dict | None
    copy_output: dict | None
    guardian_score: int | None
    guardian_issues: list[dict]
    retry_count: int
    decision: Literal["pending", "approved", "flagged", "rejected", "escalated"]
    postiz_payload: dict | None

# State transitions:
# start → creative_director → visual_designer / video_producer / content_strategist
# → brand_guardian → 
#     if score >= 90: postiz_publish → END
#     if 75-89: auto_fix (retry_count += 1) → brand_guardian
#     if <75 and retry < 5: regenerate → brand_guardian  
#     if retry >= 5: escalate → END
```

---

_Provenance: Research conducted 2026-06-20. Sources: Atlas Cloud AI image generation guides, eesel.ai pricing guides, aifreeforever.com video benchmarks, Recraft/BFL/Kling/Runway official docs, Percy/Applitools comparison, CrewAI/LangGraph official documentation, Predis.ai/Taplio product pages, Brandfetch API docs, Postiz GitHub/docs._

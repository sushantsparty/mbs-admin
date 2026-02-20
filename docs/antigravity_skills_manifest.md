# Antigravity Skills Manifest

> Last updated: 2026-02-19
> Location: `mbs-admin/.agents/skills/` (symlinked to `.agent/skills/` for Antigravity)
> Source: [skills.sh](https://skills.sh)

This is the master list of all installed skills that Antigravity can access. These are procedural knowledge modules that enhance capabilities across marketing, development, design, and operations.

---

## 📊 Summary

| Source Repo | Skills | Category |
|-------------|--------|----------|
| `coreyhaines31/marketingskills` | 26 | Marketing, SEO, CRO, Email, Content |
| `obra/superpowers` | 14 | Dev process, debugging, planning |
| `anthropics/skills` | 17 | Doc generation, design, testing |
| `vercel-labs/skills` | 1 | Meta (skill discovery) |
| **Total** | **58** | |

---

## 🔥 Marketing & Growth — `coreyhaines31/marketingskills`

| Skill | What It Does |
|-------|-------------|
| `email-sequence` | Design email drip campaigns: sequence structure, timing, subject lines, CTAs, lead nurture flows |
| `cold-email` | Write B2B cold outreach emails and follow-up sequences that get replies |
| `copywriting` | Write/improve marketing copy: landing pages, homepage, pricing pages, CTAs, voice/tone |
| `copy-editing` | Edit and polish existing copy, blog posts, emails, docs |
| `programmatic-seo` | pSEO at scale: 12 playbooks, keyword patterns, template design, internal linking, indexation |
| `seo-audit` | Full SEO audit: technical, on-page, E-E-A-T, content quality, by site type |
| `schema-markup` | JSON-LD structured data: Organization, Article, FAQ, BreadcrumbList, validation |
| `content-strategy` | Content pillars, searchable vs shareable, keyword research by buyer stage, prioritization |
| `social-content` | Social media: hook formulas, content repurposing, engagement strategy, calendar structure |
| `marketing-psychology` | 50+ mental models: loss aversion, social proof, JTBD, pricing psychology, persuasion |
| `marketing-ideas` | Generate marketing ideas, inspiration, and strategic recommendations |
| `page-cro` | Conversion rate optimization: value props, CTAs, trust signals, friction points |
| `form-cro` | Optimize forms (non-signup): reduce friction, improve completion rates |
| `signup-flow-cro` | Optimize signup/registration flows |
| `onboarding-cro` | Optimize post-signup onboarding and activation |
| `popup-cro` | Create/optimize popups, modals, and overlays |
| `paywall-upgrade-cro` | Optimize in-app paywalls and upgrade flows |
| `pricing-strategy` | Pricing decisions: packaging, tiering, positioning, psychology |
| `product-marketing-context` | Product marketing foundations: positioning, messaging, ICP |
| `launch-strategy` | Product launches: ORB framework, 5-phase approach, Product Hunt, post-launch |
| `competitor-alternatives` | Write competitor comparison and "X alternatives" pages |
| `free-tool-strategy` | "Engineering as marketing" — plan and build free tools for lead gen |
| `analytics-tracking` | GA4, GTM, UTMs, event naming, tracking plans, privacy compliance |
| `paid-ads` | Paid advertising campaigns across platforms |
| `referral-program` | Design and optimize referral programs |
| `ab-test-setup` | Plan, design, and implement A/B tests |

---

## 🛠 Dev Process & Engineering — `obra/superpowers`

| Skill | What It Does |
|-------|-------------|
| `systematic-debugging` | 4-phase debugging methodology: root cause → pattern analysis → hypothesis → implementation |
| `brainstorming` | Structured ideation → design process before creative work |
| `writing-plans` | Write implementation plans from specs/requirements |
| `executing-plans` | Execute written implementation plans step by step |
| `test-driven-development` | TDD workflow: write tests first, then implement |
| `verification-before-completion` | Verify work is actually complete before claiming it's done |
| `subagent-driven-development` | Execute plans with independent parallel subagents |
| `dispatching-parallel-agents` | Run 2+ independent tasks in parallel |
| `requesting-code-review` | Prepare and request code reviews |
| `receiving-code-review` | Process and implement code review feedback |
| `finishing-a-development-branch` | Clean up when implementation is done, tests pass |
| `using-git-worktrees` | Feature isolation with git worktrees |
| `using-superpowers` | Meta-skill: how to find and use all superpowers |
| `writing-skills` | Create/edit new skills |

---

## 📄 Document & Design — `anthropics/skills`

| Skill | What It Does |
|-------|-------------|
| `pdf` | Create, read, edit PDFs (pypdf, reportlab, pdfplumber, CLI tools) |
| `docx` | Create, read, edit Word documents |
| `xlsx` | Create, read, edit Excel spreadsheets |
| `pptx` | Create, read, edit PowerPoint presentations |
| `canvas-design` | Create visual art in PNG/PDF using code |
| `algorithmic-art` | Algorithmic art with p5.js and seeded randomness |
| `frontend-design` | Production-grade frontend interfaces |
| `web-artifacts-builder` | Multi-component client-side web apps |
| `webapp-testing` | Test local web applications |
| `brand-guidelines` | Apply brand colors, typography, design tokens |
| `theme-factory` | Style artifacts with themes |
| `doc-coauthoring` | Structured co-authoring workflow |
| `internal-comms` | Write internal communications (memos, announcements, etc.) |
| `mcp-builder` | Build Model Context Protocol servers |
| `skill-creator` | Create new skills for the skills ecosystem |
| `slack-gif-creator` | Create animated GIFs for Slack |
| `template-skill` | Template for creating new skills |

---

## 🔍 Meta — `vercel-labs/skills`

| Skill | What It Does |
|-------|-------------|
| `find-skills` | Discover and suggest new skills from the ecosystem |

---

## How Skills Are Installed

- **Location**: `.agents/skills/<skill-name>/` (universal) + symlinked to `.agent/skills/` (Antigravity)
- **Method**: Symlink (single source of truth, easy updates)
- **Scope**: Project (committed with mbs-admin)
- **Update**: Run `npx skills add <repo>` again to update

## How to Add More Skills

```bash
# Browse available skills
npx skills add <owner/repo>

# Or search skills.sh
# https://skills.sh
```

---

## When to Use Each Skill

### For Drip Campaigns / Outreach
→ `email-sequence` + `cold-email` + `copywriting` + `marketing-psychology`

### For DPDPNews / pSEO Sites
→ `programmatic-seo` + `seo-audit` + `schema-markup` + `content-strategy`

### For Landing Pages / Conversion
→ `page-cro` + `copywriting` + `marketing-psychology` + `analytics-tracking`

### For Product Launches
→ `launch-strategy` + `social-content` + `product-marketing-context` + `competitor-alternatives`

### For Compliance Reports / PDFs
→ `pdf` + `docx` + `xlsx`

### For Debugging / Development
→ `systematic-debugging` + `test-driven-development` + `verification-before-completion`

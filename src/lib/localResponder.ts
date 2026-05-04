import { HANS } from './knowledge';

type Slug = 'eli' | 'nora';

function hit(msg: string, keywords: string[]): number {
  const m = msg.toLowerCase();
  return keywords.reduce((n, kw) => n + (m.includes(kw) ? 1 : 0), 0);
}

function productMatch(msg: string) {
  return HANS.products.find(p =>
    hit(msg, [...p.keywords, p.id, p.name.split('.')[0].toLowerCase()]) > 0
  );
}

// ── Response library ────────────────────────────────────────────────────────

function greeting(slug: Slug) {
  if (slug === 'eli') return `Eli North. Biz-dev and headhunter for Hans Turner.

I qualify prospects, run credibility scans, and close strategy calls. The pipeline: **Scan → Strategy → Close**.

What are we working on? Got a prospect or deal to think through — let's start there.`;

  return `Hey — Nora Fox. Content and social lead for Hans Turner.

I turn his portfolio work into publish-ready content across LinkedIn, X, Instagram, and GitHub.

**What I can do right now:**
- LinkedIn post (case study, launch, POV)
- X thread (5 posts, first standalone)
- 5-day launch-week content calendar
- Warm DM reply
- GitHub README polish

What do you need?`;
}

function aboutHans(slug: Slug) {
  if (slug === 'eli') return `**Hans Turner — AI Systems Operator**

The version I use in a first call:

He builds distinctive web experiences for security-first, eco-forward, and operator-grade platforms. Operating model: plug in, audit, implement, train, exit. No long retainers. Clean deliverables.

**What he does:**
- AI agent systems and LLM-powered applications
- Full-stack web products (Next.js · Supabase · Vercel)
- Automation pipelines that replace repetitive manual work
- Credibility infrastructure: audits, strategy docs, secure tooling

**Portfolio:**
- **WebsiteCreditScore.com** — AI credibility audit, 10 dimensions, letter grade + fixes
- **StrategyPresentation.com** — live strategy documents, never a PDF
- **Passwordn.com** — zero-knowledge credential vault for agencies
- **GrantedSC.com** — grant pipeline for SC nonprofits
- **JobChain** — job application keychain (free, local-only, this site)
- **MYOOS.com** — AI runtime with post-quantum security
- **GaiaEcoDevelopments.com** — regenerative infrastructure brand

**Stack:** Next.js · Supabase · Vercel · Anthropic · TypeScript · Tailwind CSS · Cloudflare R2 · Stripe

**Positioning:** "${HANS.tagline}"

**Looking for:** ${HANS.lookingFor}`;

  return `Here's Hans's brand story — the version I use to open content:

**Hans Turner** is an AI Systems Operator based in South Carolina.

*One-liner:* "${HANS.tagline}"

**What makes him different:**
He uses AI as leverage — not to replace work, but to compress timelines. What used to take weeks, he ships in hours. He goes in, audits what's broken, implements the fix, trains the team, and steps out. Clean. No 12-month retainers.

**The portfolio tells the story:**
- **WebsiteCreditScore** — he built the audit tool. Not just someone who runs audits.
- **GrantedSC** — AI-guided grant pipeline for SC nonprofits. Local market, real impact.
- **JobChain** — free job application tool. No account, no server, no friction.
- **Passwordn** — zero-knowledge credentials. Security-first, built for agencies.
- **MYOOS** — post-quantum security meets AI runtime. Operator-grade.

**Current focus:** AI engineering, web dev, design-engineering hybrids. Remote, fast-moving teams.

**Voice:** Direct but not cold. Confident without bragging. Outcomes over adjectives.`;
}

function allProducts(slug: Slug) {
  if (slug === 'eli') return `Portfolio breakdown — useful for matching the right product to the prospect:

**WebsiteCreditScore.com** — AI credibility audit. 10 dimensions. Letter grade + prioritized fixes. Best entry point for cold prospects. Creates immediate self-awareness. Three tiers: scan → audit → white-glove.

**StrategyPresentation.com** — Live strategy docs on a private subdomain. No PDFs. Always current and linkable. Best for high-value engagements where the deliverable needs to stay alive.

**Passwordn.com** — Zero-knowledge credential vault. Nothing leaves the browser. Built for agencies and security-conscious teams who can't risk exposure.

**GrantedSC.com** — Grant discovery and application pipeline for SC nonprofits. AI-guided prep + strategy. Local market product.

**JobChain** — Free local-only job application keychain. Fill once, paste everywhere. No account, no server.

**MYOOS.com** — AI runtime with post-quantum cryptography. Enterprise/high-security clients.

**GaiaEcoDevelopments.com** — Regenerative infrastructure brand. Eco client angle.

Which fits your prospect?`;

  return `Content angle on each product — each one has a distinct story:

**WebsiteCreditScore.com** → "Most websites have a credibility problem they don't know about." Gets shares because it creates productive self-doubt. Best opening: built a tool, not just using one.

**StrategyPresentation.com** → "I burned the PDF." Contrarian take on deliverables. Strong LinkedIn performer.

**Passwordn.com** → Security-first, zero friction. Privacy angle is strong right now. "Built for agencies who can't risk credential exposure."

**GrantedSC.com** → Local impact story. SC nonprofits, real funding, real outcomes. Community-forward content.

**JobChain** → "Stop retyping the same answers." Free, immediate value. Every job seeker gets it instantly.

**MYOOS.com** → Technical, forward-looking. Post-quantum is a hot topic. Best for LinkedIn/GitHub vs Instagram.

**GaiaEcoDevelopments.com** → Lifestyle credibility, Instagram-first. Show the mission, the why, the eco vision.

Which product do you want to build content around?`;
}

function techStack(slug: Slug) {
  const base = `**${slug === 'eli' ? "Hans's stack — version I cite in technical conversations" : "Hans's stack — framed for content"}**

**Frontend/Framework:** Next.js (App Router) · React · TypeScript · Tailwind CSS v4

**Backend/Database:** Supabase (Postgres + Auth + Realtime) · Cloudflare R2 (object storage)

**Deployment:** Vercel (edge functions, ISR, serverless)

**AI/ML:** Anthropic API (Claude Haiku for cost efficiency, Sonnet for complex tasks)

**Payments:** Stripe

**Automation:** n8n · Zapier · custom RSS pipelines`;

  if (slug === 'eli') return base + `\n\n**Security:** Zero-knowledge patterns (Passwordn) · Post-quantum cryptography (MYOOS)\n\nThis is a production-grade stack — not a side-project stack. Everything deployed, everything shipping.`;
  return base + `\n\n**Content angle:** He uses the same stack as the best-funded startups — solo, at startup speed, without the overhead. Good LinkedIn framing: "Solo operator. Production-grade stack. No team needed."`;
}

function contactInfo(slug: Slug) {
  return `**Contact Hans Turner**

**Email:** ${HANS.email}
**Site:** ${HANS.site}

${slug === 'eli'
    ? 'For biz-dev: email is the right first channel. Send a one-paragraph note with the prospect\'s URL and the specific pain point. Under 100 words. I\'ll handle the brief.'
    : 'For content: hansturner.com is the home base. The About page has his AI Systems Operator positioning. The Focus page has current projects and a live signal stack. Good reference for any content that needs to sound current.'}`;
}

// ── Eli tasks ──────────────────────────────────────────────────────────────

function prospectBrief(msg: string) {
  const hasDetails = msg.length > 50 && !msg.toLowerCase().includes('template');
  if (hasDetails) return `To write a complete brief, I need a few data points — provide whatever you have:

1. **Company name and URL**
2. **Industry and rough size**
3. **How they found Hans** (referral, cold outreach, tool, inbound)
4. **Decision-maker name and title**
5. **Known pain point** — what are they trying to solve?
6. **Timeline or budget signal**

Paste what you've got and I'll produce a one-page brief with a single recommended next step.`;

  return `**Prospect Brief Template**

---

**PROSPECT BRIEF — [Company Name]**
*Prepared for Hans Turner — [Date]*

**Company:** [Name · URL · Industry · Est. size]
**Decision-maker:** [Name, Title, LinkedIn]
**Discovered via:** [Referral / cold scan / inbound / tool]

**Credibility baseline:**
Run [company.com] through WebsiteCreditScore.com. Paste grade + top 2 issues here.

**Known pain:** [One sentence — what are they actually trying to fix?]

**Portfolio match:**
- Credibility/brand issue → WebsiteCreditScore.com
- Strategy delivery → StrategyPresentation.com
- Agency/security → Passwordn.com
- SC nonprofit → GrantedSC.com

**Recommended first move:** [One action: intro call / send scan results / specific email angle]

**Risk flags:** [Timing, budget, competitor, missing internal champion?]

**Hans's edge:** "He built the audit tool. He doesn't just run them."

---

Paste a real prospect and I'll fill this in with specifics.`;
}

function strategyCallAgenda() {
  return `**Strategy Call Agenda — 30 Minutes**

---

**0:00 – 0:03 — Grounding (3 min)**
- How they found Hans, what triggered the outreach
- Confirm the 30-minute structure

**0:03 – 0:12 — Discovery (9 min)**
- What's the current web/digital situation?
- What's working? What's costing them? What's embarrassing?
- Who owns the decision? What's the timeline?

**0:12 – 0:20 — Credibility scan (8 min)**
- Pull up WebsiteCreditScore.com live or share pre-run results
- Walk through the top 2–3 gaps — let them react
- *"Is this what you suspected, or a surprise?"*

**0:20 – 0:26 — Portfolio match (6 min)**
- One specific product match based on their biggest pain
- Show it live — never describe what they can see
- *"Does this solve what you described?"*

**0:26 – 0:29 — Next step (3 min)**
- Clear ask: strategy session, proposal, or pass
- If yes: scope in one sentence, confirm follow-up date
- If not yet: send scan results + one resource, re-engage in 7 days

**0:29 – 0:30 — Close**
- Thank them. Stop talking.

---

**Rule:** The scan runs the show. Run it live in the call or you're leaving the best tool on the table.`;
}

function coldOutreach() {
  return `**3-Touch Cold Outreach Sequence**

---

**Touch 1 — Email**
*Subject: Your site's credibility score*

> [Name] —
>
> Ran [company.com] through WebsiteCreditScore.com — the AI credibility audit I built.
>
> You got a [B/C/D] across 10 dimensions. The two biggest gaps: [Gap 1] and [Gap 2].
>
> Both are fixable in a single session. Interested in a 30-minute scan walkthrough?
>
> — Hans Turner · hansturner.com

*Why it works: Short. Specific. He did the work before asking for the meeting.*

---

**Touch 2 — LinkedIn DM (Day 4)**

> [Name], sent you an email Tuesday — ran your site through a credibility audit tool I built.
>
> Flagged [Gap 1]. Thought it was worth a quick note given what [Company] does.
>
> Open to a 20-minute look at the results?

*Why it works: New channel, references the email, even shorter ask.*

---

**Touch 3 — Follow-up Email (Day 9)**

> [Name] —
>
> Last note on this — sharing the scan results regardless of whether we talk.
>
> [Direct link or screenshot]
>
> The [Gap] is the fastest fix. Worth [X] minutes if timing is better later.
>
> — Hans

*Why it works: Gives value even if they don't respond. Leaves the door open.*

---

Paste the prospect's name, company, URL, and top credibility gap — I'll personalize all three.`;
}

function handoffNote() {
  return `**Handoff Note for Hans — 60-second read**

---

**Prospect:** [Name, Title, Company]
**Call:** [Date · Time · Duration]
**Source:** [How they came in]

**Scan result:** [Grade + top 2 issues from WebsiteCreditScore.com]

**Pain in their words:** "[Direct quote or close paraphrase]"

**Portfolio match:** [Product — one sentence on why it fits]

**Decision dynamic:** [Who's in the room? Who's the final yes?]

**Biggest objection or hesitation:** [If known]

**Recommended open:** "[Specific first line or question for Hans]"

**Red flag:** [Anything that might derail the call]

---

Paste the prospect details and I'll fill this in completely.`;
}

function discoveryQuestions() {
  return `**Discovery Question Bank — 15 Questions**

*Ranked by signal quality. Ask the first 7 unless the answer is already obvious.*

---

**Tier 1 — Always ask**

1. "What triggered you reaching out now? Why not six months ago?"
2. "Walk me through how a prospect finds you today — from search to first contact."
3. "What's the most embarrassing thing about your current website that you've never fixed?"
4. "Who's the last vendor you hired for web/tech work? How did that go?"
5. "If this engagement goes well, what does success look like in 90 days?"
6. "What's your timeline? Is there a date this needs to be done by?"
7. "Who else is involved in this decision?"

---

**Tier 2 — When the picture is still unclear**

8. "What have you already tried? What broke or didn't work?"
9. "What does your budget conversation sound like internally?"
10. "Are you talking to anyone else for this?"
11. "What would make you say no to moving forward?"
12. "What's the cost of doing nothing for another quarter?"
13. "Is the goal to improve what you have, or build something new?"

---

**Tier 3 — Context fillers**

14. "What's your industry's standard for web credibility? Are you above or below it?"
15. "If you could only fix one thing this month, what would it be?"

---

**Rule:** Stop at 7 if you already have a clear path. Over-questioning loses calls.`;
}

// ── Nora tasks ─────────────────────────────────────────────────────────────

function linkedinPost(msg: string) {
  const m = msg.toLowerCase();
  const isJobChain = hit(m, ['job', 'keychain', 'application', 'jobchain', 'apply fast']);
  const isGranted = hit(m, ['grant', 'nonprofit', 'grantedsc', 'sc funding']);
  const isPasswordn = hit(m, ['password', 'credential', 'passwordn', 'vault', 'security']);
  const isStrategy = hit(m, ['strategy', 'strategypresentation', 'pdf', 'document']);

  if (isJobChain) return `**LinkedIn Post — JobChain**

---

Most job seekers spend 20 minutes per application retyping the same information.

I did the math on my own search. 25 applications × 20 minutes = 8+ hours of copy-paste.

So I built JobChain.

Fill out your profile once — personal info, work history, your professional story, pre-written answers to every recruiter question — and it lives in your browser. No account. No server. Nothing leaves your device.

Open any application. Copy. Paste. Submit.

10 minutes to set up. After that, 25 applications in a day is realistic.

Free, always: jobchain.hansturner.com

---

**Why this works:** Opens with relatable math, not a feature list. "I did the math" establishes Hans as the person who noticed the problem first. CTA is direct, no soft-pedaling.

*Alt text: JobChain preplist with sections filled in and a copy button highlighted.*`;

  if (isGranted) return `**LinkedIn Post — GrantedSC**

---

South Carolina has millions in available grant funding for small businesses and nonprofits every year.

Most of it goes unclaimed — not because organizations aren't eligible, but because the application process is a full-time job.

I built GrantedSC to change that.

It's an AI-guided grant application pipeline. Fill out your profile once — organization details, mission, financial situation, project goals — and it walks you through every relevant application with context and strategy.

Not a template. Not a chatbot. A structured process that handles the parts that slow most people down.

SC nonprofits and small businesses: grantedsc.com

---

**Why this works:** Leads with the market gap, not the product. "Full-time job" is the relatable pain. Product explained in one clear sentence. Low-friction CTA.

*Alt text: GrantedSC dashboard showing grant categories and a filled-in organization profile.*`;

  if (isPasswordn) return `**LinkedIn Post — Passwordn**

---

Agencies share passwords constantly.

Slack threads. Sticky notes. "Just use LastPass." "Wait, which password was that?"

The real problem: every shared credential is a liability you can't see.

I built Passwordn to fix the visibility problem — not the convenience problem.

Zero server storage. Everything lives in the browser. Shareable configurations so the whole team uses the same standard.

No account needed. Nothing leaves your device.

For agencies who can't afford a credential breach: passwordn.com

---

**Why this works:** Opens with the real pain (shared credentials), not the product. "Liability you can't see" is the reframe. Security angle lands harder than convenience.

*Alt text: Passwordn interface showing a generated credential with a copy button and share configuration options.*`;

  if (isStrategy) return `**LinkedIn Post — StrategyPresentation**

---

I stopped sending PDFs three years ago.

Not because PDFs are ugly. Because they're dead the moment you send them.

The client opens it once. Maybe. It doesn't update when the strategy does. And it never shows up in a search when they're trying to remember where you left off.

I built StrategyPresentation.com because strategy documents should stay alive.

Every deliverable Hans sends now lives on a private subdomain. Linkable. Updatable. Always current.

No version numbers. No "see attached." Just a URL.

---

**Why this works:** Contrarian hook (stopped sending PDFs). Explains the real problem with PDFs, not a feature list. Product is the obvious solution by the end.

*Alt text: A live strategy page on a branded subdomain with an updating timestamp visible.*`;

  // Default: WebsiteCreditScore
  return `**LinkedIn Post — WebsiteCreditScore**

---

Most websites have a credibility problem they don't know about.

I built WebsiteCreditScore.com to prove it.

Paste any URL. In 30 seconds, you get a letter grade across 10 credibility dimensions — from brand trust signals to technical authority markers.

The pattern is always the same: the sites losing leads aren't ugly. They're *untrustworthy* in ways the owner can't see from the inside.

The fix is usually 3–5 targeted changes. No redesign. No dev sprint.

If you want to know where your site is bleeding trust, run a free scan: WebsiteCreditScore.com

---

**Why this works:** Specific product, concrete mechanism, one clear CTA. "I built" establishes Hans as the maker. The insight (untrustworthy, not ugly) creates a reframe that earns a second read.

*Alt text: WebsiteCreditScore results showing a B+ grade with three specific recommendations highlighted.*`;
}

function twitterThread(msg: string) {
  const m = msg.toLowerCase();
  const isJobSeeker = hit(m, ['job', 'application', 'jobchain', 'keychain', 'apply']);

  if (isJobSeeker) return `**X Thread — JobChain (5 posts)**

---

**Post 1 (standalone):**
25 job applications in a day sounds impossible.

It's not. You're just doing it wrong. 🧵

---

**Post 2:**
Every application asks the same 15 things:
• Name, contact, location
• Work history + bullet points
• "Tell me about yourself"
• "Why are you leaving?"
• Skills, references, salary range

You answer these from scratch. Every. Single. Time.

---

**Post 3:**
I built JobChain to fix this.

Fill out your profile once — all 5 sections. Lives in your browser. Nothing leaves your device.

Open an application. Copy. Paste. Submit.

10 minutes of setup. Weeks of time saved.

---

**Post 4:**
The honest math:
• 25 applications × 20 min avg = 8+ hours
• With JobChain: 25 applications × 3 min = 75 min

That's a full workday back.

---

**Post 5:**
Free. No account. No server. No catch.

jobchain.hansturner.com

If you're in a job search right now — this is the most useful 10 minutes you'll spend this week.

---

**Why this works:** Post 1 stands alone. Posts 2–4 build the case with math. Post 5 is the clean CTA.`;

  return `**X Thread — AI Systems Operator (5 posts)**

---

**Post 1 (standalone):**
"AI engineer" is a job title.

"AI Systems Operator" is a business model. Here's the difference. 🧵

---

**Post 2:**
A job title means you work for someone else's AI roadmap.

An operating model means you go in, fix the specific thing, and leave.

No retainers. No scope creep. Measurable outcomes or nothing.

---

**Post 3:**
My model: Plug in → Audit → Implement → Train → Exit.

Most clients get 2–4 weeks of focused work. They leave with a system that runs without me.

That's the point.

---

**Post 4:**
The stack that makes it possible:
Next.js · Supabase · Vercel · Anthropic

I can build a production-grade AI application in days, not months.

Speed is the service.

---

**Post 5:**
I'm Hans Turner. I build distinctive web experiences for security-first, eco-forward, operator-grade platforms.

If that sounds like your situation: hansturner.com

---

**Why this works:** Contrarian framing, clear mechanism, specific stack, quiet CTA.`;
}

function launchCalendar() {
  return `**5-Day Launch-Week Content Calendar**

*Customize [PRODUCT] and [LAUNCH DATE]*

---

**Day 1 — Monday: The Problem**

*LinkedIn:* 2–3 sentences describing the pain [PRODUCT] solves. No product mention yet. End with "I've been thinking about this for a while."

*X:* The problem in one sharp sentence. Leave it open.

*Instagram:* Behind-the-scenes workspace or early build screenshot. Caption: "Something's almost ready."

---

**Day 2 — Tuesday: The Build**

*LinkedIn:* "I built something to solve this." 150-word origin story — why this, why now. End with a preview link.

*X:* Thread (3 posts): Problem → How I built it → One surprising thing I learned. Post 1 standalone.

---

**Day 3 — Wednesday: Launch Day**

*LinkedIn:* Full launch post — hook → what it does → who it's for → link. 200 words max. One screenshot.

*X:* "It's live." + link + one-sentence description. Pin it.

*Instagram:* Product screenshot or short demo. Caption: "Built this. It's free. Link in bio."

*GitHub:* Pin the repo. Update README with launch badge and quickstart.

---

**Day 4 — Thursday: Use Case**

*LinkedIn:* "Here's what it actually does" — specific example, concrete outcome. Real numbers if you have them.

*X:* Reply to anyone who engaged. Share one more use case.

---

**Day 5 — Friday: The Why**

*LinkedIn:* Philosophical post — why this kind of tool matters. 150–200 words, soft POV. No CTA.

*X:* One-liner: the most important thing you learned building this.

---

**Nora's rule:** Draft → Hans reviews → Hans publishes. Nothing auto-publishes.`;
}

function dmReply() {
  return `**Warm DM Reply Templates**

---

**When someone compliments the portfolio:**

> Thanks — [specific thing they mentioned] was the part I spent the most time on.
>
> Quick question: what made you reach out now? Are you working on something similar, or just exploring?

---

**When someone asks about hiring/working together:**

> Appreciate you reaching out.
>
> Before I can give you a useful answer — what's the specific situation you're trying to solve? I work best when I know the actual problem, not just the general need.
>
> What's the URL or the thing you're building?

---

**When someone asks about a specific product:**

> [Product] gets that question a lot.
>
> Honest answer: it works best when [specific use case]. What's your setup — are you [qualifying question]?

---

**Rule:** 2–3 genuine questions before any pitch. The goal of the first DM is to earn the right to the second one.`;
}

function readmePolish(msg: string) {
  return `**GitHub README Polish**

*Paste your existing README and I'll restructure it. Here's the template:*

---

\`\`\`markdown
# [Project Name]

[One sentence — what it does and who it's for.]

## What it does

- [Action verb] [what] in [where] — [why that matters]
- [Action verb] [thing] — [one-line benefit]
- [Action verb] [thing] — [one-line benefit]

## Quick start

\`\`\`bash
npm install
npm run dev
# Open http://localhost:3000
\`\`\`

## Stack

[Technology] · [Technology] · [Technology]

## Why this exists

[2–3 sentences: the problem, the decision to build, the tradeoff you made.]

## License

MIT
\`\`\`

---

**Nora's README rules:**
- Lead with what it does, not what it's built with
- Every feature bullet starts with an action verb
- Quick start in under 5 lines
- No "This project" — use the actual name
- Delete any sentence starting with "I made this because..."

Paste your current README and I'll apply these directly.`;
}

function productDetail(p: typeof HANS.products[0], slug: Slug) {
  if (slug === 'eli') {
    return `**${p.name}**

${p.detail}

**Biz-dev angle:** ${p.bizAngle}

**URL:** ${p.url}

Want me to write a prospect brief positioning this as the solution?`;
  }
  return `**${p.name}**

${p.detail}

**Content angle:** ${p.contentAngle}

**URL:** ${p.url}

Want a LinkedIn post or X thread about this?`;
}

function fallback(slug: Slug, msg: string) {
  const snippet = msg.length > 60 ? msg.slice(0, 57) + '…' : msg;
  if (slug === 'eli') return `I'm Eli — biz-dev for Hans Turner. My lane is prospects, credibility scans, and strategy calls.

On *"${snippet}"* — I don't have a specific answer, but I can tell you how it connects to the pipeline if you give me more context.

**What I can do right now:**
- Prospect brief for a specific company
- 30-minute strategy call agenda
- 3-touch cold outreach sequence
- Handoff note before Hans gets on a call
- Discovery question bank (15 ranked questions)

What's the actual situation?`;

  return `I'm Nora — content and social for Hans Turner. My lane is publish-ready content across LinkedIn, X, Instagram, and GitHub.

On *"${snippet}"* — happy to help frame it for content if you give me more context.

**What I can create right now:**
- LinkedIn post (any Hans portfolio product)
- X thread (5 posts, first standalone)
- 5-day launch-week calendar
- Warm DM reply template
- GitHub README polish

What do you need?`;
}

// ── Main export ─────────────────────────────────────────────────────────────

export function getLocalResponse(slug: Slug, userMessage: string): string {
  const msg = userMessage.toLowerCase().trim();

  // Greeting (short messages only)
  if (userMessage.length < 50 && hit(msg, ['hello', 'hi', 'hey', 'sup', 'morning', 'who are you', 'what can you', 'help me', 'start'])) {
    return greeting(slug);
  }

  // About Hans
  if (hit(msg, ['hans', 'about', 'who is', 'background', 'experience', 'operator', 'bio', 'positioning', 'tell me about']) >= 2 ||
      (hit(msg, ['hans']) >= 1 && hit(msg, ['about', 'who', 'what', 'does', 'is', 'describe', 'background']) >= 1)) {
    return aboutHans(slug);
  }

  // Specific product
  const product = productMatch(msg);
  if (product) return productDetail(product, slug);

  // All products overview
  if (hit(msg, ['portfolio', 'products', 'everything', 'list', 'what does he build', 'what has he built', 'all']) >= 1) {
    return allProducts(slug);
  }

  // Tech stack
  if (hit(msg, ['stack', 'tech', 'technology', 'tools', 'built with', 'framework', 'next', 'supabase', 'vercel', 'anthropic'])) {
    return techStack(slug);
  }

  // Contact
  if (hit(msg, ['contact', 'email', 'reach', 'hire', 'how to reach', 'booking', 'schedule'])) {
    return contactInfo(slug);
  }

  // Looking for / jobs / opportunities
  if (hit(msg, ['looking for', 'open to', 'available', 'roles', 'opportunities', 'remote', 'hire hans', 'job hunt'])) {
    return `**What Hans is looking for:**\n\n${HANS.lookingFor}\n\n**Contact:** ${HANS.email} · ${HANS.site}`;
  }

  // ── Eli-specific ───────────────────────────────────────────────────────
  if (slug === 'eli') {
    if (hit(msg, ['brief', 'prospect', 'client', 'lead', 'company'])) return prospectBrief(userMessage);
    if (hit(msg, ['strategy', 'agenda', 'call', 'meeting', '30 min', '30-min', 'first call'])) return strategyCallAgenda();
    if (hit(msg, ['outreach', 'cold', 'sequence', '3-touch', 'three touch', 'touch', 'email sequence'])) return coldOutreach();
    if (hit(msg, ['handoff', 'prep', 'before the call', 'before hans', 'read before'])) return handoffNote();
    if (hit(msg, ['question', 'discover', 'qualify', 'qualifying', 'bank', 'discovery'])) return discoveryQuestions();
    if (hit(msg, ['linkedin', 'post', 'thread', 'tweet', 'instagram', 'content', 'caption', 'write a post', 'write post', 'nora'])) {
      return `Content is Nora's lane, not mine.\n\nSwitch to **[Nora Fox](/agents/nora)** and she'll have a publish-ready post in under a minute.\n\nNeed something biz-dev instead — a brief, talk track, or outreach sequence?`;
    }
    return fallback('eli', userMessage);
  }

  // ── Nora-specific ──────────────────────────────────────────────────────
  if (slug === 'nora') {
    if (hit(msg, ['linkedin', 'post', 'article', 'long-form', 'write a post', 'write post', 'case study post'])) return linkedinPost(userMessage);
    if (hit(msg, ['twitter', 'x thread', 'thread', 'tweets', 'x post', 'tweet'])) return twitterThread(userMessage);
    if (hit(msg, ['calendar', 'launch', 'week', 'schedule', 'content plan', '5 day', '5-day'])) return launchCalendar();
    if (hit(msg, ['dm', 'message', 'reply', 'warm dm', 'respond to', 'outreach reply'])) return dmReply();
    if (hit(msg, ['readme', 'github', 'repo', 'repository', 'polish', 'rewrite readme'])) return readmePolish(userMessage);
    if (hit(msg, ['brief', 'prospect', 'outreach', 'cold', 'qualify', 'handoff', 'strategy call', 'eli'])) {
      return `That's Eli's territory — biz-dev and prospect work.\n\nSwitch to **[Eli North](/agents/eli)** and he'll give you a sharp brief or talk track in seconds.\n\nNeed content help instead?`;
    }
    return fallback('nora', userMessage);
  }

  return fallback(slug, userMessage);
}

// Simulated token counts for local responses (rough: 4 chars ≈ 1 token)
export function simulateUsage(inputMsg: string, outputMsg: string) {
  return {
    input_tokens: Math.ceil(inputMsg.length / 4),
    output_tokens: Math.ceil(outputMsg.length / 4),
    cost: 0,
    isLocal: true,
  };
}

import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Focus — JobChain",
  description:
    "What Hans Turner is working on, learning, and looking for right now. AI engineering, web development, automation.",
};

const focusAreas = [
  { label: "AI Engineering", detail: "Agents, LLM apps, prompt systems, and automation workflows" },
  { label: "Web Development", detail: "Modern stacks, SaaS tools, product-level thinking" },
  { label: "Design", detail: "UX clarity, product simplicity, interaction craft" },
  { label: "Automation", detail: "No-code + code hybrid workflows that remove repetitive work" },
];

const activeProjects = [
  { name: "JobChain", url: "https://jobchain.hansturner.com", desc: "Local-only job application keychain — fill once, paste everywhere. No account, no server." },
  { name: "GrantedSC", url: "https://grantedsc.com", desc: "Grant application assistant for South Carolina small businesses. AI-guided preplist + strategy." },
  { name: "Passwordn", url: "https://passwordn.io", desc: "Password generator with shareable configurations. Zero data, zero friction." },
];

const skills = [
  "Prompt engineering & LLM orchestration",
  "Next.js / React (App Router)",
  "TypeScript — production-grade",
  "Tailwind CSS v4 + design systems",
  "AI agent patterns (tool use, memory, multi-step)",
  "Automation pipelines (n8n, Zapier, custom)",
  "Rapid prototyping → deployed product in days",
];

const roles = [
  { title: "AI / Automation Engineer", note: "Agents, workflows, LLM integration" },
  { title: "Full-Stack Web Engineer", note: "Product-minded, frontend-heavy" },
  { title: "Design + Engineering Hybrid", note: "Strong opinions on UX, can ship both layers" },
  { title: "Founding Engineer", note: "Early-stage startups moving fast" },
];

const feeds = [
  { n: "1", category: "Jobs", name: "Remotive", why: "Remote-first jobs across dev, design, AI", url: "https://remotive.com/feed" },
  { n: "2", category: "Jobs", name: "Y Combinator Jobs", why: "Early-stage startups — best for AI + automation roles", url: "https://www.ycombinator.com/jobs/rss" },
  { n: "3", category: "AI News", name: "OpenAI News", why: "Direct updates from the frontier of AI", url: "https://openai.com/news/rss.xml" },
  { n: "4", category: "AI Engineering", name: "Hugging Face Blog", why: "Practical AI tools, models, and workflows", url: "https://huggingface.co/blog/feed.xml" },
  { n: "5", category: "AI Strategy", name: "Import AI", why: "Strategic AI thinking + trends from Jack Clark", url: "https://jack-clark.net/feed/" },
  { n: "6", category: "Design", name: "Smashing Magazine", why: "Deep web design, UX, and frontend patterns", url: "https://www.smashingmagazine.com/feed/" },
  { n: "7", category: "Engineering", name: "ByteByteGo", why: "System design + architecture thinking", url: "https://blog.bytebytego.com/feed" },
  { n: "8", category: "Trends", name: "TechCrunch", why: "Startup + funding + product launches", url: "https://techcrunch.com/feed/" },
  { n: "9", category: "Inspiration", name: "Product Hunt", why: "New tools, indie builders, portfolio ideas", url: "https://www.producthunt.com/feed" },
  { n: "10", category: "Markets", name: "WSJ Markets", why: "Macro context — which industries are growing", url: "https://feeds.a.dj.com/rss/RSSMarketsMain.xml" },
];

const categoryColor: Record<string, string> = {
  Jobs: "oklch(0.78 0.13 70)",
  "AI News": "oklch(0.72 0.15 150)",
  "AI Engineering": "oklch(0.72 0.15 150)",
  "AI Strategy": "oklch(0.72 0.15 150)",
  Design: "oklch(0.75 0.12 300)",
  Engineering: "oklch(0.75 0.10 220)",
  Trends: "oklch(0.78 0.10 40)",
  Inspiration: "oklch(0.75 0.10 320)",
  Markets: "oklch(0.75 0.08 200)",
};

export default function FocusPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="overflow-x-hidden">
        {/* Hero */}
        <section className="relative overflow-hidden min-h-[50vh] flex items-end pb-16">
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.18)" }}
            >
              <source src="/exosphere_remix_scene.webm" type="video/webm" />
            </video>
            <div className="absolute inset-0" style={{ background: "var(--gradient-spot)", opacity: 0.4 }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--background) 0%, transparent 60%)" }} />
          </div>

          <div className="relative mx-auto max-w-4xl px-6 w-full pt-36">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "var(--muted-foreground)" }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
              Updated May 2025
            </div>
            <h1 className="font-display text-5xl md:text-7xl text-balance leading-[0.95] max-w-2xl mb-6">
              What I&apos;m{" "}
              <span style={{ color: "var(--accent)" }}>focused on.</span>
            </h1>
            <p className="text-lg sm:text-xl max-w-xl text-pretty leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              A live snapshot of what I&apos;m building, learning, and looking for — so you
              always know where my head is and what I can bring to a team right now.
            </p>
          </div>
        </section>

        {/* Primary Focus */}
        <section className="mx-auto max-w-4xl px-6 py-16 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="text-xs uppercase tracking-[0.2em] mb-8" style={{ color: "var(--muted-foreground)" }}>Primary Focus (Now)</div>
          <div className="grid sm:grid-cols-2 gap-4">
            {focusAreas.map((area) => (
              <div
                key={area.label}
                className="rounded-2xl border p-5 shadow-card flex gap-4"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                <div>
                  <div className="font-medium text-sm mb-1">{area.label}</div>
                  <div className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{area.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Active Projects */}
        <section className="mx-auto max-w-4xl px-6 py-16 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="text-xs uppercase tracking-[0.2em] mb-8" style={{ color: "var(--muted-foreground)" }}>Active Projects</div>
          <h2 className="font-display text-3xl sm:text-4xl text-balance mb-8 max-w-xl">
            Learning by building real things.
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {activeProjects.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border p-5 shadow-card flex flex-col gap-3 hover:border-[var(--accent-dim)] transition-colors"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="font-display text-lg">{p.name}</div>
                  <ExternalLink className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{p.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="border-t px-6 py-16" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="mx-auto max-w-4xl">
            <div className="text-xs uppercase tracking-[0.2em] mb-8" style={{ color: "var(--muted-foreground)" }}>Learning &amp; Skill Development</div>
            <h2 className="font-display text-3xl sm:text-4xl text-balance mb-8 max-w-xl">
              Actively improving, right now.
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border px-4 py-1.5 text-xs font-medium"
                  style={{ background: "var(--surface-elevated)", borderColor: "var(--border)", color: "var(--foreground)" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Opportunities */}
        <section className="mx-auto max-w-4xl px-6 py-16 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="text-xs uppercase tracking-[0.2em] mb-8" style={{ color: "var(--muted-foreground)" }}>Opportunities I&apos;m Looking For</div>
          <h2 className="font-display text-3xl sm:text-4xl text-balance mb-8 max-w-xl">
            Remote roles where I can move fast and own outcomes.
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {roles.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border p-5 shadow-card"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div className="font-medium text-sm mb-1">{r.title}</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{r.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section className="border-t px-6 py-16" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="mx-auto max-w-4xl">
            <div className="text-xs uppercase tracking-[0.2em] mb-8" style={{ color: "var(--muted-foreground)" }}>Philosophy</div>
            <blockquote className="font-display text-2xl sm:text-3xl text-balance max-w-2xl leading-snug mb-6">
              &ldquo;Build over consume. Leverage over effort.
              Ship fast, learn faster.&rdquo;
            </blockquote>
            <p className="text-sm max-w-xl leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              I optimize for leverage — using AI, automation, and modern tooling to accomplish in
              hours what used to take weeks. I prefer real-world impact over theoretical depth, and
              I believe the fastest way to learn anything is to build something real with it.
              Human oversight stays in the loop. Speed and care aren&apos;t opposites.
            </p>
          </div>
        </section>

        {/* RSS Feed Stack */}
        <section className="mx-auto max-w-4xl px-6 py-16 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "var(--muted-foreground)" }}>Signal Stack</div>
          <h2 className="font-display text-3xl sm:text-4xl text-balance mb-3 max-w-2xl">
            10 RSS feeds. Zero noise.
          </h2>
          <p className="text-sm mb-10 max-w-xl leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            A curated feed stack covering jobs, AI engineering, design, trends, and market awareness —
            30–45 min/day gives full situational awareness on where hiring is heading.
          </p>

          <div className="grid gap-3">
            {feeds.map((feed) => (
              <a
                key={feed.n}
                href={feed.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border px-5 py-4 shadow-card flex items-center gap-4 hover:border-[var(--accent-dim)] transition-colors"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full text-xs font-medium flex items-center justify-center"
                  style={{ background: "var(--surface-elevated)", color: "var(--accent)", border: "1px solid var(--border)" }}
                >
                  {feed.n}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-medium text-sm">{feed.name}</span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "var(--surface-elevated)", color: categoryColor[feed.category] ?? "var(--accent)", border: "1px solid var(--border)" }}
                    >
                      {feed.category}
                    </span>
                  </div>
                  <p className="text-xs truncate" style={{ color: "var(--muted-foreground)" }}>{feed.why}</p>
                </div>
                <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 opacity-30 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>

          <div
            className="mt-6 rounded-2xl border p-5 shadow-card"
            style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}
          >
            <div className="text-xs font-medium mb-1" style={{ color: "var(--accent)" }}>Bonus swap</div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Replace any one feed with{" "}
              <a href="https://tldr.tech/ai/rss" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white transition-colors">
                TLDR AI
              </a>{" "}
              for a compressed daily digest of AI news — great if you want breadth over depth.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

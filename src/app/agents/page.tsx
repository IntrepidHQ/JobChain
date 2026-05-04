import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AGENTS } from "@/lib/agents";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Agent Hub — JobChain",
  description: "Manage and chat with Hans Turner's AI agents: Eli North (Biz Dev) and Nora Fox (Content).",
};

export default function AgentsPage() {
  const agents = Object.values(AGENTS);

  return (
    <>
      <Navbar />
      <main id="main" className="overflow-x-hidden">

        {/* Hero */}
        <section className="relative overflow-hidden min-h-[45vh] flex items-end pb-16">
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
            <video autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.15)" }}>
              <source src="/exosphere_remix_scene.webm" type="video/webm" />
            </video>
            <div className="absolute inset-0" style={{ background: "var(--gradient-spot)", opacity: 0.35 }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--background) 0%, transparent 60%)" }} />
          </div>

          <div className="relative mx-auto max-w-4xl px-6 w-full pt-32">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "var(--muted-foreground)" }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
              Private — Hans Only
            </div>
            <h1 className="font-display text-5xl md:text-7xl text-balance leading-[0.95] max-w-2xl mb-4">
              Agent{" "}
              <span style={{ color: "var(--accent)" }}>Hub.</span>
            </h1>
            <p className="text-base sm:text-lg max-w-lg text-pretty leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Your dedicated team. Each agent knows your portfolio, your voice, and their job.
              Click one to start a conversation.
            </p>
          </div>
        </section>

        {/* Agent cards */}
        <section className="mx-auto max-w-4xl px-6 py-16 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="grid sm:grid-cols-2 gap-6">
            {agents.map(agent => (
              <Link
                key={agent.slug}
                href={`/agents/${agent.slug}`}
                className="group rounded-3xl border overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                {/* Photo */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={`/agents/${agent.slug}.jpg`}
                    alt={agent.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--surface) 0%, transparent 50%)" }} />
                  {/* Role badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider"
                      style={{ background: "oklch(0.13 0.005 260 / 0.7)", color: agent.accentText, border: `1px solid ${agent.accentText}40`, backdropFilter: "blur(8px)" }}
                    >
                      {agent.role}
                    </span>
                  </div>
                  {/* Online dot */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-2.5 py-1"
                    style={{ background: "oklch(0.13 0.005 260 / 0.7)", backdropFilter: "blur(8px)", border: "1px solid var(--border)" }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: "oklch(0.72 0.15 150)" }} />
                    <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>Online</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-2xl leading-tight mb-1">{agent.name}</h2>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                        {agent.description}
                      </p>
                    </div>
                    <div
                      className="flex-shrink-0 h-9 w-9 rounded-full border flex items-center justify-center group-hover:border-[var(--accent)] transition-colors"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" style={{ color: "var(--muted-foreground)" }} />
                    </div>
                  </div>

                  {/* Tasks preview */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {agent.tasks.slice(0, 3).map(t => (
                      <span key={t.label}
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{ background: "var(--surface-elevated)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>
                        {t.label}
                      </span>
                    ))}
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ color: "var(--muted-foreground)" }}>
                      +{agent.tasks.length - 3} more
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Cost note */}
          <div
            className="mt-8 rounded-2xl border p-5 flex gap-3"
            style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}
          >
            <div className="h-1.5 w-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "var(--accent)" }} />
            <div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                Powered by <strong style={{ color: "var(--foreground)" }}>Claude Haiku 4.5</strong> — the most affordable
                Anthropic model ($0.80/1M input · $4/1M output). A typical conversation costs under{" "}
                <strong style={{ color: "var(--foreground)" }}>$0.001</strong>. You have a{" "}
                <strong style={{ color: "var(--accent)" }}>$5 total budget</strong>, tracked in your browser.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

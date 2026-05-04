import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* Hero — ambient video background */}
        <section className="relative overflow-hidden min-h-[90vh] flex items-end pb-20">
          {/* Video */}
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.28)" }}
            >
              <source src="/exosphere_remix_scene.webm" type="video/webm" />
            </video>
            {/* Gradient overlays */}
            <div className="absolute inset-0" style={{ background: "var(--gradient-spot)", opacity: 0.6 }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--background) 0%, transparent 60%)" }} />
          </div>

          <div className="relative mx-auto max-w-4xl px-6 w-full">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "var(--muted-foreground)" }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
              Free — No Account Required
            </div>
            <h1 className="font-display text-6xl md:text-8xl text-balance leading-[0.95] max-w-2xl mb-6">
              Fill once.{" "}
              <span style={{ color: "var(--accent)" }}>Apply fast.</span>
            </h1>
            <p className="text-lg sm:text-xl max-w-xl mb-10 text-pretty leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              JobChain is a free, local-only keychain for job applications. Build your profile once —
              personal info, work history, pre-written answers — then copy-paste your way through
              25+ applications in a day.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/preplist"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ background: "var(--foreground)", color: "var(--background)" }}
              >
                Build my keychain <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm hover:bg-surface transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
              >
                How it works
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14">
              {[
                { stat: "100%", label: "Local — stays in your browser" },
                { stat: "~10 min", label: "Time to fill the basics" },
                { stat: "25+", label: "Applications per day, realistically" },
                { stat: "0", label: "Accounts, signups, or fees" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border p-5 shadow-card"
                  style={{ background: "var(--surface)", borderColor: "var(--border)" }}
                >
                  <div className="font-display text-3xl mb-1">{item.stat}</div>
                  <div className="text-xs leading-snug" style={{ color: "var(--muted-foreground)" }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mx-auto max-w-4xl px-6 py-24 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] mb-8" style={{ color: "var(--muted-foreground)" }}>
            How it works
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "1", title: "Build your profile", body: "Fill in your details, work history, skills, and pre-written answers. Takes about 10 minutes." },
              { n: "2", title: "Auto-saves locally", body: "Every keystroke saves to your browser. Nothing leaves your device. Reload anytime." },
              { n: "3", title: "Export your keychain", body: "Download as JSON. Back it up, or import it on another device anytime." },
              { n: "4", title: "Apply at speed", body: "Open an application. Copy-paste from your keychain. Done. No re-typing anything." },
            ].map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border p-6 shadow-card"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium mb-4"
                  style={{ background: "var(--surface-elevated)", color: "var(--accent)", border: "1px solid var(--border)" }}
                >
                  {step.n}
                </div>
                <div className="font-display text-xl mb-2">{step.title}</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's in the keychain */}
        <section className="mx-auto max-w-4xl px-6 py-16 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] mb-8" style={{ color: "var(--muted-foreground)" }}>
            The keychain
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-balance mb-12 max-w-xl">
            Everything an application asks for, stored once.
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Quick Profile", body: "Name, contact, location, LinkedIn, portfolio, GitHub, salary range, work auth, remote preference." },
              { title: "Professional Story", body: "Headline, short bio, elevator pitch — the copy that goes in every cover letter and intro field." },
              { title: "Work History", body: "Top two roles with key bullet points, formatted and ready to paste into experience sections." },
              { title: "Skills & Stack", body: "Hard skills, tools, soft skills, education, certs — with role targeting to toggle emphasis." },
              { title: "Pre-Written Answers", body: '"Tell me about yourself," "Why are you leaving?" "Greatest strength?" — all ready to paste.' },
              { title: "References & Templates", body: "References ready to share, and a cover letter template with [COMPANY] placeholders." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border p-5 shadow-card flex gap-4"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <span className="mt-1.5 h-1 w-1 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                <div>
                  <div className="font-medium text-sm mb-1">{item.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-6 pb-32">
          <div
            className="relative overflow-hidden rounded-2xl border p-10 sm:p-14 shadow-glow"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div
              aria-hidden
              className="absolute -top-20 right-0 h-64 w-64 rounded-full opacity-10 blur-3xl"
              style={{ background: "var(--accent)" }}
            />
            <div className="relative">
              <div className="font-display text-3xl sm:text-4xl text-balance mb-4 max-w-lg">
                Stop copy-pasting from a Google Doc.
              </div>
              <p className="text-sm mb-8 max-w-md" style={{ color: "var(--muted-foreground)" }}>
                Ten minutes of setup. Dozens of applications, faster. Free forever.
              </p>
              <Link
                href="/preplist"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ background: "var(--foreground)", color: "var(--background)" }}
              >
                Start your keychain <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-[4.5rem]">
        {/* Hero */}
        <section
          className="relative py-20 sm:py-32 px-5 sm:px-8 border-b overflow-hidden"
          style={{ borderColor: "var(--card-border)" }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div
              className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full opacity-[0.06]"
              style={{ background: "radial-gradient(circle, var(--blue) 0%, transparent 65%)" }}
            />
          </div>
          <div className="max-w-7xl mx-auto relative">
            <div className="max-w-3xl">
              <div
                className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border mb-6 text-[11px] eyebrow"
                style={{
                  borderColor: "var(--card-border-strong)",
                  background: "var(--card)",
                  color: "var(--muted-strong)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--blue)" }} aria-hidden />
                Free Tool — No Account Required
              </div>

              <h1
                className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.0] tracking-tight mb-6"
                style={{ color: "var(--foreground)" }}
              >
                Fill once.{" "}
                <span style={{ color: "var(--blue)" }}>Apply fast.</span>
              </h1>

              <p className="text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl font-light" style={{ color: "var(--muted-strong)" }}>
                JobChain is a free, local-only keychain for job applications. Build your profile once —
                personal info, work history, pre-written answers, skills — then copy-paste your way
                through 25+ applications in a day. No account. No cloud. No friction.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/preplist"
                  className="inline-flex items-center px-8 h-12 rounded-full text-base font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: "var(--blue)" }}
                >
                  Build my keychain →
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center px-8 h-12 rounded-full text-base font-semibold border transition-colors hover:opacity-80"
                  style={{ borderColor: "var(--card-border-strong)", color: "var(--muted-strong)" }}
                >
                  How it works
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 max-w-3xl">
              {[
                { stat: "100%", label: "Local — stays in your browser" },
                { stat: "~10 min", label: "Time to complete the basics" },
                { stat: "25+", label: "Applications per day, realistically" },
                { stat: "0", label: "Accounts, signups, or fees" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl border"
                  style={{ background: "var(--card)", borderColor: "var(--card-border)" }}
                >
                  <div className="text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>
                    {item.stat}
                  </div>
                  <div className="text-xs leading-snug font-light" style={{ color: "var(--muted-strong)" }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="py-16 sm:py-24 px-5 sm:px-8 border-b"
          style={{ background: "var(--background-2)", borderColor: "var(--card-border)" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="eyebrow mb-3" style={{ color: "var(--blue)" }}>How it works</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
                One keychain. Every application.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { n: "1", title: "Build your profile", body: "Fill in your personal info, work history, skills, and pre-written answers to common questions — takes about 10 minutes." },
                { n: "2", title: "Auto-saves locally", body: "Every keystroke saves to your browser's local storage. Nothing leaves your device. Reload anytime and your data is still there." },
                { n: "3", title: "Export your keychain", body: "Download your keychain as a JSON file. Back it up, share it with a recruiter, or import it on another device." },
                { n: "4", title: "Apply at speed", body: "Open an application. Copy-paste from your keychain. Done. No re-typing the same info for the hundredth time." },
              ].map((step) => (
                <div
                  key={step.n}
                  className="p-6 rounded-xl border"
                  style={{ background: "var(--card)", borderColor: "var(--card-border)" }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white mb-4"
                    style={{ background: "var(--blue)" }}
                  >
                    {step.n}
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed font-light" style={{ color: "var(--muted-strong)" }}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's in the keychain */}
        <section className="py-16 sm:py-24 px-5 sm:px-8 border-b" style={{ borderColor: "var(--card-border)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="eyebrow mb-3" style={{ color: "var(--blue)" }}>The keychain</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
                Everything an application asks for, stored once.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
              {[
                { title: "Quick Profile", body: "Name, contact info, location, LinkedIn, portfolio, GitHub, salary range, work auth, remote preferences." },
                { title: "Professional Story", body: "Headline, short bio, elevator pitch — the copy that goes in every cover letter and \"tell me about yourself\" field." },
                { title: "Work History Highlights", body: "Your top two roles with key bullet points. Formatted and ready to paste into experience fields." },
                { title: "Skills & Stack", body: "Hard skills, tools, soft skills, education, certifications — with role targeting to toggle what you emphasize." },
                { title: "Pre-Written Answers", body: "\"Tell me about yourself,\" \"Why are you leaving?\" \"Greatest strength?\" — all pre-written, ready to paste." },
                { title: "References & Templates", body: "References ready to share, and a cover letter template with [COMPANY] placeholders." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-xl border flex gap-4"
                  style={{ background: "var(--card)", borderColor: "var(--card-border)" }}
                >
                  <div
                    className="mt-0.5 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: "var(--blue)", marginTop: "0.45rem" }}
                  />
                  <div>
                    <div className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>{item.title}</div>
                    <div className="text-xs leading-relaxed font-light" style={{ color: "var(--muted-strong)" }}>{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24 px-5 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <div
              className="max-w-3xl mx-auto rounded-2xl p-10 sm:p-14 text-center border"
              style={{ background: "var(--ink)", borderColor: "transparent" }}
            >
              <p className="eyebrow mb-3" style={{ color: "var(--blue-light)" }}>Free forever</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Stop copy-pasting from a Google Doc.
              </h2>
              <p className="text-base mb-8 font-light max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
                Build a keychain that actually works. Ten minutes of setup. Dozens of applications, faster.
              </p>
              <Link
                href="/preplist"
                className="inline-flex items-center px-8 h-12 rounded-full text-base font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--blue)" }}
              >
                Start your keychain →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

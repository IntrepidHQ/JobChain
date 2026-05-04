import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PreplistForm } from "@/components/preplist/PreplistForm";

export const metadata: Metadata = {
  title: "Job Application Preplist — JobChain",
  description:
    "Build your reusable job application keychain in minutes. Free, local-only, no account required. Fill once — paste into every application.",
};

export default function PreplistPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-[4.5rem] overflow-x-hidden">
        {/* Hero */}
        <section
          className="relative py-16 sm:py-24 px-5 sm:px-8 border-b overflow-hidden"
          style={{ borderColor: "var(--card-border)" }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div
              className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full opacity-[0.06]"
              style={{ background: "radial-gradient(circle, var(--blue) 0%, transparent 65%)" }}
            />
          </div>
          <div className="max-w-7xl mx-auto relative">
            <div className="max-w-3xl">
              <div
                className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border mb-6 text-[11px] eyebrow"
                style={{ borderColor: "var(--card-border-strong)", background: "var(--card)", color: "var(--muted-strong)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--blue)" }} aria-hidden />
                Free — No Account Required
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.0] tracking-tight mb-6" style={{ color: "var(--foreground)" }}>
                Job Application{" "}
                <span style={{ color: "var(--blue)" }}>Preplist.</span>
              </h1>

              <p className="text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl font-light" style={{ color: "var(--muted-strong)" }}>
                Stop retyping the same answers on every application. Fill this out once and build your
                reusable keychain — personal info, work history, skills, and pre-written answers to
                every question recruiters ask.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-2">
                {[
                  { stat: "100%", label: "Local — never leaves your browser" },
                  { stat: "~10 min", label: "Time to fill the key sections" },
                  { stat: "5 sections", label: "Covering every application field" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-xl border"
                    style={{ background: "var(--card)", borderColor: "var(--card-border)" }}
                  >
                    <div className="text-2xl font-bold mb-1" style={{ color: "var(--foreground)" }}>{item.stat}</div>
                    <div className="text-xs font-light leading-snug" style={{ color: "var(--muted-strong)" }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works banner */}
        <div className="border-b px-4 sm:px-8 py-5" style={{ background: "var(--background-2)", borderColor: "var(--card-border)" }}>
          <div className="max-w-7xl mx-auto">
            <ol className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:divide-x" style={{ "--tw-divide-opacity": 1 } as React.CSSProperties}>
              {[
                { n: "1", text: "Fill in your details below — takes about 10 minutes for the essentials." },
                { n: "2", text: "Everything auto-saves in your browser. Nothing leaves your device." },
                { n: "3", text: "Export as JSON to back it up or use on another device." },
                { n: "4", text: "Open any application. Copy-paste from your keychain. Submit. Repeat." },
              ].map((step) => (
                <div key={step.n} className="flex items-start gap-3 sm:px-6 first:pl-0 last:pr-0">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white"
                    style={{ background: "var(--blue)" }}
                  >
                    {step.n}
                  </span>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "var(--muted-strong)" }}>{step.text}</p>
                </div>
              ))}
            </ol>
          </div>
        </div>

        {/* Form */}
        <div className="overflow-x-hidden">
          <PreplistForm />
        </div>

        {/* FAQ */}
        <section
          className="py-12 sm:py-16 px-5 sm:px-8 border-t"
          style={{ background: "var(--background-2)", borderColor: "var(--card-border)" }}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8" style={{ color: "var(--foreground)" }}>
              Questions about the Preplist
            </h2>
            <div className="grid sm:grid-cols-2 gap-5 max-w-4xl">
              {[
                {
                  q: "Is my data actually private?",
                  a: "Yes. Everything you enter is stored in your browser's localStorage only. It never touches any server. Export the JSON to back it up or move it.",
                },
                {
                  q: "What if I clear my browser data?",
                  a: "Your keychain would be lost. Export it as a JSON file before clearing browser storage — you can re-import it any time.",
                },
                {
                  q: "Can I use this on multiple devices?",
                  a: "Export your keychain as JSON on one device, then import it on another. No sync — fully manual and intentional.",
                },
                {
                  q: "Is this the whole product?",
                  a: "The Preplist is free forever. It's a standalone tool for fast job applications — no upsell, no subscription, no hidden anything.",
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="p-5 sm:p-6 rounded-xl border"
                  style={{ background: "var(--card)", borderColor: "var(--card-border)" }}
                >
                  <h3 className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>{item.q}</h3>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "var(--muted-strong)" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

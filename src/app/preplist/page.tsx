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
      <main id="main" className="overflow-x-hidden">
        {/* Hero */}
        <section className="relative overflow-hidden min-h-[60vh] flex items-end pb-16">
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.22)" }}
            >
              <source src="/exosphere_remix_scene.webm" type="video/webm" />
            </video>
            <div className="absolute inset-0" style={{ background: "var(--gradient-spot)", opacity: 0.5 }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--background) 0%, transparent 60%)" }} />
          </div>

          <div className="relative mx-auto max-w-4xl px-6 w-full pt-36">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "var(--muted-foreground)" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
              Free — No Account Required
            </div>
            <h1 className="font-display text-5xl md:text-7xl text-balance leading-[0.95] max-w-2xl mb-6">
              Job Application{" "}
              <span style={{ color: "var(--accent)" }}>Preplist.</span>
            </h1>
            <p className="text-lg sm:text-xl max-w-xl mb-8 text-pretty leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              Stop retyping the same answers on every application. Fill this out once — personal info,
              work history, skills, and pre-written answers to every question recruiters ask.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl">
              {[
                { stat: "100%", label: "Local — never leaves your browser" },
                { stat: "~10 min", label: "Time to fill the key sections" },
                { stat: "5 sections", label: "Covering every application field" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border p-4 shadow-card"
                  style={{ background: "var(--surface)", borderColor: "var(--border)" }}
                >
                  <div className="font-display text-2xl mb-1">{item.stat}</div>
                  <div className="text-xs leading-snug" style={{ color: "var(--muted-foreground)" }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works banner */}
        <div className="border-y px-4 sm:px-8 py-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="max-w-7xl mx-auto">
            <ol className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:divide-x" style={{ "--tw-divide-color": "var(--border)" } as React.CSSProperties}>
              {[
                { n: "1", text: "Fill in your details below — takes about 10 minutes for the essentials." },
                { n: "2", text: "Everything auto-saves in your browser. Nothing leaves your device." },
                { n: "3", text: "Export as JSON to back it up or use on another device." },
                { n: "4", text: "Open any application. Copy-paste from your keychain. Submit. Repeat." },
              ].map((step) => (
                <div key={step.n} className="flex items-start gap-3 sm:px-6 first:pl-0 last:pr-0">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full text-xs font-medium flex items-center justify-center"
                    style={{ background: "var(--surface-elevated)", color: "var(--accent)", border: "1px solid var(--border)" }}
                  >
                    {step.n}
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{step.text}</p>
                </div>
              ))}
            </ol>
          </div>
        </div>

        {/* Form */}
        <PreplistForm />

        {/* FAQ */}
        <section className="border-t px-5 sm:px-8 py-16" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl mb-8">Questions about the Preplist</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { q: "Is my data actually private?", a: "Yes. Everything is stored in your browser's localStorage only. It never touches any server. Export the JSON to back it up." },
                { q: "What if I clear my browser data?", a: "Export your keychain as JSON before clearing browser storage — you can re-import it any time." },
                { q: "Can I use this on multiple devices?", a: "Export on one device, import on another. Fully manual and intentional — no background sync." },
                { q: "Is this really free?", a: "Yes. Free forever. No upsell, no subscription, no hidden anything. It's a tool, not a product." },
              ].map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border p-6 shadow-card"
                  style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}
                >
                  <h3 className="font-medium mb-2">{item.q}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{item.a}</p>
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

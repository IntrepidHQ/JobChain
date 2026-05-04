import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-24" style={{ borderColor: "var(--card-border)" }}>
      <div
        className="max-w-7xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        style={{ color: "var(--muted-strong)" }}
      >
        <div>
          <div className="flex items-center gap-2 font-bold text-sm mb-1" style={{ color: "var(--foreground)" }}>
            <span
              className="h-6 w-6 rounded-md flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "var(--blue)" }}
            >
              J
            </span>
            JobChain
          </div>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Free, local-only. Your data never leaves your browser.
          </p>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/preplist" className="hover:text-[var(--foreground)] transition-colors">Preplist</Link>
          <a href="https://hansturner.com" target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)] transition-colors">
            Built by Hans Turner ↗
          </a>
        </div>
      </div>
      <div className="border-t" style={{ borderColor: "var(--card-border)" }}>
        <p className="max-w-7xl mx-auto px-5 sm:px-8 py-4 text-xs" style={{ color: "var(--muted)" }}>
          © {new Date().getFullYear()} JobChain. No account required. No data collected.
        </p>
      </div>
    </footer>
  );
}

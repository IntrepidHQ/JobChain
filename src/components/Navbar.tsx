import Link from "next/link";

export function Navbar() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 h-[4.5rem] flex items-center border-b"
      style={{ background: "var(--background)", borderColor: "var(--card-border)" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-base" style={{ color: "var(--foreground)" }}>
          <span
            className="h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
            style={{ background: "var(--blue)" }}
          >
            J
          </span>
          JobChain
        </Link>
        <nav className="flex items-center gap-6 text-sm" style={{ color: "var(--muted-strong)" }}>
          <Link href="/preplist" className="hover:text-[var(--foreground)] transition-colors font-medium">
            Preplist
          </Link>
          <Link
            href="/preplist"
            className="px-4 h-9 rounded-full text-sm font-semibold text-white flex items-center transition-opacity hover:opacity-90"
            style={{ background: "var(--blue)" }}
          >
            Start free →
          </Link>
        </nav>
      </div>
    </header>
  );
}

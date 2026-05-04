import Link from "next/link";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t mt-32" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div
              className="h-10 w-10 rounded-full grid place-items-center font-display text-base font-bold tracking-wide shrink-0"
              style={{ background: "var(--foreground)", color: "var(--background)" }}
            >
              JC
            </div>
            <div className="font-display text-2xl">JobChain</div>
          </div>
          <p className="mt-3 text-sm max-w-xs" style={{ color: "var(--muted-foreground)" }}>
            Free job application keychain. Fill once, apply fast. No account. No cloud. No friction.
          </p>
        </div>

        <div className="text-sm">
          <div className="mb-3" style={{ color: "var(--muted-foreground)" }}>Navigate</div>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-white transition-colors" style={{ color: "var(--muted-foreground)" }}>Home</Link></li>
            <li><Link href="/preplist" className="hover:text-white transition-colors" style={{ color: "var(--muted-foreground)" }}>Preplist</Link></li>
            <li>
              <a href="https://hansturner.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" style={{ color: "var(--muted-foreground)" }}>
                hansturner.com ↗
              </a>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <div className="mb-3" style={{ color: "var(--muted-foreground)" }}>Contact</div>
          <ul className="space-y-3">
            <li>
              <a
                href="mailto:hansdturner@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
                style={{ color: "var(--muted-foreground)" }}
              >
                <Mail className="h-3.5 w-3.5" />
                hansdturner@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-7xl px-6 py-6 flex justify-between text-xs" style={{ color: "var(--muted-foreground)" }}>
          <span>© {new Date().getFullYear()} JobChain — built by Hans Turner</span>
          <span>No data collected.</span>
        </div>
      </div>
    </footer>
  );
}

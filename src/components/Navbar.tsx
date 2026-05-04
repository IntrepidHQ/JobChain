"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4 sm:pt-5">
        <div
          className="flex items-center justify-between rounded-full border px-4 sm:px-5 py-2.5 sm:py-3 backdrop-blur-xl shadow-card"
          style={{ background: "oklch(0.13 0.005 260 / 0.6)", borderColor: "var(--border)" }}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="h-10 w-10 rounded-full grid place-items-center font-display text-base font-bold tracking-wide shrink-0"
              style={{ background: "var(--foreground)", color: "var(--background)" }}
            >
              JC
            </div>
            <span className="font-display text-lg tracking-tight hidden sm:block" style={{ color: "var(--foreground)" }}>
              JobChain
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm" style={{ color: "var(--muted-foreground)" }}>
            <Link href="/preplist" className="hover:text-white transition-colors">Preplist</Link>
            <Link href="/focus" className="hover:text-white transition-colors">Focus</Link>
            <Link href="/agents" className="hover:text-white transition-colors">Agents</Link>
            <a href="https://hansturner.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              hansturner.com
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/preplist"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ background: "var(--foreground)", color: "var(--background)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
              Start free
            </Link>
            <button
              type="button"
              className="md:hidden h-9 w-9 rounded-full border flex items-center justify-center transition-colors hover:text-white"
              style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--muted-foreground)" }}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div
            className="md:hidden mt-2 rounded-2xl border backdrop-blur-xl shadow-card px-5 py-5"
            style={{ background: "oklch(0.13 0.005 260 / 0.95)", borderColor: "var(--border)" }}
          >
            <nav className="flex flex-col gap-5 text-sm" style={{ color: "var(--muted-foreground)" }}>
              <Link href="/preplist" onClick={() => setOpen(false)} className="hover:text-white transition-colors">Preplist</Link>
              <Link href="/focus" onClick={() => setOpen(false)} className="hover:text-white transition-colors">Focus</Link>
              <Link href="/agents" onClick={() => setOpen(false)} className="hover:text-white transition-colors">Agents</Link>
              <a href="https://hansturner.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                hansturner.com ↗
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jobchain.hansturner.com"),
  title: "JobChain — Fill once. Apply fast.",
  description:
    "JobChain is a free, local-only job application keychain. Fill out your profile once, then autofill every application in seconds. No account. No cloud. No friction.",
  openGraph: {
    title: "JobChain — Fill once. Apply fast.",
    description: "Your job application keychain. Local-only, no account required.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F9F9F7" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0C0B" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <a href="#main" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}

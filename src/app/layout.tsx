import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jobchain.hansturner.com"),
  title: "JobChain — Fill once. Apply fast.",
  description:
    "JobChain is a free, local-only job application keychain. Fill out your profile once, then copy-paste into every application in seconds. No account. No cloud. No friction.",
  openGraph: {
    title: "JobChain — Fill once. Apply fast.",
    description: "Your job application keychain. Local-only, no account required.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#211f1d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <a href="#main" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}

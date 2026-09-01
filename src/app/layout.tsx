import type { Metadata } from "next";
import { Manrope, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// Manrope — primary typeface for headings + body.
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// JetBrains Mono — small accent/subtext (eyebrow labels, metadata, captions).
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Fraunces — editorial serif accent. Used for accent words on case pages and
// the homepage hero (the `.case-serif` class + var(--font-case-serif)).
const serif = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-case-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dianlee.design"),
  title: "Dian Lee · Senior Product Designer",
  description:
    "Senior product designer working across fintech, data, and AI. Selected work from Intuit, Capital One, Eureka Surveys, and more.",
  openGraph: {
    title: "Dian Lee · Senior Product Designer",
    description:
      "Senior product designer working across fintech, data, and AI.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Dian Lee, Senior Product Designer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dian Lee · Senior Product Designer",
    description:
      "Senior product designer working across fintech, data, and AI.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable} ${serif.variable} flex min-h-screen flex-col`}>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

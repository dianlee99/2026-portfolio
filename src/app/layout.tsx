import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
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

export const metadata: Metadata = {
  title: "Dian Lee · Senior Product Designer",
  description:
    "Senior product designer working across fintech, data, and AI. Selected work from Intuit, Capital One, Eureka Surveys, and more.",
  openGraph: {
    title: "Dian Lee · Senior Product Designer",
    description:
      "Senior product designer working across fintech, data, and AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} flex min-h-screen flex-col`}>
        <ThemeProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MarketPulse — Ai Palette Expansion & Monetization Strategy",
  description:
    "An interactive market-entry, pricing, and decision-science platform for Ai Palette's multi-market expansion — market sequencing, tiered pricing, ARR modeling, and MDP + SHAP decision science.",
  metadataBase: new URL("https://marketpulse.vercel.app"),
  openGraph: {
    title: "MarketPulse — Ai Palette Expansion & Monetization Strategy",
    description:
      "Market sequencing, tiered pricing, ARR modeling, and MDP/SHAP decision science for a multi-market SaaS expansion.",
    images: ["/og-cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

import SiteReveal from "@/components/site-reveal"; // default export (with optional video)
import { Navigation } from "@/components/navigation"; // your updated nav

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ArchiDius | Crafting Tomorrow's World—Today",
  description:
    "Visionary architectural design studio specializing in self-sufficient, sustainable architecture. Pioneering the future of living spaces.",
  keywords:
    "architecture, sustainable design, self-sufficient buildings, green architecture, innovative design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="antialiased bg-[#f7f3ef]">
        {/* Header (glass, elegantly blurred; center logo uses your image) */}
        <Navigation centerLogoSrc="/images/archidius-logo.svg" />

        {/* Optional background video during reveal; adjust or remove props */}
        <SiteReveal
          videoSrc="/videos/reveal.mp4"
          videoPoster="/images/reveal-poster.jpg"
          videoDim={0.55}
        >
          {children}
        </SiteReveal>
      </body>
    </html>
  );
}

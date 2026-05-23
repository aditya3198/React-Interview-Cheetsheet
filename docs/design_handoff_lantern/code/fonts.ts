/**
 * Lantern — Google Font setup (Next.js / next/font example)
 * Drop this into app/fonts.ts or src/lib/fonts.ts and reference the CSS
 * variables from your tokens file.
 */
import { Instrument_Serif, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";

export const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

/**
 * Then in your root layout:
 *
 *   <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
 *
 * And in CSS:
 *
 *   :root {
 *     --display: var(--font-display), "Iowan Old Style", Georgia, serif;
 *     --sans:    var(--font-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
 *     --mono:    var(--font-mono), ui-monospace, monospace;
 *   }
 */

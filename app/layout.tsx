import type { Metadata } from "next";
import { Instrument_Sans, Newsreader, Spline_Sans_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { brandAssets } from "@/lib/brand";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Digiteq | Technology holding company",
    template: "%s | Digiteq",
  },
  description:
    "Digiteq builds, acquires, supplies, and invests in technology across digital brands and enterprise supply chains.",
  openGraph: {
    title: "Digiteq | Technology holding company",
    description:
      "A UK technology holding company building, acquiring, supplying, and investing across the technology spectrum.",
    url: siteUrl,
    siteName: "Digiteq",
    type: "website",
    images: [
      {
        url: brandAssets.og,
        width: 1200,
        height: 630,
        alt: "Digiteq 3D logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digiteq | Technology holding company",
    description:
      "Digiteq builds, acquires, supplies, and invests in technology across digital brands and enterprise supply chains.",
    images: [brandAssets.og],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${newsreader.variable} ${instrument.variable} ${splineMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <OrganizationJsonLd />
        <Analytics />
        {children}
      </body>
    </html>
  );
}

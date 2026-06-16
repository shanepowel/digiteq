import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/analytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://digiteq.com"),
  title: {
    default: "Digiteq | Building Digital Equity",
    template: "%s | Digiteq",
  },
  description:
    "Digiteq creates, acquires and scales digital brands, products and media properties.",
  openGraph: {
    title: "Digiteq | Building Digital Equity",
    description:
      "A digital holding company platform for brands, products, media and audiences.",
    url: "https://digiteq.com",
    siteName: "Digiteq",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digiteq | Building Digital Equity",
    description: "We create, acquire and scale digital brands, products and media properties.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}

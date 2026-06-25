import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Digiteq Portal",
    template: "%s | Digiteq Portal",
  },
  description: "Operating platform for Digiteq Holdings — pipeline, founders, investors.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <html lang="en-GB">
      <body className="min-h-screen antialiased">
        {clerkKey ? <ClerkProvider>{children}</ClerkProvider> : children}
      </body>
    </html>
  );
}

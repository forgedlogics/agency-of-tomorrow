import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const host = headerStore.get("host") ?? "localhost:3000";
  const protocol =
    headerStore.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);

  return {
    title: "Agency of Tomorrow",
    description:
      "A future-facing marketing agency simulator where AI teams work under human oversight and an LLM assistant keeps the system aligned.",
    metadataBase: baseUrl,
    openGraph: {
      title: "Agency of Tomorrow",
      description:
        "AI teams, human oversight, and a learning agency model built for the future.",
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Agency of Tomorrow",
      description:
        "AI teams, human oversight, and a learning agency model built for the future.",
      images: ["/og.png"],
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

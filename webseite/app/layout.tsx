import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "MRG Consulting – Backups, KI-Automationen & Softwareentwicklung",
  description:
    "MRG Consulting entwickelt Backup-Lösungen, KI-Automationen und individuelle Software für Unternehmen – direkt, ohne Umwege.",
  icons: {
    icon: { url: "/icon.png", type: "image/png", sizes: "192x192" },
    apple: { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-ink font-sans text-white">{children}</body>
    </html>
  );
}

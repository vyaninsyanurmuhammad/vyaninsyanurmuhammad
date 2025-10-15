import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollSmoothLayout from "@/components/layouts/scroll-smooth-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
  ),
  title: "Vyan Insya Nur Muhammad",
  description:
    "Craft digital masterpieces: pixel-perfect, captivating, and seamlessly accessible.",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="w-full" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} w-full bg-[#0E1200] antialiased`}
      >
        <ScrollSmoothLayout>{children}</ScrollSmoothLayout>
      </body>
    </html>
  );
}

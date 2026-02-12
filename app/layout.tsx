import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import Navbar from "@/components/Navbar";
import { LoadingModal } from "@/components/ui/LoadingModal";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const kanit = Kanit({
  variable: "--font-kanit",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PhoodLen - TOEIC Learning Platform",
  description: "Master TOEIC with PhoodLen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${kanit.variable} antialiased min-h-screen bg-bg-main text-text-main font-sans flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <LoadingModal />
      </body>
    </html>
  );
}

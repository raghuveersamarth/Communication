import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard - Communication Mastery Mechanics",
  description: "Your personalized dashboard to track progress and access resources.",
};

export default function RootLayout({ children }) {
  return (
    <div
      className="flex text-[]   flex-col items-center gap-28 min-h-screen bg-[#000000] [background:radial-gradient(190%_170%_at_50%_5%,#101010_50%,#fd9800_100%)]"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        minHeight: "100vh",
        width: "100vw",
        overflow: "auto",
      }}
    >
      {children}
    </div>
  );
}

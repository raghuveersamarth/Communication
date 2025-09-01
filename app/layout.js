import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import { SessionProvider } from "./context/sessionwrapper";

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
  title: "Communication Mastery Mechanics",
  description: "Join us to master the art of communication.",
  icons: {
    icon: "favicon-for-app/favicon.ico",
    apple: "favicon-for-app/apple-icon.png",
    shortcut: "/favicon-16x16.png",
    "shortcut icon": "/favicon-32x32.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        >
          <Navbar />

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
        </body>
      </SessionProvider>
    </html>
  );
}

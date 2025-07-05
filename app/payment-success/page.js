"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabase } from "@/app/lib/supabase";
import RevealOnScroll from "@/components/RevealOnScroll";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "200", display: "swap" });

export default function PaymentSuccessPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useSearchParams();

  // Handle session verification and redirection
  const verifySession = async () => {
    setLoading(true);

    // Refresh the session
    await supabase.auth.refreshSession();

    // Get current session
    let {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      console.log("No active session found, trying localStorage...");

      const stored = localStorage.getItem("user token");
      if (stored) {
        const { email, password } = JSON.parse(stored);

        const {
          data: { session: loginSession },
          error: loginError,
        } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (loginError) {
          console.error("❌ Login failed:", loginError.message);
        } else {
          const session = loginSession; // <-- use the one we just got
          console.log("✅ Logged in:", session);
          localStorage.removeItem("user token");
        }
      }
    }

    setSession(session);
    console.log(session)
    setLoading(false);
  };

  useEffect(() => {
    verifySession();
  }, []);

  if (loading) {
    return (
      <div
        className={`${inter.className} min-h-screen flex flex-col justify-center items-center`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        <p className="mt-4 text-gray-300">
          Verifying your payment... and Signing in
        </p>
      </div>
    );
  }

  return (
    <div
      className={`${inter.className} gap-4 min-h-screen flex flex-col justify-center items-center text-white p-6`}
    >
      <RevealOnScroll delay={0.2}>
        <h1 className="text-4xl font-extrabold text-center text-amber-400">
          🎉 Payment Successful!
        </h1>
      </RevealOnScroll>

      <RevealOnScroll delay={0.4}>
        <p className="text-lg text-center mt-4 text-gray-300 max-w-md">
          Thank you for your payment,{" "}
          <span className="text-white font-semibold">
            {session?.user?.user_metadata?.username || "User"}
          </span>
          . Your access to the course has been granted.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.6}>
        <div className="mt-8">
          <button
            onClick={() => router.push("/")}
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium text-lg px-6 py-3 rounded-lg transition-all cursor-pointer duration-300 hover:scale-105 w-full max-w-xs text-center shadow-md"
          >
            Start Learning →
          </button>
        </div>
      </RevealOnScroll>
    </div>
  );
}

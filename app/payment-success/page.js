"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabase } from "@/app/lib/supabase";
import RevealOnScroll from "@/components/RevealOnScroll";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "200", display: "swap" });

export default function PaymentSuccessPage() {
  const [session, setsession] = useState({});
  const router = useRouter();

  const getsession = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (!session) {
      console.log("No active session found");
      router.push("/dashboard/Plan");
    }
    console.log(session)
    setsession(session);
  };

  useEffect(() => {
    getsession();
  }, []);

  return (
    <div className={`${inter.className} gap-4 min-h-screen flex flex-col justify-center items-center text-white p-6`}>
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
            Start Learning→
          </button>
        </div>
      </RevealOnScroll>
    </div>
  );
}

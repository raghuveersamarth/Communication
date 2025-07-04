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
  const paymentId = params.get("payment_id");

  // Handle session verification and redirection
  const verifySession = async () => {
    // First refresh the session
    await supabase.auth.refreshSession();

    // Get current session
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
      console.log("No active session found");
      await attemptMagicLinkLogin();
      return;
    }

    // Verify payment status
    const paymentStatus = session.user?.user_metadata?.payment_status;
    if (!["paid", "completed"].includes(paymentStatus)) {
      console.log("Payment not verified");
      await attemptMagicLinkLogin();
      return;
    }

    setSession(session);
    console.log(session)
    setLoading(false);
  };

  // Magic Link auto-login flow
  const attemptMagicLinkLogin = async () => {
    if (!paymentId) {
      router.push("/dashboard/Plan");
      return;
    }

    try {
      // 1. Retrieve magic link from database
      const { data, error } = await supabase
        .from("pending_logins")
        .select("magic_link")
        .eq("payment_id", paymentId)
        .single();

      if (error || !data?.magic_link) throw new Error("Magic link not found");

      // 2. Extract token from magic link
      const url = new URL(data.magic_link);
      const token = url.searchParams.get("token");
      const email = url.searchParams.get("email");

      if (!token || !email) throw new Error("Invalid magic link");

      // 3. Verify the token
      const { error: verifyError } = await supabase.auth.verifyOtp({
        type: "magiclink",
        token,
        email,
      });

      if (verifyError) throw verifyError;

      // 4. Cleanup and refresh
      await supabase
        .from("pending_logins")
        .delete()
        .eq("payment_id", paymentId);

      verifySession(); // Re-check session after login
    } catch (error) {
      console.error("Magic link login failed:", error.message);
      router.push(`/login?redirect=/payment-success?payment_id=${paymentId}`);
    }
  };

  useEffect(() => {
    verifySession();
  }, []);

  if (loading) {
    return (
      <div className={`${inter.className} min-h-screen flex flex-col justify-center items-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        <p className="mt-4 text-gray-300">Verifying your payment...</p>
      </div>
    );
  }

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
            onClick={() => router.push("/dashboard")}
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium text-lg px-6 py-3 rounded-lg transition-all cursor-pointer duration-300 hover:scale-105 w-full max-w-xs text-center shadow-md"
          >
            Start Learning →
          </button>
        </div>
      </RevealOnScroll>
    </div>
  );
}
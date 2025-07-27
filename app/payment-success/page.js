"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import RevealOnScroll from "@/components/RevealOnScroll";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "200", display: "swap" });

export default function PaymentSuccessPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("User");
  const router = useRouter();

  const verifySession = async () => {
    setLoading(true);
    try {
      // Refresh session
      await supabase.auth.refreshSession();

      // Get current session
      const {
        data: { session: currentSession },
        error,
      } = await supabase.auth.getSession();

      if (error || !currentSession) {
        const stored =
          typeof window !== "undefined"
            ? localStorage.getItem("user token")
            : null;

        if (stored) {
          const {
            email,
            password,
            username: storedUsername,
          } = JSON.parse(stored);
          setUsername(storedUsername || "User");

          console.log(localStorage.getItem("user token"));
          

          const { error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (loginError) {
            console.error("Login failed:", loginError.message);
            router.push("/dashboard/Plan");
            return;
          }

          localStorage.removeItem("user token");
        } else {
          router.push("/dashboard/Plan");
          return;
        }
      } else {
        setSession(currentSession);
        setUsername(currentSession?.user?.user_metadata?.username || "User");
      }
    } catch (err) {
      console.error("Session verification failed:", err);
      router.push("/Plan");
    } finally {
      setLoading(false);
    }
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
        <script src="https://cdn.lordicon.com/lordicon.js"></script>
        <lord-icon
          src="https://cdn.lordicon.com/mhnfcfpf.json"
          trigger="hover"
          style={{ width: "100px", height: "100px" }}
        ></lord-icon>
        <h1 className="text-4xl font-extrabold text-center text-amber-400">
          Payment Successful!
        </h1>
      </RevealOnScroll>

      <RevealOnScroll delay={0.4}>
        <p className="text-lg text-center mt-4 text-gray-300 max-w-md">
          Thank you for your payment,{" "}
          <span className="text-white font-semibold">{username} </span>
          90% of the people wouldn't take any action. Congratultions. you're
          ahead of those people.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.6}>
        <div className="mt-8">
          <button
            onClick={() => router.push("/Courses")}
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium text-lg px-6 py-3 rounded-lg transition-all cursor-pointer duration-300 hover:scale-105 w-full max-w-xs text-center shadow-md"
          >
            Start Learning →
          </button>
        </div>
        <script src="https://cdn.lordicon.com/lordicon.js"></script>
      </RevealOnScroll>
    </div>
  );
}

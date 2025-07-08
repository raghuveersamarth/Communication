"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollProgressBar from "./ScrollProgressbar";
import { supabase } from "@/app/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const [session, setSession] = useState(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Handle session state changes
  useEffect(() => {
    // Check initial session
    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        setSession(session);
        setIsSessionActive(
          !!session &&
            ["paid", "completed"].includes(
              session?.user?.user_metadata?.payment_status
            )
        );
      } catch (error) {
        console.error("Session error:", error);
        setIsSessionActive(false);
      }
    };

    getSession();

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setIsSessionActive(
        !!session &&
          ["paid", "completed"].includes(
            session?.user?.user_metadata?.payment_status
          )
      );
    });

    return () => subscription?.unsubscribe();
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     const { error } = await supabase.auth.signOut();
  //     if (error) throw error;

  //     setSession(null);
  //     setIsSessionActive(false);
  //     router.push("/dashboard/Login");
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //   }
  // };

  const hiddenRoutes = [
    "/Courses",
    "/about",
    "/dashboard/Billing",
    "/dashboard/Plan",
    "/dashboard/Login",
    "/ResetPassword",
    "/payment-success",
    "/Courses/comm-vids",
  ];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <motion.nav
      animate={{ rotate: "180deg`" }}
      className="text-white p-4 shadow-lg fixed top-0 w-full transition-colors duration-300 bg-transparent backdrop-blur-md"
    >
      <ScrollProgressBar />
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/" className="text-[#fca000] hover:text-gray-300">
            COMMUNICATION
          </Link>
        </div>

        {!isSessionActive ? (
          <div className="space-x-4">
            <Link href="/about" className="text-white hover:text-gray-300">
              About
            </Link>
            <Link
              href="/dashboard/Login"
              className="text-white hover:text-gray-300"
            >
              Login
            </Link>
            <Link href="/Login" className="text-amber-500 hover:text-amber-300">
              Explore Courses
            </Link>
            <Link
              href="/dashboard/Plan"
              className="text-white hover:text-gray-300"
            >
              <button className="bg-[#fca000] text-white rounded-lg py-1 px-2 hover:bg-[#f9c388] transition cursor-pointer duration-300">
                Join
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-x-4">
            <Link href="/Courses" className="text-white hover:text-gray-300">
              Courses
            </Link>
            <Link href="/discord" className="text-white hover:text-gray-300">
              Discord
            </Link>
            <Link
              href="/ResetPassword"
              className="text-white hover:text-gray-300"
            >
              Reset Password
            </Link>
            <LogoutButton />
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;

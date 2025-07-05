"use client";
import LogoutButton from "./LogoutButton";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollProgressBar from "./ScrollProgressbar";
import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [session, setsession] = useState({});
  const router = useRouter();
  const [issessionActive, setissessionActive] = useState(false);
    const handleLogout = async () => {
    // setIsLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        router.push("/dashboard/Login");
        console.log("Logout successful");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setissessionActive(false);
      setsession({});
    }
  };
  const getsession = async () => {
    await supabase.auth.refreshSession();

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (
      session ||
      session?.user.user_metadata.payment_status === ("paid" || "completed")
    ) {
      setissessionActive(true);
    }
    else {
      setissessionActive(false);
    }
    console.log("Session Data:", session);

    setsession(session);
  };
  useEffect(() => {
    getsession();
  }, []);

  const hiddenRoutes = [
    "/Courses",
    "/about",
    "/dashboard/Billing",
    "/dashboard/Plan",
    "/dashboard/Login",
    "/ResetPassword",
    "/payment-success",
  ];
  const pathname = usePathname();

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }
  return (
    <>
      <motion.nav
        animate={{ rotate: "180deg`" }}
        className=" text-white p-4 shadow-lg fixed top-0 w-full transition-colors duration-300 bg-transparent backdrop-blur-md "
      >
        <ScrollProgressBar />

        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link href="/" className="text-[#fca000] hover:text-gray-300">
              COMMUNICATION
            </Link>
          </div>
          {!issessionActive ? (
            <div className="space-x-4">
              <Link href="/about" className="text-white hover:text-gray-300">
                About
              </Link>
              <Link href="/dashboard/Login" className="text-white hover:text-gray-300">
                Login
              </Link>
              <Link href="/Login" className="text-amber-500 hover:text-amber-300">
                Explore Courses
              </Link>
              <Link
                href="/dashboard/Plan"
                className="text-white hover:text-gray-300"
              >
                <button className="bg-[#fca000] text-white rounded-lg py-1 px-2  hover:bg-[#f9c388] transition cursor-pointer duration-300">
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
              <Link href="" className="text-white hover:text-gray-300">
                {/* <LogoutButton /> */}
                <button
                  onClick={handleLogout}
                  className="bg-[#fca000] text-white rounded-lg py-1 px-2 hover:bg-[#f9c388] transition cursor-pointer duration-300">
                  Sign Out
                  </button>
              </Link>
            </div>
          )}
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;

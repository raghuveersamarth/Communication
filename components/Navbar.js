"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ScrollProgressBar from "./ScrollProgressbar";
import { supabase } from "@/app/lib/supabase";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const [session, setSession] = useState(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
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
        setIsSessionActive(false);
      }
    };
    getSession();
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

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setError(null);

    try {
      const { error: logoutError } = await supabase.auth.signOut();

      if (logoutError) {
        setError(logoutError.message);
        setIsLoggingOut(false);
        return;
      }

      router.push("/dashboard/Login");
      router.refresh();
      setShowConfirm(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const hiddenRoutes = [
    "/Courses",
    "/about",
    "/dashboard/Billing",
    "/dashboard/Plan",
    "/dashboard/Login",
    "/ResetPassword",
    "/payment-success",
    "/Courses/comm-vids",
    "/auth/forgot-password",
  ];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <>
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
              <Link
                href="/Courses"
                className="text-amber-500 hover:text-amber-300"
              >
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
                href="/auth/forgot-password"
                className="text-white hover:text-gray-300"
              >
                Reset Password
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowConfirm(true)}
                className="bg-[#fca000] text-white rounded-lg py-1 px-2 hover:bg-[#f9c388] transition cursor-pointer duration-300"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Signing Out..." : "Sign Out"}
              </motion.button>
            </div>
          )}
        </div>
      </motion.nav>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  damping: 20,
                  stiffness: 300,
                },
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
                transition: {
                  duration: 0.2,
                },
              }}
              className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4"
            >
              <h3 className="text-lg font-medium mb-4">Confirm Logout</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to sign out?
              </p>

              {error && <p className="text-red-500 mb-4">{error}</p>}

              <div className="flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowConfirm(false);
                    setError(null);
                  }}
                  className="bg-gray-200 text-gray-800 rounded-lg py-2 px-4 hover:bg-gray-300 transition-colors duration-300"
                  disabled={isLoggingOut}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="bg-[#fca000] text-white rounded-lg py-2 px-4 hover:bg-[#f9c388] transition-colors duration-300 disabled:opacity-70"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Signing Out..." : "Sign Out"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

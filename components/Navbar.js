"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ScrollProgressBar from "./ScrollProgressbar";
import Image from "next/image";
import { supabase } from "@/app/lib/supabase";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const [session, setSession] = useState(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
    "/discord",
    "/auth/reset",
    "/about",
    "/dashboard/Billing",
    "/dashboard/Plan",
    "/dashboard/Login",
    "/ResetPassword",
    "/payment-success",
    "/Courses/comm-vids",
    "/auth/forgot-password",
    "/refund-policy",
    "/terms-of-service",
    "/privacy-policy",
    "/shipping-policy",
    "/Contact",
  ];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <>
      <motion.nav
        animate={{ rotate: "180deg`" }}
        className="text-white p-4 shadow-lg fixed top-0 w-full transition-colors duration-300 bg-transparent backdrop-blur-md z-40"
      >
        <ScrollProgressBar />
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl flex font-bold justify-center items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/fav/fav.jpg"
                alt="Logo"
                width={40}
                height={40}
                className="mr-2"
              />
            </Link>
            <Link href="/" className="text-[#ff6201] hover:text-gray-300">
              CMM COMMUNITY
            </Link>
          </div>

          {/* Hamburger for mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-7 h-7 text-[#fca000]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden md:flex space-x-4 items-center">
            {!isSessionActive ? (
              <>
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

                {/* Help Dropdown */}
                <div className="relative group">
                  <button className="text-white hover:text-gray-300 flex items-center focus:outline-none">
                    Help
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-44 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 z-50">
                    <Link
                      href="/refund-policy"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Refund Policy
                    </Link>
                    <Link
                      href="/privacy-policy"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="/Contact"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>

                <Link
                  href="/dashboard/Plan"
                  className="text-white hover:text-gray-300"
                >
                  <button className="bg-[#fca000] text-white rounded-lg py-1 px-2 hover:bg-[#f9c388] transition cursor-pointer duration-300">
                    Join
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/Courses"
                  className="text-white hover:text-gray-300"
                >
                  Courses
                </Link>
                <Link
                  href="/discord"
                  className="text-white hover:text-gray-300"
                >
                  Discord
                </Link>
                <div className="relative group">
                  <button className="text-white hover:text-gray-300 flex items-center focus:outline-none">
                    Help
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-44 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 z-50">
                    <Link
                      href="/refund-policy"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Refund Policy
                    </Link>
                    <Link
                      href="/privacy-policy"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="/Contact"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/auth/forgot-password"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Reset Password
                    </Link>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowConfirm(true)}
                  className="bg-[#fca000] text-white rounded-lg py-1 px-2 hover:bg-[#f9c388] transition cursor-pointer duration-300"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Signing Out..." : "Sign Out"}
                </motion.button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-[#222] bg-opacity-95 backdrop-blur-lg absolute top-full left-0 w-full z-30"
            >
              <div className="flex flex-col p-4 space-y-3">
                {!isSessionActive ? (
                  <>
                    <Link
                      href="/about"
                      className="text-white hover:text-gray-300"
                      onClick={() => setMenuOpen(false)}
                    >
                      About
                    </Link>
                    <Link
                      href="/dashboard/Login"
                      className="text-white hover:text-gray-300"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/Courses"
                      className="text-amber-500 hover:text-amber-300"
                      onClick={() => setMenuOpen(false)}
                      >
                      Explore Courses
                    </Link>
                    <Link
                      href="/refund-policy"
                      className=" text-white hover:text-gray-300"
                      onClick={() => setMenuOpen(false)}
                    >
                      Refund Policy
                    </Link>
                    <Link
                      href="/privacy-policy"
                      className=" text-white hover:text-gray-300"
                      onClick={() => setMenuOpen(false)}
                      >
                      Privacy Policy
                    </Link>
                    <Link
                      href="/Contact"
                      className=" text-white hover:text-gray-300"
                        onClick={() => setMenuOpen(false)}
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/auth/forgot-password"
                      className=" text-white hover:text-gray-300"
                      onClick={() => setMenuOpen(false)}
                    >
                      Reset Password
                    </Link>
                    
                    <Link
                      href="/dashboard/Plan"
                      className="text-white hover:text-gray-300"
                      onClick={() => setMenuOpen(false)}
                    >
                      <button className="bg-[#fca000] text-white rounded-lg py-1 px-2 hover:bg-[#f9c388] transition cursor-pointer duration-300 w-full">
                        Join
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/Courses"
                      className="text-white hover:text-gray-300"
                      onClick={() => setMenuOpen(false)}
                    >
                      Courses
                    </Link>
                    <Link
                      href="/discord"
                      className="text-white hover:text-gray-300"
                      onClick={() => setMenuOpen(false)}
                    >
                      Discord
                    </Link>
                                        <Link
                      href="/refund-policy"
                      className=" text-white hover:text-gray-300"
                      onClick={() => setMenuOpen(false)}
                    >
                      Refund Policy
                    </Link>
                    <Link
                      href="/privacy-policy"
                      className=" text-white hover:text-gray-300"
                      onClick={() => setMenuOpen(false)}
                      >
                      Privacy Policy
                    </Link>
                    <Link
                      href="/Contact"
                      className=" text-white hover:text-gray-300"
                        onClick={() => setMenuOpen(false)}
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/auth/forgot-password"
                      className="text-white hover:text-gray-300"
                      onClick={() => setMenuOpen(false)}
                    >
                      Reset Password
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setMenuOpen(false);
                        setShowConfirm(true);
                      }}
                      className="bg-[#fca000] text-white rounded-lg py-1 px-2 hover:bg-[#f9c388] transition cursor-pointer duration-300 w-full"
                      disabled={isLoggingOut}
                    >
                      {isLoggingOut ? "Signing Out..." : "Sign Out"}
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
              <h3 className="text-lg text-[#ef8012] font-medium mb-4">
                Confirm Logout
              </h3>
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

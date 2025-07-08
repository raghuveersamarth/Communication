"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setError(null);
    
    try {
      const { error: logoutError } = await supabase.auth.signOut();
      
      if (logoutError) {
        setError(logoutError.message);
        return;
      }
      
      console.log("Logout successful");
      router.push("/dashboard/Login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      setError(error.message);
    } finally {
      setIsLoggingOut(false);
      // Only hide the dialog if logout was successful
      if (!error) {
        setShowConfirm(false);
      }
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowConfirm(true)}
        className="bg-[#fca000] text-white rounded-lg py-2 px-4 hover:bg-[#f9c388] transition-colors duration-300"
        disabled={isLoggingOut}
      >
        {isLoggingOut ? "Signing Out..." : "Sign Out"}
      </motion.button>

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

              {error && (
                <p className="text-red-500 mb-4">{error}</p>
              )}

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
}
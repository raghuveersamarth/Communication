"use client";
import React from "react";
import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";
import Link from "next/link";

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
});
const Login = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.2,        // Slower entrance
        delay: 0.2,           // Small delay for drama
        ease: [0.22, 1, 0.36, 1], // Smooth, natural curve
      }}
    >
      <div
        className={
          "flex flex-col font-light items-center justify-center min-h-screen " +
          inter.className
        }
      >
        <h1 className="text-4xl font-bold text-[#fca000] mb-8">
          Welcome back!
        </h1>
        <form className="bg-[#191919] p-8 rounded-lg shadow-md w-96">
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#fca000] cursor-pointer text-white py-2 rounded hover:bg-[#ffc67b] transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="activities">
          <p className="text-center text-white mt-4">
            Forgot your password?{" "}
            <a
              href="/reset-password"
              className="text-[#fca000] hover:underline"
            >
              Reset it
            </a>
          </p>
          <p className="text-center text-white mt-4">
            Don't have an account?
            <a
              href="/dashboard/Billing"
              className="text-[#fca000] hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;

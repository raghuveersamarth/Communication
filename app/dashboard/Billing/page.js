"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import RevealOnScroll from "@/components/RevealOnScroll";

const inter = Inter({
  subsets: ["latin"],
  weight: "200",
  display: "swap",
});

const BillingForm = () => {
  const UserActivation = (e) => {
    let ndata = Object.fromEntries(e)
    
  };

  return (
    <>
      <div
        className={`${inter.className} mt-16 border border-gray-700 rounded-2xl shadow-lg  hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 h-[600px] w-[600px] bg-[#101010] flex flex-col items-center p-6 justify-center`}
      >
        <h1 className="mb-12 font-bold text-3xl">Create an account</h1>
        <form
          action={UserActivation}
          className=" flex flex-col items-center gap-4 "
        >
          <label>
            <RevealOnScroll delay={0.2}>
              <input
                className="mb-4 p-2  w-[400px] bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg  hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 "
                name="username"
                type="text"
                defaultValue={""}
                placeholder="Enter your username"
              />
            </RevealOnScroll>
          </label>
          <label>
            <RevealOnScroll delay={0.4}>
              <input
                className="mb-4 p-2  w-[400px] bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg  hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 "
                name="email"
                type="text"
                defaultValue={""}
                placeholder="Enter your email"
              />
            </RevealOnScroll>
          </label>
          <label>
            <RevealOnScroll delay={0.6}>
              <input
                className="mb-4 p-2  w-[400px] bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg  hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 "
                name="password"
                type="text"
                defaultValue={""}
                placeholder="Create a Password"
              />
            </RevealOnScroll>
          </label>
          <label>
            <RevealOnScroll delay={0.8}>
              <input
                className="mb-4 p-2  w-[400px] bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg  hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 "
                name="confirmPassword"
                type="text"
                defaultValue={""}
                placeholder="Confirm Password"
              />
            </RevealOnScroll>
          </label>
          <RevealOnScroll delay={1.0}>
            <button
              type="submit"
              className="border text-center border-amber-500 text-white  py-3 rounded-lg hover:bg-amber-600 transition-colors font-medium px-12"
            >
              <span className="text-gray-400 text-lg line-through">₹24000</span>
              <span className="text-3xl text-amber-400">₹18397</span>
            </button>
          </RevealOnScroll>
        </form>
      </div>
    </>
  );
};

export default BillingForm;

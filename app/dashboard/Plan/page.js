"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: "200",
  display: "swap",
});

const Plan = () => {
  return (
    <div className={`${inter.className}`}>
      <div className="flex justify-center items-center p-4 sm:p-10">
        <RevealOnScroll className="flex items-center w-full">
          <div className="onetimepayment p-4 sm:p-6 items-center flex flex-col m-2 sm:m-4 h-[90vh] max-h-[600px] w-full max-w-md border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 overflow-hidden bg-[#18181b]">
            {/* Title with staggered delay */}
            <RevealOnScroll delay={0.2} className="">
              <div className="flex flex-col items-center">
                <h1
                  className={`text-white font-bold text-xl sm:text-2xl mt-6 sm:mt-8 mb-2 text-center`}
                >
                  One Time Payment + Lifetime Access
                </h1>
                <div className="w-12 sm:w-16 h-1 bg-amber-500 rounded-full mb-4 sm:mb-6 opacity-70"></div>
                <h2
                  className={`text-white font-bold text-lg sm:text-xl flex items-center gap-2 sm:gap-3`}
                >
                  <span className="text-gray-400 text-base sm:text-lg line-through">
                    ₹24397
                  </span>
                  <span className="text-2xl sm:text-3xl text-amber-400">₹9397</span>
                </h2>
              </div>
            </RevealOnScroll>
            <div className="flex flex-col items-center m-4 sm:m-8 w-full">
              <RevealOnScroll delay={0.4}>
                <h3 className={`text-white font-bold text-base sm:text-lg mb-3 sm:mb-4 text-center`}>
                  What you get:
                </h3>
              </RevealOnScroll>

              <ul className="w-full flex flex-col items-center space-y-0.5 px-2 sm:px-4">
                <RevealOnScroll delay={0.6}>
                  <li className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-colors justify-center w-full">
                    <Image
                      src="/svgs/tick.svg"
                      alt="Tick"
                      width={18}
                      height={18}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span className="text-white/90 text-sm sm:text-base text-center w-full">
                      Lifetime access to all courses
                    </span>
                  </li>
                </RevealOnScroll>

                <RevealOnScroll delay={0.8}>
                  <li className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-colors justify-center w-full">
                    <Image
                      src="/svgs/tick.svg"
                      alt="Tick"
                      width={18}
                      height={18}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span className="text-white/90 text-sm sm:text-base text-center w-full">
                      Access to all future updates
                    </span>
                  </li>
                </RevealOnScroll>

                <RevealOnScroll delay={1.0}>
                  <li className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-colors justify-center w-full">
                    <Image
                      src="/svgs/tick.svg"
                      alt="Tick"
                      width={18}
                      height={18}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span className="text-white/90 text-sm sm:text-base text-center w-full">
                      Exclusive community access
                    </span>
                  </li>
                </RevealOnScroll>
              </ul>
            </div>


            <RevealOnScroll
              delay={1.2}
              className="flex justify-center items-center mt-auto mb-4 sm:mb-6 w-full"
            >
              <Link
                href="/dashboard/Billing"
                rel="noopener noreferrer"
                className="border text-center border-amber-500 m-2 sm:m-3 text-white px-6 sm:px-8 py-2 rounded-lg hover:bg-amber-600 transition-colors font-medium w-full"
              >
                Create an Account
              </Link>
            </RevealOnScroll>

            {/* already have an account */}
            <RevealOnScroll delay={1.4} className="mt-2 sm:mt-4 w-full">
              <Link
                href="/dashboard/Login"
                className="text-amber-500 hover:underline text-xs sm:text-sm block text-center"
              >
                <p className="m-2 sm:m-3.5">Already have an account? Sign in</p>
              </Link>
            </RevealOnScroll>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default Plan;

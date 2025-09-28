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
    <div className={`${inter.className} min-h-screen flex items-center justify-center`}>
      <div className="flex justify-center items-center p-4 sm:p-6 md:p-10 w-full">
        <RevealOnScroll className="flex items-center w-full max-w-sm sm:max-w-md lg:max-w-lg">
          <div className="onetimepayment p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-between w-full min-h-[500px] sm:min-h-[550px] lg:min-h-[600px] max-h-[90vh] border border-gray-700 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 overflow-hidden bg-[#18181b]">
           
            {/* Header Section */}
            <div className="flex flex-col items-center text-center w-full">
              <RevealOnScroll delay={0.2} className="w-full">
                <div className="flex flex-col items-center">
                  <h1 className={`text-white font-bold text-lg sm:text-xl md:text-2xl mt-2 mb-3 text-center leading-tight px-2`}>
                    One Time Payment + Lifetime Access
                  </h1>
                  <div className="w-10 sm:w-12 md:w-16 h-1 bg-amber-500 rounded-full mb-3 sm:mb-4 opacity-70"></div>
                  <h2 className={`text-white font-bold text-base sm:text-lg md:text-xl flex items-center justify-center gap-2 sm:gap-3`}>
                    <span className="text-gray-400 text-sm sm:text-base md:text-lg line-through">
                      ₹24397
                    </span>
                    <span className="text-xl sm:text-2xl md:text-3xl text-amber-400">₹9397</span>
                  </h2>
                </div>
              </RevealOnScroll>
            </div>

            {/* Features Section */}
            <div className="flex flex-col items-center justify-center w-full flex-grow">
              <RevealOnScroll delay={0.4}>
                <h3 className={`text-white font-bold text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-6 text-center`}>
                  What you get:
                </h3>
              </RevealOnScroll>

              <ul className="w-full flex flex-col items-center space-y-1 sm:space-y-2 md:space-y-3 px-2 sm:px-4">
                <RevealOnScroll delay={0.6}>
                  <li className="flex items-center gap-2 sm:gap-3 md:gap-4 p-1.5 sm:p-2 md:p-3 rounded-lg hover:bg-gray-700/50 transition-colors w-full">
                    <Image
                      src="/svgs/tick.svg"
                      alt="Tick"
                      width={16}
                      height={16}
                      className="sm:w-[18px] sm:h-[18px] flex-shrink-0"
                    />
                    <span className="text-white/90 text-xs sm:text-sm md:text-base flex-1">
                      Lifetime access to all courses
                    </span>
                  </li>
                </RevealOnScroll>

                <RevealOnScroll delay={0.8}>
                  <li className="flex items-center gap-2 sm:gap-3 md:gap-4 p-1.5 sm:p-2 md:p-3 rounded-lg hover:bg-gray-700/50 transition-colors w-full">
                    <Image
                      src="/svgs/tick.svg"
                      alt="Tick"
                      width={16}
                      height={16}
                      className="sm:w-[18px] sm:h-[18px] flex-shrink-0"
                    />
                    <span className="text-white/90 text-xs sm:text-sm md:text-base flex-1">
                      Access to all future updates
                    </span>
                  </li>
                </RevealOnScroll>

                <RevealOnScroll delay={1.0}>
                  <li className="flex items-center gap-2 sm:gap-3 md:gap-4 p-1.5 sm:p-2 md:p-3 rounded-lg hover:bg-gray-700/50 transition-colors w-full">
                    <Image
                      src="/svgs/tick.svg"
                      alt="Tick"
                      width={16}
                      height={16}
                      className="sm:w-[18px] sm:h-[18px] flex-shrink-0"
                    />
                    <span className="text-white/90 text-xs sm:text-sm md:text-base flex-1">
                      Exclusive community access
                    </span>
                  </li>
                </RevealOnScroll>
              </ul>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col items-center w-full mt-4 sm:mt-6 md:mt-8">
              <RevealOnScroll delay={1.2} className="w-full px-2">
                <Link
                  href="/dashboard/Billing"
                  rel="noopener noreferrer"
                  className="block w-full text-center border border-amber-500 bg-amber-500 hover:bg-amber-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-lg transition-colors font-medium text-sm sm:text-base md:text-lg"
                >
                  Create an Account
                </Link>
              </RevealOnScroll>

              <RevealOnScroll delay={1.4} className="mt-3 sm:mt-4 w-full">
                <Link
                  href="/dashboard/Login"
                  className="text-amber-500 hover:text-amber-400 hover:underline text-xs sm:text-sm block text-center transition-colors"
                >
                  Already have an account? Sign in
                </Link>
              </RevealOnScroll>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default Plan;
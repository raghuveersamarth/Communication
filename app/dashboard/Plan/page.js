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
      <div className="flex justify-center items-center p-2 sm:p-4 md:p-6 lg:p-10 w-full">
        <RevealOnScroll className="flex items-center justify-center w-full">
          <div className="onetimepayment p-3 sm:p-4 md:p-6 flex flex-col justify-between m-1 sm:m-2 md:m-4 
                          min-h-[85vh] sm:min-h-[90vh] max-h-[95vh] 
                          w-full max-w-[340px] sm:max-w-md md:max-w-lg
                          border border-gray-700 rounded-xl sm:rounded-2xl 
                          shadow-lg hover:shadow-amber-500/10 transition-all duration-300 
                          hover:border-amber-500/30 overflow-hidden bg-[#18181b]">
            
            {/* Header Section */}
            <div className="flex-shrink-0">
              <RevealOnScroll delay={0.2} className="">
                <div className="flex flex-col items-center">
                  <h1 className={`text-white font-bold text-base sm:text-xl md:text-2xl 
                                 mt-2 sm:mt-4 md:mt-6 mb-2 text-center leading-tight px-2`}>
                    One Time Payment + Lifetime Access
                  </h1>
                  <div className="w-8 sm:w-12 md:w-16 h-0.5 sm:h-1 bg-amber-500 rounded-full 
                                 mb-2 sm:mb-4 md:mb-6 opacity-70"></div>
                  <h2 className={`text-white font-bold text-lg sm:text-xl md:text-2xl 
                                 flex items-center gap-2 sm:gap-3`}>
                    <span className="text-gray-400 text-sm sm:text-base md:text-lg line-through">
                      ₹24397
                    </span>
                    <span className="text-xl sm:text-2xl md:text-3xl text-amber-400">₹9397</span>
                  </h2>
                </div>
              </RevealOnScroll>
            </div>

            {/* Benefits Section - Flexible height */}
            <div className="flex-1 flex flex-col justify-center py-2 sm:py-4 md:py-6 min-h-0">
              <RevealOnScroll delay={0.4}>
                <h3 className={`text-white font-bold text-sm sm:text-base md:text-lg 
                               mb-2 sm:mb-3 md:mb-4 text-center`}>
                  What you get:
                </h3>
              </RevealOnScroll>

              <ul className="w-full space-y-1 sm:space-y-1.5 px-1 sm:px-2 md:px-4">
                <RevealOnScroll delay={0.6}>
                  <li className="flex items-start gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg 
                                hover:bg-gray-700/50 transition-colors">
                    <Image
                      src="/svgs/tick.svg"
                      alt="Tick"
                      width={16}
                      height={16}
                      className="mt-0.5 flex-shrink-0 sm:w-[18px] sm:h-[18px]"
                    />
                    <span className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed">
                      Lifetime access to all courses
                    </span>
                  </li>
                </RevealOnScroll>

                <RevealOnScroll delay={0.8}>
                  <li className="flex items-start gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg 
                                hover:bg-gray-700/50 transition-colors">
                    <Image
                      src="/svgs/tick.svg"
                      alt="Tick"
                      width={16}
                      height={16}
                      className="mt-0.5 flex-shrink-0 sm:w-[18px] sm:h-[18px]"
                    />
                    <span className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed">
                      Access to all future updates
                    </span>
                  </li>
                </RevealOnScroll>

                <RevealOnScroll delay={1.0}>
                  <li className="flex items-start gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg 
                                hover:bg-gray-700/50 transition-colors">
                    <Image
                      src="/svgs/tick.svg"
                      alt="Tick"
                      width={16}
                      height={16}
                      className="mt-0.5 flex-shrink-0 sm:w-[18px] sm:h-[18px]"
                    />
                    <span className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed">
                      Exclusive community access
                    </span>
                  </li>
                </RevealOnScroll>
              </ul>
            </div>

            {/* Action Section - Fixed at bottom */}
            <div className="flex-shrink-0 pt-2 sm:pt-4">
              <RevealOnScroll
                delay={1.2}
                className="flex justify-center items-center mb-2 sm:mb-4 w-full"
              >
                <Link
                  href="/dashboard/Billing"
                  rel="noopener noreferrer"
                  className="border text-center border-amber-500 mx-1 sm:mx-2 md:mx-3 
                           text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 
                           rounded-lg hover:bg-amber-600 transition-colors 
                           font-medium w-full text-sm sm:text-base"
                >
                  Create an Account
                </Link>
              </RevealOnScroll>

              <RevealOnScroll delay={1.4} className="w-full">
                <Link
                  href="/dashboard/Login"
                  className="text-amber-500 hover:underline text-xs sm:text-sm block text-center"
                >
                  <p className="mx-1 sm:mx-2 md:mx-3 my-1 sm:my-2">
                    Already have an account? Sign in
                  </p>
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
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
      <div className="flex justify-center items-center p-10">
        <RevealOnScroll className="flex items-center">
          <div className="onetimepayment p-6 items-center flex flex-col m-4 h-[500px] w-full max-w-md border border-gray-700 rounded-2xl shadow-lg  hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30">
            {/* Title with staggered delay */}
            <RevealOnScroll delay={0.2} className="">
              <div className="flex flex-col items-center">
                <h1
                  className={`text-white font-bold text-2xl mt-8 mb-2 text-center`}
                >
                  One Time Payment + Lifetime Access
                </h1>
                <div className="w-16 h-1 bg-amber-500 rounded-full mb-6 opacity-70"></div>
                <h2
                  className={`text-white font-bold text-xl flex items-center gap-3`}
                >
                  <span className="text-gray-400 text-lg line-through">
                    ₹24000
                  </span>
                  <span className="text-3xl text-amber-400">₹18397</span>
                </h2>
              </div>
            </RevealOnScroll>

            {/* Benefits list with staggered delays */}
            <div className="flex flex-col items-center m-8">
              <RevealOnScroll delay={0.4}>
                <h3 className={`text-white font-bold text-lg mb-4`}>
                  What you get:
                </h3>
              </RevealOnScroll>

              <ul className="w-full space-y-0.5 px-4">
                <RevealOnScroll delay={0.6}>
                  <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-colors">
                    <Image
                      src="/svgs/tick.svg"
                      alt="Tick"
                      width={18}
                      height={18}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span className="text-white/90">
                      Lifetime access to all courses
                    </span>
                  </li>
                </RevealOnScroll>

                <RevealOnScroll delay={0.8}>
                  <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-colors">
                    <Image
                      src="/svgs/tick.svg"
                      alt="Tick"
                      width={18}
                      height={18}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span className="text-white/90">
                      Access to all future updates
                    </span>
                  </li>
                </RevealOnScroll>

                <RevealOnScroll delay={1.0}>
                  <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-colors">
                    <Image
                      src="/svgs/tick.svg"
                      alt="Tick"
                      width={18}
                      height={18}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span className="text-white/90">
                      Exclusive community access
                    </span>
                  </li>
                </RevealOnScroll>
              </ul>
            </div>

            {/* Button with delay */}
            <RevealOnScroll
              delay={1.2}
              className="flex justify-center items-center mt-auto mb-6"
            >
              <Link
                href="/dashboard/Billing"
                rel="noopener noreferrer"
                className="border text-center border-amber-500 text-white px-8 py-2 rounded-lg hover:bg-amber-600 transition-colors font-medium"
              >
                Create an Account
              </Link>
            </RevealOnScroll>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default Plan;

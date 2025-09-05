"use client";
import React from "react";
import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function RefundPolicy() {
return (
    <section className={`flex justify-center items-center min-h-screen px-2 ${inter.className}`}>
        <div className="w-full max-w-lg bg-white dark:bg-[#151515] rounded-2xl shadow-xl py-10 px-6 sm:px-10 mx-auto">
            <RevealOnScroll delay={0}>
                <h1 className="text-3xl text-amber-500 sm:text-3xl font-extrabold tracking-tight mb-8 text-primary-900 dark:text-primary-100 text-center">
                    Refund & Cancellation Policy
                </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
                <ul className="mb-5 text-base sm:text-lg text-gray-700 dark:text-gray-300 list-disc pl-6 space-y-3">
                    <li>
                        At{" "}
                        <span className="font-semibold text-primary-700 dark:text-primary-300">
                            Communication Mastery Mechanics
                        </span>
                        , we offer a one-time payment for our courses.
                    </li>
                    <li>
                        <span className="font-bold text-red-600 dark:text-red-400">
                            All purchases are final and non-refundable.
                        </span>
                    </li>
                    <li>
                        Once you have enrolled and payment is complete, you will receive
                        instant access to all course content.
                    </li>
                    <li>
                        Cancellations or refunds will{" "}
                        <span className="font-semibold">not</span> be processed under any
                        circumstances.
                    </li>
                </ul>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
                <div className="mt-8 border-t pt-6">
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        Questions? Contact us at{" "}
                        <button
                            type="button"
                            className="cursor-pointer font-medium text-primary-700 dark:text-primary-300 underline hover:text-primary-900 focus:outline-none"
                            onClick={() => {
                                window.open(
                                    "https://mail.google.com/mail/?view=cm&fs=1&to=vrajhimesh@gmail.com",
                                    "_blank"
                                );
                            }}
                        >
                            vrajhimesh@gmail.com
                        </button>
                    </p>
                    <Link
                        href={"/"}
                        className="bg-amber-500 m-auto hover:bg-amber-600 text-white font-medium text-lg px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 w-full max-w-xs text-center shadow-md mt-4 block"
                    >
                        Go Back Home
                    </Link>
                </div>
            </RevealOnScroll>
        </div>
    </section>
);
}

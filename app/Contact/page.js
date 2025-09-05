"use client";
import React from "react";
import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Contact() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  return (
    <section
      className={`flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-12 ${inter.className}`}
    >
      <div className="w-full max-w-4xl  rounded-2xl shadow-xl py-12 px-6 sm:px-10 lg:px-16 mx-auto">
        <RevealOnScroll delay={0}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-amber-500 font-extrabold tracking-tight mb-10 text-center">
            Contact Us
          </h1>
        </RevealOnScroll>

        {/* ✅ Success Banner */}
        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-100 border border-green-400 text-green-800 dark:bg-green-900/40 dark:border-green-700 dark:text-green-300">
            ✅ Your message has been sent successfully! We’ll get back to you soon.
          </div>
        )}

        <RevealOnScroll delay={0.1}>
          <form
            action="https://formsubmit.co/vrajhimesh@gmail.com"
            method="POST"
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-gray-50 dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-100 
                focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            {/* Email */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-gray-50 dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-100 
                focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            {/* Phone */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-gray-50 dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-100 
                focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            {/* Message */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows="6"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-gray-50 dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-100 
                focus:ring-2 focus:ring-amber-500 outline-none resize-none"
              ></textarea>
            </div>

            {/* Hidden fields */}
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_next"
              value="https://www.himeshvenk.com/Contact?success=true"
            />
            <input
              type="hidden"
              name="_subject"
              value="📩 New Contact Form Message"
            />

            {/* Submit */}
            <div className="col-span-1 sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium text-lg 
                px-6 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-md"
              >
                Send Message
              </button>
            </div>
          </form>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <Link
            href={"/"}
            className="bg-gray-200 dark:bg-gray-700 mt-8 hover:bg-gray-300 dark:hover:bg-gray-600 
            text-gray-800 dark:text-gray-200 font-medium text-lg px-6 py-3 rounded-lg 
            transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center shadow-md block mx-auto"
          >
            Go Back Home
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}

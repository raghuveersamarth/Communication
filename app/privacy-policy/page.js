"use client";
import React from "react";
import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function PrivacyPolicy() {
  return (
    <section
      className={`flex justify-center items-start min-h-screen px-4 sm:px-8 lg:px-12 py-10 ${inter.className}`}
    >
      <div className="w-full max-w-6xl bg-white dark:bg-[#232323] rounded-2xl shadow-xl py-12 px-6 sm:px-10 lg:px-16">
        {/* Title */}
        <RevealOnScroll delay={0}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-amber-500 font-extrabold tracking-tight mb-12 text-center">
            Privacy Policy
          </h1>
        </RevealOnScroll>

        {/* Content */}
        <div className="space-y-10 text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          <RevealOnScroll delay={0.1}>
            <p>
              At{" "}
              <span className="font-semibold text-primary-700 dark:text-primary-300">
                Communication Mastery Mechanics
              </span>
              , we respect your privacy and are committed to protecting your
              personal information. This Privacy Policy explains how we collect,
              use, and safeguard your data when you access our courses and
              website.
            </p>
          </RevealOnScroll>
          <div>
            <RevealOnScroll delay={0.2}>
              <h2 className="text-2xl lg:text-3xl font-bold text-amber-600 mb-4">
                1. Information We Collect
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Email Address:</strong> We collect your Gmail ID
                  during registration and payment to grant you course access and
                  share updates.
                </li>
                <li>
                  <strong>Phone Number:</strong> Used for verification and
                  communication related to your course access.
                </li>
                <li>
                  <strong>Payment Details:</strong> Processed securely through
                  Razorpay. We do not store your card or payment information.
                </li>
                <li>
                  <strong>No Cookies:</strong> We do not use cookies or trackers
                  on our platform.
                </li>
              </ul>
            </RevealOnScroll>
          </div>

          <div>
            <RevealOnScroll delay={0.3}>
              <h2 className="text-2xl lg:text-3xl font-bold text-amber-600 mb-4">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide you with access to purchased course content.</li>
                <li>To verify your identity and maintain account security.</li>
                <li>
                  To send important updates, confirmations, or notices related
                  to your purchase.
                </li>
                <li>To comply with legal and regulatory requirements.</li>
              </ul>
            </RevealOnScroll>
          </div>

          <div>
            <RevealOnScroll delay={0.4}>
              <h2 className="text-2xl lg:text-3xl font-bold text-amber-600 mb-4">
                3. Data Storage and Security
              </h2>
              <p>
                Your personal information is securely stored in our database
                hosted on Supabase. We take appropriate technical and
                organizational measures to protect your information. However, no
                method of electronic storage or transmission over the internet
                is completely secure, and we cannot guarantee absolute security.
              </p>
            </RevealOnScroll>
          </div>

          <div>
            <RevealOnScroll delay={0.5}>
              <h2 className="text-2xl lg:text-3xl font-bold text-amber-600 mb-4">
                4. Payments
              </h2>
              <p>
                All payments are processed through <strong>Razorpay</strong>. We
                do not directly store your financial details. Razorpay’s own
                privacy and security policies apply to your payment
                transactions.
              </p>
            </RevealOnScroll>
          </div>

          <div>
            <RevealOnScroll delay={0.6}>
              <h2 className="text-2xl lg:text-3xl font-bold text-amber-600 mb-4">
                5. No Refund Policy
              </h2>
              <p>
                As stated in our Refund & Cancellation Policy, all purchases are
                final. Once you enroll and complete your payment, you will
                receive immediate course access, and no refunds or cancellations
                will be provided under any circumstances.
              </p>
            </RevealOnScroll>
          </div>

          <div>
            <RevealOnScroll delay={0.7}>
              <h2 className="text-2xl lg:text-3xl font-bold text-amber-600 mb-4">
                6. User Responsibility & Disclaimer
              </h2>
              <p>
                By accessing and using our website, you acknowledge and agree
                that you are doing so at your own risk. We provide educational
                content “as is” without warranties of any kind. We are not
                liable for any damages, losses, or issues arising from the use
                of our platform, courses, or services.
              </p>
            </RevealOnScroll>
          </div>

          <div>
            <RevealOnScroll delay={0.8}>
              <h2 className="text-2xl lg:text-3xl font-bold text-amber-600 mb-4">
                7. Changes to This Policy
              </h2>
              <p>
                We reserve the right to update or modify this Privacy Policy at
                any time. If changes are made, we will notify users via email or
                a notice on our website. Your continued use of our services
                after updates constitutes acceptance of the revised policy.
              </p>
            </RevealOnScroll>
          </div>

          <div>
            <RevealOnScroll delay={0.9}>
              <h2 className="text-2xl lg:text-3xl font-bold text-amber-600 mb-4">
                8. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy or your
                data, please contact us at:{" "}
                <a
                  href="mailto:vrajhimesh@gmail.com"
                  className="font-medium text-primary-700 dark:text-primary-300 underline"
                >
                  vrajhimesh@gmail.com
                </a>
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* Back button */}
        <RevealOnScroll delay={0.3}>
          <Link
            href={"/"}
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium text-lg px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center shadow-md block mx-auto mt-12"
          >
            Go Back Home
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}

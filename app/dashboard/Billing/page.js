"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import RevealOnScroll from "@/components/RevealOnScroll";
import { supabase } from "@/app/lib/supabase";
import Script from "next/script";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import Link from "next/link";
import "react-phone-input-2/lib/style.css";

const inter = Inter({ subsets: ["latin"], weight: "200", display: "swap" });

const BillingForm = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) router.push("/");
    };
    checkSession();
  }, [router]);

  const handlePhoneChange = (value) => {
    handleChange({ target: { name: "phone", value } });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isPasswordValid = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[!@#$%^&*]/.test(password) &&
      /\d/.test(password)
    );
  };

  const isFormIncomplete = Object.values(form).some((value) => !value);
  const passwordsMatch = form.password === form.confirmPassword;
  const passwordMeetsRequirements = isPasswordValid(form.password);
  const showPasswordError = form.password && !passwordMeetsRequirements;
  const showConfirmPasswordError = form.confirmPassword && !passwordsMatch;

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!window.Razorpay) {
      alert("Payment system failed to load. Please refresh the page.");
      return;
    }

    setIsLoading(true);
    try {
      const checkRes = await fetch("/api/Checkuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          username: form.username,
          phone: form.phone,
        }),
      });

      const { exists } = await checkRes.json();
      if (exists) {
        alert("User with this email or phone number already exists");
        return;
      }

      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: "comm-course",
          amount: 18397,
          email: form.email,
          username: form.username,
          phone: form.phone,
          password: form.password,
        }),
      });

      const { orderId, error: orderError } = await orderRes.json();
      if (orderError || !orderId) {
        throw new Error(orderError || "Failed to create payment order");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: 18397 * 100,
        currency: "INR",
        order_id: orderId,
        name: "Communication Course",
        description: "One-time payment",
        notes: {
          courseId: "comm-course",
          email: form.email,
          phone: form.phone,
          username: form.username,
        },
        handler: (response) => {
          router.push(
            `/payment-success?payment_id=${response.razorpay_payment_id}`
          );
        },
        prefill: {
          name: form.username,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#e49e12",
          hide_topbar: true,
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
          },
        },
      };
      localStorage.setItem(
        "user token",
        JSON.stringify({
          email: form.email,
          username: form.username,
          password: form.password,
          phone: form.phone,
        })
      );
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert(`Payment failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onError={() => console.error("Failed to load Razorpay script")}
      />

      <div
        className={`${inter.className} mt-8 border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 bg-[#101010] flex flex-col items-center p-4 sm:p-6 justify-center w-full max-w-[100vw] sm:max-w-lg min-h-[70vh]`}
      >
        <h1 className="mb-8 font-bold text-xl sm:text-3xl text-center">
          Create an account
        </h1>

        <form
          onSubmit={handlePayment}
          className="flex flex-col items-center gap-4 w-full"
        >
          {/* Username */}
          <RevealOnScroll delay={0.2}>
            <input
              className="mb-2 py-3 px-6 w-full bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 focus:outline-none focus:ring-1 focus:ring-amber-500 text-base"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              minLength={3}
              style={{ minWidth: 0 }}
              size={40}
            />
          </RevealOnScroll>

          <RevealOnScroll delay={0.4}>
            <PhoneInput
              country={"in"}
              value={form.phone}
              onChange={handlePhoneChange}
              inputProps={{
                name: "phone",
                required: true,
                size: 40,
              }}
              containerClass="relative mb-2 w-full"
              inputClass=" !pl-15 !text-white !bg-[#202020] !border !border-gray-700 !rounded-2xl !py-3 !pr-4 !w-full shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:!border-amber-500/30 focus:!outline-none focus:!ring-1 focus:!ring-amber-500 placeholder:!text-gray-400 !text-base"
              buttonClass="!bg-[#202020] !border-gray-700 hover:!border-amber-500/30 focus:!ring-amber-500 !left-3"
              dropdownClass="!bg-[#202020] text-white"
              placeholder="Enter your phone number"
              style={{ minWidth: 0 }}
            />
          </RevealOnScroll>

          {/* Email */}
          <RevealOnScroll delay={0.6}>
            <input
              className="mb-2 py-3 px-6 w-full bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 focus:outline-none focus:ring-1 focus:ring-amber-500 text-base"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={{ minWidth: 0 }}
              size={40}
            />
          </RevealOnScroll>

          {/* Password */}
          <RevealOnScroll delay={0.8}>
            <div className="relative w-full">
              <input
                className="mb-2 py-3 px-6 w-full bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 focus:outline-none focus:ring-1 focus:ring-amber-500 text-base"
                name="password"
                type={passwordVisible ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                minLength={8}
                style={{ minWidth: 0 }}
                size={40}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-amber-500 transition-colors"
                tabIndex={-1}
              >
                <Image
                  src={passwordVisible ? "/svgs/eyes.svg" : "/svgs/eyesnot.svg"}
                  alt="Toggle password"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </RevealOnScroll>

          {showPasswordError && (
            <div className="w-full text-red-500 text-sm">
              Password must contain: 1 special character, 1 capital letter and
              one number
            </div>
          )}

          {/* Confirm Password */}
          <RevealOnScroll delay={0.8}>
            <div className="relative w-full">
              <input
                className="mb-2 py-3 px-6 w-full bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 focus:outline-none focus:ring-1 focus:ring-amber-500 text-base"
                name="confirmPassword"
                type={confirmPasswordVisible ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
                style={{ minWidth: 0 }}
                size={40}
              />

              <button
                type="button"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                className="absolute right-3 top-3.5 text-gray-400 hover:text-amber-500 transition-colors"
                tabIndex={-1}
              >
                <Image
                  src={
                    confirmPasswordVisible
                      ? "/svgs/eyes.svg"
                      : "/svgs/eyesnot.svg"
                  }
                  alt="Toggle confirm password"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </RevealOnScroll>

          {/* Terms */}
          <RevealOnScroll delay={0.95}>
            <div className="flex flex-col items-center mb-2 mt-2 w-full">
              <div className="flex items-center justify-center w-full">
                <input
                  type="checkbox"
                  id="terms"
                  checked={form.termsAccepted || false}
                  onChange={(e) =>
                    setForm({ ...form, termsAccepted: e.target.checked })
                  }
                  className="mr-2 accent-amber-500"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  I have read and agree to the{" "}
                  <Link
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-500 underline hover:text-amber-400"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            </div>
          </RevealOnScroll>

          {showConfirmPasswordError && (
            <div className="w-full text-center text-red-500 text-sm">
              Passwords do not match
            </div>
          )}

          <RevealOnScroll delay={1.0}>
            <button
              type="submit"
              className={`mt-4 border border-amber-500 text-white py-3 px-4 rounded-lg transition-colors font-medium w-full text-base ${
                isLoading
                  ? "bg-amber-600/50 cursor-not-allowed"
                  : "hover:bg-amber-600 cursor-pointer"
              } ${
                isFormIncomplete ||
                !passwordsMatch ||
                !passwordMeetsRequirements
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={
                isLoading ||
                isFormIncomplete ||
                !passwordsMatch ||
                !passwordMeetsRequirements
              }
              style={{ minWidth: 0 }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Redirect to payment and pay ₹18397"
              )}
            </button>
          </RevealOnScroll>
        </form>
      </div>
    </>
  );
};

export default BillingForm;

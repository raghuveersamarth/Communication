"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import RevealOnScroll from "@/components/RevealOnScroll";
import { supabase } from "@/app/lib/supabase";
import Script from "next/script";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
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
  // Check for existing session
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
  handleChange({ target: { name: 'phone', value } });
};
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Password validation rules
  const isPasswordValid = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[!@#$%^&*]/.test(password) &&
      /\d/.test(password)
    );
  };

  // Form validation states
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
      // Check if user exists
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

      // Create Razorpay order
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

      // Initialize Razorpay checkout
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
          contact: form.phone, // Add if you collect phone numbers
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
      const setitem = localStorage.setItem(
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
    // console.log("Payment button clicked", form);
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onError={() => console.error("Failed to load Razorpay script")}
      />

      <div
        className={`${inter.className} mt-16 border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 h-[600px] w-[800px] bg-[#101010] flex flex-col items-center p-6 justify-center`}
      >
        <h1 className="mb-12 font-bold text-3xl">Create an account</h1>

        <form
          onSubmit={handlePayment}
          className="flex flex-col items-center gap-4 w-full"
        >
          {/* Username Field */}
          <RevealOnScroll delay={0.2}>
            <input
              className="mb-4 p-3 w-[350px] bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 focus:outline-none focus:ring-1 focus:ring-amber-500"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              minLength={3}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.4}>
            <PhoneInput
              country={"in"}
              value={form.phone}
              onChange={ handlePhoneChange}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              containerClass="relative mb-4 w-[350px] "
              inputClass="!text-white !bg-[#202020] !border !border-gray-700 !rounded-2xl p-6 !w-[350px] shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-gray-400"
              buttonClass="!bg-[#202020] !border-gray-700 hover:!border-amber-500/30 focus:!ring-amber-500"
              dropdownClass="!bg-[#202020] text-white"
              placeholder="Enter your phone number"
            />
            {/* <input
              className="mb-4 p-3 w-[350px] bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 focus:outline-none focus:ring-1 focus:ring-amber-500"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            /> */}
          </RevealOnScroll>

          {/* Email Field */}
          <RevealOnScroll delay={0.6}>
            <input
              className="mb-4 p-3 w-[350px] bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 focus:outline-none focus:ring-1 focus:ring-amber-500"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </RevealOnScroll>

          {/* Password Field */}
          <RevealOnScroll delay={0.8}>
            <div className="relative w-full max-w-[400px]">
              <input
                className="mb-4 p-3 w-[350px] bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 focus:outline-none focus:ring-1 focus:ring-amber-500"
                name="password"
                type={passwordVisible ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-amber-500 transition-colors"
              >
                {passwordVisible ? (
                  <Image
                    src="/svgs/eyes.svg"
                    alt="Hide"
                    width={20}
                    height={20}
                  />
                ) : (
                  <Image
                    src="/svgs/eyesnot.svg"
                    alt="Show"
                    width={20}
                    height={20}
                  />
                )}
              </button>
            </div>
          </RevealOnScroll>

          {showPasswordError && (
            <div className="w-full max-w-[300px] text-red-500 text-sm">
              Password must contain: 1 special character, 1 capital letter and
              one Number
            </div>
          )}

          {/* Confirm Password Field */}
          <RevealOnScroll delay={0.8}>
            <div className="relative w-full max-w-[400px]">
              <input
                className="mb-4 p-3 w-[350px] bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 focus:outline-none focus:ring-1 focus:ring-amber-500"
                name="confirmPassword"
                type={confirmPasswordVisible ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                className="absolute right-3 top-3.5 text-gray-400 hover:text-amber-500 transition-colors"
              >
                {confirmPasswordVisible ? (
                  <Image
                    src="/svgs/eyes.svg"
                    alt="Hide"
                    width={20}
                    height={20}
                  />
                ) : (
                  <Image
                    src="/svgs/eyesnot.svg"
                    alt="Show"
                    width={20}
                    height={20}
                  />
                )}
              </button>
            </div>
          </RevealOnScroll>

          {showConfirmPasswordError && (
            <div className="w-full max-w-[400px] text-red-500 text-sm">
              Passwords do not match
            </div>
          )}

          {/* Submit Button */}
          <RevealOnScroll delay={1.0}>
            <button
              type="submit"
              className={`mt-4 border border-amber-500 text-white px-8 py-3 rounded-lg transition-colors font-medium w-full max-w-[400px] ${
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
        <button onClick={()=>console.log(form)}>form</button>
      </div>
    </>
  );
};

export default BillingForm;

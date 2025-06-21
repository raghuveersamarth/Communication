"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import RevealOnScroll from "@/components/RevealOnScroll";
import CheckoutButton from "@/components/CheckoutButton";

const inter = Inter({
  subsets: ["latin"],
  weight: "200",
  display: "swap",
});

const BillingForm = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Password validation checks
  const isPasswordValid = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const hasNumber = /\d/.test(password);
    return minLength && hasUpperCase && hasSpecialChar && hasNumber;
  };

  // Form validation states
  const isFormIncomplete =
    !form.username || !form.email || !form.password || !form.confirmPassword;

  const passwordsMatch =
    form.password &&
    form.confirmPassword &&
    form.password === form.confirmPassword;

  const passwordMeetsRequirements =
    form.password && isPasswordValid(form.password);

  const showPasswordError = form.password && !isPasswordValid(form.password);

  const showConfirmPasswordError = form.confirmPassword && !passwordsMatch;

  const UserActivation = (e) => {
    let ndata = Object.fromEntries(e);
    console.log(ndata);
  };

  return (
    <div
      className={`${inter.className} mt-16 border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30 h-[600px] w-[600px] bg-[#101010] flex flex-col items-center p-6 justify-center`}
    >
      <h1 className="mb-12 font-bold text-3xl">Create an account</h1>
      <form
        action={UserActivation}
        className="flex flex-col items-center gap-4"
      >
        {/* Username Field */}
        <label>
          <RevealOnScroll delay={0.2}>
            <input
              className="mb-4 p-2 w-[400px] bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </RevealOnScroll>
        </label>

        {/* Email Field */}
        <label>
          <RevealOnScroll delay={0.4}>
            <input
              className="mb-4 p-2 w-[400px] bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </RevealOnScroll>
        </label>

        {/* Password Field */}
        <label>
          <RevealOnScroll delay={0.6}>
            <input
              className="mb-4 p-2 w-[400px] bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a Password"
              required
            />
          </RevealOnScroll>
        </label>

        {/* Password Requirements Error */}
        {showPasswordError && (
          <div className="w-[70%]">
            <p className="text-red-500 text-[15px]">Password must contain: 1 special character, 1 capital letter and one Number</p>
          </div>
        )}

        {/* Confirm Password Field */}
        <label>
          <RevealOnScroll delay={0.8}>
            <input
              className="mb-4 p-2 w-[400px] bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </RevealOnScroll>
        </label>

        {/* Password Match Error */}
        {showConfirmPasswordError && (
          <p className="text-red-500">Passwords don't match</p>
        )}

        {/* Checkout Button */}
        <RevealOnScroll delay={1.0}>
          <CheckoutButton
            className=""
            course={{ id: 1, title: "Sample Course", price: 18397 }}
            disabled={
              isFormIncomplete || !passwordsMatch || !passwordMeetsRequirements
            }
          />
        </RevealOnScroll>
      </form>
    </div>
  );
};

export default BillingForm;

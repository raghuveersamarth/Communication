"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import RevealOnScroll from "@/components/RevealOnScroll";
import CheckoutButton from "@/components/CheckoutButton";
import { supabase } from "@/app/lib/supabase";

const inter = Inter({
  subsets: ["latin"],
  weight: "200",
  display: "swap",
});

const BillingForm = () => {
  const [passwordseen, setpasswordseen] = useState(false);
  const [passwordseen2, setpasswordseen2] = useState(false);
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

 const UserActivation = async (e) => {

    try {
      // 1. Register the user
      const { data: { user }, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            username: form.username,
            // Add any other user metadata here
          }
        }
      });

      if (authError) throw authError;

      // 2. Create Razorpay order (only if registration succeeded)
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: "comm-course", // Your course ID
          userId: user.id,         // From Supabase auth
          amount: 18397           // ₹18,397 in paise
        })
      });

      const { orderId, error: orderError } = await res.json();
      if (orderError) throw new Error(orderError);

      // 3. Open Razorpay payment modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: 18397 * 100,
        currency: "INR",
        order_id: orderId,
        name: "Communication Course",
        description: "One-time payment",
        handler: function(response) {
          // Payment succeeded - webhook will handle the rest
          window.location.href = `/payment-success?payment_id=${response.razorpay_payment_id}`;
        },
        prefill: {
          name: form.username,
          email: form.email
        },
        theme: { color: "#F37254" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error(error);
    }
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
            <div className="relative">

            <input
              className=" mb-4 p-2 w-[400px] bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30"
              name="password"
              type={passwordseen?"password":"text"}
              value={form.password}
              onChange={handleChange}
              placeholder="Create a Password"
              required
              />
            <Image onClick={()=>setpasswordseen(!passwordseen)} className="absolute cursor-pointer top-[10px] left-[370px]"  src={ passwordseen?"/svgs/eyes.svg":"/svgs/eyesnot.svg"} alt="eyes" width={20} height={20} />
              </div>
          </RevealOnScroll>
        </label>

        {/* Password Requirements Error */}
        {showPasswordError && (
          <div className="w-[70%]">
            <p className="text-red-500 text-[15px]">
              Password must contain: 1 special character, 1 capital letter and
              one Number
            </p>
          </div>
        )}

        {/* Confirm Password Field */}
        <label>
          <RevealOnScroll delay={0.6}>
            <div className="relative">

            <input
              className=" mb-4 p-2 w-[400px] bg-[#202020] text-white border border-gray-700 rounded-2xl shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:border-amber-500/30"
              name="confirmPassword"
              type={passwordseen2?"password":"text"}
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              />
            <Image onClick={()=>setpasswordseen2(!passwordseen2)} className="absolute cursor-pointer top-[10px] left-[370px]"  src={ passwordseen2?"/svgs/eyes.svg":"/svgs/eyesnot.svg"} alt="eyes" width={20} height={20} />
              </div>
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

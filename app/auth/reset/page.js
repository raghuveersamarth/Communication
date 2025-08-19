"use client";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Image from "next/image";

export default function ResetPasswordPage() {
  const [showLogin, SetShowlogin] = useState(false);
  const [seepassword, setseepassword] = useState(false)
  const [seeconpassword, setseeconpassword] = useState(false)
  const [form, setform] = useState({
    password: "",
    confirmPassword: "",
  });

  // Password validation function
  const isValidPassword = (password) => {
    // At least one uppercase, one number, one special character, min 8 chars
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
  };

  const handlechange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlepasschange = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match")
      
      return;
    }
    if (!isValidPassword(form.password)) {
      alert("Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.");
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: form.password });
    if (error) {
      alert("Error updating password: " + error.message);
      return;
    }
    SetShowlogin(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br">
      <form
        className="bg-[#252525] p-8 rounded-xl shadow-lg flex flex-col gap-5 w-full max-w-sm sm:p-6"
        onSubmit={handlepasschange}
      >
        <h2 className="text-2xl font-semibold text-amber-500 text-center mb-2">
          Reset Password
        </h2>
        <div className="relative">

        <input
          type={seepassword?"text":"password"}
          name="password"
          placeholder="New Password"
          value={form.password}
          onChange={handlechange}
          className="p-3 border border-gray-300 rounded-lg text-base outline-none focus:border-amber-500 transition"
          required
          />
        <Image className="absolute top-3 left-44 cursor-pointer" onClick={()=>setseepassword(!seepassword)} src={seepassword?"/svgs/eyes.svg":"/svgs/eyesnot.svg"} alt="eyes" height={25} width={25}/>
          </div>
        <div className="relative">

        <input
          type={seeconpassword?"text":"password"}
          name="confirmPassword"
          placeholder="confirm Password"
          value={form.confirmPassword}
          onChange={handlechange}
          className="p-3 border border-gray-300 rounded-lg text-base outline-none focus:border-amber-500 transition"
          required
          />
        <Image className="absolute top-3 left-44 cursor-pointer" onClick={()=>setseeconpassword(!seeconpassword)} src={seeconpassword?"/svgs/eyes.svg":"/svgs/eyesnot.svg"} alt="eyes" height={25} width={25}/>
          </div>
        <button
          type="submit"
          className="bg-amber-500 text-white rounded-lg p-3 text-base font-medium hover:bg-amber-600 transition"
        >
          Reset Password
        </button>
      </form>
      {showLogin && (
        <div className="mt-6 bg-indigo-100 p-5 rounded-lg text-center shadow-md w-full max-w-sm">
          <p className="text-gray-700">Password reset successfully! You can now log in.</p>
          <button
            className="mt-3 bg-emerald-500 text-white rounded-lg px-5 py-2 text-base font-medium hover:bg-emerald-600 transition"
            onClick={() => (window.location.href = "/dashboard/Login")}
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
}

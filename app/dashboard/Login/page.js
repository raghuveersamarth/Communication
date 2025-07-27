"use client";
import React,{useState,useEffect} from "react";
import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
});
const Login = () => {
  const router = useRouter()
  const [form, setform] = useState({"email":"","password":""})
  const [session, setsession] = useState({})
  const [error, seterror] = useState(false);
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
  const handlelogin = async()=>{
    const {data:{session}, error} = await supabase.auth.signInWithPassword({
      email: form.email,
      password:form.password
    })
    if (error) {
      seterror(true)
    }
    else{
      setsession(session);
      router.push("/")
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.2,        // Slower entrance
        delay: 0.2,           // Small delay for drama
        ease: [0.22, 1, 0.36, 1], // Smooth, natural curve
      }}
    >
      <div
        className={
          "flex flex-col font-light items-center justify-center min-h-screen " +
          inter.className
        }
      >
        <h1 className="text-4xl font-bold text-[#fca000] mb-8">
          Welcome back!
        </h1>
        <form
          className="bg-[#191919] p-8 rounded-lg shadow-md w-96"
          onSubmit={e => {
            e.preventDefault();
            handlelogin();
          }}
        >
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={e => setform({ ...form, [e.target.name]: e.target.value })}
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={e => setform({ ...form, [e.target.name]: e.target.value })}
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4"> 
            Invalid email or password. Please try again.
          </p>
          )}
          <button
            className="w-full bg-[#fca000] cursor-pointer text-white py-2 rounded hover:bg-[#ffc67b] transition duration-200"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="activities">
          <p className="text-center text-white mt-4">
            Forgot your password?{" "}
            <a
              href="/auth/forgot-password"
              className="text-[#fca000] hover:underline"
            >
              Reset it
            </a>
          </p>
          <p className="text-center text-white mt-4">
            Don't have an account?
            <a
              href="/dashboard/Plan"
              className="text-[#fca000] hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;

"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollProgressBar from "./ScrollProgressbar";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const hiddenRoutes = [
    "/Courses",
    "about",
    "/dashboard/Billing",
    "/dashboard/Plan",
    "/Login",
    "/Signup",
    "/ResetPassword",
  ];
  const pathname = usePathname();
  console.log("Current Pathname:", pathname);

  if (hiddenRoutes.includes(pathname)) {
    console.log("Navbar is hidden for this route:", pathname);
    return null;
  }
  return (
    <>
      <motion.nav
        animate={{ rotate: "180deg`" }}
        className=" text-white p-4 shadow-lg fixed top-0 w-full transition-colors duration-300 bg-transparent backdrop-blur-md "
      >
        <ScrollProgressBar />
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link href="/" className="text-[#fca000] hover:text-gray-300">
              COMMUNICATION
            </Link>
          </div>
          <div className="space-x-4">
            <Link
              href="/Courses"
              className="text-[#fca000] hover:text-gray-300"
            >
              Explore courses
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300">
              About
            </Link>
            <Link href="/Contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
            <Link href="/Login" className="text-white hover:text-gray-300">
              Login
            </Link>
            <Link
              href="/dashboard/Plan"
              className="text-white hover:text-gray-300"
            >
              <button className="bg-[#fca000] text-white rounded-lg py-1 px-2  hover:bg-[#f9c388] transition cursor-pointer duration-300">
                Join
              </button>
            </Link>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;

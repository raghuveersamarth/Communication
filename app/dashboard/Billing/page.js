"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import RevealOnScroll from "@/components/RevealOnScroll";

const inter = Inter({
  subsets: ["latin"],
  weight: "200",
  display: "swap",
});

const BillingForm = () => {


  return (
    <div className={`${inter.className}`}>
  
    </div>
  );
};

export default BillingForm;
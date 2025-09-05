"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "../context/sessionwrapper";
import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";

const Discord = () => {
  const { session, loading } = useSession();
  return (
    <div>
      {session ? (
        <RevealOnScroll delay={0.5}>
          <div className="min-h-screen  flex items-center justify-center px-4">
            <div className="bg-[#1c1c1c] text-white rounded-xl p-6 w-full max-w-md shadow-lg text-center">
              <Image
                src="/him2.jpg" // Replace with your server icon
                alt="Community Logo"
                width={80}
                height={80}
                className="mx-auto mb-4 rounded-full"
              />

              <p className="text-gray-400 text-sm">
                You've been invited to join
              </p>
              <h2 className="text-2xl font-bold mt-1 mb-4">
                Communication Mastery Mechanics
              </h2>

              <div className="flex gap-4 justify-center text-sm text-gray-400 mb-6"></div>

              <a
                href="https://discord.gg/bC25FHwd" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                Join on Discord
              </a>
            </div>
          </div>
        </RevealOnScroll>
      ) : (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 to-gray-100 px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Please log in to access Discord
          </h1>
        </div>
      )}
    </div>
  );
};

export default Discord;

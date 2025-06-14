"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useScroll from "framer-motion"
import Footer from "@/components/Footer";


export default function Home() {

   return (
    <>

      <div
        className="flex text-[]   flex-col items-center gap-28 min-h-screen bg-[#000000] [background:radial-gradient(190%_170%_at_50%_5%,#101010_50%,#fd9800_100%)]"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          minHeight: "100vh",
          width: "100vw",
          overflow: "auto",
        }}
      >
        <section className="video mt-16">
          <div className="heading font-serif  text-[37px] text-[hsl(36,100%,50%)] text-center text-4xl">
            {/* <img src="" alt="" /> */}
            <h1>Communication Mastery</h1>
          </div>
          <div className="intro-video flex flex-col items-center justify-center min-h-screen ">
            <video
              className="w-[50vw] rounded-2xl shadow-lg"
              src="/videos/himeshvid.mp4"
              controls
            ></video>

            <button className="bg-[#fca000] text-white text-[24px] px-6 py-2 rounded-lg mt-6 hover:bg-[#f9c388] transition cursor-pointer w-[30rem] duration-300">
              <Link href="/Signup" className="text-white">
                Join
              </Link>
            </button>
          </div>
        </section>
        <section className="offers text-center">
          <h1 className="m-1.5">
            <span className="text-2xl m-7 font-bold text-[#fca000]">
              What you will learn
            </span>
          </h1>
          <div className=" flex gap-10 flex-col">
            <div className="floater justify-between flex flex-col bg-[#141414] text-white p-6 rounded-[20px] shadow-lg m-4">
              <div className="flex items-center w-[45vw] justify-around p-1.5">
                <img src="https://img-v2-prod.whop.com/unsafe/rs:fit:128:0/plain/https%3A%2F%2Fassets-2-prod.whop.com%2Fuploads%2Fuser_14390386%2Fimage%2Fexperiences%2F2025-05-22%2F827feabd-111a-494d-9a26-1091cc8e025f@avif" />
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold ">Communication course</h2>
                  <p className="text-lg text-[#a3a3a3]">
                    Turn stutters into strength. Speak clearly, confidently, and
                    lead every room you enter.
                  </p>
                </div>
              </div>
            </div>
            <div className="floater justify-between flex flex-col bg-[#141414] text-white p-6 rounded-[20px] shadow-lg m-4">
              <div className="flex items-center w-[45vw] justify-around p-1.5">
                <img
                  src="https://img-v2-prod.whop.com/unsafe/rs:fit:128:0/plain/https%3A%2F%2Fassets-2-prod.whop.com%2Fuploads%2Fuser_14390386%2Fimage%2Fexperiences%2F2025-05-22%2F7ee05cd3-0052-4719-ade0-9b977826e9eb@avif"
                  className="w-[120px]"
                />
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold ">
                    Communication course chat
                  </h2>
                  <p className="text-lg text-[#a3a3a3]">
                    Share lessons, ask questions, and grow your communication
                    with others.
                  </p>
                </div>
              </div>
            </div>
            <div className="floater justify-between flex flex-col bg-[#141414] text-white p-6 rounded-[20px] shadow-lg m-4">
              <div className="flex items-center w-[45vw] justify-around p-1.5">
                <img
                  src="https://img-v2-prod.whop.com/unsafe/rs:fit:128:0/plain/https%3A%2F%2Fassets.whop.com%2Fuploads%2F2024-03-07%2Fuser_2412964_7d4ceeef-d234-4c7a-9390-8dc41614f335.png@avif"
                  className="w-[120px] rounded-4xl"
                />
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold ">Events</h2>
                  <p className="text-lg text-[#a3a3a3]">
                    Gain access to in-person and virtual exclusive events.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="who-this-is-for mt-8 flex flex-col items-center justify-center">
          <h1 className=" text-2xl font-bold text-[#fca000] ">
            Whom does it benefit the most?
          </h1>
          <div className="grid m-5 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-6 ">
            <div className="box *:flex flex-col items-center justify-center w-[30vw] bg-[#141414] text-white p-6 rounded-[20px] shadow-lg m-4">
              <h2 className="text-center">shy communicators</h2>
              <p className="text-sm text-[#a3a3a3]">
                For guys who freeze up, stutter, or feel invisible. Learn to
                speak clearly, confidently, and finally be heard.
              </p>
            </div>
            <div className="box *:flex flex-col items-center justify-center w-[30vw] bg-[#141414] text-white p-6 rounded-[20px] shadow-lg m-4">
              <h2 className="text-center">College students</h2>
              <p className="text-sm text-[#a3a3a3]">
                For students with big goals but weak voice. This builds your
                fluency, stage presence, and real-world speaking power.
              </p>
            </div>
            <div className="box *:flex flex-col items-center justify-center w-[30vw] bg-[#141414] text-white p-6 rounded-[20px] shadow-lg m-4">
              <h2 className="text-center">Content creators</h2>
              <p className="text-sm text-[#a3a3a3]">
                For YouTubers or influencers who struggle to speak fluently on
                camera. Learn to own your voice and hook your viewers.
              </p>
            </div>
            <div className="box *:flex flex-col items-center justify-center w-[30vw] bg-[#141414] text-white p-6 rounded-[20px] shadow-lg m-4">
              <h2 className="text-center">Career Climbers</h2>
              <p className="text-sm text-[#a3a3a3]">
                For professionals stuck in silence. Get noticed, speak with
                confidence, and earn the respect that gets promotions.
              </p>
            </div>
            <div className="box *:flex flex-col items-center justify-center w-[30vw] bg-[#141414] text-white p-6 rounded-[20px] shadow-lg m-4">
              <h2 className="text-center">Aspiring entrepreneurs</h2>
              <p className="text-sm text-[#a3a3a3]">
                For dreamers building brands or businesses. This gives you the
                voice, presence, and clarity to pitch, lead, and sell.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 flex flex-col items-center gap-10 justify-center">
          <h1 className="text-2xl text-center font-bold text-[#fd9800]">
            Why this course?
          </h1>
          <div className="flex gap-3.5 flex-col items-center justify-center w-[70vw] mt-4">
            <p className="text-lg text-[#d3d3d3] mb-4">
              This course is designed to help you overcome communication
              barriers and develop the skills needed to express yourself clearly
              and confidently. Whether you struggle with stuttering, shyness, or
              simply want to improve your speaking abilities, this course will
              provide you with the tools and techniques to transform your
              communication style.
            </p>
            <p className="text-lg text-[#d3d3d3]">
              Through a combination of practical exercises, personalized
              coaching, and a supportive community, you will learn how to master
              the art of communication. You will gain the confidence to speak in
              public, engage in conversations, and express your thoughts
              effectively.
            </p>
          </div>
          <h1 className="text-2xl text-center font-bold text-[#fd9800] mt-8 mb-4">
            About the Coach
          </h1>
          <div className="flex gap-5 w-[70vw] rounded-2xl  p-6">
            {/* add coach's photo
             */}
            <img
              src="him.jpg"
              alt="Coach Himesh"
              className="h-[50vh] rounded-lg mb-4"
            ></img>
            <div>
              <h2 className="text-2xl text-[#fd9800] font-bold mb-4">Himesh</h2>
              <p className="text-lg text-[#bcbcbc]">
                I am a passionate coach dedicated to helping individuals
                overcome their communication challenges. With years of
                experience, I specialize in transforming stutters into
                strengths, enabling my clients to speak clearly and confidently.
              </p>
              <p className="mt-4 text-lg text-[#bcbcbc]">
                Join me on this journey to master the art of communication and
                lead every room you enter with confidence.
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

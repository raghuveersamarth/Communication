"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";

const CTAButton = ({ href, children }) => (
  <Link
    href={href}
    className="bg-amber-500 hover:bg-amber-600 text-white font-medium text-lg px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 w-full max-w-xs text-center shadow-md"
  >
    {children}
  </Link>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-[#171717] text-[white] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full border border-gray-100">
    <div className="flex flex-col items-center text-center h-full">
      <img
        src={icon}
        alt={title}
        className="w-16 h-16 mb-4 object-contain"
      />
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-[#c4c4c4] flex-grow">{description}</p>
    </div>
  </div>
);

const BenefitCard = ({ title, description }) => (
  <div className="bg-[#171717] text-[white] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full ">
    <h3 className="text-xl font-bold mb-3 text-center text-[#ffffff]">
      {title}
    </h3>
    <p className="text-[#c4c4c4] text-center">{description}</p>
  </div>
);

export default function Home() {
  const features = [
    {
      icon: "/images/communication-icon.png",
      title: "Communication Course",
      description: "Turn stutters into strength. Speak clearly, confidently, and lead every room you enter.",
    },
    {
      icon: "/images/chat-icon.png",
      title: "Community Chat",
      description: "Share lessons, ask questions, and grow your communication with others.",
    },
    {
      icon: "/images/events-icon.png",
      title: "Exclusive Events",
      description: "Gain access to in-person and virtual events with industry leaders.",
    },
  ];

  const benefits = [
    {
      title: "Shy Communicators",
      description: "For those who freeze up or feel invisible. Learn to speak clearly and finally be heard.",
    },
    {
      title: "College Students",
      description: "Build fluency, stage presence, and real-world speaking power for your future.",
    },
    {
      title: "Content Creators",
      description: "Struggle to speak fluently on camera? Learn to own your voice and hook your viewers.",
    },
    {
      title: "Career Climbers",
      description: "Get noticed, speak with confidence, and earn the respect that gets promotions.",
    },
    {
      title: "Aspiring Entrepreneurs",
      description: "Gain the voice, presence, and clarity to pitch, lead, and sell your vision.",
    },
    {
      title: "Public Speakers",
      description: "Refine your delivery, overcome anxiety, and captivate any audience.",
    },
  ];

  return (
    <main className="relative text-gray-800 ">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-16 pb-28 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-500 mb-8">
            Communication Mastery
          </h1>
          <p className="text-lg md:text-xl text-white mb-12 max-w-2xl mx-auto">
            Transform your speaking skills and command every conversation with
            confidence
          </p>

          <div className="flex flex-col items-center">
            <div className="w-full max-w-4xl aspect-video rounded-xl  shadow-2xl mb-8 border-2 ">
              <video
                className="w-full h-full object-cover"
                src="https://youtu.be/nGyVjye1IUc"
                controls
                poster="/images/video-poster.jpg"
                preload="metadata"
                playsInline
              />
            </div>

            <CTAButton href="/dashboard/Billing">
              Join Now
            </CTAButton>
          </div>
        </motion.div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-20 flex flex-col items-center justify-center px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <h2 className="text-3xl font-bold text-amber-500 text-center mb-16">
            What You Will Learn
          </h2>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {features.map((item, index) => (
            <RevealOnScroll key={index} delay={index * 0.2}>
              <FeatureCard {...item} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="flex justify-center mt-12 self-center">
          <CTAButton href="/dashboard/Billing">
            Start Learning
          </CTAButton>
        </RevealOnScroll>
      </section>

      {/* Who Benefits Section */}
      <section className="py-20 px-4  text-[white] flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto mb-20">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold text-amber-500 text-center mb-16">
              Who Benefits Most
            </h2>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((item, index) => (
              <RevealOnScroll key={index} delay={index * 0.2}>
                <BenefitCard {...item} />
              </RevealOnScroll>
            ))}
          </div>
        </div>

        <RevealOnScroll className="flex justify-center mt-12 self-center">
          <CTAButton href="/dashboard/Billing">
            Join Program
          </CTAButton>
        </RevealOnScroll>
      </section>

      {/* Why This Course Section */}
      <section className="py-20 px-4 max-w-5xl mx-auto  text-gray-800 flex flex-col items-center justify-center">
        <RevealOnScroll>
          <h2 className="text-3xl font-bold text-amber-500 text-center mb-12">
            Why This Course?
          </h2>
        </RevealOnScroll>

        <div className="space-y-6 text-lg text-white mb-16">
          <RevealOnScroll>
            <p>
              This comprehensive program is designed to systematically dismantle
              communication barriers while building unshakable confidence.
              Unlike generic public speaking courses, we focus on the root
              causes of speech anxiety and provide targeted solutions that
              deliver real results.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <p>
              Through neuroscience-backed techniques and personalized coaching,
              you'll develop a commanding presence that naturally draws people
              in. Our methods have helped thousands transform from hesitant
              speakers to compelling communicators.
            </p>
          </RevealOnScroll>
        </div>

        {/* Coach Section */}
        <RevealOnScroll>
          <h2 className="text-3xl font-bold text-amber-500 text-center mb-12">
            About Your Coach
          </h2>
        </RevealOnScroll>

        <div className="flex flex-col md:flex-row gap-8 items-center text-[white] p-8 rounded-xl shadow-md">
          <div className="w-full md:w-1/3">
            <img
              src="/him.jpg"
              alt="Coach Himesh"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
              loading="lazy"
            />
          </div>

          <div className="w-full md:w-2/3 space-y-4">
            <h3 className="text-2xl font-bold text-amber-500">Himesh</h3>
            <p className="text-white">
              With over a decade of experience in communication coaching, I've
              dedicated my career to helping individuals find their authentic
              voice. My approach combines proven techniques with personalized
              strategies to address each student's unique challenges.
            </p>
            <p className="text-white">
              I've worked with everyone from Fortune 500 executives to aspiring
              YouTubers, helping them overcome speech anxiety, refine their
              delivery, and develop a magnetic speaking presence.
            </p>
            <p className="text-white font-medium">
              My mission is to equip you with the skills to express yourself
              with clarity, confidence, and conviction in any situation.
            </p>
          </div>
        </div>

        <RevealOnScroll className="flex justify-center mt-16 self-center">
          <CTAButton href="/dashboard/Billing">
            Transform Your Communication
          </CTAButton>
        </RevealOnScroll>
      </section>

      <Footer />
    </main>
  );
}
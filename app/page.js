"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import { supabase } from "./lib/supabase";

const CTAButton = ({ href, children }) => (
  <Link
    href={href}
    className="bg-amber-500 hover:bg-amber-600 text-white font-medium text-lg px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 w-full max-w-xs text-center shadow-md"
  >
    {children}
  </Link>
);

const FeatureCard = ({ src, title, description }) => (
  <div className="bg-[#171717] text-[white] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full border border-gray-100">
    <div className="flex flex-col items-center text-center h-full">
      <lord-icon
        src={src}
        trigger="hover"
        colors="primary:#ffffff,secondary:#eeaa66"
        style={{ width: "120px", height: "100px" }}
      ></lord-icon>
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
  const [session, setSession] = useState(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;
        console.log(session);
        setSession(session);
        setIsSessionActive(
          !!session &&
            ["paid", "completed"].includes(
              session?.user?.user_metadata?.payment_status
            )
        );
      } catch (error) {
        setIsSessionActive(false);
      }
    };
    getSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setIsSessionActive(
        !!session &&
          ["paid", "completed"].includes(
            session?.user?.user_metadata?.payment_status
          )
      );
    });

    return () => subscription?.unsubscribe();
  }, []);
  

  const Lordicon = () => {
    return (
      <lord-icon
        src="https://cdn.lordicon.com/crlbyqpf.json"
        trigger="morph"
        state="morph-down"
        style={{ width: "200px", height: "200px" }}
      ></lord-icon>
    );
  };
  const features = [
    {
      src: "https://cdn.lordicon.com/tulgnpqx.json",
      title: "Communication Course",
      description:
        "13 powerful modules — built from real experience to help you go from awkward to confident, step by step.",
    },
    {
      src: "https://cdn.lordicon.com/tufeszbf.json",
      title: "Community Chat",
      description:
        "A focused space to ask me questions, connect with serious learners, and stay in the loop.",
    },
    {
      src: "https://cdn.lordicon.com/ckdooote.json",
      title: "Communication Challenges",
      description:
        "Practical tasks designed to push you out of your comfort zone and build real speaking confidence.",
    },
    {
      src: "https://cdn.lordicon.com/ygymzvsj.json",
      title: "Transformation Guarantee",
      description:
        "See real change — or stay in the course free until you do. I’m here until it clicks.",
    },
    {
      src: "https://cdn.lordicon.com/aksvbzmu.json",
      title: "1-on-1 Feedback Sessions",
      description:
        "Personalized feedback on your speaking, with direct pointers on what to improve — so you’re not just practicing, you’re progressing with clarity.",
    },
    {
      src: "https://cdn.lordicon.com/twpfmtiv.json",
      title: "Lifetime Access",
      description:
        "See real change — or stay in the course free until you do. I’m here until it clicks.",
    },
  ];

  const benefits = [
    {
      title: "🧑‍💼Working Professionals",
      description:
        "For people who want to speak clearly and confidently at work or in meetings.",
    },
    {
      title: "👔 Business Owners",
      description:
        "For people who need to pitch, lead, and communicate their ideas with impact.",
    },
    {
      title: "🎥 Content Creators",
      description:
        "For people who want to speak fluently on camera and connect better with their audience.",
    },
    {
      title: "🎓 Students",
      description:
        "For people who want to speak up, stand out, and feel confident in any situation",
    },
    {
      title: "🧑‍💻Aspiring Entrepreneurs",
      description:
        "Gain the voice, presence, and clarity to pitch, lead, and sell your vision.",
    },
    {
      title: "🔊Public Speakers",
      description:
        "Refine your delivery, overcome anxiety, and captivate any audience.",
    },
  ];

  return (
    <main className="relative text-gray-800">
      <script src="https://cdn.lordicon.com/lordicon.js"></script>
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center pt-20 pb-32 px-4 md:px-8 lg:px-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-500 mb-10 md:mb-14">
          Communication Mastery Mechanics
        </h1>
        {isSessionActive ? (
          ""
        ) : (
          <p className="text-lg md:text-xl text-white mb-14 md:mb-20 max-w-2xl mx-auto text-center">
            Transform your speaking skills and command every conversation with
            confidence
          </p>
        )}

        <div className="flex flex-col items-center w-full max-w-3xl md:max-w-4xl lg:max-w-[70vw]">
          {isSessionActive ? (
            <div className="flex w-full p-0.5 mb-10 md:mb-16 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full bg-white text-gray-800 rounded-xl shadow-md p-8 md:p-16 lg:p-20 mb-10 border border-gray-200 flex flex-col items-center"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                  Welcome Back!{" "}
                  {session?.user?.user_metadata?.username || "User"}
                </h2>
                <p className="text-lg text-gray-600 mb-6 text-center max-w-2xl">
                  You’ve shown up. Now keep pushing. Every rep — every lesson —
                  makes you a more powerful, confident communicator. Let’s level
                  up your communication game, one push-up at a time.
                </p>
                <Lordicon />
              </motion.div>
            </div>
          ) : (
            <div className="w-full max-w-4xl aspect-video rounded-xl shadow-2xl mb-10 md:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-4xl mx-auto"
              >
                {/* <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/nGyVjye1IUc"
                  title="Hi | Introduction 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{
                    borderRadius: "16px",
                    minHeight: "220px",
                    width: "100%",
                  }}
                  className="w-full h-[220px] md:h-[320px] lg:h-[480px]"
                ></iframe> */}
                <iframe
                  src="https://drive.google.com/file/d/1h38X6_kupefWo8rL7SvWGibRrs1eNZ91/preview"
                  width="800"
                  height="450"
                  allow="autoplay"
                />
              </motion.div>
            </div>
          )}

          <CTAButton href={isSessionActive ? "/Courses" : "/dashboard/Billing"}>
            {isSessionActive ? "Go to courses" : "Join Now"}
          </CTAButton>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-24 md:py-32 flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {isSessionActive ? (
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-500 text-center mb-20 md:mb-24">
              What You Will Master
            </h2>
          </RevealOnScroll>
        ) : (
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-500 text-center mb-20 md:mb-24">
              What all you get
            </h2>
          </RevealOnScroll>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto mb-20 md:mb-24">
          {features.map((item, index) => (
            <RevealOnScroll key={index} delay={index * 0.2}>
              <FeatureCard {...item} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="flex justify-center mt-12 self-center">
          {isSessionActive ? (
            <CTAButton href="/Courses">Start Learning</CTAButton>
          ) : (
            <CTAButton href="/dashboard/Billing">Join Now</CTAButton>
          )}
        </RevealOnScroll>
      </section>

      {/* Who Benefits Section */}
      {!isSessionActive && (
        <section className="py-24 md:py-32 px-4 md:px-8 lg:px-16 text-[white] flex flex-col items-center justify-center">
          <div className="max-w-7xl mx-auto mb-20 md:mb-24">
            <RevealOnScroll>
              <h2 className="text-3xl md:text-4xl font-bold text-amber-500 text-center mb-20 md:mb-24">
                Who is this for
              </h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {benefits.map((item, index) => (
                <RevealOnScroll key={index} delay={index * 0.2}>
                  <BenefitCard {...item} />
                </RevealOnScroll>
              ))}
            </div>
          </div>

          <RevealOnScroll className="flex justify-center mt-12 self-center">
            <CTAButton href="/dashboard/Billing">Join Program</CTAButton>
          </RevealOnScroll>
        </section>
      )}

      {/* Why This Course & Coach Section */}
      {!isSessionActive && (
        <section className="py-24 md:py-32 px-4 md:px-8 lg:px-16 max-w-5xl mx-auto text-gray-800 flex flex-col items-center justify-center">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-500 text-center mb-16 md:mb-20">
              Why This Course?
            </h2>
          </RevealOnScroll>

          <div className="flex flex-col gap-10 md:gap-14 w-full md:w-[60vw] lg:w-[60vw] text-white mb-16 md:mb-20">
            <RevealOnScroll>
              <p className="text-lg md:text-xl leading-relaxed bg-[#18181b] rounded-4xl p-6 md:p-8 shadow">
                This is the only communication system you’ll ever need to go
                from blank mind to magnetic voice in 30 days. No need to read
                100 books or sit through boring public speaking classes.
              </p>
            </RevealOnScroll>
            <RevealOnScroll>
              <p className="text-lg md:text-xl leading-relaxed bg-[#18181b] rounded-4xl p-6 md:p-8 shadow">
                This course is built from real experience. Everything you’ll
                learn is what actually worked for me and my clients.
              </p>
            </RevealOnScroll>
            <RevealOnScroll>
              <p className="text-lg md:text-xl leading-relaxed bg-[#18181b] rounded-4xl p-6 md:p-8 shadow">
                You’ll learn Communication Mechanics — a practical system to
                help you speak fluently, confidently, and with presence.
              </p>
            </RevealOnScroll>
            <RevealOnScroll>
              <p className="text-lg md:text-xl leading-relaxed bg-[#18181b] rounded-4xl p-6 md:p-8 shadow">
                You don’t need hours each day. Just 15 to 20 minutes of focused
                practice is enough to start seeing progress.
              </p>
            </RevealOnScroll>
            <RevealOnScroll>
              <p className="text-lg md:text-xl leading-relaxed bg-[#18181b] rounded-4xl p-6 md:p-8 shadow">
                If you’re ready to speak with clarity and confidence, this is
                the system that will help you do it.
              </p>
            </RevealOnScroll>
          </div>
          {/* Coach Section */}
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-500 text-center mb-16 md:mb-20">
              About Your Coach
            </h2>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-center text-[white] p-8 md:p-12 rounded-xl shadow-md">
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
                  I was born in India, in a place where no one spoke English. I
                  used to stutter, avoid people, and sucked at communication. I
                  built everything from ground zero. Now I speak confidently… No
                  stutters. No fear. I can record long YouTube videos in one
                  take And make people feel emotions through my words. If I can
                  do it, so can you.
                </p>
                <p className="text-white">
                  I've worked with everyone from Fortune 500 executives to
                  aspiring YouTubers, helping them overcome speech anxiety,
                  refine their delivery, and develop a magnetic speaking
                  presence.
                </p>
                <p className="text-white font-medium">
                  My mission is to equip you with the skills to express yourself
                  with clarity, confidence, and conviction in any situation.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="flex justify-center mt-16 self-center">
            <CTAButton href="/dashboard/Billing">
              Transform Your Communication
            </CTAButton>
          </RevealOnScroll>
        </section>
      )}

      <Footer />
    </main>
  );
}

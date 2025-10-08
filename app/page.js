"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import { supabase } from "./lib/supabase";

const inter = Inter({ subsets: ["latin"] });
const CTAButton = ({ href, children }) => (
  <Link
    href={href}
    className="bg-amber-500 hover:bg-amber-600 text-white font-medium text-base md:text-lg px-4 md:px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 w-full max-w-xs text-center shadow-md"
  >
    {children}
  </Link>
);

const FeatureCard = ({ src, title, description }) => (
  <div className="bg-[#171717] text-[white] p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full border border-gray-100">
    <div className="flex flex-col items-center text-center h-full">
      <lord-icon
        src={src}
        trigger="hover"
        colors="primary:#ffffff,secondary:#eeaa66"
        style={{ width: "80px", height: "70px" }}
        class="mb-2"
      ></lord-icon>
      <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white">
        {title}
      </h3>
      <p className="text-[#c4c4c4] flex-grow text-sm md:text-base">
        {description}
      </p>
    </div>
  </div>
);

const BenefitCard = ({ title, description }) => (
  <div className="bg-[#171717] text-[white] p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full ">
    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-center text-[#ffffff]">
      {title}
    </h3>
    <p className="text-[#c4c4c4] text-center text-sm md:text-base">
      {description}
    </p>
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
        style={{ width: "120px", height: "120px" }}
        class="mx-auto"
      ></lord-icon>
    );
  };
  const features = [
    {
      src: "https://cdn.lordicon.com/tulgnpqx.json",
      title: "Communication Course",
      description:
        "Step by Step, Easy To Follow Training To Master Communication ",
    },
    {
      src: "https://cdn.lordicon.com/tufeszbf.json",
      title: "Community Chat",
      description:
        "A focused space to ask me questions, connect with serious learners, and stay in the loop.",
    },
    {
      src: "https://cdn.lordicon.com/ckdooote.json",
      title: "Challenges",
      description:
        "Practical tasks designed to push you out of your comfort zone and build real speaking confidence.",
    },
    {
      src: "https://cdn.lordicon.com/ygymzvsj.json",
      title: "Transformation Guarantee",
      description:
        "Himesh will personally review you 1-1 and ensure you see results.",
    },
    // {
    //   src: "https://cdn.lordicon.com/aksvbzmu.json",
    //   title: "Mentorship Calls",
    //   description: "1-1 calls with himesh.",
    // },
    {
      src: "https://cdn.lordicon.com/uixwkrvw.json",
      title: "Free updates",
      description: "Future updates will be provided at no extra cost.",
    },
  ];

  const benefits = [
    {
      title: "👔 Business Owners",
      description:
        "For people who need to pitch, lead, and communicate their ideas with impact.",
    },
    {
      title: "🧑‍💼Working Professionals",
      description:
        "For people who want to speak clearly and confidently at work or in meetings.",
    },
    {
      title: "🎓 Students",
      description:
        "For people who want to speak up, stand out, and feel confident in any situation",
    },
    {
      title: "🎥 Content Creators",
      description:
        "For people who want to speak fluently on camera and connect better with their audience.",
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
    <main className={"relative text-gray-800 " + inter.className}>
      <script src="https://cdn.lordicon.com/lordicon.js"></script>
      <section className="min-h-[80vh] flex flex-col items-center justify-center pt-16 md:pt-20 pb-16 md:pb-32 px-2 sm:px-4 md:px-8 lg:px-16 w-full">
        <h1 className={"text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-amber-500 mb-2 md:mb-4 text-center " + inter.className}>
          COMMUNICATION IS 
        </h1>
        <h2 className={"text-2xl sm:text-3xl md:text-5xl font-serif font-extrabold text-amber-500 mb-6 md:mb-10 text-center " + inter.className}>
         A SKILL
        </h2>
        {isSessionActive ? (
          ""
        ) : (
          <div className="flex flex-row gap-1.5">

          <p className="text-base sm:text-lg font-light md:text-2xl text-white mb-8 md:mb-14 max-w-2xl mx-auto text-center">
            We will teach you how to 
          </p>
          <p className="text-base sm:text-lg font-bold md:text-2xl text-white mb-8 md:mb-14 max-w-2xl mx-auto text-center">
            master it
          </p>
          </div>
        )}

        <div className="flex flex-col items-center w-full max-w-full md:max-w-3xl lg:max-w-[70vw]">
          {isSessionActive ? (
            <div className="flex w-full p-0.5 mb-8 md:mb-10 max-w-full md:max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full bg-white text-gray-800 rounded-xl shadow-md p-4 sm:p-8 md:p-16 lg:p-20 mb-8 border border-gray-200 flex flex-col items-center"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-4 text-center">
                  Welcome Back!{" "}
                  {session?.user?.user_metadata?.username || "User"}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 md:mb-6 text-center max-w-2xl">
                  You’ve shown up. Now keep pushing. Every rep — every lesson —
                  makes you a more powerful, confident communicator. Let’s level
                  up your communication game, one push-up at a time.
                </p>
                <Lordicon />
              </motion.div>
            </div>
          ) : (
            <div className="w-full max-w-full md:max-w-4xl aspect-video rounded-xl shadow-2xl mb-8 md:mb-16 overflow-x-auto">
              <iframe
                className="w-full h-full min-h-[200px] sm:min-h-[300px]"
                src="https://www.youtube.com/embed/y3kk8iyeF2U"
                title="Communication Mastery Mechanics"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <CTAButton href={isSessionActive ? "/Courses" : "/dashboard/Billing"}>
            {isSessionActive ? "Go to courses" : "Join Now"}
          </CTAButton>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-12 sm:py-16 md:py-24 flex flex-col items-center justify-center px-2 sm:px-4 md:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        {isSessionActive ? (
          <RevealOnScroll>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-amber-500 text-center mb-8 sm:mb-10 md:mb-20">
              What You Will Master
            </h2>
          </RevealOnScroll>
        ) : (
          <RevealOnScroll>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-amber-500 text-center mb-8 sm:mb-10 md:mb-20">
              What all you get
            </h2>
          </RevealOnScroll>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-full md:max-w-6xl mx-auto mb-10 md:mb-20 w-full">
          {features.map((item, index) => (
            <RevealOnScroll key={index} delay={index * 0.2}>
              <FeatureCard {...item} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="flex justify-center mt-8 self-center">
          {isSessionActive ? (
            <CTAButton href="/Courses">Start Learning</CTAButton>
          ) : (
            <CTAButton href="/dashboard/Billing">Join Now</CTAButton>
          )}
        </RevealOnScroll>
      </section>

      {/* Who Benefits Section */}
      {!isSessionActive && (
        <section className="py-12 sm:py-16 md:py-24 px-2 sm:px-4 md:px-8 lg:px-16 text-[white] flex flex-col items-center justify-center w-full">
          <div className="max-w-7xl mx-auto mb-8 sm:mb-10 md:mb-20 w-full">
            <RevealOnScroll>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-amber-500 text-center mb-8 sm:mb-10 md:mb-20">
                Who is this for
              </h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 w-full">
              {benefits.map((item, index) => (
                <RevealOnScroll key={index} delay={index * 0.2}>
                  <BenefitCard {...item} />
                </RevealOnScroll>
              ))}
            </div>
          </div>

          <RevealOnScroll className="flex justify-center mt-8 self-center">
            <CTAButton href="/dashboard/Billing">Join Program</CTAButton>
          </RevealOnScroll>
        </section>
      )}

      {/* Why This Course & Coach Section */}
      {!isSessionActive && (
        <section className="py-12 sm:py-16 md:py-24 px-2 sm:px-4 md:px-8 lg:px-16 max-w-5xl mx-auto text-gray-800 flex flex-col items-center justify-center w-full">
          <RevealOnScroll>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-amber-500 text-center mb-8 sm:mb-10 md:mb-16">
              Why This Course?
            </h2>
          </RevealOnScroll>

          <div className="flex flex-col gap-4 sm:gap-6 md:gap-10 w-full md:w-[80vw] lg:w-[60vw] text-white mb-8 sm:mb-10 md:mb-16">
            <RevealOnScroll>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed bg-[#18181b] rounded-4xl p-4 sm:p-6 md:p-8 shadow">
                This course is built from real experience. Everything you’ll
                learn is what actually worked for me and my clients.
              </p>
            </RevealOnScroll>
            <RevealOnScroll>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed bg-[#18181b] rounded-4xl p-4 sm:p-6 md:p-8 shadow">
                You don’t need hours each day. Just 15 to 20 minutes of focused
                practice is enough to start seeing progress.
              </p>
            </RevealOnScroll>
            <RevealOnScroll>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed bg-[#18181b] rounded-4xl p-4 sm:p-6 md:p-8 shadow">
                I went from stuttering and insecure to filming 30-minute YouTube
                videos with no cuts, no script, and no stutter — I figured out
                how to do it, it transformed my life, and if I can do it, you
                can too.
              </p>
            </RevealOnScroll>
            <RevealOnScroll>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed bg-[#18181b] rounded-4xl p-4 sm:p-6 md:p-8 shadow">
                You’ll have my 1-1 feedback on your progress and a like-minded
                community that helps you stay consistent and confident
              </p>
            </RevealOnScroll>
            <RevealOnScroll>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed bg-[#18181b] rounded-4xl p-4 sm:p-6 md:p-8 shadow">
                This is the only communication system you’ll ever need to go
                from blank mind to magnetic voice in 30 days. No need to read
                100 books or sit through boring public speaking classes.
              </p>
            </RevealOnScroll>
          </div>
          {/* Coach Section */}
          <RevealOnScroll>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-amber-500 text-center mb-8 sm:mb-10 md:mb-16">
              About Your Coach
            </h2>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="flex flex-col md:flex-row gap-6 md:gap-14 items-center text-[white] p-4 sm:p-8 md:p-12 rounded-xl shadow-md w-full">
              <div className="w-full md:w-1/3 mb-4 md:mb-0 flex-shrink-0">
                <Image
                  src="/him2.jpg"
                  alt="Coach Himesh"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>

              <div className="w-full md:w-2/3 space-y-2 md:space-y-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-500">
                  Himesh
                </h3>
                <p className="text-white text-sm sm:text-base md:text-lg">
                  I was born in India, in a place where no one spoke English. I
                  used to stutter, avoid people, and sucked at communication. I
                  built everything from ground zero. Now I speak confidently… No
                  stutters. No fear. I can record long YouTube videos in one
                  take And make people feel emotions through my words. If I can
                  do it, so can you.
                </p>
                <p className="text-white text-sm sm:text-base md:text-lg">
                  I've worked with everyone from Fortune 500 executives to
                  aspiring YouTubers, helping them overcome speech anxiety,
                  refine their delivery, and develop a magnetic speaking
                  presence.
                </p>
                <p className="text-white font-medium text-sm sm:text-base md:text-lg">
                  My mission is to equip you with the skills to express yourself
                  with clarity, confidence, and conviction in any situation.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="flex justify-center mt-8 sm:mt-10 self-center">
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

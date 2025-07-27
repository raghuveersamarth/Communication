"use client";
import React, {useState, useEffect} from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
});


const Courses = () => {
  const router = useRouter();
  const [session, setSession] = useState({})
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
        console.error("Session error:", error);
        setIsSessionActive(false);
      }
    };

    getSession();

    // Set up auth state listener
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
  }, [])
  
  const reroute = async() => {
    if (!isSessionActive) {
      router.push("/dashboard/Plan");
      return;
    }
    router.push("/Courses/comm-vids");

  };
  return (
    <div className={"min-h-screen bg-gradient-to-br py-10 " + inter.className}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Our Courses
        </h1>
        <div className="flex justify-center mb-8">
          <div className="h-1 w-56 bg-orange-500 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <div onClick={()=>reroute()} className="relative shadow-lg border gap-5 border-amber-500 rounded-xl flex flex-col cursor-pointer items-center p-8 hover:shadow-2xl transition-shadow duration-300 overflow-hidden min-h-[300px]">
              <Image
                src="/him.jpg"
                alt="Communication"
                fill
                className="object-cover absolute inset-0 z-0 opacity-30"
                style={{ borderRadius: "inherit" }}
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
              <div className="relative z-10 flex flex-col items-center gap-14">
                <h2 className="text-2xl font-semibold text-amber-700 mb-2">
                  Communication
                  <div className="flex justify-center mb-8">
                    <div className="h-1 w-40 bg-white rounded"></div>
                  </div>
                </h2>
                <p className="text-white text-center mb-4">
                  Master the art of effective communication for personal and
                  professional growth.
                </p>
              </div>
            </div>

            {/* Add more course cards here as needed */}
        </div>
      </div>
    </div>
  );
};

export default Courses;

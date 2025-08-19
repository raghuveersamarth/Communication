"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { Poppins } from "next/font/google";
import RevealOnScroll from "@/components/RevealOnScroll";
import { useRouter } from "next/navigation";

const inter = Poppins({ subsets: ["latin"], weight: "200", display: "swap" });

const Videos = () => {
  const router = useRouter();
  const [session, setSession] = useState({});
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const modules = [
    "Unlock Your Voice Through Foundations",
    "Master Body Language",
    "Tonality Mastery + Accent Neutralization",
    "Social Skills and Networking Mastery",
    "Tell Powerful Stories",
    "Influence and Persuasion Tactics",
    "Negotiation + Real World Influence Frameworks",
    "Public Speaking and Presentation Skills",
    "Speak Like a Creator",
    "Build Inner and Outer Confidence",
    "Speak Like a Pro",
    "BOUNUS : Vocabulary Mastery",
  ];

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        console.log(session);
        if (error) throw error;

        setSession(session);
        setIsSessionActive(
          !!session &&
            ["paid", "completed"].includes(
              session?.user?.user_metadata?.payment_status
            )
        );
      } catch (error) {
        router.push("/dashboard/Plan");
        console.error("Session error:", error);
        setIsSessionActive(false);

      }
    };
    getSession();
    // Set up auth state listener
    // const {
    //   data: { subscription },
    // } = supabase.auth.onAuthStateChange(async (event, session) => {
    //   setSession(session);
    //   setIsSessionActive(
    //     !!session &&
    //       ["paid", "completed"].includes(
    //         session?.user?.user_metadata?.payment_status
    //       )
    //   );
    // });

    // return () => subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      if (selectedModule === null) return;

      setLoading(true);
      setVideos([]);
      setSelectedVideo(null);

      const { data, error } = await supabase
        .from("communication_videos_by_modules")
        .select("title, youtube_id, thumbnail_url")
        .eq("module_id", selectedModule + 1);

      if (error) {
        console.error("Error fetching videos:", error.message);
      } else {
        setVideos(data);
      }

      setLoading(false);
    };

    fetchVideos();
  }, [selectedModule]);

  return (
    <section className={`flex w-full h-screen ${inter.className} relative`}>
      {/* Hamburger icon - only when sidebar is closed on mobile */}
      {!sidebarOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-[#fca000] p-2 rounded-md shadow-lg"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <rect y="4" width="24" height="2" rx="1" fill="#171616" />
            <rect y="11" width="24" height="2" rx="1" fill="#171616" />
            <rect y="18" width="24" height="2" rx="1" fill="#171616" />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-80 md:w-[30%] bg-[#171616] p-6 shadow-lg overflow-y-auto z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close button (mobile only) */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            className="text-white text-3xl"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            &times;
          </button>
        </div>
        <h2 className="text-2xl font-bold text-amber-400 mb-4">Choose a Module</h2>
        <ul className="space-y-4">
          {modules.map((module, idx) => (
            <li
              key={idx}
              className={`cursor-pointer rounded-xl px-4 py-3 flex items-center gap-3 border-2 transition-all font-semibold text-base
                ${
                  selectedModule === idx
                    ? "bg-amber-500 text-black border-amber-500 shadow-lg scale-105"
                    : "bg-[#232222] text-white border-transparent hover:bg-amber-400 hover:text-black hover:border-amber-400"
                }`}
              onClick={() => {
                setSelectedModule(idx);
                setSidebarOpen(false);
              }}
            >
              <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold
                ${selectedModule === idx ? "bg-black text-amber-400" : "bg-amber-400 text-black"}`}>
                {idx + 1}
              </span>
              <span className="truncate">{module}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-[#0f0f0f] ml-0 md:ml-0">
        {selectedModule === null ? (
          <div className="text-2xl text-center text-gray-400 mt-20">
            Select a module to view its videos.
          </div>
        ) : loading ? (
          <div className="text-center text-amber-400 text-xl mt-20">Loading...</div>
        ) : selectedVideo ? (
          <div className="flex flex-col items-start gap-4">
            <button
              className="mb-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              onClick={() => setSelectedVideo(null)}
            >
              ← Back to all videos
            </button>
            <div className="w-full aspect-video">
              <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${selectedVideo.youtube_id}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h1 className="text-2xl text-white font-bold mt-4">{selectedVideo.title}</h1>
          </div>
        ) : (
          <>
            <h3 className="text-3xl font-bold mb-6 text-amber-400">
              Videos in Module {selectedModule + 1}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video, i) => (
                <RevealOnScroll delay={i * 0.1} key={i}>
                  <div
                    key={i}
                    onClick={() => setSelectedVideo(video)}
                    className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow hover:scale-[1.02] transition transform cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={
                          video.thumbnail_url ||
                          `https://img.youtube.com/vi/${video.youtube_id}/0.jpg`
                        }
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        ▶
                      </span>
                    </div>
                    <div className="p-3 text-white">
                      <p className="font-semibold">{video.title}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </>
        )}
      </main>
    </section>
  );
};

export default Videos;

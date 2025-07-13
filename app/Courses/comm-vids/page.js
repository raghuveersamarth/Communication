"use client";
import React, { useState } from "react";
import { Poppins } from "next/font/google";

const inter = Poppins({ subsets: ["latin"], weight: "200", display: "swap" });

const Videos = () => {
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
    "BOUNUS : Vocabulary Mastery"
  ];

  // Replace these with real video data later
  const videoData = {
    0: [
      { title: "Intro Video", thumbnail: "/him.jpg", duration: "5:12" },
      {
        title: "Why Communication Matters",
        thumbnail: "/him.jpg",
        duration: "8:30",
      },
    ],
    1: [
      { title: "Building Confidence", thumbnail: "/him.jpg", duration: "7:45" },
      { title: "Effective Speaking", thumbnail: "/him.jpg", duration: "6:20" },
    ],
    2: [
      { title: "Building Confidence", thumbnail: "/him.jpg", duration: "7:45" },
      { title: "Effective Speaking", thumbnail: "/him.jpg", duration: "6:20" },
    ],
    3: [
      { title: "Building Confidence", thumbnail: "/him.jpg", duration: "7:45" },
      { title: "Effective Speaking", thumbnail: "/him.jpg", duration: "6:20" },
    ],
    4: [
      { title: "Building Confidence", thumbnail: "/him.jpg", duration: "7:45" },
      { title: "Effective Speaking", thumbnail: "/him.jpg", duration: "6:20" },
      { title: "Effective Speaking", thumbnail: "/him.jpg", duration: "3:20" },
      { title: "Effective Speaking", thumbnail: "/him.jpg", duration: "4:20" },
    ],
    5: [
      { title: "Building Confidence", thumbnail: "/him.jpg", duration: "7:45" },
      { title: "Effective Speaking", thumbnail: "/him.jpg", duration: "6:20" },
    ],
    // Add more...
  };

  const [selectedModule, setSelectedModule] = useState(null);

  return (
    <section className={`flex w-full h-screen ${inter.className}`}>
      {/* Sidebar */}
      <aside className="flex flex-col w-[25%] bg-[#171616] p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-amber-400">
          Choose a Module
        </h2>
        <ul
          className="overflow-y-auto h-[80%] space-y-3"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {modules.map((module, idx) => (
            <li
              key={idx}
              className={`cursor-pointer rounded-lg px-4 py-2 bg-[#232222] hover:bg-amber-500 hover:text-black transition-colors font-semibold text-lg ${
                selectedModule === idx ? "bg-amber-500 text-black" : ""
              }`}
              onClick={() => setSelectedModule(idx)}
            >
              {(idx===11)?`${module}`:`Module ${idx + 1}: ${module}`}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto bg-[#0f0f0f]">
        {selectedModule === null ? (
          <div className="text-2xl text-center text-gray-400 mt-20">
            Select a module to view its videos.
          </div>
        ) : (
          <div>
            <h3 className="text-3xl font-bold mb-6 text-amber-400">
              Videos in Module {selectedModule + 1}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {videoData[selectedModule]?.map((video, i) => (
                <div
                  key={i}
                  className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow hover:scale-[1.02] transition transform cursor-pointer"
                  
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-3 text-white">
                    <p className="font-semibold">{video.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </section>
  );
};

export default Videos;

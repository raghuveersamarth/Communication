import React from "react";
// import ScrollProgressBar from '@/components/ScrollProgressbar'

const page = () => {
  return (
    <div className="flex text-[] flex-col items-center justify-center min-h-screen ]">
      <section className="video">
        <div className="information-about-the-coach flex flex-col items-center justify-center min-h-screen ">
          <h1 className="text-3xl text-[#fca000] m-3">About The Coach</h1>
          {/* 
          about the coach section with photo and description
          */}

          <div className="flex gap-5 w-[80vw] rounded-2xl shadow-lg bg-[#141414] p-6">
            {/* add coach's photo
             */}
            <img
              src="him2.jpg"
              alt="Coach Himesh"
              className="h-[50vh] rounded-lg mb-4"
            ></img>
            <div>
              <h2 className="text-2xl text-[#fff] font-bold mb-4">Himesh</h2>
              <p className="text-lg text-[#747474]">
                I started from zero. Born in a place where English wasn’t
                spoken, I stuttered every time I tried, avoided people, and
                struggled to express myself. But I built my communication step
                by step. Today, I speak with confidence, record long videos in
                one take, and move people with my words. That’s why I now help
                people like you: business owners, professionals, content
                creators, and students. Over time, I’ve helped numerous people
                transform their communication, and I know the exact steps it
                takes to get results. Communication changes everything. It helps
                you close more sales, build instant trust, get people to pay
                attention, and share your ideas with clarity and confidence. My
                approach is different from the usual “tips and tricks” floating
                around. I’ve developed a formula I call Communication Mastery
                Mechanics, a system designed to deliver great results in less
                time by targeting the core levers of influence, clarity, and
                confidence. This isn’t about theory. It’s about a proven process
                that takes you from unsure and stuck to someone who commands
                attention, speaks with authority, and wins
                opportunities through words.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;

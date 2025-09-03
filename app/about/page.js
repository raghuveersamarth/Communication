import React from 'react'
// import ScrollProgressBar from '@/components/ScrollProgressbar'

const page = () => {
  return (
    <div className='flex text-[] flex-col items-center justify-center min-h-screen ]'>
      <section className='video'>
        <div className='information-about-the-coach flex flex-col items-center justify-center min-h-screen '>
          <h1 className='text-3xl text-[#fca000] m-3'>About The Coach</h1>
          {/* 
          about the coach section with photo and description
          */}

          <div className='flex gap-5 w-[80vw] rounded-2xl shadow-lg bg-[#141414] p-6'>
        {/* add coach's photo
         */}
            <img
              src='him2.jpg'
              alt='Coach Himesh'
              className='h-[50vh] rounded-lg mb-4'></img>
              <div>

            <h2 className='text-2xl text-[#fff] font-bold mb-4'>Himesh</h2>
            <p className='text-lg text-[#747474]'>
              I am a passionate coach dedicated to helping individuals overcome their communication challenges. With years of experience, I specialize in transforming stutters into strengths, enabling my clients to speak clearly and confidently.
            </p>
            <p className='mt-4 text-lg text-[#747474]'>
              Join me on this journey to master the art of communication and lead every room you enter with confidence.
            </p>
              </div>
            </div>
        </div>
      </section>

    </div>
  )
}

export default page

import React from "react";

const Courses = () => {
  return (
    <div className="flex">
      <div className=" flex flex-col left-column h-[100vh] w-[30vw]  bg-[#181818]">
        <div className="heading text-center font-serif text-3xl font-bold text-[#fca000] mt-8">
          <h1>Courses</h1>
        </div>
        <div className="courses">
          <div className="option flex items-center justify-between p-4 bg-[#202020] text-white rounded-lg shadow-md m-4">
            <h2>Module 1</h2>
          </div>
          <div className="option flex items-center justify-between p-4 bg-[#202020] text-white rounded-lg shadow-md m-4">
            <h2>Module 2</h2>
          </div>
          <div className="option flex items-center justify-between p-4 bg-[#202020] text-white rounded-lg shadow-md m-4">
            <h2>Module 3</h2>
          </div>
          <div className="option flex items-center justify-between p-4 bg-[#202020] text-white rounded-lg shadow-md m-4">
            <h2>Module 4</h2>
          </div>
          <div className="option flex items-center justify-between p-4 bg-[#202020] text-white rounded-lg shadow-md m-4">
            <h2>Module 5</h2>
          </div>
          <div className="option flex items-center justify-between p-4 bg-[#202020] text-white rounded-lg shadow-md m-4">
            <h2>Module 6</h2>
          </div>
        </div>
      </div>
      <div className="right column h-[100vh] w-[70vw] bg-[#101010]"></div>
    </div>
  );
};

export default Courses;


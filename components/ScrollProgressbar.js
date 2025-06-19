// write code for a scroll progress bar component in React using Framer Motion and Tailwind CSS
import React, { useEffect, useState } from "react"; 
import { motion, useAnimation } from "framer-motion";
 export const ScrollProgressBar = () => {
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / windowHeight) * 100;
      setScrollY(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    controls.start({ width: `${scrollY}%` });
  }, [scrollY, controls]);

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-[#fca000] z-50"
      initial={{ width: "0%" }}
      animate={controls}
    />
  );
};
export default ScrollProgressBar;

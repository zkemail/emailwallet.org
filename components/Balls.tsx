"use client";

import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";

const Balls = () => {
  return (
    <Parallax speed={-5} className="relative -z-10 h-full w-[55%] ">
      {/* Bottom left ball */}
      <motion.div
        transition={{ repeat: Infinity, duration: 4 }}
        animate={{ x: [0, 30, 0] }}
        className="absolute h-[400px] w-[400px] rounded-full border border-primary bg-tertiary/30 transition-all max-md:-top-[80px] max-md:right-[100%] md:-bottom-[100%] md:-left-[630px]"
      />

      {/* Bottom right ball */}
      <motion.div
        transition={{ repeat: Infinity, duration: 3 }}
        animate={{ y: [0, 10, 0], x: [0, 20, 0] }}
        className="absolute h-[500px] w-[500px] rounded-full border border-primary bg-tertiary/70 transition-all max-md:hidden md:-bottom-[120%] md:left-[80%] lg:left-[80%]"
      />

      {/* Top ball */}
      <motion.div
        transition={{ repeat: Infinity, duration: 5 }}
        animate={{ x: [0, 40, 0] }}
        className="absolute h-[400px] w-[400px] rounded-full border border-primary bg-tertiary/40 transition-all max-md:hidden md:-left-[140px] md:-top-[140%]"
      />
    </Parallax>
  );
};

export default Balls;

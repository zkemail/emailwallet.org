"use client";

import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";

const Balls = () => {
  return (
    <Parallax speed={-15} className="absolute -z-10 h-full min-w-full">
      {/* Bottom left ball */}
      <motion.div
        transition={{ repeat: Infinity, duration: 4 }}
        animate={{ x: [0, 30, 0] }}
        className="absolute -bottom-[20%] -left-64 h-[400px] w-[400px] rounded-full border border-primary bg-tertiary/60 max-md:hidden "
      />

      {/* Bottom right ball */}
      <motion.div
        transition={{ repeat: Infinity, duration: 3 }}
        animate={{ y: [0, 10, 0], x: [0, 20, 0] }}
        className="absolute h-[500px] w-[500px] rounded-full border border-primary bg-tertiary/70 max-md:hidden md:-bottom-52 md:left-[65%]"
      />

      {/* Top ball */}
      <motion.div
        transition={{ repeat: Infinity, duration: 5 }}
        animate={{ x: [0, 40, 0] }}
        className="absolute -top-[55%] right-1/2 h-[400px] w-[400px] rounded-full border border-primary bg-tertiary/40 md:-top-1/3 md:left-1/4"
      />
    </Parallax>
  );
};

export default Balls;

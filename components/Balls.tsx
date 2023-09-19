"use client";

import { motion } from "framer-motion";

const Balls = () => {
  return (
    <div className="-z-10">
      {/* Bottom left ball */}
      <motion.div
        transition={{ repeat: Infinity, duration: 4 }}
        animate={{ x: [0, 30, 0] }}
        className="absolute -bottom-[24%] -left-[20%] h-[400px] w-[400px] rounded-full border border-primary bg-tertiary/60 max-md:hidden "
      />

      {/* Bottom right ball */}
      <motion.div
        transition={{ repeat: Infinity, duration: 3 }}
        animate={{ y: [0, 10, 0], x: [0, 20, 0] }}
        className="absolute h-[500px] w-[500px] rounded-full border border-primary bg-tertiary/70 max-md:hidden md:-bottom-44 md:-right-20"
      />

      {/* Top ball */}
      <motion.div
        transition={{ repeat: Infinity, duration: 5 }}
        animate={{ x: [0, 40, 0] }}
        className="absolute -top-[38%] right-1/3 h-[400px] w-[400px] rounded-full border border-primary bg-tertiary/40 md:-top-1/3 md:left-1/3"
      />
    </div>
  );
};

export default Balls;

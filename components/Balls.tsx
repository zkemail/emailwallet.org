"use client";

import { motion } from "framer-motion";

const Balls = () => {
  return (
    <div className="-z-10">
      {/* Bottom left ball */}
      <motion.div
        transition={{ repeat: Infinity, duration: 4 }}
        animate={{ x: [0, 30, 0], y: [0, 40, 0] }}
        className="absolute -bottom-24 -left-40 h-[400px] w-[400px] rounded-full border border-primary bg-tertiary/50 max-md:hidden "
      />

      {/* Bottom right ball */}
      <motion.div className="absolute h-[500px] w-[500px] rounded-full border border-primary bg-tertiary/70 md:-bottom-20 md:-right-20" />

      {/* Top ball */}
      <motion.div className="absolute -top-[38%] right-1/3 h-[400px] w-[400px] rounded-full border border-primary bg-tertiary/40 md:-top-1/3 md:left-1/3" />
    </div>
  );
};

export default Balls;

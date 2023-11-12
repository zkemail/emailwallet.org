"use client";

import { motion } from "framer-motion";
import { PiLaptopThin } from "react-icons/pi";

const SendToPeopleSection = () => {
  return (
    <section className=" mx-8 mb-28 flex flex-col items-center gap-10 overflow-x-clip max-md:text-end md:mx-10 md:mb-40 md:flex-row-reverse md:gap-48">
      <div className="flex flex-col gap-6 md:basis-[50%]">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold md:text-4xl"
        >
          Receive money without an account.
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-md text-muted-foreground"
        >
          Send to anyone with an email address, whether or not they have signed
          up yet.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0.5, x: -20, rotateX: 180, rotate: 40 },
          visible: {
            opacity: 1,
            x: 0,
            rotateX: 0,
            rotate: -10,
          },
        }}
        viewport={{ amount: 0.8 }}
        transition={{ duration: 1 }}
      >
        <PiLaptopThin size={220} />
      </motion.div>
      <motion.div
        transition={{ repeat: Infinity, duration: 4 }}
        animate={{ x: [0, 30, 0] }}
        className="absolute -bottom-[260%] -z-50 h-[400px] w-[400px] rounded-full border border-primary bg-tertiary/30 transition-all md:-bottom-[120%]"
      />
    </section>
  );
};

export default SendToPeopleSection;

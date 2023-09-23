"use client";

import { Button } from "./ui/button";
import AirplaneImages from "./AirplaneImages";
import Balls from "./Balls";
import { TypingText } from "./TypingText";
import { motion } from "framer-motion";
import Equations from "./Equations";

const HeroSection = () => {
  return (
    <section className="mx-6 mt-32 flex md:mx-20">
      {/* Background Text */}
      <Equations />

      <div className="flex w-full flex-col items-center gap-10 md:flex-row">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="flex flex-col items-start gap-y-6 xl:gap-y-10"
        >
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl md:leading-tight lg:text-6xl">
            Email money to{" "}
            <TypingText
              className="w-fit rounded-xl bg-tertiary px-2"
              title={"anyone."}
            />
          </h1>
          <motion.h3
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground dark:text-slate-200"
          >
            We use zk proofs to ensure you own your money.
          </motion.h3>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-4"
          >
            <Button className="rounded-lg bg-tertiary px-8 text-primary hover:bg-tertiary-foreground">
              Try Demo
            </Button>
            <Button className="rounded-lg border-2 px-8" variant={"outline"}>
              Read Docs
            </Button>
          </motion.div>
        </motion.div>

        {/* Balls and airplanes images */}
        <Balls />
        <AirplaneImages />
      </div>
    </section>
  );
};

export default HeroSection;
